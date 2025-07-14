import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function DonationSuccess() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-serif font-bold mb-4">
              Thank You for Your Generosity!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Your donation has been successfully processed. You're making a real difference 
              in African communities through your support.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>A confirmation email has been sent to you</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Share2 className="h-4 w-4 text-primary" />
                <span>You'll receive regular updates on your project's progress</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/projects')}
                className="bg-primary hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Explore More Projects
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/impact-stories')}
              >
                Read Impact Stories
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions about your donation? <a href="/contact" className="text-primary hover:underline">Contact our team</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}