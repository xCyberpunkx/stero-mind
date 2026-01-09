import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Radio, 
  Layout, 
  Layers, 
  LineChart, 
  Brain, 
  Settings, 
  LogOut, 
  BookOpen, 
  Map, 
  Plus, 
  Clock,
  Briefcase,
  Zap,
  Activity,
  Calendar
} from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { QuickLog } from '@/components/QuickLog'
import { formatDistanceToNow } from 'date-fns'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile || !profile.goal) {
        redirect('/onboarding')
    }

    // Fetch Projects Count
    const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    // Fetch Sessions Count
    const { count: sessionsCount } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    // Fetch Recent Sessions
    const { data: recentSessions } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    const widgets = [
      { title: "Projects", icon: Briefcase, count: projectsCount?.toString() || "0", status: "READY" },
      { title: "Sessions", icon: Clock, count: sessionsCount?.toString() || "0", status: "READY" },
      { title: "Tracking", icon: Brain, count: profile.interests?.length.toString() || "0", status: "ACTIVE" },
      { title: "Stats", icon: LineChart, count: "v0.1", status: "ALPHA" },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
          <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

          {/* Navigation */}
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
                  <span className="opacity-50">STABLE-ALPHA</span>
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
            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-code text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                      ID: {profile.username || user.email}
                    </span>
                    <span className="w-1 h-1 bg-black rounded-full" />
                    <span className="font-code text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">
                      SYNCHRONIZED
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: "var(--font-serif)" }}>
                    Welcome back, <br />
                    <span className="italic underline decoration-2 underline-offset-4">{profile.username || 'User'}</span>.
                  </h1>
                </div>
                <div className="flex gap-4">
                  <Link href="/whitepaper">
                    <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all">
                      <BookOpen className="w-4 h-4 mr-2" />
                      DOCS
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            {/* Quick Actions & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Quick Log Component */}
              <div className="lg:col-span-2">
                <QuickLog />
              </div>

              {/* Status Widget */}
              <div className="border-2 border-black bg-black text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-5 h-5 text-green-400" />
                    <h3 className="font-code font-bold text-sm uppercase tracking-widest">System Integrity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                      <span className="font-code text-[10px] opacity-50">UPTIME</span>
                      <span className="font-bold">99.9%</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                      <span className="font-code text-[10px] opacity-50">DATA NODES</span>
                      <span className="font-bold">4/4</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                      <span className="font-code text-[10px] opacity-50">ENCRYPTION</span>
                      <span className="font-bold">AES-256</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="h-1 w-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-green-400 w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {widgets.map((widget, i) => (
                <div key={i} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <widget.icon className="w-5 h-5" />
                    </div>
                    <span className="font-code text-[10px] font-bold opacity-30 tracking-widest">{widget.status}</span>
                  </div>
                  <h3 className="font-code font-bold text-[10px] uppercase mb-1 opacity-50">{widget.title}</h3>
                  <div className="text-3xl font-bold tracking-tighter uppercase">{widget.count}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile/Config Column */}
              <div className="space-y-8">
                <div className="border-2 border-black bg-secondary/30 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Settings className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg uppercase tracking-tighter">Core Profile</h3>
                      <p className="font-code text-[10px] font-bold opacity-50 uppercase">v0.1.0-A</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50 italic">// MISSION_GOAL</span>
                      <div className="border-2 border-black bg-white p-3 font-code font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {profile.goal}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50 italic">// ACTIVE_VECTORS</span>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests?.map((interest: string) => (
                          <span key={interest} className="border border-black px-2 py-1 text-[9px] font-bold uppercase bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-bold uppercase tracking-tighter mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    System Roadmap
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs opacity-50 line-through">
                      <div className="w-2 h-2 border border-black" />
                      <span>INITIALIZE CORE PROTOCOL</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-2 h-2 border-2 border-black bg-black" />
                      <span className="font-bold">NEURAL LOGGING ENGINE</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs opacity-50">
                      <div className="w-2 h-2 border border-black" />
                      <span>KNOWLEDGE GRAPH RENDER</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity / Feed */}
              <div className="md:col-span-2 border-2 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
                  <h3 className="font-bold text-2xl uppercase tracking-tighter flex items-center gap-3">
                    <Layers className="w-6 h-6" />
                    Neural Feed
                  </h3>
                  <span className="font-code text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
                    REAL-TIME SYNC: ACTIVE
                  </span>
                </div>

                {recentSessions && recentSessions.length > 0 ? (
                  <div className="space-y-6">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="group border-2 border-black p-6 hover:bg-secondary/20 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-code text-[10px] font-bold px-2 py-0.5 bg-black text-white uppercase">
                              {session.tag || '#GENERAL'}
                            </span>
                            <span className="font-code text-[10px] opacity-50 uppercase">
                              {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          <Zap className="w-4 h-4 opacity-10 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                          {session.notes}
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-2 border-black rounded-none h-12 font-code font-bold text-xs hover:bg-black hover:text-white transition-all">
                      VIEW FULL ARCHIVE
                    </Button>
                  </div>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-2 border-black bg-secondary flex items-center justify-center mb-6 opacity-20">
                      <Zap className="w-8 h-8" />
                    </div>
                    <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                      No neural logs found in the archive. 
                      Initialize your first session using the Quick Log above.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
    )
}
