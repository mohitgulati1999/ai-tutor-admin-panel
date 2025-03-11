
import { FileText, Calendar, Award, Clock } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock data for assessment reports
const studentAssessments = [
  {
    id: 1,
    title: 'Machine Learning Quiz',
    course: 'Machine Learning Fundamentals',
    date: 'May 15, 2023',
    score: 85,
    totalQuestions: 20,
    duration: '45 minutes',
    status: 'completed',
    questions: [
      {
        id: 1,
        question: 'What is supervised learning?',
        userAnswer: 'A type of machine learning where the model is trained on labeled data.',
        isCorrect: true,
      },
      {
        id: 2,
        question: 'What is the difference between classification and regression?',
        userAnswer: 'Classification predicts discrete values while regression predicts continuous values.',
        isCorrect: true,
      },
      {
        id: 3,
        question: 'What is overfitting?',
        userAnswer: 'When a model performs well on training data but poorly on unseen data.',
        isCorrect: true,
      }
    ]
  },
  {
    id: 2,
    title: 'NLP Project Submission',
    course: 'Advanced NLP Techniques',
    date: 'June 3, 2023',
    score: 72,
    totalQuestions: 25,
    duration: '90 minutes',
    status: 'completed',
    questions: [
      {
        id: 1,
        question: 'Explain how BERT works for text classification.',
        userAnswer: 'BERT uses bidirectional training of Transformer to understand context from both sides.',
        isCorrect: true,
      },
      {
        id: 2,
        question: 'What is tokenization in NLP?',
        userAnswer: 'Breaking text down into smaller units for processing.',
        isCorrect: true,
      },
      {
        id: 3,
        question: 'Explain the concept of attention mechanism.',
        userAnswer: 'It allows focusing on specific parts of input when producing output.',
        isCorrect: false,
        correctAnswer: 'Attention mechanism allows models to focus on different parts of the input sequence when producing each element of the output sequence, effectively handling long-range dependencies.'
      }
    ]
  },
  {
    id: 3,
    title: 'Deep Learning Final Exam',
    course: 'Deep Learning with Neural Networks',
    date: 'July 10, 2023',
    score: 68,
    totalQuestions: 30,
    duration: '120 minutes',
    status: 'completed',
    questions: [
      {
        id: 1,
        question: 'What is backpropagation?',
        userAnswer: 'Algorithm to update weights using gradient descent and chain rule.',
        isCorrect: true,
      },
      {
        id: 2,
        question: 'Explain convolutional neural networks.',
        userAnswer: 'Neural networks using convolution operations, especially good for image processing.',
        isCorrect: true,
      },
      {
        id: 3,
        question: 'What is dropout in neural networks?',
        userAnswer: 'A regularization technique that prevents model from relying too much on specific neurons.',
        isCorrect: true,
      }
    ]
  }
];

const StudentAssessmentReports = () => {
  const [selectedReport, setSelectedReport] = useState<null | typeof studentAssessments[0]>(null);
  
  return (
    <>
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">Assessment Reports</h2>
        
        <div className="space-y-4">
          {studentAssessments.map((assessment) => (
            <AssessmentReportCard 
              key={assessment.id} 
              assessment={assessment} 
              onClick={() => setSelectedReport(assessment)}
            />
          ))}
        </div>
      </div>

      {selectedReport && (
        <ReportDetailDialog 
          report={selectedReport} 
          open={!!selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </>
  );
};

interface AssessmentReportCardProps {
  assessment: typeof studentAssessments[0];
  onClick: () => void;
}

const AssessmentReportCard = ({ assessment, onClick }: AssessmentReportCardProps) => {
  const scorePercentage = Math.round((assessment.score / assessment.totalQuestions) * 100);
  
  const scoreColor = 
    scorePercentage >= 80 ? 'text-green-400' : 
    scorePercentage >= 60 ? 'text-amber-400' : 
    'text-red-400';
  
  return (
    <div 
      className="bg-secondary/50 rounded-lg p-4 flex flex-col md:flex-row gap-4 hover:bg-secondary/70 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="font-medium">{assessment.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{assessment.course}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{assessment.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{assessment.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end justify-center">
        <div className={cn(
          "text-xl font-bold flex items-center gap-1",
          scoreColor
        )}>
          {scorePercentage}%
          {scorePercentage >= 80 && <Award className="h-4 w-4" />}
        </div>
        <p className="text-xs text-muted-foreground">{assessment.score}/{assessment.totalQuestions} questions</p>
      </div>
    </div>
  );
};

interface ReportDetailDialogProps {
  report: typeof studentAssessments[0];
  open: boolean;
  onClose: () => void;
}

const ReportDetailDialog = ({ report, open, onClose }: ReportDetailDialogProps) => {
  const scorePercentage = Math.round((report.score / report.totalQuestions) * 100);
  
  const scoreColor = 
    scorePercentage >= 80 ? 'text-green-400' : 
    scorePercentage >= 60 ? 'text-amber-400' : 
    'text-red-400';
    
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Assessment Report</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="flex flex-wrap gap-4 justify-between items-start glass-card p-4">
            <div>
              <h3 className="font-semibold">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.course}</p>
              <p className="text-xs text-muted-foreground mt-1">Completed on {report.date}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className={cn(
                "text-2xl font-bold flex items-center gap-1",
                scoreColor
              )}>
                {scorePercentage}%
                {scorePercentage >= 80 && <Award className="h-5 w-5" />}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>{report.score}/{report.totalQuestions}</span>
                <span>correct answers</span>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="mb-4">
              <h4 className="font-medium mb-2">Score Breakdown</h4>
              <Progress value={scorePercentage} className="h-2.5 mb-2" />
              <div className="flex justify-between text-xs">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/70 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Duration</div>
                <div className="font-medium">{report.duration}</div>
              </div>
              <div className="bg-secondary/70 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Date Taken</div>
                <div className="font-medium">{report.date}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Detailed Responses</h4>
            
            <div className="space-y-4">
              {report.questions.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "glass-card p-4 border",
                    item.isCorrect ? "border-green-500/20" : "border-red-500/20"
                  )}
                >
                  <div className="mb-2 flex justify-between">
                    <h5 className="font-medium">Question {item.id}</h5>
                    <div className={cn(
                      "text-sm font-medium",
                      item.isCorrect ? "text-green-400" : "text-red-400"
                    )}>
                      {item.isCorrect ? "Correct" : "Incorrect"}
                    </div>
                  </div>
                  <p className="mb-3 text-sm">{item.question}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Your Answer:</div>
                      <div className="text-sm p-2 bg-secondary/70 rounded">
                        {item.userAnswer}
                      </div>
                    </div>
                    
                    {!item.isCorrect && item.correctAnswer && (
                      <div>
                        <div className="text-xs text-muted-foreground">Correct Answer:</div>
                        <div className="text-sm p-2 bg-green-500/10 border border-green-500/20 rounded">
                          {item.correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentAssessmentReports;
