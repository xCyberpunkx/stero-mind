'use client'

import { Brain, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createNeuroLog } from '@/app/dashboard/actions'

export function QuickLog() {
    return (
        <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6">
                <Brain className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-tighter font-code">Quick Neuro_Log</h3>
            </div>

            <form action={createNeuroLog} className="space-y-4">
                <input
                    name="title"
                    placeholder="LOG_TITLE..."
                    className="w-full bg-secondary/10 border-2 border-black p-3 font-code text-xs focus:outline-none"
                    required
                />
                <textarea
                    name="content"
                    placeholder="INITIALIZE_THOUGHT_STREAM..."
                    className="w-full bg-secondary/10 border-2 border-black p-3 h-24 font-code text-xs resize-none focus:outline-none"
                    required
                />
                <div className="flex gap-4">
                    <select
                        name="mood"
                        className="flex-1 bg-white border-2 border-black p-3 font-code text-xs uppercase focus:outline-none"
                    >
                        <option value="NEUTRAL">MOOD: NEUTRAL</option>
                        <option value="FOCUSED">MOOD: FOCUSED</option>
                        <option value="FLOW">MOOD: FLOW</option>
                        <option value="DRAINED">MOOD: DRAINED</option>
                    </select>
                    <Button type="submit" className="bg-black text-white rounded-none border-2 border-black font-code text-xs px-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                        BOOT_LOG
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
