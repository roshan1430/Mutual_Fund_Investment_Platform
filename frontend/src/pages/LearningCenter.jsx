import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Award } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const LearningCenter = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: "Introduction to Mutual Funds",
      description: "Learn the basics of mutual funds, how they work, and why they're a great investment option.",
      category: "beginner",
      level: "Beginner",
      duration: "2 hours",
      icon: <BookOpen className="h-6 w-6" />,
      lessons: 5,
      color: "bg-blue-500/10"
    },
    {
      id: 2,
      title: "SIP vs Lump Sum Investment",
      description: "Understand the differences between SIP and lump sum investments and choose what's best for you.",
      category: "beginner",
      level: "Beginner",
      duration: "45 minutes",
      icon: <Video className="h-6 w-6" />,
      lessons: 3,
      color: "bg-green-500/10"
    },
    {
      id: 3,
      title: "Understanding NAV and Fund Types",
      description: "Deep dive into NAV (Net Asset Value), different fund categories, and how to evaluate them.",
      category: "intermediate",
      level: "Intermediate",
      duration: "3 hours",
      icon: <FileText className="h-6 w-6" />,
      lessons: 8,
      color: "bg-purple-500/10"
    },
    {
      id: 4,
      title: "Portfolio Diversification Strategies",
      description: "Master the art of building a diversified portfolio to minimize risk and maximize returns.",
      category: "intermediate",
      level: "Intermediate",
      duration: "2.5 hours",
      icon: <BookOpen className="h-6 w-6" />,
      lessons: 6,
      color: "bg-orange-500/10"
    },
    {
      id: 5,
      title: "Tax-Efficient Investing",
      description: "Learn about tax-advantaged investment strategies and how to minimize tax liability.",
      category: "advanced",
      level: "Advanced",
      duration: "2 hours",
      icon: <Award className="h-6 w-6" />,
      lessons: 5,
      color: "bg-red-500/10"
    },
    {
      id: 6,
      title: "Market Analysis & Research",
      description: "Develop skills to analyze market trends, read reports, and make informed investment decisions.",
      category: "advanced",
      level: "Advanced",
      duration: "3 hours",
      icon: <Video className="h-6 w-6" />,
      lessons: 7,
      color: "bg-indigo-500/10"
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const handleStartCourse = (courseName) => {
    toast({
      title: 'Course Starting',
      description: `Welcome to "${courseName}". Let's start learning!`,
      variant: 'default'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learning Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of investing with our comprehensive courses and resources
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <Button 
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            All Courses
          </Button>
          <Button 
            variant={selectedCategory === 'beginner' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('beginner')}
          >
            Beginner
          </Button>
          <Button 
            variant={selectedCategory === 'intermediate' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('intermediate')}
          >
            Intermediate
          </Button>
          <Button 
            variant={selectedCategory === 'advanced' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('advanced')}
          >
            Advanced
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className={`${course.color} pb-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-white rounded-lg text-foreground">
                    {course.icon}
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>📚 {course.lessons} lessons</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <Button 
                  className="w-full bg-gradient-primary text-primary-foreground"
                  onClick={() => handleStartCourse(course.title)}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Additional Resources</CardTitle>
            <CardDescription>Download guides, templates, and reference materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2 text-foreground">📄 Mutual Fund Basics Guide</h3>
                <p className="text-muted-foreground text-sm mb-3">Comprehensive PDF guide covering everything about mutual funds</p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2 text-foreground">📊 Investment Portfolio Template</h3>
                <p className="text-muted-foreground text-sm mb-3">Excel template to track and manage your portfolio</p>
                <Button variant="outline" size="sm">Download Sheet</Button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2 text-foreground">📋 Asset Allocation Worksheet</h3>
                <p className="text-muted-foreground text-sm mb-3">Interactive worksheet to find your ideal asset allocation</p>
                <Button variant="outline" size="sm">Access Tool</Button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-lg mb-2 text-foreground">🎓 Financial Glossary</h3>
                <p className="text-muted-foreground text-sm mb-3">Complete A-Z glossary of investing and finance terms</p>
                <Button variant="outline" size="sm">View Glossary</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Webinars Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Webinars</CardTitle>
            <CardDescription>Join our expert advisors for live sessions and Q&A</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Market Insights: Q2 2026 Outlook</h3>
                  <p className="text-sm text-muted-foreground mt-1">April 15, 2026 at 3:00 PM IST</p>
                  <p className="text-sm text-muted-foreground">Featuring: Senior Market Analyst</p>
                </div>
                <Button className="bg-gradient-primary text-primary-foreground">Register</Button>
              </div>
              <div className="p-4 border rounded-lg flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Tax Planning Strategies 2026</h3>
                  <p className="text-sm text-muted-foreground mt-1">April 22, 2026 at 4:00 PM IST</p>
                  <p className="text-sm text-muted-foreground">Featuring: Certified Tax Advisor</p>
                </div>
                <Button className="bg-gradient-primary text-primary-foreground">Register</Button>
              </div>
              <div className="p-4 border rounded-lg flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Building Your Long-Term Portfolio</h3>
                  <p className="text-sm text-muted-foreground mt-1">April 29, 2026 at 2:00 PM IST</p>
                  <p className="text-sm text-muted-foreground">Featuring: Portfolio Manager</p>
                </div>
                <Button className="bg-gradient-primary text-primary-foreground">Register</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LearningCenter;
