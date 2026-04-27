import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const InvestmentPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 1,
      name: "Starter Plan",
      description: "Perfect for beginners just starting their investment journey",
      price: "₹5,000",
      minAmount: "Min Investment: ₹5,000",
      features: [
        "Access to 100+ mutual funds",
        "Basic portfolio tracking",
        "Monthly reports",
        "Email support",
        "Educational resources"
      ],
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: "border-yellow-500/20 bg-yellow-500/5",
      recommended: false,
      ctaText: "Start Investing"
    },
    {
      id: 2,
      name: "Growth Plan",
      description: "Ideal for active investors who want advanced tools",
      price: "₹25,000",
      minAmount: "Min Investment: ₹25,000",
      features: [
        "All Starter features",
        "Advanced analytics & insights",
        "Priority support",
        "Portfolio optimization",
        "Tax-advantaged investing",
        "Quarterly financial reviews",
        "SIP calculator premium features"
      ],
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      color: "border-green-500/20 bg-green-500/5",
      recommended: true,
      ctaText: "Choose Plan"
    },
    {
      id: 3,
      name: "Premium Plan",
      description: "Comprehensive wealth management for serious investors",
      price: "₹1,00,000",
      minAmount: "Min Investment: ₹1,00,000",
      features: [
        "All Growth features",
        "Dedicated financial advisor",
        "Custom portfolio creation",
        "Real-time market alerts",
        "Exclusive investment opportunities",
        "Tax planning services",
        "Estate planning guidance",
        "24/7 priority support",
        "Annual wealth review"
      ],
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      color: "border-blue-500/20 bg-blue-500/5",
      recommended: false,
      ctaText: "Get Premium"
    }
  ];

  const handleSelectPlan = (planName) => {
    toast({
      title: 'Plan Selected',
      description: `You've selected the ${planName}. Redirecting to investment setup...`,
      variant: 'default'
    });
    setTimeout(() => {
      navigate('/funds');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your investment goals and watch your wealth grow
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${plan.color}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Recommended
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-lg">
                    {plan.icon}
                  </div>
                  {plan.recommended && (
                    <Badge className="bg-gradient-primary">Popular</Badge>
                  )}
                </div>
                
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">{plan.price}</div>
                  <p className="text-sm text-muted-foreground">{plan.minAmount}</p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    plan.recommended 
                      ? 'bg-gradient-primary text-primary-foreground hover:opacity-90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {plan.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Plan Comparison</CardTitle>
            <CardDescription>Detailed feature comparison across all plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Starter</th>
                    <th className="text-center py-3 px-4 font-semibold">Growth</th>
                    <th className="text-center py-3 px-4 font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">Mutual Funds Access</td>
                    <td className="text-center py-3 px-4">100+</td>
                    <td className="text-center py-3 px-4">500+</td>
                    <td className="text-center py-3 px-4">All</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">Portfolio Tracking</td>
                    <td className="text-center py-3 px-4">✓ Basic</td>
                    <td className="text-center py-3 px-4">✓ Advanced</td>
                    <td className="text-center py-3 px-4">✓ Premium</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">Reports Frequency</td>
                    <td className="text-center py-3 px-4">Monthly</td>
                    <td className="text-center py-3 px-4">Quarterly</td>
                    <td className="text-center py-3 px-4">Monthly+Annual</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">Support</td>
                    <td className="text-center py-3 px-4">Email</td>
                    <td className="text-center py-3 px-4">Priority</td>
                    <td className="text-center py-3 px-4">24/7 Dedicated</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">Tax Planning</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓ Full</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">Financial Advisor</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4">✓ Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan anytime. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Is there a lock-in period?</h3>
              <p className="text-muted-foreground">No lock-in period! You can cancel anytime with no penalties. However, your investments remain as per mutual fund rules.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit/debit cards, net banking, UPI, and wallet payments for seamless transactions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Is my money safe?</h3>
              <p className="text-muted-foreground">Your investments are directly in mutual fund schemes regulated by SEBI. Your portfolio is protected under all securities regulations.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default InvestmentPlans;
