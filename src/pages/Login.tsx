
import React, { useState } from "react";
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
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setUserNotFound(false);
    
    try {
      // In a real app, this would be an API call to your auth service
      console.log("Login submitted:", data);
      
      // Simulate authentication check - in a real app this would be server-side
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = users.find(user => user.email === data.email);
      
      if (!foundUser) {
        setUserNotFound(true);
        toast({
          title: "Account Not Found",
          description: "No account found with this email. Would you like to register instead?",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Simple password check (in a real app, this would be hashed and checked server-side)
      if (foundUser.password !== data.password) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Authentication successful
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ 
        id: foundUser.id,
        name: foundUser.name, 
        email: foundUser.email,
        isPremium: foundUser.isPremium || false
      }));
      
      // Update premium status from user data
      if (foundUser.isPremium) {
        localStorage.setItem("isPremium", "true");
        localStorage.setItem("habitLimit", "unlimited");
      } else {
        localStorage.setItem("isPremium", "false");
        localStorage.setItem("habitLimit", "5");
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Atomic Habits Tracker!",
      });
      
      // Redirect to the original requested URL or dashboard
      const from = location.state?.from || "/dashboard";
      navigate(from);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
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
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          
          {userNotFound && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/register', { state: { email: form.getValues().email } })}
              >
                Create an Account
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
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

export default Login;
