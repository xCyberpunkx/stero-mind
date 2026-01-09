'use client'

import { Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BugReport() {
    const reportBug = () => {
        // In a real app, this could open a modal or redirect to GitHub issues
        window.open('https://github.com/xCyberpunkx/stero-mind/issues/new', '_blank')
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={reportBug}
            className="border-2 border-border rounded-none font-code font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_var(--border)] hover:bg-destructive hover:text-white transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px] h-8 px-3"
        >
            <Bug className="w-3 h-3 mr-2" />
            Report a Bug
        </Button>
    )
}
