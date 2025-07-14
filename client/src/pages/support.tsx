import { useRoute } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Mail, Phone, MessageSquare, Shield, FileText, Cookie } from "lucide-react";

export default function Support() {
  const [, params] = useRoute("/support/:page");
  const page = params?.page || "help";

  const getPageContent = () => {
    switch (page) {
      case "help":
        return {
          title: "Help Centre",
          icon: MessageSquare,
          content: (
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                Welcome to the Projection Help Centre. Find answers to common questions and learn how to make the most of our platform.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• How to create an account</li>
                    <li>• Understanding project categories</li>
                    <li>• Making your first donation</li>
                    <li>• Setting up recurring donations</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">For Partners</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Tour operator onboarding</li>
                    <li>• Project submission guidelines</li>
                    <li>• Impact reporting requirements</li>
                    <li>• Marketing material access</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };
      
      case "contact":
        return {
          title: "Contact Us",
          icon: Mail,
          content: (
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                We'd love to hear from you. Get in touch with our team using any of the methods below.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">hello@projection.org</p>
                  <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">+44 (0) 20 7123 4567</p>
                  <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9am-5pm GMT</p>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-600">Available on website</p>
                  <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9am-5pm GMT</p>
                </div>
              </div>
            </div>
          )
        };
      
      case "privacy":
        return {
          title: "Privacy Policy",
          icon: Shield,
          content: (
            <div className="space-y-6 max-w-4xl">
              <p className="text-lg text-gray-600">
                Last updated: January 2025
              </p>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
                  <p className="text-gray-600 mb-3">
                    We collect information you provide directly to us, such as when you create an account, make a donation, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Communication preferences and donation history</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>To process donations and provide impact reports</li>
                    <li>To communicate with you about projects and updates</li>
                    <li>To improve our services and user experience</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Data Security</h3>
                  <p className="text-gray-600">
                    We implement appropriate security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
                  </p>
                </section>
              </div>
            </div>
          )
        };
      
      case "terms":
        return {
          title: "Terms of Service",
          icon: FileText,
          content: (
            <div className="space-y-6 max-w-4xl">
              <p className="text-lg text-gray-600">
                Last updated: January 2025
              </p>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Acceptance of Terms</h3>
                  <p className="text-gray-600">
                    By accessing and using Projection's services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Use of Services</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>You must be at least 18 years old to use our services</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>You agree to provide accurate and complete information</li>
                    <li>You will not use our services for any unlawful purpose</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Donations</h3>
                  <p className="text-gray-600">
                    All donations are final and non-refundable unless otherwise required by law. We ensure that 100% of your donation reaches the intended project, minus payment processing fees.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                  <p className="text-gray-600">
                    Projection shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                  </p>
                </section>
              </div>
            </div>
          )
        };
      
      case "cookies":
        return {
          title: "Cookie Policy",
          icon: Cookie,
          content: (
            <div className="space-y-6 max-w-4xl">
              <p className="text-lg text-gray-600">
                Last updated: January 2025
              </p>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-3">What Are Cookies</h3>
                  <p className="text-gray-600">
                    Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Essential Cookies</h4>
                      <p className="text-gray-600">Required for the website to function properly, including security and authentication.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Analytics Cookies</h4>
                      <p className="text-gray-600">Help us understand how visitors interact with our website to improve user experience.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Preference Cookies</h4>
                      <p className="text-gray-600">Remember your settings and preferences for a more personalised experience.</p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3">Managing Cookies</h3>
                  <p className="text-gray-600">
                    You can control and manage cookies through your browser settings. However, please note that disabling certain cookies may affect the functionality of our website.
                  </p>
                </section>
              </div>
            </div>
          )
        };
      
      default:
        return {
          title: "Page Not Found",
          icon: MessageSquare,
          content: (
            <div className="text-center">
              <p className="text-lg text-gray-600">The requested support page could not be found.</p>
            </div>
          )
        };
    }
  };

  const { title, icon: Icon, content } = getPageContent();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex items-center mb-4">
            <Icon className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              {title}
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {content}
        </div>
      </div>
      <Footer />
    </div>
  );
}