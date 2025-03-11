
import StatsSection from '@/components/dashboard/StatsSection';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';

const AdminDashboard = () => {
  return (
    <>
      <StatsSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentActivity />
        <PerformanceOverview />
      </div>
    </>
  );
};

export default AdminDashboard;
