import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Edit, ShieldCheck, Star, Baby } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const badgeIcons: { [key: string]: React.ReactNode } = {
  Admin: <ShieldCheck className="w-4 h-4 mr-1.5" />,
  Expert: <Star className="w-4 h-4 mr-1.5" />,
  Rookie: <Baby className="w-4 h-4 mr-1.5" />,
};

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, user_badges(*, badges(*))')
    .eq('id', user.id)
    .single();

  const userInitial = profile?.full_name?.charAt(0).toUpperCase() || user.email!.charAt(0).toUpperCase();
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex justify-center items-start py-8 px-4">
      <Card className="w-full max-w-2xl shadow-subtle">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>View and manage your profile details.</CardDescription>
          </div>
          <Button asChild variant="outline" size="icon">
            <Link href="/settings">
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24 text-3xl">
              <AvatarImage src={profile?.avatar_url || ''} alt="User avatar" />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{profile?.full_name || 'No Name Set'}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {profile?.user_badges.map(userBadge => (
                  <Badge key={userBadge.badge_id} variant="secondary" className="flex items-center">
                    {badgeIcons[userBadge.badges?.name || ''] || null}
                    {userBadge.badges?.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
