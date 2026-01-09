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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { ThemeToggle } from "@/components/theme-toggle";
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
      <div className="bg-grid fixed inset-0 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-border bg-background flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border)] group-hover:shadow-[4px_4px_0px_0px_var(--border)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <Radio className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase font-code group-hover:tracking-normal transition-all">Stereo Mind</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-code text-sm font-medium">
            <a href="#philosophy" className="hover:underline underline-offset-4 decoration-2 decoration-foreground">PHILOSOPHY</a>
            <Link href="/whitepaper" className="hover:underline underline-offset-4 decoration-2 decoration-foreground">WHITEPAPER</Link>
            <Link href="/roadmap" className="hover:underline underline-offset-4 decoration-2 decoration-foreground">ROADMAP</Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </nav>

      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto border-2 border-border bg-background p-8 md:p-16 shadow-[8px_8px_0px_0px_var(--border)] dark:shadow-[8px_8px_0px_0px_var(--border)]">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-4xl"
            >
              <motion.div variants={fadeIn} className="mb-8">
                <span className="inline-block border-2 border-border px-4 py-1 font-code text-xs font-bold bg-secondary uppercase tracking-widest">
                  v0.1.0-alpha // Open Source Protocol
                </span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Track Your Progress.<br />
                <span className="italic decoration-foreground underline underline-offset-8">Build Better Habits.</span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl md:text-2xl text-foreground font-medium max-w-2xl mb-12 leading-tight"
              >
                A simple, free tool to help you track your learning, manage your tasks,
                and reach your goals. No complicated setup. Just start tracking what matters.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-foreground text-background hover:bg-background hover:text-foreground border-2 border-border rounded-none shadow-[6px_6px_0px_0px_var(--border)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-8 h-16 text-lg font-code font-bold transition-all flex items-center justify-center gap-3"
                    >
                      Get Started Free
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <Link href="/roadmap">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-border bg-background rounded-none shadow-[6px_6px_0px_0px_var(--border)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-8 h-16 text-lg font-code font-bold hover:bg-foreground hover:text-background transition-all w-fit group"
                  >
                    Learn more
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-24 px-6 bg-foreground text-background overflow-hidden relative transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-grid pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                  Why We Built<br />Stereo Mind
                </h2>
                <div className="space-y-6 text-lg md:text-xl font-light opacity-80">
                  <p>
                    Most productivity tools just give you more to-do lists.
                    We help you understand how you actually learn and grow.
                  </p>
                  <p>
                    Track your progress over time. See patterns in your work.
                    Build habits that stick. It's that simple.
                  </p>
                  <p className="font-code text-sm border-l-4 border-background pl-6 py-2">
                    // Free and open source. Your data stays yours.
                  </p>
                </div>
              </div>
              <div className="aspect-square border-2 border-background relative flex items-center justify-center p-12">
                <div className="w-full h-full border border-background/20 absolute inset-0 rotate-45 scale-75" />
                <div className="w-full h-full border border-background/20 absolute inset-0 -rotate-12 scale-90" />
                <Brain className="w-32 h-32" />
                <div className="absolute bottom-6 right-6 font-code text-[10px] opacity-50 text-right">
                  REF: SM-001-ALPHA<br />
                  COGNITIVE ARCHITECTURE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-code text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Core Systems</span>
                <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                  What You Can<br />Do With It
                </h2>
              </div>
              <div className="max-w-md text-muted-foreground font-medium">
                Everything you need to track your learning journey,
                manage your time, and reach your goals.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Terminal,
                  title: "Track Your Learning",
                  desc: "Write notes about what you're learning. Track your study sessions and see your progress over time.",
                  tags: ["SIMPLE", "EFFECTIVE"],
                },
                {
                  icon: Network,
                  title: "Connect Ideas",
                  desc: "See how different topics relate to each other. Discover patterns in what you're learning.",
                  tags: ["VISUAL", "INSIGHTFUL"],
                },
                {
                  icon: LineChart,
                  title: "View Your Progress",
                  desc: "Charts and graphs show you how much you've learned and when you're most productive.",
                  tags: ["CHARTS", "ANALYTICS"],
                },
                {
                  icon: Cpu,
                  title: "Manage Your Skills",
                  desc: "Keep track of what you know and what you're learning. See yourself improve over time.",
                  tags: ["ORGANIZED", "CLEAR"],
                },
                {
                  icon: Layers,
                  title: "Organize Projects",
                  desc: "Group related work together. Perfect for long-term goals and big projects.",
                  tags: ["STRUCTURED"],
                },
                {
                  icon: Code,
                  title: "Your Data, Your Way",
                  desc: "Export your data anytime. Connect it to other tools you use.",
                  tags: ["FLEXIBLE", "OPEN"],
                },
                {
                  icon: Database,
                  title: "Privacy First",
                  desc: "Your information belongs to you. We don't sell your data or track you.",
                  tags: ["SECURE"],
                },
                {
                  icon: Share2,
                  title: "Learn Together",
                  desc: "Optional: Share progress with friends or study groups. Learn from each other.",
                  tags: ["SOCIAL", "OPTIONAL"],
                },
                {
                  icon: Layout,
                  title: "Customize Everything",
                  desc: "Make your dashboard look and work exactly how you want it to.",
                  tags: ["PERSONAL"],
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group border-2 border-border p-8 bg-background shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[8px_8px_0px_0px_var(--border)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 border-2 border-border flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase mb-4 font-code tracking-tighter">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {feature.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-bold border border-border/20 px-2 py-0.5 bg-secondary uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Source / Big Project Section */}
        <section id="open-source" className="py-24 px-6 border-y-2 border-border bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="border-2 border-border bg-background p-8 shadow-[12px_12px_0px_0px_var(--border)]">
                <Github className="w-12 h-12 mb-6" />
                <h2 className="text-4xl font-bold uppercase mb-6 font-code">Fully Open Source</h2>
                <p className="text-lg mb-8 text-foreground/80">
                  Stereo Mind is a public utility for human development.
                  The entire stack is open. We believe a system this important
                  cannot be owned by a single corporation.
                </p>
                <div className="flex items-center gap-6">
                  <a href="https://github.com/xCyberpunkx/stero-mind" target="_blank" rel="noopener noreferrer" className="ml-auto">
                    <Button className="bg-foreground text-background hover:bg-secondary hover:text-foreground border-2 border-border rounded-none px-6 h-12 font-code font-bold uppercase">
                      View Repository
                    </Button>
                  </a>
                </div>

              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold uppercase font-code">Global Infrastructure</h4>
                    <p className="text-muted-foreground">Hosted across edge nodes worldwide for zero-latency neuro-logging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Layers className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold uppercase font-code">Monolithic Scale</h4>
                    <p className="text-muted-foreground">A unified system replacing 12+ separate apps for knowledge, habits, and health.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Share2 className="w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold uppercase font-code">Sovereign Protocol</h4>
                    <p className="text-muted-foreground">An extensible protocol allowing developers to build on top of your cognitive data.</p>
                  </div>
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
            className="max-w-4xl mx-auto text-center border-4 border-border p-12 md:p-24 bg-background shadow-[20px_20px_0px_0px_var(--border)]"
          >
            <h2
              className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The system is <br />waiting for you.
            </h2>
            <p className="text-xl md:text-2xl mb-12 font-medium">
              Join the waitlist for the alpha launch. <br className="hidden md:block" />
              Be part of the next evolution of human cognition.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-background hover:text-foreground border-2 border-border rounded-none shadow-[6px_6px_0px_0px_var(--border)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-12 h-20 text-xl font-code font-bold transition-all flex items-center justify-center gap-4"
                >
                  INITIALIZE ACCESS
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <Link href="/whitepaper">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto border-2 border-border bg-background rounded-none h-16 px-12 text-lg font-code font-bold hover:bg-secondary"
                >
                  Read the Whitepaper
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <footer className="py-16 px-6 border-t-2 border-border bg-background">
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

            <div className="mt-16 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <span>© 2026 STEREO MIND PROTOCOL // ALL RIGHTS RESERVED.</span>
                <BugReport />
              </div>
              <span>VERSION 0.1.0-ALPHA // STABLE BRANCH: MAIN</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
