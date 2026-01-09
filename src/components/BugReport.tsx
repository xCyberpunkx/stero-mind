"use client";

import { useState } from "react";
import { Bug, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function BugReport() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("bugs").insert([
        {
          title,
          description,
          severity,
          user_id: user?.id || null,
        },
      ]);

      if (error) throw error;

      toast.success("Bug reported successfully. Thank you!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setSeverity("low");
    } catch (error: any) {
      toast.error(error.message || "Failed to report bug");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:underline text-left transition-all">
          Report a Bug
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold uppercase font-code">Report a Bug</DialogTitle>
          <DialogDescription className="text-black/60">
            Found something broken? Let us know so we can fix it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Title</label>
            <Input
              required
              placeholder="What's the issue?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-black rounded-none h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Severity</label>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="border-2 border-black rounded-none h-12">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black rounded-none">
                <SelectItem value="low">Low - Minor issue</SelectItem>
                <SelectItem value="medium">Medium - Annoying</SelectItem>
                <SelectItem value="high">High - Broken feature</SelectItem>
                <SelectItem value="critical">Critical - System down</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Description</label>
            <Textarea
              required
              placeholder="Tell us more about how to reproduce it..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-black rounded-none min-h-[120px] resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none h-14 font-code font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            {loading ? "Sending..." : "Submit Report"}
            {!loading && <Send className="ml-2 w-4 h-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
