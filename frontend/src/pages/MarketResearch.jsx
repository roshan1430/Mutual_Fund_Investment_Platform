import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, BrainCircuit } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const MarketResearch = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState(null);

  const marketTrends = [
    {
      id: 1,
      title: "Large Cap Funds Show Strong Performance",
      date: "April 8, 2026",
      category: "Large Cap",
      trend: "up",
      change: "+18.5%",
      summary: "Large cap mutual funds are showing strong growth driven by stable blue-chip companies.",
      insights: "The rally is expected to continue with steady economic growth and corporate earnings growth."
    },
    {
      id: 2,
      title: "Tech Sector Remains Volatile",
      date: "April 7, 2026",
      category: "Technology",
      trend: "down",
      change: "-3.2%",
      summary: "Technology sector fund performances are mixed as interest rate concerns persist.",
      insights: "Consider diversifying tech investments with defensive sectors for balance."
    },
    {
      id: 3,
      title: "Healthcare Funds Attract Investors",
      date: "April 6, 2026",
      category: "Healthcare",
      trend: "up",
      change: "+12.8%",
      summary: "Healthcare mutual funds attract increased investor interest due to defensive characteristics.",
      insights: "Healthcare remains a safe haven for risk-averse investors in uncertain times."
    },
    {
      id: 4,
      title: "Mid-Cap Opportunities Emerging",
      date: "April 5, 2026",
      category: "Mid Cap",
      trend: "up",
      change: "+22.3%",
      summary: "Mid-cap funds showing strong growth potential as valuations remain attractive.",
      insights: "Mid-cap funds could offer better risk-reward proposition than large caps currently."
    }
  ];

  const researchReports = [
    {
      id: 1,
      title: "Global Markets Overview - April 2026",
      date: "Published: April 8, 2026",
      pages: 15,
      category: "Global",
      topics: ["Global Economy", "Emerging Markets", "Currency Trends"]
    },
    {
      id: 2,
      title: "Indian Mutual Fund Industry Report",
      date: "Published: April 1, 2026",
      pages: 22,
      category: "India",
      topics: ["Industry Analysis", "Fund Performance", "Investor Behavior"]
    },
    {
      id: 3,
      title: "Sector-wise Performance Analysis Q1 2026",
      date: "Published: March 31, 2026",
      pages: 18,
      category: "Sectors",
      topics: ["Manufacturing", "Services", "IT", "Pharma"]
    },
    {
      id: 4,
      title: "Risk Assessment: Economic Indicators",
      date: "Published: March 25, 2026",
      pages: 12,
      category: "Risk",
      topics: ["Inflation", "Interest Rates", "Market Volatility"]
    }
  ];

  const handleViewReport = (reportTitle) => {
    setSelectedReport(reportTitle);
    toast({
      title: 'Report Loading',
      description: `Opening "${reportTitle}". Please wait...`,
      variant: 'default'
    });
  };

  const handleDownloadReport = (reportTitle) => {
    toast({
      title: 'Download Started',
      description: `${reportTitle} is being downloaded to your device.`,
      variant: 'default'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Market Research</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with our latest market analysis, trends, and expert insights
          </p>
        </div>

        {/* Market Trends Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Market Trends</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {marketTrends.map((trend) => (
              <Card key={trend.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg">{trend.title}</CardTitle>
                      <CardDescription>{trend.date}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {trend.trend === 'up' ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`font-semibold ${trend.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.change}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{trend.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{trend.summary}</p>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm text-foreground mb-1">Key Insight:</h4>
                    <p className="text-sm text-muted-foreground">{trend.insights}</p>
                  </div>
                  <Button variant="outline" className="w-full">Read Full Analysis</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Reports Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Research Reports</h2>
          <div className="space-y-4">
            {researchReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{report.date} • {report.pages} pages</p>
                      <div className="flex flex-wrap gap-2">
                        {report.topics.map((topic, idx) => (
                          <Badge key={idx} variant="outline">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleViewReport(report.title)}
                      >
                        View
                      </Button>
                      <Button 
                        className="bg-gradient-primary text-primary-foreground"
                        onClick={() => handleDownloadReport(report.title)}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Indicators Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BrainCircuit className="h-6 w-6" />
              Key Market Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Nifty 50</p>
                <p className="text-3xl font-bold text-foreground">20,542</p>
                <p className="text-sm text-green-500">▲ +1.2%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sensex</p>
                <p className="text-3xl font-bold text-foreground">67,284</p>
                <p className="text-sm text-green-500">▲ +0.8%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">FII Inflows</p>
                <p className="text-3xl font-bold text-foreground">₹2,450Cr</p>
                <p className="text-sm text-green-500">▲ This Month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Volatility Index</p>
                <p className="text-3xl font-bold text-foreground">16.8</p>
                <p className="text-sm text-orange-500">▼ Moderate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expert Commentary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Expert Commentary</CardTitle>
            <CardDescription>Latest insights from our team of market experts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                <h3 className="font-semibold text-lg text-foreground mb-2">Bullish on Mid-Caps - Ravi Sharma, Chief Analyst</h3>
                <p className="text-muted-foreground mb-2">
                  The mid-cap segment presents excellent opportunities for value investors. With earnings growth expected to outpace large caps, mid-cap funds could deliver superior returns over the next 12-18 months.
                </p>
                <p className="text-sm text-muted-foreground italic">Published: 2 days ago</p>
              </div>
              <div className="p-4 border-l-4 border-orange-500 bg-orange-500/5 rounded">
                <h3 className="font-semibold text-lg text-foreground mb-2">Stay Cautious in Tech - Priya Mishra, Tech Sector Specialist</h3>
                <p className="text-muted-foreground mb-2">
                  While long-term prospects remain strong, near-term headwinds from global rate hikes and tech regulation concerns warrant a cautious stance. Consider a phased entry approach.
                </p>
                <p className="text-sm text-muted-foreground italic">Published: 3 days ago</p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-500/5 rounded">
                <h3 className="font-semibold text-lg text-foreground mb-2">Healthcare Remains Safe Harbor - Dr. Amit Patel, Healthcare Analyst</h3>
                <p className="text-muted-foreground mb-2">
                  Healthcare funds offer defensive characteristics ideal for conservative portfolios. Strong domestic demand and export opportunities make this sector attractive.
                </p>
                <p className="text-sm text-muted-foreground italic">Published: 4 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MarketResearch;
