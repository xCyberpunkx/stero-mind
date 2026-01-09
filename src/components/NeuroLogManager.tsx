'use client'

import { useState } from 'react'
import { Plus, Trash2, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createNeuroLog, deleteNeuroLog } from '@/app/dashboard/actions'

interface NeuroLog {
  id: string
  title: string
  content: string
  duration_minutes: number
  mood: string
  created_at: string
}

export function NeuroLogManager({ initialLogs }: { initialLogs: NeuroLog[] }) {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-code font-bold text-lg uppercase tracking-tighter">Neuro Logs</h3>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-4 font-code font-bold text-xs"
        >
          <Plus className="w-4 h-4 mr-2" />
          NEW LOG
        </Button>
      </div>

      <div className="space-y-4">
        {isAdding && (
          <form action={async (formData) => {
            await createNeuroLog(formData)
            setIsAdding(false)
          }} className="border-2 border-black p-4 bg-secondary/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <input 
              name="title" 
              placeholder="SESSION TITLE" 
              required 
              className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
            />
            <textarea 
              name="content" 
              placeholder="NEURAL DATA / NOTES" 
              className="w-full bg-white border-2 border-black p-2 font-code text-xs focus:outline-none h-32"
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                name="duration_minutes" 
                type="number"
                placeholder="DURATION (MIN)" 
                className="bg-white border-2 border-black p-2 font-code text-xs focus:outline-none"
              />
              <select name="mood" className="bg-white border-2 border-black p-2 font-code text-xs focus:outline-none">
                <option value="focused">FOCUSED</option>
                <option value="flow">FLOW</option>
                <option value="tired">TIRED</option>
                <option value="chaotic">CHAOTIC</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-[10px] h-8 px-4">INITIALIZE LOG</Button>
              <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="rounded-none border-2 border-black font-code text-[10px] h-8 px-4">ABORT</Button>
            </div>
          </form>
        )}

        {initialLogs.map((log) => (
          <div key={log.id} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-code text-[9px] font-bold opacity-30 uppercase">{new Date(log.created_at).toLocaleString()}</span>
                <h4 className="font-bold uppercase tracking-tighter">{log.title}</h4>
              </div>
              <button onClick={() => deleteNeuroLog(log.id)} className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"><Trash2 className="w-3 h-3" /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-3 whitespace-pre-wrap">{log.content}</p>
            <div className="flex gap-4">
              <span className="text-[10px] font-bold font-code bg-secondary px-2 py-0.5 border border-black uppercase">{log.mood}</span>
              <span className="text-[10px] font-bold font-code bg-black text-white px-2 py-0.5 border border-black uppercase">{log.duration_minutes} MIN</span>
            </div>
          </div>
        ))}

        {initialLogs.length === 0 && !isAdding && (
          <div className="border-2 border-dashed border-black/20 p-8 text-center text-xs font-code opacity-50 uppercase">
            Neural buffer empty
          </div>
        )}
      </div>
    </div>
  )
}
