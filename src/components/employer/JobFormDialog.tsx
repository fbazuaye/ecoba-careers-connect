import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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
}

interface JobFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
  employerProfileId: string | null;
  onSaved: () => void;
}

const jobTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' }
];

const JobFormDialog = ({ open, onOpenChange, job, employerProfileId, onSaved }: JobFormDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    job_type: 'full-time',
    salary_min: '',
    salary_max: '',
    requirements: '',
    benefits: ''
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location || '',
        job_type: job.job_type,
        salary_min: job.salary_min?.toString() || '',
        salary_max: job.salary_max?.toString() || '',
        requirements: job.requirements?.join('\n') || '',
        benefits: job.benefits?.join('\n') || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        location: '',
        job_type: 'full-time',
        salary_min: '',
        salary_max: '',
        requirements: '',
        benefits: ''
      });
    }
  }, [job, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employerProfileId) {
      toast.error('Employer profile not found');
      return;
    }

    setSaving(true);

    const jobData = {
      employer_id: employerProfileId,
      title: formData.title,
      description: formData.description,
      location: formData.location || null,
      job_type: formData.job_type,
      salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
      salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
      requirements: formData.requirements ? formData.requirements.split('\n').filter(r => r.trim()) : null,
      benefits: formData.benefits ? formData.benefits.split('\n').filter(b => b.trim()) : null
    };

    try {
      if (job) {
        const { error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', job.id);

        if (error) throw error;
        toast.success('Job updated successfully');
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert(jobData);

        if (error) throw error;
        toast.success('Job posted successfully');
      }

      onSaved();
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job ? 'Edit Job Posting' : 'Create New Job Posting'}</DialogTitle>
          <DialogDescription>
            {job ? 'Update the job details below' : 'Fill in the details to post a new job'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Lagos, Nigeria"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_type">Job Type *</Label>
              <Select
                value={formData.job_type}
                onValueChange={(value) => setFormData({ ...formData, job_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Minimum Salary (₦)</Label>
              <Input
                id="salary_min"
                type="number"
                value={formData.salary_min}
                onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                placeholder="e.g., 500000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_max">Maximum Salary (₦)</Label>
              <Input
                id="salary_max"
                type="number"
                value={formData.salary_max}
                onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                placeholder="e.g., 1000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (one per line)</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="5+ years of experience in software development&#10;Bachelor's degree in Computer Science&#10;Experience with React and Node.js"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits (one per line)</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="Competitive salary&#10;Health insurance&#10;Remote work options"
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                job ? 'Update Job' : 'Post Job'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobFormDialog;
