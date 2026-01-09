'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSession(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const project_id = formData.get('project_id') as string
  const duration = parseInt(formData.get('duration') as string)
  const notes = formData.get('notes') as string
  const tag = formData.get('tag') as string

  const { error } = await supabase.from('sessions').insert({
    user_id: user.id,
    project_id: (project_id && project_id !== 'none') ? project_id : null,
    duration,
    notes,
    tag: tag || 'general'
  })

  if (error) throw error

  // Update XP: 1 XP per minute
  const xpAwarded = duration
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', user.id)
    .single()

  if (profile) {
    const newXp = (profile.xp || 0) + xpAwarded
    const newLevel = Math.floor(newXp / 1000) + 1

    await supabase
      .from('profiles')
      .update({ xp: newXp, level: newLevel })
      .eq('id', user.id)
  }

  revalidatePath('/dashboard')
}

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
