import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Radio, 
  LogOut, 
  BookOpen, 
  Map
} from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

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

    if (!profile || !profile.goal) {
        redirect('/onboarding')
    }

    // Fetch all dashboard data
    const [
      { data: tasks },
      { data: projects },
      { data: logs },
      { data: sessions }
    ] = await Promise.all([
      supabase.from('tasks').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('neuro_logs').select('*').order('created_at', { ascending: false }),
      supabase.from('sessions').select('*').order('created_at', { ascending: false })
    ])

    return (
        <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
          <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

          <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Radio className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tighter uppercase font-code">System Dashboard</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-6 font-code text-[10px] font-bold uppercase mr-4">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    System: Online
                  </span>
                  <span className="opacity-50">V0.1.0-ALPHA</span>
                </div>
                <form action={signOut}>
                  <Button 
                    type="submit"
                    variant="outline" 
                    className="border-2 border-black bg-white rounded-none h-10 px-4 font-code font-bold text-xs hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    TERMINATE SESSION
                  </Button>
                </form>
              </div>
            </div>
          </nav>

          <main className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <header className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="font-code text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block opacity-50">
                    Active Profile: {profile.username || user.email}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                    Welcome to the <br />System, {profile.username || 'User'}.
                  </h1>
                </div>
                <div className="flex gap-4">
                  <Link href="/whitepaper">
                    <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all">
                      <BookOpen className="w-4 h-4 mr-2" />
                      WHITEPAPER
                    </Button>
                  </Link>
                  <Link href="/roadmap">
                    <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all">
                      <Map className="w-4 h-4 mr-2" />
                      ROADMAP
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            <DashboardClient 
              tasks={tasks || []} 
              projects={projects || []} 
              logs={logs || []} 
              sessions={sessions || []}
              profile={profile}
            />
          </main>
        </div>
    )
}
