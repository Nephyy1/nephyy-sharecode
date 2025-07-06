import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const userInitial = user.user_metadata.full_name?.charAt(0).toUpperCase() || user.email!.charAt(0).toUpperCase();
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
              <AvatarImage src={user.user_metadata.avatar_url} alt="User avatar" />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">{user.user_metadata.full_name || 'No Name Set'}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground font-medium">Full Name</p>
              <p className="font-semibold">{user.user_metadata.full_name || 'N/A'}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground font-medium">Email Address</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground font-medium">User ID</p>
              <p className="font-mono text-xs">{user.id}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground font-medium">Joined On</p>
              <p className="font-semibold">{joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
