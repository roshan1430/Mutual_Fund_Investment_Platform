import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = ({ className }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className={cn("flex items-center justify-between p-6 bg-card/50 backdrop-blur-sm border-b border-border", className)}>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MF</span>
          </div>
          <span className="font-bold text-xl text-foreground">MutualFunds Pro</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
            <Link to="/">Home</Link>
          </Button>
          {isAuthenticated && !user?.role?.includes('ADMIN') && (
            <>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/funds">Funds</Link>
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/holdings">Holdings</Link>
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/watchlist">Watchlist</Link>
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/analytics">Analytics</Link>
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/reports">Reports</Link>
              </Button>
            </>
          )}
          {isAuthenticated && user?.role?.includes('ADMIN') && (
            <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
              <Link to="/admin/dashboard">Admin Portal</Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user?.name}</span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button variant="outline" className="hidden sm:inline-flex" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;









