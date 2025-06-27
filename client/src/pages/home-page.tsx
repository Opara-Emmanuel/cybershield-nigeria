import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import SecurityStatus from "@/components/dashboard/security-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Link as LinkIcon, Shield, FileText } from "lucide-react";
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
      </div>

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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}