import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchFunds } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import InvestDialog from '@/components/ui/invest-dialog';

const Funds = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const data = await fetchFunds();
        setFunds(data);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load funds', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    loadFunds();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading funds...</div>
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Mutual Funds</h1>
          <p className="text-xl text-muted-foreground">Explore our comprehensive range of mutual fund options</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funds.map((fund) => (
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
                    <span className="font-bold text-lg">₹{fund.nav}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1 Year Return</span>
                    <div className="flex items-center space-x-1">
                      {fund.return1y >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`font-medium ${fund.return1y >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {fund.return1y}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">3 Year Return</span>
                    <span className="font-medium text-success">{fund.return3y}%</span>
                  </div>
                  
                  <div className="flex space-x-2 pt-4 gap-2">
                    <InvestDialog fund={fund} onInvestSuccess={() => {
                      // Optional: Trigger any refresh logic here
                    }} />
                    <Link to={`/funds/${fund.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full font-semibold hover:bg-gray-100 transition-colors">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Funds;









