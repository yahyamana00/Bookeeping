"use client";

import { useState } from 'react';
import { Receipt, Upload, Camera } from 'lucide-react';

const EXPENSE_CATEGORIES = [
  { id: 'inventory', label: 'Inventory', icon: '📦' },
  { id: 'utilities', label: 'Utilities', icon: '💡' },
  { id: 'rent', label: 'Rent', icon: '🏢' },
  { id: 'salary', label: 'Salary', icon: '💰' },
  { id: 'marketing', label: 'Marketing', icon: '📢' },
  { id: 'equipment', label: 'Equipment', icon: '🔧' },
  { id: 'supplies', label: 'Supplies', icon: '📎' },
  { id: 'other', label: 'Other', icon: '📝' },
];

export function ExpenseForm() {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 pl-8 text-white placeholder:text-neutral-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">Payment Method</label>
          <select 
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white"
          >
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="card">Credit/Debit Card</option>
            <option value="ach">ACH Transfer</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Vendor/Company</label>
        <input
          type="text"
          placeholder="Enter vendor name"
          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white placeholder:text-neutral-600"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Category</label>
        <div className="grid grid-cols-4 gap-2">
          {EXPENSE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className="flex flex-col items-center gap-2 p-3 bg-neutral-900 border border-neutral-700 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm text-neutral-400">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Description</label>
        <textarea
          rows={3}
          placeholder="Add details about this expense..."
          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white placeholder:text-neutral-600"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-2">Receipt/Invoice</label>
        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 p-3 border border-neutral-700 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Receipt
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 p-3 border border-neutral-700 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Take Photo
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white rounded-xl p-3 font-medium hover:bg-red-600 transition-colors"
      >
        Add Expense Entry
      </button>
    </form>
  );
}