import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Link as LinkIcon, CheckCircle, XCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import PasswordBreachCheck from "@/components/security/password-breach-check";

function checkPasswordStrength(password: string): string {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  if (hasLower && hasUpper && hasNumber && hasSpecial && isLongEnough) {
    return "strong";
  } else if ((hasLower || hasUpper) && hasNumber && isLongEnough) {
    return "medium";
  }
  return "weak";
}

function urlLooksLegit(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.hostname.includes("scam");
  } catch {
    return false;
  }
}

export default function SecurityCheck() {
  const [password, setPassword] = useState("");
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
    const strength = checkPasswordStrength(password);
    securityCheckMutation.mutate({
      type: "password",
      result: strength,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Security Check Tools</h1>

      <div className="space-y-6">
        <PasswordBreachCheck />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Password Strength Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password to check"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handlePasswordCheck}
                disabled={!password || securityCheckMutation.isPending}
                className="w-full"
              >
                Check Strength
              </Button>
              {securityCheckMutation.data?.type === "password" && (
                <Alert variant={securityCheckMutation.data.result === "strong" ? "default" : "destructive"}>
                  <AlertDescription className="flex items-center gap-2">
                    {securityCheckMutation.data.result === "strong" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    Password strength: {securityCheckMutation.data.result}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}