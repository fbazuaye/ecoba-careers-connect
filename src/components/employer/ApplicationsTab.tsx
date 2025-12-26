import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, User, Mail, FileText, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Application {
  id: string;
  job_id: string;
  member_id: string;
  cover_letter: string | null;
  status: string;
  created_at: string;
  job: {
    title: string;
  };
  member_profile: {
    bio: string | null;
    skills: string[] | null;
    experience: string | null;
    linkedin_url: string | null;
    resume_url: string | null;
  };
  profile: {
    full_name: string;
    avatar_url: string | null;
  };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  shortlisted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  hired: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' }
];

const ApplicationsTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      // First get the employer profile
      const { data: employerProfile, error: profileError } = await supabase
        .from('employer_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!employerProfile) {
        setLoading(false);
        return;
      }

      // Get all jobs for this employer
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title')
        .eq('employer_id', employerProfile.id);

      if (jobsError) throw jobsError;

      if (!jobs || jobs.length === 0) {
        setLoading(false);
        return;
      }

      const jobIds = jobs.map(j => j.id);

      // Get applications for these jobs
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
        .in('job_id', jobIds)
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;

      // Get member profiles and profiles for each application
      const memberIds = applicationsData?.map(a => a.member_id) || [];
      
      const { data: memberProfiles, error: memberProfilesError } = await supabase
        .from('member_profiles')
        .select('id, user_id, bio, skills, experience, linkedin_url, resume_url')
        .in('id', memberIds);

      if (memberProfilesError) throw memberProfilesError;

      const userIds = memberProfiles?.map(mp => mp.user_id) || [];

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, avatar_url')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // Combine all data
      const enrichedApplications = applicationsData?.map(app => {
        const job = jobs.find(j => j.id === app.job_id);
        const memberProfile = memberProfiles?.find(mp => mp.id === app.member_id);
        const profile = profiles?.find(p => p.user_id === memberProfile?.user_id);

        return {
          ...app,
          job: { title: job?.title || 'Unknown Job' },
          member_profile: {
            bio: memberProfile?.bio || null,
            skills: memberProfile?.skills || null,
            experience: memberProfile?.experience || null,
            linkedin_url: memberProfile?.linkedin_url || null,
            resume_url: memberProfile?.resume_url || null
          },
          profile: {
            full_name: profile?.full_name || 'Unknown',
            avatar_url: profile?.avatar_url || null
          }
        };
      }) as Application[];

      setApplications(enrichedApplications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;

      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));

      if (selectedApplication?.id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }

      toast.success('Application status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Applications</h2>
          <p className="text-muted-foreground">Review and manage job applications</p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              {filterStatus === 'all' 
                ? 'No applications received yet' 
                : `No ${filterStatus} applications`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedApplication(application)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{application.profile.full_name}</CardTitle>
                      <CardDescription>Applied for: {application.job.title}</CardDescription>
                    </div>
                  </div>
                  <Badge className={statusColors[application.status]}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Applied {new Date(application.created_at).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review the applicant's profile and application
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedApplication.profile.full_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Applied for: {selectedApplication.job.title}
                    </p>
                  </div>
                </div>
                <Select
                  value={selectedApplication.status}
                  onValueChange={(value) => handleStatusChange(selectedApplication.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedApplication.cover_letter && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Cover Letter
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedApplication.cover_letter}
                  </p>
                </div>
              )}

              {selectedApplication.member_profile.bio && (
                <div className="space-y-2">
                  <h4 className="font-medium">About</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.member_profile.bio}
                  </p>
                </div>
              )}

              {selectedApplication.member_profile.skills && selectedApplication.member_profile.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.member_profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedApplication.member_profile.experience && (
                <div className="space-y-2">
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedApplication.member_profile.experience}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {selectedApplication.member_profile.linkedin_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedApplication.member_profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {selectedApplication.member_profile.resume_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedApplication.member_profile.resume_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      Resume
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsTab;
