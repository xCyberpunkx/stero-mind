'use client'

import { BarChart3 } from 'lucide-react'

interface VisualsProps {
    sessions: any[]
    logs: any[]
}

export function DashboardVisuals({ sessions, logs }: VisualsProps) {
    // Simple logic to count logs per day for the last 7 days
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d.toISOString().split('T')[0]
    }).reverse()

    const logCounts = last7Days.map(date =>
        logs.filter(log => log.created_at.startsWith(date)).length
    )

    const maxLogs = Math.max(...logCounts, 1)

    return (
        <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-tighter font-code">System_Metrics</h3>
            </div>
            <div className="h-32 flex items-end gap-2 px-2">
                {logCounts.map((count, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                            className="w-full bg-black border-2 border-black transition-all duration-500"
                            style={{ height: `${(count / maxLogs) * 100}%`, minHeight: count > 0 ? '4px' : '0' }}
                        />
                        <span className="font-code text-[8px] font-bold opacity-30">{last7Days[i].split('-')[2]}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center font-code text-[10px] font-bold opacity-30 uppercase">Neural Stream: 7 Day Activity</div>
        </div>
    )
}
