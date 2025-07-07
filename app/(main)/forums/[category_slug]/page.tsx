import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";

export default async function CategoryPage({ params }: { params: { category_slug: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: category } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('slug', params.category_slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: topics } = await supabase
    .from('forum_topics')
    .select(`
      id,
      title,
      created_at,
      profiles ( full_name, avatar_url ),
      topic_stats ( post_count, last_reply_at )
    `)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">{category.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
        </div>
        {user && (
          <Button asChild className="btn-gradient">
            <Link href={`/forums/new-topic?category=${category.id}`}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Start New Topic
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <div className="space-y-2">
          {topics?.map((topic) => {
            const authorProfile = Array.isArray(topic.profiles) ? topic.profiles[0] : topic.profiles;
            const stats = Array.isArray(topic.topic_stats) ? topic.topic_stats[0] : topic.topic_stats;
            const authorInitial = authorProfile?.full_name?.charAt(0).toUpperCase() || 'A';

            return (
              <div key={topic.id} className="p-4 flex items-center justify-between hover:bg-muted/50 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={authorProfile?.avatar_url || ''} />
                    <AvatarFallback>{authorInitial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/forums/topic/${topic.id}`} className="font-semibold text-lg hover:underline">
                      {topic.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Started by {authorProfile?.full_name || 'Anonymous'} • {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-center">
                  <div>
                    <div className="font-bold">{(stats?.post_count || 1) - 1}</div>
                    <div className="text-sm text-muted-foreground">Replies</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
