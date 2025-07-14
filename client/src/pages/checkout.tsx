import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, projectId, projectTitle, onSuccess }: {
  amount: number;
  projectId: number;
  projectTitle: string;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donation-success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: `Thank you for your £${amount} donation to ${projectTitle}!`,
      });
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Donation Summary</h3>
        <div className="flex justify-between">
          <span>Project:</span>
          <span className="font-medium">{projectTitle}</span>
        </div>
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="font-bold text-primary">£{amount}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Payment Details</label>
        <PaymentElement />
      </div>

      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Your payment is secured by Stripe. We never store your card details.</span>
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4 mr-2" />
            Complete Donation - £{amount}
          </>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [, navigate] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [donationData, setDonationData] = useState<{
    amount: number;
    projectId: number;
    projectTitle: string;
  } | null>(null);

  useEffect(() => {
    // Get donation data from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const projectId = urlParams.get('projectId');
    const projectTitle = urlParams.get('projectTitle');

    if (!amount || !projectId || !projectTitle) {
      navigate('/projects');
      return;
    }

    const donationAmount = parseFloat(amount);
    const projectIdNum = parseInt(projectId);

    setDonationData({
      amount: donationAmount,
      projectId: projectIdNum,
      projectTitle: decodeURIComponent(projectTitle)
    });

    // Create PaymentIntent as soon as the page loads
    apiRequest("POST", "/api/create-payment-intent", { 
      amount: donationAmount,
      projectId: projectIdNum,
      donorEmail: '' // Will be captured in the payment form
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        navigate('/projects');
      });
  }, [navigate]);

  const handleSuccess = () => {
    navigate('/donation-success');
  };

  if (loading || !clientSecret || !donationData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Setting up your donation...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/projects')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          
          <h1 className="text-3xl font-serif font-bold mb-2">Complete Your Donation</h1>
          <p className="text-muted-foreground">
            You're about to make a meaningful difference. Thank you for your generosity.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                amount={donationData.amount}
                projectId={donationData.projectId}
                projectTitle={donationData.projectTitle}
                onSuccess={handleSuccess}
              />
            </Elements>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By completing this donation, you agree to our terms of service and privacy policy.
            You will receive an email confirmation of your donation.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}