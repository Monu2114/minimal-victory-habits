
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

      if (!isAuthenticated && !isPublicRoute) {
        navigate('/login');
      } else if (isAuthenticated && location.pathname === '/login') {
        navigate('/dashboard');
      }

      // Track page view for analytics
      const trackPageView = () => {
        const currentPath = location.pathname;
        // In a real app, this would send data to your analytics service
        console.log(`Page view: ${currentPath}`);
        
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
