
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PremiumUpgrade = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Get user ID
    try {
      const userData = JSON.parse(localStorage.getItem("user") || '{}');
      if (!userData.id) {
        // Invalid user data
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      
      setUserId(userData.id);
      
      // Check if already premium
      if (userData.isPremium) {
        toast({
          title: "Already Premium",
          description: "You already have a premium account with unlimited habits!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would integrate with Razorpay or another payment gateway
    setTimeout(() => {
      try {
        // Update user's premium status in local storage
        const userData = JSON.parse(localStorage.getItem("user") || '{}');
        userData.isPremium = true;
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Update premium flags
        localStorage.setItem("isPremium", "true");
        localStorage.setItem("habitLimit", "unlimited");
        
        // Also update in the registered users database
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, isPremium: true } : user
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        // Show success message
        toast({
          title: "Payment Successful!",
          description: "You now have access to unlimited habits tracking!",
        });
        
        // Track upgrade in analytics
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'premium_upgrade', {
            method: 'simulated_payment',
            value: 100,
            currency: 'INR',
            user_id: userId
          });
        }
        
        navigate("/dashboard");
      } catch (error) {
        console.error("Error upgrading account:", error);
        toast({
          title: "Upgrade Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
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
