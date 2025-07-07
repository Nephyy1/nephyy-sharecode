"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LoaderCircle, CheckCircle, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/database.types";

export default function EditSnippetPage({ params }: { params: { short_id: string } }) {
  const [snippet, setSnippet] = useState<Tables<'snippets'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSnippet = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data: snippetData, error: snippetError } = await supabase
        .from('snippets')
        .select('*')
        .eq('short_id', params.short_id)
        .single();

      if (snippetError || !snippetData) {
        return router.push('/not-found');
      }
      
      if (!user || user.id !== snippetData.user_id) {
        return router.push(`/s/${params.short_id}`);
      }

      setSnippet(snippetData);
      setIsLoading(false);
    };

    fetchSnippet();
  }, [params.short_id, router, supabase]);

  const handleUpdate = async () => {
    if (!snippet) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const { error: updateError } = await supabase
      .from('snippets')
      .update({
        title: snippet.title,
        description: snippet.description,
        language: snippet.language,
        code: snippet.code,
      })
      .eq('id', snippet.id);

    setIsSaving(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess("Snippet updated successfully!");
      setTimeout(() => router.push(`/s/${params.short_id}`), 1500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!snippet) return;
    const { id, value } = e.target;
    setSnippet({ ...snippet, [id]: value });
  };

  const handleSelectChange = (value: string) => {
    if (!snippet) return;
    setSnippet({ ...snippet, language: value });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!snippet) return null;

  return (
    <div className="flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Snippet</CardTitle>
          <CardDescription>Make changes to your snippet and save them.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={snippet.title} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={snippet.description || ''} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
               <Select value={snippet.language} onValueChange={handleSelectChange} required>
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
            <Label htmlFor="code">Code</Label>
            <Textarea
              id="code"
              value={snippet.code}
              onChange={handleInputChange}
              className="min-h-[400px] font-mono text-sm"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4">
          <div className="text-sm w-full sm:w-auto">
            {error && <p className="text-destructive">{error}</p>}
            {success && <p className="text-green-500 flex items-center gap-2"><CheckCircle className="w-4 h-4"/>{success}</p>}
          </div>
          <Button type="button" size="lg" className="btn-gradient" onClick={handleUpdate} disabled={isSaving}>
            {isSaving ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
