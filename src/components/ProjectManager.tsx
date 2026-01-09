'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit, Folder, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createProject, deleteProject } from '@/app/dashboard/actions'

interface Project {
    id: string
    name: string
    description: string
    status: string
    created_at: string
}

export function ProjectManager({ initialProjects }: { initialProjects: Project[] }) {
    const [isAdding, setIsAdding] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-code font-bold text-lg uppercase tracking-tighter flex items-center gap-2">
                    <Folder className="w-5 h-5" />
                    Project Management
                </h3>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-4 font-code font-bold text-xs"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    NEW PROJECT
                </Button>
            </div>

            <div className="space-y-3">
                {isAdding && (
                    <form action={async (formData) => {
                        await createProject(formData)
                        setIsAdding(false)
                    }} className="border-2 border-black p-4 bg-secondary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                        <input
                            name="name"
                            placeholder="PROJECT_NAME"
                            autoFocus
                            required
                            className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
                        />
                        <textarea
                            name="description"
                            placeholder="PROJECT_DESCRIPTION"
                            className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none h-20 resize-none"
                        />
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-[10px] h-10 px-4">CREATE</Button>
                            <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="rounded-none border-2 border-black font-code text-[10px] h-10 px-4">CANCEL</Button>
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {initialProjects.map((project) => (
                        <div key={project.id} className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-1 transition-transform">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <FolderOpen className="w-5 h-5" />
                                    <h4 className="font-bold uppercase tracking-tight text-sm">{project.name}</h4>
                                </div>
                                <button
                                    onClick={() => deleteProject(project.id)}
                                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white border border-transparent hover:border-black"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            {project.description && (
                                <p className="text-xs opacity-70 leading-relaxed">{project.description}</p>
                            )}
                            <div className="mt-3 pt-3 border-t border-black/10 flex justify-between items-center">
                                <span className="font-code text-[9px] font-bold opacity-50 uppercase">
                                    {project.status}
                                </span>
                                <span className="font-code text-[9px] opacity-50">
                                    {new Date(project.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {initialProjects.length === 0 && !isAdding && (
                    <div className="border-2 border-dashed border-black/20 p-8 text-center text-xs font-code opacity-50 uppercase">
                        No projects yet // Create your first project
                    </div>
                )}
            </div>
        </div>
    )
}
