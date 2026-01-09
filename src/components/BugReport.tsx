"use client";

import { AlertCircle } from "lucide-react";

export function BugReport() {
  return (
    <a 
      href="https://github.com/xCyberpunkx/stero-mind/issues" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:underline text-destructive font-bold"
    >
      <AlertCircle className="w-4 h-4" />
      REPORT_BUG
    </a>
  );
}
