"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Radio, Github, Share2, Brain, CheckCircle2, Layers, Clock, Activity } from "lucide-react";
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

export default function WhitepaperPage() {
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

            <main className="relative pt-32 pb-24 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className="border-2 border-black bg-white p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                >
                    <motion.div variants={fadeIn} className="mb-12 border-b-2 border-black pb-8">
                        <span className="inline-block border-2 border-black px-4 py-1 font-code text-xs font-bold bg-secondary uppercase tracking-widest mb-6">
                            SM-001-ALPHA // WHITEPAPER
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                            Stereo Mind: <br />
                            <span className="italic decoration-black underline underline-offset-8">Cognitive OS</span>
                        </h1>
                        <p className="font-code text-sm font-bold opacity-60 mt-8">
                            v0.1.0-alpha – Open Source Protocol for Intentional Growth <br />
                            “Engineer your mind like a high-fidelity system.”
                        </p>
                    </motion.div>

                    <motion.section variants={fadeIn} className="mb-12 prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">Abstract</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Stereo Mind is a cognitive infrastructure designed to replace fragmented productivity tools with a unified data structure for human growth. By treating neural output as system data, we enable high-fidelity tracking of the learning process.
                        </p>
                        <p className="text-lg leading-relaxed">
                            This document outlines the current alpha implementation of the Stereo Protocol, focusing on the three core pillars: **Project Clusters**, **Task Queues**, and **Neuro-Logging**.
                        </p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">1. The Three Pillars</h2>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            <div className="border-2 border-black p-6 bg-blue-50/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <Brain className="w-6 h-6" />
                                    <h3 className="font-bold uppercase font-code">Pillar I: Neuro-Logging</h3>
                                </div>
                                <p className="text-sm leading-relaxed">
                                    Moving beyond simple note-taking, Neuro-Logs capture the cognitive state (mood, duration, intensity) of a session. This creates a temporal vector of your learning process, allowing for retrospectives based on state-of-mind rather than just content.
                                </p>
                            </div>
                            <div className="border-2 border-black p-6 bg-green-50/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <h3 className="font-bold uppercase font-code">Pillar II: Task Queue</h3>
                                </div>
                                <p className="text-sm leading-relaxed">
                                    A priority-based execution engine. Tasks in Stereo Mind are not just items to check off; they are nodes in a larger project cluster, ensuring that every micro-action contributes to a macro-objective.
                                </p>
                            </div>
                            <div className="border-2 border-black p-6 bg-purple-50/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <Layers className="w-6 h-6" />
                                    <h3 className="font-bold uppercase font-code">Pillar III: Project Clusters</h3>
                                    <span className="ml-auto text-[10px] font-bold border border-black px-1.5 py-0.5 uppercase">Core Structure</span>
                                </div>
                                <p className="text-sm leading-relaxed">
                                    Hierarchical organization for multi-year deep work. Clusters aggregate tasks and logs into high-level domains (e.g., "Knowledge Engineering", "System Architecture"), preventing context fragmentation.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">2. Technical Stack</h2>
                        <p className="mb-6 opacity-70">The alpha protocol is built on a resilient, modern stack ensuring data sovereignty and high performance.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="border-2 border-black p-4 font-code text-[10px] space-y-2">
                                <div className="font-bold underline mb-2 uppercase">Core Engine</div>
                                <div className="flex justify-between"><span>Framework:</span> <span>Next.js 15 (Turbopack)</span></div>
                                <div className="flex justify-between"><span>Backend:</span> <span>Supabase (PostgreSQL)</span></div>
                                <div className="flex justify-between"><span>Auth:</span> <span>Supabase Auth</span></div>
                            </div>
                            <div className="border-2 border-black p-4 font-code text-[10px] space-y-2 bg-secondary/10">
                                <div className="font-bold underline mb-2 uppercase">Data Layer</div>
                                <div className="flex justify-between"><span>Storage:</span> <span>Row-Level Security</span></div>
                                <div className="flex justify-between"><span>Actions:</span> <span>Next.js Server Actions</span></div>
                                <div className="flex justify-between"><span>Sync:</span> <span>Real-time DB Polling</span></div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">3. Future Vector: Analytic Engine</h2>
                        <div className="border-2 border-black p-8 bg-black text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid invert opacity-10 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <Activity className="w-10 h-10 text-green-400 animate-pulse" />
                                    <h3 className="font-bold text-xl uppercase">Cognitive Visualization</h3>
                                </div>
                                <p className="text-sm opacity-80 leading-relaxed mb-6">
                                    The next phase involves converting accumulated logs and session data into visual cognitive maps. Using D3.js, we will visualize your learning plateaus, focus spikes, and domain mastery over time.
                                </p>
                                <div className="font-code text-[10px] tracking-widest opacity-50 uppercase">
                                    Status: Researching Vector Algorithms // SM-ALPHA-ANALYTICS
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12 text-center py-12 border-t-2 border-black">
                        <h2 className="text-2xl font-bold uppercase mb-8">Ready to engineer your cognition?</h2>
                        <Link href="/signup">
                            <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-12 h-16 font-code font-bold text-lg transition-all">
                                BOOT_SYSTEM_ALPHA
                            </Button>
                        </Link>
                    </motion.section>

                    <footer className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50 uppercase tracking-widest">
                        <div>STEREO MIND PROTOCOL // SM-001-ALPHA</div>
                        <div className="flex gap-6">
                            <a href="https://github.com/xCyberpunkx/stero-mind" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a>
                            <Share2 className="w-3 h-3" />
                        </div>
                    </footer>
                </motion.div>
            </main>
        </div>
    );
}
