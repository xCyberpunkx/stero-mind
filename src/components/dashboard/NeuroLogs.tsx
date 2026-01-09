'use client'

import { useState } from 'react'
import { Plus, Trash2, Brain, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createLog } from '@/lib/actions/dashboard'

export function NeuroLogsTab({ logs }: { logs: any[] }) {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold uppercase font-code">Neuro-Logs</h2>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none font-code font-bold text-xs"
        >
          {isAdding ? 'CANCEL' : 'INITIALIZE_LOG'}
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          await createLog(formData)
          setIsAdding(false)
        }} className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <input 
            name="title" 
            placeholder="LOG_TITLE / TOPIC" 
            className="w-full border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary"
            required 
          />
          <textarea 
            name="content" 
            placeholder="NEURAL_DATA / OBSERVATIONS / MARKDOWN_SUPPORTED" 
            className="w-full border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary min-h-[200px]"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="mood" className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary">
              <option value="focused">MOOD: FOCUSED</option>
              <option value="creative">MOOD: CREATIVE</option>
              <option value="stuck">MOOD: STUCK</option>
              <option value="neutral">MOOD: NEUTRAL</option>
            </select>
            <input name="tags" placeholder="TAGS (comma separated)" className="border-2 border-black p-3 font-code text-sm outline-none focus:bg-secondary" />
          </div>
          <Button type="submit" className="w-full bg-black text-white rounded-none font-code font-bold">DEPLOY_LOG</Button>
        </form>
      )}

      <div className="space-y-6">
        {logs.length === 0 ? (
          <div className="border-2 border-black border-dashed p-12 text-center opacity-50 font-code uppercase">
            No neural logs recorded in protocol.
          </div>
        ) : (
          logs.map(log => (
            <div 
              key={log.id} 
              className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold uppercase font-code tracking-tighter">{log.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] font-bold font-code opacity-50 uppercase">{new Date(log.created_at).toLocaleDateString()}</span>
                    <span className="px-2 border border-black text-[9px] font-bold uppercase bg-secondary">{log.mood}</span>
                  </div>
                </div>
                <Brain className="w-6 h-6 opacity-20" />
              </div>
              <div className="prose prose-sm max-w-none font-medium text-black/80 mb-6">
                {log.content}
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10">
                {log.tags?.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1 text-[9px] font-bold uppercase opacity-50">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
