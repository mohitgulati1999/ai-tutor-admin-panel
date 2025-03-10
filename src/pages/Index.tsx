
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import StatsSection from '@/components/dashboard/StatsSection';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';

const Index = () => {
  return (
    <Layout>
      <PageHeader 
        title="Dashboard"
        subtitle="Welcome to the AI Trainer admin dashboard"
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
