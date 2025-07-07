"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserBadges } from "@/app/admin/actions";
import { Tables } from "@/types/database.types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

type Badge = Tables<'badges'>;
type UserBadge = { badge_id: string };

type UserBadgeManagerProps = {
  userId: string;
  allBadges: Badge[];
  currentUserBadges: UserBadge[];
};

export function UserBadgeManager({ userId, allBadges, currentUserBadges }: UserBadgeManagerProps) {
  const [selectedBadges, setSelectedBadges] = useState<Set<string>>(
    new Set(currentUserBadges.map(b => b.badge_id))
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCheckboxChange = (badgeId: string, checked: boolean) => {
    const newSelection = new Set(selectedBadges);
    if (checked) {
      newSelection.add(badgeId);
    } else {
      newSelection.delete(badgeId);
    }
    setSelectedBadges(newSelection);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await updateUserBadges({
        userId,
        badgeIds: Array.from(selectedBadges),
      });

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Badges</CardTitle>
        <CardDescription>Select the badges for this user.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {allBadges.map((badge) => (
          <div key={badge.id} className="flex items-center space-x-2">
            <Checkbox
              id={badge.id}
              checked={selectedBadges.has(badge.id)}
              onCheckedChange={(checked) => handleCheckboxChange(badge.id, !!checked)}
            />
            <Label htmlFor={badge.id} className="w-full">
              <div className="font-semibold">{badge.name}</div>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </Label>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
