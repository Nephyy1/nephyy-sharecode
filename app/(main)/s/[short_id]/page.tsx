import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatDistanceToNow } from 'date-fns';
import { VoteComponent } from "@/components/VoteComponent";
import { CommentSection } from "@/components/CommentSection";
import { Badge } from "@/components/ui/badge";
import { SnippetActionButtons } from "@/components/SnippetActionButtons";

export const dynamic = 'force-dynamic';

export default async function SnippetDetailPage({ params }: { params: { short_id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: snippet } = await supabase
    .from('snippets')
    .select(`
      id,
      user_id,
      title,
      description,
      language,
      code,
      created_at,
      is_public,
      short_id,
      profiles ( full_name, avatar_url )
    `)
    .eq('short_id', params.short_id)
    .single();

  if (!snippet) {
    notFound();
  }
  
  let initialVotesData = null;
  if(snippet.is_public) {
    const { data } = await supabase
      .from('snippet_votes')
      .select('score')
      .eq('snippet_id', snippet.id)
      .single();
    initialVotesData = data;
  }
  
  let userVoteData = null;
  if(snippet.is_public && user) {
    const { data } = await supabase
      .from('votes')
      .select('vote_type')
      .eq('snippet_id', snippet.id)
      .eq('user_id', user.id)
      .single();
    userVoteData = data;
  }

  let commentsData = null;
  if(snippet.is_public) {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(*)')
      .eq('snippet_id', snippet.id)
      .order('created_at', { ascending: false });
    commentsData = data;
  }

  const profile = Array.isArray(snippet.profiles) ? snippet.profiles[0] : snippet.profiles;
  const userInitial = profile?.full_name?.charAt(0).toUpperCase() || 'A';
  const isOwner = user?.id === snippet.user_id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-4">
           <h1 className="text-4xl font-bold tracking-tighter break-words">{snippet.title}</h1>
           {snippet.description && <p className="text-xl text-muted-foreground">{snippet.description}</p>}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {(snippet.is_public && profile) ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={profile.avatar_url || ''} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{profile.full_name || 'Anonymous'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                 <Avatar className="w-8 h-8">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span className="font-medium">Anonymous</span>
              </div>
            )}
            <Badge variant="secondary">{snippet.language}</Badge>
            <span className="text-muted-foreground">{formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}</span>
          </div>
          <SnippetActionButtons code={snippet.code} isOwner={isOwner} snippetId={snippet.id} shortId={snippet.short_id} />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          {snippet.is_public && (
            <VoteComponent 
              snippetId={snippet.id} 
              initialVotes={initialVotesData?.score || 0}
              initialUserVote={userVoteData?.vote_type || 0}
              user={user} 
            />
          )}
          <div className="flex-1 w-full">
            <Card className="shadow-subtle overflow-hidden">
              <CardContent className="p-0">
                <div className="rounded-lg overflow-hidden bg-[#1E1E1E]">
                  <SyntaxHighlighter language={snippet.language.toLowerCase()} style={vscDarkPlus} customStyle={{ margin: 0 }}>
                    {snippet.code}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {snippet.is_public && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Comments ({commentsData?.length || 0})</h2>
            <CommentSection snippetId={snippet.id} initialComments={commentsData || []} user={user} />
          </div>
        )}
      </div>
    </div>
  );
}
