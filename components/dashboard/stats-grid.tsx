import { DollarSign, TrendingUp, PiggyBank } from 'lucide-react';

const stats = [
  {
    icon: DollarSign,
    label: 'Non-rented losses',
    value: '$0.00',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: TrendingUp,
    label: 'Total earnings',
    value: '$10,596.80',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    icon: PiggyBank,
    label: 'Total net worth',
    value: '$5,250.90',
    color: 'bg-green-500/10 text-green-500',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 rounded-2xl bg-neutral-800/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className="text-sm text-neutral-400">{stat.label}</span>
          </div>
          <p className="text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}