
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/0 pointer-events-none" />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center max-w-4xl leading-tight mb-6">
            Small Habits, <span className="text-primary">Remarkable Results</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mb-10">
            "Habits are the compound interest of self-improvement."
            <span className="block mt-2 text-base italic">— James Clear, Atomic Habits</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="px-8">
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">The Atomic Habits Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              title="1% Better Every Day" 
              description="Focus on small improvements consistently rather than radical changes occasionally."
            />
            <FeatureCard 
              title="Minimum Viable Progress" 
              description="Define the smallest achievable goal that counts as a win for the day."
            />
            <FeatureCard 
              title="Identity-Based Habits" 
              description="Focus on who you want to become, not just what you want to achieve."
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number="01" 
              title="Define Your MVP Goal" 
              description="Set the minimum action that counts as a win (e.g., 'At least 5 push-ups')."
            />
            <StepCard 
              number="02" 
              title="Track Daily Completion" 
              description="Simply mark when you've achieved your minimum goal each day."
            />
            <StepCard 
              number="03" 
              title="Build Consistency" 
              description="Focus on keeping the streak alive, not on being perfect."
            />
            <StepCard 
              number="04" 
              title="Measure Progress" 
              description="Watch your habits compound into significant improvements over time."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Habits?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Start building better habits today with our scientifically-proven approach.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link href="/register">
              Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2023 Atomic Habits Tracker. Inspired by James Clear's Atomic Habits.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Landing;
