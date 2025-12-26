import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface Application {
  id: string;
  job_id: string;
  status: string;
  cover_letter: string | null;
  created_at: string;
  job: {
    id: string;
    title: string;
    location: string | null;
    job_type: string;
    employer: {
      company_name: string;
      company_logo_url: string | null;
    };
  };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  shortlisted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  hired: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
};

const statusLabels: Record<string, string> = {
  pending: 'Pending Review',
  reviewed: 'Under Review',
  shortlisted: 'Shortlisted',
  rejected: 'Not Selected',
  hired: 'Hired!'
};

const MyApplicationsTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      // First get the member profile
      const { data: memberProfile, error: memberError } = await supabase
        .from('member_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (memberError) throw memberError;

      if (!memberProfile) {
        setLoading(false);
        return;
      }

      // Get applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
        .eq('member_id', memberProfile.id)
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;

      if (!applicationsData || applicationsData.length === 0) {
        setApplications([]);
        setLoading(false);
        return;
      }

      // Get job details
      const jobIds = applicationsData.map(a => a.job_id);
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title, location, job_type, employer_id')
        .in('id', jobIds);

      if (jobsError) throw jobsError;

      // Get employer details
      const employerIds = jobsData?.map(j => j.employer_id) || [];
      const { data: employersData, error: employersError } = await supabase
        .from('employer_profiles')
        .select('id, company_name, company_logo_url')
        .in('id', employerIds);

      if (employersError) throw employersError;

      // Combine all data
      const enrichedApplications = applicationsData.map(app => {
        const job = jobsData?.find(j => j.id === app.job_id);
        const employer = employersData?.find(e => e.id === job?.employer_id);

        return {
          ...app,
          job: {
            id: job?.id || '',
            title: job?.title || 'Unknown Job',
            location: job?.location || null,
            job_type: job?.job_type || 'full-time',
            employer: {
              company_name: employer?.company_name || 'Unknown Company',
              company_logo_url: employer?.company_logo_url || null
            }
          }
        };
      }) as Application[];

      setApplications(enrichedApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet</p>
          <Button asChild>
            <Link to="/jobs">Browse Jobs</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">My Applications</h2>
        <p className="text-muted-foreground">Track the status of your job applications</p>
      </div>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {application.job.employer.company_logo_url ? (
                      <img 
                        src={application.job.employer.company_logo_url} 
                        alt={application.job.employer.company_name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{application.job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>{application.job.employer.company_name}</span>
                      {application.job.location && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {application.job.location}
                          </span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={statusColors[application.status]}>
                  {statusLabels[application.status] || application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Applied {new Date(application.created_at).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {application.job.job_type.replace('-', ' ')}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/jobs/${application.job.id}`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Job
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsTab;
