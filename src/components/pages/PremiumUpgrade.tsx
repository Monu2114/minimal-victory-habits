
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PremiumUpgradePage = () => {
  const handleUpgrade = (plan: string) => {
    console.log(`Selected premium plan: ${plan}`);
    
    // Track conversion with Google Analytics
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        items: [{ plan }]
      });
    }
    
    // This is where we would redirect to checkout
    alert(`You selected the ${plan} plan. In a real app, you would be redirected to checkout.`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Upgrade to Premium</h1>
      <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
        Get the most out of your habit tracking experience with our premium features.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Monthly Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
            <CardDescription>Perfect for short-term goals</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">$4.99</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <FeatureItem>Unlimited habits</FeatureItem>
              <FeatureItem>Advanced analytics</FeatureItem>
              <FeatureItem>Email reminders</FeatureItem>
              <FeatureItem>Export data</FeatureItem>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleUpgrade('monthly')} className="w-full">
              Choose Monthly
            </Button>
          </CardFooter>
        </Card>
        
        {/* Annual Plan (Best Value) */}
        <Card className="flex flex-col border-primary">
          <CardHeader className="bg-primary/5">
            <div className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full w-fit mb-2">
              BEST VALUE
            </div>
            <CardTitle>Annual</CardTitle>
            <CardDescription>Save 33% with annual billing</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">$39.99</span>
              <span className="text-sm text-muted-foreground"> / year</span>
              <div className="text-sm text-muted-foreground">
                <s>$59.88</s> Save $19.89
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <FeatureItem>Unlimited habits</FeatureItem>
              <FeatureItem>Advanced analytics</FeatureItem>
              <FeatureItem>Email reminders</FeatureItem>
              <FeatureItem>Export data</FeatureItem>
              <FeatureItem>Premium templates</FeatureItem>
              <FeatureItem>Priority support</FeatureItem>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleUpgrade('annual')} className="w-full">
              Choose Annual
            </Button>
          </CardFooter>
        </Card>
        
        {/* Lifetime Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Lifetime</CardTitle>
            <CardDescription>One-time payment, forever access</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">$99.99</span>
              <span className="text-sm text-muted-foreground"> one-time</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <FeatureItem>All annual plan features</FeatureItem>
              <FeatureItem>Lifetime updates</FeatureItem>
              <FeatureItem>No recurring payments</FeatureItem>
              <FeatureItem>VIP support</FeatureItem>
              <FeatureItem>Early access to new features</FeatureItem>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleUpgrade('lifetime')} className="w-full">
              Choose Lifetime
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Not ready to commit? Continue with the free plan.
        </p>
        <Button variant="outline">Return to Dashboard</Button>
      </div>
    </div>
  );
};

// Helper component for feature list items
const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <Check className="h-4 w-4 mr-2 text-primary" />
    <span>{children}</span>
  </li>
);

export default PremiumUpgradePage;
