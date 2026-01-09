'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// PROJECTS
export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const color = formData.get('color') as string || '#000000'

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    name,
    description,
    color
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

// TASKS
export async function createTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const project_id = formData.get('project_id') as string || null
  const priority = formData.get('priority') as string || 'medium'
  const due_date = formData.get('due_date') as string || null

  const { error } = await supabase.from('tasks').insert({
    user_id: user.id,
    title,
    description,
    project_id,
    priority,
    due_date,
    is_completed: false
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function toggleTask(id: string, is_completed: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').update({ is_completed }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

// LOGS
export async function createLog(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const mood = formData.get('mood') as string
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()) || []

  const { error } = await supabase.from('neuro_logs').insert({
    user_id: user.id,
    title,
    content,
    mood,
    tags
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

// SESSIONS (Tracking)
export async function startSession(topic: string, tag: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('sessions').insert({
    user_id: user.id,
    topic,
    tag,
    start_time: new Date().toISOString(),
    is_active: true
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function stopSession(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('sessions').update({
    end_time: new Date().toISOString(),
    is_active: false
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}
