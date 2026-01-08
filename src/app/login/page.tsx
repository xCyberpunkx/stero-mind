"use client";

import { motion } from "framer-motion";
import { Radio, Github, Globe, ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInWithGoogle, signInWithGithub, signInWithEmail } from "@/app/auth/actions";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberedEmail, setRememberedEmail] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail');
    if (saved) {
      setRememberedEmail(saved);
      setRememberMe(true);
    }
  }, []);

  async function handleEmailSignIn(formData: FormData) {
    console.log("[Login] Initiating authentication sequence...");
    setIsLoading(true);
    setMessage(null);

    try {
      const email = formData.get('email') as string;
      console.log(`[Login] Attempting sign-in for: ${email}`);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      const result = await signInWithEmail(formData);

      if (result?.error) {
        console.error(`[Login] Authentication failed: ${result.error}`);
        setMessage({ type: 'error', text: result.error });
        toast.error("Sign In Failed", {
          description: result.error
        });
      } else {
        console.log("[Login] Authentication successful. Access granted.");
        toast.success("Welcome Back", {
          description: "Login successful."
        });
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
        // Let Next.js handle the redirect
        return;
      }
      console.error("[Login] Fatal exception during sign-in:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setMessage({ type: 'error', text: errorMessage });
      toast.error("System Error", {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
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
                SIGN IN
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Welcome <br />
              <span className="italic decoration-black underline underline-offset-8">Back.</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 font-medium text-black/70 leading-relaxed"
            >
              Sign in to access your Stereo Mind account.
            </motion.p>

            {message && (
              <motion.div
                variants={fadeIn}
                className={`mb-6 p-4 border-2 ${message.type === 'success'
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-red-600 bg-red-50 text-red-600'
                  }`}
              >
                <p className="font-code text-sm font-bold uppercase tracking-tight">
                  {message.type === 'error' ? '(!) Error: ' : ''}{message.text}
                </p>
              </motion.div>
            )}

            <motion.form variants={fadeIn} action={handleEmailSignIn} className="space-y-4 mb-8">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  defaultValue={rememberedEmail}
                  className="w-full h-14 pl-12 border-2 border-black rounded-none font-code text-base focus:ring-0 focus:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 border-2 border-black rounded-none accent-black"
                  />
                  <span className="font-code text-sm font-bold">Remember me</span>
                </label>
                <Link href="/forgot-password" className="font-code text-sm font-bold underline underline-offset-4 hover:text-black/70">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] h-16 text-lg font-code font-bold transition-all flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Verifying Access...
                  </>
                ) : (
                  "Sign In"
                )}
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
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-bold underline underline-offset-4 hover:text-black/70">
                  Sign up
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 pt-8 border-t-2 border-black/10">
              <p className="text-[10px] font-bold font-code opacity-50 uppercase text-center leading-relaxed">
                STEREO MIND PROTOCOL // SECURE ACCESS // V0.1.0-ALPHA
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
