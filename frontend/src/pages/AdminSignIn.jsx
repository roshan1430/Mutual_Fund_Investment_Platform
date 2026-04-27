import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-primary">
            {step === 'signin' && 'Admin Portal'}
            {step === 'login-otp' && 'Admin Verification'}
            {step === 'reset-password' && 'Reset Admin Password'}
          </CardTitle>
          <CardDescription>
            {step === 'signin' && 'Secure access for platform administrators'}
            {step === 'login-otp' && `We sent a secure OTP to ${email}`}
            {step === 'reset-password' && `Enter the reset OTP sent to ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'signin' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Administrator Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
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
                <Input id="loginOtp" value={loginOtp} onChange={e => setLoginOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} required />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
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
                <Input id="resetOtp" value={resetOtp} onChange={e => setResetOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
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
          <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
            <p>
              Need an admin account?{' '}
              <Link to="/admin-register" className="text-primary hover:underline font-medium">Register as Admin</Link>
            </p>
            <p>
              Not an administrator?{' '}
              <Link to="/signin" className="text-primary hover:underline font-medium">Investor Sign In</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignIn;
