import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Funds = () => {
  const funds = [
    {
      id: 1,
      name: "Growth Equity Fund",
      category: "Large Cap",
      nav: "₹156.78",
      return1y: "+18.5%",
      return3y: "+14.2%",
      risk: "High",
      isPositive: true
    },
    {
      id: 2,
      name: "Balanced Growth Fund",
      category: "Hybrid",
      nav: "₹89.42",
      return1y: "+12.8%",
      return3y: "+11.5%",
      risk: "Medium",
      isPositive: true
    },
    {
      id: 3,
      name: "Tech Innovation Fund",
      category: "Sector",
      nav: "₹234.56",
      return1y: "+25.3%",
      return3y: "+19.7%",
      risk: "High",
      isPositive: true
    },
    {
      id: 4,
      name: "Conservative Income Fund",
      category: "Debt",
      nav: "₹45.12",
      return1y: "+6.8%",
      return3y: "+7.2%",
      risk: "Low",
      isPositive: true
    },
    {
      id: 5,
      name: "International Equity Fund",
      category: "Global",
      nav: "₹198.33",
      return1y: "-2.1%",
      return3y: "+8.9%",
      risk: "High",
      isPositive: false
    },
    {
      id: 6,
      name: "Small Cap Value Fund",
      category: "Small Cap",
      nav: "₹76.89",
      return1y: "+22.4%",
      return3y: "+16.1%",
      risk: "High",
      isPositive: true
    }
  ];

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
                    <span className="font-bold text-lg">{fund.nav}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1 Year Return</span>
                    <div className="flex items-center space-x-1">
                      {fund.isPositive ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`font-medium ${fund.isPositive ? 'text-success' : 'text-destructive'}`}>
                        {fund.return1y}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">3 Year Return</span>
                    <span className="font-medium text-success">{fund.return3y}</span>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button className="flex-1" size="sm">
                      Invest Now
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/funds/${fund.id}`}>View Details</Link>
                    </Button>
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