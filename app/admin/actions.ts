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
