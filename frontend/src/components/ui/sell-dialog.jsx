import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sellHolding } from '@/lib/api';

const SellDialog = ({ holding, onSellSuccess }) => {
  const [open, setOpen] = useState(false);
  const [sellQuantity, setSellQuantity] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currentPrice = parseFloat(holding.currentPrice || 0);
  const maxUnits = parseFloat(holding.units || 0);

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setSellQuantity(qty);
    if (qty && !isNaN(qty)) {
      setSellAmount((parseFloat(qty) * currentPrice).toFixed(2));
    } else {
      setSellAmount('');
    }
  };

  const handleAmountChange = (e) => {
    const amt = e.target.value;
    setSellAmount(amt);
    if (amt && !isNaN(amt)) {
      setSellQuantity((parseFloat(amt) / currentPrice).toFixed(4));
    } else {
      setSellQuantity('');
    }
  };

  const calculateGainLoss = () => {
    if (!sellQuantity) return { gain: 0, percentage: 0 };
    const qty = parseFloat(sellQuantity);
    const sellVal = qty * currentPrice;
    const costPrice = parseFloat(holding.averageBuyPrice || 0);
    const costValue = qty * costPrice;
    const gain = sellVal - costValue;
    const percentage = costValue > 0 ? (gain / costValue * 100).toFixed(2) : 0;
    return { gain: gain.toFixed(2), percentage };
  };

  const handleSell = async () => {
    if (!sellQuantity || parseFloat(sellQuantity) <= 0) {
      toast({ title: 'Error', description: 'Please enter a valid quantity', variant: 'destructive' });
      return;
    }

    if (parseFloat(sellQuantity) > maxUnits) {
      toast({ title: 'Error', description: `Cannot sell more than ${maxUnits.toFixed(2)} units`, variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const qty = parseFloat(sellQuantity);
      
      // Call the API to sell
      const response = await sellHolding(holding.userId, holding.fundId, qty, currentPrice);

      toast({
        title: 'Success',
        description: `Sold ${qty.toFixed(2)} units of ${response.fundName}. Gain/Loss: ₹${response.gainLoss.toFixed(2)}`,
        variant: 'default'
      });

      setSellQuantity('');
      setSellAmount('');
      setOpen(false);

      if (onSellSuccess) {
        onSellSuccess();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sell units',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const { gain, percentage } = calculateGainLoss();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors">
          Sell
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-foreground shadow-xl">
        <DialogHeader>
          <DialogTitle>Sell {holding.fundName}</DialogTitle>
          <DialogDescription>
            Current Price: ₹{currentPrice.toFixed(2)} | Available: {maxUnits.toFixed(2)} units
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base font-semibold text-foreground">Quantity to Sell</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter units"
              value={sellQuantity}
              onChange={handleQuantityChange}
              disabled={loading}
              min="0"
              max={maxUnits}
              step="0.0001"
              className="w-full px-4 py-3 text-lg border-2 border-gray-400 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-muted-foreground">Max available: {maxUnits.toFixed(2)} units</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-base font-semibold text-foreground">Sale Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={sellAmount}
              onChange={handleAmountChange}
              disabled={loading}
              min="0"
              step="100"
              className="w-full px-4 py-3 text-lg border-2 border-gray-400 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-muted-foreground">Current Price: ₹{currentPrice.toFixed(2)}/unit</p>
          </div>

          {sellQuantity && (
            <div className="space-y-2 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">Sale Value:</span>
                <span className="font-bold text-lg text-blue-600">₹{(parseFloat(sellQuantity) * currentPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">Cost Price:</span>
                <span className="font-bold text-foreground">₹{(parseFloat(sellQuantity) * parseFloat(holding.averageBuyPrice || 0)).toFixed(2)}</span>
              </div>
              <div className={`flex justify-between text-sm p-3 rounded-lg ${parseFloat(gain) >= 0 ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
                <span className="font-semibold">Gain/Loss:</span>
                <span className={`font-bold text-lg ${parseFloat(gain) >= 0 ? 'text-green-700' : 'text-red-700'}`}>₹{gain} ({percentage}%)</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading} className="font-semibold hover:bg-gray-100">
            Cancel
          </Button>
          <Button onClick={handleSell} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors">
            {loading ? 'Processing...' : 'Confirm Sale'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
