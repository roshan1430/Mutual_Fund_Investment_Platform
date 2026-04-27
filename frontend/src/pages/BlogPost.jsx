import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      image: "📊",
      content: `
        <h2>Introduction</h2>
        <p>Successful mutual fund investors share common habits that set them apart from casual investors. These habits aren't about having insider knowledge or market timing skills, but rather about discipline, patience, and consistent behavior.</p>

        <h2>1. Consistent Investing</h2>
        <p>The most successful investors understand the power of compounding and consistent contributions. They set up systematic investment plans (SIPs) and stick to them regardless of market conditions. This approach eliminates emotional decision-making and ensures they buy more units when prices are low.</p>

        <h2>2. Long-term Perspective</h2>
        <p>Successful investors focus on long-term goals rather than short-term market fluctuations. They understand that markets will have ups and downs, but over time, quality investments tend to deliver positive returns. They don't panic during market downturns or get overly excited during bull markets.</p>

        <h2>3. Diversification</h2>
        <p>They spread their investments across different asset classes, sectors, and geographies. This reduces risk and ensures that poor performance in one area doesn't significantly impact their overall portfolio. Diversification is their risk management strategy.</p>

        <h2>4. Regular Portfolio Review</h2>
        <p>While they avoid frequent trading, successful investors regularly review their portfolios. They assess whether their investments still align with their goals, risk tolerance, and changing life circumstances. They rebalance when necessary and make adjustments based on fundamental changes.</p>

        <h2>5. Continuous Learning</h2>
        <p>The best investors never stop learning. They stay updated with market trends, economic indicators, and investment strategies. They read books, attend seminars, and continuously educate themselves about investing. Knowledge helps them make better decisions and avoid common pitfalls.</p>

        <h2>Conclusion</h2>
        <p>Success in mutual fund investing comes from developing these habits and sticking to them consistently. It's not about being right all the time, but about having a disciplined approach that works over the long term. Start building these habits today, and you'll be on your way to investment success.</p>
      `
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
      image: "🛡️",
      content: `
        <h2>Why You Need an Emergency Fund</h2>
        <p>An emergency fund is your financial safety net. It protects you from having to sell investments at a loss during market downturns or take on high-interest debt when unexpected expenses arise. Most financial experts recommend having 3-6 months of living expenses saved.</p>

        <h2>Using Mutual Funds for Your Emergency Fund</h2>
        <p>While traditional wisdom suggests keeping emergency funds in liquid savings accounts, mutual funds can be an excellent option for building and maintaining emergency funds, especially for larger amounts. Here's how to do it effectively.</p>

        <h2>Choose the Right Fund Type</h2>
        <p>For emergency funds, you need investments that are relatively stable and provide easy access to your money. Consider liquid funds or ultra-short-term debt funds. These funds invest in very short-term securities and provide stability with reasonable returns.</p>

        <h2>Systematic Investment Approach</h2>
        <p>Use Systematic Investment Plans (SIPs) to build your emergency fund gradually. Start with small amounts and increase your investment as your income grows. This approach makes building the fund less overwhelming and helps you develop a savings habit.</p>

        <h2>Balance Accessibility and Returns</h2>
        <p>Your emergency fund should be easily accessible, but you also want reasonable returns. Liquid funds typically offer 4-6% returns with instant redemption. This is much better than the 3-4% you might get from a savings account.</p>

        <h2>Building Your Fund</h2>
        <p>Start by calculating how much you need for emergencies. Then set up automatic transfers to your chosen mutual fund. Treat this as a non-negotiable expense. As your fund grows, you can gradually move to slightly longer-term funds for better returns.</p>

        <h2>Conclusion</h2>
        <p>Building an emergency fund with mutual funds is a smart way to ensure financial security while earning better returns than traditional savings options. Start small, be consistent, and you'll have a robust safety net in no time.</p>
      `
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
      image: "📈",
      content: `
        <h2>The Power of Rupee Cost Averaging</h2>
        <p>SIP's biggest advantage is rupee cost averaging. When you invest a fixed amount regularly, you buy more units when prices are low and fewer units when prices are high. This reduces the impact of market volatility on your investments.</p>

        <h2>Disciplined Investing</h2>
        <p>SIP enforces investment discipline. You commit to investing a fixed amount at regular intervals, regardless of market conditions. This prevents emotional decision-making and ensures you stay invested through market cycles.</p>

        <h2>Lower Entry Barrier</h2>
        <p>With SIP, you can start investing with as little as ₹500 per month. This makes mutual fund investing accessible to a much larger population compared to lump sum investing, which often requires significant capital.</p>

        <h2>Power of Compounding</h2>
        <p>SIP leverages the power of compounding more effectively than lump sum investments. Regular investments mean your money starts earning returns sooner, and those returns compound over a longer period.</p>

        <h2>Psychological Benefits</h2>
        <p>SIP reduces the stress of trying to time the market. You don't have to worry about when to enter the market. Instead, you benefit from volatility through rupee cost averaging.</p>

        <h2>When Lump Sum Might Be Better</h2>
        <p>Lump sum investing can be advantageous when you have a large amount of money available and believe the market is undervalued. However, timing the market correctly is extremely difficult, even for professionals.</p>

        <h2>Conclusion</h2>
        <p>For most individual investors, SIP is the superior choice. It removes the need for market timing, enforces discipline, and leverages rupee cost averaging. If you're unsure about when to invest, SIP is almost always the better option.</p>
      `
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
      image: "🎯",
      content: `
        <h2>Understanding Market Volatility</h2>
        <p>Market volatility refers to the rapid and significant price changes in securities. While many investors view volatility as a risk, experienced investors see it as an opportunity. The key is understanding how to navigate and benefit from market fluctuations.</p>

        <h2>The Psychology of Volatility</h2>
        <p>Most investors fear volatility because it creates uncertainty. However, volatility is a normal part of market cycles. Markets go up and down, and these movements create opportunities for disciplined investors.</p>

        <h2>Buying Opportunities in Corrections</h2>
        <p>Market corrections and bear markets often present excellent buying opportunities. When quality stocks or funds are available at discounted prices, it can be the best time to invest. SIP investors automatically benefit from this through rupee cost averaging.</p>

        <h2>The Importance of Asset Allocation</h2>
        <p>Proper asset allocation can help you weather volatility. By diversifying across different asset classes, you reduce the impact of volatility on your overall portfolio. This includes a mix of equity, debt, and gold investments.</p>

        <h2>Long-term Perspective</h2>
        <p>Volatility appears less threatening when viewed through a long-term lens. Over longer periods, markets tend to trend upward despite short-term fluctuations. Successful investors focus on their long-term goals rather than daily price movements.</p>

        <h2>Risk Management Strategies</h2>
        <p>Use volatility to your advantage by employing strategies like systematic investing, diversification, and periodic portfolio rebalancing. These strategies help you buy low and sell high over time.</p>

        <h2>Conclusion</h2>
        <p>Market volatility is not something to fear but to understand and embrace. With the right strategies and mindset, you can turn market fluctuations into opportunities for building wealth. Stay disciplined, stay invested, and let time work in your favor.</p>
      `
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
      image: "💰",
      content: `
        <h2>Understanding Capital Gains Tax</h2>
        <p>Mutual fund investments are subject to capital gains tax. The tax rate depends on the holding period and type of fund. Short-term capital gains (STCG) are taxed at your marginal tax rate, while long-term capital gains (LTCG) have concessional rates.</p>

        <h2>Indexation Benefits</h2>
        <p>For debt funds held for more than 3 years, you can claim indexation benefits. This adjusts the purchase price for inflation, reducing your taxable gains. Indexation can significantly lower your tax liability on debt fund investments.</p>

        <h2>ELSS Funds: Tax-Saving Investments</h2>
        <p>Equity Linked Savings Schemes (ELSS) offer tax deductions under Section 80C. You can claim up to ₹1.5 lakh deduction by investing in ELSS funds. These funds have a mandatory 3-year lock-in period.</p>

        <h2>Tax-Loss Harvesting</h2>
        <p>Tax-loss harvesting involves selling losing investments to offset gains from winning investments. This strategy can help reduce your overall tax liability. However, be careful of the wash-sale rule when repurchasing similar securities.</p>

        <h2>Choosing the Right Fund Type</h2>
        <p>Different fund types have different tax implications. Equity funds held for more than 1 year qualify for LTCG at 10%. Debt funds have different tax treatment. Choose funds based on your investment horizon and tax situation.</p>

        <h2>Systematic Withdrawal Plans</h2>
        <p>Use Systematic Withdrawal Plans (SWP) to manage your withdrawals and tax liability. By withdrawing fixed amounts regularly, you can better plan your tax obligations and potentially stay in lower tax brackets.</p>

        <h2>Conclusion</h2>
        <p>Tax efficiency is an important aspect of mutual fund investing. By understanding tax rules and using appropriate strategies, you can maximize your after-tax returns. Consult a tax advisor for personalized advice based on your specific situation.</p>
      `
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
      image: "🏖️",
      content: `
        <h2>The Importance of Early Retirement Planning</h2>
        <p>Retirement planning should start as early as possible. The power of compounding means that starting early can significantly increase your retirement corpus. Even small amounts invested regularly can grow substantially over time.</p>

        <h2>Calculate Your Retirement Needs</h2>
        <p>Start by estimating how much you'll need for retirement. Consider your desired lifestyle, inflation, life expectancy, and potential healthcare costs. A common rule is that you'll need 70-80% of your pre-retirement income.</p>

        <h2>Mutual Funds for Retirement</h2>
        <p>Mutual funds are excellent vehicles for retirement planning. They offer diversification, professional management, and the potential for higher returns than traditional savings options. Consider a mix of equity and debt funds based on your risk tolerance.</p>

        <h2>Retirement Corpus Calculation</h2>
        <p>Use retirement calculators to estimate how much you need to save. Factors include your current age, retirement age, expected returns, inflation rate, and monthly expenses. Regular reviews and adjustments are essential.</p>

        <h2>Systematic Investment Approach</h2>
        <p>Use SIPs to build your retirement corpus gradually. This approach reduces the impact of market volatility and ensures consistent investing. Increase your SIP amount as your income grows.</p>

        <h2>Retirement Fund Options</h2>
        <p>Consider retirement-specific funds like National Pension System (NPS) or mutual fund retirement plans. These often have tax benefits and are designed specifically for retirement planning.</p>

        <h2>Conclusion</h2>
        <p>Retirement planning is a marathon, not a sprint. Start early, invest consistently, and review your plan regularly. With proper planning and disciplined investing, you can achieve financial independence in retirement.</p>
      `
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
      image: "⚖️",
      content: `
        <h2>The Active vs Passive Debate</h2>
        <p>The debate between index funds and actively managed funds has been ongoing for decades. Both approaches have their merits and drawbacks. The choice depends on your investment goals, risk tolerance, and belief in market efficiency.</p>

        <h2>What are Index Funds?</h2>
        <p>Index funds are passive investments that track a market index like the Nifty 50 or Sensex. They aim to replicate the performance of the index rather than beat it. These funds have low expense ratios and are highly diversified.</p>

        <h2>Actively Managed Funds</h2>
        <p>Actively managed funds employ fund managers who research and select securities they believe will outperform the market. These funds charge higher fees for the expertise and research involved in stock selection.</p>

        <h2>Performance Comparison</h2>
        <p>Studies show that most actively managed funds fail to beat their benchmark indices over long periods. The higher fees and expenses often eat into returns. However, some skilled fund managers do outperform consistently.</p>

        <h2>Cost Advantage of Index Funds</h2>
        <p>Index funds have significantly lower expense ratios (0.1-0.5%) compared to actively managed funds (1-2%). This cost advantage can make a substantial difference in long-term returns due to compounding.</p>

        <h2>When to Choose Active Management</h2>
        <p>Active management might be suitable if you believe in skilled fund managers, want to invest in niche areas, or need more personalized investment strategies. Some investors prefer active management for peace of mind.</p>

        <h2>The Hybrid Approach</h2>
        <p>Many investors use a hybrid approach, combining index funds for core holdings with actively managed funds for specific strategies or sectors. This provides diversification and the potential for outperformance.</p>

        <h2>Conclusion</h2>
        <p>For most investors, index funds are the better choice due to lower costs and consistent performance. However, active management has its place for those who want professional stock selection. Choose based on your research and investment philosophy.</p>
      `
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
      image: "🏭",
      content: `
        <h2>Understanding Sector Investing</h2>
        <p>Sector investing involves focusing on specific industry sectors rather than the broader market. This approach can provide higher returns but also carries concentrated risks. Understanding both opportunities and risks is crucial.</p>

        <h2>Why Invest in Sectors?</h2>
        <p>Sectors can outperform the broader market during certain economic cycles. For example, technology stocks may do well during innovation booms, while defensive sectors like utilities perform better during economic downturns.</p>

        <h2>Identifying Promising Sectors</h2>
        <p>Look for sectors with strong growth potential, favorable government policies, and technological advancements. Consider demographic trends, environmental factors, and global economic conditions when selecting sectors.</p>

        <h2>Risks of Sector Investing</h2>
        <p>Sector investing is riskier than diversified investing. Poor performance in one sector can significantly impact your portfolio. Sectors can be volatile and may underperform for extended periods.</p>

        <h2>Diversification Within Sectors</h2>
        <p>Even within sectors, diversification is important. Don't put all your money in one or two stocks within a sector. Consider sector ETFs or mutual funds that provide broader exposure.</p>

        <h2>Timing Sector Investments</h2>
        <p>Timing sector investments is challenging. Many investors use a buy-and-hold approach or dollar-cost averaging. Avoid trying to time market cycles, as this is difficult even for professionals.</p>

        <h2>When to Avoid Sector Funds</h2>
        <p>Sector funds are not suitable for conservative investors or those with short investment horizons. They require a higher risk tolerance and long-term perspective.</p>

        <h2>Conclusion</h2>
        <p>Sector investing can enhance returns but requires careful research and risk management. Use sector investments as part of a diversified portfolio rather than your entire investment strategy. Consider your risk tolerance and investment goals before investing in sectors.</p>
      `
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.share?.({
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Blog post link has been copied to clipboard.",
      });
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked!",
      description: "This article has been added to your bookmarks.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <span>{post.readTime}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" onClick={handleBookmark}>
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Related Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map(relatedPost => (
                  <div key={relatedPost.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-foreground mb-2">
                      <Link to={`/blog/${relatedPost.id}`} className="hover:text-primary">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedPost.excerpt}</p>
                    <div className="text-xs text-muted-foreground">{relatedPost.readTime}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;