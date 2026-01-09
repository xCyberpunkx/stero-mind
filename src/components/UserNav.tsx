"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  if (loading) {
    return <div className="w-24 h-10 animate-pulse bg-gray-200" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="font-code text-xs font-bold uppercase flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
        <form action={signOut}>
          <Button 
            type="submit"
            variant="outline" 
            className="border-2 border-black bg-white rounded-none h-10 px-4 font-code font-bold text-xs hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            LOGOUT
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <Button variant="ghost" className="font-code text-xs font-bold uppercase">
          SIGN IN
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] px-6 h-10 font-code font-bold text-xs">
          WAITLIST.OS
        </Button>
      </Link>
    </div>
  );
}
