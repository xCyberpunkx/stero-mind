'use client'

import { useState } from 'react'
import { Terminal, Plus, Loader2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { createSession } from '@/app/dashboard/actions'
import { toast } from 'sonner'

export function QuickLog() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [tag, setTag] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!notes.trim()) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('notes', notes)
    formData.append('tag', tag)
    
    try {
      const result = await createSession(formData)
      if (result.success) {
        toast.success('Session Logged', {
          description: 'Neural synchronization complete.'
        })
        setNotes('')
        setTag('')
        setIsExpanded(false)
      } else {
        toast.error('Logging Failed', {
          description: result.error
        })
      }
    } catch (err) {
      toast.error('System Error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${isExpanded ? 'p-8' : 'p-4'}`}>
      {!isExpanded ? (
        <button 
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-secondary">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-code font-bold text-sm uppercase opacity-50 group-hover:opacity-100 transition-opacity">
              Quick Neural Log...
            </span>
          </div>
          <div className="flex items-center gap-2 font-code text-[10px] font-bold opacity-30">
            <span>PRESS [ENTER] TO EXPAND</span>
            <Plus className="w-3 h-3" />
          </div>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold uppercase tracking-tighter">New Session Entry</h3>
            </div>
            <button 
              type="button"
              onClick={() => setIsExpanded(false)}
              className="font-code text-[10px] font-bold hover:underline"
            >
              [ ESC ] CANCEL
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-code text-[10px] font-bold uppercase mb-2 opacity-50">Content / Reflection</label>
              <Textarea 
                placeholder="What did you learn? What did you build?..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] border-2 border-black rounded-none focus:ring-0 focus:border-black resize-none font-medium"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-code text-[10px] font-bold uppercase mb-2 opacity-50">System Tag</label>
                <Input 
                  placeholder="#coding, #habits..."
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="border-2 border-black rounded-none h-10 font-code text-xs uppercase"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  type="submit"
                  disabled={isLoading || !notes.trim()}
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-10 font-code font-bold text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'INITIALIZE LOG'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
