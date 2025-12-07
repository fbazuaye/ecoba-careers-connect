import { Link } from 'react-router-dom';
import ecobaLogo from '@/assets/ecoba-logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-ecoba-green-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={ecobaLogo} alt="ECOBA Crest" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-ecoba-gold font-display font-bold text-xl leading-tight">
                  ECOBA
                </span>
                <span className="text-ecoba-cream/80 text-sm font-medium -mt-0.5">
                  Careers
                </span>
              </div>
            </Link>
            <p className="text-ecoba-cream/60 text-sm leading-relaxed">
              Connecting Edo College Old Boys with exclusive career opportunities within our trusted alumni network.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-ecoba-gold font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2.5">
              {['Browse Jobs', 'Create Profile', 'Resume Builder', 'Career Resources'].map((item) => (
                <li key={item}>
                  <Link
                    to="/jobs"
                    className="text-ecoba-cream/70 hover:text-ecoba-gold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-ecoba-gold font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2.5">
              {['Post a Job', 'Browse Candidates', 'Employer Dashboard', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link
                    to="/employers"
                    className="text-ecoba-cream/70 hover:text-ecoba-gold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ECOBA */}
          <div>
            <h4 className="text-ecoba-gold font-semibold mb-4">ECOBA</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link
                    to="/about"
                    className="text-ecoba-cream/70 hover:text-ecoba-gold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ecoba-green-light/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ecoba-cream/50 text-sm">
            © {new Date().getFullYear()} ECOBA Careers. All rights reserved.
          </p>
          <p className="text-ecoba-cream/50 text-sm">
            Bridging Memories, Building Futures
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
