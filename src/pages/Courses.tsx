
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import CourseForm from '@/components/CourseForm';

const Courses = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Layout>
      <PageHeader 
        title={isCreating ? "Create Course" : "Courses"}
        subtitle={isCreating ? "Add a new course to the AI Trainer" : "Manage your AI Trainer courses"}
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
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card p-6 flex flex-col hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">Machine Learning Basics {i}</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Introduction to the fundamentals of machine learning algorithms and techniques.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topics:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assessments:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">Oct 15, 2023</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <Button variant="ghost" size="sm">Edit Course</Button>
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
