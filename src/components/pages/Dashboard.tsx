
"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HabitTracker from "@/components/HabitTracker";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

const DashboardPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Morning Meditation",
      category: "Wellness",
      mvpGoal: "5 minutes of mindfulness",
      streak: 3,
      completed: false,
      progress: 60
    },
    {
      id: 2,
      name: "Read a Book",
      category: "Learning",
      mvpGoal: "10 pages per day",
      streak: 5,
      completed: true,
      progress: 75
    },
    {
      id: 3,
      name: "Drink Water",
      category: "Health",
      mvpGoal: "8 glasses per day",
      streak: 1,
      completed: false,
      progress: 40
    }
  ]);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (!session) {
          // Redirect to login if no session
          toast({
            title: "Authentication Required",
            description: "Please sign in to access your dashboard",
            variant: "destructive",
          });
          router.push('/login');
          return;
        }
        
        // Get user details
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (userData?.user) {
          console.log("User data loaded:", userData.user);
          setUser(userData.user);
          
          // Here you would typically load the user's habits from Supabase
          // const { data: habitsData, error: habitsError } = await supabase
          //   .from('habits')
          //   .select('*')
          //   .eq('user_id', userData.user.id);
          
          // if (!habitsError && habitsData) {
          //   setHabits(habitsData);
          // }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        toast({
          title: "Error",
          description: "Failed to load your data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          const { data: userData } = await supabase.auth.getUser();
          setUser(userData?.user || null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          router.push('/login');
        }
      }
    );
    
    return () => {
      // Clean up subscription when component unmounts
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [router, toast]);
  
  const handleCompleteHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? {...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1} 
        : habit
    ));
    
    const habit = habits.find(h => h.id === id);
    
    toast({
      title: habit.completed ? "Habit Unmarked" : "MVP Goal Achieved! 🎉",
      description: habit.completed 
        ? `You've unmarked '${habit.name}'` 
        : `You've completed your MVP goal for '${habit.name}'!`,
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {user && (
          <div className="text-sm text-muted-foreground">
            Signed in as: {user.email}
          </div>
        )}
      </div>
      
      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="habits">My Habits</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="habits">
          <Card>
            <CardHeader>
              <CardTitle>Your Daily Habits</CardTitle>
              <CardDescription>Track your atomic habits and build consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <HabitTracker habits={habits} onCompleteHabit={handleCompleteHabit} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>View your habit completion over time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Progress tracking will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Habit Insights</CardTitle>
              <CardDescription>Understand your habit patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Insights will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
