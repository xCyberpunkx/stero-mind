'use client'

import { useState, useEffect } from 'react'
import { Play, Square, Clock, Hash, Tag as TagIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { startSession, stopSession } from '@/lib/actions/dashboard'

export function SessionTracker({ activeSession, historicalSessions }: { activeSession: any, historicalSessions: any[] }) {
  const [topic, setTopic] = useState('')
  const [tag, setTag] = useState('')
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: any
    if (activeSession) {
      const start = new Date(activeSession.start_time).getTime()
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - start) / 1000))
      }, 1000)
    } else {
      setTime(0)
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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold uppercase font-code">Active Session</h2>
      </div>

      <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {activeSession ? (
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-code opacity-50 uppercase tracking-widest">CURRENTLY_TRACKING</span>
              <h3 className="text-4xl font-bold uppercase font-code">{activeSession.topic}</h3>
              <div className="flex items-center gap-4">
                <span className="px-2 border border-black bg-secondary text-[10px] font-bold uppercase">{activeSession.tag}</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="text-6xl font-bold font-code tracking-tighter tabular-nums">
                {formatTime(time)}
              </div>
              <Button 
                onClick={() => stopSession(activeSession.id)}
                className="bg-black text-white hover:bg-red-600 border-2 border-black rounded-none px-8 h-14 font-code font-bold flex items-center gap-2"
              >
                STOP_SESSION
                <Square className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="WHAT ARE YOU FOCUSED ON?" 
                className="border-2 border-black p-4 font-code text-sm outline-none focus:bg-secondary"
              />
              <input 
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="TAG (e.g. CODING, RESEARCH)" 
                className="border-2 border-black p-4 font-code text-sm outline-none focus:bg-secondary"
              />
            </div>
            <Button 
              disabled={!topic || !tag}
              onClick={() => {
                startSession(topic, tag)
                setTopic('')
                setTag('')
              }}
              className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-16 text-xl font-code font-bold flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
            >
              START_TRACKING_VECTOR
              <Play className="w-5 h-5 fill-current" />
            </Button>
          </div>
        )}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
          <Clock className="w-full h-full" />
        </div>
      </div>

      <div className="pt-12">
        <h2 className="text-xl font-bold uppercase font-code mb-6">Historical Vectors</h2>
        <div className="space-y-2">
          {historicalSessions.map(session => (
            <div key={session.id} className="border border-black p-4 bg-white flex justify-between items-center text-sm font-code">
              <div>
                <span className="font-bold uppercase">{session.topic}</span>
                <span className="mx-4 opacity-30">//</span>
                <span className="opacity-50">{session.tag}</span>
              </div>
              <div className="text-[10px] font-bold opacity-50">
                {new Date(session.start_time).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
