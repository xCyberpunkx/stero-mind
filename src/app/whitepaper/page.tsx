"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Radio, Github, Share2, Brain, Sparkles, Shield, BarChart3, Rocket, Code2 } from "lucide-react";
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
              Back to Home
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
              VERSION 1.0 // THE WHITEPAPER
            </span>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Building your <br />
              <span className="italic decoration-black underline underline-offset-8">Personal Workspace.</span>
            </h1>
            <p className="font-code text-sm font-bold opacity-60 mt-8">
              A simple, open-source system to track your learning and master your goals.
            </p>
          </motion.div>

          <motion.section variants={fadeIn} className="mb-16 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">Introduction</h2>
            <p className="text-lg leading-relaxed mb-6">
              Most productivity tools are just digital versions of a messy desk. Stereo Mind is different. It is built to help you grow by giving you a clear view of how you spend your time and what you are learning.
            </p>
            <p className="text-lg leading-relaxed">
              We believe that by tracking your daily progress and organizing your ideas visually, you can reach your goals faster and stay motivated. This whitepaper explains how Stereo Mind helps you build a better version of yourself.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-8">The Six Core Pillars</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Session Logs",
                  desc: "Record your daily work and learning with ease. Keep notes on what you've achieved."
                },
                {
                  icon: Sparkles,
                  title: "Idea Maps",
                  desc: "Visualize your thoughts and projects. See how different parts of your life connect."
                },
                {
                  icon: BarChart3,
                  title: "Progress Tracking",
                  desc: "Stay motivated with simple charts that show your growth and consistency over time."
                },
                {
                  icon: Rocket,
                  title: "Skill Levels",
                  desc: "Level up your skills like a character in a game. Track your mastery in any field."
                },
                {
                  icon: Shield,
                  title: "Project Folders",
                  desc: "Keep your big goals organized. Focus on one project at a time without the noise."
                },
                {
                  icon: Code2,
                  title: "You Own Your Data",
                  desc: "Your data is private. It belongs to you, not a corporation. Export it anytime."
                }
              ].map((pillar, i) => (
                <div key={i} className="border-2 border-black p-6 hover:bg-secondary/10 transition-colors group">
                  <div className="w-10 h-10 border-2 border-black flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase font-code text-lg mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">Our Philosophy</h2>
            <div className="bg-secondary/20 p-8 border-2 border-black font-medium text-lg italic">
              "What gets measured, gets improved. What gets visualized, gets mastered."
            </div>
            <div className="mt-8 space-y-6 text-muted-foreground">
              <p>
                <strong>Privacy First:</strong> We don't sell your data. We don't even look at it. Stereo Mind is designed to be a private vault for your thoughts.
              </p>
              <p>
                <strong>Simplicity is Key:</strong> Growth is hard enough. Your tools should be simple. We focus on what matters: your sessions, your projects, and your progress.
              </p>
              <p>
                <strong>Open Source:</strong> We believe in transparency. Anyone can see how Stereo Mind works or contribute to making it better.
              </p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-16">
            <h2 className="text-2xl font-bold uppercase font-code border-l-4 border-black pl-4 mb-6">Technical Foundation</h2>
            <div className="grid md:grid-cols-3 gap-4 font-code text-[10px] uppercase font-bold text-center">
              <div className="border-2 border-black p-4 bg-black text-white">
                <p>Frontend</p>
                <p className="text-[8px] opacity-60">Next.js & React</p>
              </div>
              <div className="border-2 border-black p-4 bg-white">
                <p>Database</p>
                <p className="text-[8px] opacity-60">Supabase (Postgres)</p>
              </div>
              <div className="border-2 border-black p-4 bg-secondary">
                <p>Authentication</p>
                <p className="text-[8px] opacity-60">Secure OAuth 2.0</p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} className="mb-12 text-center py-12 border-t-2 border-black">
            <h2 className="text-2xl font-bold uppercase mb-8">Start your journey today</h2>
            <Link href="/signup">
              <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-12 h-16 font-code font-bold text-lg transition-all">
                GET STARTED
              </Button>
            </Link>
          </motion.section>

          <footer className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50 uppercase tracking-widest">
            <div>STEREO MIND PROTOCOL // 2026</div>
            <div className="flex gap-6">
              <a href="https://github.com/xCyberpunkx/stero-mind" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                <Github className="w-3 h-3" /> GitHub
              </a>
              <Share2 className="w-3 h-3" />
            </div>
          </footer>
        </motion.div>
      </main>
    </div>
  );
}
