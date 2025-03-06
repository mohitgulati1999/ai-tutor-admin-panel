
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import CandidateCard from '@/components/CandidateCard';

// Mock data
const mockCandidates = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    score: 8,
    totalQuestions: 10,
    date: 'Oct 15, 2023',
    assessment: 'Machine Learning Basics',
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
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    score: 6,
    totalQuestions: 10,
    date: 'Oct 14, 2023',
    assessment: 'Natural Language Processing',
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
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    score: 9,
    totalQuestions: 10,
    date: 'Oct 13, 2023',
    assessment: 'Deep Learning Fundamentals',
    answers: [
      {
        question: 'What is a neural network?',
        answer: 'A computational model inspired by the human brain to process complex data.',
        isCorrect: true,
      },
      {
        question: 'What is backpropagation?',
        answer: 'An algorithm for training neural networks by adjusting weights based on error gradients.',
        isCorrect: true,
      },
      {
        question: 'What is a convolutional neural network?',
        answer: 'A type of neural network particularly effective for image processing tasks.',
        isCorrect: true,
      },
    ],
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    score: 4,
    totalQuestions: 10,
    date: 'Oct 12, 2023',
    assessment: 'Reinforcement Learning',
    answers: [
      {
        question: 'What is reinforcement learning?',
        answer: 'A type of machine learning where an agent learns from its interactions with an environment.',
        isCorrect: true,
      },
      {
        question: 'What is Q-learning?',
        answer: 'A model-based reinforcement learning algorithm.',
        isCorrect: false,
        correctAnswer: 'A model-free reinforcement learning algorithm to learn the value of actions.',
      },
      {
        question: 'What is the exploration-exploitation tradeoff?',
        answer: 'It refers to balancing exploration of new actions with exploitation of known rewards.',
        isCorrect: true,
      },
    ],
  },
];

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCandidates = mockCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.assessment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <PageHeader 
        title="Candidates"
        subtitle="View candidate assessment results and performance"
      />

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search candidates, assessments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full md:w-auto">
            Filter
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            Export
          </Button>
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <h3 className="text-lg font-medium mb-2">No candidates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Candidates;
