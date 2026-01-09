import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { BugReportModal } from "@/components/BugReportModal";

export const metadata: Metadata = {
  title: "Stereo Mind | Cognitive Operating System",
  description: "Stereo Mind is an open-source cognitive infrastructure for tracking learning, visualizing cognition, and engineering a systematic life.",
  keywords: ["Cognitive OS", "Productivity", "Open Source", "Learning Interface", "Personal Infrastructure"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="66317847-a8f6-4400-a17d-b2d357865e0e"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "Stereo Mind", "version": "0.1.0-alpha", "greeting": "Protocol Initialized"}'
        />
        {children}
        <BugReportModal />
        <Toaster />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
