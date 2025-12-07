import { Briefcase, Users, Building2, Award } from 'lucide-react';
import { stats } from '@/lib/data';

const StatsSection = () => {
  const statItems = [
    {
      icon: Briefcase,
      value: stats.totalJobs,
      label: 'Active Jobs',
      suffix: '+',
    },
    {
      icon: Users,
      value: stats.totalMembers,
      label: 'ECOBA Members',
      suffix: '+',
    },
    {
      icon: Building2,
      value: stats.companiesHiring,
      label: 'Companies Hiring',
      suffix: '+',
    },
    {
      icon: Award,
      value: stats.placementsThisYear,
      label: 'Placements This Year',
      suffix: '',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Empowering ECOBA Alumni Careers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Edo College Old Boys who have found their next opportunity through our exclusive network.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statItems.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-card rounded-xl p-6 lg:p-8 border border-border hover:border-ecoba-gold/30 transition-all duration-300 hover:shadow-lg text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-ecoba-green/10 text-ecoba-green mb-4 group-hover:bg-ecoba-gold/10 group-hover:text-ecoba-gold transition-colors">
                <stat.icon className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-sm lg:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
