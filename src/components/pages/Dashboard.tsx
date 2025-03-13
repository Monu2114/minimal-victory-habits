
"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HabitTracker from "@/components/HabitTracker";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const { toast } = useToast();
  
  // Importing the Dashboard functionality from the original page
  React.useEffect(() => {
    console.log("Dashboard page loaded");
    // This is where we would fetch user data, habits, etc.
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
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
              <HabitTracker />
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
