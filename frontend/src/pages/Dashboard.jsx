import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchDashboard, fetchFunds } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [comparisonFunds, setComparisonFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const loadDashboard = async () => {
      try {
        const [summary, funds] = await Promise.all([fetchDashboard(user.id), fetchFunds()]);
        setDashboardData(summary);
        setComparisonFunds(funds);
      } catch {
        toast({ title: 'Error', description: 'Failed to load dashboard data', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [toast, user?.id]);

  const topComparisonData = useMemo(() => {
    return comparisonFunds
      .map((fund) => ({
        name: fund.name,
        return1y: Number(fund.return1y?.replace('%', '') || 0),
        return3y: Number(fund.return3y?.replace('%', '') || 0),
      }))
      .sort((a, b) => b.return1y - a.return1y)
      .slice(0, 5);
  }, [comparisonFunds]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading dashboard...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Failed to load dashboard data.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Dashboard</h1>
          <p className="text-xl text-muted-foreground">Track your portfolio performance and investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{dashboardData.totalPortfolio.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Actual portfolio value from your current holdings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Funds</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.activeFunds}</div>
              <p className="text-xs text-muted-foreground">{dashboardData.newFundsThisMonth} new funds this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.monthlyReturn >= 0 ? '+' : ''}{dashboardData.monthlyReturn}%</div>
              <p className="text-xs text-muted-foreground">{dashboardData.returnChange >= 0 ? '+' : ''}{dashboardData.returnChange}% change</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.riskScore}</div>
              <p className="text-xs text-muted-foreground">{dashboardData.riskLevel}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fund Comparison</CardTitle>
              <CardDescription>Compare the top funds by real 1-year and 3-year returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topComparisonData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="return1y" name="1Y Return" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="return3y" name="3Y Return" fill="hsl(var(--success))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTransactions.map((transaction) => (
                  <div key={`${transaction.fundName}-${transaction.date}`} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{transaction.fundName}</p>
                      <p className="text-sm text-muted-foreground">{transaction.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{transaction.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your investments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => navigate('/funds')}
              >
                Invest in New Fund
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/analytics')}
              >
                Rebalance Portfolio
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/reports')}
              >
                Download Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;









