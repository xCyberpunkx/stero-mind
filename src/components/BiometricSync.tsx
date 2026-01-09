"use client";

import { useState, useEffect } from "react";
import { Activity, Zap, Wind, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function BiometricSync() {
  const [heartRate, setHeartRate] = useState(72);
  const [load, setLoad] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => Math.floor(Math.random() * (85 - 65 + 1) + 65));
      setLoad(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-black bg-black text-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full -mr-16 -mt-16" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-secondary animate-pulse" />
          <h2 className="font-bold text-xl uppercase tracking-tighter font-code">Biometric_Sync</h2>
        </div>
        <span className="font-code text-[10px] font-bold text-secondary">LIVE</span>
      </div>

      <div className="space-y-8 relative z-10">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-code text-[10px] uppercase opacity-50 flex items-center gap-2">
              <Heart className="w-3 h-3 text-red-500" />
              Neural Pulse
            </span>
            <span className="font-code font-bold text-2xl">{heartRate} BPM</span>
          </div>
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <motion.div 
              className="h-full bg-secondary" 
              animate={{ width: `${(heartRate / 120) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-code text-[10px] uppercase opacity-50 flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-500" />
              Cognitive Load
            </span>
            <span className="font-code font-bold text-2xl">{Math.round(load)}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <motion.div 
              className="h-full bg-secondary" 
              animate={{ width: `${load}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="font-code text-[10px] uppercase opacity-50 flex items-center gap-2">
              <Wind className="w-3 h-3 text-blue-500" />
              Deep Work Flow
            </span>
            <span className="font-code font-bold text-2xl">02:45:12</span>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-secondary/30"
                animate={{ height: `${Math.random() * 100}%` }}
                transition={{ repeat: Infinity, duration: 1 + Math.random(), repeatType: "reverse" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
