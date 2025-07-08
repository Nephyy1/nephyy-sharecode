import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ShieldCheck, Star, Baby, Edit } from "lucide-react";

const badgeIcons: { [key: string]: React.ReactNode } = {
  Admin: <ShieldCheck className="w-5 h-5 text-red-500" />,
  Expert: <Star className="w-5 h-5 text-yellow-500" />,
  Rookie: <Baby className="w-5 h-5 text-green-500" />,
};

export default async function AdminBadgesPage() {
  const supabase = createClient();
  const { data: badges } = await supabase.from('badges').select('*').order('name');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Badge Management</h1>
          <p className="text-muted-foreground">
            Create and manage all available badges in the system.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/badges/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Badge
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {badges?.map((badge) => (
                <TableRow key={badge.id}>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      {badge.icon_name && badgeIcons[badge.icon_name]}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{badge.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{badge.description}</TableCell>
                  <TableCell className="text-right">
                     <Button variant="ghost" size="icon" disabled>
                        <Edit className="h-4 w-4" />
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
