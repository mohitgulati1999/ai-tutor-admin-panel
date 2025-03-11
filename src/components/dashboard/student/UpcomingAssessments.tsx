
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const assessments = [
  {
    id: 1,
    title: 'Machine Learning Quiz',
    course: 'Machine Learning Fundamentals',
    dueDate: 'Tomorrow, 11:59 PM'
  },
  {
    id: 2,
    title: 'NLP Project Submission',
    course: 'Advanced NLP Techniques',
    dueDate: 'In 3 days'
  }
];

const AssessmentItem = ({ 
  assessment 
}: { 
  assessment: {
    id: number;
    title: string;
    course: string;
    dueDate: string;
  }
}) => (
  <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
      <Calendar className="h-5 w-5 text-primary" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{assessment.title}</p>
      <p className="text-xs text-muted-foreground">{assessment.course}</p>
    </div>
    <div className="text-xs font-medium text-red-400">{assessment.dueDate}</div>
  </div>
);

const UpcomingAssessments = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Assessments</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
          <Link to="/assessments">
            View All <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <AssessmentItem key={assessment.id} assessment={assessment} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingAssessments;
