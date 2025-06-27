import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Shield } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ReportScam() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [reportedUrl, setReportedUrl] = useState("");

  const reportScamMutation = useMutation({
    mutationFn: async (data: { type: string; description: string; reportedUrl?: string }) => {
      const res = await apiRequest("POST", "/api/scam-report", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scam-reports"] });
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for helping keep our community safe. Our team will review your report.",
      });
      setType("");
      setDescription("");
      setReportedUrl("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error Submitting Report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    reportScamMutation.mutate({
      type,
      description,
      reportedUrl: reportedUrl || undefined,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Report a Scam</h1>
        <p className="text-gray-600">Help protect others by reporting suspicious activities</p>
      </div>

      <Card className="border-green-100">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="h-5 w-5" />
            Submit Report
          </CardTitle>
          <CardDescription>
            Your report will be reviewed by our security team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-green-800">
                Type of Scam *
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-green-200 focus:ring-green-500">
                  <SelectValue placeholder="Select scam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phishing">Phishing Attempt</SelectItem>
                  <SelectItem value="investment">Investment Fraud</SelectItem>
                  <SelectItem value="romance">Romance Scam</SelectItem>
                  <SelectItem value="impersonation">Identity Theft/Impersonation</SelectItem>
                  <SelectItem value="banking">Banking Fraud</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-green-800">
                Description *
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed information about the scam..."
                className="min-h-[120px] border-green-200 focus:ring-green-500"
                rows={5}
              />
              <p className="mt-1 text-sm text-gray-500">
                Include any relevant details that could help identify the scam
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-green-800">
                URL (Optional)
              </label>
              <Input
                type="url"
                value={reportedUrl}
                onChange={(e) => setReportedUrl(e.target.value)}
                placeholder="Enter the suspicious website URL"
                className="border-green-200 focus:ring-green-500"
              />
            </div>

            <Button
              type="submit"
              disabled={!type || !description || reportScamMutation.isPending}
              className="w-full bg-green-700 hover:bg-green-800 text-white"
            >
              {reportScamMutation.isPending ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Common Scam Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Phishing emails claiming to be from banks</p>
            <p className="text-sm">• Fake investment opportunities</p>
            <p className="text-sm">• Romance scams on social media</p>
            <p className="text-sm">• Impersonation of government officials</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Reporting Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Be specific about what happened</p>
            <p className="text-sm">• Include dates and times if possible</p>
            <p className="text-sm">• Save any evidence or screenshots</p>
            <p className="text-sm">• Report as soon as possible</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}