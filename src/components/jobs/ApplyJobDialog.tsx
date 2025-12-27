import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApplyJobDialogProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  children: React.ReactNode;
}

const ApplyJobDialog = ({ jobId, jobTitle, companyName, children }: ApplyJobDialogProps) => {
  const { user, role } = useAuth();
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Get member profile ID
      const { data: memberProfile, error: profileError } = await supabase
        .from('member_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!memberProfile) {
        toast.error('Member profile not found. Please complete your profile first.');
        return;
      }

      // Check if already applied
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('member_id', memberProfile.id)
        .maybeSingle();

      if (existingApplication) {
        toast.error('You have already applied to this job.');
        setHasApplied(true);
        return;
      }

      // Submit application
      const { error } = await supabase.from('applications').insert({
        job_id: jobId,
        member_id: memberProfile.id,
        cover_letter: coverLetter.trim() || null,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Application submitted successfully!');
      setHasApplied(true);
      setOpen(false);
      setCoverLetter('');
    } catch (error: any) {
      console.error('Application error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Not logged in
  if (!user) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in Required</DialogTitle>
            <DialogDescription>
              You need to sign in as a member to apply for jobs.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="gold" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Not a member
  if (role !== 'member') {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Members Only</DialogTitle>
            <DialogDescription>
              Only member accounts can apply for jobs. Employer accounts cannot submit applications.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  // Already applied
  if (hasApplied) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Already Applied</DialogTitle>
            <DialogDescription>
              You have already submitted an application for this position. You can track your application status in your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/member/profile">View My Applications</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Submit your application to {companyName}. A cover letter is optional but recommended.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
            <Textarea
              id="cover-letter"
              placeholder="Tell the employer why you're a great fit for this role..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Your profile information and resume will be shared with the employer.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="gold"
              onClick={handleApply}
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobDialog;
