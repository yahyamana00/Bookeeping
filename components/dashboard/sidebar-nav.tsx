"use client";

import { Home, BarChart2, Calendar, Settings, Plus, DollarSign, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, href: '/dashboard' },
  { icon: BookOpen, href: '/dashboard/bookkeeping', tooltip: 'Daily Income & Expenses' },
  { icon: Users, href: '/dashboard/employees', tooltip: 'Employee Management' },
  { icon: BarChart2, href: '/dashboard/analytics' },
  { icon: Calendar, href: '/dashboard/calendar' },
  { icon: Settings, href: '/dashboard/settings' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-neutral-900 border-r border-neutral-800 flex flex-col items-center py-4 space-y-8">
      <div className="w-8 h-8 bg-green-500 rounded-full" />
      
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative p-2 rounded-xl hover:bg-neutral-800 transition-colors group",
                pathname === item.href && "bg-neutral-800"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 text-neutral-400",
                pathname === item.href && "text-green-500"
              )} />
              {item.tooltip && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.tooltip}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <button className="p-2 bg-green-500 rounded-xl hover:bg-green-600 transition-colors">
        <Plus className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}