import React, { useEffect, useMemo, useState } from 'react';
import { Copy, Download, RefreshCw, Search, ShieldCheck, Trash2, UserCheck, Users } from 'lucide-react';
import AdminLayout from '@/components/ui/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminUsers, deleteAdminUser } from '@/lib/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deletingUserId, setDeletingUserId] = useState(null);
  const { toast } = useToast();

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAdminUsers();
      setUsers(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch users.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((entry) => {
      const matchesQuery =
        !query ||
        entry.name?.toLowerCase().includes(query.toLowerCase()) ||
        entry.email?.toLowerCase().includes(query.toLowerCase()) ||
        String(entry.id).includes(query);

      const effectiveRole = entry.role || 'INVESTOR';
      const matchesRole = roleFilter === 'ALL' || effectiveRole === roleFilter;
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'VERIFIED' && entry.emailVerified) ||
        (statusFilter === 'PENDING' && !entry.emailVerified);

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  const summary = useMemo(() => {
    const total = users.length;
    const admins = users.filter((entry) => entry.role === 'ADMIN').length;
    const verified = users.filter((entry) => entry.emailVerified).length;
    return {
      total,
      admins,
      investors: total - admins,
      verified,
      pending: total - verified,
    };
  }, [users]);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setDeletingUserId(userId);
      await deleteAdminUser(userId);
      toast({ title: 'User deleted', description: 'The user has been successfully removed.' });
      loadUsers();
    } catch (error) {
      toast({ title: 'Error', description: error.message || 'Failed to delete user.', variant: 'destructive' });
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      toast({ title: 'Copied', description: `${email} copied to clipboard.` });
    } catch {
      toast({ title: 'Error', description: 'Unable to copy email.', variant: 'destructive' });
    }
  };

  const handleExport = () => {
    const header = ['ID', 'Name', 'Email', 'Role', 'Email Verified'];
    const rows = filteredUsers.map((entry) => [entry.id, entry.name, entry.email, entry.role || 'INVESTOR', entry.emailVerified ? 'Yes' : 'No']);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filtered-admin-users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Export ready', description: 'Filtered user list downloaded as CSV.' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">User Management</h1>
            <p className="mt-2 text-muted-foreground">Search, filter, review verification health, and export platform account data.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="bg-white/80" onClick={loadUsers} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-95" onClick={handleExport} disabled={filteredUsers.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export filtered list
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{summary.total}</div>
                <div className="text-sm text-muted-foreground">Total users</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{summary.verified}</div>
                <div className="text-sm text-muted-foreground">Verified accounts</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{summary.pending}</div>
                <div className="text-sm text-muted-foreground">Pending verification</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/70 bg-white/84 shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{summary.admins}</div>
                <div className="text-sm text-muted-foreground">Admin accounts</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-white/70 bg-white/84 shadow-card">
          <CardHeader>
            <CardTitle>Filters and Search</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[1.2fr_0.4fr_0.4fr]">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="searchUsers">Search users</label>
              <Input
                id="searchUsers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, or ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="roleFilter">Role</label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="ALL">All roles</option>
                <option value="INVESTOR">Investors</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="statusFilter">Verification</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="ALL">All statuses</option>
                <option value="VERIFIED">Verified</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-white/84 shadow-card">
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No users match the selected filters.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="rounded-tl-lg px-6 py-3">ID</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="rounded-tr-lg px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((entry) => {
                      const isAdmin = entry.role === 'ADMIN';
                      return (
                        <tr key={entry.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/20">
                          <td className="px-6 py-4 font-medium">{entry.id}</td>
                          <td className="px-6 py-4">{entry.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{entry.email}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${isAdmin ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {entry.role || 'INVESTOR'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${entry.emailVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {entry.emailVerified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={() => handleCopyEmail(entry.email)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Email
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => handleDelete(entry.id)}
                                disabled={isAdmin || deletingUserId === entry.id}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {deletingUserId === entry.id ? 'Deleting...' : 'Delete'}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
