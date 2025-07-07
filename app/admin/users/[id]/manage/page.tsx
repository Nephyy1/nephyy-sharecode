import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserBadgeManager } from "@/components/admin/UserBadgeManager";
import { Badge } from "@/components/ui/badge";

export default async function ManageUserPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, user_badges(*, badges(*))')
    .eq('id', params.id)
    .single();

  const { data: allBadges } = await supabase.from('badges').select('*');

  if (!profile || !allBadges) {
    notFound();
  }

  const userInitial = profile.full_name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex justify-center items-start py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16 text-2xl">
            <AvatarImage src={profile.avatar_url || ''} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name || 'N/A'}</h1>
            <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>{profile.role}</Badge>
          </div>
        </div>
        <UserBadgeManager 
          userId={profile.id}
          allBadges={allBadges}
          currentUserBadges={profile.user_badges}
        />
      </div>
    </div>
  );
}
