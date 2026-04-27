import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "5 Habits of Successful Mutual Fund Investors",
      excerpt: "Learn the key habits that distinguish successful investors from the rest. Discover discipline, patience, and the power of consistent investing.",
      date: "April 8, 2026",
      author: "Ravi Sharma",
      category: "investing",
      readTime: "5 min read",
      featured: true,
      image: "📊"
    },
    {
      id: 2,
      title: "How to Build an Emergency Fund with Mutual Funds",
      excerpt: "Your emergency fund is crucial for financial security. Learn how to build and maintain an emergency fund using mutual funds.",
      date: "April 5, 2026",
      author: "Priya Mishra",
      category: "planning",
      readTime: "4 min read",
      featured: false,
      image: "🛡️"
    },
    {
      id: 3,
      title: "Why SIP is Better Than Lump Sum for Most Investors",
      excerpt: "Systematic Investment Plan (SIP) offers advantages over lump sum investing. Here's why SIP might be the perfect fit for your financial goals.",
      date: "April 3, 2026",
      author: "Amit Patel",
      category: "strategy",
      readTime: "6 min read",
      featured: false,
      image: "📈"
    },
    {
      id: 4,
      title: "Market Volatility: Opportunity or Risk?",
      excerpt: "Is market volatility something to fear or embrace? Discover how informed investors use volatility to their advantage.",
      date: "March 31, 2026",
      author: "Deepak Kumar",
      category: "market",
      readTime: "7 min read",
      featured: false,
      image: "🎯"
    },
    {
      id: 5,
      title: "Tax Efficiency in Mutual Fund Investing",
      excerpt: "Learn strategies to minimize taxes while investing in mutual funds. Understand ELSS, capital gains, and tax-loss harvesting.",
      date: "March 28, 2026",
      author: "Neha Sharma",
      category: "tax",
      readTime: "8 min read",
      featured: false,
      image: "💰"
    },
    {
      id: 6,
      title: "Retirement Planning: Start Now, Retire Happy",
      excerpt: "It's never too early or too late to start retirement planning. Learn how mutual funds can power your retirement goals.",
      date: "March 25, 2026",
      author: "Rajesh Singh",
      category: "planning",
      readTime: "6 min read",
      featured: false,
      image: "🏖️"
    },
    {
      id: 7,
      title: "Index Funds vs Active Management: Which Wins?",
      excerpt: "The great debate: passive index funds vs actively managed funds. We present the facts and let you decide.",
      date: "March 22, 2026",
      author: "Sarah Johnson",
      category: "strategy",
      readTime: "7 min read",
      featured: false,
      image: "⚖️"
    },
    {
      id: 8,
      title: "Sector Investing: Opportunities and Risks",
      excerpt: "Sectoral funds can boost returns but come with risks. Learn how to identify promising sectors and invest wisely.",
      date: "March 20, 2026",
      author: "Vikram Desai",
      category: "investing",
      readTime: "6 min read",
      featured: false,
      image: "🏭"
    }
  ];

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Investing', value: 'investing' },
    { name: 'Strategy', value: 'strategy' },
    { name: 'Planning', value: 'planning' },
    { name: 'Market', value: 'market' },
    { name: 'Tax', value: 'tax' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and strategies to help you make better investment decisions
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden lg:grid lg:grid-cols-2 gap-0 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-6xl">{featuredPost.image}</div>
            </div>
            <CardContent className="pt-6">
              <Badge className="mb-4 bg-gradient-primary">Featured</Badge>
              <h2 className="text-2xl font-bold text-foreground mb-3">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
              
              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {featuredPost.author}
                </div>
                <span>{featuredPost.readTime}</span>
              </div>
              
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" asChild>
                <Link to={`/blog/${featuredPost.id}`}>Read Article <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button 
              key={cat.value}
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center min-h-[100px] flex items-center justify-center">
                <div className="text-4xl">{post.image}</div>
              </div>
              
              <CardHeader>
                <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                <CardTitle className="text-lg mt-2">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/blog/${post.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription>Subscribe to get the latest investment insights delivered to your inbox</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
              />
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">More Topics to Explore</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold text-foreground mb-1">Beginner's Guide</h3>
                <p className="text-sm text-muted-foreground">Everything beginners need to know about mutual funds</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold text-foreground mb-1">Advanced Strategies</h3>
                <p className="text-sm text-muted-foreground">Complex strategies for experienced investors</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold text-foreground mb-1">Market Updates</h3>
                <p className="text-sm text-muted-foreground">Weekly and monthly market analysis</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold text-foreground mb-1">Success Stories</h3>
                <p className="text-sm text-muted-foreground">Real stories from successful investors</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold text-foreground mb-1">Expert Q&A</h3>
                <p className="text-sm text-muted-foreground">Questions answered by our experts</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-semibold text-foreground mb-1">Audio Podcast</h3>
                <p className="text-sm text-muted-foreground">Listen to investment discussions on the go</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
