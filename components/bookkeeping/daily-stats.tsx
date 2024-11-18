"use client";

import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export function DailyStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        {
          label: "Today's Income",
          value: "$1,250.00",
          icon: DollarSign,
          color: "bg-green-500/10 text-green-500",
          trend: "+12.5%",
        },
        {
          label: "Today's Expenses",
          value: "$450.00",
          icon: TrendingDown,
          color: "bg-red-500/10 text-red-500",
          trend: "-8.2%",
        },
        {
          label: "Net Profit",
          value: "$800.00",
          icon: TrendingUp,
          color: "bg-blue-500/10 text-blue-500",
          trend: "+15.3%",
        },
      ].map((stat) => (
        <div key={stat.label} className="bg-neutral-800/50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-xl ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trend}
            </span>
          </div>
          <p className="text-sm text-neutral-400 mb-1">{stat.label}</p>
          <p className="text-2xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}