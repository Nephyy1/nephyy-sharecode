import { createClient } from "@/lib/supabase/server";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookText, Code, MessageCircle, PlusCircle } from "lucide-react";

export default async function ForumsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: categories } = await supabase.from('forum_categories').select('*');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Forums</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Discuss topics with the community.
          </p>
        </div>
        {user && (
          <Button asChild className="btn-gradient">
            <Link href="/forums/new-topic">
              <PlusCircle className="mr-2 h-5 w-5" />
              Start New Topic
            </Link>
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {categories?.map((category) => (
          <Card key={category.id} className="shadow-subtle">
            <CardHeader>
              <Link href={`/forums/${category.slug}`} className="hover:text-primary transition-colors">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <MessageCircle className="w-7 h-7 text-primary" />
                  {category.title}
                </CardTitle>
              </Link>
              <CardDescription className="pt-2 text-base">
                {category.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
