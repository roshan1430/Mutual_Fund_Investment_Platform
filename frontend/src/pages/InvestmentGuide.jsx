import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const InvestmentGuide = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Getting Started with Mutual Funds",
      description: "Everything you need to know before making your first investment",
      subsections: [
        {
          title: "What is a Mutual Fund?",
          content: "A mutual fund is a professionally managed investment fund that pools money from multiple investors to purchase securities like stocks, bonds, and other assets. Investors share proportionally in the gains or losses of the portfolio."
        },
        {
          title: "Why Invest in Mutual Funds?",
          content: "Mutual funds offer professional management, instant diversification, affordability (low minimum investment), liquidity, and tax advantages. They're ideal for both beginner and experienced investors."
        },
        {
          title: "Types of Mutual Funds",
          content: "There are various types: Equity funds (growth), Debt funds (income), Hybrid funds (balanced), Index funds (low-cost), and Sectoral funds (focused). Choose based on your risk appetite and investment goals."
        }
      ]
    },
    {
      id: 2,
      title: "Understanding Risk and Returns",
      description: "Learn how to assess your risk tolerance and expected returns",
      subsections: [
        {
          title: "Risk Assessment",
          content: "Evaluate your risk tolerance based on age, income, financial goals, and time horizon. Younger investors can afford higher risk for potential higher returns."
        },
        {
          title: "Risk Types in Mutual Funds",
          content: "Market risk, Interest rate risk, Credit risk, Liquidity risk, and Concentration risk. Understanding these helps you choose appropriate funds for your portfolio."
        },
        {
          title: "Returns & Performance",
          content: "Look at 1-year, 3-year, and 5-year returns. Compare with benchmark indices. Past returns don't guarantee future performance, but they provide historical context."
        }
      ]
    },
    {
      id: 3,
      title: "Building Your Investment Portfolio",
      description: "Strategies for creating a balanced, goal-oriented portfolio",
      subsections: [
        {
          title: "Asset Allocation",
          content: "Distribute investments across Equity (growth), Debt (stability), and Gold (hedge) based on your risk profile. A common rule: 100 - your age = percentage in equities."
        },
        {
          title: "Diversification",
          content: "Don't put all money in one fund or sector. Diversify across fund types, sectors, and asset classes. This reduces risk without proportionally reducing returns."
        },
        {
          title: "Rebalancing",
          content: "Review your portfolio quarterly. As some funds outperform others, your allocation may shift. Rebalance to maintain your target allocation."
        }
      ]
    },
    {
      id: 4,
      title: "SIP vs Lump Sum Investment",
      description: "Which investment approach is right for you?",
      subsections: [
        {
          title: "Systematic Investment Plan (SIP)",
          content: "Invest fixed amounts regularly (monthly/quarterly). Advantages: Rupee-cost averaging, disciplined approach, ideal for salaried individuals, lower initial commitment. Recommended for most investors."
        },
        {
          title: "Lump Sum Investment",
          content: "Invest entire amount at once. Advantages: Full market participation, suitable for one-time windfalls, ideal when markets are down. Requires good market timing skills."
        },
        {
          title: "Which Should You Choose?",
          content: "Use SIP if you have regular income and want disciplined investing. Use lump sum if you have surplus capital and can tolerate market volatility. You can also combine both approaches."
        }
      ]
    },
    {
      id: 5,
      title: "Tax-Efficient Investing",
      description: "Minimize taxes while maximizing investment returns",
      subsections: [
        {
          title: "Capital Gains Tax",
          content: "Short-term (< 1 year) gains taxed at slab rate. Long-term (> 1 year) gains taxed at 20% with indexation or 10% without indexation. Plan your exits accordingly."
        },
        {
          title: "Dividend Tax",
          content: "Dividend income is now taxable in your hands. Opt for growth option in funds to defer taxation. Use this strategy for long-term low-rate investors."
        },
        {
          title: "Tax-Saving Funds (ELSS)",
          content: "Equity Linked Savings Scheme (ELSS) offers tax deduction up to ₹1.5 lakh under Section 80C. Lock-in period is 3 years. Ideal for tax planning while investing."
        }
      ]
    }
  ];

  const tips = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Start Early",
      description: "The power of compounding rewards early investors. Start with whatever amount you can afford."
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      title: "Set Clear Goals",
      description: "Define your investment goals: retirement, education, home, emergency fund. Goals drive investment decisions."
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Diversify Smartly",
      description: "Don't chase returns. Build a portfolio aligned with your goals, time horizon, and risk capacity."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      title: "Avoid Emotional Investing",
      description: "Don't panic during market downturns. Continue SIP, avoid selling at losses. Stay the course."
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Review Regularly",
      description: "Review your portfolio at least quarterly. Rebalance if allocation shifts beyond targets."
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      title: "Keep Costs Low",
      description: "High expense ratios erode returns. Choose low-cost index or direct plan funds where possible."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Guide</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive guide to mutual fund investing from beginner basics to advanced strategies
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section) => (
            <Card 
              key={section.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="mt-2">{section.description}</CardDescription>
                  </div>
                  <span className="text-2xl">
                    {expandedSection === section.id ? '−' : '+'}
                  </span>
                </div>
              </CardHeader>
              
              {expandedSection === section.id && (
                <CardContent className="space-y-6 pt-6">
                  {section.subsections.map((subsection, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{subsection.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{subsection.content}</p>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Golden Rules Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Golden Rules of Investing</CardTitle>
            <CardDescription>Time-tested principles for investment success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, idx) => (
                <div key={idx} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    {tip.icon}
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Common Investment Mistakes to Avoid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/5 border-l-4 border-red-500 rounded">
                <h3 className="font-semibold text-foreground mb-1">❌ Chasing Returns</h3>
                <p className="text-muted-foreground text-sm">Don't switch funds frequently based on recent performance. Focus on consistent performers aligned with your goals.</p>
              </div>
              <div className="p-4 bg-red-500/5 border-l-4 border-red-500 rounded">
                <h3 className="font-semibold text-foreground mb-1">❌ Over-diversification</h3>
                <p className="text-muted-foreground text-sm">Investing in too many funds dilutes returns and makes tracking difficult. Stick to 5-8 well-chosen funds.</p>
              </div>
              <div className="p-4 bg-red-500/5 border-l-4 border-red-500 rounded">
                <h3 className="font-semibold text-foreground mb-1">❌ Ignoring Fees</h3>
                <p className="text-muted-foreground text-sm">High expense ratios significantly impact long-term returns. Compare and choose funds with reasonable fees.</p>
              </div>
              <div className="p-4 bg-red-500/5 border-l-4 border-red-500 rounded">
                <h3 className="font-semibold text-foreground mb-1">❌ Panic Selling</h3>
                <p className="text-muted-foreground text-sm">Market downturns are temporary. Continue your SIP and avoid selling at losses during market corrections.</p>
              </div>
              <div className="p-4 bg-red-500/5 border-l-4 border-red-500 rounded">
                <h3 className="font-semibold text-foreground mb-1">❌ Neglecting Reviews</h3>
                <p className="text-muted-foreground text-sm">Regularly review your portfolio performance and make necessary adjustments based on life changes.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start Investing?</CardTitle>
            <CardDescription>Use our tools and resources to create your personalized investment portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                <Link to="/sip-calculator">Start with SIP Calculator</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/investment-plans">Explore Investment Plans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentGuide;
