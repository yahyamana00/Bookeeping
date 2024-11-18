"use client";

import { Plus, Minus, Search } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
}

interface TransactionsListProps {
  date: Date;
}

export function TransactionsList({ date }: TransactionsListProps) {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 1200,
      category: 'Sales Revenue',
      description: 'Daily sales',
      date: '2024-01-20 09:30 AM',
      paymentMethod: 'Cash',
    },
    {
      id: '2',
      type: 'expense',
      amount: 150,
      category: 'Supplies',
      description: 'Office supplies',
      date: '2024-01-20 11:45 AM',
      paymentMethod: 'Card',
    },
    // Add more transactions as needed
  ];

  return (
    <div className="bg-neutral-800/50 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Today's Transactions</h3>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-neutral-900 rounded-xl text-sm placeholder:text-neutral-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'income' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {transaction.type === 'income' ? (
                  <Plus className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.category}</p>
                <p className="text-sm text-neutral-400">{transaction.description}</p>
                <p className="text-xs text-neutral-500">
                  {transaction.date} • {transaction.paymentMethod}
                </p>
              </div>
            </div>
            <span className={`font-medium ${
              transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}