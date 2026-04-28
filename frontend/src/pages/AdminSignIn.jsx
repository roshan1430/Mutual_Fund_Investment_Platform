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

const AdminSignIn = () => {
  const [step, setStep] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useAuth();
  const { login, completeLogin, forgotPassword, confirmPasswordReset, logout } = auth;
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (auth.isAuthenticated && auth.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [auth.isAuthenticated, auth.isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success && result.nextStep === 'VERIFY_LOGIN_OTP') {
      setStep('login-otp');
      toast({ title: 'OTP sent', description: result.message });
    } else if (result.success) {
      if (result.user?.role !== 'ADMIN') {
        logout();
        toast({ title: 'Unauthorized', description: 'This portal is for administrators only.', variant: 'destructive' });
        return;
      }
      toast({ title: 'Welcome Admin!', description: 'Redirecting to admin dashboard...' });
      navigate('/admin/dashboard');
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
      if (result.user?.role !== 'ADMIN') {
        logout();
        toast({ title: 'Unauthorized', description: 'This portal is for administrators only.', variant: 'destructive' });
        return;
      }
      toast({ title: 'Welcome Admin!', description: 'Redirecting to admin dashboard...' });
      navigate('/admin/dashboard');
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
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_40px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur xl:grid-cols-[1.02fr_0.98fr]">
        <div className="hidden bg-[linear-gradient(180deg,hsl(216_78%_14%),hsl(203_72%_22%),hsl(169_75%_27%))] p-8 text-white xl:flex xl:flex-col">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Secure control access
          </div>
          <div className="mt-8">
            <h2 className="text-4xl font-bold leading-tight">Admin access built for visibility, control, and safer actions.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Sign into the command center to review verification health, monitor platform users, and keep operations moving smoothly.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
            <img
              src={authIllustration}
              alt="Illustration showing secure admin access and platform oversight"
              className="w-full rounded-[1.3rem] object-cover"
            />
          </div>
          <div className="mt-8 grid gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <span>OTP-backed entry flow for administrator accounts</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-sky-300" />
              <span>Fast access to user health, role insights, and management tools</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md border-white/80 bg-white/84 shadow-none">
            <CardHeader className="text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,hsl(213_76%_24%),hsl(175_72%_34%))] shadow-[0_18px_35px_-18px_rgba(14,116,144,0.9)]">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl tracking-tight text-slate-900">
                {step === 'signin' && 'Admin Portal'}
                {step === 'login-otp' && 'Admin Verification'}
                {step === 'reset-password' && 'Reset Admin Password'}
              </CardTitle>
              <CardDescription className="text-base">
                {step === 'signin' && 'Secure access for platform administrators'}
                {step === 'login-otp' && `We sent a secure OTP to ${email}`}
                {step === 'reset-password' && `Enter the reset OTP sent to ${email}`}
              </CardDescription>
              {step !== 'signin' && (
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900">
                  <KeyRound className="h-4 w-4" />
                  Verification required before control access
                </div>
              )}
            </CardHeader>
            <CardContent>
              {step === 'signin' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Administrator Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full bg-[linear-gradient(135deg,hsl(213_76%_24%),hsl(175_72%_34%))] text-white shadow-[0_20px_38px_-20px_rgba(14,116,144,0.85)] hover:opacity-95">
                    Sign In as Admin
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={handleForgotPassword}>
                    Forgot Password?
                  </Button>
                </form>
              )}

              {step === 'login-otp' && (
                <form onSubmit={handleLoginOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginOtp">Verification Code</Label>
                    <Input id="loginOtp" value={loginOtp} onChange={(e) => setLoginOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} required />
                  </div>
                  <Button type="submit" className="w-full bg-[linear-gradient(135deg,hsl(213_76%_24%),hsl(175_72%_34%))] text-white shadow-[0_20px_38px_-20px_rgba(14,116,144,0.85)] hover:opacity-95">
                    Verify and Access
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
                  <Button type="submit" className="w-full bg-[linear-gradient(135deg,hsl(213_76%_24%),hsl(175_72%_34%))] text-white shadow-[0_20px_38px_-20px_rgba(14,116,144,0.85)] hover:opacity-95">
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
              <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
                <p>
                  Need an admin account?{' '}
                  <Link to="/admin-register" className="font-medium text-primary hover:underline">
                    Register as Admin
                  </Link>
                </p>
                <p>
                  Not an administrator?{' '}
                  <Link to="/signin" className="font-medium text-primary hover:underline">
                    Investor Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
