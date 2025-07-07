"use client";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type VoteComponentProps = {
  snippetId: string;
  initialVotes: number;
  initialUserVote?: number;
  user: User | null;
};

export function VoteComponent({ snippetId, initialVotes, initialUserVote = 0, user }: VoteComponentProps) {
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const supabase = createClient();
  const router = useRouter();

  const handleVote = async (newVote: number) => {
    if (!user) {
      return router.push('/login?message=You must be logged in to vote.');
    }

    let newVoteCount = voteCount;
    let newOptimisticUserVote = newVote;

    if (userVote === newVote) {
      newOptimisticUserVote = 0;
      await supabase.from('votes').delete().match({ user_id: user.id, snippet_id: snippetId });
      newVoteCount -= newVote;
    } else {
      await supabase.from('votes').upsert({
        user_id: user.id,
        snippet_id: snippetId,
        vote_type: newVote,
      }, { onConflict: 'snippet_id, user_id' });
      
      newVoteCount += newVote;
      if (userVote !== 0) {
        newVoteCount -= userVote; 
      }
    }

    setUserVote(newOptimisticUserVote);
    setVoteCount(newVoteCount);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => handleVote(1)}>
        <ArrowBigUp className={cn("h-6 w-6", userVote === 1 && "fill-primary text-primary")} />
      </Button>
      <span className="text-lg font-bold min-w-[30px] text-center">{voteCount}</span>
      <Button variant="ghost" size="icon" onClick={() => handleVote(-1)}>
        <ArrowBigDown className={cn("h-6 w-6", userVote === -1 && "fill-destructive text-destructive")} />
      </Button>
    </div>
  );
}
