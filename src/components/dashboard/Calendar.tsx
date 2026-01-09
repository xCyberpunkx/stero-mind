'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Brain, CheckSquare, Clock } from 'lucide-react'

export function CalendarTab({ tasks, logs, sessions }: { tasks: any[], logs: any[], sessions: any[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const getDayActivity = (day: Date) => {
    const dayStr = day.toDateString()
    const dayTasks = tasks.filter(t => t.due_date && new Date(t.due_date).toDateString() === dayStr)
    const dayLogs = logs.filter(l => new Date(l.created_at).toDateString() === dayStr)
    const daySessions = sessions.filter(s => new Date(s.start_time).toDateString() === dayStr)
    
    return { tasks: dayTasks, logs: dayLogs, sessions: daySessions }
  }

  const activeDayData = date ? getDayActivity(date) : { tasks: [], logs: [], sessions: [] }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <h2 className="text-3xl font-bold uppercase font-code">Cognitive Timeline</h2>
        <div className="border-2 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-none border-0"
          />
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="border-2 border-black bg-secondary p-4 font-code font-bold uppercase text-xs">
          DATA_FOR: {date?.toLocaleDateString() || 'SELECT_DATE'}
        </div>

        <div className="space-y-4">
          <Card className="border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5" />
              <h3 className="font-bold uppercase font-code">Neural Logs ({activeDayData.logs.length})</h3>
            </div>
            <div className="space-y-2">
              {activeDayData.logs.length === 0 ? (
                <p className="text-[10px] opacity-30 font-code uppercase">No logs recorded.</p>
              ) : (
                activeDayData.logs.map(log => (
                  <div key={log.id} className="text-sm font-medium border-l-2 border-black pl-3 py-1">
                    {log.title}
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <div className="flex items-center gap-3 mb-4">
              <CheckSquare className="w-5 h-5" />
              <h3 className="font-bold uppercase font-code">Scheduled Tasks ({activeDayData.tasks.length})</h3>
            </div>
            <div className="space-y-2">
              {activeDayData.tasks.length === 0 ? (
                <p className="text-[10px] opacity-30 font-code uppercase">No tasks due.</p>
              ) : (
                activeDayData.tasks.map(task => (
                  <div key={task.id} className="text-sm font-medium border-l-2 border-black pl-3 py-1">
                    {task.title}
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="border-2 border-black rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5" />
              <h3 className="font-bold uppercase font-code">Focus Sessions ({activeDayData.sessions.length})</h3>
            </div>
            <div className="space-y-2">
              {activeDayData.sessions.length === 0 ? (
                <p className="text-[10px] opacity-30 font-code uppercase">No sessions tracked.</p>
              ) : (
                activeDayData.sessions.map(session => (
                  <div key={session.id} className="text-sm font-medium border-l-2 border-black pl-3 py-1">
                    {session.topic} ({session.tag})
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
