import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', portfolio: 32000, market: 30000 },
    { month: 'Feb', portfolio: 34500, market: 31200 },
    { month: 'Mar', portfolio: 36200, market: 32100 },
    { month: 'Apr', portfolio: 38800, market: 33500 },
    { month: 'May', portfolio: 41200, market: 35200 },
    { month: 'Jun', portfolio: 43600, market: 36800 },
    { month: 'Jul', portfolio: 45231, market: 38200 },
  ];

  const allocationData = [
    { name: 'Large Cap', value: 40, color: 'hsl(200 100% 70%)' },
    { name: 'Mid Cap', value: 25, color: 'hsl(142 76% 36%)' },
    { name: 'Small Cap', value: 15, color: 'hsl(38 92% 50%)' },
    { name: 'International', value: 12, color: 'hsl(0 84% 60%)' },
    { name: 'Debt', value: 8, color: 'hsl(215 16% 47%)' }
  ];

  const riskData = [
    { metric: 'Volatility', value: 12.3, benchmark: 15.2 },
    { metric: 'Sharpe Ratio', value: 0.85, benchmark: 0.72 },
    { metric: 'Beta', value: 0.92, benchmark: 1.0 },
    { metric: 'Max Drawdown', value: 8.5, benchmark: 12.1 }
  ];

  const trendsData = [
    { month: 'Jan', technology: 180, healthcare: 120, finance: 140 },
    { month: 'Feb', technology: 195, healthcare: 135, finance: 155 },
    { month: 'Mar', technology: 210, healthcare: 145, finance: 165 },
    { month: 'Apr', technology: 185, healthcare: 160, finance: 175 },
    { month: 'May', technology: 225, healthcare: 170, finance: 185 },
    { month: 'Jun', technology: 240, healthcare: 185, finance: 195 }
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Portfolio Analytics</h1>
          <p className="text-xl text-muted-foreground">Deep insights into your investment performance</p>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your investment growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="portfolio" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          name="Your Portfolio"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="market" 
                          stroke="hsl(var(--muted-foreground))" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Market"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Returns Comparison</CardTitle>
                  <CardDescription>vs Market Benchmarks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Your Portfolio</span>
                      <span className="font-bold text-success">+18.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>S&P 500</span>
                      <span className="font-bold">+15.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>NASDAQ</span>
                      <span className="font-bold">+12.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Analysis of your portfolio risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riskData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="metric" type="category" stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="value" fill="hsl(var(--primary))" name="Your Portfolio" />
                        <Bar dataKey="benchmark" fill="hsl(var(--muted-foreground))" name="Benchmark" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">7.2</p>
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">0.85</p>
                      <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">12.3%</p>
                      <p className="text-sm text-muted-foreground">Volatility</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Current market insights and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="technology" 
                        stackId="1" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        name="Technology"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="healthcare" 
                        stackId="1" 
                        stroke="hsl(var(--success))" 
                        fill="hsl(var(--success))" 
                        name="Healthcare"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="finance" 
                        stackId="1" 
                        stroke="hsl(var(--warning))" 
                        fill="hsl(var(--warning))" 
                        name="Finance"
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;