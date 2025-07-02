import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import SecurityStatus from "@/components/dashboard/security-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Link as LinkIcon, Shield, FileText, Crown, UserCheck, TrendingUp, Mail, Brain, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import type { ScamReport, SecurityCheck } from "@shared/schema";

export default function HomePage() {
  const { user } = useAuth();

  const { data: securityChecks } = useQuery<SecurityCheck[]>({
    queryKey: ["/api/security-checks"],
  });

  const { data: scamReports } = useQuery<ScamReport[]>({
    queryKey: ["/api/scam-reports"],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.username}!</h1>

      <SecurityStatus checks={securityChecks || []} reports={scamReports || []} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Password Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check if your password is strong enough to protect your accounts.
            </p>
            <Link href="/password-checker">
              <Button className="w-full">Check Password</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              URL Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Scan URLs for potential phishing or malicious content.
            </p>
            <Link href="/url-scanner">
              <Button className="w-full">Scan URL</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Report Scam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Report suspected scams to help protect the community.
            </p>
            <Link href="/report-scam">
              <Button className="w-full">Report</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              Identity Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Verify individuals and businesses with KYC technology.
            </p>
            <Link href="/verification">
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Verify ID</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Additional Security Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Threat Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated on latest cybersecurity threats targeting Nigeria.
            </p>
            <Link href="/threat-intelligence">
              <Button variant="outline" className="w-full">View Threats</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Analyze emails and domains for phishing and malware threats.
            </p>
            <Link href="/email-security">
              <Button variant="outline" className="w-full">Analyze Email</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Community Section */}
      <Card className="mt-8 border-green-100 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <MessageCircle className="h-5 w-5" />
            Join Our Community
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-green-800">WhatsApp Security Community</h3>
              <p className="text-sm text-muted-foreground">Connect with fellow Nigerians, get real-time security alerts, and stay informed.</p>
            </div>
            <Button asChild className="bg-green-700 hover:bg-green-800">
              <a href="https://chat.whatsapp.com/LrCTljj3otP7B2pR0PAZp2" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Join Now
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Latest Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Spotting Common Scams</h3>
                <p className="text-sm text-muted-foreground">Learn how to identify and avoid common scams.</p>
              </div>
              <Link href="/resources">
                <Button variant="outline">Read More</Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password Best Practices</h3>
                <p className="text-sm text-muted-foreground">Tips for creating and managing secure passwords.</p>
              </div>
              <Link href="/resources">
                <Button variant="outline">Read More</Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Identity Verification Guide</h3>
                <p className="text-sm text-muted-foreground">How to verify identities safely and securely.</p>
              </div>
              <Link href="/resources">
                <Button variant="outline">Read More</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}