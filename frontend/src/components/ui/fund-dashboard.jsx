import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import InvestDialog from '@/components/ui/invest-dialog';

const FundDashboard = () => {
  const topFunds = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap',
      nav: 'Rs 847.50',
      return1Y: '+18.5%',
      return3Y: '+12.8%',
      rating: 5,
      risk: 'Moderate',
      aum: 'Rs 15,420 Cr',
    },
    {
      id: 2,
      name: 'SBI Blue Chip Fund',
      category: 'Large Cap',
      nav: 'Rs 652.30',
      return1Y: '+16.2%',
      return3Y: '+11.4%',
      rating: 4,
      risk: 'Moderate',
      aum: 'Rs 12,850 Cr',
    },
    {
      id: 3,
      name: 'Axis Mid Cap Fund',
      category: 'Mid Cap',
      nav: 'Rs 234.75',
      return1Y: '+22.8%',
      return3Y: '+15.6%',
      rating: 5,
      risk: 'High',
      aum: 'Rs 8,940 Cr',
    },
    {
      id: 4,
      name: 'ICICI Prudential Technology',
      category: 'Sectoral',
      nav: 'Rs 445.20',
      return1Y: '+28.4%',
      return3Y: '+18.9%',
      rating: 4,
      risk: 'Very High',
      aum: 'Rs 6,750 Cr',
    },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'bg-success/10 text-success';
      case 'Moderate':
        return 'bg-warning/10 text-warning';
      case 'High':
        return 'bg-destructive/10 text-destructive';
      case 'Very High':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-warning' : 'text-muted'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-900 shadow-sm">
              <TrendingUp className="h-4 w-4" />
              Weekly watchlist from our research desk
            </div>
            <h2 className="mb-4 text-4xl font-bold text-foreground">Top Performing Mutual Funds</h2>
            <p className="max-w-2xl text-xl text-muted-foreground">
              Discover high-performing funds across different categories and risk profiles
            </p>
          </div>
          <Button size="lg" variant="outline" className="border-sky-200 bg-white/80 text-primary hover:bg-white" asChild>
            <Link to="/funds">
              Browse full catalog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {topFunds.map((fund) => (
            <Card
              key={fund.id}
              className="group border-white/70 bg-[image:var(--gradient-panel)] p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-foreground">{fund.name}</h3>
                    <Badge variant="secondary" className="border border-sky-100 bg-sky-50 text-xs text-sky-900">
                      {fund.category}
                    </Badge>
                  </div>
                  <div className="flex">{renderStars(fund.rating)}</div>
                </div>

                <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm">
                  <div className="text-sm text-muted-foreground">Current NAV</div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{fund.nav}</div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-3/4 rounded-full bg-gradient-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-sky-50 p-3 text-center">
                    <div className="text-sm text-muted-foreground">1 Year</div>
                    <div className="font-semibold text-success">{fund.return1Y}</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-center">
                    <div className="text-sm text-muted-foreground">3 Years</div>
                    <div className="font-semibold text-success">{fund.return3Y}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getRiskColor(fund.risk)}>{fund.risk} Risk</Badge>
                  <span className="text-sm text-muted-foreground">AUM: {fund.aum}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <InvestDialog fund={fund} onInvestSuccess={() => {}} />
                  <Button size="sm" variant="outline" className="border-sky-200 bg-white/80 text-primary group-hover:border-primary" asChild>
                    <Link to={`/funds/${fund.id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundDashboard;
