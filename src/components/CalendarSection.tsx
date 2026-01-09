"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";

export function CalendarSection({ userId }: { userId: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchEvents();
  }, [currentDate, userId]);

  async function fetchEvents() {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);

    const { data } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", userId)
      .gte("start_time", start.toISOString())
      .lte("start_time", end.toISOString());

    if (data) setEvents(data);
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-black bg-secondary flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-xl uppercase tracking-tighter">Neural Schedule</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={prevMonth} size="icon" variant="outline" className="border-2 border-black rounded-none h-8 w-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button onClick={nextMonth} size="icon" variant="outline" className="border-2 border-black rounded-none h-8 w-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-code font-bold text-xs uppercase opacity-50">
          {format(currentDate, "MMMM yyyy")}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="text-center font-code text-[10px] font-bold opacity-30 py-2 border-b border-black/5">
            {d}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((e) => isSameDay(new Date(e.start_time), day));
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toString()} 
              className={`aspect-square border border-black/5 p-1 flex flex-col items-center justify-between relative group hover:bg-secondary/20 transition-colors ${
                isToday ? "bg-secondary/10" : ""
              }`}
            >
              <span className={`font-code text-[10px] font-bold ${isToday ? "bg-black text-white px-1" : "opacity-40"}`}>
                {format(day, "d")}
              </span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5">
                  {dayEvents.map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-black rounded-full" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-black/10">
        <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase opacity-50">
          <Clock className="w-3 h-3" />
          Next Session: 14:00 GMT
        </div>
      </div>
    </div>
  );
}
