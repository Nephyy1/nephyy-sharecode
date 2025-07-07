"use client";

import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database.types";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoaderCircle, Send } from "lucide-react";

type Profile = Tables<'profiles'>;
type CommentWithProfile = Tables<'comments'> & { profiles: Profile | null };

type CommentSectionProps = {
  snippetId: string;
  initialComments: CommentWithProfile[];
  user: User | null;
};

export function CommentSection({ snippetId, initialComments, user }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handlePostComment = async () => {
    if (!user || !newComment.trim()) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .insert({
        content: newComment,
        user_id: user.id,
        snippet_id: snippetId,
      })
      .select('*, profiles(*)')
      .single();

    if (data) {
      setComments([data as CommentWithProfile, ...comments]);
      setNewComment("");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {user ? (
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handlePostComment} disabled={isLoading || !newComment.trim()} className="self-end">
            {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="text-center p-4 border rounded-lg bg-muted/50">
          <p>
            <Button variant="link" asChild className="p-0 h-auto"><a href="/login">Log in</a></Button> to post a comment.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.profiles?.avatar_url || ''} />
              <AvatarFallback>{comment.profiles?.full_name?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold">{comment.profiles?.full_name || 'Anonymous'}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
              <p className="text-foreground/90">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
