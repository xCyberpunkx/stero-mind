'use client'

import { Target, Plus, CheckCircle2, Circle, Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { addGoal } from '@/app/dashboard/actions'

interface Goal {
    id: string
    title: string
    target_date: string
    is_completed: boolean
}

export function GoalTracker({ initialGoals }: { initialGoals: Goal[] }) {
    const [isAdding, setIsAdding] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-code font-bold text-lg uppercase tracking-tighter flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Milestones & Goals
                </h3>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-4 font-code font-bold text-xs"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    SET GOAL
                </Button>
            </div>

            <div className="space-y-3">
                {isAdding && (
                    <form action={async (formData) => {
                        await addGoal(formData)
                        setIsAdding(false)
                    }} className="border-2 border-black p-4 bg-secondary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                        <input
                            name="title"
                            placeholder="GOAL_SPECIFICATION"
                            autoFocus
                            required
                            className="bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
                        />
                        <div className="flex gap-2">
                            <input
                                name="target_date"
                                type="date"
                                required
                                className="flex-1 bg-white border-2 border-black p-2 font-code text-xs focus:outline-none uppercase"
                            />
                            <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-[10px] h-10 px-4">ESTABLISH</Button>
                            <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="rounded-none border-2 border-black font-code text-[10px] h-10 px-4">ABORT</Button>
                        </div>
                    </form>
                )}

                {initialGoals.map((goal) => (
                    <div key={goal.id} className={`border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between group transition-all ${goal.is_completed ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 border-2 border-black flex items-center justify-center">
                                <Target className={`w-5 h-5 ${goal.is_completed ? 'text-green-500' : 'text-black'}`} />
                            </div>
                            <div>
                                <span className={`font-bold uppercase tracking-tight text-sm block ${goal.is_completed ? 'line-through' : ''}`}>
                                    {goal.title}
                                </span>
                                <span className="font-code text-[9px] font-bold opacity-50 uppercase flex items-center gap-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    TARGET: {new Date(goal.target_date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {initialGoals.length === 0 && !isAdding && (
                    <div className="border-2 border-dashed border-black/20 p-8 text-center text-xs font-code opacity-50 uppercase">
                        No milestones established
                    </div>
                )}
            </div>
        </div>
    )
}
