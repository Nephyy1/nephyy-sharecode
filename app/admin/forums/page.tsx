import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { PaginationControls } from "@/components/admin/PaginationControls";

export default async function AdminForumsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = createClient();
  
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10;
  const start = (page - 1) * per_page;
  const end = start + per_page - 1;

  const { data: topics, count } = await supabase
    .from('forum_topics')
    .select('id, title, profiles(full_name), forum_categories(title)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, end);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Forum Management</h1>
        <p className="text-muted-foreground">View and delete all user-submitted topics.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
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
