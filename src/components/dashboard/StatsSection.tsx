
import { BookOpen, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';

const statsData = [
  {
    title: 'Total Courses',
    value: 12,
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    trend: 8,
    path: '/courses'
  },
  {
    title: 'Total Assessments',
    value: 36,
    icon: <FileText className="h-5 w-5 text-primary" />,
    trend: 12,
    path: '/assessments'
  },
  {
    title: 'Total Candidates',
    value: 248,
    icon: <Users className="h-5 w-5 text-primary" />,
    trend: 24,
    path: '/candidates'
  },
];

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {statsData.map((stat, index) => (
        <Link to={stat.path} key={index} className="block">
          <DashboardCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        </Link>
      ))}
    </div>
  );
};

export default StatsSection;
