
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, TrendingUp, Award, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import HabitTracker from "@/components/HabitTracker";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [habits, setHabits] = useState([
    { 
      id: 1, 
      name: "Daily Push-ups", 
      category: "Fitness",
      mvpGoal: "At least 5 push-ups",
      streak: 3,
      completed: false,
      progress: 60
    },
    { 
      id: 2, 
      name: "Read Books", 
      category: "Personal",
      mvpGoal: "Read 10 pages",
      streak: 5,
      completed: true,
      progress: 80
    },
    { 
      id: 3, 
      name: "Meditate", 
      category: "Wellness",
      mvpGoal: "Meditate for 5 minutes",
      streak: 0,
      completed: false,
      progress: 30
    }
  ]);

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      mvpGoal: "",
    }
  });

  const onSubmit = (data) => {
    const newHabit = {
      id: habits.length + 1,
      name: data.name,
      category: data.category,
      mvpGoal: data.mvpGoal,
      streak: 0,
      completed: false,
      progress: 0
    };
    
    setHabits([...habits, newHabit]);
    toast({
      title: "Habit Created",
      description: `'${data.name}' has been added to your habit tracker!`,
    });
    form.reset();
  };

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

  const stats = {
    totalHabits: habits.length,
    completedToday: habits.filter(habit => habit.completed).length,
    longestStreak: Math.max(...habits.map(habit => habit.streak), 0),
    averageProgress: habits.length 
      ? Math.round(habits.reduce((sum, habit) => sum + habit.progress, 0) / habits.length) 
      : 0
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Atomic Habits Tracker</h1>
            <p className="text-muted-foreground">Focus on minimum viable progress daily</p>
          </div>
          <Dialog>
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

        {/* Habits List */}
        <HabitTracker habits={habits} onCompleteHabit={handleCompleteHabit} />
      </div>
    </div>
  );
};

export default Index;
