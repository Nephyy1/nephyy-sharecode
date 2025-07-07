import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ExplorePage() {
  const supabase = createClient();
  const { data: snippets } = await supabase
    .from('snippets')
    .select(`
      id,
      title,
      short_id,
      description,
      language,
      created_at,
      profiles ( full_name, avatar_url )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Code Snippet Explorer</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
          Discover, share, and discuss code snippets from the community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets?.map((snippet) => {
          const profile = Array.isArray(snippet.profiles) ? snippet.profiles[0] : snippet.profiles;
          const userInitial = profile?.full_name?.charAt(0).toUpperCase() || 'A';

          return (
            <Card key={snippet.id} className="flex flex-col shadow-subtle hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="truncate hover:text-primary">
                      <Link href={`/s/${snippet.short_id}`}>{snippet.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">{snippet.description}</CardDescription>
                  </div>
                  <Link href={`/profile/${profile?.id}`} className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code2 className="w-4 h-4" />
                  <span>{snippet.language}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{profile?.full_name || 'Anonymous'}</span>
                  <span>{formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}</span>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/s/${snippet.short_id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
