"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// PROJECTS CRUD
export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const status = (formData.get("status") as string) || "active";

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("projects")
    .insert([{ name, description, status, user_id: user.id }]);

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}

// TASKS CRUD
export async function createTask(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const project_id = formData.get("project_id") as string;
  const priority = (formData.get("priority") as string) || "medium";

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("tasks")
    .insert([{ title, description, project_id: project_id || null, priority, user_id: user.id }]);

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function toggleTask(id: string, is_completed: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: !is_completed })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}

// NEURO-LOGS CRUD
export async function createNeuroLog(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const mood = formData.get("mood") as string;
  const duration_minutes = parseInt(formData.get("duration_minutes") as string) || 0;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("neuro_logs")
    .insert([{ title, content, mood, duration_minutes, user_id: user.id }]);

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function deleteNeuroLog(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("neuro_logs").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}
