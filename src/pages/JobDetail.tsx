import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ApplyJobDialog from '@/components/jobs/ApplyJobDialog';
import { mockJobs, mockEmployers } from '@/lib/data';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  Wifi,
  ArrowLeft,
  ExternalLink,
  Share2,
  Bookmark,
  CheckCircle,
  Users,
  Loader2,
} from 'lucide-react';

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
  created_at: string;
  employer_profiles: {
    id: string;
    company_name: string;
    company_description: string | null;
    company_website: string | null;
    industry: string | null;
    company_size: string | null;
    location: string | null;
  } | null;
}

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback to mock data for backward compatibility
  const mockJob = mockJobs.find((j) => j.id === id);
  const mockEmployer = mockJob ? mockEmployers.find((e) => e.id === mockJob.employerId) : null;

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            employer_profiles (
              id,
              company_name,
              company_description,
              company_website,
              industry,
              company_size,
              location
            )
          `)
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  // Use database job if available, otherwise fall back to mock
  const displayJob = job || mockJob;
  const employer = job?.employer_profiles || mockEmployer;

  if (!displayJob) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Job Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs">
              <Button variant="gold">Browse All Jobs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper to get job type from either format
  const jobType = job ? job.job_type : mockJob?.type || 'full-time';
  const jobTitle = job ? job.title : mockJob?.title || '';
  const jobLocation = job ? job.location : mockJob?.location || '';
  const jobDescription = job ? job.description : mockJob?.description || '';
  const jobRequirements = job ? (job.requirements || []) : (mockJob?.requirements || []);
  const jobBenefits = job ? (job.benefits || []) : (mockJob?.benefits || []);
  const companyName = job?.employer_profiles?.company_name || mockJob?.company || 'Company';
  const salaryDisplay = job 
    ? (job.salary_min && job.salary_max ? `₦${job.salary_min.toLocaleString()} - ₦${job.salary_max.toLocaleString()}` : 'Competitive')
    : mockJob?.salary || 'Competitive';

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'fulltime';
      case 'part-time':
        return 'parttime';
      case 'contract':
        return 'contract';
      case 'internship':
        return 'internship';
      default:
        return 'secondary';
    }
  };

  // Normalize employer data for both database and mock formats
  const employerName = job?.employer_profiles?.company_name || (mockEmployer as any)?.name || 'Company';
  const employerIndustry = job?.employer_profiles?.industry || mockEmployer?.industry || '';
  const employerSize = job?.employer_profiles?.company_size || (mockEmployer as any)?.size || '';
  const employerLocation = job?.employer_profiles?.location || mockEmployer?.location || '';
  const employerWebsite = job?.employer_profiles?.company_website || (mockEmployer as any)?.website || '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="ecoba-gradient-bg py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-ecoba-cream/80 hover:text-ecoba-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-ecoba-cream/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 lg:w-10 lg:h-10 text-ecoba-cream" />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant={getTypeBadgeVariant(jobType)}>
                      {jobType.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                    {mockJob?.remote && (
                      <Badge variant="remote" className="flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        Remote
                      </Badge>
                    )}
                    {mockJob?.featured && <Badge variant="gold">Featured</Badge>}
                  </div>
                  <h1 className="font-display text-2xl lg:text-4xl font-bold text-ecoba-cream mb-2">
                    {jobTitle}
                  </h1>
                  <p className="text-ecoba-cream/80 text-lg">{companyName}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="ghost" className="text-ecoba-cream/80 hover:text-ecoba-gold hover:bg-ecoba-gold/10">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
                <Button variant="ghost" className="text-ecoba-cream/80 hover:text-ecoba-gold hover:bg-ecoba-gold/10">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <ApplyJobDialog jobId={id!} jobTitle={jobTitle} companyName={companyName}>
                  <Button variant="hero" size="lg">
                    Apply Now
                  </Button>
                </ApplyJobDialog>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Details */}
                <Card className="p-6 lg:p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Job Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{jobLocation || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Salary</p>
                        <p className="font-medium text-foreground">{salaryDisplay}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="font-medium text-foreground">{jobType.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Posted</p>
                        <p className="font-medium text-foreground">
                          {new Date(job?.created_at || mockJob?.postedAt || new Date()).toLocaleDateString('en-NG', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Description */}
                <Card className="p-6 lg:p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Job Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{jobDescription}</p>
                </Card>

                {/* Requirements */}
                <Card className="p-6 lg:p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {jobRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-ecoba-green flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Benefits */}
                <Card className="p-6 lg:p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Benefits
                  </h2>
                  <ul className="space-y-3">
                    {jobBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-ecoba-gold flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Card */}
                <Card className="p-6 border-ecoba-gold/30 bg-gradient-to-br from-card to-ecoba-gold/5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Apply for this Position
                  </h3>
                  <ApplyJobDialog jobId={id!} jobTitle={jobTitle} companyName={companyName}>
                    <Button variant="gold" className="w-full mb-3">
                      Apply Now
                    </Button>
                  </ApplyJobDialog>
                  <p className="text-xs text-muted-foreground text-center">
                    Sign in with your ECOBA account to apply
                  </p>
                </Card>

                {/* Company Info */}
                {employer && (
                  <Card className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      About the Company
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{employerName}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {employerIndustry && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Industry</span>
                          <span className="font-medium text-foreground">{employerIndustry}</span>
                        </div>
                      )}
                      {employerSize && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size</span>
                          <span className="font-medium text-foreground">{employerSize}</span>
                        </div>
                      )}
                      {employerLocation && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium text-foreground">{employerLocation}</span>
                        </div>
                      )}
                    </div>
                    {employerWebsite && (
                      <Button variant="outline" className="w-full mt-4" asChild>
                        <a href={employerWebsite.startsWith('http') ? employerWebsite : `https://${employerWebsite}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetail;
