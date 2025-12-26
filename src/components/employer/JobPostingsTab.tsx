import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Loader2, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import JobFormDialog from './JobFormDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string | null;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  requirements: string[] | null;
  benefits: string[] | null;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

const JobPostingsTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employerProfileId, setEmployerProfileId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchEmployerProfile();
    }
  }, [user]);

  const fetchEmployerProfile = async () => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('employer_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile) {
        setEmployerProfileId(profile.id);
        await fetchJobs(profile.id);
      }
    } catch (error) {
      console.error('Error fetching employer profile:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('employer_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    }
  };

  const handleToggleActive = async (job: Job) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_active: !job.is_active })
        .eq('id', job.id);

      if (error) throw error;

      setJobs(jobs.map(j => j.id === job.id ? { ...j, is_active: !j.is_active } : j));
      toast.success(job.is_active ? 'Job deactivated' : 'Job activated');
    } catch (error) {
      console.error('Error toggling job status:', error);
      toast.error('Failed to update job status');
    }
  };

  const handleDelete = async () => {
    if (!deletingJobId) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', deletingJobId);

      if (error) throw error;

      setJobs(jobs.filter(j => j.id !== deletingJobId));
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    } finally {
      setDeletingJobId(null);
    }
  };

  const handleJobSaved = () => {
    if (employerProfileId) {
      fetchJobs(employerProfileId);
    }
    setIsFormOpen(false);
    setEditingJob(null);
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `₦${min.toLocaleString()} - ₦${max.toLocaleString()}`;
    if (min) return `From ₦${min.toLocaleString()}`;
    return `Up to ₦${max?.toLocaleString()}`;
  };

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
          <h2 className="text-xl font-semibold">Job Postings</h2>
          <p className="text-muted-foreground">Manage your job listings</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">You haven't posted any jobs yet</p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Post Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {job.location && <span>{job.location}</span>}
                      <span>•</span>
                      <span className="capitalize">{job.job_type.replace('-', ' ')}</span>
                    </CardDescription>
                  </div>
                  <Badge variant={job.is_active ? 'default' : 'secondary'}>
                    {job.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {job.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(job)}
                    >
                      {job.is_active ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingJob(job);
                        setIsFormOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingJobId(job.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <JobFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingJob(null);
        }}
        job={editingJob}
        employerProfileId={employerProfileId}
        onSaved={handleJobSaved}
      />

      <AlertDialog open={!!deletingJobId} onOpenChange={() => setDeletingJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All applications for this job will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobPostingsTab;
