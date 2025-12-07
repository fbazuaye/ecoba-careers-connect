import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Briefcase, Users } from 'lucide-react';
import ecobaLogo from '@/assets/ecoba-logo.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center ecoba-gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ecoba-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ecoba-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ecoba-gold/10 border border-ecoba-gold/30 text-ecoba-gold text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Exclusive Alumni Network
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-ecoba-cream leading-tight mb-6">
              Your Career,{' '}
              <span className="ecoba-text-gradient">Our Legacy</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-ecoba-cream/80 max-w-xl mx-auto lg:mx-0 mb-8">
              Connect with fellow Edo College Old Boys for exclusive job opportunities, mentorship, and career advancement within our trusted alumni network.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/jobs">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  <Search className="w-5 h-5" />
                  Find Jobs
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/employers">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  <Briefcase className="w-5 h-5" />
                  Post a Job
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-ecoba-cream/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm">Verified Members Only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ecoba-gold" />
                <span className="text-sm">2,800+ Alumni</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ecoba-gold" />
                <span className="text-sm">Since 1937</span>
              </div>
            </div>
          </div>

          {/* Right Content - Logo & Visual */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-ecoba-gold/20 rounded-full blur-3xl scale-150" />
              
              {/* Logo */}
              <div className="relative bg-ecoba-green-light/20 rounded-full p-8 lg:p-12 border border-ecoba-gold/20 backdrop-blur-sm">
                <img
                  src={ecobaLogo}
                  alt="ECOBA Crest"
                  className="w-48 h-48 lg:w-64 lg:h-64 object-contain animate-pulse-gold"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-ecoba-green/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-ecoba-green" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">New Jobs</div>
                    <div className="font-semibold text-foreground">156+</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border animate-slide-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-ecoba-gold/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-ecoba-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Connected</div>
                    <div className="font-semibold text-foreground">2,847</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
