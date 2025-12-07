import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, Briefcase, Users, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Join the Network',
      description: 'Verify your Edo College alumni status and create your professional profile.',
      color: 'bg-ecoba-green/10 text-ecoba-green',
    },
    {
      icon: Briefcase,
      title: 'Find Opportunities',
      description: 'Browse exclusive job listings from fellow alumni and trusted employers.',
      color: 'bg-ecoba-gold/10 text-ecoba-gold',
    },
    {
      icon: Users,
      title: 'Connect & Network',
      description: 'Leverage our alumni network for referrals, mentorship, and career advice.',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: CheckCircle,
      title: 'Grow Your Career',
      description: 'Land your dream role with the support of your ECOBA brothers.',
      color: 'bg-emerald-500/10 text-emerald-500',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How ECOBA Careers Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, trusted process designed exclusively for Edo College Old Boys
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative bg-card rounded-xl p-6 border border-border hover:border-ecoba-gold/30 transition-all duration-300 hover:shadow-lg h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-ecoba-gold text-ecoba-dark text-sm font-bold flex items-center justify-center shadow-md">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${step.color} mb-4`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link to="/register">
            <Button variant="gold" size="lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
