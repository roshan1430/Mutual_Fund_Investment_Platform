import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart3, LogOut, ShieldCheck, Users } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: BarChart3, description: 'Overview and alerts' },
    { name: 'Users', path: '/admin/users', icon: Users, description: 'Search and manage accounts' },
  ];

  return (
    <div className="min-h-screen bg-background md:flex">
      <aside className="hidden w-80 flex-col border-r border-white/60 bg-[linear-gradient(180deg,hsl(215_76%_14%),hsl(203_68%_22%),hsl(165_72%_28%))] text-white md:flex">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 backdrop-blur">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">Admin Command</div>
              <div className="text-xs uppercase tracking-[0.26em] text-white/65">MutualFunds Pro</div>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Signed in as</div>
            <div className="mt-2 text-lg font-semibold">{user?.name || 'Administrator'}</div>
            <div className="mt-1 truncate text-sm text-white/72">{user?.email}</div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'flex items-start gap-3 rounded-2xl border px-4 py-4 transition-all',
                  active
                    ? 'border-white/18 bg-white/15 text-white shadow-[0_24px_45px_-30px_rgba(15,23,42,0.75)]'
                    : 'border-transparent text-white/72 hover:border-white/10 hover:bg-white/8 hover:text-white'
                )}
              >
                <div className={cn('mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl', active ? 'bg-white/16' : 'bg-white/8')}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className={cn('mt-1 text-sm', active ? 'text-white/80' : 'text-white/56')}>{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-2xl px-4 py-6 text-white hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 px-4 py-4 backdrop-blur md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-semibold text-foreground">Admin Command</div>
                <div className="text-xs text-muted-foreground">MutualFunds Pro</div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
