import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import { mockJobs } from '@/lib/data';

const FeaturedJobs = () => {
  const featuredJobs = mockJobs.filter((job) => job.featured).slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Featured Opportunities
            </h2>
            <p className="text-muted-foreground">
              Top positions from trusted employers in our network
            </p>
          </div>
          <Link to="/jobs">
            <Button variant="green-outline" className="group">
              View All Jobs
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <div
              key={job.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <JobCard job={job} featured />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for more? We have {mockJobs.length}+ active job listings
          </p>
          <Link to="/jobs">
            <Button variant="gold" size="lg">
              Explore All Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
