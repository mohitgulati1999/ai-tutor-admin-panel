
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PerformanceOverview = () => {
  return (
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
  );
};

export default PerformanceOverview;
