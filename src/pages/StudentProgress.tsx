
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Award, BookOpen, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const StudentProgress = () => {
  return (
    <Layout>
      <PageHeader 
        title="My Progress" 
        subtitle="Track your learning journey and achievements"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProgressCard 
          title="Overall Completion" 
          percentage={65}
          icon={<Award className="h-5 w-5 text-primary" />}
        />
        <ProgressCard 
          title="Courses Completed" 
          value="2/5"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        />
        <ProgressCard 
          title="Assessments Passed" 
          value="8/12"
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Course Progress</h2>
        
        <div className="space-y-6">
          <CourseProgressItem 
            title="Machine Learning Fundamentals" 
            progress={75} 
            completedModules={3} 
            totalModules={4} 
          />
          <CourseProgressItem 
            title="Advanced NLP Techniques" 
            progress={30} 
            completedModules={2} 
            totalModules={6} 
          />
          <CourseProgressItem 
            title="Deep Learning with Neural Networks" 
            progress={10} 
            completedModules={1} 
            totalModules={8} 
          />
          <CourseProgressItem 
            title="Introduction to Computer Vision" 
            progress={100} 
            completedModules={5} 
            totalModules={5} 
            completed
          />
          <CourseProgressItem 
            title="Python for Data Science" 
            progress={100} 
            completedModules={7} 
            totalModules={7} 
            completed
          />
        </div>
      </div>
    </Layout>
  );
};

interface ProgressCardProps {
  title: string;
  percentage?: number;
  value?: string;
  icon: React.ReactNode;
}

const ProgressCard = ({ title, percentage, value, icon }: ProgressCardProps) => {
  return (
    <div className="glass-card p-6 flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        {percentage !== undefined ? (
          <>
            <span className="text-2xl font-bold">{percentage}%</span>
            <Progress value={percentage} className="h-2" />
          </>
        ) : (
          <span className="text-2xl font-bold">{value}</span>
        )}
      </div>
    </div>
  );
};

interface CourseProgressItemProps {
  title: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  completed?: boolean;
}

const CourseProgressItem = ({ 
  title, 
  progress, 
  completedModules, 
  totalModules,
  completed = false
}: CourseProgressItemProps) => {
  return (
    <div className="p-4 bg-secondary/30 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium flex items-center gap-2">
          {title}
          {completed && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Completed
            </span>
          )}
        </h3>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      
      <Progress value={progress} className="h-2 mb-2" />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{completedModules}/{totalModules} modules completed</span>
        <span>Last updated: Yesterday</span>
      </div>
    </div>
  );
};

export default StudentProgress;
