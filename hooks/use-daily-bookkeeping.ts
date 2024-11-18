"use client";

import { useState, useEffect } from 'react';
import { bookkeepingApi } from '@/lib/api/bookkeeping';
import { useToast } from '@/components/ui/use-toast';

export function useDailyBookkeeping(date: Date) {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDailySummary();
  }, [date]);

  const fetchDailySummary = async () => {
    try {
      setIsLoading(true);
      const data = await bookkeepingApi.getDailySummary(date);
      setSummary(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch daily summary",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addIncomeEntry = async (data: any) => {
    try {
      setIsLoading(true);
      await bookkeepingApi.createIncomeEntry({
        ...data,
        date: date.toISOString().split('T')[0],
      });
      await fetchDailySummary();
      toast({
        title: "Success",
        description: "Income entry added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add income entry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (data: any) => {
    try {
      setIsLoading(true);
      await bookkeepingApi.createExpense({
        ...data,
        date: date.toISOString().split('T')[0],
      });
      await fetchDailySummary();
      toast({
        title: "Success",
        description: "Expense added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    summary,
    addIncomeEntry,
    addExpense,
    refresh: fetchDailySummary,
  };
}