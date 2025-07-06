import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';

export default async function ExplorePage() {
  const supabase = createClient();
  const { data: snippets } = await supabase
    .from('snippets')
    .select(`
      id,
      title,
      description,
      language,
      created_at,
      profiles ( id, full_name, avatar_url )
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
        {snippets?.map((snippet) => (
          <Card key={snippet.id} className="flex flex-col shadow-subtle hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="truncate">{snippet.title}</CardTitle>
              <CardDescription className="line-clamp-2">{snippet.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code2 className="w-4 h-4" />
                <span>{snippet.language}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4">
              <span>{formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}</span>
              <Button asChild variant="secondary" size="sm">
                <Link href={`/explore/${snippet.id}`}>View Snippet</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
