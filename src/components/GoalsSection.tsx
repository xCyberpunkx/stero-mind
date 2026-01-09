"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Target, CheckCircle2, Circle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function GoalsSection({ userId }: { userId: string }) {
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchGoals();
    
    const subscription = supabase
      .channel("goals_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "goals", filter: `user_id=eq.${userId}` },
        () => fetchGoals()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  async function fetchGoals() {
    const { data } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (data) setGoals(data);
    setLoading(false);
  }

  async function addGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!newGoal.trim()) return;

    const { error } = await supabase.from("goals").insert({
      user_id: userId,
      title: newGoal,
      status: "pending",
      progress: 0,
    });

    if (!error) {
      setNewGoal("");
      fetchGoals();
    }
  }

  async function toggleGoal(id: string, currentStatus: string) {
    const nextStatus = currentStatus === "completed" ? "pending" : "completed";
    await supabase
      .from("goals")
      .update({ status: nextStatus, progress: nextStatus === "completed" ? 100 : 0 })
      .eq("id", id);
  }

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-xl uppercase tracking-tighter">Strategic Goals</h2>
        </div>
        <Trophy className="w-5 h-5 opacity-20" />
      </div>

      <form onSubmit={addGoal} className="flex gap-2 mb-6">
        <Input
          placeholder="New core objective..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="border-2 border-black rounded-none h-10 font-code text-xs uppercase"
        />
        <Button 
          type="submit" 
          size="icon"
          className="bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none shrink-0 h-10 w-10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group border-2 border-black p-4 flex items-center justify-between transition-all hover:bg-secondary/10 ${
                goal.status === "completed" ? "bg-secondary/20 opacity-60" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleGoal(goal.id, goal.status)}
                  className="hover:scale-110 transition-transform"
                >
                  {goal.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-black" />
                  ) : (
                    <Circle className="w-5 h-5 text-black" />
                  )}
                </button>
                <div>
                  <h4 className={`font-code font-bold text-xs uppercase ${goal.status === "completed" ? "line-through" : ""}`}>
                    {goal.title}
                  </h4>
                  <div className="w-24 h-1 bg-black/10 mt-1">
                    <div 
                      className="h-full bg-black transition-all duration-500" 
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="font-code text-[8px] font-bold opacity-30">{goal.status}</span>
            </motion.div>
          ))}
          {!loading && goals.length === 0 && (
            <div className="text-center py-8 opacity-30 font-code text-xs uppercase italic">
              No objectives initialized.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
