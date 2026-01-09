'use client'

import { Brain, Trash2, Calendar as CalendarIcon, Clock } from 'lucide-react'
import { deleteNeuroLog } from '@/app/dashboard/actions'

interface NeuroLog {
    id: string
    title: string
    content: string
    mood: string
    duration_minutes: number
    created_at: string
}

export function NeuroLogManager({ initialLogs }: { initialLogs: NeuroLog[] }) {
    return (
        <div className="space-y-6">
            <h3 className="font-code font-bold text-lg uppercase tracking-tighter flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Neural Logs (XP)
            </h3>

            <div className="space-y-4">
                {initialLogs.map((log) => (
                    <div key={log.id} className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-1 transition-transform relative">
                        <div className="flex justify-between items-start mb-2 opacity-50 font-code text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3" />
                                {new Date(log.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(log.created_at).toLocaleTimeString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-tight mb-2">{log.title}</h4>
                                <p className="text-xs opacity-70 leading-relaxed max-w-md">{log.content}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="border border-black px-2 py-1 text-[9px] font-bold uppercase bg-secondary/20">
                                    MOOD: {log.mood}
                                </span>
                                <button
                                    onClick={() => deleteNeuroLog(log.id)}
                                    className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white border border-transparent hover:border-black"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {initialLogs.length === 0 && (
                    <div className="border-2 border-dashed border-black/20 p-12 text-center flex flex-col items-center justify-center opacity-50">
                        <span className="text-2xl font-bold mb-2">0 SESSIONS_CAPTURED</span>
                        <span className="text-xs font-code uppercase">No neural logs found // System idle</span>
                    </div>
                )}
            </div>
        </div>
    )
}
