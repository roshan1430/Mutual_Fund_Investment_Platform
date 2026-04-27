import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchHoldings } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SellDialog from '@/components/ui/sell-dialog';

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const loadHoldings = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      const data = await fetchHoldings(user.id);
      setHoldings(data);
      
      // Calculate totals
      let totalVal = 0;
      let totalInv = 0;
      let totalRet = 0;
      
      data.forEach((holding) => {
        totalVal += parseFloat(holding.currentValue || 0);
        totalInv += parseFloat(holding.totalInvested || 0);
        totalRet += parseFloat(holding.returns || 0);
      });
      
      setTotalValue(totalVal);
      setTotalInvested(totalInv);
      setTotalReturns(totalRet);
    } catch (error) {
      toast({ title: 'Info', description: 'No holdings found yet', variant: 'default' });
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      await loadHoldings();
      setLoading(false);
    };
    loadInitial();

    // Auto-refresh holdings every 5 seconds
    const interval = setInterval(() => {
      loadHoldings();
    }, 5000);

    return () => clearInterval(interval);
  }, [toast, user?.id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadHoldings();
    setRefreshing(false);
    toast({ title: 'Success', description: 'Holdings updated', variant: 'default' });
  };

  const returnPercentage = totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading holdings...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">My Fund Holdings</h1>
            <p className="text-xl text-muted-foreground">Track your mutual fund investments and performance</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Summary Cards */}
        {holdings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Total Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">₹{totalInvested.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mt-2">Across {holdings.length} funds</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success/10 to-success/5">
              <CardHeader>
                <CardTitle className="text-lg">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">₹{totalValue.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mt-2">Market value of holdings</p>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-br ${totalReturns >= 0 ? 'from-green-500/10 to-green-500/5' : 'from-red-500/10 to-red-500/5'}`}>
              <CardHeader>
                <CardTitle className="text-lg">Total Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{totalReturns.toFixed(2)}
                </div>
                <p className={`text-sm mt-2 ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalReturns >= 0 ? '+' : ''}{returnPercentage}%
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Holdings Table */}
        {holdings.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Holdings Details</CardTitle>
                <CardDescription>Detailed breakdown of your fund holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-3 px-4 font-semibold">Fund Name</th>
                        <th className="text-right py-3 px-4 font-semibold">Units</th>
                        <th className="text-right py-3 px-4 font-semibold">Avg Buy Price</th>
                        <th className="text-right py-3 px-4 font-semibold">Current Price</th>
                        <th className="text-right py-3 px-4 font-semibold">Total Invested</th>
                        <th className="text-right py-3 px-4 font-semibold">Current Value</th>
                        <th className="text-right py-3 px-4 font-semibold">Returns</th>
                        <th className="text-right py-3 px-4 font-semibold">Return %</th>
                        <th className="text-center py-3 px-4 font-semibold w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((holding) => (
                        <tr key={holding.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4 font-medium">{holding.fundName}</td>
                          <td className="text-right py-4 px-4">{parseFloat(holding.units).toFixed(2)}</td>
                          <td className="text-right py-4 px-4">₹{parseFloat(holding.averageBuyPrice).toFixed(2)}</td>
                          <td className="text-right py-4 px-4">₹{parseFloat(holding.currentPrice).toFixed(2)}</td>
                          <td className="text-right py-4 px-4">₹{parseFloat(holding.totalInvested).toFixed(2)}</td>
                          <td className="text-right py-4 px-4 font-semibold">₹{parseFloat(holding.currentValue).toFixed(2)}</td>
                          <td className="text-right py-4 px-4">
                            <div className="flex items-center justify-end space-x-1">
                              {parseFloat(holding.returns) >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className={parseFloat(holding.returns) >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                ₹{parseFloat(holding.returns).toFixed(2)}
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-4 px-4">
                            <span className={parseFloat(holding.returnsPercentage) >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                              {parseFloat(holding.returnsPercentage).toFixed(2)}%
                            </span>
                          </td>
                          <td className="text-center py-4 px-4 w-24">
                            <SellDialog holding={holding} onSellSuccess={handleRefresh} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-lg text-muted-foreground mb-4">No fund holdings yet</p>
              <Button onClick={() => navigate('/funds')}>Browse Funds</Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Holdings;
