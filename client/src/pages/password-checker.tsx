import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle, XCircle, Eye, EyeOff, Loader2 } from "lucide-react";
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

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordStrengthResult | null>(null);
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

  const handlePasswordCheck = () => {
    if (!password) return;
    
    const result = analyzePasswordStrength(password);
    setAnalysis(result);
    
    securityCheckMutation.mutate({
      type: "password",
      result: result.level.toLowerCase(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Password Security Center</h1>
        <p className="text-muted-foreground">Check your password strength and security</p>
      </div>

      <div className="space-y-6">
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
                    setAnalysis(result);
                  } else {
                    setAnalysis(null);
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

            {analysis && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Password Strength</span>
                    <span className={`text-sm font-bold ${analysis.color}`}>
                      {analysis.level}
                    </span>
                  </div>
                  <Progress 
                    value={analysis.score} 
                    className="h-3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Score: {analysis.score}/100
                  </p>
                </div>

                {analysis.feedback.length > 0 && (
                  <Alert variant="default" className="border-yellow-300">
                    <AlertTitle>Suggestions for Improvement</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        {analysis.feedback.map((suggestion, index) => (
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
      </div>
    </div>
  );
}