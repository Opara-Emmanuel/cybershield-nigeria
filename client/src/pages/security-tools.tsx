
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link as LinkIcon, CheckCircle, XCircle, Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import PasswordBreachCheck from "@/components/security/password-breach-check";

interface PasswordStrengthResult {
  score: number;
  level: string;
  feedback: string[];
  color: string;
}

function analyzePasswordStrength(password: string): PasswordStrengthResult {
  let score = 0;
  const feedback: string[] = [];
  
  // Length check
  if (password.length >= 12) {
    score += 25;
  } else if (password.length >= 8) {
    score += 15;
  } else {
    feedback.push("Use at least 8 characters (12+ recommended)");
  }
  
  // Character variety checks
  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    feedback.push("Include lowercase letters");
  }
  
  if (/[A-Z]/.test(password)) {
    score += 15;
  } else {
    feedback.push("Include uppercase letters");
  }
  
  if (/\d/.test(password)) {
    score += 15;
  } else {
    feedback.push("Include numbers");
  }
  
  if (/[!@#$%^&*(),.?":{}|<>[\]\\;'`~_+=\-]/.test(password)) {
    score += 20;
  } else {
    feedback.push("Include special characters (!@#$%^&* etc.)");
  }
  
  // Pattern checks
  if (!/(.)\1{2,}/.test(password)) {
    score += 10; // No repeated characters
  } else {
    feedback.push("Avoid repeating characters");
  }
  
  // Common patterns
  const commonPatterns = ['123', 'abc', 'password', 'qwerty', 'admin'];
  const lowerPassword = password.toLowerCase();
  if (!commonPatterns.some(pattern => lowerPassword.includes(pattern))) {
    score += 10;
  } else {
    feedback.push("Avoid common patterns and words");
  }
  
  let level: string;
  let color: string;
  
  if (score >= 85) {
    level = "Very Strong";
    color = "text-green-700";
  } else if (score >= 70) {
    level = "Strong";
    color = "text-green-600";
  } else if (score >= 50) {
    level = "Medium";
    color = "text-yellow-600";
  } else if (score >= 25) {
    level = "Weak";
    color = "text-orange-600";
  } else {
    level = "Very Weak";
    color = "text-red-600";
  }
  
  return { score, level, feedback, color };
}

