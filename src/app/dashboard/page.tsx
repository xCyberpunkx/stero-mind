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
  ChevronRight,
  Clock,
  Briefcase
} from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { BugReport } from '@/components/BugReport'

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

    // If profile doesn't exist or doesn't have a goal, redirect to onboarding
    if (!profile || !profile.goal) {
        redirect('/onboarding')
    }

    const widgets = [
      { title: "Projects", icon: Briefcase, count: "0", status: "READY" },
      { title: "Sessions", icon: Clock, count: "0", status: "READY" },
      { title: "Learning", icon: Brain, count: "0", status: "READY" },
      { title: "Stats", icon: LineChart, count: "ALPHA", status: "LOCK" },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
          <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

          {/* Sidebar-ish Nav */}
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
            {/* Header / Welcome */}
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

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {widgets.map((widget, i) => (
                <div key={i} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <widget.icon className="w-5 h-5" />
                    </div>
                    <span className="font-code text-[10px] font-bold opacity-30 tracking-widest">{widget.status}</span>
                  </div>
                  <h3 className="font-code font-bold text-xs uppercase mb-1">{widget.title}</h3>
                  <div className="text-3xl font-bold tracking-tighter uppercase">{widget.count}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="md:col-span-1 border-2 border-black bg-secondary/30 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Settings className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-tighter">Core Profile</h3>
                    <p className="font-code text-[10px] font-bold opacity-50 uppercase">Access Level: {profile.role}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50">Core Objective</span>
                    <div className="border-2 border-black bg-white p-3 font-code font-bold text-xs uppercase">
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
                    <span className="font-code text-[10px] font-bold uppercase block mb-2 opacity-50">Active Stack</span>
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
                  <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-12 font-code font-bold text-xs">
                    EDIT CORE_SYSTEM
                  </Button>
                </div>
              </div>

              {/* Data Coming Soon Card */}
              <div className="md:col-span-2 border-2 border-black bg-white p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-20 h-20 border-2 border-black bg-secondary flex items-center justify-center mb-8 mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <Layers className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Your data is <br />coming soon.
                  </h2>
                  <p className="text-muted-foreground font-medium max-w-sm mx-auto mb-8">
                    We are currently initializing the module container system. 
                    Soon you'll be able to link your neural logs, session tracking, and knowledge clusters here.
                  </p>
                  <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 h-14 font-code font-bold group">
                    CONFIGURE MODULES
                    <Plus className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform" />
                  </Button>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[10px] font-bold font-code opacity-30 uppercase tracking-[0.2em]">
                  <span>REF: SM-DATA-001</span>
                  <span>STATUS: INITIALIZING</span>
                </div>
                </div>
              </div>

              <footer className="mt-20 pt-8 border-t-2 border-black flex justify-between items-center text-[10px] font-bold font-code opacity-40 uppercase tracking-widest">
                <span>System Dashboard // v0.1.0-Alpha</span>
                <div className="flex gap-8">
                  <Link href="/roadmap" className="hover:underline">Roadmap</Link>
                  <BugReport />
                </div>
              </footer>
            </main>
        </div>
    )
}

