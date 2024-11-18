import { CreditCard, Send } from 'lucide-react';
import Image from 'next/image';

export function SendMoney() {
  return (
    <div className="rounded-2xl bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium">Send Money</h3>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span className="text-sm">Debit</span>
          <span className="text-sm text-neutral-400">$10,480</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter the amount"
            className="w-full bg-neutral-900 rounded-xl p-3 pl-6 text-lg"
            defaultValue="$ 800.00"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <Send className="w-4 h-4 text-neutral-400" />
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src="https://ui-avatars.com/api/?name=David+Miller"
            alt="David Miller"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <h4 className="font-medium">David Miller</h4>
            <p className="text-sm text-neutral-400">@davidmiller</p>
          </div>
        </div>

        <button className="w-full bg-green-500 text-white rounded-xl py-3 font-medium hover:bg-green-600 transition-colors">
          Send Money
        </button>
      </div>
    </div>
  );
}