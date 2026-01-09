import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Radio, 
  LogOut, 
  BookOpen, 
  Plus, 
  Clock,
  Briefcase,
  Zap,
  Shield,
  Activity
} from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { QuickLog } from './QuickLog'
import { CreateProjectDialog } from './CreateProjectDialog'
import { SessionList } from './SessionList'
import { Stats } from './Stats'
import { Badges } from './Badges'
import { startOfDay, subDays, format, isSameDay } from 'date-fns'

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

    // Fetch real data
    const [projectsRes, sessionsRes, allSessionsRes] = await Promise.all([
      supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('sessions').select('*, projects(title)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
      supabase.from('sessions').select('created_at, duration').eq('user_id', user.id).order('created_at', { ascending: false })
    ])

    const projects = projectsRes.data || []
    const sessions = sessionsRes.data || []
    const allSessions = allSessionsRes.data || []

    // Prepare chart data (last 7 days)
    const chartData = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i)
      const dateStr = format(date, 'yyyy-MM-dd')
      const minutes = allSessions
        .filter(s => isSameDay(new Date(s.created_at), date))
        .reduce((acc, s) => acc + (s.duration || 0), 0)
      return { date: dateStr, minutes }
    })

    // Calculate streak
    const sessionDates = Array.from(new Set(allSessions.map(s => format(new Date(s.created_at), 'yyyy-MM-dd'))))
    let streak = 0
    let checkDate = new Date()
    
    // If no session today, check if there was one yesterday to continue the streak
    if (!sessionDates.includes(format(checkDate, 'yyyy-MM-dd'))) {
      checkDate = subDays(checkDate, 1)
    }

    while (sessionDates.includes(format(checkDate, 'yyyy-MM-dd'))) {
      streak++
      checkDate = subDays(checkDate, 1)
    }

    const totalMinutes = allSessions.reduce((acc, s) => acc + (s.duration || 0), 0)

    const widgets = [
      { title: "Projects", icon: Briefcase, count: projects.length.toString(), status: "STABLE" },
      { title: "Sessions", icon: Clock, count: sessions.length.toString(), status: "STABLE" },
      { title: "Neuro XP", icon: Zap, count: profile.xp?.toString() || "0", status: `LVL ${profile.level || 1}` },
      { title: "Integrity", icon: Shield, count: "98%", status: "OPTIMAL" },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
          <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

          <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white/80 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Radio className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tighter uppercase font-code">Stereo Mind</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-6 font-code text-[10px] font-bold uppercase mr-4">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
                    TERMINATE
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
                    Neural Identifier: {profile.username || user.email}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                    Command <br />Center.
                  </h1>
                </div>
                <div className="flex gap-4">
                  <CreateProjectDialog />
                  <Link href="/whitepaper">
                    <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all">
                      <BookOpen className="w-4 h-4 mr-2" />
                      DOCS
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {widgets.map((widget, i) => (
                <div key={i} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <widget.icon className="w-5 h-5" />
                    </div>
                    <span className="font-code text-[10px] font-bold opacity-30 tracking-widest uppercase">{widget.status}</span>
                  </div>
                  <h3 className="font-code font-bold text-xs uppercase mb-1 opacity-50">{widget.title}</h3>
                  <div className="text-3xl font-bold tracking-tighter uppercase">{widget.count}</div>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <Stats data={chartData} streak={streak} totalMinutes={totalMinutes} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <QuickLog projects={projects} interests={profile.interests || []} />
                
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      <h2 className="text-xl font-bold uppercase tracking-tight">Recent Sessions</h2>
                    </div>
                    <span className="font-code text-[10px] font-bold opacity-30 uppercase">Neural_Feed_V1</span>
                  </div>
                  <SessionList sessions={sessions} />
                </section>
              </div>

              <aside className="space-y-8">
                {/* Profile Card */}
                <div className="border-2 border-black bg-secondary/30 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-2xl">
                      {profile.level || 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl uppercase tracking-tighter">Level {profile.level || 1}</h3>
                      <p className="font-code text-[10px] font-bold opacity-50 uppercase">{profile.xp || 0} / {(profile.level || 1) * 1000} XP</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50">Current Directive</span>
                      <div className="border-2 border-black bg-white p-4 font-bold text-xs uppercase leading-tight">
                        {profile.goal}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50">Tracking Vectors</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests?.map((interest: string) => (
                          <span key={interest} className="border border-black px-2 py-1 text-[9px] font-bold uppercase bg-white">
                            {interest}
                          </span>
                        )) || <span className="text-[10px] opacity-50">No vectors initialized</span>}
                      </div>
                    </div>

                    <div>
                      <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50">System Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.tools?.map((tool: string) => (
                          <span key={tool} className="border border-black px-2 py-1 text-[9px] font-bold uppercase bg-white">
                            {tool}
                          </span>
                        )) || <span className="text-[10px] opacity-50">No tools linked</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-black/10">
                    <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-12 font-code font-bold text-xs uppercase">
                      Reconfigure System
                    </Button>
                  </div>
                </div>

                <Badges streak={streak} totalSessions={allSessions.length} level={profile.level || 1} />

                {/* Projects Widget */}
                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-bold text-xl uppercase tracking-tighter mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Active Projects
                  </h3>
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="border-b border-black/10 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-bold uppercase text-xs mb-1">{project.title}</h4>
                        <p className="text-[10px] text-black/60 font-medium line-clamp-1">{project.description}</p>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-[10px] font-bold opacity-30 uppercase">No active projects detected.</p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
    )
}
