'use client'

import { useState } from 'react'
import { Plus, Trash2, CheckCircle, Circle, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createTask, deleteTask, toggleTask } from '@/lib/actions/dashboard'

export function TasksTab({ tasks, projects }: { tasks: any[], projects: any[] }) {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold uppercase font-code">Task Matrix</h2>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none font-code font-bold text-xs"
        >
          {isAdding ? 'CANCEL' : 'INITIALIZE_TASK'}
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          await createTask(formData)
          setIsAdding(false)
        }} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="title" 
              placeholder="TASK_TITLE" 
              className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary"
              required 
            />
            <select 
              name="project_id" 
              className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary"
            >
              <option value="">NO_PROJECT_LINK</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <textarea 
            name="description" 
            placeholder="TASK_METADATA / DESCRIPTION" 
            className="w-full border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary min-h-[100px]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="priority" className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary">
              <option value="low">PRIORITY: LOW</option>
              <option value="medium">PRIORITY: MEDIUM</option>
              <option value="high">PRIORITY: HIGH</option>
            </select>
            <input type="date" name="due_date" className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary" />
          </div>
          <Button type="submit" className="w-full bg-black text-white rounded-none font-code font-bold">DEPLOY_TASK</Button>
        </form>
      )}

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="border-2 border-black border-dashed p-12 text-center opacity-50 font-code uppercase">
            No active tasks in protocol.
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between group ${task.is_completed ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTask(task.id, !task.is_completed)}>
                  {task.is_completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>
                <div>
                  <h4 className={`font-bold uppercase font-code ${task.is_completed ? 'line-through' : ''}`}>{task.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold opacity-50 uppercase mt-1">
                    {task.project_id && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {projects.find(p => p.id === task.project_id)?.name}
                      </span>
                    )}
                    <span className={`px-1 border border-black ${task.priority === 'high' ? 'bg-red-200' : 'bg-blue-100'}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
