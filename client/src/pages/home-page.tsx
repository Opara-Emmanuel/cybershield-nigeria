
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Brain, Users, Award, CheckCircle, ArrowRight, Moon, Sun, Globe, Zap, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const features = [
    {
      icon: Lock,
      title: "Password Security",
      description: "Advanced password strength analysis with real-time breach checking",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Eye,
      title: "URL Scanner",
      description: "Intelligent malicious link detection to protect your browsing",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Brain,
      title: "AI Security Advisor",
      description: "Personalized cybersecurity guidance powered by artificial intelligence",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Shield,
      title: "Identity Verification",
      description: "KYC-powered identity verification for trusted transactions",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: AlertTriangle,
      title: "Scam Reporting",
      description: "Community-driven scam detection and reporting system",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Globe,
      title: "Nigeria-Focused",
      description: "Tailored solutions for Nigerian cybersecurity challenges",
      color: "text-green-700 dark:text-green-300"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Protected Users", icon: Users },
    { number: "99.9%", label: "Threat Detection", icon: Shield },
    { number: "24/7", label: "Security Monitoring", icon: Eye },
    { number: "500+", label: "Scams Prevented", icon: Award }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(/network-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-green-900/60 dark:from-black/80 dark:via-black/60 dark:to-green-900/80 transition-colors duration-300"></div>
        
        {/* Dark Mode Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/CyberShield_logo_1744892924930.png" 
              alt="CyberShield Nigeria Logo" 
              className="h-20 w-auto mr-4" 
            />
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
              <Zap className="h-3 w-3 mr-1" />
              Nigeria's #1 Cybersecurity Platform
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Protect Your
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Digital Life</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            CyberShield Nigeria is your comprehensive cybersecurity companion, designed specifically for Nigerian users. 
            Safeguard your passwords, detect malicious links, and get AI-powered security guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link href="/security-tools">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  <Shield className="mr-2 h-5 w-5" />
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  <Shield className="mr-2 h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link href="/resources">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-green-400 mr-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Cybersecurity Suite
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to stay secure online, built specifically for the Nigerian digital landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose CyberShield Section */}
      <div className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Nigerian Users Trust CyberShield
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Built for Nigeria
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Understanding local threats, scam patterns, and security challenges specific to Nigerian users.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      AI-Powered Protection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced machine learning algorithms provide personalized security recommendations and threat detection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Community-Driven
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Real-time scam reporting and community alerts to protect all Nigerian users from emerging threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <Card className="bg-gradient-to-br from-green-600 to-blue-600 text-white border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">Start Your Protection Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      Free password strength analysis
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      URL safety scanning
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      AI security recommendations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      Community scam alerts
                    </li>
                  </ul>
                  {!user && (
                    <Link href="/auth">
                      <Button className="w-full bg-white text-green-600 hover:bg-gray-100">
                        Create Free Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gray-900 dark:bg-black transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of Nigerians who trust CyberShield to protect their online activities.
          </p>
          {!user && (
            <Link href="/auth">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Get Started - It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
