'use client'

import { Brain, Trash2, Clock, Smile } from 'lucide-react'
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
            <div className="flex justify-between items-center">
                <h3 className="font-code font-bold text-lg uppercase tracking-tighter flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Neural Logs (XP)
                </h3>
                <span className="font-code text-[10px] font-bold opacity-30">{initialLogs.length} SESSIONS_CAPTURED</span>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {initialLogs.map((log) => (
                    <div key={log.id} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group relative">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold uppercase tracking-tight text-sm">{log.title}</h4>
                            <button
                                onClick={() => deleteNeuroLog(log.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500 hover:text-white border border-transparent hover:border-black"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                            {log.content}
                        </p>

                        <div className="flex flex-wrap gap-4 border-t border-black/5 pt-3">
                            <div className="flex items-center gap-1.5 font-code text-[10px] font-bold opacity-50 uppercase">
                                <Clock className="w-3 h-3" />
                                {log.duration_minutes}m
                            </div>
                            <div className="flex items-center gap-1.5 font-code text-[10px] font-bold opacity-50 uppercase border-l border-black/10 pl-4">
                                <Smile className="w-3 h-3" />
                                {log.mood}
                            </div>
                            <div className="ml-auto font-code text-[9px] font-bold opacity-30 uppercase">
                                {new Date(log.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}

                {initialLogs.length === 0 && (
                    <div className="border-2 border-dashed border-black/20 p-8 text-center text-xs font-code opacity-50 uppercase">
                        No neural logs found // System idle
                    </div>
                )}
            </div>
        </div>
    )
}
