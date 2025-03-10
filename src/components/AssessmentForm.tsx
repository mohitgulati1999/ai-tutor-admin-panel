
import { useState } from 'react';
import { PlusCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Question = {
  id: string;
  text: string;
  type: 'multiple_choice' | 'text';
  expanded: boolean;
  options: { id: string; text: string; isCorrect: boolean }[];
  correctAnswer?: string;
};

type AssessmentFormProps = {
  initialData?: any;
};

const mockCourses = [
  { id: '1', title: 'Introduction to Natural Language Processing' },
  { id: '2', title: 'Advanced Machine Learning Algorithms' },
  { id: '3', title: 'Neural Networks Fundamentals' },
];

const mockTopics = [
  { id: '1', courseId: '1', title: 'Basics of NLP' },
  { id: '2', courseId: '1', title: 'Text Processing Techniques' },
  { id: '3', courseId: '2', title: 'Supervised Learning' },
  { id: '4', courseId: '2', title: 'Unsupervised Learning' },
  { id: '5', courseId: '3', title: 'Perceptrons' },
  { id: '6', courseId: '3', title: 'Backpropagation' },
];

const AssessmentForm = ({ initialData }: AssessmentFormProps) => {
  const [assessmentTitle, setAssessmentTitle] = useState(initialData?.title || '');
  const [selectedCourse, setSelectedCourse] = useState(initialData?.courseId || '');
  const [selectedTopic, setSelectedTopic] = useState(initialData?.topicId || '');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTopics = mockTopics.filter(topic => topic.courseId === selectedCourse);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        text: '',
        type: 'multiple_choice',
        expanded: true,
        options: [
          { id: crypto.randomUUID(), text: '', isCorrect: false },
          { id: crypto.randomUUID(), text: '', isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const toggleQuestionExpansion = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, expanded: !q.expanded } : q
    ));
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { 
        ...q, 
        options: [...q.options, { id: crypto.randomUUID(), text: '', isCorrect: false }]
      } : q
    ));
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { 
        ...q, 
        options: q.options.filter(o => o.id !== optionId)
      } : q
    ));
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { 
        ...q, 
        options: q.options.map(o => 
          o.id === optionId ? { ...o, text } : o
        )
      } : q
    ));
  };

  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { 
        ...q, 
        options: q.options.map(o => ({ ...o, isCorrect: o.id === optionId }))
      } : q
    ));
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setSelectedTopic('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!assessmentTitle.trim()) {
      toast.error('Please enter an assessment title');
      return;
    }

    if (!selectedCourse) {
      toast.error('Please select a course');
      return;
    }

    if (!selectedTopic) {
      toast.error('Please select a topic');
      return;
    }

    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Check if any question is missing text
    const invalidQuestion = questions.find(q => !q.text.trim());
    if (invalidQuestion) {
      toast.error('All questions must have text');
      return;
    }

    // Check multiple choice questions
    for (const question of questions) {
      if (question.type === 'multiple_choice') {
        // Check for empty options
        const emptyOption = question.options.find(o => !o.text.trim());
        if (emptyOption) {
          toast.error(`All options in "${question.text}" must have text`);
          return;
        }

        // Check for correct answer
        if (!question.options.some(o => o.isCorrect)) {
          toast.error(`Please select a correct answer for "${question.text}"`);
          return;
        }
      }
    }

    // Submit form
    setIsSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to the backend
      console.log('Assessment data:', { 
        title: assessmentTitle, 
        courseId: selectedCourse, 
        topicId: selectedTopic, 
        questions 
      });
      
      toast.success('Assessment created successfully');
      
      // Reset form after successful submission
      setAssessmentTitle('');
      setSelectedCourse('');
      setSelectedTopic('');
      setQuestions([]);
    } catch (error) {
      toast.error('Failed to create assessment');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Assessment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="assessmentTitle" className="block text-sm font-medium mb-1">
              Assessment Title
            </label>
            <Input
              id="assessmentTitle"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              placeholder="Enter assessment title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Course
            </label>
            <Select
              value={selectedCourse}
              onValueChange={handleCourseChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {mockCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Topic
            </label>
            <Select
              value={selectedTopic}
              onValueChange={setSelectedTopic}
              disabled={!selectedCourse}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedCourse ? "Select a topic" : "Select a course first"} />
              </SelectTrigger>
              <SelectContent>
                {filteredTopics.map(topic => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Questions</h2>
          <Button
            type="button"
            onClick={addQuestion}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Question
          </Button>
        </div>

        {questions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No questions added yet. Click the button above to add a question.
          </div>
        )}

        <div className="space-y-6">
          {questions.map((question, questionIndex) => (
            <div key={question.id} className="glass-card border-primary/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-sm">
                    {questionIndex + 1}
                  </span>
                  <h3 className="text-lg font-medium">Question</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => toggleQuestionExpansion(question.id)}
                    variant="ghost"
                    size="sm"
                  >
                    {question.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {question.expanded && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Question Text
                    </label>
                    <Textarea
                      value={question.text}
                      onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                      placeholder="Enter question text"
                      className="min-h-[60px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Question Type
                    </label>
                    <Select
                      value={question.type}
                      onValueChange={(value) => updateQuestion(
                        question.id, 
                        { 
                          type: value as 'multiple_choice' | 'text',
                          correctAnswer: value === 'text' ? '' : undefined,
                        }
                      )}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                        <SelectItem value="text">Text Answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {question.type === 'multiple_choice' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                          Options
                        </label>
                        <Button
                          type="button"
                          onClick={() => addOption(question.id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <PlusCircle className="h-3 w-3" />
                          Add Option
                        </Button>
                      </div>

                      <RadioGroup 
                        value={question.options.find(o => o.isCorrect)?.id || ""}
                        onValueChange={(value) => setCorrectOption(question.id, value)}
                        className="space-y-2"
                      >
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={option.id} 
                            className="flex items-center gap-2 border border-border rounded-md p-2"
                          >
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Input
                              value={option.text}
                              onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button
                              type="button"
                              onClick={() => removeOption(question.id, option.id)}
                              variant="ghost"
                              size="sm"
                              disabled={question.options.length <= 2}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </RadioGroup>

                      {question.options.length <= 2 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          At least two options are required
                        </p>
                      )}
                    </div>
                  )}

                  {question.type === 'text' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Correct Answer
                      </label>
                      <Textarea
                        value={question.correctAnswer || ''}
                        onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                        placeholder="Enter the correct answer (optional)"
                        className="min-h-[60px]"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This is for your reference only. The system will not auto-grade text answers.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Saving...' : 'Save Assessment'}
        </Button>
      </div>
    </form>
  );
};

export default AssessmentForm;
