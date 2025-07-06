import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatDistanceToNow } from 'date-fns';
import { SnippetActions } from "@/components/SnippetActions";

export const dynamic = 'force-dynamic';

export default async function SnippetDetailPage({ params }: { params: { short_id: string } }) {
  const supabase = createClient();

  const { data: snippet } = await supabase
    .from('snippets')
    .select(`
      id,
      title,
      description,
      language,
      code,
      created_at,
      is_public,
      profiles ( full_name, avatar_url )
    `)
    .eq('short_id', params.short_id)
    .single();

  if (!snippet) {
    notFound();
  }

  const profile = Array.isArray(snippet.profiles) ? snippet.profiles[0] : snippet.profiles;
  const userInitial = profile?.full_name?.charAt(0).toUpperCase() || 'A';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
           <h1 className="text-2xl font-bold tracking-tight">{snippet.title}</h1>
           <SnippetActions />
        </div>
        <Card className="shadow-subtle">
          <CardHeader>
            {snippet.is_public && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <span>{profile?.full_name || 'Anonymous'}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}</span>
              </div>
            )}
            {!snippet.is_public && (
               <div className="text-sm text-muted-foreground">
                 Private snippet created {formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}
               </div>
            )}
            <CardDescription className="pt-4 text-base">{snippet.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden bg-[#1E1E1E]">
              <SyntaxHighlighter language={snippet.language.toLowerCase()} style={vscDarkPlus} showLineNumbers>
                {snippet.code}
              </SyntaxHighlighter>
            </div>
          </CardContent>
        </Card>
        
        {snippet.is_public && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments & Votes</h2>
          </div>
        )}
      </div>
    </div>
  );
}
