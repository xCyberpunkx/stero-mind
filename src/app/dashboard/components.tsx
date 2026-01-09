'use client'

import * as React from "react"
import { Plus, Trash2, CheckCircle2, Circle, Clock, Tag, MessageSquare, Calendar as CalendarIcon, Briefcase, ListTodo, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProject, createTask, createNeuroLog, deleteProject, deleteTask, deleteNeuroLog, updateTask } from "./actions"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export function ProjectList({ projects }: { projects: any[] }) {
  const [isAdding, setIsAdding] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-code font-bold text-lg uppercase">Projects</h3>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm" className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
          <Plus className="w-4 h-4 mr-2" />
          NEW PROJECT
        </Button>
      </div>

      {isAdding && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-6">
          <form action={async (formData) => {
            await createProject(formData)
            setIsAdding(false)
          }} className="space-y-4">
            <Input name="title" placeholder="Project Title" required className="border-2 border-black rounded-none" />
            <Textarea name="description" placeholder="Project Description" className="border-2 border-black rounded-none min-h-[100px]" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="font-code font-bold text-xs uppercase">Cancel</Button>
              <Button type="submit" className="bg-black text-white rounded-none font-code font-bold text-xs uppercase px-6">Initialize</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all bg-white overflow-hidden group">
            <CardHeader className="p-4 border-b-2 border-black bg-secondary/20">
              <div className="flex justify-between items-start">
                <CardTitle className="font-code font-bold text-sm uppercase truncate">{project.title}</CardTitle>
                <button onClick={() => deleteProject(project.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{project.description || 'No description provided.'}</p>
              <div className="flex justify-between items-center text-[10px] font-bold font-code opacity-50 uppercase">
                <span>Status: {project.status}</span>
                <span>ID: {project.id.slice(0, 8)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function TaskList({ tasks, projects }: { tasks: any[], projects: any[] }) {
  const [isAdding, setIsAdding] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-code font-bold text-lg uppercase">Task Matrix</h3>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm" className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
          <Plus className="w-4 h-4 mr-2" />
          NEW TASK
        </Button>
      </div>

      {isAdding && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-6">
          <form action={async (formData) => {
            await createTask(formData)
            setIsAdding(false)
          }} className="space-y-4">
            <Input name="title" placeholder="Task Title" required className="border-2 border-black rounded-none" />
            <Textarea name="description" placeholder="Notes/Description" className="border-2 border-black rounded-none min-h-[80px]" />
            <div className="grid grid-cols-2 gap-4">
              <Select name="project_id">
                <SelectTrigger className="border-2 border-black rounded-none">
                  <SelectValue placeholder="Project Link" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black rounded-none">
                  <SelectItem value="">No Project</SelectItem>
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select name="priority" defaultValue="medium">
                <SelectTrigger className="border-2 border-black rounded-none">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black rounded-none">
                  <SelectItem value="low">LOW</SelectItem>
                  <SelectItem value="medium">MEDIUM</SelectItem>
                  <SelectItem value="high">HIGH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input name="due_date" type="date" className="border-2 border-black rounded-none" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="font-code font-bold text-xs uppercase">Cancel</Button>
              <Button type="submit" className="bg-black text-white rounded-none font-code font-bold text-xs uppercase px-6">Queue Task</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-4 border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <button 
              onClick={() => updateTask(task.id, { status: task.status === 'completed' ? 'todo' : 'completed' })}
              className="w-6 h-6 border-2 border-black flex items-center justify-center shrink-0 hover:bg-black hover:text-white transition-colors"
            >
              {task.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-20" />}
            </button>
            <div className="flex-1 min-w-0">
              <h4 className={cn("font-code font-bold text-sm uppercase truncate", task.status === 'completed' && "line-through opacity-50")}>{task.title}</h4>
              <div className="flex items-center gap-3 mt-1 overflow-hidden">
                {task.priority === 'high' && <Badge className="bg-red-500 text-white rounded-none text-[8px] h-4">HIGH_PRIO</Badge>}
                {task.project_id && (
                  <span className="text-[10px] font-bold font-code opacity-50 uppercase truncate">
                    // {projects.find(p => p.id === task.project_id)?.title}
                  </span>
                )}
                {task.due_date && (
                  <span className="text-[10px] font-bold font-code opacity-50 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NeuroLogList({ logs }: { logs: any[] }) {
  const [isAdding, setIsAdding] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-code font-bold text-lg uppercase">Neuro Logs</h3>
        <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm" className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
          <Plus className="w-4 h-4 mr-2" />
          NEW SESSION
        </Button>
      </div>

      {isAdding && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-6">
          <form action={async (formData) => {
            await createNeuroLog(formData)
            setIsAdding(false)
          }} className="space-y-4">
            <Input name="title" placeholder="Session Title (e.g. Morning Focus)" required className="border-2 border-black rounded-none" />
            <Textarea name="content" placeholder="Log entry... (Markdown supported)" className="border-2 border-black rounded-none min-h-[120px]" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="duration_minutes" type="number" placeholder="Duration (min)" className="border-2 border-black rounded-none" />
              <Select name="mood">
                <SelectTrigger className="border-2 border-black rounded-none">
                  <SelectValue placeholder="Mood State" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black rounded-none">
                  <SelectItem value="peak">PEAK FLOW</SelectItem>
                  <SelectItem value="focused">FOCUSED</SelectItem>
                  <SelectItem value="neutral">NEUTRAL</SelectItem>
                  <SelectItem value="fatigued">FATIGUED</SelectItem>
                  <SelectItem value="cluttered">CLUTTERED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input name="tags" placeholder="tags, separated, by, commas" className="border-2 border-black rounded-none" />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="font-code font-bold text-xs uppercase">Cancel</Button>
              <Button type="submit" className="bg-black text-white rounded-none font-code font-bold text-xs uppercase px-6">Commit Log</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-6">
        {logs.map((log) => (
          <div key={log.id} className="border-l-4 border-black pl-6 py-2 group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-code font-bold text-sm uppercase">{log.title}</h4>
                <div className="flex items-center gap-3 text-[10px] font-bold font-code opacity-50 uppercase mt-1">
                  <span>{new Date(log.created_at).toLocaleString()}</span>
                  <span>// {log.duration_minutes} MIN</span>
                  <Badge variant="outline" className="border-black rounded-none text-[8px] h-4 uppercase">{log.mood || 'STABLE'}</Badge>
                </div>
              </div>
              <button onClick={() => deleteNeuroLog(log.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
            <p className="text-xs text-black/80 whitespace-pre-wrap mb-3 leading-relaxed">{log.content}</p>
            <div className="flex flex-wrap gap-2">
              {log.tags?.map((tag: string) => (
                <span key={tag} className="text-[9px] font-bold border border-black/10 px-2 py-0.5 bg-secondary/50 uppercase">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardTabs({ projects, tasks, logs }: { projects: any[], tasks: any[], logs: any[] }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Find tasks with due dates
  const tasksWithDates = tasks.filter(t => t.due_date).map(t => ({
    ...t,
    date: new Date(t.due_date)
  }))

  const selectedDateTasks = tasksWithDates.filter(t => 
    date && t.date.toDateString() === date.toDateString()
  )

  return (
    <Tabs defaultValue="overview" className="space-y-8">
      <TabsList className="bg-white border-2 border-black p-1 h-auto rounded-none gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <TabsTrigger value="overview" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none font-code font-bold text-[10px] px-6 py-2 uppercase">OVERVIEW</TabsTrigger>
        <TabsTrigger value="tasks" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none font-code font-bold text-[10px] px-6 py-2 uppercase">TASKS</TabsTrigger>
        <TabsTrigger value="projects" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none font-code font-bold text-[10px] px-6 py-2 uppercase">PROJECTS</TabsTrigger>
        <TabsTrigger value="logs" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none font-code font-bold text-[10px] px-6 py-2 uppercase">LOGS</TabsTrigger>
        <TabsTrigger value="calendar" className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none font-code font-bold text-[10px] px-6 py-2 uppercase">CALENDAR</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TaskList tasks={tasks.filter(t => t.status !== 'completed').slice(0, 5)} projects={projects} />
            <ProjectList projects={projects.slice(0, 4)} />
          </div>
          <div className="space-y-8">
            <NeuroLogList logs={logs.slice(0, 3)} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="tasks">
        <div className="max-w-2xl">
          <TaskList tasks={tasks} projects={projects} />
        </div>
      </TabsContent>

      <TabsContent value="projects">
        <ProjectList projects={projects} />
      </TabsContent>

      <TabsContent value="logs">
        <div className="max-w-3xl">
          <NeuroLogList logs={logs} />
        </div>
      </TabsContent>

      <TabsContent value="calendar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-none w-full flex justify-center"
              />
            </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="border-b-2 border-black pb-4 mb-4">
              <h3 className="font-code font-bold text-lg uppercase flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                DUE ON: {date?.toLocaleDateString()}
              </h3>
            </div>
            {selectedDateTasks.length > 0 ? (
              <TaskList tasks={selectedDateTasks} projects={projects} />
            ) : (
              <div className="border-2 border-dashed border-black/20 p-12 text-center">
                <p className="font-code text-[10px] font-bold opacity-30 uppercase">No scheduled operations for this vector.</p>
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
