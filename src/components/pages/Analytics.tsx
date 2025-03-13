
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for charts
const habitData = [
  { name: 'Mon', completed: 3, total: 5 },
  { name: 'Tue', completed: 4, total: 5 },
  { name: 'Wed', completed: 2, total: 5 },
  { name: 'Thu', completed: 5, total: 5 },
  { name: 'Fri', completed: 3, total: 5 },
  { name: 'Sat', completed: 4, total: 5 },
  { name: 'Sun', completed: 5, total: 5 },
];

const AnalyticsPage = () => {
  React.useEffect(() => {
    console.log("Analytics page loaded");
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Habit Completion</CardTitle>
              <CardDescription>Your habit performance for the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={habitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#8884d8" name="Habits Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Your habit performance for the past month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monthly analytics will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Habit Trends</CardTitle>
              <CardDescription>Long-term patterns in your habit formation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Trend analysis will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
