"use client";

import { Users, Clock, CalendarClock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EmployeeStats {
  totalEmployees: number;
  currentEmployees: number;
  averageHoursPerYear: number;
}

export function EmployeeStats() {
  const [stats, setStats] = useState<EmployeeStats>({
    totalEmployees: 0,
    currentEmployees: 0,
    averageHoursPerYear: 0,
  });

  useEffect(() => {
    // In a real app, this would be an API call to fetch employee statistics
    const fetchEmployeeStats = async () => {
      try {
        // Replace this with actual API call
        const response = {
          totalEmployees: 15, // Total employees ever registered
          currentEmployees: 12, // Currently active employees
          averageHoursPerYear: 1872, // 36 hours/week * 52 weeks
        };
        setStats(response);
      } catch (error) {
        console.error('Failed to fetch employee stats:', error);
      }
    };

    fetchEmployeeStats();
  }, []);

  return (
    <div className="space-y-4">
      {[
        {
          label: 'Total Employees',
          value: stats.totalEmployees.toString(),
          icon: Users,
          color: 'bg-purple-500/10 text-purple-500',
        },
        {
          label: 'Current Employees',
          value: stats.currentEmployees.toString(),
          icon: Clock,
          color: 'bg-blue-500/10 text-blue-500',
        },
        {
          label: 'Yearly Hours Average',
          value: `${stats.averageHoursPerYear}h`,
          icon: CalendarClock,
          color: 'bg-green-500/10 text-green-500',
          subtext: '~36h/week',
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="bg-neutral-800/50 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className="text-sm text-neutral-400">{stat.label}</span>
          </div>
          <p className="text-2xl font-semibold">{stat.value}</p>
          {stat.subtext && (
            <p className="text-sm text-neutral-400 mt-1">{stat.subtext}</p>
          )}
        </div>
      ))}
    </div>
  );
}