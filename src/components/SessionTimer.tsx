'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Clock, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { startSession, stopSession } from '@/app/dashboard/actions'

interface Session {
    id: string
    project_id: string | null
    start_time: string
    is_active: boolean
}

interface Project {
    id: string
    name: string
}

export function SessionTimer({
    activeSession,
    projects
}: {
    activeSession: Session | null
    projects: Project[]
}) {
    const [elapsed, setElapsed] = useState(0)
    const [selectedProject, setSelectedProject] = useState<string>('')

    useEffect(() => {
        if (activeSession) {
            const interval = setInterval(() => {
                const start = new Date(activeSession.start_time).getTime()
                const now = Date.now()
                setElapsed(Math.floor((now - start) / 1000))
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [activeSession])

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-tighter font-code">Session Timer</h3>
            </div>

            {activeSession ? (
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold font-code mb-2">{formatTime(elapsed)}</div>
                        <div className="text-xs font-code opacity-50 uppercase">Active Session</div>
                    </div>
                    <form action={async () => {
                        await stopSession(activeSession.id)
                    }}>
                        <Button
                            type="submit"
                            className="w-full bg-red-500 text-white hover:bg-red-600 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-12 font-code font-bold text-xs"
                        >
                            <Square className="w-4 h-4 mr-2" />
                            STOP SESSION
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="space-y-4">
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="w-full bg-white border-2 border-black p-3 font-code text-xs uppercase focus:outline-none"
                    >
                        <option value="">NO PROJECT</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                    <form action={async () => {
                        await startSession(selectedProject || '')
                    }}>
                        <Button
                            type="submit"
                            className="w-full bg-green-500 text-white hover:bg-green-600 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-12 font-code font-bold text-xs"
                        >
                            <Play className="w-4 h-4 mr-2" />
                            START SESSION
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}
