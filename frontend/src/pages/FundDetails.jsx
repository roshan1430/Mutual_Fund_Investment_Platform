import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Star, Users, Calendar, DollarSign, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState, useEffect } from 'react';
import { fetchFundById } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import InvestDialog from '@/components/ui/invest-dialog';

const FundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlisted, setWatchlisted] = useState(false);

  // Mock performance data for chart
  const performanceData = [
    { month: 'Jan', nav: 140, benchmark: 138 },
    { month: 'Feb', nav: 145, benchmark: 142 },
    { month: 'Mar', nav: 142, benchmark: 140 },
    { month: 'Apr', nav: 150, benchmark: 148 },
    { month: 'May', nav: 155, benchmark: 152 },
    { month: 'Jun', nav: 158, benchmark: 155 },
    { month: 'Jul', nav: 162, benchmark: 160 },
    { month: 'Aug', nav: 159, benchmark: 157 },
    { month: 'Sep', nav: 165, benchmark: 162 },
    { month: 'Oct', nav: 168, benchmark: 165 },
    { month: 'Nov', nav: 170, benchmark: 168 },
    { month: 'Dec', nav: 175, benchmark: 172 }
  ];

  // Mock holdings distribution data
  const holdingsData = [
    { name: 'HDFC Bank', value: 8.5 },
    { name: 'Reliance', value: 7.8 },
    { name: 'TCS', value: 6.9 },
    { name: 'Infosys', value: 6.2 },
    { name: 'ICICI Bank', value: 5.8 },
    { name: 'Others', value: 64.8 }
  ];

  useEffect(() => {
    const loadFund = async () => {
      try {
        const data = await fetchFundById(id);
        setFund(data);
        
        // Check if fund is in watchlist
        const savedWatchlist = localStorage.getItem('watchlist');
        if (savedWatchlist) {
          const watchlistIds = JSON.parse(savedWatchlist);
          setWatchlisted(watchlistIds.includes(parseInt(id)));
        }
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load fund details', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    loadFund();
  }, [id, toast]);

  const handleSIP = () => {
    navigate('/sip-calculator');
    toast({ title: 'SIP Calculator', description: 'Opening SIP calculator for this fund' });
  };

  const handleWatchlist = () => {
    const fundId = parseInt(id);
    const savedWatchlist = localStorage.getItem('watchlist');
    let watchlistIds = savedWatchlist ? JSON.parse(savedWatchlist) : [];
    
    if (watchlisted) {
      // Remove from watchlist
      watchlistIds = watchlistIds.filter(fid => fid !== fundId);
      if (watchlistIds.length === 0) {
        localStorage.removeItem('watchlist');
      } else {
        localStorage.setItem('watchlist', JSON.stringify(watchlistIds));
      }
      setWatchlisted(false);
      toast({ title: 'Removed', description: 'Removed from watchlist', variant: 'default' });
    } else {
      // Add to watchlist
      if (!watchlistIds.includes(fundId)) {
        watchlistIds.push(fundId);
      }
      localStorage.setItem('watchlist', JSON.stringify(watchlistIds));
      setWatchlisted(true);
      toast({ title: 'Added', description: 'Added to watchlist', variant: 'default' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading fund details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!fund) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Fund not found</div>
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
          <div className="flex items-center space-x-2 mb-4">
            <h1 className="text-4xl font-bold text-foreground">{fund.name}</h1>
            <Badge variant={fund.risk === 'High' ? 'destructive' : fund.risk === 'Medium' ? 'default' : 'secondary'}>
              {fund.risk} Risk
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">{fund.category}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{fund.description || 'No description available'}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fund Manager</p>
                    <p className="font-medium">{fund.manager || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Launch Date</p>
                    <p className="font-medium">{fund.launchDate || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>NAV vs Benchmark Performance (Last 12 Months)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="nav" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Fund NAV"
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Benchmark"
                      dot={{ fill: '#8b5cf6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holdings Composition</CardTitle>
                <CardDescription>Distribution of fund holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={holdingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="Allocation %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Holdings</CardTitle>
                <CardDescription>Fund's largest investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fund.topHoldings && fund.topHoldings.length > 0 ? (
                    fund.topHoldings.map((holding, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{holding}</span>
                        <span className="font-medium">{(100 / (fund.topHoldings.length || 1)).toFixed(1)}%</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground">No holdings data available</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current NAV</span>
                  <span className="font-bold text-lg">{fund.nav}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">1 Year Return</span>
                  <div className="flex items-center space-x-1">
                    {parseFloat(fund.return1y || "0") >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`font-medium ${parseFloat(fund.return1y || "0") >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {fund.return1y}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">3 Year Return</span>
                  <span className="font-medium text-success">{fund.return3y}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">5 Year Return</span>
                  <span className="font-medium text-success">{fund.return5y}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <Badge variant={fund.risk === 'High' ? 'destructive' : fund.risk === 'Medium' ? 'default' : 'secondary'}>
                    {fund.risk}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fund Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">AUM</span>
                  </div>
                  <span className="font-medium">{fund.aum || 'N/A'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Expense Ratio</span>
                  </div>
                  <span className="font-medium">{fund.expenseRatio || 'N/A'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Min Investment</span>
                  </div>
                  <span className="font-medium">{fund.minInvestment || 'N/A'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Launch Date</span>
                  </div>
                  <span className="font-medium">{fund.launchDate || 'N/A'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InvestDialog fund={fund} onInvestSuccess={() => {
                  toast({ title: 'Success', description: 'Investment recorded successfully' });
                }} />
                <Button variant="outline" className="w-full" onClick={handleSIP}>
                  Start SIP
                </Button>
                <Button 
                  variant={watchlisted ? "default" : "outline"} 
                  className="w-full" 
                  onClick={handleWatchlist}
                >
                  <Heart className={`h-4 w-4 mr-2 ${watchlisted ? 'fill-current' : ''}`} />
                  {watchlisted ? 'Added to Watchlist' : 'Add to Watchlist'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FundDetails;









