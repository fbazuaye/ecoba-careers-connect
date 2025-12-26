import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

interface ProfileData {
  full_name: string;
  avatar_url: string | null;
}

interface MemberProfileData {
  bio: string | null;
  graduation_year: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
}

const ProfileInfoTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    avatar_url: null
  });
  const [memberData, setMemberData] = useState<MemberProfileData>({
    bio: null,
    graduation_year: null,
    linkedin_url: null,
    resume_url: null
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const [profileResult, memberResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('user_id', user?.id)
          .maybeSingle(),
        supabase
          .from('member_profiles')
          .select('bio, graduation_year, linkedin_url, resume_url')
          .eq('user_id', user?.id)
          .maybeSingle()
      ]);

      if (profileResult.error) throw profileResult.error;
      if (memberResult.error) throw memberResult.error;

      if (profileResult.data) {
        setProfileData({
          full_name: profileResult.data.full_name || '',
          avatar_url: profileResult.data.avatar_url
        });
      }

      if (memberResult.data) {
        setMemberData({
          bio: memberResult.data.bio,
          graduation_year: memberResult.data.graduation_year,
          linkedin_url: memberResult.data.linkedin_url,
          resume_url: memberResult.data.resume_url
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const [profileUpdate, memberUpdate] = await Promise.all([
        supabase
          .from('profiles')
          .update({
            full_name: profileData.full_name,
            avatar_url: profileData.avatar_url
          })
          .eq('user_id', user?.id),
        supabase
          .from('member_profiles')
          .update({
            bio: memberData.bio,
            graduation_year: memberData.graduation_year,
            linkedin_url: memberData.linkedin_url,
            resume_url: memberData.resume_url
          })
          .eq('user_id', user?.id)
      ]);

      if (profileUpdate.error) throw profileUpdate.error;
      if (memberUpdate.error) throw memberUpdate.error;

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
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
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your basic profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={profileData.full_name}
                onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduation_year">Graduation Year</Label>
              <Input
                id="graduation_year"
                value={memberData.graduation_year || ''}
                onChange={(e) => setMemberData({ ...memberData, graduation_year: e.target.value })}
                placeholder="e.g., 2010"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar_url">Profile Photo URL</Label>
              <Input
                id="avatar_url"
                type="url"
                value={profileData.avatar_url || ''}
                onChange={(e) => setProfileData({ ...profileData, avatar_url: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={memberData.linkedin_url || ''}
                onChange={(e) => setMemberData({ ...memberData, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume_url">Resume URL</Label>
            <Input
              id="resume_url"
              type="url"
              value={memberData.resume_url || ''}
              onChange={(e) => setMemberData({ ...memberData, resume_url: e.target.value })}
              placeholder="https://example.com/resume.pdf"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={memberData.bio || ''}
              onChange={(e) => setMemberData({ ...memberData, bio: e.target.value })}
              placeholder="Tell employers about yourself, your background, and what you're looking for..."
              rows={4}
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

export default ProfileInfoTab;
