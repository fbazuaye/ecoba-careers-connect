import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Briefcase, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompanyProfileTab from '@/components/employer/CompanyProfileTab';
import JobPostingsTab from '@/components/employer/JobPostingsTab';
import ApplicationsTab from '@/components/employer/ApplicationsTab';

const EmployerDashboard = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!loading && (!user || role !== 'employer')) {
      navigate('/login');
    }
  }, [user, role, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || role !== 'employer') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Employer Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your company profile, job postings, and applications</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <CompanyProfileTab />
          </TabsContent>

          <TabsContent value="jobs">
            <JobPostingsTab />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsTab />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default EmployerDashboard;
