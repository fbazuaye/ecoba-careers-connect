-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID NOT NULL REFERENCES public.employer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  job_type TEXT NOT NULL DEFAULT 'full-time',
  salary_min INTEGER,
  salary_max INTEGER,
  requirements TEXT[],
  benefits TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.member_profiles(id) ON DELETE CASCADE,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, member_id)
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Jobs RLS policies
CREATE POLICY "Anyone can view active jobs"
ON public.jobs FOR SELECT
USING (is_active = true);

CREATE POLICY "Employers can view own jobs"
ON public.jobs FOR SELECT
USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employers can insert own jobs"
ON public.jobs FOR INSERT
WITH CHECK (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employers can update own jobs"
ON public.jobs FOR UPDATE
USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employers can delete own jobs"
ON public.jobs FOR DELETE
USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

-- Applications RLS policies
CREATE POLICY "Members can view own applications"
ON public.applications FOR SELECT
USING (member_id IN (SELECT id FROM public.member_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employers can view applications for their jobs"
ON public.applications FOR SELECT
USING (job_id IN (SELECT id FROM public.jobs WHERE employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid())));

CREATE POLICY "Members can insert own applications"
ON public.applications FOR INSERT
WITH CHECK (member_id IN (SELECT id FROM public.member_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Members can update own applications"
ON public.applications FOR UPDATE
USING (member_id IN (SELECT id FROM public.member_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employers can update application status"
ON public.applications FOR UPDATE
USING (job_id IN (SELECT id FROM public.jobs WHERE employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid())));

-- Add triggers for updated_at
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();