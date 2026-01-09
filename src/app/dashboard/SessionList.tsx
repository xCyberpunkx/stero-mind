'use client'

import { formatDistanceToNow } from 'date-fns'
import { Clock, Tag, MessageSquare } from 'lucide-react'

interface Session {
  id: string
  duration: number
  notes: string
  tag: string
  created_at: string
  projects?: { title: string }
}

interface SessionListProps {
  sessions: Session[]
}

export function SessionList({ sessions }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="border-2 border-black border-dashed p-12 text-center">
        <p className="font-code text-xs font-bold opacity-30 uppercase tracking-widest">No neural activity detected in this sector.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div 
          key={session.id} 
          className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-black flex items-center justify-center bg-secondary group-hover:bg-black group-hover:text-white transition-colors">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold uppercase text-sm tracking-tight">
                  {session.projects?.title || 'UNATTACHED_SESSION'}
                </h4>
                <p className="font-code text-[10px] font-bold opacity-50 uppercase">
                  {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase bg-black text-white">
                {session.duration}m
              </span>
              <span className="border border-black px-2 py-0.5 text-[9px] font-bold uppercase bg-white">
                {session.tag}
              </span>
            </div>
          </div>

          {session.notes && (
            <div className="border-l-2 border-black pl-4 py-1">
              <p className="text-xs font-medium text-black/70 italic leading-relaxed">
                "{session.notes}"
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
