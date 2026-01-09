"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Check, Trash2, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Task {
  id: string
  title: string
  is_completed: boolean
}

export function TaskQueue() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, is_completed')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addTask() {
    if (!newTask.trim()) return
    setAdding(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title: newTask, user_id: user.id, is_completed: false }])
        .select()
      
      if (error) throw error
      if (data) {
        setTasks([data[0], ...tasks])
        setNewTask('')
      }
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setAdding(false)
    }
  }

  async function toggleTask(id: string, isCompleted: boolean) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_completed: !isCompleted })
        .eq('id', id)
      
      if (error) throw error
      setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: !isCompleted } : t))
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  async function deleteTask(id: string) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setTasks(tasks.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl uppercase tracking-tighter flex items-center gap-2">
          Task_Queue
          <span className="text-[10px] bg-black text-white px-2 py-0.5 font-code">{tasks.length}</span>
        </h3>
      </div>

      <div className="flex gap-2 mb-6">
        <Input 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New core objective..."
          className="border-2 border-black rounded-none h-12 font-code text-xs focus-visible:ring-0"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <Button 
          onClick={addTask}
          disabled={adding}
          className="bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none px-6 h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px] pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin opacity-20" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex items-center justify-between border-2 border-black p-3 transition-all ${task.is_completed ? 'bg-secondary/50' : 'bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleTask(task.id, task.is_completed)}
                    className={`w-5 h-5 border-2 border-black flex items-center justify-center transition-colors ${task.is_completed ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    {task.is_completed && <Check className="w-3 h-3" />}
                  </button>
                  <span className={`font-code text-xs uppercase ${task.is_completed ? 'line-through opacity-50' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {!loading && tasks.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-black/20 font-code text-[10px] uppercase opacity-50">
                Queue empty. Initialize new task.
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
