
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import StudentAssessmentReports from '@/components/dashboard/student/StudentAssessmentReports';

const StudentAssessmentReportsPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Assessment Reports" 
        subtitle="View and analyze your assessment results"
      />
      <StudentAssessmentReports />
    </Layout>
  );
};

export default StudentAssessmentReportsPage;
