"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Loader2, MessageSquare, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Log {
  id: string
  content: string
  created_at: string
}

export function NeuroLogs() {
  const [logs, setLogs] = useState<Log[]>([])
  const [newLog, setNewLog] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchLogs()
  }, [])

  async function fetchLogs() {
    try {
      const { data, error } = await supabase
        .from('neuro_logs')
        .select('id, content, created_at')
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addLog() {
    if (!newLog.trim()) return
    setAdding(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('neuro_logs')
        .insert([{ content: newLog, user_id: user.id }])
        .select()
      
      if (error) throw error
      if (data) {
        setLogs([data[0], ...logs])
        setNewLog('')
      }
    } catch (error) {
      console.error('Error adding log:', error)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl uppercase tracking-tighter flex items-center gap-2">
          Neuro_Logs
          <span className="text-[10px] bg-black text-white px-2 py-0.5 font-code">LATEST_10</span>
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <Textarea 
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          placeholder="Capture cognitive state..."
          className="border-2 border-black rounded-none min-h-[100px] font-code text-xs focus-visible:ring-0 resize-none"
        />
        <Button 
          onClick={addLog}
          disabled={adding || !newLog.trim()}
          className="w-full bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all font-code font-bold uppercase text-xs"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Commit Log Entry"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin opacity-20" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-black pl-4 py-2"
              >
                <div className="flex items-center gap-2 mb-1 opacity-40">
                  <Clock className="w-3 h-3" />
                  <span className="font-code text-[8px] font-bold">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="font-code text-xs leading-relaxed">
                  {log.content}
                </p>
              </motion.div>
            ))}
            {!loading && logs.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-black/20 font-code text-[10px] uppercase opacity-50">
                No logs recorded. Initialize feedback loop.
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
