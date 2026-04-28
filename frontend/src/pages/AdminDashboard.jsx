import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Download, ShieldCheck, Sparkles, Users, UserRoundCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminUsers } from '@/lib/api';
import AdminLayout from '@/components/ui/AdminLayout';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAdminUsers();
        setUsers(data);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load admin metrics.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [toast]);

  const metrics = useMemo(() => {
    const totalUsers = users.length;
    const adminCount = users.filter((entry) => entry.role === 'ADMIN').length;
    const investorCount = users.filter((entry) => entry.role !== 'ADMIN').length;
    const verifiedCount = users.filter((entry) => entry.emailVerified).length;
    const pendingVerification = totalUsers - verifiedCount;
    const verificationRate = totalUsers ? Math.round((verifiedCount / totalUsers) * 100) : 0;

    return {
      totalUsers,
      adminCount,
      investorCount,
      verifiedCount,
      pendingVerification,
      verificationRate,
    };
  }, [users]);

  const quickInsights = [
    {
      title: 'Verification health',
      value: `${metrics.verificationRate}%`,
      note: metrics.pendingVerification === 0 ? 'All accounts verified' : `${metrics.pendingVerification} accounts still pending`,
      icon: CheckCircle2,
      tone: metrics.pendingVerification === 0 ? 'text-emerald-600' : 'text-amber-600',
    },
    {
      title: 'Admin coverage',
      value: metrics.adminCount,
      note: 'Current administrator accounts',
      icon: ShieldCheck,
      tone: 'text-sky-600',
    },
    {
      title: 'Investor base',
      value: metrics.investorCount,
      note: 'Non-admin platform users',
      icon: Users,
      tone: 'text-teal-600',
    },
  ];

  const recentUsers = useMemo(() => [...users].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 5), [users]);

  const handleExport = () => {
    const header = ['ID', 'Name', 'Email', 'Role', 'Email Verified'];
    const rows = users.map((entry) => [entry.id, entry.name, entry.email, entry.role || 'INVESTOR', entry.emailVerified ? 'Yes' : 'No']);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'admin-users-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Export ready', description: 'Admin user report downloaded as CSV.' });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden border-white/70 bg-[linear-gradient(135deg,hsl(216_74%_14%),hsl(202_70%_23%),hsl(166_68%_28%))] text-white shadow-xl">
            <CardContent className="p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4" />
                Platform command center
              </div>
              <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-200">
                    Welcome back, {user?.name}. Here&rsquo;s a live view of account health, verification status, and user management priorities across the platform.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15" asChild>
                    <Link to="/admin/users">Open user management</Link>
                  </Button>
                  <Button className="bg-white text-slate-900 hover:bg-slate-100" onClick={handleExport} disabled={isLoading || users.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Export users
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-[image:var(--gradient-panel)] shadow-card">
            <CardHeader>
              <CardTitle>Priority Queue</CardTitle>
              <CardDescription>What deserves attention right now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-950">Pending verification</div>
                    <div className="text-sm text-amber-800">{metrics.pendingVerification} accounts are waiting for email verification.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <div className="flex items-center gap-3">
                  <UserRoundCheck className="h-5 w-5 text-sky-600" />
                  <div>
                    <div className="font-medium text-sky-950">Role coverage</div>
                    <div className="text-sm text-sky-800">{metrics.adminCount} admin accounts supporting {metrics.investorCount} investor accounts.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium text-emerald-950">Healthy accounts</div>
                    <div className="text-sm text-emerald-800">{metrics.verifiedCount} verified users currently have full access to the platform.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.totalUsers}</div>
              <p className="mt-1 text-xs text-muted-foreground">Live count from registered accounts</p>
            </CardContent>
          </Card>
          {quickInsights.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-white/70 bg-white/84 shadow-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                    <Icon className={`h-5 w-5 ${item.tone}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{item.value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardHeader>
              <CardTitle>Role Breakdown</CardTitle>
              <CardDescription>Understand who is using the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: 'Investors', value: metrics.investorCount, tone: 'bg-emerald-500' },
                { label: 'Admins', value: metrics.adminCount, tone: 'bg-sky-500' },
                { label: 'Verified Accounts', value: metrics.verifiedCount, tone: 'bg-violet-500' },
              ].map((item) => {
                const percent = metrics.totalUsers ? Math.round((item.value / metrics.totalUsers) * 100) : 0;
                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value} users</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${percent}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{percent}% of current user base</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Recent Account Activity</CardTitle>
                  <CardDescription>Most recently created user records based on account ID</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/users">Review all users</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center text-muted-foreground">Loading platform activity...</div>
              ) : recentUsers.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">No users found yet.</div>
              ) : (
                <div className="space-y-4">
                  {recentUsers.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/70 p-4">
                      <div>
                        <div className="font-medium text-foreground">{entry.name}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{entry.email}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="border border-slate-200 bg-slate-50 text-slate-700">
                          {entry.role || 'INVESTOR'}
                        </Badge>
                        <div className="mt-2 text-xs text-muted-foreground">{entry.emailVerified ? 'Verified access' : 'Pending verification'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
