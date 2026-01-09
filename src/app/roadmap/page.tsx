"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Radio, Github, CheckCircle2, Circle, Clock, Terminal, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-display selection:bg-black selection:text-white">
            <div className="bg-grid fixed inset-0 pointer-events-none opacity-50" />

            <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Radio className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tighter uppercase font-code">Stereo Mind</span>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="font-code text-xs font-bold uppercase flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Protocol
                        </Button>
                    </Link>
                </div>
            </nav>

            <main className="relative pt-32 pb-24 px-6 max-w-5xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className="space-y-12"
                >
                    {/* Header */}
                    <motion.div variants={fadeIn} className="border-4 border-black bg-white p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="max-w-2xl">
                            <span className="inline-block border-2 border-black px-4 py-1 font-code text-xs font-bold bg-secondary uppercase tracking-widest mb-6">
                                SYSTEM UPDATE // ROADMAP 2026
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                                Roadmap <br />
                                <span className="italic decoration-black underline underline-offset-8">& Specs.</span>
                            </h1>
                            <p className="text-xl font-medium opacity-80">
                                The technical evolution of the Stereo Mind protocol. From alpha foundation to a fully modular cognitive operating system.
                            </p>
                        </div>
                        <div className="bg-black text-white p-6 font-code text-xs flex flex-col gap-2 shadow-[8px_8px_0px_0px_rgba(243,243,243,1)]">
                            <div className="flex justify-between gap-12">
                                <span>STATUS:</span>
                                <span className="text-green-400">DEVELOPMENT</span>
                            </div>
                            <div className="flex justify-between gap-12">
                                <span>VERSION:</span>
                                <span>0.1.0-ALPHA</span>
                            </div>
                            <div className="flex justify-between gap-12">
                                <span>BRANCH:</span>
                                <span>MAIN</span>
                            </div>
                            <div className="mt-4 border-t border-white/20 pt-4">
                                <div className="w-32 h-1 bg-white/20">
                                    <div className="w-1/4 h-full bg-white" />
                                </div>
                                <div className="mt-2 opacity-50">INITIALIZING MVP...</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.section variants={fadeIn} className="space-y-8">
                        <h2 className="text-3xl font-bold uppercase font-code tracking-tighter">I. Developmental Phases</h2>

                        <div className="grid gap-12 border-l-4 border-black pl-8 ml-4">
                            {/* Phase 1 */}
                            <div className="relative">
                                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-none border-2 border-black bg-black text-white flex items-center justify-center font-bold font-code text-xs">
                                    01
                                </div>
                                <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold uppercase font-code underline decoration-2 underline-offset-4">Phase: Infrastructure (v0.1.0)</h3>
                                        <span className="bg-green-100 text-green-800 border-2 border-green-800 px-3 py-1 text-[10px] font-bold uppercase">In Progress</span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium opacity-70">Focus: Core authentication, user profiles, and basic session logging.</p>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    Supabase Integration & RLS
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    Secure Protocol Access (Waitlist)
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Circle className="w-4 h-4 opacity-30" />
                                                    Basic Study Session Tracking
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Circle className="w-4 h-4 opacity-30" />
                                                    Initial Analytic Dashboards
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-secondary/50 p-6 font-code text-[10px] space-y-2 border-2 border-black/5">
                                            <p className="opacity-50">// ARCHITECTURE DATA</p>
                                            <p>NEXT.js APP ROUTER // TURBOPACK</p>
                                            <p>POSTGRESQL // SUPABASE AUTH</p>
                                            <p>SERVER ACTIONS // FORM OPTIMISTIC UI</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2 */}
                            <div className="relative">
                                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-none border-2 border-black bg-white flex items-center justify-center font-bold font-code text-xs">
                                    02
                                </div>
                                <div className="border-2 border-black bg-white/50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold uppercase font-code opacity-80">Phase: Connectivity (v0.2.0)</h3>
                                        <span className="bg-blue-100 text-blue-800 border-2 border-blue-800 px-3 py-1 text-[10px] font-bold uppercase tracking-tight">Q2 2026 Target</span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium opacity-70 italic">Focus: Gamification, knowledge graphs, and hierarchical project clustering.</p>
                                            <ul className="space-y-2 opacity-60">
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Clock className="w-4 h-4" />
                                                    Interactive Knowledge Graphs (WebGL)
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Clock className="w-4 h-4" />
                                                    Skill Masteries & Leveling System
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Clock className="w-4 h-4" />
                                                    Session Streaks & Global Leaderboards
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3 */}
                            <div className="relative">
                                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-none border-2 border-black bg-white flex items-center justify-center font-bold font-code text-xs">
                                    03
                                </div>
                                <div className="border-2 border-black bg-white/30 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold uppercase font-code opacity-60">Phase: Expansion (v1.0)</h3>
                                        <span className="border-2 border-black/20 px-3 py-1 text-[10px] font-bold uppercase text-black/40">Long Term</span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium opacity-60 italic">Focus: Health, habit loops, and third-party API integration.</p>
                                            <ul className="space-y-2 opacity-50">
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Terminal className="w-4 h-4" />
                                                    External API (IDE, Health, Finance)
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Activity className="w-4 h-4" />
                                                    Habit Engineering Loops
                                                </li>
                                                <li className="flex items-center gap-3 text-sm font-bold">
                                                    <Zap className="w-4 h-4" />
                                                    AI-Driven Cognitive Analysis
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Specifications */}
                    <motion.section variants={fadeIn} className="grid md:grid-cols-2 gap-12">
                        <div className="border-2 border-black bg-secondary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-2xl font-bold uppercase font-code mb-6">Technical Specifications</h2>
                            <div className="space-y-6 font-code text-xs">
                                <div className="space-y-1">
                                    <p className="font-bold border-b border-black pb-2 mb-2">DB ARCHITECTURE</p>
                                    <p>• Multi-tenant with strict RLS (Row Level Security)</p>
                                    <p>• Optimized for high-frequency neuro-logging sessions</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold border-b border-black pb-2 mb-2">VISUALIZATION ENGINE</p>
                                    <p>• Custom D3 components for trend analysis</p>
                                    <p>• Persistent state graph rendering (Local Storage + DB Sync)</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold border-b border-black pb-2 mb-2">SECURITY PROTOCOLS</p>
                                    <p>• OAuth 2.0 via Supabase (Google/GitHub integration)</p>
                                    <p>• Optional end-to-end encryption for session notes</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center text-center border-4 border-black p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-4xl font-bold uppercase mb-8 leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                                Contribute to the <br />evolution.
                            </h3>
                            <p className="text-lg font-medium mb-12">
                                We are building the world's most robust open-source system for human cognitive growth.
                            </p>
                            <div className="flex flex-col gap-4">
                                <a href="https://github.com/xCyberpunkx/stero-mind" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 h-16 font-code font-bold transition-all flex items-center justify-center gap-3">
                                        <Github className="w-5 h-5" />
                                        OPEN SOURCE PORTAL
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </motion.section>

                    <footer className="pt-16 pb-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50 uppercase tracking-widest">
                        <div>STEREO MIND PROTOCOL // SM-001-ALPHA // ROADMAP_VER: 2.1</div>
                        <div className="flex gap-12">
                            <Link href="/whitepaper" className="hover:underline">Read the Whitepaper</Link>
                            <Link href="/signup" className="hover:underline">Join the Waitlist</Link>
                        </div>
                    </footer>
                </motion.div>
            </main>
        </div>
    );
}
