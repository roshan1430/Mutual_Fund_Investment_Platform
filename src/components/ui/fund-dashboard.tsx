import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FundDashboard: React.FC = () => {
  const topFunds = [
    {
      id: 1,
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      nav: "₹847.50",
      return1Y: "+18.5%",
      return3Y: "+12.8%",
      rating: 5,
      risk: "Moderate",
      aum: "₹15,420 Cr"
    },
    {
      id: 2,
      name: "SBI Blue Chip Fund",
      category: "Large Cap",
      nav: "₹652.30",
      return1Y: "+16.2%",
      return3Y: "+11.4%",
      rating: 4,
      risk: "Moderate",
      aum: "₹12,850 Cr"
    },
    {
      id: 3,
      name: "Axis Mid Cap Fund",
      category: "Mid Cap",
      nav: "₹234.75",
      return1Y: "+22.8%",
      return3Y: "+15.6%",
      rating: 5,
      risk: "High",
      aum: "₹8,940 Cr"
    },
    {
      id: 4,
      name: "ICICI Prudential Technology",
      category: "Sectoral",
      nav: "₹445.20",
      return1Y: "+28.4%",
      return3Y: "+18.9%",
      rating: 4,
      risk: "Very High",
      aum: "₹6,750 Cr"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success';
      case 'Moderate': return 'bg-warning/10 text-warning';
      case 'High': return 'bg-destructive/10 text-destructive';
      case 'Very High': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-warning fill-current' : 'text-muted'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Top Performing Mutual Funds
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover high-performing funds across different categories and risk profiles
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {topFunds.map((fund) => (
            <Card key={fund.id} className="p-6 bg-gradient-card shadow-card border-0 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">{fund.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {fund.category}
                    </Badge>
                  </div>
                  <div className="flex">{renderStars(fund.rating)}</div>
                </div>
                
                {/* NAV */}
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-sm text-muted-foreground">Current NAV</div>
                  <div className="text-2xl font-bold text-foreground">{fund.nav}</div>
                </div>
                
                {/* Returns */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground">1 Year</div>
                    <div className="font-semibold text-success">{fund.return1Y}</div>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground">3 Years</div>
                    <div className="font-semibold text-success">{fund.return3Y}</div>
                  </div>
                </div>
                
                {/* Risk and AUM */}
                <div className="flex items-center justify-between">
                  <Badge className={getRiskColor(fund.risk)}>
                    {fund.risk} Risk
                  </Badge>
                  <span className="text-sm text-muted-foreground">AUM: {fund.aum}</span>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1 bg-gradient-primary text-primary-foreground">
                    Invest Now
                  </Button>
                  <Button size="sm" variant="outline" className="border-primary text-primary">
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
            View All Funds →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FundDashboard;