import Navigation from '@/components/ui/navigation';
import HeroSection from '@/components/ui/hero-section';
import FundDashboard from '@/components/ui/fund-dashboard';
import RoleFeatures from '@/components/ui/role-features';
import Footer from '@/components/ui/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FundDashboard />
      <RoleFeatures />
      <Footer />
    </div>
  );
};

export default Index;
