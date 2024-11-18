import { databases, BOOKKEEPING_DB, COLLECTIONS, ID, account } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  weeklyHours: number;
  status: 'active' | 'inactive';
  hireDate: string;
  terminationDate?: string;
  terminationReason?: 'fired' | 'quit' | 'no-show';
  created_by: string;
}

export const employeesApi = {
  createEmployee: async (data: Omit<Employee, 'id' | 'created_by' | 'status'>) => {
    try {
      return await databases.createDocument(
        BOOKKEEPING_DB,
        COLLECTIONS.EMPLOYEES,
        ID.unique(),
        {
          ...data,
          status: 'active',
          hireDate: new Date().toISOString(),
          created_by: (await account.get()).$id,
        }
      );
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  getEmployees: async (status?: 'active' | 'inactive') => {
    try {
      const queries = [];
      if (status) {
        queries.push(Query.equal('status', status));
      }
      return await databases.listDocuments(
        BOOKKEEPING_DB,
        COLLECTIONS.EMPLOYEES,
        queries
      );
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  updateEmployee: async (employeeId: string, data: Partial<Employee>) => {
    try {
      return await databases.updateDocument(
        BOOKKEEPING_DB,
        COLLECTIONS.EMPLOYEES,
        employeeId,
        data
      );
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },

  terminateEmployee: async (
    employeeId: string, 
    reason: 'fired' | 'quit' | 'no-show',
    notes?: string
  ) => {
    try {
      return await databases.updateDocument(
        BOOKKEEPING_DB,
        COLLECTIONS.EMPLOYEES,
        employeeId,
        {
          status: 'inactive',
          terminationDate: new Date().toISOString(),
          terminationReason: reason,
          terminationNotes: notes,
        }
      );
    } catch (error) {
      console.error('Error terminating employee:', error);
      throw error;
    }
  },
};