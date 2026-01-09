"use client";

import { useState } from "react";
import { Bug, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reportBug } from "@/lib/actions/bugs";
import { toast } from "sonner";

export function BugReportModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await reportBug(formData);

    setLoading(false);
    if (result.success) {
      toast.success("Bug reported successfully. Thank you for your feedback!", {
        icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      });
      setOpen(false);
    } else {
      toast.error("Failed to report bug. Please try again.", {
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-6 right-6 z-50 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group h-12 px-4"
        >
          <Bug className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          <span className="font-code font-bold text-xs uppercase">Report Bug</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-4 border-black rounded-none bg-white p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-bold uppercase tracking-tighter font-serif">
            Report a System Bug
          </DialogTitle>
          <DialogDescription className="font-medium text-black/60 pt-2">
            Help us stabilize the protocol by reporting issues.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-code font-bold text-[10px] uppercase opacity-50">
              Bug Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Brief description of the issue"
              required
              className="border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-black h-12 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity" className="font-code font-bold text-[10px] uppercase opacity-50">
              Severity Level
            </Label>
            <Select name="severity" defaultValue="medium" required>
              <SelectTrigger className="border-2 border-black rounded-none focus:ring-0 h-12 font-medium">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black rounded-none">
                <SelectItem value="low">LOW - Minor UI issue</SelectItem>
                <SelectItem value="medium">MEDIUM - Faulty interaction</SelectItem>
                <SelectItem value="high">HIGH - Module crash</SelectItem>
                <SelectItem value="critical">CRITICAL - System failure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="font-code font-bold text-[10px] uppercase opacity-50">
              Details
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="What happened and how to reproduce it..."
              required
              className="border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-black min-h-[120px] font-medium"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-secondary hover:text-black border-2 border-black rounded-none h-14 font-code font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
            >
              {loading ? (
                "SUBMITTING..."
              ) : (
                <>
                  INITIALIZE REPORT
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
