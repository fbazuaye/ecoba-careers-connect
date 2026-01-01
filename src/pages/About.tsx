import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ecobaLogo from '@/assets/ecoba-logo.png';
import { Users, Target, Heart, Shield, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Brotherhood',
      description: 'We believe in the power of our alumni network to support and uplift each other.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in connecting talent with opportunities.',
    },
    {
      icon: Heart,
      title: 'Service',
      description: 'Committed to giving back to our EC through meaningful career connections.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Trust and transparency are at the core of everything we do.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="ecoba-gradient-bg py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-ecoba-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="font-display text-3xl lg:text-5xl font-bold text-ecoba-cream mb-6">
                  Bridging Memories,<br />Building Futures
                </h1>
                <p className="text-lg lg:text-xl text-ecoba-cream/80 mb-8">
                  ECOBA Careers is the official job board of the Edo College Old Boys Association, connecting alumni with exclusive career opportunities since the founding of Edo College in 1937.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-ecoba-gold/20 rounded-full blur-3xl scale-125" />
                  <div className="relative bg-ecoba-green-light/20 rounded-full p-10 border border-ecoba-gold/20">
                    <img
                      src={ecobaLogo}
                      alt="ECOBA Crest"
                      className="w-48 h-48 lg:w-56 lg:h-56 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To create a trusted platform that empowers Edo College Old Boys to advance their careers through meaningful connections with fellow alumni and reputable employers. We aim to foster professional growth while strengthening the bonds of our cherished brotherhood.
              </p>
              <div className="inline-flex items-center gap-2 text-ecoba-gold font-medium">
                <span className="w-12 h-0.5 bg-ecoba-gold" />
                Since 1937
                <span className="w-12 h-0.5 bg-ecoba-gold" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our platform and community
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="p-6 text-center hover:shadow-lg hover:border-ecoba-gold/30 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <div className="w-14 h-14 rounded-full bg-ecoba-green/10 text-ecoba-green flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions about ECOBA Careers? We'd love to hear from you. Reach out to our team for support or inquiries.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-ecoba-green/10 text-ecoba-green flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">careers@ecoba.org</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-ecoba-green/10 text-ecoba-green flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">Edo College, Benin City, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-ecoba-green/10 text-ecoba-green flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">+234 800 000 0000</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 lg:p-8 bg-gradient-to-br from-card to-ecoba-gold/5 border-ecoba-gold/30">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Join ECOBA Careers Today
                </h3>
                <p className="text-muted-foreground mb-6">
                  Whether you're looking for your next career opportunity or seeking to hire exceptional talent from our alumni network, we're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/register" className="flex-1">
                    <Button variant="gold" className="w-full group">
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/jobs" className="flex-1">
                    <Button variant="green-outline" className="w-full">
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
