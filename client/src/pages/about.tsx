import { Shield, Lock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About CyberShield Nigeria</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Protecting Nigerians from digital threats with advanced cybersecurity solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="pt-6">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-muted-foreground">
              To make cybersecurity accessible and comprehensible for every Nigerian internet user.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
            <p className="text-muted-foreground">
              Combining advanced technology with user-friendly interfaces to provide effective security solutions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
            <p className="text-muted-foreground">
              Helping thousands of Nigerians stay safe online through education and prevention.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-lg max-w-4xl mx-auto">
        <h2>Why Choose CyberShield Nigeria?</h2>
        <p>
          In today's digital age, cybersecurity threats are becoming increasingly sophisticated.
          CyberShield Nigeria was founded with a clear vision: to protect Nigerian internet users
          from these evolving threats.
        </p>
        
        <h2>Our Services</h2>
        <ul>
          <li>Real-time scam detection and reporting</li>
          <li>Password strength verification</li>
          <li>Suspicious URL scanning</li>
          <li>Cybersecurity education and resources</li>
        </ul>

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
