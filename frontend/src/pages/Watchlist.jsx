import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { fetchFunds } from '@/lib/api';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadWatchlistAndFunds = async () => {
      try {
        // Load all funds
        const fundsData = await fetchFunds();
        setFunds(fundsData);

        // Load watchlist from localStorage
        const savedWatchlist = localStorage.getItem('watchlist');
        if (savedWatchlist) {
          const watchlistIds = JSON.parse(savedWatchlist);
          const watchlistedFunds = fundsData.filter(fund => watchlistIds.includes(fund.id));
          setWatchlist(watchlistedFunds);
        }
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load watchlist', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    loadWatchlistAndFunds();
  }, [toast]);

  const removeFund = (fundId) => {
    setWatchlist(watchlist.filter(fund => fund.id !== fundId));
    
    // Update localStorage
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      const watchlistIds = JSON.parse(savedWatchlist).filter(id => id !== fundId);
      if (watchlistIds.length > 0) {
        localStorage.setItem('watchlist', JSON.stringify(watchlistIds));
      } else {
        localStorage.removeItem('watchlist');
      }
    }

    toast({ title: 'Success', description: 'Fund removed from watchlist', variant: 'default' });
  };

  const viewDetails = (fundId) => {
    navigate(`/funds/${fundId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading watchlist...</div>
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
          <h1 className="text-4xl font-bold text-foreground mb-4">My Watchlist</h1>
          <p className="text-xl text-muted-foreground">Monitor your favorite mutual funds</p>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((fund) => (
              <Card key={fund.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{fund.name}</CardTitle>
                      <CardDescription>{fund.category}</CardDescription>
                    </div>
                    <Badge variant={fund.risk === 'High' ? 'destructive' : fund.risk === 'Medium' ? 'default' : 'secondary'}>
                      {fund.risk} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        className="flex-1" 
                        size="sm"
                        onClick={() => viewDetails(fund.id)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeFund(fund.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-lg text-muted-foreground mb-4">Your watchlist is empty</p>
              <p className="text-sm text-muted-foreground mb-6">Add funds to your watchlist from the fund details page to keep track of your favorites.</p>
              <Button onClick={() => navigate('/funds')}>Browse Funds</Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Watchlist;
