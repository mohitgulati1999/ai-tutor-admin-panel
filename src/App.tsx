
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

// Import pages
import Index from '@/pages/Index';
import Courses from '@/pages/Courses';
import Assessments from '@/pages/Assessments';
import Candidates from '@/pages/Candidates';
import NotFound from '@/pages/NotFound';
import StudentProgress from '@/pages/StudentProgress';
import StudentAssessmentReports from '@/pages/StudentAssessmentReports';
import Enrollments from '@/pages/Enrollments';

import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/progress" element={<StudentProgress />} />
        <Route path="/assessment-reports" element={<StudentAssessmentReports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
