import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaginationControls } from "@/components/admin/PaginationControls";

export default async function AdminSnippetsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createClient();

  const status = typeof searchParams.status === 'string' ? searchParams.status : 'all';
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10;
  const start = (page - 1) * per_page;
  const end = start + per_page - 1;

  let query = supabase
    .from('snippets')
    .select('id, title, language, is_public, short_id, profiles(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, end);
  
  if(status === 'public') {
    query = query.eq('is_public', true);
  } else if(status === 'private') {
    query = query.eq('is_public', false);
  }

  const { data: snippets, count } = await query;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Snippet Management</h1>
        <p className="text-muted-foreground">View and delete all user-submitted snippets.</p>
      </div>
      <Tabs defaultValue={status}>
        <TabsList>
          <TabsTrigger value="all" asChild><Link href="/admin/snippets">All</Link></TabsTrigger>
          <TabsTrigger value="public" asChild><Link href="/admin/snippets?status=public">Public</Link></TabsTrigger>
          <TabsTrigger value="private" asChild><Link href="/admin/snippets?status=private">Private</Link></TabsTrigger>
        </TabsList>
      </Tabs>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
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
                  <TableCell className="hidden md:table-cell">{snippet.profiles?.full_name || 'Anonymous'}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={snippet.is_public ? 'default' : 'secondary'}>
                      {snippet.is_public ? 'Public' : 'Private Link'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DeleteButton itemId={snippet.id} tableName="snippets" path="/admin/snippets" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
          <PaginationControls
            hasNextPage={end < (count ?? 0) - 1}
            hasPrevPage={start > 0}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
