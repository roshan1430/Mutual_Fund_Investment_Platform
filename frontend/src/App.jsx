import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Funds from "./pages/Funds";
import Holdings from "./pages/Holdings";
import Watchlist from "./pages/Watchlist";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import FundDetails from "./pages/FundDetails";
import SIPCalculatorPage from "./pages/SIPCalculator";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import InvestmentPlans from "./pages/InvestmentPlans";
import LearningCenter from "./pages/LearningCenter";
import MarketResearch from "./pages/MarketResearch";
import InvestmentGuide from "./pages/InvestmentGuide";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import HelpCenter from "./pages/HelpCenter";
import AdminSignIn from "./pages/AdminSignIn";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import { useAuth } from "@/contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin-login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/funds" element={<ProtectedRoute><Funds /></ProtectedRoute>} />
            <Route path="/holdings" element={<ProtectedRoute><Holdings /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="/funds/:id" element={<ProtectedRoute><FundDetails /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/sip-calculator" element={<ProtectedRoute><SIPCalculatorPage /></ProtectedRoute>} />
            <Route path="/investment-plans" element={<InvestmentPlans />} />
            <Route path="/learning-center" element={<LearningCenter />} />
            <Route path="/market-research" element={<MarketResearch />} />
            <Route path="/investment-guide" element={<InvestmentGuide />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/admin-login" element={<AdminSignIn />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;









