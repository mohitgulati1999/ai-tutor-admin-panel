
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Play, UserPlus } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import CourseForm from '@/components/CourseForm';
import CourseRegistrationDialog from '@/components/student/CourseRegistrationDialog';
import { useToast } from "@/hooks/use-toast";

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Machine Learning Basics 1',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023',
    isRegistered: false
  },
  {
    id: '2',
    title: 'Machine Learning Basics 2',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023',
    isRegistered: true
  },
  {
    id: '3',
    title: 'Machine Learning Basics 3',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023',
    isRegistered: false
  },
  {
    id: '4',
    title: 'Machine Learning Basics 4',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023',
    isRegistered: false
  },
  {
    id: '5',
    title: 'Machine Learning Basics 5',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023',
    isRegistered: false
  },
  {
    id: '6',
    title: 'Machine Learning Basics 6',
    description: 'Introduction to the fundamentals of machine learning algorithms and techniques.',
    topics: 8,
    assessments: 3,
    createdAt: 'Oct 15, 2023',
    isRegistered: false
  }
];

const Courses = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [userType, setUserType] = useState<'admin' | 'student'>('admin');
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courses, setCourses] = useState(mockCourses);
  const { toast } = useToast();

  // Check user type from localStorage
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as 'admin' | 'student' | null;
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setIsCreating(false);
  };

  const handleRegisterClick = (course: any) => {
    setSelectedCourse(course);
    setRegistrationDialogOpen(true);
  };

  const handleStartCourse = (course: any) => {
    toast({
      title: "Course Started",
      description: `You've started ${course.title}`,
    });
    // In a real app, navigate to the course content page
  };

  // In a real app, this would update the registered status in the database
  const updateCourseStatus = (courseId: string, isRegistered: boolean) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, isRegistered } : course
    ));
  };

  return (
    <Layout>
      <PageHeader 
        title={isCreating ? (editingCourse ? "Edit Course" : "Create Course") : userType === 'admin' ? "Courses" : "My Courses"}
        subtitle={isCreating 
          ? (editingCourse ? "Modify an existing course" : "Add a new course to the AI Trainer") 
          : userType === 'admin' 
            ? "Manage your AI Trainer courses" 
            : "Browse and register for available courses"
        }
        action={
          !isCreating && userType === 'admin' && (
            <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          )
        }
      />

      {isCreating && userType === 'admin' ? (
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
            {courses.map((course) => (
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
                  {userType === 'admin' ? (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditCourse(course)}
                    >
                      Edit Course
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      {course.isRegistered ? (
                        <Button 
                          variant="default" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleStartCourse(course)}
                        >
                          <Play className="h-3 w-3" />
                          Start Course
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleRegisterClick(course)}
                        >
                          <UserPlus className="h-3 w-3" />
                          Register
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCourse && (
        <CourseRegistrationDialog 
          open={registrationDialogOpen} 
          onOpenChange={(open) => {
            setRegistrationDialogOpen(open);
            if (!open) {
              // When dialog closes after successful registration, update the course status
              updateCourseStatus(selectedCourse.id, true);
            }
          }}
          course={selectedCourse}
        />
      )}
    </Layout>
  );
};

export default Courses;
