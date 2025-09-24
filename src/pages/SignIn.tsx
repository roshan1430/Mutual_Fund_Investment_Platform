import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your MutualFunds Pro account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  // Simple demo login - in real app, validate credentials
                  alert('Login successful! Redirecting to dashboard...');
                  setTimeout(() => window.location.href = '/dashboard', 1000);
                }}
              >
                Sign In
              </Button>
            </div>

            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>

            <Separator />

            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Google OAuth integration would be implemented here')}
              >
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('LinkedIn OAuth integration would be implemented here')}
              >
                Continue with LinkedIn
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;