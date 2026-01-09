"use client";

import { Radio } from "lucide-react";
import Link from "next/link";
import { BugReport } from "./BugReport";

export function Footer() {
  return (
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
              <BugReport />
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
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold font-code opacity-50">
          <span>© 2026 STEREO MIND PROTOCOL // ALL RIGHTS RESERVED.</span>
          <span>VERSION 0.1.0-ALPHA // STABLE BRANCH: MAIN</span>
        </div>
      </div>
    </footer>
  );
}
