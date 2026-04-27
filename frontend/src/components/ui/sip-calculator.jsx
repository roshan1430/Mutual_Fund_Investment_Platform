import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { calculateSip } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState({
    totalInvestment: 0,
    estimatedReturns: 0,
    maturityValue: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const calculateSIP = async () => {
    setLoading(true);
    try {
      const response = await calculateSip({
        monthlyInvestment,
        expectedReturn,
        timePeriod
      });
      setResults({
        totalInvestment: response.totalInvestment,
        estimatedReturns: response.estimatedReturns,
        maturityValue: response.maturityValue
      });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to calculate SIP', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            SIP Calculator
          </CardTitle>
          <CardDescription>
            Calculate your Systematic Investment Plan returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthly-investment">Monthly Investment (₹)</Label>
                <Input
                  id="monthly-investment"
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  min="100"
                  max="100000"
                  step="100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
                <Input
                  id="expected-return"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-period">Time Period (Years)</Label>
                <Input
                  id="time-period"
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  min="1"
                  max="50"
                  step="1"
                />
              </div>

              <Button onClick={calculateSIP} className="w-full" disabled={loading}>
                {loading ? 'Calculating...' : 'Recalculate'}
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Investment Results</h3>
              
              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Investment</span>
                    </div>
                    <span className="font-bold text-lg">{formatCurrency(results.totalInvestment)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-success border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">Estimated Returns</span>
                    </div>
                    <span className="font-bold text-lg text-success">{formatCurrency(results.estimatedReturns)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-primary border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary-foreground" />
                      <span className="text-sm text-primary-foreground">Maturity Value</span>
                    </div>
                    <span className="font-bold text-xl text-primary-foreground">{formatCurrency(results.maturityValue)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Your investment of {formatCurrency(monthlyInvestment)}/month for {timePeriod} years 
                  at {expectedReturn}% annual return will grow to {formatCurrency(results.maturityValue)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPCalculator;









