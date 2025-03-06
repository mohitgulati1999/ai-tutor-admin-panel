
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, ClipboardCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import AssessmentForm from '@/components/AssessmentForm';

const Assessments = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Layout>
      <PageHeader 
        title={isCreating ? "Create Assessment" : "Assessments"}
        subtitle={isCreating ? "Add a new assessment to the AI Trainer" : "Manage your AI Trainer assessments"}
        action={
          !isCreating && (
            <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Assessment
            </Button>
          )
        }
      />

      {isCreating ? (
        <div className="space-y-6">
          <AssessmentForm />
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
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">NLP Assessment {i}</h3>
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">
                  Test your knowledge of natural language processing concepts and applications.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Created: Oct 15, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClipboardCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Questions: 10</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <Button variant="ghost" size="sm">Edit Assessment</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Assessments;
