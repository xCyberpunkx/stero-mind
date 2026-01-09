'use client'

import { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addTask, toggleTask, deleteTask } from '@/app/dashboard/actions'

interface Task {
    id: string
    title: string
    is_completed: boolean
    created_at: string
}

export function TaskManager({ initialTasks }: { initialTasks: Task[] }) {
    const [isAdding, setIsAdding] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-code font-bold text-lg uppercase tracking-tighter flex items-center gap-2">
                    <ListTodo className="w-5 h-5" />
                    Task Engineering
                </h3>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-4 font-code font-bold text-xs"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    ADD TASK
                </Button>
            </div>

            <div className="space-y-3">
                {isAdding && (
                    <form action={async (formData) => {
                        await addTask(formData)
                        setIsAdding(false)
                    }} className="border-2 border-black p-4 bg-secondary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-2">
                        <input
                            name="title"
                            placeholder="TASK_IDENTIFIER"
                            autoFocus
                            required
                            className="flex-1 bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
                        />
                        <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-[10px] h-10 px-4">DEPOY</Button>
                        <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="rounded-none border-2 border-black font-code text-[10px] h-10 px-4">ABORT</Button>
                    </form>
                )}

                {initialTasks.map((task) => (
                    <div key={task.id} className={`border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between group transition-all ${task.is_completed ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleTask(task.id, !task.is_completed)}
                                className="transition-transform active:scale-95"
                            >
                                {task.is_completed ? (
                                    <CheckCircle2 className="w-6 h-6 text-black" />
                                ) : (
                                    <Circle className="w-6 h-6 text-black/20" />
                                )}
                            </button>
                            <span className={`font-bold uppercase tracking-tight text-sm ${task.is_completed ? 'line-through' : ''}`}>
                                {task.title}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white border border-transparent hover:border-black"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {initialTasks.length === 0 && !isAdding && (
                    <div className="border-2 border-dashed border-black/20 p-8 text-center text-xs font-code opacity-50 uppercase">
                        Queue empty // No active tasks
                    </div>
                )}
            </div>
        </div>
    )
}
