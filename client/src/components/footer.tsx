import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logoWhitePath from "@assets/Logo_White.png";
import { Link } from "wouter";

export default function Footer() {
  const quickLinks = [
    { href: "/projects", label: "Discover Projects" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/impact-stories", label: "Impact Stories" },
    { href: "/contact", label: "Partner with Us" },
    { href: "/about", label: "About Projection" },
  ];

  const supportLinks = [
    { href: "/support/help", label: "Help Centre" },
    { href: "/contact", label: "Contact" },
    { href: "/support/privacy", label: "Privacy Policy" },
    { href: "/support/terms", label: "Terms of Service" },
    { href: "/support/cookies", label: "Cookie Policy" },
  ];

  const socialLinks = [
    { href: "#facebook", icon: Facebook, label: "Facebook" },
    { href: "#twitter", icon: Twitter, label: "Twitter" },
    { href: "#linkedin", icon: Linkedin, label: "LinkedIn" },
    { href: "#instagram", icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <img 
              src={logoWhitePath} 
              alt="Projection - Shining the Light" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Connecting responsible tourism with African social impact projects to create sustainable, 
              measurable change across Health, Education, and Conservation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Projection - Shining the Light. All rights reserved. Registered charity in England and Wales.
          </p>
        </div>
      </div>
    </footer>
  );
}
