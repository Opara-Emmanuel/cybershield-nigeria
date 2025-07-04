
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
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Eye,
      title: "URL Scanner",
      description: "Intelligent malicious link detection to protect your browsing",
      color: "text-green-700 dark:text-green-300"
    },
    {
      icon: Brain,
      title: "AI Security Advisor",
      description: "Personalized cybersecurity guidance powered by artificial intelligence",
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      icon: Shield,
      title: "Identity Verification",
      description: "KYC-powered identity verification for trusted transactions",
      color: "text-green-800 dark:text-green-200"
    },
    {
      icon: AlertTriangle,
      title: "Scam Reporting",
      description: "Community-driven scam detection and reporting system",
      color: "text-yellow-700 dark:text-yellow-300"
    },
    {
      icon: Globe,
      title: "Nigeria-Focused",
      description: "Tailored solutions for Nigerian cybersecurity challenges",
      color: "text-green-600 dark:text-green-400"
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
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: 'url(/network-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-green-900/70 dark:from-black/80 dark:via-black/60 dark:to-green-900/80 transition-colors duration-300"></div>
        
        

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 lg:mb-12 gap-4 lg:gap-6">
            <img 
              src="/CyberShield_logo_1744892924930.png" 
              alt="CyberShield Nigeria Logo" 
              className="h-16 sm:h-20 lg:h-24 w-auto" 
            />
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200 border-yellow-400/30 text-sm lg:text-base">
              <Zap className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              Nigeria's #1 Cybersecurity Platform
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 lg:mb-12 leading-tight">
            Protect Your
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-500 bg-clip-text text-transparent block sm:inline"> Digital Life</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed px-4">
            CyberShield Nigeria is your comprehensive cybersecurity companion, designed specifically for Nigerian users. 
            Safeguard your passwords, detect malicious links, and get AI-powered security guidance.
          </p>

          {user ? (
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 lg:mb-8">
                Welcome back, {user.username}!
              </h2>
              <p className="text-lg lg:text-xl text-gray-200 mb-8 lg:mb-12 max-w-2xl mx-auto">
                Your security dashboard is ready. Monitor your digital safety below.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/security-tools">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                    <Shield className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                    Access Security Tools
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 lg:mb-20 px-4">
              <Link href="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                  <Shield className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          )}

          {/* Stats - only show for non-authenticated users */}
          {!user && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center mb-2 gap-1 sm:gap-2">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mb-1 sm:mb-0" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section - only show for non-authenticated users */}
      {!user && (
      <div className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dashboard Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to stay secure online, built specifically for the Nigerian digital landscape.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const getFeatureLink = (title: string) => {
                switch (title) {
                  case "Password Security": return "/password-checker";
                  case "URL Scanner": return "/url-scanner";
                  case "AI Security Advisor": return "/ai-advisor";
                  case "Identity Verification": return "/verification";
                  case "Scam Reporting": return "/report-scam";
                  case "Nigeria-Focused": return "/about";
                  default: return "/security-tools";
                }
              };
              
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 cursor-pointer">
                  <Link href={getFeatureLink(feature.title)}>
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg bg-green-50 dark:bg-green-900/20 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                      </div>
                      <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{feature.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* Why Choose CyberShield Section - only show for non-authenticated users */}
      {!user && (
      <div className="py-16 sm:py-20 bg-gradient-to-br from-green-50 via-yellow-50/30 to-green-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Nigerian Users Trust CyberShield
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Built for Nigeria
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
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
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
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
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      Real-time scam reporting and community alerts to protect all Nigerian users from emerging threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <Card className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl mb-4">Start Your Protection Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-yellow-300" />
                      <span className="text-sm sm:text-base">Free password strength analysis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-yellow-300" />
                      <span className="text-sm sm:text-base">URL safety scanning</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-yellow-300" />
                      <span className="text-sm sm:text-base">AI security recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-yellow-300" />
                      <span className="text-sm sm:text-base">Community scam alerts</span>
                    </li>
                  </ul>
                  {!user && (
                    <Link href="/auth">
                      <Button className="w-full bg-white text-green-700 hover:bg-yellow-50 hover:text-green-800 font-semibold">
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
      )}

      {/* Call to Action - only show for non-authenticated users */}
      {!user && (
      <div className="py-16 sm:py-20 bg-gray-900 dark:bg-black transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Join thousands of Nigerians who trust CyberShield to protect their online activities.
          </p>
          {!user && (
            <Link href="/auth">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                <Shield className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Get Started - It's Free
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
