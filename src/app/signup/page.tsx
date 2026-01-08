"use client";

import { motion } from "framer-motion";
import { Radio, Github, Globe, ArrowLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInWithGoogle, signInWithGithub, signUpWithEmail } from "@/app/auth/actions";
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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleEmailSignUp(formData: FormData) {
    setIsLoading(true);
    setMessage(null);

    const result = await signUpWithEmail(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result?.success) {
      setMessage({ type: 'success', text: result.message || 'Check your email for confirmation' });
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
          <Link href="/">
            <Button variant="ghost" className="font-code text-xs font-bold uppercase flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Protocol
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
                CREATE ACCOUNT
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Join the <br />
              <span className="italic decoration-black underline underline-offset-8">Waitlist.</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 font-medium text-black/70 leading-relaxed"
            >
              Create your account to secure your spot in the Stereo Mind alpha protocol.
            </motion.p>

            {message && (
              <motion.div
                variants={fadeIn}
                className={`mb-6 p-4 border-2 border-black ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <p className="font-code text-sm font-bold">{message.text}</p>
              </motion.div>
            )}

            <motion.form variants={fadeIn} action={handleEmailSignUp} className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="relative w-full">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    required
                    className="w-full h-14 pl-12 border-2 border-black rounded-none font-code text-base focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div className="relative w-full">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    required
                    className="w-full h-14 pl-12 border-2 border-black rounded-none font-code text-base focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>
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
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (min 6 characters)"
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
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] h-16 text-lg font-code font-bold transition-all"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </motion.form>

            <motion.div variants={fadeIn} className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-black/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 font-code font-bold text-black/50">Or continue with</span>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col gap-4">
              <Button
                size="lg"
                disabled
                className="w-full bg-white text-black/50 border-2 border-black/20 rounded-none h-14 text-base font-code font-bold flex items-center justify-center gap-3 cursor-not-allowed"
              >
                <Globe className="w-5 h-5" />
                Google (Coming Soon)
              </Button>
              <Button
                size="lg"
                disabled
                className="w-full bg-white text-black/50 border-2 border-black/20 rounded-none h-14 text-base font-code font-bold flex items-center justify-center gap-3 cursor-not-allowed"
              >
                <Github className="w-5 h-5" />
                GitHub (Coming Soon)
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 text-center">
              <p className="font-code text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-bold underline underline-offset-4 hover:text-black/70">
                  Sign in
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 pt-8 border-t-2 border-black/10">
              <p className="text-[10px] font-bold font-code opacity-50 uppercase text-center leading-relaxed">
                By creating an account, you agree to the Stereo Mind Protocol Terms of Service and Data Sovereignty Agreement.
                V0.1.0-ALPHA // STABLE BRANCH: MAIN
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
