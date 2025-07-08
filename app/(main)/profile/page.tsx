import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Edit, Code2, MessageSquare } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserBadges } from "@/components/UserBadges";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";

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
  
  const { data: snippets } = await supabase
    .from('snippets')
    .select('title, short_id, language, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { data: topics } = await supabase
    .from('forum_topics')
    .select('title, id, created_at, forum_categories(title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const userInitial = profile?.full_name?.charAt(0).toUpperCase() || user.email!.charAt(0).toUpperCase();

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-12">
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

      <Tabs defaultValue="snippets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="snippets">My Snippets ({snippets?.length || 0})</TabsTrigger>
          <TabsTrigger value="forums">My Forum Topics ({topics?.length || 0})</TabsTrigger>
        </TabsList>
        <TabsContent value="snippets">
          <Card>
            <CardContent className="p-4 space-y-4">
              {snippets && snippets.length > 0 ? (
                snippets.map(snippet => (
                  <div key={snippet.short_id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
                    <div>
                      <Link href={`/s/${snippet.short_id}`} className="font-semibold hover:underline">{snippet.title}</Link>
                      <p className="text-sm text-muted-foreground">{snippet.language} • {formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}</p>
                    </div>
                    <Code2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No snippets created yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forums">
          <Card>
            <CardContent className="p-4 space-y-4">
              {topics && topics.length > 0 ? (
                topics.map(topic => (
                  <div key={topic.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50">
                    <div>
                      <Link href={`/forums/topic/${topic.id}`} className="font-semibold hover:underline">{topic.title}</Link>
                      <p className="text-sm text-muted-foreground">{topic.forum_categories?.title} • {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}</p>
                    </div>
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No topics created yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
