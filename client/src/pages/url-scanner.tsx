import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link as LinkIcon, CheckCircle, XCircle, Shield } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

function urlLooksLegit(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.hostname.includes("scam");
  } catch {
    return false;
  }
}

export default function URLScanner() {
  const [url, setUrl] = useState("");
  const { user } = useAuth();

  const [scanResult, setScanResult] = useState(null);

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
      // Use the error data from the backend response
      setScanResult({
        error: error.error || error.message || "Unable to scan URL at this time",
        verdict: error.verdict || "error",
        details: error.details || error.error || "Please try again later"
      });
    },
  });

  const handleUrlCheck = () => {
    if (!url.trim()) return;
    setScanResult(null);
    urlScanMutation.mutate(url.trim());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">URL Security Scanner</h1>
        <p className="text-muted-foreground">Check if a website is safe before visiting</p>
      </div>

      <Card className="border-2 border-yellow-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <LinkIcon className="h-5 w-5 text-yellow-500" />
            Scan URL for Security Threats
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

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">What We Check For</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Phishing attempts</p>
            <p className="text-sm">• Malware distribution</p>
            <p className="text-sm">• Suspicious domains</p>
            <p className="text-sm">• SSL certificate validity</p>
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
            <p className="text-sm">• Report suspicious websites</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}