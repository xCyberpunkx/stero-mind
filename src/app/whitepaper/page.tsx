"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Radio, Github, Globe, Share2, BookOpen, Brain, Activity, Clock, CheckCircle2, Layers, Calendar } from "lucide-react";
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
                            v0.1.0-alpha – Open Source Protocol for High-Fidelity Knowledge Engineering <br />
                            “Engineer your mind like a system.”
                        </p>
                    </motion.div>

                    <motion.section variants={fadeIn} className="mb-12 prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">Abstract</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Stereo Mind is a personal infrastructure designed for systematic human growth. Unlike traditional productivity tools that focus on shallow task completion, Stereo Mind emphasizes the capture of high-fidelity cognitive data—learning sessions, project reflections, and neural logs—to create a compounding asset of knowledge and skill.
                        </p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">1. Core Architecture</h2>
                        <p className="mb-6 opacity-80">The system is built on four primary vectors of cognitive management:</p>
                        
                        <div className="grid gap-6 mb-8">
                            {[
                                {
                                    title: "Neuro-Logging",
                                    icon: Brain,
                                    desc: "High-granularity session reflections that capture cognitive states (Focused, Flow, Scattered, Exhausted). This data allows for the identification of optimal learning patterns."
                                },
                                {
                                    title: "Task Queue Engine",
                                    icon: CheckCircle2,
                                    desc: "A priority-based execution system that links atomic tasks directly to large-scale Project Clusters, ensuring every action contributes to a broader strategic objective."
                                },
                                {
                                    title: "Project Clusters",
                                    icon: Layers,
                                    desc: "Hierarchical organization for multi-year deep work. Clusters serve as the 'containers' for all tasks and logs related to a specific domain of mastery."
                                },
                                {
                                    title: "Flow Tracker",
                                    icon: Clock,
                                    desc: "Real-time temporal monitoring that correlates time-on-task with cognitive output, providing a raw metric for 'Deep Work' sessions."
                                }
                            ].map((v, i) => (
                                <div key={i} className="border-2 border-black p-6 bg-white flex gap-6">
                                    <div className="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0 bg-secondary">
                                        <v.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold uppercase font-code mb-2">{v.title}</h3>
                                        <p className="text-sm opacity-70">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">2. Technical Implementation</h2>
                        <div className="bg-black text-white p-8 font-code text-xs overflow-x-auto rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] mb-8">
                            {`[DATABASE]   : Supabase (PostgreSQL) - Real-time relational persistence.
[INTERFACE]  : Next.js (App Router) - High-performance server-side rendering.
[ACTIONS]    : Secure Server Actions - Optimized for CRUD performance.
[AESTHETIC]  : High-Fidelity Brutalism - Designed for clarity and focus.`}
                        </div>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Every module in Stereo Mind is designed for data sovereignty. Users maintain full control over their cognitive datasets, which are exportable and structured for future AI-driven analysis of personal growth patterns.
                        </p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">3. The Temporal Vector</h2>
                        <div className="border-2 border-black p-8 bg-secondary/10 mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Calendar className="w-6 h-6" />
                                <h3 className="font-bold uppercase font-code text-sm underline">Correlating Time and Thought</h3>
                            </div>
                            <p className="text-sm opacity-80">
                                The Temporal Vector (Calendar) view provides a visual timeline of cognitive output. By correlating tasks, logs, and sessions on a daily grid, the system identifies "Cognitive Spikes"—periods of maximum efficiency—and helps users engineer their environment to repeat these states.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12 text-center py-12 border-t-2 border-black">
                        <h2 className="text-3xl font-bold uppercase mb-8 tracking-tighter">Initialize Protocol</h2>
                        <Link href="/signup">
                            <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-12 h-16 font-code font-bold text-lg transition-all">
                                JOIN_ALPHA_PROTOCOL
                            </Button>
                        </Link>
                    </motion.section>

                    <footer className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50 uppercase tracking-widest">
                        <div>STEREO MIND PROTOCOL // SM-001-ALPHA</div>
                        <div className="flex gap-6">
                            <a href="https://github.com/xCyberpunkx/stero-mind" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                <Github className="w-3 h-3" />
                                REPOSITORY
                            </a>
                            <a href="#" className="hover:underline flex items-center gap-2">
                                <Share2 className="w-3 h-3" />
                                SHARE
                            </a>
                        </div>
                    </footer>
                </motion.div>
            </main>
        </div>
    );
}
