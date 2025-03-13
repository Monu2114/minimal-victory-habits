
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  habitName: z.string().min(2, { message: "Habit name must be at least 2 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  mvpGoal: z.string().min(3, { message: "MVP goal must be at least 3 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Onboarding = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habitName: "",
      category: "",
      mvpGoal: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user?.id) {
      router.push("/login");
      return;
    }
    
    setIsLoading(true);
    try {
      // Create the first habit for this user
      const newHabit = {
        id: 1,
        name: data.habitName,
        category: data.category,
        mvpGoal: data.mvpGoal,
        streak: 0,
        completed: false,
        progress: 0,
        createdAt: new Date().toISOString()
      };
      
      // Store in localStorage for the specific user
      localStorage.setItem(`habits_${user.id}`, JSON.stringify([newHabit]));
      
      toast({
        title: "First Habit Created",
        description: "You're all set to start building better habits!",
      });
      
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Let's Start Your First Habit</CardTitle>
          <CardDescription>
            What's one small habit you'd like to build? Remember, start with something small and achievable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium mb-2">Tip from Atomic Habits:</h3>
            <p className="text-sm text-muted-foreground italic">
              "Make it so easy you can't say no. The most effective way to build a new habit is to start with a version 
              that is incredibly easy."
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="habitName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Habit Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Daily Push-ups" {...field} />
                    </FormControl>
                    <FormDescription>What habit do you want to build?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Fitness, Personal, Work" {...field} />
                    </FormControl>
                    <FormDescription>Group your habits by type</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mvpGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Viable Progress (MVP)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. At least 5 push-ups" {...field} />
                    </FormControl>
                    <FormDescription>
                      The smallest step that counts as a win for the day
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Start My Habit Journey"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
