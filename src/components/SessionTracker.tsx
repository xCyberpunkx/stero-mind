'use client'

import { useState, useEffect } from 'react'
import { Play, Square, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { startSession, stopSession } from '@/app/dashboard/actions'

interface Project {
  id: string
  name: string
}

interface ActiveSession {
  id: string
  project_id: string
  start_time: string
}

export function SessionTracker({ projects, activeSession }: { projects: Project[], activeSession: ActiveSession | null }) {
  const [elapsed, setElapsed] = useState(0)
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeSession) {
      const start = new Date(activeSession.start_time).getTime()
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - start) / 1000))
      }, 1000)
    } else {
      setElapsed(0)
    }
    return () => clearInterval(interval)
  }, [activeSession])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <h3 className="font-code font-bold text-lg uppercase tracking-tighter">Live Session Tracker</h3>
      
      <div className="border-4 border-black p-6 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className={`w-12 h-12 border-2 border-white flex items-center justify-center ${activeSession ? 'animate-pulse bg-red-500' : ''}`}>
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold font-code tracking-tighter tabular-nums">
                {formatTime(elapsed)}
              </div>
              <p className="font-code text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">
                {activeSession ? 'SESSION IN PROGRESS' : 'SYSTEM IDLE'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {!activeSession ? (
              <>
                <select 
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-white text-black border-2 border-white p-2 font-code text-xs font-bold focus:outline-none h-12"
                >
                  <option value="" disabled>SELECT CLUSTER</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <Button 
                  onClick={() => startSession(selectedProjectId)}
                  disabled={!selectedProjectId}
                  className="bg-white text-black hover:bg-secondary border-2 border-white rounded-none h-12 px-6 font-code font-bold"
                >
                  <Play className="w-4 h-4 mr-2" />
                  START
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => stopSession(activeSession.id)}
                className="bg-red-500 text-white hover:bg-red-600 border-2 border-white rounded-none h-12 px-6 font-code font-bold"
              >
                <Square className="w-4 h-4 mr-2" />
                TERMINATE
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
