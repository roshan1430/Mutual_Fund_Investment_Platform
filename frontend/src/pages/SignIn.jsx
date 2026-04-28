import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';
import authIllustration from '@/assets/auth-growth.svg';

const SignIn = () => {
  const [step, setStep] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useAuth();
  const { login, completeLogin, forgotPassword, confirmPasswordReset } = auth;
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [auth.isAuthenticated, auth.isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success && result.nextStep === 'VERIFY_LOGIN_OTP') {
      setStep('login-otp');
      toast({ title: 'OTP sent', description: result.message });
    } else if (result.success) {
      toast({ title: 'Welcome back!', description: 'Redirecting to dashboard...' });
      navigate('/dashboard');
    } else {
      toast({
        title: result.message?.toLowerCase().includes('verify') ? 'Verification needed' : 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  const handleLoginOtp = async (e) => {
    e.preventDefault();
    const result = await completeLogin(email, loginOtp);
    if (result.success) {
      toast({ title: 'Welcome back!', description: 'Redirecting to dashboard...' });
      navigate('/dashboard');
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: 'Error', description: 'Enter your registered email first', variant: 'destructive' });
      return;
    }

    const result = await forgotPassword(email);
    if (result.success && result.nextStep === 'RESET_PASSWORD') {
      setStep('reset-password');
      toast({ title: 'OTP sent', description: result.message });
    } else if (result.success) {
      toast({ title: 'Success', description: result.message });
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  const handleResendResetOtp = async () => {
    const result = await forgotPassword(email);
    if (result.success && result.nextStep === 'RESET_PASSWORD') {
      toast({ title: 'OTP resent', description: result.message });
      return;
    }

    toast({ title: 'Error', description: result.message, variant: 'destructive' });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    const result = await confirmPasswordReset(email, resetOtp, newPassword);
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      setStep('signin');
      setPassword('');
      setLoginOtp('');
      setResetOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_40px_90px_-35px_rgba(15,23,42,0.28)] backdrop-blur xl:grid-cols-[0.98fr_1.02fr]">
        <div className="flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md border-white/80 bg-white/82 shadow-none">
            <CardHeader className="text-center">
              <div className="mb-4 flex items-center justify-center space-x-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-[0_18px_35px_-18px_hsl(var(--primary)/0.8)]">
                  <span className="font-bold text-primary-foreground">MF</span>
                </div>
              </div>
              <CardTitle className="text-3xl tracking-tight">
                {step === 'signin' && 'Welcome Back'}
                {step === 'login-otp' && 'Enter Login OTP'}
                {step === 'reset-password' && 'Reset Password'}
              </CardTitle>
              <CardDescription className="text-base">
                {step === 'signin' && 'Sign in to your MutualFunds Pro account'}
                {step === 'login-otp' && `We sent a login OTP to ${email}`}
                {step === 'reset-password' && `Enter the reset OTP sent to ${email}`}
              </CardDescription>
              {step !== 'signin' && (
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900">
                  <KeyRound className="h-4 w-4" />
                  Secure verification in progress
                </div>
              )}
            </CardHeader>
            <CardContent>
              {step === 'signin' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-[0_20px_38px_-20px_hsl(var(--primary)/0.85)] hover:opacity-95">
                    Continue
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={handleForgotPassword}>
                    Forgot Password?
                  </Button>
                </form>
              )}

              {step === 'login-otp' && (
                <form onSubmit={handleLoginOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginOtp">Login OTP</Label>
                    <Input id="loginOtp" value={loginOtp} onChange={(e) => setLoginOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} required />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-[0_20px_38px_-20px_hsl(var(--primary)/0.85)] hover:opacity-95">
                    Verify and Sign In
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setStep('signin')}>
                    Back
                  </Button>
                </form>
              )}

              {step === 'reset-password' && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetOtp">Reset OTP</Label>
                    <Input id="resetOtp" value={resetOtp} onChange={(e) => setResetOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-[0_20px_38px_-20px_hsl(var(--primary)/0.85)] hover:opacity-95">
                    Reset Password
                  </Button>
                  <Button type="button" variant="secondary" className="w-full" onClick={handleResendResetOtp}>
                    Resend Reset OTP
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setStep('signin')}>
                    Back to Sign In
                  </Button>
                </form>
              )}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="hidden bg-[linear-gradient(180deg,hsl(212_68%_15%),hsl(197_72%_24%),hsl(166_74%_32%))] p-8 text-white xl:flex xl:flex-col">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Investor access portal
          </div>
          <div className="mt-8">
            <h2 className="text-4xl font-bold leading-tight">Your dashboard, funds, and insights are one sign-in away.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              We refined the sign-in flow to feel more polished while keeping security steps clear and easy to follow.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
            <img
              src={authIllustration}
              alt="Illustration of secure sign-in and investment growth"
              className="w-full rounded-[1.3rem] object-cover"
            />
          </div>
          <div className="mt-8 grid gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span>Email verification and password recovery stay visible and guided</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-sky-300" />
              <span>Cleaner hierarchy for account actions, OTP entry, and recovery states</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
