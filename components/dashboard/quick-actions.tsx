import { DollarSign, Receipt, Settings, FileBarChart } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { 
    icon: DollarSign, 
    label: 'Income', 
    color: 'bg-emerald-500/10 text-emerald-500',
    href: '/dashboard/bookkeeping'
  },
  { 
    icon: Receipt, 
    label: 'Expenses', 
    color: 'bg-blue-500/10 text-blue-500',
    href: '/dashboard/bookkeeping?tab=expense'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    color: 'bg-purple-500/10 text-purple-500',
    href: '/dashboard/settings'
  },
  { 
    icon: FileBarChart, 
    label: 'Reports', 
    color: 'bg-orange-500/10 text-orange-500',
    href: '/dashboard/reports'
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-neutral-800/50 hover:bg-neutral-800 transition-colors"
        >
          <div className={`p-3 rounded-xl ${action.color}`}>
            <action.icon className="w-5 h-5" />
          </div>
          <span className="text-sm text-neutral-400">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}