import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  FileText,
  Link as LinkIcon,
  Clock
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface EmailAnalysisResult {
  id: string;
  type: 'email' | 'domain';
  status: 'safe' | 'suspicious' | 'malicious' | 'unknown';
  score: number;
  analysis: {
    spf: boolean;
    dkim: boolean;
    dmarc: boolean;
    reputation: string;
    blacklisted: boolean;
    phishingIndicators: string[];
    recommendations: string[];
  };
  createdAt: string;
}

export default function EmailSecurity() {
  const [activeTab, setActiveTab] = useState("email");
  const [analysisResult, setAnalysisResult] = useState<EmailAnalysisResult | null>(null);

  // Email analysis form state
  const [emailData, setEmailData] = useState({
    senderEmail: "",
    subject: "",
    content: "",
    headers: ""
  });

  // Domain analysis form state
  const [domainData, setDomainData] = useState({
    domain: ""
  });

  const emailAnalysisMutation = useMutation({
    mutationFn: async (data: typeof emailData) => {
      const res = await apiRequest("POST", "/api/analyze-email", data);
      return res.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/security-checks"] });
    },
    onError: (error: any) => {
      console.error('Email analysis error:', error);
    },
  });

  const domainAnalysisMutation = useMutation({
    mutationFn: async (data: typeof domainData) => {
      const res = await apiRequest("POST", "/api/analyze-domain", data);
      return res.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/security-checks"] });
    },
    onError: (error: any) => {
      console.error('Domain analysis error:', error);
    },
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailData.senderEmail) return;
    setAnalysisResult(null);
    emailAnalysisMutation.mutate(emailData);
  };

  const handleDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainData.domain) return;
    setAnalysisResult(null);
    domainAnalysisMutation.mutate(domainData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "bg-green-100 text-green-800";
      case "suspicious": return "bg-yellow-100 text-yellow-800";
      case "malicious": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "suspicious": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "malicious": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Search className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Email Security Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Analyze emails and domains for phishing, spam, and malicious content
        </p>
      </div>

      {/* Coming Soon Alert */}
      <Alert className="mb-8 border-orange-200 bg-orange-50">
        <Clock className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Coming Soon!</strong> Advanced email security analysis with real-time threat detection 
          will be available after our September launch. Currently showing demo interface.
        </AlertDescription>
      </Alert>

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Analysis
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Domain Reputation
          </TabsTrigger>
        </TabsList>

        {/* Email Analysis Tab */}
        <TabsContent value="email">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Mail className="h-5 w-5" />
                Email Security Analysis
              </CardTitle>
              <CardDescription>
                Analyze suspicious emails for phishing, malware, and social engineering attacks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email Address *</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      placeholder="suspicious@example.com"
                      value={emailData.senderEmail}
                      onChange={(e) => setEmailData({...emailData, senderEmail: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Enter email subject line"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Email Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste the email content here..."
                    rows={6}
                    value={emailData.content}
                    onChange={(e) => setEmailData({...emailData, content: e.target.value})}
                    className="border-green-200 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headers">Email Headers (Optional)</Label>
                  <Textarea
                    id="headers"
                    placeholder="Paste email headers for detailed analysis..."
                    rows={4}
                    value={emailData.headers}
                    onChange={(e) => setEmailData({...emailData, headers: e.target.value})}
                    className="border-green-200 focus:ring-green-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  disabled={emailAnalysisMutation.isPending}
                >
                  {emailAnalysisMutation.isPending ? "Analyzing Email..." : "Analyze Email Security"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Domain Analysis Tab */}
        <TabsContent value="domain">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <LinkIcon className="h-5 w-5" />
                Domain Reputation Check
              </CardTitle>
              <CardDescription>
                Check domain reputation, DNS security records, and threat intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDomainSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Name *</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={domainData.domain}
                    onChange={(e) => setDomainData({domain: e.target.value})}
                    className="border-green-200 focus:ring-green-500"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  disabled={domainAnalysisMutation.isPending}
                >
                  {domainAnalysisMutation.isPending ? "Checking Domain..." : "Check Domain Reputation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis Results */}
      {analysisResult && (
        <Card className="mt-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(analysisResult.status)}
              Security Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Security Status:</span>
                  <Badge className={getStatusColor(analysisResult.status)}>
                    {analysisResult.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Risk Score: </span>
                  <span className="font-bold text-lg">{analysisResult.score}/100</span>
                </div>
              </div>

              {/* Technical Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security Records
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">SPF Record:</span>
                      <Badge variant={analysisResult.analysis.spf ? "default" : "destructive"}>
                        {analysisResult.analysis.spf ? "Valid" : "Missing"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">DKIM:</span>
                      <Badge variant={analysisResult.analysis.dkim ? "default" : "destructive"}>
                        {analysisResult.analysis.dkim ? "Valid" : "Missing"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">DMARC:</span>
                      <Badge variant={analysisResult.analysis.dmarc ? "default" : "destructive"}>
                        {analysisResult.analysis.dmarc ? "Valid" : "Missing"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Blacklisted:</span>
                      <Badge variant={analysisResult.analysis.blacklisted ? "destructive" : "default"}>
                        {analysisResult.analysis.blacklisted ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Threat Indicators
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.analysis.phishingIndicators.length > 0 ? (
                      analysisResult.analysis.phishingIndicators.map((indicator, index) => (
                        <div key={index} className="text-sm bg-red-50 p-2 rounded border-l-2 border-red-300">
                          {indicator}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-300">
                        No phishing indicators detected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Security Recommendations
                </h4>
                <div className="space-y-2">
                  {analysisResult.analysis.recommendations.map((rec, index) => (
                    <div key={index} className="text-sm bg-blue-50 p-3 rounded border-l-2 border-blue-300">
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Analysis completed on {new Date(analysisResult.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              What We Analyze
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Sender reputation and authentication</p>
            <p className="text-sm">• Email content for phishing patterns</p>
            <p className="text-sm">• Links and attachments for malware</p>
            <p className="text-sm">• Domain security configurations</p>
            <p className="text-sm">• Threat intelligence database matching</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Email Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Verify sender identity before responding</p>
            <p className="text-sm">• Don't click suspicious links or attachments</p>
            <p className="text-sm">• Check for spelling and grammar errors</p>
            <p className="text-sm">• Be wary of urgent requests for information</p>
            <p className="text-sm">• Use email security software and filters</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}