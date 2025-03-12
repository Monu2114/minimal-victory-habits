
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: location.state?.email || "",
      password: "",
    },
  });

  // Update form value if email is passed from login page
  useEffect(() => {
    if (location.state?.email) {
      form.setValue('email', location.state.email);
    }
  }, [location.state, form]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = users.find(user => user.email === data.email);
      
      if (existingUser) {
        toast({
          title: "Registration Failed",
          description: "An account with this email already exists. Please log in instead.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Create a new user
      const newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        isPremium: false,
        dateCreated: new Date().toISOString()
      };
      
      // Save to user registry
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Set authenticated user
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ 
        id: newUser.id,
        name: newUser.name, 
        email: newUser.email,
        isPremium: false
      }));
      
      // Set default premium status
      localStorage.setItem("isPremium", "false");
      localStorage.setItem("habitLimit", "5");
      
      // Create empty habits array for new user
      const userHabits = [];
      localStorage.setItem(`habits_${newUser.id}`, JSON.stringify(userHabits));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Atomic Habits Tracker!",
      });
      
      navigate("/onboarding");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Start your journey to better habits today</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
          <div className="text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              Back to home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
