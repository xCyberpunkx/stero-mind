"use client";

import { motion } from "framer-motion";
import { Radio, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { updatePassword } from "@/app/auth/actions";
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

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleUpdatePassword(formData: FormData) {
    setIsLoading(true);
    setMessage(null);
    
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }
    
    const result = await updatePassword(formData);
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
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
                SET NEW PASSWORD
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Create new <br />
              <span className="italic decoration-black underline underline-offset-8">Password.</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 font-medium text-black/70 leading-relaxed"
            >
              Enter your new password below. Make sure it&apos;s at least 6 characters long.
            </motion.p>

            {message && (
              <motion.div 
                variants={fadeIn}
                className={`mb-6 p-4 border-2 border-black ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <p className="font-code text-sm font-bold">{message.text}</p>
              </motion.div>
            )}

            <motion.form variants={fadeIn} action={handleUpdatePassword} className="space-y-4 mb-8">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New password (min 6 characters)"
                  required
                  minLength={6}
                  className="w-full h-14 pl-12 pr-12 border-2 border-black rounded-none font-code text-base focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-black/50" /> : <Eye className="w-5 h-5 text-black/50" />}
                </button>
              </div>
              
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className="w-full h-14 pl-12 pr-12 border-2 border-black rounded-none font-code text-base focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5 text-black/50" /> : <Eye className="w-5 h-5 text-black/50" />}
                </button>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] h-16 text-lg font-code font-bold transition-all"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </motion.form>

            <motion.div variants={fadeIn} className="mt-8 pt-8 border-t-2 border-black/10">
              <p className="text-[10px] font-bold font-code opacity-50 uppercase text-center leading-relaxed">
                STEREO MIND PROTOCOL // PASSWORD RESET // V0.1.0-ALPHA
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
