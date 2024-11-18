import { databases, BOOKKEEPING_DB, COLLECTIONS, ID, account } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface IncomeEntry {
  date: string;
  cash: number;
  card: number;
  ebt: number;
  gas: number;
  notes?: string;
  attachments?: string[];
  total: number;
  created_by: string;
}

export interface Expense {
  date: string;
  amount: number;
  vendor: string;
  category: string;
  description?: string;
  paymentMethod: string;
  attachments?: string[];
  created_by: string;
}

export const bookkeepingApi = {
  // Income Entries
  createIncomeEntry: async (data: Omit<IncomeEntry, 'created_by'>) => {
    try {
      return await databases.createDocument(
        BOOKKEEPING_DB,
        COLLECTIONS.INCOME,
        ID.unique(),
        {
          ...data,
          created_by: (await account.get()).$id,
        }
      );
    } catch (error) {
      console.error('Error creating income entry:', error);
      throw error;
    }
  },

  getIncomeEntries: async (startDate: Date, endDate: Date) => {
    try {
      return await databases.listDocuments(
        BOOKKEEPING_DB,
        COLLECTIONS.INCOME,
        [
          Query.greaterThanEqual('date', startDate.toISOString()),
          Query.lessThanEqual('date', endDate.toISOString()),
        ]
      );
    } catch (error) {
      console.error('Error fetching income entries:', error);
      throw error;
    }
  },

  getDailyIncome: async (date: Date) => {
    try {
      return await databases.listDocuments(
        BOOKKEEPING_DB,
        COLLECTIONS.INCOME,
        [
          Query.equal('date', date.toISOString().split('T')[0]),
        ]
      );
    } catch (error) {
      console.error('Error fetching daily income:', error);
      throw error;
    }
  },

  // Expenses
  createExpense: async (data: Omit<Expense, 'created_by'>) => {
    try {
      return await databases.createDocument(
        BOOKKEEPING_DB,
        COLLECTIONS.EXPENSES,
        ID.unique(),
        {
          ...data,
          created_by: (await account.get()).$id,
        }
      );
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  getDailyExpenses: async (date: Date) => {
    try {
      return await databases.listDocuments(
        BOOKKEEPING_DB,
        COLLECTIONS.EXPENSES,
        [
          Query.equal('date', date.toISOString().split('T')[0]),
        ]
      );
    } catch (error) {
      console.error('Error fetching daily expenses:', error);
      throw error;
    }
  },

  // Daily Summary
  getDailySummary: async (date: Date) => {
    try {
      const [incomeEntries, expenses] = await Promise.all([
        bookkeepingApi.getDailyIncome(date),
        bookkeepingApi.getDailyExpenses(date),
      ]);

      const totalIncome = incomeEntries.documents.reduce(
        (sum, entry) => sum + entry.total,
        0
      );

      const totalExpenses = expenses.documents.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      return {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        incomeBreakdown: incomeEntries.documents,
        expenses: expenses.documents,
      };
    } catch (error) {
      console.error('Error fetching daily summary:', error);
      throw error;
    }
  },
};