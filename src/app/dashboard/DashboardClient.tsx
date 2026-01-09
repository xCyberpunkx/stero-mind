"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Brain, 
  Briefcase, 
  Layout, 
  Calendar as CalendarIcon,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  createProject, 
  deleteProject, 
  createTask, 
  toggleTask, 
  deleteTask, 
  createNeuroLog, 
  deleteNeuroLog 
} from "./actions";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface Task {
  id: string;
  title: string;
  is_completed: boolean;
  priority: string;
  project_id: string | null;
}

interface NeuroLog {
  id: string;
  title: string;
  content: string;
  mood: string;
  duration_minutes: number;
  created_at: string;
}

interface DashboardClientProps {
  projects: Project[];
  tasks: Task[];
  neuroLogs: NeuroLog[];
}

export function DashboardClient({ projects, tasks, neuroLogs }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-[600px] h-14 bg-white border-2 border-black p-1 gap-1 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <TabsTrigger value="overview" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-[10px]">Overview</TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-[10px]">Tasks</TabsTrigger>
          <TabsTrigger value="projects" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-[10px]">Projects</TabsTrigger>
          <TabsTrigger value="logs" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-code font-bold uppercase text-[10px]">Neuro-Logs</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
              <div className="flex justify-between items-center mb-4">
                <Briefcase className="w-6 h-6" />
                <span className="text-3xl font-bold">{projects.length}</span>
              </div>
              <h3 className="font-code font-bold uppercase text-xs">Active Projects</h3>
            </Card>
            <Card className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
              <div className="flex justify-between items-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span className="text-3xl font-bold">{tasks.filter(t => t.is_completed).length}/{tasks.length}</span>
              </div>
              <h3 className="font-code font-bold uppercase text-xs">Tasks Completed</h3>
            </Card>
            <Card className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
              <div className="flex justify-between items-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="text-3xl font-bold">{neuroLogs.length}</span>
              </div>
              <h3 className="font-code font-bold uppercase text-xs">Neural Logs</h3>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-bold text-xl uppercase mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Recent Tasks
              </h3>
              <div className="space-y-4">
                {tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border border-black/10 hover:border-black transition-colors">
                    <div className="flex items-center gap-3">
                      {task.is_completed ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Circle className="w-4 h-4" />}
                      <span className={task.is_completed ? "line-through opacity-50" : ""}>{task.title}</span>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-xs opacity-50 uppercase font-code">No active tasks</p>}
              </div>
            </div>

            <div className="border-2 border-black bg-black text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-grid invert opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-bold text-xl uppercase mb-4">Cognitive Flow</h3>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Your system state is currently evolving. Maintain neural input via logging to visualize your growth vectors.
                </p>
                <div className="flex items-center gap-4">
                  <Activity className="w-12 h-12 text-green-400 animate-pulse" />
                  <div className="font-code text-[10px] tracking-widest">
                    SYSTEM_STABLE: OK<br />
                    SYNC_STATE: ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TASKS */}
        <TabsContent value="tasks" className="mt-8 space-y-6">
          <Card className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <form action={async (fd) => {
              try {
                await createTask(fd);
                toast.success("Task initialized");
              } catch (e) {
                toast.error("Initialization failed");
              }
            }} className="flex flex-col md:flex-row gap-4">
              <Input name="title" placeholder="INITIATE_TASK_TITLE..." className="border-2 border-black rounded-none h-12 font-code" required />
              <select name="priority" className="border-2 border-black rounded-none h-12 px-4 font-code text-xs font-bold uppercase bg-white">
                <option value="low">LOW_PRIORITY</option>
                <option value="medium">MED_PRIORITY</option>
                <option value="high">HIGH_PRIORITY</option>
              </select>
              <select name="project_id" className="border-2 border-black rounded-none h-12 px-4 font-code text-xs font-bold uppercase bg-white">
                <option value="">NO_PROJECT</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>)}
              </select>
              <Button type="submit" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-12 px-8 font-code font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
                BOOT_TASK
              </Button>
            </form>
          </Card>

          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="group border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleTask(task.id, task.is_completed)} className="transition-transform hover:scale-110">
                    {task.is_completed ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <div className="flex flex-col">
                    <span className={`font-bold uppercase tracking-tight ${task.is_completed ? "line-through opacity-40" : ""}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-secondary border border-black/10 uppercase">{task.priority}</span>
                      {task.project_id && (
                        <span className="text-[9px] font-bold opacity-50 uppercase">
                          // {projects.find(p => p.id === task.project_id)?.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-red-600 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PROJECTS */}
        <TabsContent value="projects" className="mt-8 space-y-6">
          <Card className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <form action={async (fd) => {
              try {
                await createProject(fd);
                toast.success("Project cluster created");
              } catch (e) {
                toast.error("Cluster failed");
              }
            }} className="space-y-4">
              <Input name="name" placeholder="PROJECT_CLUSTER_NAME..." className="border-2 border-black rounded-none h-12 font-code" required />
              <Textarea name="description" placeholder="CLUSTER_INTENT_DESCRIPTION..." className="border-2 border-black rounded-none font-code min-h-[100px]" />
              <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-12 font-code font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
                INITIALIZE_CLUSTER
              </Button>
            </form>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.id} className="group border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none">{project.name}</h3>
                  <button onClick={() => deleteProject(project.id)} className="text-red-600 hover:bg-red-50 p-2 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm opacity-70 mb-8 font-medium leading-relaxed min-h-[60px]">
                  {project.description}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-black/10">
                  <span className="text-[10px] font-bold border-2 border-black px-2 py-1 bg-secondary uppercase">{project.status}</span>
                  <div className="flex -space-x-2">
                    {/* Placeholder for project stats */}
                    <div className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center text-[8px] font-bold">
                      {tasks.filter(t => t.project_id === project.id).length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* NEURO-LOGS */}
        <TabsContent value="logs" className="mt-8 space-y-6">
          <Card className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none">
            <form action={async (fd) => {
              try {
                await createNeuroLog(fd);
                toast.success("Neuro-log synced");
              } catch (e) {
                toast.error("Sync failed");
              }
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="title" placeholder="LOG_SESSION_TITLE..." className="border-2 border-black rounded-none h-12 font-code" required />
                <div className="flex gap-4">
                  <select name="mood" className="flex-1 border-2 border-black rounded-none h-12 px-4 font-code text-xs font-bold uppercase bg-white">
                    <option value="focused">FOCUSED_STATE</option>
                    <option value="neutral">NEUTRAL_STATE</option>
                    <option value="flow">FLOW_PEAK</option>
                    <option value="exhausted">SYSTEM_LOW</option>
                  </select>
                  <Input name="duration_minutes" type="number" placeholder="MINS" className="w-24 border-2 border-black rounded-none h-12 font-code" />
                </div>
              </div>
              <Textarea name="content" placeholder="CAPTURE_NEURAL_OUTPUT..." className="border-2 border-black rounded-none font-code min-h-[150px]" required />
              <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-12 font-code font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
                SYNC_NEURO_LOG
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            {neuroLogs.map(log => (
              <div key={log.id} className="group border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold opacity-30 uppercase font-code tracking-widest">
                      {new Date(log.created_at).toLocaleString()} // {log.duration_minutes}m
                    </span>
                    <h3 className="text-xl font-bold uppercase mt-1">{log.title}</h3>
                  </div>
                  <button onClick={() => deleteNeuroLog(log.id)} className="text-red-600 hover:bg-red-50 p-2 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mb-6 flex gap-2">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 border border-black uppercase">{log.mood}</span>
                </div>
                <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                  {log.content}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
