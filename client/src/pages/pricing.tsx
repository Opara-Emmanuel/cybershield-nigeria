import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-800 dark:text-green-300">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that's right for your cybersecurity needs
          </p>
        </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <div className="text-3xl font-bold">Free</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Password Strength Checking
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Basic URL Scanning
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Access to Resources
              </li>
            </ul>
            <Link href="/auth">
              <Button className="w-full mt-6">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Professional</CardTitle>
            <div className="text-3xl font-bold">₦1,000/mo</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                All Basic Features
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Advanced Threat Detection
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Priority Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Real-time Alerts
              </li>
            </ul>
            <Link href="/auth">
              <Button className="w-full mt-6" variant="default">
                Start Free Trial
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <div className="text-3xl font-bold">Custom</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                All Professional Features
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Custom Integration
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Dedicated Support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Custom Training
              </li>
            </ul>
            <Link href="/contact">
              <Button className="w-full mt-6" variant="outline">
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