"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Brain, Plus, StickyNote, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export function NeuroLogsSection({ userId }: { userId: string }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [newLog, setNewLog] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchLogs();
    
    const subscription = supabase
      .channel("logs_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "neuro_logs", filter: `user_id=eq.${userId}` },
        () => fetchLogs()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  async function fetchLogs() {
    const { data } = await supabase
      .from("neuro_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (data) setLogs(data);
    setLoading(false);
  }

  async function addLog() {
    if (!newLog.trim()) return;

    const { error } = await supabase.from("neuro_logs").insert({
      user_id: userId,
      content: newLog,
      type: "thought",
    });

    if (!error) {
      setNewLog("");
      fetchLogs();
    }
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-xl uppercase tracking-tighter">Neuro_Logs</h2>
        </div>
        <History className="w-5 h-5 opacity-20" />
      </div>

      <div className="relative mb-6">
        <Textarea
          placeholder="Log neural activity..."
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          className="border-2 border-black rounded-none min-h-[100px] font-code text-xs uppercase resize-none focus:ring-0 focus:border-black"
        />
        <Button 
          onClick={addLog}
          size="sm"
          className="absolute bottom-2 right-2 bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none h-8 font-code text-[10px] font-bold"
        >
          EXECUTE
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l-2 border-black pl-4 py-1"
            >
              <div className="flex items-center gap-2 mb-1">
                <StickyNote className="w-3 h-3 opacity-50" />
                <span className="font-code text-[9px] font-bold opacity-30">
                  {format(new Date(log.created_at), "HH:mm // dd.MM.yyyy")}
                </span>
              </div>
              <p className="font-code text-xs leading-relaxed">
                {log.content}
              </p>
            </motion.div>
          ))}
          {!loading && logs.length === 0 && (
            <div className="text-center py-8 opacity-30 font-code text-xs uppercase italic">
              No logs recorded in current session.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
