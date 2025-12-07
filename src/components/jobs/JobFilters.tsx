import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { jobCategories } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  type: string;
  location: string;
  remote: boolean | null;
  category: string;
}

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const locations = ['All Locations', 'Lagos', 'Benin City', 'Abuja', 'Port Harcourt', 'Remote'];

const JobFilters = ({ onSearch, onFilterChange }: JobFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    location: '',
    remote: null,
    category: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FilterState, value: string | boolean | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      type: '',
      location: '',
      remote: null,
      category: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters.type || filters.location || filters.remote !== null || filters.category;

  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs by title, company, or keywords..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12 bg-background"
          />
        </div>
        <Button
          variant="outline"
          className="lg:hidden flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="gold" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange('type', value === 'All Types' ? '' : value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.location}
            onValueChange={(value) => handleFilterChange('location', value === 'All Locations' ? '' : value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange('category', value === 'All Categories' ? '' : value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {jobCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={filters.remote === true ? 'gold' : 'outline'}
              className="flex-1 h-10"
              onClick={() => handleFilterChange('remote', filters.remote === true ? null : true)}
            >
              Remote Only
            </Button>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {filters.type && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.type}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('type', '')}
                  />
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.location}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('location', '')}
                  />
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('category', '')}
                  />
                </Badge>
              )}
              {filters.remote && (
                <Badge variant="remote" className="flex items-center gap-1">
                  Remote
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('remote', null)}
                  />
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
