'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layout, CheckSquare, Briefcase, Brain, Calendar as CalendarIcon, Clock } from 'lucide-react'
import { TasksTab } from './Tasks'
import { ProjectsTab } from './Projects'
import { NeuroLogsTab } from './NeuroLogs'
import { CalendarTab } from './Calendar'
import { SessionTracker } from './SessionTracker'

export function DashboardClient({ 
  tasks, 
  projects, 
  logs, 
  sessions,
  profile
}: { 
  tasks: any[], 
  projects: any[], 
  logs: any[], 
  sessions: any[],
  profile: any
}) {
  const activeSession = sessions.find(s => s.is_active)
  const historicalSessions = sessions.filter(s => !s.is_active)

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-4 -mx-6 px-6 md:pb-0 md:mx-0 md:px-0">
          <TabsList className="bg-transparent h-auto p-0 flex gap-4 md:gap-8 min-w-max border-b-2 border-black rounded-none mb-8">
            <TabsTrigger 
              value="overview" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 font-code font-bold uppercase tracking-tighter transition-all"
            >
              <Layout className="w-4 h-4 mr-2" />
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 font-code font-bold uppercase tracking-tighter transition-all"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              TASKS
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 font-code font-bold uppercase tracking-tighter transition-all"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              PROJECTS
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 font-code font-bold uppercase tracking-tighter transition-all"
            >
              <Brain className="w-4 h-4 mr-2" />
              NEURO_LOGS
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 font-code font-bold uppercase tracking-tighter transition-all"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              CALENDAR
            </TabsTrigger>
            <TabsTrigger 
              value="tracker" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 font-code font-bold uppercase tracking-tighter transition-all"
            >
              <Clock className="w-4 h-4 mr-2" />
              TRACKER
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-bold uppercase font-code mb-6">System Health</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border-2 border-black p-4 text-center">
                    <span className="block text-[10px] font-bold opacity-50 uppercase mb-1">TASKS</span>
                    <span className="text-3xl font-bold font-code">{tasks.filter(t => !t.is_completed).length}</span>
                  </div>
                  <div className="border-2 border-black p-4 text-center">
                    <span className="block text-[10px] font-bold opacity-50 uppercase mb-1">PROJECTS</span>
                    <span className="text-3xl font-bold font-code">{projects.length}</span>
                  </div>
                  <div className="border-2 border-black p-4 text-center">
                    <span className="block text-[10px] font-bold opacity-50 uppercase mb-1">LOGS</span>
                    <span className="text-3xl font-bold font-code">{logs.length}</span>
                  </div>
                  <div className="border-2 border-black p-4 text-center">
                    <span className="block text-[10px] font-bold opacity-50 uppercase mb-1">SESSIONS</span>
                    <span className="text-3xl font-bold font-code">{sessions.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-2 border-black bg-secondary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-bold uppercase font-code mb-6">Recent Neural Activity</h3>
                <div className="space-y-4">
                  {logs.slice(0, 3).map(log => (
                    <div key={log.id} className="border border-black bg-white p-4 font-medium text-sm">
                      <span className="font-bold uppercase block mb-1">{log.title}</span>
                      <p className="opacity-70 line-clamp-1">{log.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1 border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
              <h3 className="text-xl font-bold uppercase font-code mb-6 underline decoration-4">Protocol Core</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest block mb-2">PRIMARY_OBJECTIVE</span>
                  <div className="border border-black p-3 text-xs font-bold uppercase bg-secondary/20">
                    {profile.goal}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest block mb-2">TRACKING_VECTORS</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests?.map((i: string) => (
                      <span key={i} className="text-[9px] border border-black px-2 py-0.5 bg-white uppercase font-bold">{i}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <TasksTab tasks={tasks} projects={projects} />
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <ProjectsTab projects={projects} />
        </TabsContent>

        <TabsContent value="logs" className="mt-0">
          <NeuroLogsTab logs={logs} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <CalendarTab tasks={tasks} logs={logs} sessions={sessions} />
        </TabsContent>

        <TabsContent value="tracker" className="mt-0">
          <SessionTracker activeSession={activeSession} historicalSessions={historicalSessions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
