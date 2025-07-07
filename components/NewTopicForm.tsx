"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle, CheckCircle } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tables } from "@/types/database.types";

function NewTopicFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Tables<'forum_categories'>[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?message=You must be logged in to create a topic.');
        return;
      }
      setUser(user);

      const { data: categoriesData } = await supabase.from('forum_categories').select('*');
      if (categoriesData) {
        setCategories(categoriesData);
      }
    };
    initialize();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !selectedCategory) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    const { data, error: rpcError } = await supabase.rpc('create_new_topic', {
      category_id_input: selectedCategory,
      title_input: title,
      content_input: content,
    });
    
    setIsLoading(false);

    if (rpcError) {
      setError(rpcError.message);
    } else {
      setSuccess("Topic created successfully! Redirecting...");
      router.push(`/forums/topic/${data}`);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create a New Topic</CardTitle>
            <CardDescription>Share your thoughts with the community.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A clear and concise title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Your Post</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post content here..." required rows={10} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {success && <p className="text-sm text-green-500 flex items-center gap-2"><CheckCircle className="w-4 h-4"/>{success}</p>}
            </div>
            <Button type="submit" className="btn-gradient" disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Create Topic
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function NewTopicForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-12">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    }>
      <NewTopicFormComponent />
    </Suspense>
  )
}