export default function SecurityTools() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordAnalysis, setPasswordAnalysis] = useState<PasswordStrengthResult | null>(null);
  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const { user } = useAuth();

  const securityCheckMutation = useMutation({
    mutationFn: async (data: { type: string; result: string }) => {
      const res = await apiRequest("POST", "/api/security-check", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/security-checks"] });
    },
  });

  const urlScanMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/scan-url", { url });
      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }
      return res.json();
    },
    onSuccess: (data) => {
      setScanResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/security-checks"] });
    },
    onError: (error: any) => {
      console.error('URL scan error:', error);
      setScanResult({
        error: error.error || error.message || "Unable to scan URL at this time",
        verdict: error.verdict || "error",
        details: error.details || error.error || "Please try again later"
      });
    },
  });

  const handlePasswordCheck = () => {
    if (!password) return;
    
    const result = analyzePasswordStrength(password);
    setPasswordAnalysis(result);
    
    securityCheckMutation.mutate({
      type: "password",
      result: result.level.toLowerCase(),
    });
  };

  const handleUrlCheck = () => {
    if (!url.trim()) return;
    setScanResult(null);
    urlScanMutation.mutate(url.trim());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Security Tools</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive password and URL security analysis tools
        </p>
      </div>

      <Tabs defaultValue="password-checker" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password-checker" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Password Security
          </TabsTrigger>
          <TabsTrigger value="url-scanner" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            URL Scanner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password-checker" className="space-y-6">
          {/* Password Strength Checker */}
          <Card className="border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="h-5 w-5 text-yellow-500" />
                Password Strength Analyzer
              </CardTitle>
              <CardDescription>
                Test your password strength with our advanced analyzer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password to analyze"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value) {
                      const result = analyzePasswordStrength(e.target.value);
                      setPasswordAnalysis(result);
                    } else {
                      setPasswordAnalysis(null);
                    }
                  }}
                  className="border-green-200 focus:ring-green-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {passwordAnalysis && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Password Strength</span>
                      <span className={`text-sm font-bold ${passwordAnalysis.color}`}>
                        {passwordAnalysis.level}
                      </span>
                    </div>
                    <Progress 
                      value={passwordAnalysis.score} 
                      className="h-3"
                    />
                    <p className="text-xs text-muted-foreground">
                      Score: {passwordAnalysis.score}/100
                    </p>
                  </div>

                  {passwordAnalysis.feedback.length > 0 && (
                    <Alert variant="default" className="border-yellow-300">
                      <AlertTitle>Suggestions for Improvement</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside space-y-1 mt-2">
                          {passwordAnalysis.feedback.map((suggestion, index) => (
                            <li key={index} className="text-sm">{suggestion}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handlePasswordCheck}
                    disabled={!password || securityCheckMutation.isPending}
                    className="w-full bg-green-700 hover:bg-green-800 text-white"
                  >
                    {securityCheckMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Analysis'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Breach Check */}
          <PasswordBreachCheck />

          {/* Password Security Tips */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Password Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Use at least 12 characters</p>
                <p className="text-sm">• Mix uppercase, lowercase, numbers, and symbols</p>
                <p className="text-sm">• Avoid personal information</p>
                <p className="text-sm">• Use unique passwords for each account</p>
                <p className="text-sm">• Consider using a password manager</p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Common Password Mistakes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Using common words or phrases</p>
                <p className="text-sm">• Including personal dates or names</p>
                <p className="text-sm">• Reusing passwords across sites</p>
                <p className="text-sm">• Using keyboard patterns (qwerty, 123456)</p>
                <p className="text-sm">• Making passwords too short</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="url-scanner" className="space-y-6">
          {/* URL Scanner */}
          <Card className="border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <LinkIcon className="h-5 w-5 text-yellow-500" />
                URL Security Scanner
              </CardTitle>
              <CardDescription>
                Check if a website is safe before visiting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder="Enter URL to scan (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border-green-200 focus:ring-green-500"
                />
                <Button
                  onClick={handleUrlCheck}
                  disabled={!url || urlScanMutation.isPending}
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                >
                  {urlScanMutation.isPending ? "Scanning..." : "Scan URL"}
                </Button>
                {scanResult && (
                  <Alert variant={
                    scanResult.verdict === "safe" ? "default" : 
                    scanResult.verdict === "error" || scanResult.verdict === "invalid" ? "destructive" :
                    "destructive"
                  }>
                    <AlertDescription>
                      <div className="flex items-start gap-2">
                        {scanResult.verdict === "safe" ? (
                          <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 mt-0.5 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium">
                            {scanResult.verdict === "safe" && "URL is Safe"}
                            {scanResult.verdict === "suspicious" && "URL is Suspicious"}
                            {scanResult.verdict === "not safe" && "URL is Not Safe"}
                            {scanResult.verdict === "malicious" && "URL is Malicious"}
                            {scanResult.verdict === "invalid" && "Invalid URL Format"}
                            {scanResult.verdict === "error" && "Scan Error"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {scanResult.details || scanResult.error}
                          </p>
                          {scanResult.virusTotalResults && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Powered by VirusTotal security analysis
                            </p>
                          )}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* URL Security Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">What We Check For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Phishing attempts</p>
                <p className="text-sm">• Malware distribution</p>
                <p className="text-sm">• Suspicious domains</p>
                <p className="text-sm">• SSL certificate validity</p>
                <p className="text-sm">• Reputation database analysis</p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Stay Safe Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Always verify URLs before clicking</p>
                <p className="text-sm">• Look for HTTPS encryption</p>
                <p className="text-sm">• Be cautious of shortened links</p>
                <p className="text-sm">• Check sender authenticity in emails</p>
                <p className="text-sm">• Report suspicious websites</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
