
import { BookOpen, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnrolledCourses from './student/EnrolledCourses';
import CourseProgress from './student/CourseProgress';
import UpcomingAssessments from './student/UpcomingAssessments';

const StudentDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StudentStatCard 
          title="Enrolled Courses" 
          value={3} 
          icon={<BookOpen className="h-5 w-5 text-primary" />} 
          path="/courses"
        />
        <StudentStatCard 
          title="Completed Courses" 
          value={1} 
          icon={<Award className="h-5 w-5 text-primary" />} 
          path="/courses"
        />
        <StudentStatCard 
          title="Upcoming Assessments" 
          value={2} 
          icon={<Clock className="h-5 w-5 text-primary" />} 
          path="/assessments"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EnrolledCourses />
        <div className="flex flex-col gap-8">
          <CourseProgress />
          <UpcomingAssessments />
        </div>
      </div>
    </>
  );
};

interface StudentStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  path: string;
}

const StudentStatCard = ({ title, value, icon, path }: StudentStatCardProps) => {
  return (
    <Link to={path} className="block">
      <div className="glass-card p-6 flex flex-col space-y-4 transition-all duration-300 hover:translate-y-[-5px]">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="p-2 rounded-full bg-primary/10">
            {icon}
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
    </Link>
  );
};

export default StudentDashboard;
