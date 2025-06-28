import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Shield, Menu } from "lucide-react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b">
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
                <span className="font-bold text-lg text-green-700">CyberShield Nigeria</span>
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
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
                        <Button variant="ghost" className="w-full justify-start">About</Button>
                      </Link>
                      <Link href="/pricing">
                        <Button variant="ghost" className="w-full justify-start">Pricing</Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="ghost" className="w-full justify-start">Contact</Button>
                      </Link>
                      <Link href="/auth">
                        <Button className="w-full justify-start">Get Started</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/password-checker">
                        <Button variant="ghost" className="w-full justify-start">Password Check</Button>
                      </Link>
                      <Link href="/url-scanner">
                        <Button variant="ghost" className="w-full justify-start">URL Scanner</Button>
                      </Link>
                      <Link href="/report-scam">
                        <Button variant="ghost" className="w-full justify-start">Report Scam</Button>
                      </Link>
                      <Link href="/ai-advisor">
                        <Button variant="ghost" className="w-full justify-start">AI Advisor</Button>
                      </Link>
                      <Link href="/verification">
                        <Button variant="ghost" className="w-full justify-start">🔑 Verification</Button>
                      </Link>
                      <Link href="/threat-intelligence">
                        <Button variant="ghost" className="w-full justify-start">Threat Intel</Button>
                      </Link>
                      <Link href="/email-security">
                        <Button variant="ghost" className="w-full justify-start">Email Security</Button>
                      </Link>
                      <Link href="/resources">
                        <Button variant="ghost" className="w-full justify-start">Resources</Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => logoutMutation.mutate()}
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
                  <Button>Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/password-checker">
                  <Button variant="ghost">Password Check</Button>
                </Link>
                <Link href="/url-scanner">
                  <Button variant="ghost">URL Scanner</Button>
                </Link>
                <Link href="/report-scam">
                  <Button variant="ghost">Report Scam</Button>
                </Link>
                <Link href="/ai-advisor">
                  <Button variant="ghost">AI Advisor</Button>
                </Link>
                <Link href="/verification">
                  <Button variant="ghost">🔑 Verification</Button>
                </Link>
                <Link href="/threat-intelligence">
                  <Button variant="ghost">Threat Intel</Button>
                </Link>
                <Link href="/email-security">
                  <Button variant="ghost">Email Security</Button>
                </Link>
                <Link href="/resources">
                  <Button variant="ghost">Resources</Button>
                </Link>
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