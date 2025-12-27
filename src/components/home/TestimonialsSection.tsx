import { Star, Quote, Building2, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    type: 'employer',
    name: 'Dr. Emeka Ibe',
    role: 'Founder & CEO, TechVantage Solutions',
    quote: "We've hired 4 exceptional software engineers through ECOBA Careers. The quality of talent from the Old Boys network is outstanding - they come with not just skills, but the discipline and values instilled by Edo College. Our tech team is now 60% ECOBA alumni!",
    avatar: 'EI',
  },
  {
    type: 'employer',
    name: 'Mrs. Adesuwa Ogheneme',
    role: 'HR Director, First Capital Bank',
    quote: "ECOBA Careers has become our go-to platform for finding top-tier candidates. The alumni we've recruited demonstrate exceptional work ethic and professionalism. We've filled 3 senior management positions with outstanding Old Boys this year alone.",
    avatar: 'AO',
  },
  {
    type: 'jobseeker',
    name: 'Nosa Obasogie',
    role: 'Senior Financial Analyst at Sterling Bank',
    classYear: 'Class of 2014',
    quote: "After months of job searching, I decided to try ECOBA Careers. Within two weeks, I connected with a hiring manager who was also an Old Boy. The interview process was smooth, and I landed my dream role in finance. The ECOBA brotherhood truly opens doors!",
    avatar: 'NO',
  },
  {
    type: 'jobseeker',
    name: 'Yomi Bamidele',
    role: 'Project Manager at Dangote Industries',
    classYear: 'Class of 2016',
    quote: "ECOBA Careers changed my career trajectory. I was stuck in a role that wasn't growing, but through the platform, I found an opportunity at Dangote. A fellow Old Boy vouched for me, and now I'm managing multi-million naira projects. Proud to be an Old Boy!",
    avatar: 'YB',
  },
];

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const isEmployer = testimonial.type === 'employer';
  
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Quote Icon */}
        <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
        
        {/* Type Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
          isEmployer 
            ? 'bg-primary/10 text-primary' 
            : 'bg-amber-500/10 text-amber-600'
        }`}>
          {isEmployer ? (
            <>
              <Building2 className="w-3 h-3" />
              Employer
            </>
          ) : (
            <>
              <GraduationCap className="w-3 h-3" />
              Job Seeker
            </>
          )}
        </div>
        
        {/* Star Rating */}
        <StarRating />
        
        {/* Quote */}
        <blockquote className="mt-4 text-muted-foreground leading-relaxed text-sm">
          "{testimonial.quote}"
        </blockquote>
        
        {/* Author */}
        <div className="mt-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-semibold text-sm">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            {'classYear' in testimonial && (
              <p className="text-xs text-primary font-medium">{testimonial.classYear}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const employers = testimonials.filter(t => t.type === 'employer');
  const jobSeekers = testimonials.filter(t => t.type === 'jobseeker');

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Success Stories from Our Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how ECOBA Careers is connecting talent with opportunity. Real stories from employers and alumni who found success through our network.
          </p>
        </div>

        {/* Employer Testimonials */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            From Employers
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {employers.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Job Seeker Testimonials */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            From Job Seekers
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {jobSeekers.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
