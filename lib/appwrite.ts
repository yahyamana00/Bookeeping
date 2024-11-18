import { Account, Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67397adb000addbdba39');

export const account = new Account(client);
export const databases = new Databases(client);

// Database and Collection IDs - Updated with correct IDs
export const BOOKKEEPING_DB = 'bookme_db';
export const COLLECTIONS = {
  INCOME: 'income_entries',
  EXPENSES: 'expenses',
  EMPLOYEES: 'employees',
} as const;

// Helper function to initialize collections if they don't exist
export const initializeCollections = async () => {
  try {
    // Create database if it doesn't exist
    try {
      await databases.create(
        BOOKKEEPING_DB,
        'BookME Database',
        'Database for BookME application'
      );
    } catch (error: any) {
      if (error?.code !== 409) { // Ignore if database already exists
        console.error('Error creating database:', error);
      }
    }

    // Create collections if they don't exist
    const collections = [
      {
        id: COLLECTIONS.INCOME,
        name: 'Income Entries',
        permissions: ['read("any")', 'write("any")'],
        schema: [
          { key: 'date', type: 'string', required: true },
          { key: 'cash', type: 'double', required: true, default: 0 },
          { key: 'card', type: 'double', required: true, default: 0 },
          { key: 'ebt', type: 'double', required: true, default: 0 },
          { key: 'gas', type: 'double', required: true, default: 0 },
          { key: 'total', type: 'double', required: true },
          { key: 'notes', type: 'string', required: false, size: 1000 },
          { key: 'created_by', type: 'string', required: true },
        ]
      },
      {
        id: COLLECTIONS.EXPENSES,
        name: 'Expenses',
        permissions: ['read("any")', 'write("any")'],
        schema: [
          { key: 'date', type: 'string', required: true },
          { key: 'amount', type: 'double', required: true },
          { key: 'vendor', type: 'string', required: true },
          { key: 'category', type: 'string', required: true },
          { key: 'description', type: 'string', required: false },
          { key: 'paymentMethod', type: 'string', required: true },
          { key: 'created_by', type: 'string', required: true },
        ]
      },
      {
        id: COLLECTIONS.EMPLOYEES,
        name: 'Employees',
        permissions: ['read("any")', 'write("any")'],
        schema: [
          { key: 'name', type: 'string', required: true },
          { key: 'email', type: 'string', required: true },
          { key: 'phone', type: 'string', required: true },
          { key: 'role', type: 'string', required: true },
          { key: 'weeklyHours', type: 'integer', required: true },
          { key: 'status', type: 'string', required: true, default: 'active' },
          { key: 'hireDate', type: 'string', required: true },
          { key: 'terminationDate', type: 'string', required: false },
          { key: 'terminationReason', type: 'string', required: false },
          { key: 'created_by', type: 'string', required: true },
        ]
      }
    ];

    for (const collection of collections) {
      try {
        await databases.createCollection(
          BOOKKEEPING_DB,
          collection.id,
          collection.name,
        );

        // Create attributes for the collection
        for (const attr of collection.schema) {
          try {
            await databases.createStringAttribute(
              BOOKKEEPING_DB,
              collection.id,
              attr.key,
              attr.required,
              '',
              attr.default
            );
          } catch (error: any) {
            if (error?.code !== 409) { // Ignore if attribute already exists
              console.error(`Error creating attribute ${attr.key}:`, error);
            }
          }
        }
      } catch (error: any) {
        if (error?.code !== 409) { // Ignore if collection already exists
          console.error(`Error creating collection ${collection.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing collections:', error);
  }
};

export { client, ID };