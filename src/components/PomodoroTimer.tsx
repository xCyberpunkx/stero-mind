'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TimerMode = 'focus' | 'break'

export function PomodoroTimer() {
    const [mode, setMode] = useState<TimerMode>('focus')
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false)
    const [sessions, setSessions] = useState(0)

    const FOCUS_TIME = 25 * 60
    const BREAK_TIME = 5 * 60

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            // Timer finished - play notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE')
            audio.play().catch(() => {
                // Fallback: just show notification if audio fails
                console.log('Pomodoro session completed!')
            })

            if (mode === 'focus') {
                setSessions((prev) => prev + 1)
                setMode('break')
                setTimeLeft(BREAK_TIME)
            } else {
                setMode('focus')
                setTimeLeft(FOCUS_TIME)
            }
            setIsRunning(false)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, timeLeft, mode])

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    const resetTimer = () => {
        setIsRunning(false)
        setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME)
    }

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode)
        setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME)
        setIsRunning(false)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const progress = mode === 'focus'
        ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
        : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100

    return (
        <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
                {mode === 'focus' ? <Zap className="w-5 h-5" /> : <Coffee className="w-5 h-5" />}
                <h3 className="font-bold uppercase tracking-tighter font-code">
                    Pomodoro Timer
                </h3>
            </div>

            {/* Mode Selector */}
            <div className="flex gap-2 mb-6">
                <Button
                    onClick={() => switchMode('focus')}
                    className={`flex-1 rounded-none border-2 border-black font-code text-xs font-bold transition-all ${mode === 'focus'
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-secondary'
                        }`}
                >
                    <Zap className="w-4 h-4 mr-2" />
                    FOCUS
                </Button>
                <Button
                    onClick={() => switchMode('break')}
                    className={`flex-1 rounded-none border-2 border-black font-code text-xs font-bold transition-all ${mode === 'break'
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-secondary'
                        }`}
                >
                    <Coffee className="w-4 h-4 mr-2" />
                    BREAK
                </Button>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-6">
                <div className="text-6xl font-bold font-code mb-2">{formatTime(timeLeft)}</div>
                <div className="text-xs font-code opacity-50 uppercase">
                    {mode === 'focus' ? 'Focus Time' : 'Break Time'}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-secondary border-2 border-black mb-6">
                <div
                    className="h-full bg-black transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Controls */}
            <div className="flex gap-2">
                <Button
                    onClick={toggleTimer}
                    className="flex-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none h-12 font-code font-bold text-xs"
                >
                    {isRunning ? (
                        <>
                            <Pause className="w-4 h-4 mr-2" />
                            PAUSE
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4 mr-2" />
                            START
                        </>
                    )}
                </Button>
                <Button
                    onClick={resetTimer}
                    variant="outline"
                    className="border-2 border-black rounded-none font-code text-xs font-bold h-12 px-4 hover:bg-secondary"
                >
                    <RotateCcw className="w-4 h-4" />
                </Button>
            </div>

            {/* Sessions Counter */}
            <div className="mt-6 pt-6 border-t border-black/10 text-center">
                <div className="text-2xl font-bold">{sessions}</div>
                <div className="text-xs font-code opacity-50 uppercase">Completed Sessions</div>
            </div>
        </div>
    )
}
