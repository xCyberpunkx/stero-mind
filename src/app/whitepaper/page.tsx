"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Radio, Github, Globe, Share2 } from "lucide-react";
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
                            v0.1.0-alpha – Open Source Protocol for Intentional Growth <br />
                            “Build your mind like a system.”
                        </p>
                    </motion.div>

                    <motion.section variants={fadeIn} className="mb-12 prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">Abstract</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Traditional productivity tools treat the brain like a passive container for tasks. Stereo Mind treats it like a high-fidelity processor, providing a unified cognitive infrastructure to track learning, visualize cognition, and engineer intentional growth.
                        </p>
                        <p className="text-lg leading-relaxed">
                            By capturing sessions, projects, and reflections, users create a compounding asset: their own mind. This whitepaper describes the architecture, modules, and roadmap of Stereo Mind — a system built for the hyper-learner.
                        </p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">1. Introduction: Philosophy of Stereo Cognition</h2>
                        <div className="bg-secondary/20 p-6 border-2 border-black mb-6 font-code text-sm">
                            <p className="mb-4">// Status: Active Research Phase</p>
                            <p>Most systems reduce the brain to a garbage bin for tasks. Stereo Mind treats it as an intentional processor.</p>
                        </div>
                        <p className="mb-6 font-bold uppercase tracking-tight text-sm opacity-60">Existing tools fail to:</p>
                        <ul className="list-disc pl-6 mb-8 space-y-2">
                            <li>Measure the learning process, not just outcomes</li>
                            <li>Provide visual feedback on cognitive growth</li>
                            <li>Encourage modular, extensible, self-directed improvement</li>
                        </ul>
                        <p className="mb-6 font-bold uppercase tracking-tight text-sm opacity-60">Stereo Mind solves this with:</p>
                        <ul className="list-disc pl-6 mb-8 space-y-2">
                            <li>Session-based learning tracking</li>
                            <li>Project/goal organization for deep work</li>
                            <li>Interactive dashboards for insight and reflection</li>
                            <li>Optional gamification for motivation and engagement</li>
                        </ul>
                        <div className="border-2 border-black p-4 bg-black text-white font-code text-xs">
                            MISSION: To provide a transparent, sovereign, and extensible system for human cognitive growth.
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">2. System Overview</h2>
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="border-2 border-black p-6">
                                <h3 className="font-bold uppercase mb-4 font-code text-sm underline">2.1 Core Modules (MVP)</h3>
                                <ul className="space-y-4 text-sm">
                                    <li><strong>Knowledge / Study:</strong> High-granularity tracking with metadata and XP rewards.</li>
                                    <li><strong>Projects / Goals:</strong> Organize learning into logical clusters.</li>
                                    <li><strong>Task Engineering:</strong> Systematic task management within the cognitive flow.</li>
                                    <li><strong>Dashboards:</strong> Real-time visualization of learning peaks and system status.</li>
                                </ul>
                            </div>
                            <div className="border-2 border-black p-6 bg-secondary/10">
                                <h3 className="font-bold uppercase mb-4 font-code text-sm underline">Future Modules</h3>
                                <ul className="space-y-4 text-sm italic opacity-80">
                                    <li>Habits & Health (Sleep, exercise, fasting)</li>
                                    <li>Mood & Energy tracking</li>
                                    <li>Finance & Project ROI</li>
                                    <li>Spiritual / Reflection integration</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="font-bold uppercase mb-4 font-code text-sm underline">2.2 Technical Architecture</h3>
                        <div className="font-code text-xs bg-black text-white p-8 overflow-x-auto whitespace-pre rounded-sm">
                            {`[FRONTEND] : Next.js - Modular & Responsive
[BACKEND]  : Supabase - Auth, DB, RLS
[DATA]     : Exportable, Local-first
[VISUAL]   : Recharts, D3.js, WebGL
[API]      : Open & Extensible`}
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">3. Principles & Design Philosophy</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-code text-xs uppercase font-bold">
                            {[
                                "Intentional Feedback Loops",
                                "Extensible Architecture",
                                "Data Sovereignty",
                                "Gamified Engagement",
                                "Visual Clarity",
                                "Open Source Ethos"
                            ].map((p, i) => (
                                <div key={i} className="border-2 border-black p-3 flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                    {p}
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">4. Roadmap</h2>
                        <div className="border-2 border-black overflow-hidden font-code text-xs">
                            <div className="grid grid-cols-4 bg-black text-white p-2 font-bold uppercase tracking-widest">
                                <div className="col-span-1">Version</div>
                                <div className="col-span-3">Features</div>
                            </div>
                            <div className="grid grid-cols-4 border-b border-black p-3">
                                <div className="col-span-1 font-bold">v0.1.0-alpha</div>
                                <div className="col-span-3 opacity-80">Knowledge module, Dashboards, Waitlist</div>
                            </div>
                            <div className="grid grid-cols-4 border-b border-black p-3">
                                <div className="col-span-1 font-bold">v0.2.0-beta</div>
                                <div className="col-span-3 opacity-80">Gamification, Streaks, Project clusters</div>
                            </div>
                            <div className="grid grid-cols-4 p-3 bg-secondary/10">
                                <div className="col-span-1 font-bold">v1.0</div>
                                <div className="col-span-3 opacity-80 font-bold italic">Full Stereo Mind OS</div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12 text-center py-12 border-t-2 border-black">
                        <h2 className="text-2xl font-bold uppercase mb-8">Ready to join the Protocol?</h2>
                        <Link href="/signup">
                            <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-12 h-16 font-code font-bold text-lg transition-all">
                                JOIN THE WAITLIST
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
