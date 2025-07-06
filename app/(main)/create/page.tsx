"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LoaderCircle, CheckCircle, Link2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?message=You must be logged in to create a snippet.');
      }
      setUser(user);
    };
    fetchUser();
  }, [router, supabase.auth]);

  const handleSaveSnippet = async (isPublic: boolean) => {
    if (!user) {
      setError("You must be logged in.");
      return;
    }

    if (!title || !language || !code) {
      setError("Title, Language, and Code fields are required.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const shortId = nanoid(8);

    const { data, error: insertError } = await supabase
      .from('snippets')
      .insert({
        title,
        description,
        language,
        code,
        user_id: user.id,
        is_public: isPublic,
        short_id: shortId,
      })
      .select('short_id')
      .single();

    setIsLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setSuccess(isPublic ? "Snippet published successfully!" : "Link created successfully!");
      router.push(`/s/${data.short_id}`);
    }
  };
  
  if (!isMounted || !user) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Snippet</CardTitle>
          <CardDescription>Choose to get a private shareable link or publish your code to the community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g., React Hook for Fetching Data" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="A short description of what this code does." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
               <Select onValueChange={setLanguage} required>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="SQL">SQL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="code-area">Code</Label>
            <Textarea
              id="code-area"
              placeholder="Paste your code here..."
              className="min-h-[400px] font-mono text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4">
          <div className="text-sm w-full sm:w-auto">
            {error && <p className="text-destructive">{error}</p>}
            {success && <p className="text-green-500 flex items-center gap-2"><CheckCircle className="w-4 h-4"/>{success}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             <Button type="button" variant="outline" size="lg" onClick={() => handleSaveSnippet(false)} disabled={isLoading}>
              {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Link2 className="mr-2 h-4 w-4" />}
              Create Share Link
            </Button>
            <Button type="button" size="lg" className="btn-gradient" onClick={() => handleSaveSnippet(true)} disabled={isLoading}>
              {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Publish to Web
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
