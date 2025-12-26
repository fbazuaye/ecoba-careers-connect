import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ecobaLogo from '@/assets/ecoba-logo.png';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, GraduationCap, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z.object({
  fullName: z.string().trim().min(2, { message: 'Full name must be at least 2 characters' }).max(100),
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  role: z.enum(['member', 'employer']),
  graduationYear: z.string().max(50).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member' as 'member' | 'employer',
    graduationYear: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      role: formData.role,
      graduation_year: formData.role === 'member' ? formData.graduationYear : undefined,
    });
    
    if (error) {
      if (error.message.includes('User already registered')) {
        toast.error('An account with this email already exists. Please sign in instead.');
      } else if (error.message.includes('Password')) {
        toast.error('Password must be at least 6 characters');
      } else {
        toast.error(error.message);
      }
      setIsLoading(false);
      return;
    }
    
    toast.success('Account created successfully! Welcome to ECOBA Careers.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <div className="text-center lg:text-left mb-8">
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Join ECOBA Careers
                </h1>
                <p className="text-muted-foreground">
                  Create your account to access exclusive opportunities
                </p>
              </div>

              <Card className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label>I am a...</Label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={(value) => handleChange('role', value)}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="relative">
                        <RadioGroupItem value="member" id="member" className="peer sr-only" />
                        <Label
                          htmlFor="member"
                          className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-border cursor-pointer transition-all hover:border-ecoba-green/50 peer-data-[state=checked]:border-ecoba-green peer-data-[state=checked]:bg-ecoba-green/5"
                        >
                          <GraduationCap className="w-6 h-6 text-ecoba-green" />
                          <span className="font-medium">Job Seeker</span>
                          <span className="text-xs text-muted-foreground">ECOBA Member</span>
                        </Label>
                      </div>
                      <div className="relative">
                        <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
                        <Label
                          htmlFor="employer"
                          className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-border cursor-pointer transition-all hover:border-ecoba-gold/50 peer-data-[state=checked]:border-ecoba-gold peer-data-[state=checked]:bg-ecoba-gold/5"
                        >
                          <Building2 className="w-6 h-6 text-ecoba-gold" />
                          <span className="font-medium">Employer</span>
                          <span className="text-xs text-muted-foreground">Hire talent</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  {formData.role === 'member' && (
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">ECOBA Set/Graduation Year</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="graduationYear"
                          type="text"
                          placeholder="e.g., Set 2005"
                          value={formData.graduationYear}
                          onChange={(e) => handleChange('graduationYear', e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    className="w-full h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-ecoba-green hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-ecoba-green hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-ecoba-green hover:text-ecoba-gold font-medium transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Card>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-ecoba-gold/10 rounded-full blur-3xl scale-150" />
                <div className="relative ecoba-gradient-bg rounded-2xl p-12 border border-ecoba-gold/20">
                  <img
                    src={ecobaLogo}
                    alt="ECOBA Crest"
                    className="w-40 h-40 object-contain mx-auto mb-8"
                  />
                  <div className="text-center">
                    <h2 className="font-display text-2xl font-bold text-ecoba-cream mb-4">
                      Join 2,800+ Alumni
                    </h2>
                    <ul className="text-left space-y-3 text-ecoba-cream/80">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-ecoba-gold" />
                        Access exclusive job listings
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-ecoba-gold" />
                        Connect with alumni mentors
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-ecoba-gold" />
                        Build your professional profile
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-ecoba-gold" />
                        Get career support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
