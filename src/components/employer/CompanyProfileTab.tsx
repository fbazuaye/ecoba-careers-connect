import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

interface EmployerProfile {
  id: string;
  company_name: string;
  company_description: string | null;
  company_website: string | null;
  company_logo_url: string | null;
  industry: string | null;
  company_size: string | null;
  location: string | null;
}

const industries = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Real Estate',
  'Legal',
  'Media & Entertainment',
  'Other'
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
];

const CompanyProfileTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    company_description: '',
    company_website: '',
    company_logo_url: '',
    industry: '',
    company_size: '',
    location: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('employer_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFormData({
          company_name: data.company_name || '',
          company_description: data.company_description || '',
          company_website: data.company_website || '',
          company_logo_url: data.company_logo_url || '',
          industry: data.industry || '',
          company_size: data.company_size || '',
          location: data.location || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('employer_profiles')
        .update({
          company_name: formData.company_name,
          company_description: formData.company_description || null,
          company_website: formData.company_website || null,
          company_logo_url: formData.company_logo_url || null,
          industry: formData.industry || null,
          company_size: formData.company_size || null,
          location: formData.location || null
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast.success('Company profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update company profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>
          Update your company information to attract the best alumni talent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Lagos, Nigeria"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_size">Company Size</Label>
              <Select
                value={formData.company_size}
                onValueChange={(value) => setFormData({ ...formData, company_size: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_website">Website</Label>
              <Input
                id="company_website"
                type="url"
                value={formData.company_website}
                onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_logo_url">Logo URL</Label>
              <Input
                id="company_logo_url"
                type="url"
                value={formData.company_logo_url}
                onChange={(e) => setFormData({ ...formData, company_logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_description">Company Description</Label>
            <Textarea
              id="company_description"
              value={formData.company_description}
              onChange={(e) => setFormData({ ...formData, company_description: e.target.value })}
              placeholder="Tell alumni about your company, culture, and what makes it a great place to work..."
              rows={5}
            />
          </div>

          <Button type="submit" disabled={saving} className="w-full sm:w-auto">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyProfileTab;
