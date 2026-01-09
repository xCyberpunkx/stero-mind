'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Projects
export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string || 'ACTIVE'

  const { error } = await supabase
    .from('projects')
    .insert([{ 
      name, 
      description, 
      status, 
      user_id: user.id 
    }])

  if (error) throw error
  revalidatePath('/dashboard')
}

// Tasks
export async function createTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const project_id = formData.get('project_id') as string || null
  const priority = formData.get('priority') as string || 'MEDIUM'

  const { error } = await supabase
    .from('tasks')
    .insert([{ 
      title, 
      project_id, 
      priority, 
      user_id: user.id,
      status: 'PENDING'
    }])

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function toggleTask(taskId: string, isCompleted: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tasks')
    .update({ is_completed: isCompleted, status: isCompleted ? 'COMPLETED' : 'PENDING' })
    .eq('id', taskId)

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
  const mood = formData.get('mood') as string

  const { error } = await supabase
    .from('neuro_logs')
    .insert([{ 
      title, 
      content, 
      mood, 
      user_id: user.id 
    }])

  if (error) throw error
  revalidatePath('/dashboard')
}

// Sessions
export async function createSession(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const topic = formData.get('topic') as string
  const duration = parseInt(formData.get('duration') as string || '0')

  const { error } = await supabase
    .from('sessions')
    .insert([{ 
      topic, 
      duration, 
      user_id: user.id,
      start_time: new Date().toISOString()
    }])

  if (error) throw error
  revalidatePath('/dashboard')
}
