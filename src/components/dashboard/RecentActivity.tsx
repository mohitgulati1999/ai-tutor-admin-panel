
import { FileText, BookOpen, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const activities = [
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: 'New assessment created',
    description: 'Machine Learning Fundamentals',
    timeAgo: '2h ago'
  },
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: 'Course updated',
    description: 'Advanced NLP Techniques',
    timeAgo: '6h ago'
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: 'New candidate enrolled',
    description: 'John Smith completed Neural Networks assessment',
    timeAgo: '1d ago'
  }
];

const ActivityItem = ({ icon, title, description, timeAgo }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  timeAgo: string;
}) => (
  <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <span className="text-xs text-muted-foreground">{timeAgo}</span>
  </div>
);

const RecentActivity = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          View All <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
