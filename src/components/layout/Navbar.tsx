import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Briefcase, User, Building2, Shield } from 'lucide-react';
import ecobaLogo from '@/assets/ecoba-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find Jobs' },
    { href: '/employers', label: 'For Employers' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-ecoba-green-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={ecobaLogo} 
              alt="ECOBA Crest" 
              className="h-10 lg:h-12 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-ecoba-gold font-display font-bold text-lg lg:text-xl leading-tight">
                ECOBA
              </span>
              <span className="text-ecoba-cream/80 text-xs lg:text-sm font-medium -mt-0.5">
                Careers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-ecoba-gold bg-ecoba-gold/10'
                    : 'text-ecoba-cream/80 hover:text-ecoba-gold hover:bg-ecoba-gold/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-ecoba-cream/90 hover:text-ecoba-gold hover:bg-ecoba-gold/10">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gold" size="default">
                Join ECOBA Careers
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-ecoba-cream hover:bg-ecoba-gold/10 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-ecoba-green-light/20 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-ecoba-gold bg-ecoba-gold/10'
                      : 'text-ecoba-cream/80 hover:text-ecoba-gold hover:bg-ecoba-gold/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-ecoba-green-light/20">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-ecoba-cream/90 hover:text-ecoba-gold">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="gold" className="w-full">
                    Join ECOBA Careers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
