import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import SecurityCheck from "@/pages/security-check";
import SecurityTools from "@/pages/security-tools";
import Resources from "@/pages/resources";
import About from "@/pages/about";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import ReportScam from "@/pages/report-scam";
import { ProtectedRoute } from "./lib/protected-route";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import AIThreatIntel from "@/pages/ai-threat-intel";
import Verification from "@/pages/verification";
import EmailSecurity from "@/pages/email-security";

function Router() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/security-check" component={SecurityCheck} />
      <ProtectedRoute path="/security-tools" component={SecurityTools} />
      <ProtectedRoute path="/ai-threat-intel" component={AIThreatIntel} />
      <ProtectedRoute path="/resources" component={Resources} />
      <ProtectedRoute path="/report-scam" component={ReportScam} />
      <ProtectedRoute path="/verification" component={Verification} />
      <ProtectedRoute path="/email-security" component={EmailSecurity} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}