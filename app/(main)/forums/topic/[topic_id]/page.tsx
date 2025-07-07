import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ReplyForm } from "@/components/ReplyForm";
import { DeleteTopicButton } from "@/components/DeleteTopicButton";

function PostCard({ post, isOP = false }: { post: any, isOP?: boolean }) {
  const author = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
  const authorInitial = author?.full_name?.charAt(0).toUpperCase() || 'A';

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author?.avatar_url || ''} />
          <AvatarFallback>{authorInitial}</AvatarFallback>
        </Avatar>
        {isOP && <Badge variant="secondary" className="mt-2">Author</Badge>}
      </div>
      <div className="flex-1 p-4 border rounded-lg bg-card">
        <div className="flex items-baseline gap-2 text-sm">
          <p className="font-semibold">{author?.full_name || 'Anonymous'}</p>
          <p className="text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none mt-2">
          {post.content}
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default async function TopicPage({ params }: { params: { topic_id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: topic } = await supabase
    .from('forum_topics')
    .select('*, profiles (full_name)')
    .eq('id', params.topic_id)
    .single();

  if (!topic) {
    notFound();
  }

  const { data: posts } = await supabase
    .from('forum_posts')
    .select('*, profiles (full_name, avatar_url)')
    .eq('topic_id', params.topic_id)
    .order('created_at', { ascending: true });

  const originalPost = posts?.[0];
  const replies = posts?.slice(1) || [];
  const isOwner = user?.id === topic.user_id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold tracking-tighter break-words">{topic.title}</h1>
          {isOwner && <DeleteTopicButton topicId={topic.id} />}
        </div>
        <p className="text-muted-foreground">
          A topic started by {topic.profiles?.full_name || 'Anonymous'}
        </p>
        {topic.image_url && (
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <img src={topic.image_url} alt={topic.title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-8">
        {originalPost && <PostCard post={originalPost} isOP={true} />}
        
        {replies.length > 0 && (
          <div className="pl-4 md:pl-16 space-y-8">
            {replies.map((reply) => (
              <PostCard key={reply.id} post={reply} />
            ))}
          </div>
        )}

        {user ? (
          <div className="pt-8 border-t">
             <ReplyForm topicId={topic.id} user={user} />
          </div>
        ) : (
          <div className="text-center pt-8 border-t">
            <p className="text-muted-foreground">
              <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link> or <Link href="/register" className="font-semibold text-primary hover:underline">Sign up</Link> to join the discussion.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
