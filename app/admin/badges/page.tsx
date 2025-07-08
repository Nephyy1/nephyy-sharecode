import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ShieldCheck, Star, Baby } from "lucide-react";

const badgeIcons: { [key: string]: React.ReactNode } = {
  Admin: <ShieldCheck className="w-5 h-5" />,
  Expert: <Star className="w-5 h-5" />,
  Rookie: <Baby className="w-5 h-5" />,
};

export default async function AdminBadgesPage() {
  const supabase = createClient();
  const { data: badges } = await supabase.from('badges').select('*').order('name');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Badge Management</h1>
          <p className="text-muted-foreground">
            Manage all available badges in the system.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/badges/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Badge
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Badges</CardTitle>
          <CardDescription>A list of all badges that can be assigned to users.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {badges?.map((badge) => (
                <TableRow key={badge.id}>
                  <TableCell>
                    {badge.icon_name && badgeIcons[badge.icon_name]}
                  </TableCell>
                  <TableCell className="font-medium">{badge.name}</TableCell>
                  <TableCell>{badge.description}</TableCell>
                  <TableCell>
                    ...
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
