
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Lightbulb, 
  MessageCircle, 
  Send, 
  Loader2,
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Users, 
  Clock,
  Target,
  Zap,
  Eye
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIThreatIntel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const generateTipMutation = useMutation({
    mutationFn: async (topic?: string) => {
      const res = await apiRequest("POST", "/api/generate-security-tip", { topic });
      return res.json();
    },
    onSuccess: (data) => {
      const newMessage: ChatMessage = {
        role: 'assistant',
        content: data.tip,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    },
    onError: (error: any) => {
      console.error('AI tip generation error:', error);
      toast({
        title: "Error generating tip",
        description: error.message || "Cohere AI service temporarily unavailable. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const res = await apiRequest("POST", "/api/ai-chat", { question });
      return res.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error: any) => {
      console.error('AI chat error:', error);
      toast({
        title: "Error getting AI response",
        description: error.message || "Cohere AI service temporarily unavailable. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const threatData = [
    {
      id: "phishing-spike",
      title: "Banking Phishing Attacks Surge",
      severity: "high",
      type: "Phishing",
      region: "Lagos, Abuja",
      targets: "Bank customers",
      description: "Sophisticated phishing campaigns targeting major Nigerian banks detected",
      indicators: ["fake-bank-sms.com", "urgent-account-verification.ng", "+234-701-SCAM"],
      recommendations: [
        "Never click links in SMS claiming urgent account issues",
        "Always verify directly with your bank through official channels",
        "Enable two-factor authentication on all banking apps"
      ],
      affectedUsers: 2500,
      firstSeen: "2025-01-28",
      lastUpdated: "2025-01-28"
    },
    {
      id: "romance-scam",
      title: "Romance Scam Network Active",
      severity: "medium",
      type: "Social Engineering",
      region: "Nationwide",
      targets: "Dating app users",
      description: "Organized romance scam network targeting Nigerian professionals on dating platforms",
      indicators: ["Investment opportunities", "Emergency financial requests", "Military/overseas personas"],
      recommendations: [
        "Never send money to someone you've only met online",
        "Verify identity through video calls",
        "Be suspicious of quick romantic declarations"
      ],
      affectedUsers: 800,
      firstSeen: "2025-01-25",
      lastUpdated: "2025-01-28"
    },
    {
      id: "crypto-fraud",
      title: "Fake Cryptocurrency Exchange",
      severity: "critical",
      type: "Financial Fraud",
      region: "Port Harcourt, Benin",
      targets: "Crypto investors",
      description: "Fraudulent cryptocurrency exchange promising unrealistic returns",
      indicators: ["nigeria-crypto-profit.com", "Guaranteed 300% returns", "WhatsApp investment groups"],
      recommendations: [
        "Only use registered and verified crypto exchanges",
        "Research any investment opportunity thoroughly",
        "Be wary of guaranteed high returns"
      ],
      affectedUsers: 1200,
      firstSeen: "2025-01-22",
      lastUpdated: "2025-01-28"
    }
  ];

  const handleGenerateTip = () => {
    const tipMessage: ChatMessage = {
      role: 'user',
      content: "Generate a cybersecurity tip",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, tipMessage]);
    generateTipMutation.mutate("general cybersecurity");
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(question);
    setQuestion("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "high": return <TrendingUp className="h-4 w-4 text-orange-600" />;
      case "medium": return <Eye className="h-4 w-4 text-yellow-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">AI Security & Threat Intelligence</h1>
        <p className="text-lg text-muted-foreground">
          AI-powered cybersecurity guidance and real-time threat monitoring for Nigeria
        </p>
      </div>

      <Tabs defaultValue="ai-advisor" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-advisor" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Security Advisor
          </TabsTrigger>
          <TabsTrigger value="threat-intel" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Threat Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-advisor" className="space-y-6">
          {/* Quick Tip Generator */}
          <Card className="border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Quick Security Tip Generator
              </CardTitle>
              <CardDescription>
                Get instant cybersecurity tips tailored for Nigerian users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleGenerateTip}
                disabled={generateTipMutation.isPending}
                className="w-full bg-green-700 hover:bg-green-800 text-white"
              >
                {generateTipMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Tip...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate Security Tip
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Chat Interface */}
          <Card className="border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <MessageCircle className="h-5 w-5 text-yellow-500" />
                Ask CyberShield AI
              </CardTitle>
              <CardDescription>
                Ask any cybersecurity question and get expert advice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              {messages.length > 0 && (
                <ScrollArea className="h-96 w-full rounded border p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-green-700 text-white'
                              : 'bg-yellow-100 text-green-800 border border-yellow-300'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {(generateTipMutation.isPending || chatMutation.isPending) && (
                      <div className="flex justify-start">
                        <div className="bg-yellow-100 text-green-800 border border-yellow-300 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about passwords, scams, online security, etc..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-green-200 focus:ring-green-500"
                />
                <Button
                  onClick={handleAskQuestion}
                  disabled={!question.trim() || chatMutation.isPending}
                  size="icon"
                  className="bg-green-700 hover:bg-green-800 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {messages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <p>Start a conversation with CyberShield AI</p>
                  <p className="text-sm">Ask about online safety, password security, or reporting scams</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threat-intel" className="space-y-6">
          {/* Threat Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Critical Threats</p>
                    <p className="text-3xl font-bold text-red-700">1</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">High Threats</p>
                    <p className="text-3xl font-bold text-orange-700">1</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Medium Threats</p>
                    <p className="text-3xl font-bold text-yellow-700">1</p>
                  </div>
                  <Eye className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Total Tracked</p>
                    <p className="text-3xl font-bold text-green-700">4,500</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Alert */}
          <Alert className="border-blue-200 bg-blue-50">
            <Zap className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Enhanced Threat Intelligence Coming Soon!</strong> Real-time threat feeds, 
              automated alerts, and personalized threat notifications will be available after our September launch.
            </AlertDescription>
          </Alert>

          {/* Active Threats */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-800">Active Threats</h2>
            
            {threatData.map((threat) => (
              <Card 
                key={threat.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedThreat === threat.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedThreat(selectedThreat === threat.id ? null : threat.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {getSeverityIcon(threat.severity)}
                        <CardTitle className="text-green-800">{threat.title}</CardTitle>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="max-w-2xl">
                        {threat.description}
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {threat.affectedUsers.toLocaleString()} affected
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Updated {threat.lastUpdated}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {selectedThreat === threat.id && (
                  <CardContent className="border-t bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Threat Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">Type:</span>
                              <span>{threat.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Region:</span>
                              <span>{threat.region}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Targets:</span>
                              <span>{threat.targets}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">First Seen:</span>
                              <span>{threat.firstSeen}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">Threat Indicators</h4>
                          <div className="space-y-1">
                            {threat.indicators.map((indicator, index) => (
                              <div key={index} className="text-sm bg-red-50 p-2 rounded border-l-2 border-red-300">
                                <code className="text-red-700">{indicator}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Protection Recommendations
                        </h4>
                        <div className="space-y-2">
                          {threat.recommendations.map((rec, index) => (
                            <div key={index} className="text-sm bg-green-50 p-3 rounded border-l-2 border-green-300">
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Threat Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Nigerian Cybersecurity Intelligence Network</p>
                <p className="text-sm">• Financial institutions threat feeds</p>
                <p className="text-sm">• Law enforcement cyber crime reports</p>
                <p className="text-sm">• International threat intelligence partners</p>
                <p className="text-sm">• Community-reported incidents</p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Stay Protected
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">• Enable threat intelligence alerts in your dashboard</p>
                <p className="text-sm">• Report suspicious activities immediately</p>
                <p className="text-sm">• Keep your security tools updated</p>
                <p className="text-sm">• Subscribe to our threat intelligence newsletter</p>
                <p className="text-sm">• Share threat information with your organization</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
