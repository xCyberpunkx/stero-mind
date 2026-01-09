'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const username = formData.get('username') as string
  const interests = formData.getAll('interests') as string[]
  const tools = formData.getAll('tools') as string[]
  const goal = formData.get('goal') as string

  if (!username) {
    return { error: 'Username is required' }
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      username,
      interests,
      tools,
      goal,
      role: 'user', // Default role
      updated_at: new Date().toISOString(),
    })

  if (error) {
    console.error('Onboarding error:', error.message)
    return { error: error.message }
  }

  redirect('/dashboard')
}
