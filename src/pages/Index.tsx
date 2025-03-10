
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import StatsSection from '@/components/dashboard/StatsSection';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const isAdmin = location.state?.userType !== 'student';

  return (
    <Layout>
      <PageHeader 
        title={isAdmin ? "Admin Dashboard" : "Student Dashboard"}
        subtitle={isAdmin 
          ? "Welcome to the AI Trainer admin dashboard" 
          : "Welcome to your AI Trainer learning platform"
        }
      />

      <StatsSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentActivity />
        <PerformanceOverview />
      </div>
    </Layout>
  );
};

export default Index;
