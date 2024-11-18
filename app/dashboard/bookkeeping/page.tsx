"use client";

import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyStats } from '@/components/bookkeeping/daily-stats';
import { IncomeForm } from '@/components/bookkeeping/income-form';
import { ExpenseForm } from '@/components/bookkeeping/expense-form';
import { TransactionsList } from '@/components/bookkeeping/transactions-list';

export default function BookkeepingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-neutral-900 pl-20">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="p-2 hover:bg-neutral-800 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-semibold">Daily Bookkeeping</h1>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>{selectedDate.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <DailyStats />

            <Tabs defaultValue="income" className="mt-8">
              <TabsList className="w-full grid grid-cols-2 mb-8 rounded-2xl bg-neutral-800/50 p-1">
                <TabsTrigger value="income" className="rounded-xl">Income</TabsTrigger>
                <TabsTrigger value="expense" className="rounded-xl">Expense</TabsTrigger>
              </TabsList>

              <TabsContent value="income">
                <IncomeForm />
              </TabsContent>

              <TabsContent value="expense">
                <ExpenseForm />
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-4">
            <TransactionsList date={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
}