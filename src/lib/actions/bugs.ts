"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function reportBug(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const severity = formData.get("severity") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("bugs").insert({
    user_id: user?.id || null,
    title,
    description,
    severity,
    status: "open",
  });

  if (error) {
    console.error("Error reporting bug:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
