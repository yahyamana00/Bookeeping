import { Permission, Role } from 'appwrite';

// Collection-level permissions
export const collectionPermissions = [
  Permission.read(Role.user('{{user}}')),
  Permission.create(Role.user('{{user}}')),
  Permission.update(Role.user('{{user}}')),
  Permission.delete(Role.user('{{user}}')),
];

// Document-level permissions
export const documentPermissions = [
  Permission.read(Role.user('{{user}}')),
  Permission.update(Role.user('{{user}}')),
  Permission.delete(Role.user('{{user}}')),
];

// Collection schemas
export const schemas = {
  income_entries: {
    date: {
      type: 'string',
      required: true,
      format: 'date',
    },
    cash: {
      type: 'number',
      required: true,
      min: 0,
      default: 0,
    },
    card: {
      type: 'number',
      required: true,
      min: 0,
      default: 0,
    },
    ebt: {
      type: 'number',
      required: true,
      min: 0,
      default: 0,
    },
    gas: {
      type: 'number',
      required: true,
      min: 0,
      default: 0,
    },
    notes: {
      type: 'string',
      required: false,
      size: 1000,
    },
    attachments: {
      type: 'string[]',
      required: false,
      array: true,
      size: 10,
    },
    total: {
      type: 'number',
      required: true,
      min: 0,
    },
    created_by: {
      type: 'string',
      required: true,
    },
  },
  expenses: {
    date: {
      type: 'string',
      required: true,
      format: 'date',
    },
    amount: {
      type: 'number',
      required: true,
      min: 0,
    },
    vendor: {
      type: 'string',
      required: true,
      size: 100,
    },
    category: {
      type: 'string',
      required: true,
      elements: [
        'inventory',
        'utilities',
        'rent',
        'salary',
        'marketing',
        'equipment',
        'supplies',
        'other',
      ],
    },
    description: {
      type: 'string',
      required: false,
      size: 1000,
    },
    paymentMethod: {
      type: 'string',
      required: true,
      elements: ['cash', 'check', 'card', 'ach'],
    },
    attachments: {
      type: 'string[]',
      required: false,
      array: true,
      size: 10,
    },
    created_by: {
      type: 'string',
      required: true,
    },
  },
  employees: {
    name: {
      type: 'string',
      required: true,
      size: 100,
    },
    email: {
      type: 'string',
      required: true,
      format: 'email',
    },
    phone: {
      type: 'string',
      required: true,
      size: 20,
    },
    role: {
      type: 'string',
      required: true,
      elements: ['Store Manager', 'Sales Associate', 'Cashier'],
    },
    weeklyHours: {
      type: 'number',
      required: true,
      min: 0,
      max: 168,
    },
    status: {
      type: 'string',
      required: true,
      elements: ['active', 'inactive'],
      default: 'active',
    },
    hireDate: {
      type: 'string',
      required: true,
      format: 'date',
    },
    terminationDate: {
      type: 'string',
      required: false,
      format: 'date',
    },
    terminationReason: {
      type: 'string',
      required: false,
      elements: ['fired', 'quit', 'no-show'],
    },
    created_by: {
      type: 'string',
      required: true,
    },
  },
};