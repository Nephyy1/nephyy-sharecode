import { createClient } from "@/lib/supabase/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

const snippetSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  language: z.string().min(1, { message: "Language is required." }),
  code: z.string().min(1, { message: "Code content is required." }),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required. Please provide a valid API key or log in." }, { status: 401 });
  }

  try {
    const json = await request.json();
    const validatedFields = snippetSchema.safeParse(json);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid request body.", details: validatedFields.error.flatten().fieldErrors }, { status: 400 });
    }

    const { title, language, code, description } = validatedFields.data;
    const shortId = nanoid(8);

    const { data: newSnippet, error: insertError } = await supabase
      .from('snippets')
      .insert({
        title,
        description,
        language,
        code,
        user_id: user.id,
        is_public: false,
        short_id: shortId,
      })
      .select('short_id')
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }
    
    const shareUrl = `https://sharecode.nephyy.tech/s/${newSnippet.short_id}`;

    return NextResponse.json({
      success: true,
      message: "Snippet created successfully.",
      shareUrl: shareUrl,
      shortId: newSnippet.short_id,
    });

  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
