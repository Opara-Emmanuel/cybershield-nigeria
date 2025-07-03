import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle, Shield } from "lucide-react";

export default function ReportScam() {
  useEffect(() => {
    // Redirect to government site after 3 seconds
    const timer = setTimeout(() => {
      window.open("https://nccc.npf.gov.ng/", "_blank");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Report a Scam</h1>
        <p className="text-gray-600 mb-6">
          You will be redirected to the official Nigeria Police Cybercrime Centre for reporting
        </p>
        <div className="animate-pulse text-green-600 font-medium">
          Redirecting in 3 seconds...
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Shield className="h-5 w-5" />
              Official Reporting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Report directly to the Nigeria Police Force Cybercrime Centre for immediate action.
            </p>
            <Button asChild className="w-full bg-green-700 hover:bg-green-800">
              <a href="https://nccc.npf.gov.ng/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Go to NCCC Portal
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <MessageCircle className="h-5 w-5" />
              Community Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Join our WhatsApp community for support and cybersecurity discussions.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="https://chat.whatsapp.com/LrCTljj3otP7B2pR0PAZp2" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Join WhatsApp Community
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700">
        <CardHeader>
          <CardTitle className="text-yellow-800 dark:text-yellow-200">Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-yellow-900 dark:text-yellow-100">• Report scams immediately to prevent others from being victimized</p>
          <p className="text-sm text-yellow-900 dark:text-yellow-100">• Provide as much detail as possible in your report</p>
          <p className="text-sm text-yellow-900 dark:text-yellow-100">• Keep evidence such as screenshots, emails, or messages</p>
          <p className="text-sm text-yellow-900 dark:text-yellow-100">• Never engage with suspected scammers</p>
        </CardContent>
      </Card>
    </div>
  );
}