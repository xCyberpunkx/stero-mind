'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Brain, Send } from 'lucide-react'
import { addNeuroLog } from '@/app/dashboard/actions'

export function QuickLog() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await addNeuroLog(formData)
      // Reset form logic would be here if it was a controlled form
      // Since it's a native form, it might need a ref or just let it be
      const form = document.getElementById('quick-log-form') as HTMLFormElement
      form?.reset()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 border-2 border-black flex items-center justify-center bg-secondary">
          <Brain className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-lg uppercase tracking-tighter font-code">Quick Neuro_Log</h3>
      </div>

      <form id="quick-log-form" action={handleSubmit} className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="LOG_TITLE..."
            required
            className="w-full border-2 border-black p-3 font-code text-xs uppercase focus:outline-none focus:bg-secondary/20 transition-colors"
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="INITIALIZE_THOUGHT_STREAM..."
            required
            rows={3}
            className="w-full border-2 border-black p-3 font-code text-xs uppercase focus:outline-none focus:bg-secondary/20 transition-colors resize-none"
          />
        </div>
        <div className="flex gap-4">
          <select 
            name="mood"
            className="flex-1 border-2 border-black p-2 font-code text-[10px] font-bold uppercase bg-white focus:outline-none cursor-pointer"
          >
            <option value="focused">MOOD: FOCUSED</option>
            <option value="creative">MOOD: CREATIVE</option>
            <option value="exhausted">MOOD: EXHAUSTED</option>
            <option value="inspired">MOOD: INSPIRED</option>
          </select>
          <Button 
            disabled={isSubmitting}
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-10 px-6 font-code font-bold text-xs"
          >
            {isSubmitting ? 'UPLOADING...' : 'BOOT_LOG'}
            <Send className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  )
}
