
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, ClipboardCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import AssessmentForm from '@/components/AssessmentForm';

// Mock data for assessments
const mockAssessments = [
  {
    id: '1',
    title: 'NLP Assessment 1',
    description: 'Test your knowledge of natural language processing concepts and applications.',
    createdAt: 'Oct 15, 2023',
    questions: 10,
    courseId: '1',
    topicId: '1'
  },
  {
    id: '2',
    title: 'NLP Assessment 2',
    description: 'Test your knowledge of natural language processing concepts and applications.',
    createdAt: 'Oct 15, 2023',
    questions: 10,
    courseId: '1',
    topicId: '2'
  },
  {
    id: '3',
    title: 'NLP Assessment 3',
    description: 'Test your knowledge of natural language processing concepts and applications.',
    createdAt: 'Oct 15, 2023',
    questions: 10,
    courseId: '2',
    topicId: '3'
  },
  {
    id: '4',
    title: 'NLP Assessment 4',
    description: 'Test your knowledge of natural language processing concepts and applications.',
    createdAt: 'Oct 15, 2023',
    questions: 10,
    courseId: '2',
    topicId: '4'
  },
  {
    id: '5',
    title: 'NLP Assessment 5',
    description: 'Test your knowledge of natural language processing concepts and applications.',
    createdAt: 'Oct 15, 2023',
    questions: 10,
    courseId: '3',
    topicId: '5'
  },
  {
    id: '6',
    title: 'NLP Assessment 6',
    description: 'Test your knowledge of natural language processing concepts and applications.',
    createdAt: 'Oct 15, 2023',
    questions: 10,
    courseId: '3',
    topicId: '6'
  }
];

const Assessments = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<any>(null);

  const handleEditAssessment = (assessment: any) => {
    setEditingAssessment(assessment);
    setIsCreating(true);
  };

  const handleCancelEdit = () => {
    setEditingAssessment(null);
    setIsCreating(false);
  };

  return (
    <Layout>
      <PageHeader 
        title={isCreating ? (editingAssessment ? "Edit Assessment" : "Create Assessment") : "Assessments"}
        subtitle={isCreating ? (editingAssessment ? "Modify an existing assessment" : "Add a new assessment to the AI Trainer") : "Manage your AI Trainer assessments"}
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
          <AssessmentForm initialData={editingAssessment} />
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
            {mockAssessments.map((assessment) => (
              <div key={assessment.id} className="glass-card p-6 flex flex-col hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{assessment.title}</h3>
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">
                  {assessment.description}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Created: {assessment.createdAt}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ClipboardCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Questions: {assessment.questions}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditAssessment(assessment)}
                  >
                    Edit Assessment
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

export default Assessments;
