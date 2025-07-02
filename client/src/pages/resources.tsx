import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, AlertTriangle, Link as LinkIcon, ExternalLink, MessageCircle, BookOpen } from "lucide-react";

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Cybersecurity Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Common Scams in Nigeria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Advance Fee Fraud (419 Scams)</h3>
              <p className="text-sm text-muted-foreground">
                Scammers promise large sums of money in exchange for upfront fees. Never send money to
                strangers promising unrealistic returns.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Investment Scams</h3>
              <p className="text-sm text-muted-foreground">
                Fake investment opportunities promising high returns. Always verify investment
                companies with the SEC Nigeria.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Romance Scams</h3>
              <p className="text-sm text-muted-foreground">
                Scammers build fake relationships to request money. Be cautious of online
                relationships, especially when money is involved.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Password Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Creating Strong Passwords</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Use at least 8 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers and special characters</li>
                <li>• Avoid personal information</li>
                <li>• Use unique passwords for each account</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Password Management Tips</h3>
              <p className="text-sm text-muted-foreground">
                Consider using a password manager to securely store and generate strong passwords.
                Enable two-factor authentication when available.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              Safe Browsing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Identifying Safe Websites</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Look for HTTPS in the URL</li>
                <li>• Verify website authenticity</li>
                <li>• Be cautious of misspelled URLs</li>
                <li>• Check for security certificates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Phishing Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Don't click on suspicious links. Verify sender emails. Never share sensitive
                information through email.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Official Resources</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Nigeria Cybercrime Act 2015</li>
                <li>• NITDA Guidelines</li>
                <li>• CBN Security Guidelines</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Report Cybercrime</h3>
              <p className="text-sm text-muted-foreground">
                Contact the Nigerian Police Cybercrime Unit or use our platform's reporting tool
                to report suspicious activities.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Educational Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Online Cybersecurity Courses</h3>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://www.open.edu/openlearn/digital-computing/introduction-cyber-security-stay-safe-online/content-section-overview" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Introduction to Cyber Security - OpenLearn
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://www.netacad.com/courses/introduction-to-cybersecurity" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Introduction to Cybersecurity - Cisco
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href="https://www.efcc.gov.ng/efcc/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    EFCC - Financial Crime Prevention
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <MessageCircle className="h-5 w-5" />
              Join Our Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with fellow Nigerians in our cybersecurity community. Get real-time alerts, 
              ask questions, and share experiences.
            </p>
            <Button asChild className="w-full bg-green-700 hover:bg-green-800">
              <a href="https://chat.whatsapp.com/LrCTljj3otP7B2pR0PAZp2" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Join WhatsApp Community
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
