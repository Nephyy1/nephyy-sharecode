"use client";

import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LoaderCircle } from "lucide-react";

type SettingsFormProps = {
  user: User;
};

export function SettingsForm({ user }: SettingsFormProps) {
  const [fullName, setFullName] = useState(user.user_metadata.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata.avatar_url || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
      }
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Profile updated successfully!');
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl shadow-subtle">
      <form onSubmit={handleUpdateProfile}>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your name and avatar URL here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email!} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input id="avatarUrl" type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" disabled={isLoading} className="ml-auto btn-gradient">
            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
