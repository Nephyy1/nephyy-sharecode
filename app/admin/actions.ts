"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function deleteItem({
  id,
  tableName,
  path,
}: {
  id: string;
  tableName: "snippets" | "forum_topics" | "badges";
  path: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from(tableName).delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(path);
  return { success: true, message: `${tableName.slice(0, -1)} has been deleted.` };
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

const badgeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  icon_name: z.string(),
});

export async function createBadge(formData: FormData) {
  const validatedFields = badgeSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    icon_name: formData.get('icon_name'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();
  const { error } = await supabase.from('badges').insert(validatedFields.data);

  if (error) {
    return { success: false, message: error.message };
  }
  
  revalidatePath('/admin/badges');
  return { success: true, message: "Badge created successfully." };
}
