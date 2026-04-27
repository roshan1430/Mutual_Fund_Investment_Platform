import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addHolding } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const InvestDialog = ({ fund, onInvestSuccess }) => {
  const [open, setOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleInvest = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      toast({ title: 'Error', description: 'Please enter a valid amount', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // Parse NAV from fund (e.g., "₹156.78" -> 156.78, or "156.78" -> 156.78)
      const navString = fund.nav.toString();
      const navValue = parseFloat(navString.replace(/[^0-9.]/g, ''));
      
      if (isNaN(navValue) || navValue <= 0) {
        throw new Error('Invalid NAV value');
      }
      
      const investAmount = parseFloat(investmentAmount);
      const units = investAmount / navValue;

      if (!user?.id) {
        throw new Error('Please sign in to invest');
      }

      const newHolding = {
        userId: user.id,
        fundId: fund.id,
        fundName: fund.name,
        units: units.toFixed(4),
        averageBuyPrice: navValue.toFixed(2),
        currentPrice: navValue.toFixed(2),
      };

      await addHolding(newHolding);
      
      toast({ 
        title: 'Success', 
        description: `Invested ₹${investAmount.toFixed(2)} in ${fund.name}. Units: ${units.toFixed(2)}`,
        variant: 'success'
      });
      
      setInvestmentAmount('');
      setOpen(false);
      
      // Callback to refresh holdings
      if (onInvestSuccess) {
        onInvestSuccess();
      }
    } catch (error) {
      console.error('Investment error:', error);
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to complete investment',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Invest Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-foreground shadow-xl">
        <DialogHeader>
          <DialogTitle>Invest in {fund.name}</DialogTitle>
          <DialogDescription>
            Current NAV: {fund.nav} | Risk: {fund.risk}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-base font-semibold text-foreground">Investment Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              disabled={loading}
              min="0"
              step="100"
              className="w-full px-4 py-3 text-lg border-2 border-gray-400 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-muted-foreground">
              Minimum Investment: {fund.minInvestment}
            </p>
            {investmentAmount && (
              <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-400">
                <p className="text-sm font-semibold text-foreground">
                  Estimated Units: <span className="text-lg font-bold text-green-700">{(parseFloat(investmentAmount) / parseFloat(fund.nav.replace(/[^0-9.]/g, ''))).toFixed(2)}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading} className="font-semibold hover:bg-gray-100">
            Cancel
          </Button>
          <Button onClick={handleInvest} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors">
            {loading ? 'Processing...' : 'Confirm Investment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestDialog;
