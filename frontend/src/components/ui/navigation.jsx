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
    <nav className={cn('sticky top-0 z-50 border-b border-white/60 bg-white/72 backdrop-blur-xl', className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-[0_18px_35px_-20px_hsl(var(--primary)/0.8)]">
              <span className="text-sm font-bold text-primary-foreground">MF</span>
            </div>
            <div>
              <span className="block text-xl font-bold tracking-tight text-foreground">MutualFunds Pro</span>
              <span className="hidden text-xs uppercase tracking-[0.26em] text-muted-foreground sm:block">Smarter Wealth Journeys</span>
            </div>
          </div>

          <div className="hidden items-center space-x-6 md:flex">
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
              <span className="hidden text-sm text-muted-foreground sm:inline">Hi, {user?.name}</span>
              <Button variant="outline" className="border-slate-300/80 bg-white/60" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="hidden border-slate-300/80 bg-white/60 sm:inline-flex" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button className="bg-gradient-primary text-primary-foreground shadow-[0_18px_35px_-20px_hsl(var(--primary)/0.9)] hover:opacity-95" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
