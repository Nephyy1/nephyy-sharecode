import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminForumsPage() {
  const supabase = createClient();
  const { data: topics } = await supabase
    .from('forum_topics')
    .select('id, title, created_at, profiles(full_name), forum_categories(title)')
    .order('created_at', { ascending: false });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forum Topics</CardTitle>
        <CardDescription>Manage all user-submitted forum topics.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics?.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell className="font-medium">
                  <Link href={`/forums/topic/${topic.id}`} className="hover:underline" target="_blank">
                    {topic.title}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{topic.profiles?.full_name}</TableCell>
                <TableCell className="hidden sm:table-cell">{topic.forum_categories?.title}</TableCell>
                <TableCell>
                  <DeleteButton itemId={topic.id} tableName="forum_topics" path="/admin/forums" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
