import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const HelpCenter = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqCategories = [
    "Account & Registration",
    "Investments",
    "Transactions",
    "Technical Issues",
    "Billing",
    "Safety & Security"
  ];

  const faqs = [
    {
      category: "Account & Registration",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on 'Get Started' or 'Sign Up' button, enter your email and basic details, verify your email, and complete your KYC (Know Your Customer) verification. You'll be able to invest immediately after that."
        },
        {
          q: "I forgot my password. How to reset it?",
          a: "Click on 'Forgot Password' on the login page, enter your registered email, and follow the link sent to your email to reset your password."
        },
        {
          q: "Can I change my registered email?",
          a: "Yes, go to Account Settings > Email, enter your new email, and verify it with an OTP. Your email will be updated within 24 hours."
        }
      ]
    },
    {
      category: "Investments",
      questions: [
        {
          q: "What's the minimum investment amount?",
          a: "Minimum investment depends on the plan you choose. Starter Plan: ₹5,000, Growth Plan: ₹25,000, Premium Plan: ₹1,00,000. You can start with smaller amounts via SIP."
        },
        {
          q: "How do I start a SIP?",
          a: "Go to any fund page, click 'Start SIP', choose your monthly investment amount (min ₹500), select duration, and authorize the recurring payment. Your SIP will start the next month."
        },
        {
          q: "Can I stop or modify my SIP anytime?",
          a: "Yes, you can pause, modify, or stop your SIP anytime from the Holdings section. Changes take effect from the next SIP date."
        }
      ]
    },
    {
      category: "Transactions",
      questions: [
        {
          q: "How long does it take for investments to be processed?",
          a: "Most investments are processed on the same day. SIPs are processed on the date you authorize. You'll receive a confirmation email immediately."
        },
        {
          q: "How do I redeem my investments?",
          a: "Go to Holdings, click on the fund you want to sell, enter the units or amount, and confirm. The redemption is processed the next business day, and funds are transferred within 1-2 days."
        },
        {
          q: "Is there any lock-in period?",
          a: "Most funds have no lock-in. However, ELSS (tax-saving) funds have a 3-year lock-in period as per regulations."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          q: "The app is running slow. What should I do?",
          a: "Try clearing your app cache, restarting your device, or updating to the latest app version. If the issue persists, contact support."
        },
        {
          q: "My payment failed. Will I be charged?",
          a: "Usually, failed payments don't result in charges. However, we recommend verifying your bank statement. Contact support if you see unexpected charges."
        },
        {
          q: "Is the platform secure?",
          a: "Yes, we use bank-grade encryption, 2-factor authentication, and follow all security regulations. Your investments are protected under SEBI regulations."
        }
      ]
    },
    {
      category: "Billing",
      questions: [
        {
          q: "What are the fees for using MutualFunds Pro?",
          a: "Our platform is free to use. You only pay the fund's expense ratio (included in NAV). No brokerage, subscription, or hidden fees."
        },
        {
          q: "When will I be charged for the plan I selected?",
          a: "Premium plan subscriptions are charged monthly/annually based on your selection. You'll receive an invoice and can cancel anytime."
        },
        {
          q: "How do I view my invoices?",
          a: "Go to Account Settings > Billing > Invoices. All your transaction statements and invoices are available for download."
        }
      ]
    },
    {
      category: "Safety & Security",
      questions: [
        {
          q: "Is my personal data safe?",
          a: "Yes, we encrypt all data using SSL certificates and comply with GDPR and Indian data protection laws. Your data is never shared with third parties."
        },
        {
          q: "What should I do if I suspect unauthorized access?",
          a: "Change your password immediately and contact our support team. We can help you secure your account and review any suspicious transactions."
        },
        {
          q: "Are my investments insured?",
          a: "Your investments are in government-regulated mutual fund schemes managed by licensed Asset Management Companies. They're protected under SEBI regulations, not insurance."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Call our support team",
      detail: "1-800-INVEST-1 (1-800-468-3781)",
      time: "Mon-Fri: 9 AM - 6 PM IST",
      color: "bg-blue-500/10"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Email us your concerns",
      detail: "support@mutualfundspro.com",
      time: "Response within 24 hours",
      color: "bg-green-500/10"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our agents",
      detail: "Available on app & website",
      time: "Mon-Fri: 10 AM - 8 PM IST",
      color: "bg-purple-500/10"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Visit Us",
      description: "Visit our office",
      detail: "MutualFunds Pro, Mumbai",
      time: "By appointment only",
      color: "bg-orange-500/10"
    }
  ];

  const filteredFaqs = searchQuery.trim() === '' 
    ? faqs 
    : faqs.map(category => ({
        ...category,
        questions: category.questions.filter(faq => 
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  const handleContactSupport = (method) => {
    if (method === 'chat') {
      toast({
        title: 'Live Chat',
        description: 'Opening live chat. Our agent will be with you shortly.',
        variant: 'default'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and contact our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search for help... (e.g., 'How to invest', 'SIP', 'Password reset')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-lg"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredFaqs.reduce((sum, cat) => sum + cat.questions.length, 0)} results for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Contact Methods Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Contact</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, idx) => (
              <Card key={idx} className={`${method.color} hover:shadow-lg transition-all duration-300`}>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white rounded-lg text-foreground">
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <p className="font-semibold text-foreground mb-2">{method.detail}</p>
                  <p className="text-xs text-muted-foreground mb-4">{method.time}</p>
                  <Button 
                    size="sm" 
                    className="bg-gradient-primary text-primary-foreground w-full"
                    onClick={() => handleContactSupport(idx === 2 ? 'chat' : 'other')}
                  >
                    {idx === 2 ? 'Start Chat' : 'Contact'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No results found for your search.</p>
                <Button 
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredFaqs.map((category, catIdx) => (
                <div key={catIdx}>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Badge className="bg-gradient-primary">{category.category}</Badge>
                  </h3>
                  
                  <div className="space-y-3 ml-2">
                    {category.questions.map((faq, idx) => {
                      const faqId = `${catIdx}-${idx}`;
                      const isExpanded = expandedFaq === faqId;
                      
                      return (
                        <Card 
                          key={faqId}
                          className="cursor-pointer hover:shadow-md transition-all duration-300"
                          onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-base font-semibold text-foreground">
                                {faq.q}
                              </CardTitle>
                              <span className="text-2xl ml-4">
                                {isExpanded ? '−' : '+'}
                              </span>
                            </div>
                          </CardHeader>
                          
                          {isExpanded && (
                            <CardContent>
                              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Still Need Help?</CardTitle>
            <CardDescription>We're here to help you succeed with your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to assist you with any questions or issues. 
              Don't hesitate to reach out!
            </p>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Contact Support Now
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
