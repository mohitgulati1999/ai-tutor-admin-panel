
import { BookOpen, FileText, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import DashboardCard from '@/components/DashboardCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const stats = [
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

  return (
    <Layout>
      <PageHeader 
        title="Dashboard"
        subtitle="Welcome to the AI Trainer admin dashboard"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New assessment created</p>
                <p className="text-xs text-muted-foreground">Machine Learning Fundamentals</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
            
            <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Course updated</p>
                <p className="text-xs text-muted-foreground">Advanced NLP Techniques</p>
              </div>
              <span className="text-xs text-muted-foreground">6h ago</span>
            </div>
            
            <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New candidate enrolled</p>
                <p className="text-xs text-muted-foreground">John Smith completed Neural Networks assessment</p>
              </div>
              <span className="text-xs text-muted-foreground">1d ago</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Performance Overview</h2>
          </div>
          
          <div className="h-[240px] flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Assessment Performance</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                View detailed statistics about your assessments and candidate performance.
              </p>
              <Button size="sm" asChild>
                <Link to="/candidates">View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
