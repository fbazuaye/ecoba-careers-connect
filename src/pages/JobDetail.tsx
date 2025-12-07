import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
} from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);
  const employer = job ? mockEmployers.find((e) => e.id === job.employerId) : null;

  if (!job) {
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

  const getTypeBadgeVariant = (type: typeof job.type) => {
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
                    <Badge variant={getTypeBadgeVariant(job.type)}>
                      {job.type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                    {job.remote && (
                      <Badge variant="remote" className="flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        Remote
                      </Badge>
                    )}
                    {job.featured && <Badge variant="gold">Featured</Badge>}
                  </div>
                  <h1 className="font-display text-2xl lg:text-4xl font-bold text-ecoba-cream mb-2">
                    {job.title}
                  </h1>
                  <p className="text-ecoba-cream/80 text-lg">{job.company}</p>
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
                <Button variant="hero" size="lg">
                  Apply Now
                </Button>
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
                        <p className="font-medium text-foreground">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Salary</p>
                        <p className="font-medium text-foreground">{job.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <p className="font-medium text-foreground">{job.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="font-medium text-foreground">
                          {new Date(job.deadline).toLocaleDateString('en-NG', {
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
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </Card>

                {/* Requirements */}
                <Card className="p-6 lg:p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
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
                    {job.benefits.map((benefit, index) => (
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="w-4 h-4" />
                    <span>{job.applicationsCount} applicants</span>
                  </div>
                  <Button variant="gold" className="w-full mb-3">
                    Apply Now
                  </Button>
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
                        <p className="font-semibold text-foreground">{employer.name}</p>
                        {employer.verified && (
                          <div className="flex items-center gap-1 text-ecoba-green text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Verified Employer
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry</span>
                        <span className="font-medium text-foreground">{employer.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size</span>
                        <span className="font-medium text-foreground">{employer.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium text-foreground">{employer.location}</span>
                      </div>
                    </div>
                    {employer.website && (
                      <Button variant="outline" className="w-full mt-4" asChild>
                        <a href={`https://${employer.website}`} target="_blank" rel="noopener noreferrer">
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
