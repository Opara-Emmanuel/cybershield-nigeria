import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Lightbulb, MessageCircle, Send, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAdvisor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">CyberShield AI Advisor</h1>
        <p className="text-muted-foreground">Get expert cybersecurity guidance powered by AI</p>
      </div>

      <div className="space-y-6">
        {/* Quick Tip Generator */}
        <Card className="border-2 border-yellow-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Quick Security Tip
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
      </div>
    </div>
  );
}