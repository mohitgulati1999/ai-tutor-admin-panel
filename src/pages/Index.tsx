
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Index = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(true);
  
  // Check if userType is passed via location state, otherwise use localStorage
  useEffect(() => {
    const userType = location.state?.userType || localStorage.getItem('userType') || 'admin';
    setIsAdmin(userType !== 'student');
    
    // Store user type in localStorage for persistence
    localStorage.setItem('userType', userType);
  }, [location.state?.userType]);

  return (
    <Layout>
      <PageHeader 
        title={isAdmin ? "Admin Dashboard" : "Student Dashboard"}
        subtitle={isAdmin 
          ? "Welcome to the ZeLearn AI admin dashboard" 
          : "Welcome to your ZeLearn AI learning platform"
        }
      />

      {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
    </Layout>
  );
};

export default Index;
