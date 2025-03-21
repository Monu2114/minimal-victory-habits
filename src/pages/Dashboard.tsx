
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, TrendingUp, Award, Heart, Sparkles, BarChart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import HabitTracker from "@/components/HabitTracker";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Form validation schema
const habitFormSchema = z.object({
  name: z.string().min(2, "Habit name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  mvpGoal: z.string().min(3, "MVP goal must be at least 3 characters"),
});

type FormValues = z.infer<typeof habitFormSchema>;

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [habitLimit, setHabitLimit] = useState(5);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Get user data
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
      setUserName(userData.name || 'User');
      
      // Check premium status
      const premiumStatus = localStorage.getItem("isPremium") === "true" || userData.isPremium === true;
      setIsPremium(premiumStatus);
      
      // Set habit limit based on premium status
      const storedLimit = localStorage.getItem("habitLimit");
      if (storedLimit === "unlimited" || premiumStatus) {
        setHabitLimit(Infinity);
      } else {
        setHabitLimit(5);
      }
      
      // Load habits from localStorage for this specific user
      const savedHabits = localStorage.getItem(`habits_${userData.id}`);
      if (savedHabits) {
        try {
          const parsedHabits = JSON.parse(savedHabits);
          setHabits(Array.isArray(parsedHabits) ? parsedHabits : []);
        } catch (error) {
          console.error("Error parsing habits from localStorage:", error);
          setHabits([]);
        }
      } else {
        // First time - initialize empty habits array for this user
        localStorage.setItem(`habits_${userData.id}`, JSON.stringify([]));
        setHabits([]);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      name: "",
      category: "",
      mvpGoal: "",
    }
  });

  const onSubmit = (data: FormValues) => {
    if (!data.name.trim() || !data.category.trim() || !data.mvpGoal.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields with valid content.",
        variant: "destructive",
      });
      return;
    }
    
    // Check habit limit for free users
    if (!isPremium && habits.length >= habitLimit) {
      toast({
        title: "Habit Limit Reached",
        description: "Upgrade to premium to track more than 5 habits!",
        variant: "destructive",
      });
      navigate("/premium-upgrade");
      return;
    }
    
    const newHabit = {
      id: habits.length ? Math.max(...habits.map(habit => habit.id)) + 1 : 1,
      name: data.name,
      category: data.category,
      mvpGoal: data.mvpGoal,
      streak: 0,
      completed: false,
      progress: 0,
      createdAt: new Date().toISOString()
    };
    
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    
    // Save to localStorage with user-specific key
    localStorage.setItem(`habits_${userId}`, JSON.stringify(updatedHabits));
    
    toast({
      title: "Habit Created",
      description: `'${data.name}' has been added to your habit tracker!`,
    });
    
    form.reset();
    setIsOpen(false);
  };

  const handleCompleteHabit = (id) => {
    const updatedHabits = habits.map(habit => 
      habit.id === id 
        ? {...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1} 
        : habit
    );
    
    setHabits(updatedHabits);
    
    // Save to localStorage with user-specific key
    localStorage.setItem(`habits_${userId}`, JSON.stringify(updatedHabits));
    
    const habit = habits.find(h => h.id === id);
    
    toast({
      title: habit.completed ? "Habit Unmarked" : "MVP Goal Achieved! 🎉",
      description: habit.completed 
        ? `You've unmarked '${habit.name}'` 
        : `You've completed your MVP goal for '${habit.name}'!`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    // Don't remove user data from localStorage to persist registered users
    navigate("/");
  };

  const stats = {
    totalHabits: habits.length,
    completedToday: habits.filter(habit => habit.completed).length,
    longestStreak: habits.length ? Math.max(...habits.map(habit => habit.streak), 0) : 0,
    averageProgress: habits.length 
      ? Math.round(habits.reduce((sum, habit) => sum + habit.progress, 0) / habits.length) 
      : 0
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hello, {userName}!</h1>
            <p className="text-muted-foreground">Focus on minimum viable progress daily</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
            <Button variant="outline" onClick={() => navigate("/analytics")} className="gap-2">
              <BarChart className="h-4 w-4" />
              Analytics
            </Button>
            {!isPremium && (
              <Button variant="secondary" onClick={() => navigate("/premium-upgrade")} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Go Premium
              </Button>
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Habit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new habit</DialogTitle>
                  <DialogDescription>
                    Define your habit and the minimum viable progress (MVP) that counts as a win for the day.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Habit Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Daily Push-ups" {...field} />
                          </FormControl>
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
                    <DialogFooter>
                      <Button type="submit">Create Habit</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Premium Status Display */}
        {isPremium ? (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">Premium Account</span>
              </div>
              <span className="text-sm text-muted-foreground">Unlimited habit tracking enabled</span>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-muted/50 border-muted">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">Free Account</span>
                <span className="text-sm text-muted-foreground">{habits.length}/{habitLimit} habits used</span>
              </div>
              <Button variant="secondary" size="sm" onClick={() => navigate("/premium-upgrade")} className="gap-1">
                <Sparkles className="h-4 w-4" />
                Upgrade
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PlusCircle className="h-4 w-4 text-primary mr-2" />
                <span className="text-2xl font-bold">{stats.totalHabits}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-primary mr-2" />
                <span className="text-2xl font-bold">{stats.completedToday}/{stats.totalHabits}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Longest Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-primary mr-2" />
                <span className="text-2xl font-bold">{stats.longestStreak} days</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-primary mr-2" />
                  <span className="text-2xl font-bold">{stats.averageProgress}%</span>
                </div>
                <Progress value={stats.averageProgress} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Quote */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-4">
            <blockquote className="italic text-center">
              "Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them."
              <footer className="text-sm font-medium mt-2">— James Clear, Atomic Habits</footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* Habits List */}
        <HabitTracker habits={habits} onCompleteHabit={handleCompleteHabit} />
      </div>
    </div>
  );
};

export default Dashboard;
