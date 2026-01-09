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
  Briefcase,
  ListTodo,
  Target,
  BarChart3,
  Calendar as CalendarIcon
} from 'lucide-react'
import { BugReport } from '@/components/BugReport'
import { signOut } from '@/app/auth/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NeuroLogManager } from '@/components/NeuroLogManager'
import { TaskManager } from '@/components/TaskManager'
import { GoalTracker } from '@/components/GoalTracker'
import { QuickLog } from '@/components/QuickLog'
import { DashboardVisuals } from '@/components/DashboardVisuals'
import { ProjectManager } from '@/components/ProjectManager'
import { SessionTimer } from '@/components/SessionTimer'
import { PomodoroTimer } from '@/components/PomodoroTimer'

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
  const { data: projects } = await supabase.from('projects').select('*').eq('user_id', user.id)
  const { data: sessions } = await supabase.from('sessions').select('*').eq('user_id', user.id)
  const { data: neuroLogs } = await supabase.from('neuro_logs').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  const { data: tasks } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  const { data: goals } = await supabase.from('goals').select('*').eq('user_id', user.id).order('target_date', { ascending: true })
  const activeSession = sessions?.find((s: any) => s.is_active === true) || null

  const widgets = [
    { title: "Active Projects", icon: Briefcase, count: projects?.length || "0", status: "READY" },
    { title: "Total Sessions", icon: Clock, count: sessions?.length || "0", status: "READY" },
    { title: "Neural XP", icon: Brain, count: neuroLogs?.length || "0", status: "READY" },
    { title: "Goals", icon: Target, count: goals?.filter((g: any) => !g.is_completed).length || "0", status: "READY" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
      <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

      {/* Sidebar-ish Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-border bg-background flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border)] group-hover:shadow-[4px_4px_0px_0px_var(--border)] transition-all">
              <Radio className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase font-code">System Dashboard</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 font-code text-[10px] font-bold uppercase mr-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                System: Online
              </span>
              <span className="opacity-50">V0.1.0-ALPHA</span>
            </div>
            <BugReport />
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                className="border-2 border-border bg-background rounded-none h-10 px-4 font-code font-bold text-xs hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_var(--border)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                TERMINATE
              </Button>
            </form>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header / Welcome */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-code text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block opacity-50">
                Active Profile: {profile.username || user.email}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                Command Center
              </h1>
            </div>
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-background border-2 border-border p-1 gap-1 h-auto rounded-none shadow-[4px_4px_0px_0px_var(--border)]">
            <TabsTrigger
              value="overview"
              className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-xs px-6 py-2 border border-transparent data-[state=active]:border-black transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-xs px-6 py-2 border border-transparent data-[state=active]:border-black transition-all"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-xs px-6 py-2 border border-transparent data-[state=active]:border-black transition-all"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-xs px-6 py-2 border border-transparent data-[state=active]:border-black transition-all"
            >
              Milestones
            </TabsTrigger>
            <TabsTrigger
              value="stream"
              className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-xs px-6 py-2 border border-transparent data-[state=active]:border-black transition-all"
            >
              Neural Stream
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* KPI Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {widgets.map((widget, i) => (
                <div key={i} className="border-2 border-border bg-background p-6 shadow-[4px_4px_0px_0px_var(--border)] group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 border-2 border-border flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <widget.icon className="w-5 h-5" />
                    </div>
                    <span className="font-code text-[10px] font-bold opacity-30 tracking-widest">{widget.status}</span>
                  </div>
                  <h3 className="font-code font-bold text-xs uppercase mb-1">{widget.title}</h3>
                  <div className="text-3xl font-bold tracking-tighter uppercase">{widget.count}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Quick Actions & Profile */}
              <div className="md:col-span-4 space-y-8">
                <div className="border-2 border-border bg-secondary/30 p-8 shadow-[8px_8px_0px_0px_var(--border)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 border-2 border-border bg-background flex items-center justify-center shadow-[4px_4px_0px_0px_var(--border)]">
                      <Settings className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl uppercase tracking-tighter">Core Profile</h3>
                      <p className="font-code text-[10px] font-bold opacity-50 uppercase">Access Level: {profile.role}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="border-2 border-border bg-background p-3 font-code font-bold text-[10px] uppercase">
                      GOAL: {profile.goal}
                    </div>
                  </div>
                </div>
                <QuickLog />
                <PomodoroTimer />
              </div>

              {/* Center/Right: Visuals & System Status */}
              <div className="md:col-span-8 space-y-8">
                <DashboardVisuals sessions={sessions || []} logs={neuroLogs || []} />

                <div className="border-2 border-border bg-black text-white p-6 shadow-[8px_8px_0px_0px_var(--border)] flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div>
                      <h3 className="font-bold uppercase tracking-tighter font-code text-sm">System Kernel</h3>
                      <p className="font-code text-[10px] opacity-70">OPERATIONAL</p>
                    </div>
                  </div>
                  <div className="text-right font-code text-[10px] opacity-70">
                    <p>MEM_POOL: ACTIVE</p>
                    <p>SYNC_CON: STABLE</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="border-2 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--border)]">
                  <ProjectManager initialProjects={projects || []} />
                </div>
              </div>
              <div>
                <SessionTimer activeSession={activeSession} projects={projects || []} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-8">
            <div className="border-2 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--border)]">
              <TaskManager initialTasks={tasks || []} />
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-8">
            <div className="border-2 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--border)]">
              <GoalTracker initialGoals={goals || []} />
            </div>
          </TabsContent>

          <TabsContent value="stream" className="space-y-8">
            <div className="border-2 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--border)]">
              <NeuroLogManager initialLogs={neuroLogs || []} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
