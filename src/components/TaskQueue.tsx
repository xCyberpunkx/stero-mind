'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, ListTodo, Plus } from 'lucide-react'
import { addTask, toggleTask } from '@/app/dashboard/actions'

interface Task {
  id: string
  title: string
  is_completed: boolean
}

export function TaskQueue({ initialTasks }: { initialTasks: Task[] }) {
  const [isAdding, setIsAdding] = useState(false)

  async function handleAddTask(formData: FormData) {
    setIsAdding(true)
    try {
      await addTask(formData)
      const form = document.getElementById('add-task-form') as HTMLFormElement
      form?.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-black flex items-center justify-center bg-secondary">
            <ListTodo className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-lg uppercase tracking-tighter font-code">Task_Queue</h3>
        </div>
        <span className="font-code text-[10px] font-bold opacity-30">{initialTasks.length} ACTIVE</span>
      </div>

      <div className="flex-1 space-y-2 mb-6 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {initialTasks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-black/10">
            <p className="font-code text-[10px] font-bold opacity-30 uppercase">Queue_Empty</p>
          </div>
        ) : (
          initialTasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-3 border-2 border-black transition-all ${task.is_completed ? 'bg-secondary/20 opacity-50' : 'bg-white'}`}
            >
              <span className={`font-code text-xs uppercase font-bold truncate mr-4 ${task.is_completed ? 'line-through' : ''}`}>
                {task.title}
              </span>
              <button 
                onClick={() => toggleTask(task.id, task.is_completed)}
                className="shrink-0 hover:scale-110 transition-transform"
              >
                {task.is_completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
            </div>
          ))
        )}
      </div>

      <form id="add-task-form" action={handleAddTask} className="flex gap-2">
        <input
          name="title"
          placeholder="NEW_TASK..."
          required
          className="flex-1 border-2 border-black p-2 font-code text-xs uppercase focus:outline-none focus:bg-secondary/20 transition-colors"
        />
        <Button 
          disabled={isAdding}
          className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-3 transition-all"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
