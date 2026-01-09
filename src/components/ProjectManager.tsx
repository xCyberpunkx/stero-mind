'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createProject, updateProject, deleteProject } from '@/app/dashboard/actions'

interface Project {
  id: string
  name: string
  description: string
  status: string
}

export function ProjectManager({ initialProjects }: { initialProjects: Project[] }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-code font-bold text-lg uppercase tracking-tighter">Project Clusters</h3>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-4 font-code font-bold text-xs"
        >
          <Plus className="w-4 h-4 mr-2" />
          NEW CLUSTER
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isAdding && (
          <form action={async (formData) => {
            await createProject(formData)
            setIsAdding(false)
          }} className="border-2 border-black p-4 bg-secondary/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <input 
              name="name" 
              placeholder="PROJECT NAME" 
              required 
              className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
            />
            <textarea 
              name="description" 
              placeholder="DESCRIPTION" 
              className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none h-20"
            />
            <div className="flex gap-2">
              <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-[10px] h-8 px-4">SAVE</Button>
              <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="rounded-none border-2 border-black font-code text-[10px] h-8 px-4">CANCEL</Button>
            </div>
          </form>
        )}

        {initialProjects.map((project) => (
          <div key={project.id} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
            {editingId === project.id ? (
              <form action={async (formData) => {
                await updateProject(project.id, formData)
                setEditingId(null)
              }} className="space-y-4">
                <input 
                  name="name" 
                  defaultValue={project.name} 
                  className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
                />
                <textarea 
                  name="description" 
                  defaultValue={project.description} 
                  className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none h-20"
                />
                <div className="flex gap-2">
                  <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-[10px] h-8 px-4">UPDATE</Button>
                  <Button type="button" onClick={() => setEditingId(null)} variant="outline" className="rounded-none border-2 border-black font-code text-[10px] h-8 px-4">CANCEL</Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold uppercase tracking-tighter mb-1">{project.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingId(project.id)} className="p-1 hover:bg-secondary"><Edit2 className="w-3 h-3" /></button>
                  <button onClick={() => deleteProject(project.id)} className="p-1 hover:bg-destructive hover:text-white"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            )}
          </div>
        ))}

        {initialProjects.length === 0 && !isAdding && (
          <div className="border-2 border-dashed border-black/20 p-8 text-center text-xs font-code opacity-50 uppercase">
            No active project clusters
          </div>
        )}
      </div>
    </div>
  )
}
