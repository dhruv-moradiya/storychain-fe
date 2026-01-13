import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Pencil, Save, X } from 'lucide-react';

export function ProfileCard() {
  const { user } = useUser();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [name, setName] = useState(user?.fullName || user?.username || '');
  const [bio, setBio] = useState('');

  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <div className="mb-4">
        <h2 className="text-text-primary text-base font-semibold">Profile</h2>
        <p className="text-text-secondary-65 text-sm">Your public profile information</p>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="group relative">
            <Avatar className="ring-background h-20 w-20 shadow-md ring-4">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-xl">
                {user?.firstName?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>

            <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              <Camera className="h-5 w-5 text-white" />
            </button>
          </div>

          <div>
            <p className="text-text-primary text-sm font-medium">Profile Photo</p>
            <p className="text-text-secondary-65 text-xs">JPG, PNG or GIF. Max size 2MB.</p>
            <Button variant="outline" size="sm" className="mt-2">
              <Camera className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="text-text-primary">Display Name</Label>
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Button
                  size="icon"
                  className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                  onClick={() => setIsEditingName(false)}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsEditingName(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <p className="text-text-primary text-sm">{name || 'Not set'}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-brand-pink-500/10 hover:text-brand-pink-500"
                  onClick={() => setIsEditingName(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label className="text-text-primary">Bio</Label>
          {isEditingBio ? (
            <>
              <Textarea
                value={bio}
                rows={3}
                className="resize-none"
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setIsEditingBio(false)}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingBio(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-start gap-2">
              <p className="text-text-secondary-65 text-sm">
                {bio || 'No bio set. Add a short description.'}
              </p>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-brand-pink-500/10 hover:text-brand-pink-500"
                onClick={() => setIsEditingBio(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
