"use client";

import { motion } from "framer-motion";
import { Radio, Github, Globe, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ThankYou() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, [supabase]);

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0];

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
        </div>
      </nav>

      <main className="relative pt-32 flex items-center justify-center px-6 pb-24">
        <section className="max-w-4xl w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="border-4 border-black bg-white p-12 md:p-24 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 border-4 border-black bg-secondary flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                {loading ? <Loader2 className="w-10 h-10 animate-spin" /> : <CheckCircle2 className="w-10 h-10" />}
              </div>
            </div>
            
            <h1
              className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {loading ? "Verifying..." : (
                <>
                  You're in, <br />
                  <span className="italic decoration-black underline underline-offset-8">{userName}.</span>
                </>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
              {loading 
                ? "Securing your spot in the cognitive architecture..." 
                : "Thank you for joining the waitlist. You'll be among the first to experience the evolution of human cognition when we launch the alpha."
              }
            </p>

            {!loading && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link href="/" className="w-full md:w-auto">
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-12 h-16 text-lg font-code font-bold transition-all"
                  >
                    Return Home
                  </Button>
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto border-2 border-black bg-white rounded-none h-16 px-12 text-lg font-code font-bold hover:bg-secondary transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Star on GitHub
                  </Button>
                </a>
              </div>
            )}

            <div className="mt-16 pt-8 border-t-2 border-black/10 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 font-code text-xs font-bold uppercase tracking-widest">
                <span className={`w-2 h-2 ${loading ? 'bg-yellow-500' : 'bg-green-500'} rounded-full ${loading ? 'animate-bounce' : 'animate-pulse'}`} />
                Status: {loading ? "Authenticating Protocol" : "Verified Alpha Contributor"}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center font-code text-[10px] font-bold opacity-50">
          <span>STEREO MIND PROTOCOL // ALPHA ACCESS GRANTED // 2026</span>
        </div>
      </footer>
    </div>
  );
}
