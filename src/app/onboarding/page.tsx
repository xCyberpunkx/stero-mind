"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Radio, 
  Brain, 
  Rocket, 
  Target, 
  CheckCircle2, 
  Loader2, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "./actions";
import { toast } from "sonner";

const INTERESTS = ["Coding", "CCNA", "Reading", "Language", "Habits", "Spiritual"];
const TOOLS = ["Notion", "Obsidian", "Readwise", "Roam", "Logseq", "Evernote"];
const GOALS = ["Learning", "Productivity", "Mind", "Health", "Religion"];

const steps = [
  { id: "welcome", title: "Initialize Protocol", icon: Terminal },
  { id: "identity", title: "User Identity", icon: User },
  { id: "vectors", title: "Tracking Vectors", icon: Brain },
  { id: "stack", title: "Current Stack", icon: Cpu },
  { id: "objective", title: "Core Objective", icon: Target },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [typedText, setTypedText] = useState("");
  const fullText = "STERO-MIND // COGNITIVE ARCHITECTURE INITIALIZATION...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function handleSubmit() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('username', username);
    selectedInterests.forEach(interest => formData.append('interests', interest));
    selectedTools.forEach(tool => formData.append('tools', tool));
    formData.append('goal', selectedGoal);

    try {
      const result = await completeOnboarding(formData);
      if (result?.error) {
        toast.error("Initialization Failed", {
          description: result.error
        });
      }
    } catch (err) {
      toast.error("System Error", {
        description: "An unexpected error occurred during synchronization."
      });
    } finally {
      setIsLoading(false);
    }
  }

  const isStepValid = () => {
    switch (steps[currentStep].id) {
      case "welcome": return true;
      case "identity": return username.length >= 3;
      case "vectors": return selectedInterests.length > 0;
      case "stack": return selectedTools.length > 0;
      case "objective": return !!selectedGoal;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white flex flex-col">
      <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
        <motion.div 
          className="h-full bg-black"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <main className="relative flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="border-4 border-black bg-white p-8 md:p-16 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 p-4 font-code text-[10px] opacity-20 text-right pointer-events-none">
                STEP_0{currentStep + 1} / 05<br />
                ID: {steps[currentStep].id.toUpperCase()}<br />
                STATUS: ACTIVE
              </div>

              <div className="mb-12 flex items-center gap-6">
                <div className="w-16 h-16 border-2 border-black bg-secondary flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  {(() => {
                    const Icon = steps[currentStep].icon;
                    return <Icon className="w-8 h-8" />;
                  })()}
                </div>
                <div>
                  <span className="inline-block border-2 border-black px-4 py-1 font-code text-[10px] font-bold bg-secondary uppercase tracking-widest">
                    {steps[currentStep].title}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mt-2" style={{ fontFamily: "var(--font-serif)" }}>
                    {currentStep === 0 ? "Initialize Mind." : 
                     currentStep === 1 ? "Choose Identity." :
                     currentStep === 2 ? "Select Vectors." :
                     currentStep === 3 ? "Link Stack." : "Set Objective."}
                  </h1>
                </div>
              </div>

              <div className="min-h-[300px]">
                {/* Step 0: Welcome */}
                {steps[currentStep].id === "welcome" && (
                  <div className="space-y-8">
                    <p className="font-code text-sm leading-relaxed border-l-4 border-black pl-6 py-2 bg-secondary/20">
                      {typedText}
                      <span className="animate-pulse">_</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="border-2 border-black p-4 flex gap-4 items-start">
                        <ShieldCheck className="w-6 h-6 shrink-0" />
                        <div>
                          <h4 className="font-bold text-xs uppercase mb-1">Data Sovereignty</h4>
                          <p className="text-[10px] opacity-70">Your cognitive data is encrypted and local-first by design.</p>
                        </div>
                      </div>
                      <div className="border-2 border-black p-4 flex gap-4 items-start">
                        <Zap className="w-6 h-6 shrink-0" />
                        <div>
                          <h4 className="font-bold text-xs uppercase mb-1">Neural Speed</h4>
                          <p className="text-[10px] opacity-70">Log thoughts at the speed of light with the terminal interface.</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-medium">
                      Welcome to Stereo Mind. Before we begin the synchronization, we need to calibrate your neural environment.
                    </p>
                  </div>
                )}

                {/* Step 1: Identity */}
                {steps[currentStep].id === "identity" && (
                  <div className="space-y-6">
                    <label className="block font-code font-bold uppercase text-xs tracking-[0.2em] mb-4">
                      01. System Identifier
                    </label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="ENTER SYSTEM NAME..."
                      className="w-full h-20 border-2 border-black rounded-none font-code text-2xl focus:ring-0 focus:border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase"
                    />
                    <p className="text-sm text-muted-foreground italic">
                      This identifier will be used throughout the protocol. Choose something meaningful.
                    </p>
                  </div>
                )}

                {/* Step 2: Vectors */}
                {steps[currentStep].id === "vectors" && (
                  <div className="space-y-6">
                    <label className="block font-code font-bold uppercase text-xs tracking-[0.2em] mb-4">
                      02. Tracking Vectors
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {INTERESTS.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                          className={`px-8 py-4 border-2 border-black font-code font-bold text-sm uppercase transition-all flex items-center gap-3 ${
                            selectedInterests.includes(interest)
                              ? "bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]"
                              : "bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
                          }`}
                        >
                          {selectedInterests.includes(interest) && <CheckCircle2 className="w-5 h-5" />}
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Stack */}
                {steps[currentStep].id === "stack" && (
                  <div className="space-y-6">
                    <label className="block font-code font-bold uppercase text-xs tracking-[0.2em] mb-4">
                      03. Current Module Stack
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {TOOLS.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => toggleSelection(tool, selectedTools, setSelectedTools)}
                          className={`px-8 py-4 border-2 border-black font-code font-bold text-sm uppercase transition-all flex items-center gap-3 ${
                            selectedTools.includes(tool)
                              ? "bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]"
                              : "bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
                          }`}
                        >
                          {selectedTools.includes(tool) && <CheckCircle2 className="w-5 h-5" />}
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Objective */}
                {steps[currentStep].id === "objective" && (
                  <div className="space-y-6">
                    <label className="block font-code font-bold uppercase text-xs tracking-[0.2em] mb-4">
                      04. Core Mission Objective
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {GOALS.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setSelectedGoal(goal)}
                          className={`px-6 py-6 border-2 border-black font-code font-bold text-xs uppercase transition-all text-center flex flex-col items-center justify-center gap-2 ${
                            selectedGoal === goal
                              ? "bg-secondary text-black shadow-none translate-x-[2px] translate-y-[2px]"
                              : "bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-16 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full sm:w-auto">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="border-2 border-black rounded-none h-14 px-8 font-code font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-secondary transition-all flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      BACK
                    </Button>
                  )}
                </div>
                
                <div className="w-full sm:w-auto">
                  {currentStep < steps.length - 1 ? (
                    <Button
                      disabled={!isStepValid()}
                      onClick={nextStep}
                      className="w-full sm:w-auto bg-black text-white border-2 border-black rounded-none h-14 px-12 font-code font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-white hover:text-black transition-all flex items-center gap-2"
                    >
                      NEXT PHASE
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      disabled={isLoading || !isStepValid()}
                      onClick={handleSubmit}
                      className="w-full sm:w-auto bg-black text-white border-2 border-black rounded-none h-14 px-12 font-code font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-white hover:text-black transition-all flex items-center gap-4"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          SYNCHRONIZING...
                        </>
                      ) : (
                        <>
                          FINALIZE PROTOCOL
                          <ShieldCheck className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-8 text-center">
            <p className="font-code text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">
              Sovereign Mind Protocol // v0.1.0-alpha
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
