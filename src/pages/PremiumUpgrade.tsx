
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PremiumUpgrade = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    // In a real app, this would integrate with Razorpay or another payment gateway
    setTimeout(() => {
      // Simulate successful payment
      localStorage.setItem("isPremium", "true");
      localStorage.setItem("habitLimit", "unlimited");
      
      toast({
        title: "Payment Successful!",
        description: "You now have access to unlimited habits tracking!",
      });
      
      navigate("/dashboard");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Upgrade to Premium</h1>
        </div>
        
        <Card className="border-primary/20">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-fit mb-2">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Premium Membership</CardTitle>
            <CardDescription>Unlock unlimited habits and more</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold">₹100</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            
            <div className="space-y-2">
              {[
                "Track unlimited habits (Free plan: 5 max)",
                "Advanced progress analytics",
                "Priority customer support",
                "Early access to new features",
                "No advertisements"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full gap-2" 
              size="lg" 
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Upgrade Now for ₹100"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Secure payments processed by Razorpay</p>
          <p className="mt-1">30-day money-back guarantee. No questions asked.</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
