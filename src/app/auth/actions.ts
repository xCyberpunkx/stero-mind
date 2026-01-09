'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    })

  if (error) {
    console.error('Google auth error:', error.message)
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signInWithGithub() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    })

  if (error) {
    console.error('GitHub auth error:', error.message)
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signUpWithEmail(formData: FormData) {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string

  if (!email || !password || !firstName || !lastName) {
    return { error: 'All fields are required' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

  if (error) {
    console.error('Sign up error:', error.message)
    return { error: error.message }
  }

  return { success: true, message: "Your account has been created! Please check your inbox to verify your email. Thank you for joining—you'll be among the first to have access to the protocol." }
}

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Sign in error:', error.message)
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/reset-password`,
  })

  if (error) {
    console.error('Reset password error:', error.message)
    return { error: error.message }
  }

  return { success: true, message: 'Check your email for reset link' }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  if (!password) {
    return { error: 'Password is required' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    console.error('Update password error:', error.message)
    return { error: error.message }
  }

  // Next.js redirect throws a specific error that needs to be handled on the client
  redirect('/login')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
