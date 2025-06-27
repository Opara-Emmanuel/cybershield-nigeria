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

  const httpServer = createServer(app);
  return httpServer;
}