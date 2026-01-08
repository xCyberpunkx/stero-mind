import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-background p-8 font-display">
            <nav className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold font-code">DASHBOARD</h1>
                <form action="/auth/signout" method="post">
                    <Button variant="outline" type="submit" className="font-code font-bold">
                        SIGN OUT
                    </Button>
                </form>
            </nav>

            <div className="max-w-4xl mx-auto grid gap-6">
                <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-xl font-bold font-code mb-4 uppercase">User Profile</h2>
                    <div className="space-y-2 font-code">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at!).toLocaleString()}</p>
                        {profile && (
                            <>
                                <p><strong>Full Name:</strong> {profile.full_name || 'N/A'}</p>
                                <p><strong>Username:</strong> {profile.username || 'N/A'}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                    <h2 className="text-xl font-bold font-code mb-4 uppercase">Status</h2>
                    <p className="font-code">System Status: OPERATIONAL</p>
                    <p className="font-code">Access Level: BETA_USER</p>
                </div>
            </div>
        </div>
    )
}
