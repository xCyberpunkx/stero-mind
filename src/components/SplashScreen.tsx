"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "lucide-react";
import { useState, useEffect } from "react";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                >
                    <div className="bg-grid absolute inset-0 pointer-events-none opacity-50" />

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.2
                            }}
                            className="w-24 h-24 md:w-32 md:h-32 border-4 border-black bg-white flex items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 90, 180, 270, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <Radio className="w-12 h-12 md:w-16 md:h-16" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-4 font-code">
                                Stereo Mind
                            </h1>
                            <div className="flex items-center gap-2 font-code text-[10px] md:text-xs font-bold opacity-50 uppercase">
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2 h-2 bg-black"
                                />
                                Initializing Protocol...
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-code text-[8px] md:text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
                        Secure Access Gateway // V0.1.0-ALPHA
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
