'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// PROJECTS
export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string || 'active'

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    name,
    description,
    status
  })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').update({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as string
  }).eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}

// NEURO LOGS
export async function createNeuroLog(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const duration_minutes = parseInt(formData.get('duration_minutes') as string) || 0
  const mood = formData.get('mood') as string

  const { error } = await supabase.from('neuro_logs').insert({
    user_id: user.id,
    title,
    content,
    duration_minutes,
    mood
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

// SESSIONS
export async function startSession(projectId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase.from('sessions').insert({
    user_id: user.id,
    project_id: projectId,
    start_time: new Date().toISOString(),
    is_active: true
  })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function stopSession(sessionId: string) {
  const supabase = await createClient()
  const { data: session } = await supabase.from('sessions').select('start_time').eq('id', sessionId).single()
  if (!session) return

  const endTime = new Date()
  const startTime = new Date(session.start_time)
  const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)

  const { error } = await supabase.from('sessions').update({
    end_time: endTime.toISOString(),
    duration,
    is_active: false
  }).eq('id', sessionId)

  if (error) throw error
  revalidatePath('/dashboard')
}

// TASKS
export async function addTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string

  const { error } = await supabase.from('tasks').insert({
    user_id: user.id,
    title,
    completed: false
  })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function toggleTask(id: string, completed: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').update({
    completed
  }).eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}
