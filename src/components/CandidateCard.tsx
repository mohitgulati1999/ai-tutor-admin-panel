
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
                  scoreColor
                )}>
                  {scorePercentage}%
                  {scorePercentage >= 80 && <Award className="h-5 w-5 ml-1" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {candidate.score}/{candidate.totalQuestions} correct answers
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Assessment: {candidate.assessment}</h4>
              <p className="text-sm text-muted-foreground">Completed on {candidate.date}</p>
            </div>

            <div className="space-y-6 mt-6">
              <h4 className="font-semibold text-lg">Detailed Responses</h4>
              
              {candidate.answers.map((item, index) => (
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
