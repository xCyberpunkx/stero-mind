"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Brain, Rocket, Wrench, Target, CheckCircle2, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "./actions";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const INTERESTS = ["Coding", "CCNA", "Reading", "Language", "Habits", "Spiritual"];
const TOOLS = ["Notion", "Obsidian", "Readwise", "Roam", "Logseq", "Evernote"];
const GOALS = ["Learning", "Productivity", "Mind", "Health", "Religion"];

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    
    // Add arrays to formData since they are not native form inputs in this UI
    selectedInterests.forEach(interest => formData.append('interests', interest));
    selectedTools.forEach(tool => formData.append('tools', tool));
    formData.append('goal', selectedGoal);

    try {
      const result = await completeOnboarding(formData);
      if (result?.error) {
        toast.error("Onboarding Failed", {
          description: result.error
        });
      }
    } catch (err) {
      toast.error("System Error", {
        description: "An unexpected error occurred."
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
      <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

      <main className="relative pt-20 flex items-center justify-center px-6 pb-24">
        <section className="max-w-3xl w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="border-4 border-black bg-white p-8 md:p-16 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 border-2 border-black bg-secondary flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Radio className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-block border-2 border-black px-4 py-1 font-code text-[10px] font-bold bg-secondary uppercase tracking-widest">
                  INITIALIZATION PROTOCOL
                </span>
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mt-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Build your profile.
                </h1>
              </div>
            </div>

            <form action={handleSubmit} className="space-y-12">
              {/* Section 1: Username */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 font-code font-bold uppercase text-sm tracking-widest">
                  <User className="w-4 h-4" /> 01. User Identifier
                </label>
                <div className="relative">
                  <Input
                    name="username"
                    placeholder="CHOOSE YOUR SYSTEM NAME"
                    required
                    className="w-full h-16 border-2 border-black rounded-none font-code text-lg focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              {/* Section 2: Interests */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 font-code font-bold uppercase text-sm tracking-widest">
                  <Brain className="w-4 h-4" /> 02. Tracking Vectors
                </label>
                <p className="text-sm text-muted-foreground mb-4">What dimensions of your mind are we optimizing?</p>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                      className={`px-6 py-3 border-2 border-black font-code font-bold text-xs uppercase transition-all flex items-center gap-2 ${
                        selectedInterests.includes(interest)
                          ? "bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]"
                          : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      }`}
                    >
                      {selectedInterests.includes(interest) && <CheckCircle2 className="w-4 h-4" />}
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: Tools */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 font-code font-bold uppercase text-sm tracking-widest">
                  <Rocket className="w-4 h-4" /> 03. Current Stack
                </label>
                <p className="text-sm text-muted-foreground mb-4">Which external modules are already in use?</p>
                <div className="flex flex-wrap gap-3">
                  {TOOLS.map((tool) => (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => toggleSelection(tool, selectedTools, setSelectedTools)}
                      className={`px-6 py-3 border-2 border-black font-code font-bold text-xs uppercase transition-all flex items-center gap-2 ${
                        selectedTools.includes(tool)
                          ? "bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]"
                          : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      }`}
                    >
                      {selectedTools.includes(tool) && <CheckCircle2 className="w-4 h-4" />}
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 4: Goal */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 font-code font-bold uppercase text-sm tracking-widest">
                  <Target className="w-4 h-4" /> 04. Core Objective
                </label>
                <p className="text-sm text-muted-foreground mb-4">Select your primary optimization target.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setSelectedGoal(goal)}
                      className={`px-4 py-3 border-2 border-black font-code font-bold text-[10px] uppercase transition-all ${
                        selectedGoal === goal
                          ? "bg-secondary text-black shadow-none translate-x-[2px] translate-y-[2px]"
                          : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={isLoading || !selectedGoal}
                  size="lg"
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] h-20 text-xl font-code font-bold transition-all flex items-center justify-center gap-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      SYNCHRONIZING...
                    </>
                  ) : (
                    "INITIALIZE DASHBOARD"
                  )}
                </Button>
                <p className="mt-4 text-[10px] font-bold font-code opacity-50 uppercase text-center">
                  Once initialized, your data container will be ready for modules.
                </p>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
