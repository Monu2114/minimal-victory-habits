
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Flame } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  category: string;
  mvpGoal: string;
  streak: number;
  completed: boolean;
  progress: number;
}

interface HabitTrackerProps {
  habits: Habit[];
  onCompleteHabit: (id: number) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onCompleteHabit }) => {
  const getCategoryColor = (category: string) => {
    const categories = {
      "Fitness": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Personal": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Work": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "Wellness": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "Learning": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    };
    
    return categories[category] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Habits</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map(habit => (
          <Card key={habit.id} className={`overflow-hidden transition-all duration-300 hover:shadow-md ${habit.completed ? 'border-green-400 dark:border-green-600 shadow-green-100 dark:shadow-green-900/20' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={`${getCategoryColor(habit.category)}`}>
                    {habit.category}
                  </Badge>
                  <CardTitle className="mt-2">{habit.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className={`h-4 w-4 ${habit.streak > 0 ? 'text-orange-500' : 'text-gray-300'}`} />
                  <span className={`text-sm font-medium ${habit.streak > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
                    {habit.streak}
                  </span>
                </div>
              </div>
              <CardDescription>
                MVP: {habit.mvpGoal}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{habit.progress}%</span>
                </div>
                <Progress value={habit.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <span className="text-sm font-medium">Mark as completed</span>
              <Switch 
                checked={habit.completed}
                onCheckedChange={() => onCompleteHabit(habit.id)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {habits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No habits added yet. Click "Add Habit" to get started!</p>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
