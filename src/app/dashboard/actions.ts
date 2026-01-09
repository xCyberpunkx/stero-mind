'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Projects
export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    title,
    description
  })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function updateProject(id: string, updates: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').update(updates).eq('id', id)
  if (error) throw error
  revalidatePath('/dashboard')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/dashboard')
}

// Tasks
export async function createTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const project_id = formData.get('project_id') as string || null
  const priority = formData.get('priority') as string || 'medium'
  const due_date = formData.get('due_date') as string || null

  const { error } = await supabase.from('tasks').insert({
    user_id: user.id,
    project_id,
    title,
    description,
    priority,
    due_date: due_date ? new Date(due_date).toISOString() : null
  })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function updateTask(id: string, updates: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').update(updates).eq('id', id)
  if (error) throw error
  revalidatePath('/dashboard')
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/dashboard')
}

// Neuro Logs
export async function createNeuroLog(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const duration_minutes = parseInt(formData.get('duration_minutes') as string) || 0
  const mood = formData.get('mood') as string
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []

  const { error } = await supabase.from('neuro_logs').insert({
    user_id: user.id,
    title,
    content,
    duration_minutes,
    mood,
    tags
  })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function deleteNeuroLog(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('neuro_logs').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/dashboard')
}
