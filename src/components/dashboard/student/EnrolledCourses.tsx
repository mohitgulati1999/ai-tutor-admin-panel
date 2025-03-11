
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Machine Learning Fundamentals',
    progress: 75,
    instructor: 'Dr. Sarah Johnson',
    lastAccessed: '2 days ago'
  },
  {
    id: 2,
    title: 'Advanced NLP Techniques',
    progress: 30,
    instructor: 'Prof. Michael Chen',
    lastAccessed: '5 days ago'
  },
  {
    id: 3,
    title: 'Deep Learning with Neural Networks',
    progress: 10,
    instructor: 'Dr. Emily Rodriguez',
    lastAccessed: 'Today'
  }
];

const CourseItem = ({ 
  course 
}: { 
  course: {
    id: number;
    title: string;
    progress: number;
    instructor: string;
    lastAccessed: string;
  }
}) => (
  <div className="flex flex-col p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{course.title}</h3>
          <p className="text-xs text-muted-foreground">{course.instructor}</p>
        </div>
      </div>
      <Link to={`/courses/${course.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
    
    <div className="mt-2">
      <div className="flex justify-between text-xs mb-1">
        <span>Progress</span>
        <span className="font-medium">{course.progress}%</span>
      </div>
      <div className="w-full bg-primary/10 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
    </div>
    
    <div className="mt-3 text-xs text-muted-foreground">
      Last accessed: {course.lastAccessed}
    </div>
  </div>
);

const EnrolledCourses = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Enrolled Courses</h2>
        <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
          <Link to="/courses">
            View All <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
