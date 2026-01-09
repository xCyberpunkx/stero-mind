'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Zap, TrendingUp, Calendar } from 'lucide-react'

interface StatsProps {
  data: { date: string; minutes: number }[]
  streak: number
  totalMinutes: number
}

const chartConfig = {
  minutes: {
    label: "Minutes",
    color: "black",
  },
} satisfies ChartConfig

export function Stats({ data, streak, totalMinutes }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <h3 className="font-bold uppercase text-xs tracking-tight">Neuro-Activity (Last 7 Days)</h3>
          </div>
          <span className="font-code text-[10px] font-bold opacity-30 uppercase">minutes_logged</span>
        </div>
        
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split('-')[2]}
              className="font-code text-[10px] font-bold"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="minutes" fill="black" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-black bg-black text-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold uppercase text-xs tracking-tight">Current Streak</h3>
          </div>
          <div className="text-4xl font-bold tracking-tighter uppercase">{streak} DAYS</div>
          <p className="font-code text-[10px] font-bold opacity-50 uppercase mt-2">CONSISTENCY_PROTOCOL: ACTIVE</p>
        </div>

        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" />
            <h3 className="font-bold uppercase text-xs tracking-tight">Total Focus</h3>
          </div>
          <div className="text-4xl font-bold tracking-tighter uppercase">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</div>
          <p className="font-code text-[10px] font-bold opacity-50 uppercase mt-2">ACCUMULATED_NEURAL_TIME</p>
        </div>
      </div>
    </div>
  )
}
