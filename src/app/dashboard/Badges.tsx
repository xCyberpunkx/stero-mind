'use client'

import { Trophy, Star, Target, Flame, Award } from 'lucide-react'

interface Badge {
  id: string
  title: string
  description: string
  icon: any
  unlocked: boolean
}

interface BadgesProps {
  streak: number
  totalSessions: number
  level: number
}

export function Badges({ streak, totalSessions, level }: BadgesProps) {
  const badges: Badge[] = [
    {
      id: 'first_log',
      title: 'NEURAL_LINK_ESTABLISHED',
      description: 'Logged your first session.',
      icon: Star,
      unlocked: totalSessions >= 1
    },
    {
      id: 'streak_3',
      title: 'CONSISTENCY_V1',
      description: '3-day streak achieved.',
      icon: Flame,
      unlocked: streak >= 3
    },
    {
      id: 'level_5',
      title: 'COGNITIVE_EVOLUTION',
      description: 'Reached Level 5.',
      icon: Trophy,
      unlocked: level >= 5
    },
    {
      id: 'sessions_10',
      title: 'DATA_MINER',
      description: 'Logged 10 total sessions.',
      icon: Target,
      unlocked: totalSessions >= 10
    },
    {
      id: 'streak_7',
      title: 'DEEP_WORK_PROTOCOL',
      description: '7-day streak achieved.',
      icon: Award,
      unlocked: streak >= 7
    }
  ]

  return (
    <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-bold text-xl uppercase tracking-tighter mb-6 flex items-center gap-2">
        <Award className="w-5 h-5" />
        System Achievements
      </h3>
      <div className="grid grid-cols-5 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={`aspect-square border-2 border-black flex items-center justify-center relative group cursor-help transition-all ${badge.unlocked ? 'bg-black text-white' : 'bg-secondary/20 text-black/20'}`}
          >
            <badge.icon className="w-6 h-6" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black text-white text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none border-2 border-white">
              <p className="mb-1">{badge.title}</p>
              <p className="font-medium opacity-50 normal-case">{badge.description}</p>
              {!badge.unlocked && <p className="mt-2 text-red-400">STATUS: LOCKED</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
