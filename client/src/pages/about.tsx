import { Shield, Lock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-green-50 via-yellow-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-green-800 dark:text-green-300">About CyberShield Nigeria</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Protecting Nigerians from digital threats with advanced cybersecurity solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="border-green-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-green-700">
          <CardContent className="pt-6">
            <Shield className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-300">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300">
              To make cybersecurity accessible and comprehensible for every Nigerian internet user.
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-yellow-600">
          <CardContent className="pt-6">
            <Lock className="h-12 w-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-300">Our Approach</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Combining advanced technology with user-friendly interfaces to provide effective security solutions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-300 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-green-600">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 text-green-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-300">Our Impact</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Helping thousands of Nigerians stay safe online through education and prevention.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <Card className="border-yellow-300 bg-gradient-to-br from-white/90 to-yellow-50/50 backdrop-blur-sm dark:from-gray-800/90 dark:to-yellow-900/20 dark:border-yellow-600">
          <CardContent className="pt-8">
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6">Why Choose CyberShield Nigeria?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              In today's digital age, cybersecurity threats are becoming increasingly sophisticated.
              CyberShield Nigeria was founded with a clear vision: to protect Nigerian internet users
              from these evolving threats.
            </p>
            
            <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-4">Our Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Real-time scam detection and reporting</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>Password strength verification</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Suspicious URL scanning</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>Identity verification for individuals and businesses</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Business cybersecurity consulting</li>
              </ul>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>IT security consulting and implementation</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Cybersecurity education and resources</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>AI-powered threat intelligence</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Email security analysis</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <h2>Our Team</h2>
        <p>
          Our team consists of experienced cybersecurity professionals dedicated to
          keeping Nigerians safe online. We combine local expertise with global
          security standards to provide the best protection for our users.
        </p>
      </div>
    </div>
  );
}
