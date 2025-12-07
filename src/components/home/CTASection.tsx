import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Users } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 ecoba-gradient-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ecoba-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ecoba-gold rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* For Job Seekers */}
          <div className="bg-ecoba-green-light/20 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-ecoba-gold/20 animate-slide-up">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ecoba-gold/20 text-ecoba-gold mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-ecoba-cream mb-4">
              For ECOBA Members
            </h3>
            <p className="text-ecoba-cream/80 mb-6 leading-relaxed">
              Access exclusive job opportunities, connect with alumni in your industry, and leverage the ECOBA network for career advancement.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Exclusive alumni-only job listings',
                'Build your professional profile',
                'Connect with mentors in your field',
                'Get referrals from fellow Old Boys',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-ecoba-cream/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-ecoba-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/register">
              <Button variant="hero" size="lg" className="group">
                Create Your Profile
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* For Employers */}
          <div className="bg-ecoba-green-light/20 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-ecoba-gold/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ecoba-gold/20 text-ecoba-gold mb-6">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-ecoba-cream mb-4">
              For Employers
            </h3>
            <p className="text-ecoba-cream/80 mb-6 leading-relaxed">
              Hire from a pool of verified, qualified alumni. Post jobs, review applications, and find the perfect candidates within our trusted network.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Access verified alumni candidates',
                'Post unlimited job listings',
                'Streamlined application management',
                'Support the ECOBA community',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-ecoba-cream/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-ecoba-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/employers">
              <Button variant="hero-outline" size="lg" className="group">
                Post a Job
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
