"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { LoaderCircle } from "lucide-react";

export function ReplyForm({ topicId, user }: { topicId: string, user: User }) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleReply = async () => {
    if (!content.trim()) return;

    setIsLoading(true);

    await supabase.from('forum_posts').insert({
      topic_id: topicId,
      user_id: user.id,
      content: content,
    });

    setIsLoading(false);
    setContent('');
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Join the discussion</h3>
      <Textarea 
        placeholder="Write your reply here..."
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleReply} disabled={isLoading || !content.trim()}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Post Reply
        </Button>
      </div>
    </div>
  );
}
