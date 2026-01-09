'use client'

import { useState } from 'react'
import { Terminal, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createSession } from './actions'

interface QuickLogProps {
  projects: { id: string; title: string }[]
  interests: string[]
}

export function QuickLog({ projects, interests }: QuickLogProps) {
  const [loading, setLoading] = useState(false)
  const [duration, setDuration] = useState('30')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      await createSession(formData)
      const form = e.target as HTMLFormElement
      form.reset()
      setDuration('30')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 font-code text-[10px] font-bold opacity-20 flex gap-4">
        <span>LOG_MODULE_V1.0</span>
        <span>STATUS_ACTIVE</span>
      </div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-black text-white">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter">Quick Log</h2>
          <p className="font-code text-[10px] font-bold opacity-50 uppercase">Update your cognitive record</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-code text-[10px] font-bold uppercase opacity-50">Project Container</label>
            <Select name="project_id">
              <SelectTrigger className="border-2 border-black rounded-none h-12 font-bold focus:ring-0">
                <SelectValue placeholder="SELECT_PROJECT" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black rounded-none">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id} className="font-bold uppercase text-xs">
                    {project.title}
                  </SelectItem>
                ))}
                <SelectItem value="" className="font-bold uppercase text-xs">NO_PROJECT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="font-code text-[10px] font-bold uppercase opacity-50">Tracking Vector (Tag)</label>
            <Select name="tag">
              <SelectTrigger className="border-2 border-black rounded-none h-12 font-bold focus:ring-0">
                <SelectValue placeholder="SELECT_VECTOR" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black rounded-none">
                {interests.map((interest) => (
                  <SelectItem key={interest} value={interest} className="font-bold uppercase text-xs">
                    {interest}
                  </SelectItem>
                ))}
                <SelectItem value="general" className="font-bold uppercase text-xs">GENERAL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-code text-[10px] font-bold uppercase opacity-50">Duration (Minutes)</label>
          <div className="flex gap-4">
            <Input 
              type="number" 
              name="duration" 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required 
              className="border-2 border-black rounded-none h-12 font-bold focus:ring-0 w-24"
            />
            <div className="flex flex-wrap gap-2">
              {['15', '30', '45', '60', '90', '120'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDuration(val)}
                  className={`px-3 h-12 border-2 border-black font-code font-bold text-xs transition-all ${duration === val ? 'bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary'}`}
                >
                  {val}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-code text-[10px] font-bold uppercase opacity-50">Session Notes / Insights</label>
          <Textarea 
            name="notes" 
            placeholder="Document your neuro-evolution..." 
            className="border-2 border-black rounded-none min-h-[100px] font-bold focus:ring-0 placeholder:opacity-30"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-16 font-code font-bold text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex gap-3"
        >
          {loading ? 'SYNCING...' : (
            <>
              PUSH_TO_LOG
              <Send className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
