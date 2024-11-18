import { Clock, ShoppingCart, Building } from 'lucide-react';

const activities = [
  {
    icon: ShoppingCart,
    title: 'Amazon Support',
    category: 'Supplies',
    date: '15 Jan, 2024 at 3:00 PM',
    amount: '-$10.00',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: Building,
    title: 'Roland GmbH',
    category: 'Marketing',
    date: '10 Jan, 2024 at 1:30 PM',
    amount: '+$50.00',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: Building,
    title: 'Bank of America',
    category: 'Office supplies',
    date: '5 Jan, 2024 at 11:00 AM',
    amount: '-$10.00',
    color: 'bg-blue-500/10 text-blue-500',
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-2xl bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Recent Activity</h3>
        <button className="px-3 py-1 bg-neutral-700/50 rounded-full text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Last 30 days
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.title} className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${activity.color}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-neutral-400">{activity.category}</p>
              <p className="text-xs text-neutral-500">{activity.date}</p>
            </div>
            <span className={activity.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {activity.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}