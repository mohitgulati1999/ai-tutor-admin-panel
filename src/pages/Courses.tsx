
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import CourseForm from '@/components/CourseForm';

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Machine Learning Basics 1',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023'
  },
  {
    id: '2',
    title: 'Machine Learning Basics 2',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023'
  },
  {
    id: '3',
    title: 'Machine Learning Basics 3',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023'
  },
  {
    id: '4',
    title: 'Machine Learning Basics 4',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023'
  },
  {
    id: '5',
    title: 'Machine Learning Basics 5',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023'
  },
  {
    id: '6',
    title: 'Machine Learning Basics 6',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023'
  }
];

const Courses = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setIsCreating(false);
  };

  return (
    <Layout>
      <PageHeader 
        title={isCreating ? (editingCourse ? "Edit Course" : "Create Course") : "Courses"}
        subtitle={isCreating ? (editingCourse ? "Modify an existing course" : "Add a new course to the AI Trainer") : "Manage your AI Trainer courses"}
        action={
          !isCreating && (
            <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          )
        }
      />

      {isCreating ? (
        <div className="space-y-6">
          <CourseForm />
          <div className="flex justify-start">
            <Button 
              variant="outline" 
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <div key={course.id} className="glass-card p-6 flex flex-col hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {course.description}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topics:</span>
                    <span className="font-medium">{course.topics}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assessments:</span>
                    <span className="font-medium">{course.assessments}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">{course.createdAt}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Courses;
