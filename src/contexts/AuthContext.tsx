
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

const publicRoutes = ['/', '/login', '/register'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const isPublicRoute = publicRoutes.includes(pathname || '');
      const userData = localStorage.getItem('user');

      setIsAuthenticated(authStatus);
      
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      }

      if (!authStatus && !isPublicRoute) {
        // Clear any potentially invalid auth data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page",
          variant: "destructive",
        });
        
        router.push('/login');
      } else if (authStatus && !userData) {
        // Invalid state: authenticated but no user data
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
      } else if (authStatus && pathname === '/login') {
        router.push('/dashboard');
      }

      // Track page view for analytics
      const trackPageView = () => {
        const currentPath = pathname;
        console.log(`Page view: ${currentPath}`);
        
        // Send to Google Analytics
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: currentPath,
          });
        }
        
        // Simple analytics tracking in localStorage for demo purposes
        const pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
        pageViews[currentPath || '/'] = (pageViews[currentPath || '/'] || 0) + 1;
        localStorage.setItem('pageViews', JSON.stringify(pageViews));
      };
      
      trackPageView();
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const login = (userData: any) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Auth middleware component for protected routes
export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, isLoading, router]);
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return null;
    }
    
    return <Component {...props} />;
  };
}
