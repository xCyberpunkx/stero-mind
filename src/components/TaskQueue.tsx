"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, ListTodo, CheckCircle2, Circle, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function TaskQueue({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTasks();
    
    const subscription = supabase
      .channel("tasks_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks", filter: `user_id=eq.${userId}` },
        () => fetchTasks()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  async function fetchTasks() {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (data) setTasks(data);
    setLoading(false);
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { error } = await supabase.from("tasks").insert({
      user_id: userId,
      title: newTask,
      status: "pending",
      is_completed: false,
    });

    if (!error) {
      setNewTask("");
      fetchTasks();
    }
  }

  async function toggleTask(id: string, currentStatus: boolean) {
    await supabase
      .from("tasks")
      .update({ is_completed: !currentStatus, status: !currentStatus ? "completed" : "pending" })
      .eq("id", id);
  }

  async function deleteTask(id: string) {
    await supabase.from("tasks").delete().eq("id", id);
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center">
            <ListTodo className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-xl uppercase tracking-tighter">Task_Queue</h2>
        </div>
        <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
      </div>

      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <Input
          placeholder="Inject new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border-2 border-black rounded-none h-10 font-code text-xs uppercase"
        />
        <Button 
          type="submit" 
          size="icon"
          className="bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none shrink-0 h-10 w-10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`group border-2 border-black p-4 flex items-center justify-between transition-all ${
                task.is_completed ? "bg-secondary/20 opacity-60" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleTask(task.id, task.is_completed)}
                  className="hover:scale-110 transition-transform"
                >
                  {task.is_completed ? (
                    <CheckCircle2 className="w-5 h-5 text-black" />
                  ) : (
                    <Circle className="w-5 h-5 text-black" />
                  )}
                </button>
                <h4 className={`font-code font-bold text-xs uppercase ${task.is_completed ? "line-through" : ""}`}>
                  {task.title}
                </h4>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {!loading && tasks.length === 0 && (
            <div className="text-center py-8 opacity-30 font-code text-xs uppercase italic">
              Queue empty. Awaiting input.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
