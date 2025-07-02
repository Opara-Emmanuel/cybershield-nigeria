
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-green-800 mb-3">CyberShield Nigeria</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Protecting Nigerians from digital threats with advanced cybersecurity solutions.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://chat.whatsapp.com/LrCTljj3otP7B2pR0PAZp2" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/about">
                <Button variant="link" className="p-0 h-auto text-sm justify-start">About Us</Button>
              </Link>
              <Link href="/resources">
                <Button variant="link" className="p-0 h-auto text-sm justify-start">Resources</Button>
              </Link>
              <Link href="/contact">
                <Button variant="link" className="p-0 h-auto text-sm justify-start">Contact</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="link" className="p-0 h-auto text-sm justify-start">Pricing</Button>
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Button variant="link" className="p-0 h-auto text-sm justify-start">Privacy Policy</Button>
              <Button variant="link" className="p-0 h-auto text-sm justify-start">Terms of Service</Button>
              <Button variant="link" className="p-0 h-auto text-sm justify-start">Cookie Policy</Button>
              <Button variant="link" className="p-0 h-auto text-sm justify-start">Data Protection</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CyberShield Nigeria. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
