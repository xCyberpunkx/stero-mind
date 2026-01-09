"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  ChevronRight,
  Code,
  Cpu,
  Database,
  Github,
  Globe,
  Layers,
  Layout,
  LineChart,
  Network,
  Radio,
  Share2,
  Terminal,
  Clock,
  CheckCircle2,
  Calendar,
  Activity
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { BugReport } from "@/components/BugReport";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
      <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <Radio className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase font-code group-hover:tracking-normal transition-all">Stereo Mind</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-code text-sm font-medium">
            <a href="#features" className="hover:underline underline-offset-4 decoration-2 decoration-black">SYSTEM_MODS</a>
            <Link href="/whitepaper" className="hover:underline underline-offset-4 decoration-2 decoration-black">WHITEPAPER</Link>
            <Link href="/roadmap" className="hover:underline underline-offset-4 decoration-2 decoration-black">ROADMAP</Link>
          </div>
          <UserNav />
        </div>
      </nav>

      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto border-2 border-black bg-white p-8 md:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-4xl"
            >
              <motion.div variants={fadeIn} className="mb-8">
                <span className="inline-block border-2 border-black px-4 py-1 font-code text-xs font-bold bg-secondary uppercase tracking-widest">
                  v0.1.0-alpha // LIVE_SYSTEM_ALPHA
                </span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Engineer your <br />
                <span className="italic decoration-black underline underline-offset-8">Cognition.</span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl md:text-2xl text-black font-medium max-w-2xl mb-12 leading-tight"
              >
                The first open-source personal infrastructure for high-fidelity 
                knowledge engineering. Track tasks, map projects, and log neural 
                output in one unified protocol.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-8 h-16 text-lg font-code font-bold transition-all flex items-center justify-center gap-3"
                  >
                    INITIALIZE_ACCESS
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/whitepaper" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-black bg-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-8 h-16 text-lg font-code font-bold hover:bg-black hover:text-white transition-all group"
                  >
                    READ_PROTOCOL
                    <BookOpen className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Live Modules Visualization */}
        <section id="features" className="py-24 px-6 border-y-2 border-black bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="font-code text-xs font-bold uppercase tracking-[0.2em] mb-4 block opacity-50">Active Modules</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                The Stereo Architecture
              </h2>
              <p className="text-xl max-w-2xl opacity-70">A monolithic system replacing fragmented tools with high-fidelity cognitive data structures.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Neuro-Logging",
                  desc: "Capture high-granularity session reflections with cognitive state metadata.",
                  status: "READY",
                  color: "bg-blue-50"
                },
                {
                  icon: CheckCircle2,
                  title: "Task Queue",
                  desc: "Priority-based execution engine linked directly to your project clusters.",
                  status: "READY",
                  color: "bg-green-50"
                },
                {
                  icon: Layers,
                  title: "Project Clusters",
                  desc: "Hierarchical organization for multi-year deep work and skill engineering.",
                  status: "READY",
                  color: "bg-purple-50"
                },
                {
                  icon: Clock,
                  title: "Flow Tracker",
                  desc: "Real-time session monitoring to measure time-on-task and cognitive output.",
                  status: "READY",
                  color: "bg-orange-50"
                },
                {
                  icon: Calendar,
                  title: "Temporal Vector",
                  desc: "Visual cognitive timeline correlating daily activities with learning spikes.",
                  status: "READY",
                  color: "bg-red-50"
                },
                {
                  icon: LineChart,
                  title: "Analytic Engine",
                  desc: "D3-powered visualization of your learning plateaus and cognitive peaks.",
                  status: "ALPHA",
                  color: "bg-secondary"
                }
              ].map((module, i) => (
                <div
                  key={i}
                  className="group border-2 border-black p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  <div className={`w-12 h-12 border-2 border-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors ${module.color}`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold uppercase font-code tracking-tighter">{module.title}</h3>
                    <span className="text-[9px] font-bold border border-black px-1.5 py-0.5 uppercase tracking-widest">{module.status}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {module.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-24 px-6 bg-black text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-grid invert pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                  The Philosophy of <br />Intentional Input.
                </h2>
                <div className="space-y-6 text-lg md:text-xl font-light opacity-80">
                  <p>
                    Most tools treat your brain like a passive container.
                    We treat it like a high-performance system that requires 
                    systematic engineering.
                  </p>
                  <p>
                    Stereo Mind is built on the principle of "Tight Feedback Loops."
                    By measuring the cognitive process—not just the result—you create
                    a compounding asset: your own mind.
                  </p>
                  <p className="font-code text-sm border-l-4 border-white pl-6 py-2">
                    // MISSION: To provide the world with a transparent,
                  // sovereign, and extensible system for human growth.
                  </p>
                </div>
              </div>
              <div className="aspect-square border-2 border-white relative flex items-center justify-center p-12">
                <div className="w-full h-full border border-white/20 absolute inset-0 rotate-45 scale-75" />
                <div className="w-full h-full border border-white/20 absolute inset-0 -rotate-12 scale-90" />
                <Activity className="w-32 h-32 animate-pulse" />
                <div className="absolute bottom-6 right-6 font-code text-[10px] opacity-50 text-right">
                  REF: SM-001-ALPHA<br />
                  COGNITIVE ARCHITECTURE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center border-4 border-black p-12 md:p-24 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2
              className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              System ready <br />for boot.
            </h2>
            <p className="text-xl md:text-2xl mb-12 font-medium">
              Join the alpha protocol today. <br className="hidden md:block" />
              Start engineering your cognitive infrastructure.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-12 h-20 text-xl font-code font-bold transition-all flex items-center justify-center gap-4"
                >
                  BOOT_SYSTEM
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <footer className="py-16 px-6 border-t-2 border-black bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              <div className="max-w-xs">
                <div className="flex items-center gap-3 mb-6">
                  <Radio className="w-8 h-8" />
                  <span className="font-bold text-2xl uppercase font-code tracking-tighter">Stereo Mind</span>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  The world's first open-source cognitive infrastructure.
                  Measure what matters. Grow through clarity.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-code text-sm">
                  <div className="flex flex-col gap-4">
                    <span className="font-bold opacity-30 text-[10px] tracking-widest uppercase">Protocol</span>
                    <a href="#" className="hover:underline">Documentation</a>
                    <Link href="/whitepaper" className="hover:underline">Whitepaper</Link>
                    <Link href="/roadmap" className="hover:underline">Roadmap</Link>
                    <a href="#" className="hover:underline">Open API</a>
                    <BugReport />
                  </div>

                <div className="flex flex-col gap-4">
                  <span className="font-bold opacity-30 text-[10px] tracking-widest uppercase">Social</span>
                  <a href="https://github.com/xCyberpunkx/stero-mind" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a>
                  <a href="#" className="hover:underline">Discord</a>
                  <a href="#" className="hover:underline">Twitter</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="font-bold opacity-30 text-[10px] tracking-widest uppercase">Legal</span>
                  <a href="#" className="hover:underline">Privacy</a>
                  <a href="#" className="hover:underline">License</a>
                  <a href="#" className="hover:underline">Terms</a>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50">
              <span>© 2026 STEREO MIND PROTOCOL // ALL RIGHTS RESERVED.</span>
              <span>VERSION 0.1.0-ALPHA // STABLE BRANCH: MAIN</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
