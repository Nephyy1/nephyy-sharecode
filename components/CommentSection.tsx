"use client";

import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database.types";
import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoaderCircle, MessageSquareReply, Send } from "lucide-react";
import Link from "next/link";

type Profile = Tables<'profiles'>;
type CommentWithProfile = Tables<'comments'> & { profiles: Profile | null };

type CommentSectionProps = {
  snippetId: string;
  initialComments: CommentWithProfile[];
  user: User | null;
};

function CommentForm({
  user,
  snippetId,
  parentId = null,
  onCommentPosted,
  onCancel,
}: {
  user: User;
  snippetId: string;
  parentId?: string | null;
  onCommentPosted: (newComment: CommentWithProfile) => void;
  onCancel?: () => void;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handlePost = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .insert({ content, user_id: user.id, snippet_id: snippetId, parent_id: parentId })
      .select('*, profiles(*)')
      .single();

    if (data) {
      onCommentPosted(data as CommentWithProfile);
      setContent("");
      if (onCancel) onCancel();
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        placeholder={parentId ? "Write a reply..." : "Add a comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-sm"
      />
      <div className="flex justify-end gap-2">
        {onCancel && <Button variant="ghost" onClick={onCancel}>Cancel</Button>}
        <Button onClick={handlePost} disabled={isLoading || !content.trim()}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {parentId ? "Post Reply" : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}

function Comment({
  comment,
  replies,
  user,
  snippetId,
  onReplyPosted
}: {
  comment: CommentWithProfile;
  replies: CommentWithProfile[];
  user: User | null;
  snippetId: string;
  onReplyPosted: (newReply: CommentWithProfile) => void;
}) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={comment.profiles?.avatar_url || ''} />
        <AvatarFallback>{comment.profiles?.full_name?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div>
          <div className="flex items-baseline gap-2">
            <p className="font-semibold">{comment.profiles?.full_name || 'Anonymous'}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </p>
          </div>
          <p className="text-foreground/90">{comment.content}</p>
        </div>
        {user && <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => setIsReplying(!isReplying)}><MessageSquareReply className="w-4 h-4 mr-1"/> Reply</Button>}
        {isReplying && user && (
          <div className="pl-4 border-l-2">
            <CommentForm
              user={user}
              snippetId={snippetId}
              parentId={comment.id}
              onCommentPosted={onReplyPosted}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
        <div className="pl-4 border-l-2 space-y-6 pt-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={[]}
              user={user}
              snippetId={snippetId}
              onReplyPosted={onReplyPosted}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CommentSection({ snippetId, initialComments, user }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);

  const { rootComments, commentsByParent } = useMemo(() => {
    const rootComments: CommentWithProfile[] = [];
    const commentsByParent: Record<string, CommentWithProfile[]> = {};

    for (const comment of comments) {
      if (comment.parent_id) {
        if (!commentsByParent[comment.parent_id]) {
          commentsByParent[comment.parent_id] = [];
        }
        commentsByParent[comment.parent_id].push(comment);
      } else {
        rootComments.push(comment);
      }
    }
    return { rootComments, commentsByParent };
  }, [comments]);
  
  const handleNewComment = (newComment: CommentWithProfile) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="space-y-6">
      {user ? (
        <CommentForm user={user} snippetId={snippetId} onCommentPosted={handleNewComment} />
      ) : (
        <div className="text-center p-4 border rounded-lg bg-muted/50">
          <p>
            <Link href="/login" className="font-semibold hover:underline">Log in</Link> or <Link href="/register" className="font-semibold hover:underline">Sign up</Link> to post a comment.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {rootComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={commentsByParent[comment.id] || []}
            user={user}
            snippetId={snippetId}
            onReplyPosted={handleNewComment}
          />
        ))}
      </div>
    </div>
  );
}
