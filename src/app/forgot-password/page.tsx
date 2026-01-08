"use client";

import { motion } from "framer-motion";
import { Radio, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { resetPassword } from "@/app/auth/actions";
import { useState } from "react";

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

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleResetPassword(formData: FormData) {
    setIsLoading(true);
    setMessage(null);
    
    const result = await resetPassword(formData);
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result?.success) {
      setMessage({ type: 'success', text: result.message || 'Check your email for reset link' });
    }
    
    setIsLoading(false);
  }

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
          <Link href="/login">
            <Button variant="ghost" className="font-code text-xs font-bold uppercase flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative pt-32 flex items-center justify-center px-6 pb-24">
        <section className="max-w-2xl w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="border-4 border-black bg-white p-8 md:p-16 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
          >
            <motion.div variants={fadeIn} className="mb-8">
              <span className="inline-block border-2 border-black px-4 py-1 font-code text-xs font-bold bg-secondary uppercase tracking-widest">
                PASSWORD RECOVERY
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Reset your <br />
              <span className="italic decoration-black underline underline-offset-8">Password.</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 font-medium text-black/70 leading-relaxed"
            >
              Enter your email address and we&apos;ll send you a link to reset your password.
            </motion.p>

            {message && (
              <motion.div 
                variants={fadeIn}
                className={`mb-6 p-4 border-2 border-black ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <p className="font-code text-sm font-bold">{message.text}</p>
              </motion.div>
            )}

            <motion.form variants={fadeIn} action={handleResetPassword} className="space-y-4 mb-8">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full h-14 pl-12 border-2 border-black rounded-none font-code text-base focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] h-16 text-lg font-code font-bold transition-all"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </motion.form>

            <motion.div variants={fadeIn} className="mt-8 text-center">
              <p className="font-code text-sm">
                Remember your password?{" "}
                <Link href="/login" className="font-bold underline underline-offset-4 hover:text-black/70">
                  Sign in
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 pt-8 border-t-2 border-black/10">
              <p className="text-[10px] font-bold font-code opacity-50 uppercase text-center leading-relaxed">
                STEREO MIND PROTOCOL // PASSWORD RECOVERY // V0.1.0-ALPHA
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center font-code text-[10px] font-bold opacity-50">
          <span>STEREO MIND PROTOCOL // SECURE GATEWAY // 2026</span>
        </div>
      </footer>
    </div>
  );
}
