
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const publicRoutes = ['/', '/login', '/register'];

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const isPublicRoute = publicRoutes.includes(location.pathname);
      const userData = localStorage.getItem('user');

      if (!isAuthenticated && !isPublicRoute) {
        // Clear any potentially invalid auth data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page",
          variant: "destructive",
        });
        
        navigate('/login', { state: { from: location.pathname } });
      } else if (isAuthenticated && !userData) {
        // Invalid state: authenticated but no user data
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
      } else if (isAuthenticated && location.pathname === '/login') {
        navigate('/dashboard');
      }

      // Track page view for analytics
      const trackPageView = () => {
        const currentPath = location.pathname;
        console.log(`Page view: ${currentPath}`);
        
        // Send to Google Analytics
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: currentPath,
          });
        }
        
        // Simple analytics tracking in localStorage for demo purposes
        const pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
        pageViews[currentPath] = (pageViews[currentPath] || 0) + 1;
        localStorage.setItem('pageViews', JSON.stringify(pageViews));
      };
      
      trackPageView();
      setIsLoading(false);
    };

    checkAuth();
  }, [location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
