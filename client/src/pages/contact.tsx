import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      detail: "hello@projection.charity",
      subtext: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak to our team",
      detail: "+44 (0) 20 7123 4567",
      subtext: "Mon-Fri, 9am-5pm GMT"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our London office",
      detail: "123 Charity House, London EC1V 2NX",
      subtext: "By appointment only"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM GMT" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM GMT" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you're interested in partnering with us, 
            have questions about our projects, or want to learn more about making an impact.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Organisation (if applicable)</label>
                    <Input placeholder="Enter your organisation name" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">I am interested in *</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your area of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Enquiry</SelectItem>
                        <SelectItem value="tour-operator">Tour Operator Partnership</SelectItem>
                        <SelectItem value="commercial">Commercial Partnership</SelectItem>
                        <SelectItem value="donor">Private Donation</SelectItem>
                        <SelectItem value="project">Project Submission</SelectItem>
                        <SelectItem value="media">Media & Press</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea 
                      placeholder="Tell us more about your enquiry..." 
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="consent" className="mt-1" />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      I consent to Projection storing and processing my personal data to respond to my enquiry. 
                      You can read our <a href="/support/privacy" className="text-primary hover:underline">Privacy Policy</a> for more information.
                    </label>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <method.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                        <p className="font-medium">{method.detail}</p>
                        <p className="text-sm text-muted-foreground">{method.subtext}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Quick Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/projects">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Browse Projects
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/support/help">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Help Centre
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/portal/tour-operators">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Partnership Info
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Get in touch with our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How do I become a tour operator partner?</h3>
                <p className="text-muted-foreground mb-3">
                  Visit our Tour Operators Portal to learn about partnership requirements and benefits. 
                  You can also schedule a demo to see our platform in action.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Learn More →
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How much of my donation goes to projects?</h3>
                <p className="text-muted-foreground mb-3">
                  100% of your donation goes directly to the project, minus payment processing fees (typically 2-3%). 
                  Our operational costs are covered separately.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Transparency Report →
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Can I visit the projects I support?</h3>
                <p className="text-muted-foreground mb-3">
                  Many of our projects welcome visitors, especially those connected through tour operator partners. 
                  Contact us to arrange visits during your trip.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Plan a Visit →
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How do you verify project impact?</h3>
                <p className="text-muted-foreground mb-3">
                  We work with local partners and use third-party verification for all impact metrics. 
                  Regular site visits and reporting ensure transparency.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Impact Methodology →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}