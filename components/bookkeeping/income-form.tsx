"use client";

import { useState } from 'react';
import { Upload, Camera, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { bookkeepingApi } from '@/lib/api/bookkeeping';
import { useToast } from '@/components/ui/use-toast';

export function IncomeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [incomeData, setIncomeData] = useState({
    cash: '',
    card: '',
    ebt: '',
    gas: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const totalIncome = Object.values(incomeData)
    .reduce((sum, value) => sum + (parseFloat(value) || 0), 0)
    .toFixed(2);

  const handleInputChange = (field: keyof typeof incomeData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setIncomeData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await bookkeepingApi.createIncomeEntry({
        date: format(selectedDate, 'yyyy-MM-dd'),
        cash: parseFloat(incomeData.cash) || 0,
        card: parseFloat(incomeData.card) || 0,
        ebt: parseFloat(incomeData.ebt) || 0,
        gas: parseFloat(incomeData.gas) || 0,
        total: parseFloat(totalIncome),
      });

      toast({
        title: "Success",
        description: "Income entry saved successfully",
      });

      // Reset form
      setIncomeData({
        cash: '',
        card: '',
        ebt: '',
        gas: '',
      });
    } catch (error) {
      console.error('Error saving income:', error);
      toast({
        title: "Error",
        description: "Failed to save income entry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Daily Income Entry</h3>
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-xl">
          <Calendar className="w-4 h-4" />
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Cash Income', key: 'cash', icon: '💵' },
          { label: 'Card Income', key: 'card', icon: '💳' },
          { label: 'EBT Income', key: 'ebt', icon: '🏦' },
          { label: 'Gas Income', key: 'gas', icon: '⛽' },
        ].map(({ label, key, icon }) => (
          <div key={key} className="bg-neutral-800/50 p-4 rounded-xl">
            <label className="block text-sm text-neutral-400 mb-2 flex items-center gap-2">
              <span>{icon}</span>
              {label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
              <input
                type="text"
                value={incomeData[key as keyof typeof incomeData]}
                onChange={handleInputChange(key as keyof typeof incomeData)}
                placeholder="0.00"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 pl-8 text-white placeholder:text-neutral-600"
                disabled={isLoading}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900/50 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total Daily Income</span>
          <span className="text-2xl font-bold text-green-500">${totalIncome}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 text-white rounded-xl p-3 font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Daily Income'}
      </button>
    </form>
  );
}