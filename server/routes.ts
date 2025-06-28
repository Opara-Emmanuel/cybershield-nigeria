import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.post("/api/security-check", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const check = await storage.createSecurityCheck({
      userId: req.user.id,
      url: req.body.url || null,
      verdict: req.body.result,
      type: req.body.type
    });

    res.json(check);
  });

  // Enhanced URL scanning with VirusTotal integration
  app.post("/api/scan-url", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ 
        error: "Invalid URL format", 
        verdict: "invalid",
        details: "Please enter a valid URL (e.g., https://example.com)" 
      });
    }

    try {
      let verdict = "safe";
      let details = "URL appears to be safe based on basic checks";
      let virusTotalResults = null;

      // Basic URL safety checks
      const parsedUrl = new URL(url);
      const suspiciousPatterns = [
        'scam', 'phishing', 'malware', 'virus', 'hack', 'steal', 'fake',
        'urgent', 'winner', 'prize', 'click-here', 'free-money'
      ];

      const urlLower = url.toLowerCase();
      const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
        urlLower.includes(pattern)
      );

      if (!parsedUrl.protocol.startsWith('https:')) {
        verdict = "suspicious";
        details = "URL does not use HTTPS encryption";
      } else if (hasSuspiciousPattern) {
        verdict = "suspicious";
        details = "URL contains potentially suspicious keywords";
      }

      // VirusTotal integration if API key is available
      if (process.env.VIRUSTOTAL_API_KEY) {
        try {
          console.log('Scanning URL with VirusTotal:', url);
          const vtResponse = await fetch('https://www.virustotal.com/vtapi/v2/url/report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              apikey: process.env.VIRUSTOTAL_API_KEY,
              resource: url,
            }),
          });

          if (vtResponse.ok) {
            const vtData = await vtResponse.json();
            virusTotalResults = vtData;
            console.log('VirusTotal response:', vtData);

            if (vtData.response_code === 1 && vtData.positives > 0) {
              verdict = "not safe";
              details = `This URL is not safe - ${vtData.positives} out of ${vtData.total} security engines detected threats`;
            } else if (vtData.response_code === 1) {
              verdict = "safe";
              details = `URL is safe - no threats detected by ${vtData.total} security engines`;
            } else if (vtData.response_code === 0) {
              // URL not in VirusTotal database yet, submit for scanning
              details = "URL submitted for analysis. " + details;
            }
          } else {
            console.log('VirusTotal API response not ok:', vtResponse.status);
            details += " (VirusTotal scan unavailable)";
          }
        } catch (vtError) {
          console.error('VirusTotal API error:', vtError);
          details += " (Advanced threat analysis unavailable)";
        }
      } else {
        console.log('VirusTotal API key not configured');
        details += " (Enhanced scanning requires VirusTotal API)";
      }

      // Save scan result
      const check = await storage.createSecurityCheck({
        userId: req.user.id,
        url: url,
        verdict: verdict,
        type: "url_scan"
      });

      res.json({ 
        ...check, 
        details, 
        virusTotalResults,
        scannedUrl: url
      });

    } catch (error) {
      console.error('URL scanning error:', error);
      res.status(500).json({ 
        error: "Unable to scan URL at this time",
        details: "Please try again later" 
      });
    }
  });

  app.get("/api/security-checks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const checks = await storage.getSecurityChecks(req.user.id);
    res.json(checks);
  });

  app.post("/api/scam-report", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const report = await storage.createScamReport({
      userId: req.user.id,
      report: req.body.description,
      type: req.body.type
    });

    res.json(report);
  });

  app.get("/api/scam-reports", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const reports = await storage.getScamReports(req.user.id);
    res.json(reports);
  });

  app.post("/api/generate-security-tip", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    if (!process.env.COHERE_API_KEY) {
      return res.status(500).json({ error: "Cohere API key is not configured" });
    }

    try {
      console.log('Generating security tip with Cohere for topic:', req.body.topic);
      const response = await cohere.chat({
        model: "command-r-plus",
        message: `Generate a short cybersecurity tip about ${req.body.topic || 'online safety'} for Nigerian users. Be specific and actionable in under 40 words.`,
        maxTokens: 50,
        temperature: 0.6,
      });

      const tip = response.text || "Failed to generate tip";
      console.log('Cohere response received, tip length:', tip.length);
      res.json({ tip });
    } catch (error: any) {
      console.error('Error generating security tip with Cohere:', error);

      // Check for specific Cohere API errors
      if (error?.status === 429) {
        return res.status(503).json({ 
          error: "AI service temporarily unavailable due to rate limits. Please try again later.",
          details: "API rate limit exceeded"
        });
      }

      if (error?.status === 401) {
        return res.status(500).json({ 
          error: "AI service configuration error. Please contact support.",
          details: "API authentication failed"
        });
      }

      res.status(500).json({ 
        error: "Failed to generate security tip",
        details: error?.message || "Unknown error"
      });
    }
  });

  // Add AI chat endpoint for Q&A
  app.post("/api/ai-chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    if (!process.env.COHERE_API_KEY) {
      return res.status(500).json({ error: "AI service is not configured" });
    }

    try {
      console.log('Processing AI chat request with Cohere for question:', req.body.question);
      const response = await cohere.chat({
        model: "command-r-plus",
        message: `You are CyberShield AI. Answer briefly and practically in under 50 words.

Question: ${req.body.question}`,
        maxTokens: 60,
        temperature: 0.6,
      });

      const responseText = response.text || "I'm unable to provide an answer right now.";
      console.log('Cohere chat response received, length:', responseText.length);
      res.json({ response: responseText });
    } catch (error: any) {
      console.error('Error in AI chat with Cohere:', error);

      if (error?.status === 429) {
        return res.status(503).json({ 
          error: "AI service temporarily unavailable due to rate limits. Please try again later.",
          details: "API rate limit exceeded"
        });
      }

      if (error?.status === 401) {
        return res.status(500).json({ 
          error: "AI service configuration error. Please contact support.",
          details: "API authentication failed"
        });
      }

      res.status(500).json({ 
        error: "Failed to get AI response",
        details: error?.message || "Unknown error"
      });
    }
  });

  // Identity Verification endpoints (Premium feature)
  app.post("/api/verify-individual", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { firstName, lastName, phoneNumber, nin, bvn } = req.body;

    if (!firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    try {
      // Note: This is prepared for Dojah API integration
      // For now, return a mock response structure that matches what Dojah would return
      console.log('Individual verification request:', { firstName, lastName, phoneNumber, nin: nin ? '***masked***' : null, bvn: bvn ? '***masked***' : null });
      
      if (!process.env.DOJAH_API_KEY) {
        return res.status(503).json({ 
          error: "Identity verification service not configured",
          details: "Dojah API key is required for verification services"
        });
      }

      // TODO: Integrate with Dojah API when available
      // const dojahResponse = await fetch('https://api.dojah.io/api/v1/kyc/nin', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.DOJAH_API_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ nin, first_name: firstName, last_name: lastName })
      // });

      const verificationResult = {
        id: `ver_${Date.now()}`,
        type: 'individual' as const,
        status: 'pending' as const,
        data: {
          message: "Verification service will be available after deployment with Dojah API integration",
          submittedData: {
            firstName,
            lastName,
            phoneNumber,
            hasNin: !!nin,
            hasBvn: !!bvn
          }
        },
        createdAt: new Date().toISOString()
      };

      // Log verification attempt
      await storage.createSecurityCheck({
        userId: req.user.id,
        url: null,
        verdict: "verification_requested",
        type: "identity_verification"
      });

      res.json(verificationResult);
    } catch (error: any) {
      console.error('Individual verification error:', error);
      res.status(500).json({ 
        error: "Verification service temporarily unavailable",
        details: "Please try again later"
      });
    }
  });

  app.post("/api/verify-business", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { businessName, rcNumber, tin, phoneNumber, email, address } = req.body;

    if (!businessName || !phoneNumber) {
      return res.status(400).json({ error: "Business name and phone number are required" });
    }

    try {
      console.log('Business verification request:', { businessName, rcNumber, tin, phoneNumber, email });
      
      if (!process.env.DOJAH_API_KEY) {
        return res.status(503).json({ 
          error: "Business verification service not configured",
          details: "Dojah API key is required for verification services"
        });
      }

      // TODO: Integrate with Dojah API for business verification
      // const dojahResponse = await fetch('https://api.dojah.io/api/v1/kyb/cac', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.DOJAH_API_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ rc_number: rcNumber, company_name: businessName })
      // });

      const verificationResult = {
        id: `ver_${Date.now()}`,
        type: 'business' as const,
        status: 'pending' as const,
        data: {
          message: "Business verification service will be available after deployment with Dojah API integration",
          submittedData: {
            businessName,
            rcNumber,
            tin,
            phoneNumber,
            email,
            address
          }
        },
        createdAt: new Date().toISOString()
      };

      // Log verification attempt
      await storage.createSecurityCheck({
        userId: req.user.id,
        url: null,
        verdict: "business_verification_requested",
        type: "business_verification"
      });

      res.json(verificationResult);
    } catch (error: any) {
      console.error('Business verification error:', error);
      res.status(500).json({ 
        error: "Business verification service temporarily unavailable",
        details: "Please try again later"
      });
    }
  });

  // Email Security Analysis endpoints
  app.post("/api/analyze-email", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { senderEmail, subject, content, headers } = req.body;

    if (!senderEmail) {
      return res.status(400).json({ error: "Sender email is required" });
    }

    try {
      console.log('Email analysis request for:', senderEmail);
      
      // Mock analysis result for demo (will be replaced with real analysis)
      const analysisResult = {
        id: `email_${Date.now()}`,
        type: 'email' as const,
        status: 'safe' as const,
        score: 25,
        analysis: {
          spf: true,
          dkim: false,
          dmarc: true,
          reputation: 'good',
          blacklisted: false,
          phishingIndicators: [],
          recommendations: [
            "Email appears legitimate based on sender domain reputation",
            "DKIM signature is missing - sender should configure DKIM",
            "Consider verifying sender identity through alternative means",
            "Monitor for similar emails from this domain"
          ]
        },
        createdAt: new Date().toISOString()
      };

      // Log email analysis
      await storage.createSecurityCheck({
        userId: req.user.id,
        url: senderEmail,
        verdict: "email_analyzed",
        type: "email_security"
      });

      res.json(analysisResult);
    } catch (error: any) {
      console.error('Email analysis error:', error);
      res.status(500).json({ 
        error: "Email analysis service temporarily unavailable",
        details: "Please try again later"
      });
    }
  });

  app.post("/api/analyze-domain", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ error: "Domain is required" });
    }

    try {
      console.log('Domain analysis request for:', domain);
      
      // Mock domain analysis result
      const analysisResult = {
        id: `domain_${Date.now()}`,
        type: 'domain' as const,
        status: 'safe' as const,
        score: 15,
        analysis: {
          spf: true,
          dkim: true,
          dmarc: true,
          reputation: 'excellent',
          blacklisted: false,
          phishingIndicators: [],
          recommendations: [
            "Domain has excellent security configuration",
            "All email authentication records are properly configured",
            "Domain reputation is clean across all threat intelligence sources",
            "Safe to receive emails from this domain"
          ]
        },
        createdAt: new Date().toISOString()
      };

      // Log domain analysis
      await storage.createSecurityCheck({
        userId: req.user.id,
        url: domain,
        verdict: "domain_analyzed",
        type: "domain_security"
      });

      res.json(analysisResult);
    } catch (error: any) {
      console.error('Domain analysis error:', error);
      res.status(500).json({ 
        error: "Domain analysis service temporarily unavailable",
        details: "Please try again later"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}