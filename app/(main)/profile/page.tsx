import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Edit, ShieldCheck, Star, Baby, KeyRound } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserBadges } from "@/components/UserBadges";
import { ApiKeyDisplay } from "@/components/ApiKeyDisplay";

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

  let { data: apiKeyData } = await supabase
    .from('api_keys')
    .select('api_key')
    .eq('user_id', user.id)
    .single();

  if (!apiKeyData) {
    const { data: newApiKey, error } = await supabase
      .from('api_keys')
      .insert({ user_id: user.id })
      .select('api_key')
      .single();
    apiKeyData = newApiKey;
  }

  const userInitial = profile?.full_name?.charAt(0).toUpperCase() || user.email!.charAt(0).toUpperCase();
  
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 space-y-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        <Avatar className="w-32 h-32 text-5xl border-4 border-background shadow-lg">
          <AvatarImage src={profile?.avatar_url || ''} alt="User avatar" />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter">{profile?.full_name || 'Anonymous User'}</h1>
          <p className="text-lg text-muted-foreground mt-1">{user.email}</p>
          <div className="flex justify-center md:justify-start flex-wrap gap-2 mt-4">
            <UserBadges badges={profile?.user_badges || []} />
          </div>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/settings">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Your API Key</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-2">
              Use this key in the Authorization header to create snippets via the API. Keep it secret!
            </p>
        </div>
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              Bearer Token
            </CardTitle>
          </CardHeader>
          <CardContent>
            {apiKeyData?.api_key ? (
              <ApiKeyDisplay apiKey={apiKeyData.api_key} />
            ) : (
              <p className="text-destructive">Could not generate API key.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
