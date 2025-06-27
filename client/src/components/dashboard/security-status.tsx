import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";
import type { SecurityCheck, ScamReport } from "@shared/schema";

interface SecurityStatusProps {
  checks: SecurityCheck[];
  reports: ScamReport[];
}

export default function SecurityStatus({ checks, reports }: SecurityStatusProps) {
  const recentChecks = checks.slice(-5).reverse(); // Show most recent first
  
  const getSecurityScore = () => {
    if (checks.length === 0) return 0;
    
    // Base points for engagement
    let score = Math.min(checks.length * 5, 30); // Up to 30 points for usage
    
    // Password strength points
    const passwordChecks = checks.filter(c => c.type === "password");
    const strongPasswords = passwordChecks.filter(c => c.verdict === "strong").length;
    score += strongPasswords * 15; // 15 points per strong password
    
    // URL scanning points
    const urlChecks = checks.filter(c => c.type === "url_scan" || c.type === "url");
    const safeUrls = urlChecks.filter(c => c.verdict === "safe").length;
    score += safeUrls * 10; // 10 points per safe URL
    
    // Scam reporting participation
    score += reports.length * 5; // 5 points per scam report
    
    // Deduct points for suspicious/malicious findings
    const suspiciousFindings = checks.filter(c => 
      c.verdict === "suspicious" || c.verdict === "malicious" || c.verdict === "weak"
    ).length;
    score -= suspiciousFindings * 5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const score = getSecurityScore();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Security Score</span>
                <span className="text-sm text-muted-foreground">{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>

            {score < 50 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Security Risk</AlertTitle>
                <AlertDescription>
                  Your security score is low. Consider checking your passwords and scanning suspicious URLs.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm font-medium">Total Checks</span>
                <p className="text-2xl font-bold">{checks.length}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium">Reports Submitted</span>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>

            {recentChecks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Security Checks</h4>
                {recentChecks.length > 0 ? (
                  recentChecks.map((check) => (
                    <div
                      key={check.id}
                      className="flex justify-between items-center text-sm p-2 rounded border"
                    >
                      <div>
                        <span className="font-medium">
                          {check.type === "password" && "Password Check"}
                          {check.type === "url_scan" && "URL Scan"}
                          {check.type === "url" && "URL Check"}
                          {!["password", "url_scan", "url"].includes(check.type) && check.type}
                        </span>
                        {check.url && (
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {check.url}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(check.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          check.verdict === "strong" || check.verdict === "safe"
                            ? "bg-green-100 text-green-800"
                            : check.verdict === "suspicious" || check.verdict === "weak"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {check.verdict}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No security checks performed yet. Start by checking your password strength or scanning a URL!
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
