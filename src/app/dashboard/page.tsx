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
  CheckCircle2,
  Circle,
  Calendar as CalendarIcon,
  MessageSquare,
  Activity
} from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { 
  createProject, 
  createTask, 
  toggleTask, 
  createNeuroLog,
  createSession 
} from './actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

    // Fetch Data
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    const { data: tasks } = await supabase.from('tasks').select('*, projects(name)').order('created_at', { ascending: false })
    const { data: logs } = await supabase.from('neuro_logs').select('*').order('created_at', { ascending: false })
    const { data: sessions } = await supabase.from('sessions').select('*').order('created_at', { ascending: false })

    const stats = [
      { title: "Projects", icon: Briefcase, count: projects?.length || 0 },
      { title: "Tasks", icon: CheckCircle2, count: tasks?.filter(t => !t.is_completed).length || 0 },
      { title: "Neuro Logs", icon: Brain, count: logs?.length || 0 },
      { title: "Sessions", icon: Clock, count: sessions?.length || 0 },
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
                    DISCONNECT
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
                    Neural Interface: {profile.username || user.email}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                    Commander {profile.username || 'User'}.
                  </h1>
                </div>
                <div className="flex gap-4">
                  <Link href="/whitepaper">
                    <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary transition-all">
                      <BookOpen className="w-4 h-4 mr-2" />
                      SYSTEM_DOCS
                    </Button>
                  </Link>
                </div>
              </div>
            </header>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b-2 border-black bg-transparent h-auto p-0 mb-8 overflow-x-auto overflow-y-hidden">
                <TabsTrigger value="overview" className="rounded-none border-t-2 border-x-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-white font-code font-bold uppercase text-xs px-6 py-4 transition-all">Overview</TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-none border-t-2 border-x-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-white font-code font-bold uppercase text-xs px-6 py-4 transition-all">Tasks</TabsTrigger>
                <TabsTrigger value="projects" className="rounded-none border-t-2 border-x-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-white font-code font-bold uppercase text-xs px-6 py-4 transition-all">Projects</TabsTrigger>
                <TabsTrigger value="logs" className="rounded-none border-t-2 border-x-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-white font-code font-bold uppercase text-xs px-6 py-4 transition-all">Neuro Logs</TabsTrigger>
                <TabsTrigger value="tracker" className="rounded-none border-t-2 border-x-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-white font-code font-bold uppercase text-xs px-6 py-4 transition-all">Tracker</TabsTrigger>
                <TabsTrigger value="calendar" className="rounded-none border-t-2 border-x-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-white font-code font-bold uppercase text-xs px-6 py-4 transition-all">Calendar</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  {stats.map((stat, i) => (
                    <div key={i} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-secondary">
                          <stat.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-code font-bold text-xs uppercase mb-1">{stat.title}</h3>
                      <div className="text-3xl font-bold tracking-tighter uppercase">{stat.count}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <section className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold uppercase font-code">Recent Activities</h2>
                        <Button variant="outline" className="border-2 border-black rounded-none text-[10px] font-bold h-8">VIEW_ALL</Button>
                      </div>
                      <div className="space-y-4">
                        {tasks?.slice(0, 5).map((task) => (
                          <div key={task.id} className="flex items-center justify-between border-b-2 border-black/5 pb-4">
                            <div className="flex items-center gap-4">
                              <Activity className="w-4 h-4 opacity-30" />
                              <div>
                                <p className="font-bold text-sm uppercase">{task.title}</p>
                                <p className="text-[10px] font-code opacity-50">{task.projects?.name || 'PERSONAL'}</p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 border border-black uppercase ${task.is_completed ? 'bg-green-100' : 'bg-secondary'}`}>
                              {task.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <aside className="space-y-8">
                    <div className="border-2 border-black bg-secondary/30 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <h3 className="font-bold text-xl uppercase tracking-tighter mb-6">Core Status</h3>
                      <div className="space-y-4 font-code text-[10px] font-bold uppercase">
                        <div className="flex justify-between">
                          <span className="opacity-50">SYNC_STATUS:</span>
                          <span className="text-green-600">ENCRYPTED</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-50">COGNITIVE_LOAD:</span>
                          <span>NORMAL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-50">LATENCY:</span>
                          <span>24MS</span>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </TabsContent>

              <TabsContent value="tasks">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <div className="p-6 border-b-2 border-black bg-secondary/20 flex justify-between items-center">
                        <h3 className="font-bold uppercase font-code">Active Task Queue</h3>
                        <span className="text-[10px] font-bold opacity-50 font-code">{tasks?.length || 0} ITEMS</span>
                      </div>
                      <div className="divide-y-2 divide-black">
                        {tasks?.length === 0 ? (
                          <div className="p-12 text-center opacity-50 font-code text-sm">NO TASKS IN QUEUE</div>
                        ) : (
                          tasks?.map((task) => (
                            <div key={task.id} className="p-4 flex items-center justify-between group hover:bg-secondary/10">
                              <div className="flex items-center gap-4">
                                <form action={async () => {
                                  'use server'
                                  await toggleTask(task.id, !task.is_completed)
                                }}>
                                  <button type="submit" className="transition-transform active:scale-90">
                                    {task.is_completed ? (
                                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    ) : (
                                      <Circle className="w-6 h-6" />
                                    )}
                                  </button>
                                </form>
                                <div>
                                  <p className={`font-bold uppercase ${task.is_completed ? 'line-through opacity-30' : ''}`}>{task.title}</p>
                                  <div className="flex gap-2 mt-1">
                                    <span className="text-[9px] font-bold border border-black px-1 uppercase">{task.priority}</span>
                                    {task.projects?.name && <span className="text-[9px] font-bold border border-black px-1 uppercase bg-black text-white">{task.projects.name}</span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <form action={createTask} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-32">
                      <h3 className="font-bold uppercase font-code mb-6 border-b-2 border-black pb-2">Initialize Task</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Title</label>
                          <input name="title" required className="w-full border-2 border-black p-2 font-code text-xs outline-none focus:bg-secondary/10" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Project</label>
                          <select name="project_id" className="w-full border-2 border-black p-2 font-code text-xs outline-none">
                            <option value="">NONE</option>
                            {projects?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Priority</label>
                          <select name="priority" className="w-full border-2 border-black p-2 font-code text-xs outline-none">
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM" selected>MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                            <option value="CRITICAL">CRITICAL</option>
                          </select>
                        </div>
                        <Button type="submit" className="w-full bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none h-12 font-code font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all mt-4">
                          PUSH TO QUEUE
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 gap-6">
                      {projects?.length === 0 ? (
                        <div className="border-2 border-black p-12 text-center opacity-50 font-code text-sm bg-white">NO PROJECTS INITIALIZED</div>
                      ) : (
                        projects?.map((project) => (
                          <div key={project.id} className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-2xl font-bold uppercase tracking-tighter">{project.name}</h3>
                              <span className="text-[10px] font-bold border-2 border-black px-2 py-0.5 uppercase bg-secondary">{project.status}</span>
                            </div>
                            <p className="text-sm opacity-60 mb-6">{project.description}</p>
                            <div className="flex gap-4 pt-6 border-t-2 border-black/5">
                              <div className="flex-1">
                                <div className="h-2 border-2 border-black bg-secondary/20 mb-2">
                                  <div className="h-full bg-black w-1/3" />
                                </div>
                                <span className="text-[10px] font-bold font-code opacity-50">COMPLETION: 33%</span>
                              </div>
                              <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs h-10">OPEN_CLUSTER</Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <form action={createProject} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-32">
                      <h3 className="font-bold uppercase font-code mb-6 border-b-2 border-black pb-2">Initialize Project</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Project Name</label>
                          <input name="name" required className="w-full border-2 border-black p-2 font-code text-xs outline-none focus:bg-secondary/10" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Description</label>
                          <textarea name="description" rows={3} className="w-full border-2 border-black p-2 font-code text-xs outline-none focus:bg-secondary/10" />
                        </div>
                        <Button type="submit" className="w-full bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none h-12 font-code font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all mt-4">
                          CREATE_CLUSTER
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logs">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    {logs?.length === 0 ? (
                      <div className="border-2 border-black p-12 text-center opacity-50 font-code text-sm bg-white">NEURAL LOGS EMPTY</div>
                    ) : (
                      logs?.map((log) => (
                        <div key={log.id} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold uppercase font-code">{log.title}</h3>
                            <span className="text-[10px] font-bold opacity-50">{new Date(log.created_at).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm leading-relaxed mb-4">{log.content}</p>
                          <div className="flex gap-2">
                            <span className="text-[9px] font-bold border border-black px-2 py-0.5 uppercase bg-secondary">MOOD: {log.mood}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="md:col-span-1">
                    <form action={createNeuroLog} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-32">
                      <h3 className="font-bold uppercase font-code mb-6 border-b-2 border-black pb-2">Capture Log</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Title</label>
                          <input name="title" required className="w-full border-2 border-black p-2 font-code text-xs outline-none focus:bg-secondary/10" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Neuro-Content</label>
                          <textarea name="content" required rows={4} className="w-full border-2 border-black p-2 font-code text-xs outline-none focus:bg-secondary/10" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase font-code block mb-1">Cognitive State (Mood)</label>
                          <select name="mood" className="w-full border-2 border-black p-2 font-code text-xs outline-none">
                            <option value="FOCUSED">FOCUSED</option>
                            <option value="FLOW">FLOW</option>
                            <option value="SCATTERED">SCATTERED</option>
                            <option value="EXHAUSTED">EXHAUSTED</option>
                          </select>
                        </div>
                        <Button type="submit" className="w-full bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none h-12 font-code font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all mt-4">
                          COMMIT_TO_MEMORY
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tracker">
                <div className="border-2 border-black bg-white p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
                  <div className="w-32 h-32 border-4 border-black rounded-full mx-auto mb-8 flex items-center justify-center relative">
                    <div className="absolute inset-2 border-2 border-black border-dashed rounded-full animate-spin-slow" />
                    <Clock className="w-12 h-12" />
                  </div>
                  <h2 className="text-5xl font-bold uppercase tracking-tighter mb-4" style={{ fontFamily: "var(--font-serif)" }}>00:00:00</h2>
                  <p className="text-muted-foreground font-code text-sm mb-8 uppercase font-bold">Session Idle. Waiting for trigger.</p>
                  
                  <form action={createSession} className="max-w-md mx-auto space-y-4">
                    <input name="topic" placeholder="SESSION_TOPIC" className="w-full border-2 border-black p-4 font-code font-bold text-center outline-none" />
                    <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-16 text-xl font-code font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
                      INITIALIZE_FLOW
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="calendar">
                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold uppercase font-code">Temporal Vector</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs h-10 px-4">PREV</Button>
                      <Button variant="outline" className="border-2 border-black rounded-none font-code font-bold text-xs h-10 px-4">NEXT</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 border-2 border-black">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                      <div key={day} className="border-r-2 last:border-r-0 border-b-2 border-black p-2 text-center font-code font-bold text-[10px] bg-secondary/20">{day}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => (
                      <div key={i} className="border-r-2 last:border-r-0 border-b-2 border-black h-24 p-2 font-code text-[10px] font-bold opacity-30 group hover:opacity-100 transition-opacity cursor-pointer">
                        {i + 1 <= 31 ? i + 1 : ''}
                        {i === 15 && <div className="mt-2 p-1 bg-black text-white uppercase text-[8px]">CORE_SESSION</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
    )
}
