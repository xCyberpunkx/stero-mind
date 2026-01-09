'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSession(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const notes = formData.get('notes') as string
  const tag = formData.get('tag') as string
  const duration = parseInt(formData.get('duration') as string) || 0
  const project_id = formData.get('project_id') as string || null

  const { error } = await supabase
    .from('sessions')
    .insert({
      user_id: user.id,
      project_id,
      notes,
      tag,
      duration,
    })

  if (error) {
    console.error('Session creation error:', error.message)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const { error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      title,
      description,
    })

  if (error) {
    console.error('Project creation error:', error.message)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
