import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-800">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Choose the plan that's right for your cybersecurity needs
          </p>
        </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-green-200 bg-white">
          <CardHeader>
            <CardTitle className="text-green-800">Basic</CardTitle>
            <div className="text-3xl font-bold text-green-700">Free</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Password Strength Checking
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Basic URL Scanning
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Access to Resources
              </li>
            </ul>
            <Link href="/auth">
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-yellow-400 bg-gradient-to-br from-yellow-50 to-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800">Professional</CardTitle>
            <div className="text-3xl font-bold text-yellow-600">₦1,000/mo</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                All Basic Features
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Advanced Threat Detection
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Priority Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Real-time Alerts
              </li>
            </ul>
            <Link href="/auth">
              <Button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white">
                Start Free Trial
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-white">
          <CardHeader>
            <CardTitle className="text-green-800">Enterprise</CardTitle>
            <div className="text-3xl font-bold text-green-700">Custom</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                All Professional Features
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Custom Integration
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Dedicated Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Custom Training
              </li>
            </ul>
            <Link href="/contact">
              <Button className="w-full mt-6 border-green-600 text-green-700 hover:bg-green-50" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}