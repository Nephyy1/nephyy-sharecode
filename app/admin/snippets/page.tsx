import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminSnippetsPage() {
  const supabase = createClient();
  const { data: snippets } = await supabase
    .from('snippets')
    .select('id, title, language, created_at, is_public, short_id, profiles(full_name)')
    .order('created_at', { ascending: false });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Snippets</CardTitle>
        <CardDescription>Manage all user-submitted snippets.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snippets?.map((snippet) => (
              <TableRow key={snippet.id}>
                <TableCell className="font-medium">
                  <Link href={`/s/${snippet.short_id}`} className="hover:underline" target="_blank">
                    {snippet.title}
                  </Link>
                </TableCell>
                <TableCell>{snippet.profiles?.full_name || 'Anonymous'}</TableCell>
                <TableCell>
                  <Badge variant={snippet.is_public ? 'default' : 'secondary'}>
                    {snippet.is_public ? 'Public' : 'Private Link'}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(snippet.created_at), "PPP")}</TableCell>
                <TableCell>
                  <DeleteButton itemId={snippet.id} tableName="snippets" path="/admin/snippets" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
