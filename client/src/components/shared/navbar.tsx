
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Shield, Menu } from "lucide-react";
import SettingsModal from "./settings-modal";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
    
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Save language preference
    localStorage.setItem("language", language);
  }, [language]);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="link" className="flex items-center gap-2 px-0">
                <img 
                  src="/CyberShield_logo_1744892924930.png" 
                  alt="CyberShield Nigeria Logo" 
                  className="h-16 w-auto object-contain" 
                />
                <span className="font-bold text-lg text-green-700 ml-2">CyberShield Nigeria</span>
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user && (
              <SettingsModal
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                language={language}
                setLanguage={setLanguage}
              />
            )}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-4">
                  {!user ? (
                    <>
                      <Link href="/about">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>About</Button>
                      </Link>
                      <Link href="/pricing">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Pricing</Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Contact</Button>
                      </Link>
                      <Link href="/auth">
                        <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white" onClick={handleLinkClick}>Get Started</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/security-tools">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Security Tools</Button>
                      </Link>
                      <Link href="/ai-threat-intel">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>AI & Threat Intel</Button>
                      </Link>
                      <Link href="/verification">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Verification</Button>
                      </Link>
                      <Link href="/email-security">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Email Security</Button>
                      </Link>
                      <Link href="/report-scam">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Report Scam</Button>
                      </Link>
                      <Link href="/resources">
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>Resources</Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => {
                          logoutMutation.mutate();
                          handleLinkClick();
                        }}
                        disabled={logoutMutation.isPending}
                        className="w-full justify-start border-yellow-300 hover:bg-yellow-50"
                      >
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link href="/about">
                  <Button variant="ghost">About</Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="ghost">Pricing</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost">Contact</Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/security-tools">
                  <Button variant="ghost">Security Tools</Button>
                </Link>
                <Link href="/ai-threat-intel">
                  <Button variant="ghost">AI & Threat Intel</Button>
                </Link>
                <Link href="/verification">
                  <Button variant="ghost">Verification</Button>
                </Link>
                <Link href="/email-security">
                  <Button variant="ghost">Email Security</Button>
                </Link>
                <Link href="/resources">
                  <Button variant="ghost">Resources</Button>
                </Link>
                <Link href="/report-scam">
                  <Button variant="ghost">Report Scam</Button>
                </Link>
                <SettingsModal
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  language={language}
                  setLanguage={setLanguage}
                />
                <Button
                  variant="outline"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="border-yellow-300 hover:bg-yellow-50"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
