'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addNeuroLog(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const mood = formData.get('mood') as string

  const { error } = await supabase
    .from('neuro_logs')
    .insert({
      user_id: user.id,
      title,
      content,
      mood,
      tags: [],
    })

  if (error) throw error

  revalidatePath('/dashboard')
}

export async function addTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string

  const { error } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      title,
      status: 'pending',
      priority: 'medium',
      is_completed: false,
    })

  if (error) throw error

  revalidatePath('/dashboard')
}

export async function toggleTask(taskId: string, isCompleted: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('tasks')
    .update({ is_completed: !isCompleted })
    .eq('id', taskId)

  if (error) throw error

  revalidatePath('/dashboard')
}
