import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Briefcase, Clock, DollarSign, Building2, Wifi } from 'lucide-react';
import { Job } from '@/lib/data';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard = ({ job, featured }: JobCardProps) => {
  const getTypeBadgeVariant = (type: Job['type']) => {
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

  const formatType = (type: Job['type']) => {
    return type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      featured ? 'border-ecoba-gold/40 bg-gradient-to-br from-card to-ecoba-gold/5' : 'border-border hover:border-ecoba-green/30'
    }`}>
      {featured && (
        <div className="absolute top-0 right-0">
          <Badge variant="gold" className="rounded-none rounded-bl-lg">
            Featured
          </Badge>
        </div>
      )}
      
      <div className="p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <Link to={`/jobs/${job.id}`}>
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-ecoba-green transition-colors line-clamp-1">
                {job.title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">{job.company}</p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={getTypeBadgeVariant(job.type)}>
            {formatType(job.type)}
          </Badge>
          {job.remote && (
            <Badge variant="remote" className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              Remote
            </Badge>
          )}
          <Badge variant="secondary">{job.category}</Badge>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Apply by {new Date(job.deadline).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {job.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {job.applicationsCount} applicants
          </span>
          <Link to={`/jobs/${job.id}`}>
            <Button variant="green-outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
