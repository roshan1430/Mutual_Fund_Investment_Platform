import { useParams } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Star, Users, Calendar, DollarSign } from 'lucide-react';

const FundDetails = () => {
  const { id } = useParams();

  // Mock fund data - in real app this would come from API
  const fund = {
    id: id,
    name: "Growth Equity Fund",
    category: "Large Cap Equity",
    nav: "$156.78",
    return1y: "+18.5%",
    return3y: "+14.2%",
    return5y: "+12.8%",
    risk: "High",
    rating: 4.5,
    aum: "$2.4B",
    expenseRatio: "0.75%",
    minInvestment: "$1,000",
    launchDate: "Jan 2015",
    manager: "John Smith",
    description: "This fund focuses on investing in large-cap equity securities with strong growth potential. The fund aims to provide long-term capital appreciation by investing in companies with sustainable competitive advantages.",
    isPositive: true
  };

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
                <p className="text-muted-foreground">{fund.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>Historical performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Performance Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Holdings</CardTitle>
                <CardDescription>Fund's largest investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Apple Inc.</span>
                    <span className="font-medium">8.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Microsoft Corp</span>
                    <span className="font-medium">7.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Amazon.com Inc</span>
                    <span className="font-medium">6.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alphabet Inc</span>
                    <span className="font-medium">6.1%</span>
                  </div>
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
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="font-medium text-success">{fund.return1y}</span>
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
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{fund.rating}/5</span>
                  </div>
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
                  <span className="font-medium">{fund.aum}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Expense Ratio</span>
                  </div>
                  <span className="font-medium">{fund.expenseRatio}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Min Investment</span>
                  </div>
                  <span className="font-medium">{fund.minInvestment}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Launch Date</span>
                  </div>
                  <span className="font-medium">{fund.launchDate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  Invest Now
                </Button>
                <Button variant="outline" className="w-full">
                  Start SIP
                </Button>
                <Button variant="outline" className="w-full">
                  Add to Watchlist
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