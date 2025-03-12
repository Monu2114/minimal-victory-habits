
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Calendar } from "lucide-react";

const Analytics = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState({
    totalVisits: 0,
    uniqueUsers: 0,
    dailyVisits: []
  });

  useEffect(() => {
    // Simulate fetching analytics data
    // In a real app, this would come from an analytics service like Google Analytics
    const mockData = {
      totalVisits: 157,
      uniqueUsers: 42,
      dailyVisits: [
        { day: 'Mon', visits: 15 },
        { day: 'Tue', visits: 20 },
        { day: 'Wed', visits: 18 },
        { day: 'Thu', visits: 25 },
        { day: 'Fri', visits: 30 },
        { day: 'Sat', visits: 35 },
        { day: 'Sun', visits: 14 }
      ]
    };
    
    setAnalyticsData(mockData);
    
    // Track this page view
    const trackPageView = () => {
      // In a real app, this would send data to your analytics service
      console.log("Analytics page viewed");
    };
    
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-primary mr-2" />
                <span className="text-2xl font-bold">{analyticsData.totalVisits}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-2xl font-bold">{analyticsData.uniqueUsers}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Daily Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-primary mr-2" />
                <span className="text-2xl font-bold">
                  {Math.round(analyticsData.totalVisits / 7)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daily Traffic</CardTitle>
            <CardDescription>Page views over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.dailyVisits}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
