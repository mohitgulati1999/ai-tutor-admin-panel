
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Award, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for multiple assessments per candidate
const mockAssessmentData = {
  '1': [
    {
      id: 'a1',
      name: 'Machine Learning Basics',
      score: 8,
      totalQuestions: 10,
      date: 'Oct 15, 2023',
      answers: [
        {
          question: 'What is supervised learning?',
          answer: 'A type of machine learning where the model is trained on labeled data.',
          isCorrect: true,
        },
        {
          question: 'What is the difference between classification and regression?',
          answer: 'Classification predicts discrete values while regression predicts continuous values.',
          isCorrect: true,
        },
        {
          question: 'What is overfitting?',
          answer: 'When a model performs well on test data but poorly on training data.',
          isCorrect: false,
          correctAnswer: 'When a model performs well on training data but poorly on test data.',
        },
      ],
    },
    {
      id: 'a2',
      name: 'Advanced Machine Learning',
      score: 6,
      totalQuestions: 10,
      date: 'Nov 05, 2023',
      answers: [
        {
          question: 'What is ensemble learning?',
          answer: 'Combining multiple models to improve performance.',
          isCorrect: true,
        },
        {
          question: 'What is gradient boosting?',
          answer: 'A technique where new models correct errors made by existing models.',
          isCorrect: true,
        },
        {
          question: 'What is transfer learning?',
          answer: 'Learning techniques from one domain and applying them to another.',
          isCorrect: false,
          correctAnswer: 'Using a pre-trained model on a new but related task.',
        },
      ],
    }
  ],
  '2': [
    {
      id: 'a3',
      name: 'Natural Language Processing',
      score: 6,
      totalQuestions: 10,
      date: 'Oct 14, 2023',
      answers: [
        {
          question: 'What is tokenization?',
          answer: 'Breaking down text into smaller units like words or subwords.',
          isCorrect: true,
        },
        {
          question: 'What is TF-IDF?',
          answer: 'A measure of how important a word is in a document relative to a collection.',
          isCorrect: true,
        },
        {
          question: 'What is stemming?',
          answer: 'The process of finding related words based on their meaning.',
          isCorrect: false,
          correctAnswer: 'The process of reducing words to their root/stem form.',
        },
      ],
    }
  ],
  // Add more assessments for other candidates
};

type CandidateProps = {
  candidate: {
    id: string;
    name: string;
    email: string;
    score: number;
    totalQuestions: number;
    date: string;
    assessment: string;
    answers: {
      question: string;
      answer: string;
      isCorrect: boolean;
      correctAnswer?: string;
    }[];
  };
};

const CandidateCard = ({ candidate }: CandidateProps) => {
  const [showReport, setShowReport] = useState(false);
  const scorePercentage = Math.round((candidate.score / candidate.totalQuestions) * 100);
  const scoreColor = 
    scorePercentage >= 80 ? 'text-green-400' : 
    scorePercentage >= 60 ? 'text-amber-400' : 
    'text-red-400';
    
  // Get available assessments for this candidate
  const candidateAssessments = mockAssessmentData[candidate.id] || [];
  
  // Add the current assessment if it's not in the mock data
  const allAssessments = candidateAssessments.length > 0 ? 
    candidateAssessments : 
    [{
      id: 'current',
      name: candidate.assessment,
      score: candidate.score,
      totalQuestions: candidate.totalQuestions,
      date: candidate.date,
      answers: candidate.answers
    }];
    
  const [selectedAssessment, setSelectedAssessment] = useState<string>(allAssessments[0].id);
  
  // Find the currently selected assessment data
  const currentAssessmentData = allAssessments.find(a => a.id === selectedAssessment) || allAssessments[0];
  const currentScorePercentage = Math.round((currentAssessmentData.score / currentAssessmentData.totalQuestions) * 100);
  const currentScoreColor = 
    currentScorePercentage >= 80 ? 'text-green-400' : 
    currentScorePercentage >= 60 ? 'text-amber-400' : 
    'text-red-400';

  return (
    <>
      <div 
        className={cn(
          "glass-card p-5 transition-all duration-300",
          "hover:translate-y-[-5px] cursor-pointer",
          scorePercentage >= 80 ? "border-green-500/20" : 
          scorePercentage >= 60 ? "border-amber-500/20" : 
          "border-red-500/20"
        )}
        onClick={() => setShowReport(true)}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground">{candidate.email}</p>
            <p className="text-xs text-muted-foreground mt-1">{candidate.assessment}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className={cn(
              "text-lg font-bold flex items-center",
              scoreColor
            )}>
              {scorePercentage}%
              {scorePercentage >= 80 && <Award className="h-4 w-4 ml-1" />}
            </div>
            <p className="text-xs text-muted-foreground">
              {candidate.score}/{candidate.totalQuestions} questions
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Completed {candidate.date}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto"
            onClick={(e) => {
              e.stopPropagation();
              setShowReport(true);
            }}
          >
            <span className="mr-1">View Report</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Assessment Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-4 justify-between items-start glass-card p-4">
              <div>
                <h3 className="font-semibold">{candidate.name}</h3>
                <p className="text-sm text-muted-foreground">{candidate.email}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className={cn(
                  "text-2xl font-bold flex items-center",
                  currentScoreColor
                )}>
                  {currentScorePercentage}%
                  {currentScorePercentage >= 80 && <Award className="h-5 w-5 ml-1" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentAssessmentData.score}/{currentAssessmentData.totalQuestions} correct answers
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-semibold">Assessment</h4>
                </div>
                
                <Select
                  value={selectedAssessment}
                  onValueChange={(value) => setSelectedAssessment(value)}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    {allAssessments.map((assessment) => (
                      <SelectItem key={assessment.id} value={assessment.id}>
                        {assessment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Completed on {currentAssessmentData.date}
              </p>
            </div>

            <div className="space-y-6 mt-6">
              <h4 className="font-semibold text-lg">Detailed Responses</h4>
              
              {currentAssessmentData.answers.map((item, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "glass-card p-4 border",
                    item.isCorrect ? "border-green-500/20" : "border-red-500/20"
                  )}
                >
                  <div className="mb-2 flex justify-between">
                    <h5 className="font-medium">Question {index + 1}</h5>
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
                      <div className="text-xs text-muted-foreground">Candidate's Answer:</div>
                      <div className="text-sm p-2 bg-secondary/70 rounded">
                        {item.answer}
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidateCard;
