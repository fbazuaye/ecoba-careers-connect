import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut, Settings, Briefcase } from 'lucide-react';
import ecobaLogo from '@/assets/ecoba-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, loading, signOut } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find Jobs' },
    { href: '/employers', label: 'For Employers' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
    setIsOpen(false);
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'employer':
        return 'Employer';
      case 'member':
        return 'Member';
      default:
        return null;
    }
  };

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
            {loading ? (
              <div className="h-10 w-24 bg-ecoba-gold/20 rounded-lg animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-ecoba-cream/90 hover:text-ecoba-gold hover:bg-ecoba-gold/10 gap-2">
                    <div className="w-8 h-8 rounded-full bg-ecoba-gold/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-ecoba-gold" />
                    </div>
                    <span className="hidden xl:inline">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.user_metadata?.full_name || 'User'}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                      {role && (
                        <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-ecoba-green/10 text-ecoba-green w-fit">
                          {getRoleBadge()}
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  {role === 'employer' && (
                    <DropdownMenuItem asChild>
                      <Link to="/employer/dashboard" className="cursor-pointer">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
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
                {loading ? (
                  <div className="h-10 bg-ecoba-gold/20 rounded-lg animate-pulse" />
                ) : user ? (
                  <>
                    <div className="px-4 py-2 text-ecoba-cream/80">
                      <p className="font-medium text-ecoba-gold">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs">{user.email}</p>
                      {role && (
                        <span className="mt-1 inline-block text-xs px-2 py-0.5 rounded-full bg-ecoba-gold/20 text-ecoba-gold">
                          {getRoleBadge()}
                        </span>
                      )}
                    </div>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full text-ecoba-cream/90 hover:text-ecoba-gold justify-start gap-2">
                        <User className="w-4 h-4" />
                        My Profile
                      </Button>
                    </Link>
                    {role === 'employer' && (
                      <Link to="/employer/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full text-ecoba-cream/90 hover:text-ecoba-gold justify-start gap-2">
                          <Briefcase className="w-4 h-4" />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 justify-start gap-2"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
