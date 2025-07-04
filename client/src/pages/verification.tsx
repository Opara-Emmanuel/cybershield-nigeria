import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  UserCheck, 
  Building2, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Crown, 
  AlertTriangle,
  Phone,
  Mail,
  CreditCard,
  FileText
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface VerificationResult {
  id: string;
  type: 'individual' | 'business';
  status: 'verified' | 'failed' | 'pending';
  data: any;
  createdAt: string;
}

export default function Verification() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("individual");
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Individual verification form state
  const [individualForm, setIndividualForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nin: "",
    bvn: ""
  });

  // Business verification form state
  const [businessForm, setBusinessForm] = useState({
    businessName: "",
    rcNumber: "",
    tin: "",
    phoneNumber: "",
    email: "",
    address: ""
  });

  const individualVerificationMutation = useMutation({
    mutationFn: async (data: typeof individualForm) => {
      const res = await apiRequest("POST", "/api/verify-individual", data);
      return res.json();
    },
    onSuccess: (data) => {
      setVerificationResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/verifications"] });
    },
    onError: (error: any) => {
      console.error('Individual verification error:', error);
    },
  });

  const businessVerificationMutation = useMutation({
    mutationFn: async (data: typeof businessForm) => {
      const res = await apiRequest("POST", "/api/verify-business", data);
      return res.json();
    },
    onSuccess: (data) => {
      setVerificationResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/verifications"] });
    },
    onError: (error: any) => {
      console.error('Business verification error:', error);
    },
  });

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!individualForm.firstName || !individualForm.lastName || !individualForm.phoneNumber) {
      return;
    }
    setVerificationResult(null);
    individualVerificationMutation.mutate(individualForm);
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessForm.businessName || !businessForm.phoneNumber) {
      return;
    }
    setVerificationResult(null);
    businessVerificationMutation.mutate(businessForm);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please log in to access identity verification services.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              COMING SOON
            </Badge>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-green-800 mb-2">Identity Verification</h1>
        <p className="text-lg text-muted-foreground">
          Verify the identity of individuals and businesses in Nigeria with advanced KYC technology
        </p>
      </div>

      {/* Premium Notice */}
      <Card className="border-2 border-yellow-300 bg-yellow-50 mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Shield className="h-8 w-8 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Enhanced Security with Professional Verification
              </h3>
              <p className="text-yellow-700 mb-4">
                Our identity verification service uses advanced KYC (Know Your Customer) technology 
                to authenticate identities against official Nigerian databases including NIN, BVN, 
                and CAC records.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-yellow-800">Individual Verification</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• National Identification Number (NIN) validation</li>
                    <li>• Bank Verification Number (BVN) check</li>
                    <li>• Phone number verification</li>
                    <li>• Real-time identity matching</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-yellow-800">Business Verification</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Corporate Affairs Commission (CAC) lookup</li>
                    <li>• Tax Identification Number (TIN) validation</li>
                    <li>• Business registration verification</li>
                    <li>• Director and shareholder checks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Individual Verification
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business Verification
          </TabsTrigger>
        </TabsList>

        {/* Individual Verification */}
        <TabsContent value="individual">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <UserCheck className="h-5 w-5" />
                Individual Identity Verification
              </CardTitle>
              <CardDescription>
                Verify an individual's identity using official Nigerian databases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleIndividualSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={individualForm.firstName}
                      onChange={(e) => setIndividualForm({...individualForm, firstName: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={individualForm.lastName}
                      onChange={(e) => setIndividualForm({...individualForm, lastName: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Enter phone number (e.g., +234xxxxxxxxxx)"
                    value={individualForm.phoneNumber}
                    onChange={(e) => setIndividualForm({...individualForm, phoneNumber: e.target.value})}
                    className="border-green-200 focus:ring-green-500"
                    required
                  />
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nin" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      National Identification Number (NIN)
                    </Label>
                    <Input
                      id="nin"
                      placeholder="Enter 11-digit NIN (optional)"
                      value={individualForm.nin}
                      onChange={(e) => setIndividualForm({...individualForm, nin: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                      maxLength={11}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bvn" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Bank Verification Number (BVN)
                    </Label>
                    <Input
                      id="bvn"
                      placeholder="Enter 11-digit BVN (optional)"
                      value={individualForm.bvn}
                      onChange={(e) => setIndividualForm({...individualForm, bvn: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                      maxLength={11}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  disabled={individualVerificationMutation.isPending}
                >
                  {individualVerificationMutation.isPending ? "Verifying Identity..." : "Verify Individual"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Verification */}
        <TabsContent value="business">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Building2 className="h-5 w-5" />
                Business Identity Verification
              </CardTitle>
              <CardDescription>
                Verify a business entity using CAC and official records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBusinessSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter registered business name"
                    value={businessForm.businessName}
                    onChange={(e) => setBusinessForm({...businessForm, businessName: e.target.value})}
                    className="border-green-200 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rcNumber" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      RC Number
                    </Label>
                    <Input
                      id="rcNumber"
                      placeholder="Enter RC number (optional)"
                      value={businessForm.rcNumber}
                      onChange={(e) => setBusinessForm({...businessForm, rcNumber: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tin" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Tax Identification Number (TIN)
                    </Label>
                    <Input
                      id="tin"
                      placeholder="Enter TIN (optional)"
                      value={businessForm.tin}
                      onChange={(e) => setBusinessForm({...businessForm, tin: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Business Phone Number *
                    </Label>
                    <Input
                      id="businessPhone"
                      placeholder="Enter business phone"
                      value={businessForm.phoneNumber}
                      onChange={(e) => setBusinessForm({...businessForm, phoneNumber: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Business Email
                    </Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="Enter business email"
                      value={businessForm.email}
                      onChange={(e) => setBusinessForm({...businessForm, email: e.target.value})}
                      className="border-green-200 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter business address (optional)"
                    value={businessForm.address}
                    onChange={(e) => setBusinessForm({...businessForm, address: e.target.value})}
                    className="border-green-200 focus:ring-green-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                  disabled={businessVerificationMutation.isPending}
                >
                  {businessVerificationMutation.isPending ? "Verifying Business..." : "Verify Business"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verification Results */}
      {verificationResult && (
        <Card className="mt-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verificationResult.status === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Verification Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge 
                  variant={verificationResult.status === 'verified' ? 'default' : 'destructive'}
                  className={verificationResult.status === 'verified' ? 'bg-green-100 text-green-800' : ''}
                >
                  {verificationResult.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Verification Details</h4>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {JSON.stringify(verificationResult.data, null, 2)}
                </pre>
              </div>

              <p className="text-sm text-muted-foreground">
                Verification completed on {new Date(verificationResult.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Info */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Why Verify Identity?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Prevent fraud and identity theft</p>
            <p className="text-sm">• Comply with KYC regulations</p>
            <p className="text-sm">• Build trust in business relationships</p>
            <p className="text-sm">• Secure financial transactions</p>
            <p className="text-sm">• Verify contractor and employee identities</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Data Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• All data encrypted in transit and at rest</p>
            <p className="text-sm">• Compliant with Nigeria Data Protection Regulation</p>
            <p className="text-sm">• No personal data stored permanently</p>
            <p className="text-sm">• Audit logs for all verification requests</p>
            <p className="text-sm">• Results available for 30 days only</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}