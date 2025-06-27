import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TOPICS = [
  { value: "general", label: "General Online Safety" },
  { value: "password", label: "Password Security" },
  { value: "social", label: "Social Media Safety" },
  { value: "banking", label: "Online Banking" },
  { value: "phishing", label: "Phishing Prevention" },
  { value: "scams", label: "Scam Awareness" },
];

// Fallback tips when API is unavailable
const FALLBACK_TIPS = {
  general: "Always be cautious when sharing personal information online. If something seems too good to be true, it probably is.",
  password: "Use unique passwords for each account and consider using a password manager to securely store them.",
  social: "Be careful about the personal information you share on social media. Scammers can use this information against you.",
  banking: "Never share your banking OTP or PIN with anyone. Banks will never ask for these details via phone or email.",
  phishing: "Always verify the sender's email address and don't click on suspicious links, even if they appear to be from a trusted source.",
  scams: "Be wary of unsolicited investment opportunities or requests for money transfers, especially from unknown contacts.",
};

export default function AISecurityTips() {
  const [topic, setTopic] = useState("general");
  const { toast } = useToast();

  const tipMutation = useMutation({
    mutationFn: async (topic: string) => {
      const res = await apiRequest("POST", "/api/generate-security-tip", { topic });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    },
    onError: (error: Error) => {
      // Show error toast but still display fallback tip
      toast({
        title: "Using offline security tip",
        description: "AI service is temporarily unavailable. Showing a pre-written security tip instead.",
        variant: "default",
      });
      return { tip: FALLBACK_TIPS[topic as keyof typeof FALLBACK_TIPS] };
    },
  });

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Lightbulb className="h-5 w-5" />
          AI Security Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-green-800">
            Choose a Topic
          </label>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="border-green-200 focus:ring-green-500">
              <SelectValue placeholder="Select security topic" />
            </SelectTrigger>
            <SelectContent>
              {TOPICS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => tipMutation.mutate(topic)}
          disabled={tipMutation.isPending}
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          {tipMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Tip...
            </>
          ) : (
            'Get Security Tip'
          )}
        </Button>

        {tipMutation.data?.tip && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 leading-relaxed">{tipMutation.data.tip}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}