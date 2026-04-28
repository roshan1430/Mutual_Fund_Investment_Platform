import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, MailCheck, ShieldCheck, Sparkles } from 'lucide-react';
import authIllustration from '@/assets/auth-growth.svg';

const Register = () => {
  const [step, setStep] = useState('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const { register, confirmEmail, resendCode } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    const result = await register(name, email, password);
    if (result.success) {
      setPendingEmail(result.email || email);
      setStep('verify');
      toast({ title: 'Check your email', description: result.message });
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const result = await confirmEmail(pendingEmail, verificationCode);
    if (result.success) {
      toast({ title: 'Success', description: 'Email verified. Please sign in.' });
      navigate('/signin');
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  const handleResend = async () => {
    const result = await resendCode(pendingEmail);
    if (result.success) {
      toast({ title: 'Code resent', description: result.message });
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/35 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_40px_90px_-35px_rgba(15,23,42,0.28)] backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-[linear-gradient(180deg,hsl(211_70%_15%),hsl(192_70%_24%),hsl(26_90%_56%))] p-8 text-white xl:flex xl:flex-col">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            New investor onboarding
          </div>
          <div className="mt-8">
            <h2 className="text-4xl font-bold leading-tight">Start with a cleaner, more guided first step.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Create your account, verify your email, and move into your investment dashboard with a calmer, more trustworthy experience.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
            <img
              src={authIllustration}
              alt="Illustration showing portfolio growth and secure onboarding"
              className="w-full rounded-[1.3rem] object-cover"
            />
          </div>
          <div className="mt-8 grid gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span>Secure account setup with email verification</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-sky-300" />
              <span>Guided access to dashboards, funds, and SIP planning</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md border-white/80 bg-white/82 shadow-none">
            <CardHeader className="text-center">
              <div className="mb-4 flex items-center justify-center space-x-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-[0_18px_35px_-18px_hsl(var(--primary)/0.8)]">
                  <span className="font-bold text-primary-foreground">MF</span>
                </div>
              </div>
              <CardTitle className="text-3xl tracking-tight">{step === 'register' ? 'Create Account' : 'Verify Email'}</CardTitle>
              <CardDescription className="text-base">
                {step === 'register' ? 'Join MutualFunds Pro to start investing' : `Enter the 6-digit code sent to ${pendingEmail}`}
              </CardDescription>
              {step === 'verify' && (
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900">
                  <MailCheck className="h-4 w-4" />
                  Your account is almost ready
                </div>
              )}
            </CardHeader>
            <CardContent>
              {step === 'register' ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-[0_20px_38px_-20px_hsl(var(--primary)/0.85)] hover:opacity-95">
                    Create Account
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground shadow-[0_20px_38px_-20px_hsl(var(--primary)/0.85)] hover:opacity-95">
                    Verify Email
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={handleResend}>
                    Resend Code
                  </Button>
                </form>
              )}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
