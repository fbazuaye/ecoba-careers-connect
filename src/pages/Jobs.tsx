import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import JobFilters, { FilterState } from '@/components/jobs/JobFilters';
import { mockJobs } from '@/lib/data';
import { Briefcase } from 'lucide-react';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    location: '',
    remote: null,
    category: '',
  });

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type) {
        const typeMatch = job.type.replace('-', ' ').toLowerCase() === filters.type.toLowerCase();
        if (!typeMatch) return false;
      }

      // Location filter
      if (filters.location) {
        if (filters.location === 'Remote') {
          if (!job.remote) return false;
        } else {
          const locationMatch = job.location.toLowerCase().includes(filters.location.toLowerCase());
          if (!locationMatch) return false;
        }
      }

      // Remote filter
      if (filters.remote === true && !job.remote) return false;

      // Category filter
      if (filters.category && job.category !== filters.category) return false;

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="ecoba-gradient-bg py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ecoba-gold/20 text-ecoba-gold mb-6">
                <Briefcase className="w-8 h-8" />
              </div>
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-ecoba-cream mb-4">
                Find Your Next Opportunity
              </h1>
              <p className="text-ecoba-cream/80 max-w-2xl mx-auto text-lg">
                Explore exclusive job opportunities posted by ECOBA members and trusted employers
              </p>
            </div>
          </div>
        </section>

        {/* Jobs Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="mb-8">
              <JobFilters onSearch={setSearchQuery} onFilterChange={setFilters} />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> jobs
              </p>
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                  >
                    <JobCard job={job} featured={job.featured} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search or filters to find more opportunities
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
