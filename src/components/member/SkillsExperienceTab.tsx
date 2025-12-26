import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Save, Plus, X } from 'lucide-react';

interface MemberProfileData {
  skills: string[] | null;
  experience: string | null;
  education: string | null;
}

const SkillsExperienceTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [memberData, setMemberData] = useState<MemberProfileData>({
    skills: null,
    experience: null,
    education: null
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('member_profiles')
        .select('skills, experience, education')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setMemberData({
          skills: data.skills,
          experience: data.experience,
          education: data.education
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    const skills = memberData.skills || [];
    if (skills.includes(newSkill.trim())) {
      toast.error('Skill already added');
      return;
    }
    
    setMemberData({
      ...memberData,
      skills: [...skills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const skills = memberData.skills || [];
    setMemberData({
      ...memberData,
      skills: skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('member_profiles')
        .update({
          skills: memberData.skills,
          experience: memberData.experience,
          education: memberData.education
        })
        .eq('user_id', user?.id);

      if (error) throw error;

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
        <CardTitle>Skills & Experience</CardTitle>
        <CardDescription>
          Showcase your skills and professional experience to employers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill (e.g., JavaScript, Project Management)"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {memberData.skills && memberData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memberData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="pr-1.5">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Work Experience</Label>
            <Textarea
              id="experience"
              value={memberData.experience || ''}
              onChange={(e) => setMemberData({ ...memberData, experience: e.target.value })}
              placeholder="Describe your work experience, roles, and achievements...

Example:
Senior Software Engineer at Tech Company (2020-Present)
- Led development of key features
- Managed team of 5 developers

Software Developer at Startup (2018-2020)
- Built full-stack applications
- Implemented CI/CD pipelines"
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={memberData.education || ''}
              onChange={(e) => setMemberData({ ...memberData, education: e.target.value })}
              placeholder="List your educational background...

Example:
Edo College, Benin City (Class of 2010)

University of Lagos
B.Sc. Computer Science (2014)

MIT Sloan School of Management
MBA (2020)"
              rows={6}
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

export default SkillsExperienceTab;
