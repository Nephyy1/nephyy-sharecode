"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteItem({
  id,
  tableName,
  path,
}: {
  id: string;
  tableName: "snippets" | "forum_topics";
  path: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from(tableName).delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(path);
  return { success: true, message: `${tableName} has been deleted.` };
}

export async function updateUserBadges({
  userId,
  badgeIds,
}: {
  userId: string;
  badgeIds: string[];
}) {
  const supabase = createClient();

  const { error: deleteError } = await supabase
    .from('user_badges')
    .delete()
    .eq('user_id', userId);

  if (deleteError) {
    return { success: false, message: deleteError.message };
  }

  if (badgeIds.length > 0) {
    const newBadges = badgeIds.map(badgeId => ({
      user_id: userId,
      badge_id: badgeId,
    }));
    const { error: insertError } = await supabase
      .from('user_badges')
      .insert(newBadges);
    
    if (insertError) {
      return { success: false, message: insertError.message };
    }
  }

  revalidatePath(`/admin/users`);
  return { success: true, message: "User badges updated successfully." };
}
