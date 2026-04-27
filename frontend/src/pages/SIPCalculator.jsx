import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import SIPCalculator from '@/components/ui/sip-calculator';

const SIPCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">SIP Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Plan your systematic investment journey and see how your money can grow over time
          </p>
        </div>
        <SIPCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default SIPCalculatorPage;









