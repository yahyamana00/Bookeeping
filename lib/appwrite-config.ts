import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67397adb000addbdba39');

export const account = new Account(client);
export const databases = new Databases(client);

// Database and Collection IDs
export const DB_ID = '673a8312003bf0b4c488';

export const COLLECTIONS = {
  INCOME: 'income_entries',
  EXPENSES: 'expenses',
  EMPLOYEES: 'employees',
} as const;

// Collection Attributes
export const ATTRIBUTES = {
  INCOME: {
    date: 'string',
    cash: 'number',
    card: 'number',
    ebt: 'number',
    gas: 'number',
    notes: 'string?',
    attachments: 'string[]?',
    total: 'number',
    created_by: 'string',
  },
  EXPENSES: {
    date: 'string',
    amount: 'number',
    vendor: 'string',
    category: 'string',
    description: 'string?',
    paymentMethod: 'string',
    attachments: 'string[]?',
    created_by: 'string',
  },
  EMPLOYEES: {
    name: 'string',
    email: 'string',
    phone: 'string',
    role: 'string',
    weeklyHours: 'number',
    status: 'string',
    hireDate: 'string',
    terminationDate: 'string?',
    terminationReason: 'string?',
    created_by: 'string',
  },
} as const;

// Collection Indexes
export const INDEXES = {
  INCOME: ['date', 'created_by'],
  EXPENSES: ['date', 'category', 'created_by'],
  EMPLOYEES: ['email', 'status', 'created_by'],
} as const;