import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";

async function sha1(str: string): Promise<string> {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkPasswordBreach(hash: string): Promise<number> {
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5).toUpperCase();

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  if (!response.ok) throw new Error('Failed to check password');

  const text = await response.text();
  const hashes = text.split('\n');

  for (const line of hashes) {
    const [hashSuffix, count] = line.split(':');
    if (hashSuffix.trim() === suffix) {
      return parseInt(count);
    }
  }

  return 0;
}

export default function PasswordBreachCheck() {
  const [password, setPassword] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{ breached: boolean; count?: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!password) return;

    setIsChecking(true);
    setResult(null);
    setError(null);

    try {
      const hash = await sha1(password);
      const breachCount = await checkPasswordBreach(hash);
      setResult({ breached: breachCount > 0, count: breachCount });
    } catch (err) {
      setError("Failed to check password. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Shield className="h-5 w-5" />
          Password Breach Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter password to check"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-green-200 focus:ring-green-500"
          />
          <p className="text-sm text-muted-foreground">
            Your password is never sent to any server - only a partial hash is used to check for breaches.
          </p>
        </div>

        <Button
          onClick={handleCheck}
          disabled={!password || isChecking}
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Password'
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert variant={result.breached ? "destructive" : "default"}>
            <AlertTitle className="flex items-center gap-2">
              {result.breached ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {result.breached ? 'Password Compromised' : 'Password Safe'}
            </AlertTitle>
            <AlertDescription>
              {result.breached
                ? `This password has been found in ${result.count?.toLocaleString()} data breaches. Please choose a stronger password.`
                : 'This password has not been found in any known data breaches.'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}