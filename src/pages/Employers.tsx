import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Briefcase,
  Users,
  CheckCircle,
  ArrowRight,
  Target,
  Shield,
  BarChart3,
  Clock,
} from 'lucide-react';

const Employers = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Verified Alumni Pool',
      description: 'Access a network of verified Edo College Old Boys with diverse professional backgrounds.',
    },
    {
      icon: Target,
      title: 'Targeted Reach',
      description: 'Connect directly with qualified candidates who share your values and educational heritage.',
    },
    {
      icon: Shield,
      title: 'Trusted Network',
      description: 'Hire from a community built on trust, integrity, and shared history.',
    },
    {
      icon: BarChart3,
      title: 'Application Insights',
      description: 'Track applications, manage candidates, and make data-driven hiring decisions.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      period: '',
      description: 'Perfect for getting started',
      features: ['1 active job posting', 'Basic applicant tracking', 'Email notifications', '30-day listing'],
      featured: false,
    },
    {
      name: 'Professional',
      price: '₦50,000',
      period: '/month',
      description: 'For growing companies',
      features: [
        '5 active job postings',
        'Featured job listings',
        'Advanced applicant tracking',
        'Priority support',
        'Candidate search',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited job postings',
        'Dedicated account manager',
        'API access',
        'Custom branding',
        'Analytics dashboard',
        'Recruitment consultation',
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="ecoba-gradient-bg py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-ecoba-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="gold" className="mb-6">
                <Building2 className="w-4 h-4 mr-1" />
                For Employers
              </Badge>
              <h1 className="font-display text-3xl lg:text-5xl font-bold text-ecoba-cream mb-6">
                Hire Top Talent from the ECOBA Network
              </h1>
              <p className="text-lg lg:text-xl text-ecoba-cream/80 mb-8">
                Post jobs and connect with verified Edo College alumni. Find candidates who share your values and commitment to excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="hero" size="xl">
                    <Briefcase className="w-5 h-5" />
                    Post a Job
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="hero-outline" size="xl">
                    Employer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Hire Through ECOBA Careers?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access a unique talent pool of verified professionals with shared values
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  className="p-6 hover:shadow-lg hover:border-ecoba-gold/30 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-ecoba-green/10 text-ecoba-green flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your hiring needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`p-6 lg:p-8 relative transition-all duration-300 animate-slide-up ${
                    plan.featured
                      ? 'border-ecoba-gold shadow-lg scale-105 bg-gradient-to-br from-card to-ecoba-gold/5'
                      : 'hover:border-ecoba-green/30 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  {plan.featured && (
                    <Badge variant="gold" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-ecoba-green flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.featured ? 'gold' : 'green-outline'}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Find Your Next Great Hire?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join leading companies already hiring through the ECOBA network
            </p>
            <Link to="/register">
              <Button variant="gold" size="xl" className="group">
                Post Your First Job
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Employers;
