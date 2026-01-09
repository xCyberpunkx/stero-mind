'use client'

import { useState } from 'react'
import { Plus, Trash2, Briefcase, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createProject, deleteProject } from '@/lib/actions/dashboard'

export function ProjectsTab({ projects }: { projects: any[] }) {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold uppercase font-code">Project Clusters</h2>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none font-code font-bold text-xs"
        >
          {isAdding ? 'CANCEL' : 'INITIALIZE_PROJECT'}
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          await createProject(formData)
          setIsAdding(false)
        }} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="name" 
              placeholder="PROJECT_NAME" 
              className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary"
              required 
            />
            <input 
              name="color" 
              type="color" 
              defaultValue="#000000"
              className="w-full h-12 border-2 border-black p-1 bg-white cursor-pointer"
            />
          </div>
          <textarea 
            name="description" 
            placeholder="PROJECT_GOAL / METADATA" 
            className="w-full border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary min-h-[100px]"
          />
          <Button type="submit" className="w-full bg-black text-white rounded-none font-code font-bold">DEPLOY_CLUSTER</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 border-2 border-black border-dashed p-12 text-center opacity-50 font-code uppercase">
            No active project clusters.
          </div>
        ) : (
          projects.map(project => (
            <div 
              key={project.id} 
              className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="w-8 h-8 border-2 border-black" 
                  style={{ backgroundColor: project.color }}
                />
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="p-2 hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              <h3 className="text-xl font-bold uppercase font-code mb-2">{project.name}</h3>
              <p className="text-sm opacity-70 mb-6 line-clamp-2">{project.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-black/10">
                <span className="text-[10px] font-bold font-code opacity-50 uppercase">STATUS: {project.status || 'ACTIVE'}</span>
                <Briefcase className="w-4 h-4 opacity-30" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
