
import { openDB, IDBPDatabase } from 'idb';
import { AdminProfile, Receipt, Expense } from '../types';

const DB_NAME = 'ReceiptBookDB';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

const initDB = async () => {
  if (dbPromise) return dbPromise;

  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('admins')) {
        db.createObjectStore('admins', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('receipts')) {
        const receiptStore = db.createObjectStore('receipts', { keyPath: 'id', autoIncrement: true });
        receiptStore.createIndex('receiptNumber', 'receiptNumber', { unique: true });
        receiptStore.createIndex('name', 'name');
        receiptStore.createIndex('date', 'date');
      }
      if (!db.objectStoreNames.contains('expenses')) {
        db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  const db = await dbPromise;
  
  // Seed default admin if none exists
  const adminCount = await db.count('admins');
  if (adminCount === 0) {
    const defaultAdmin: AdminProfile = {
      username: 'admin',
      password: 'google', // NOTE: In a real app, this should be hashed securely.
      name: 'Default Admin',
      blockNumber: 'A-101',
      signature: null,
      preferredLanguage: 'en',
    };
    await db.add('admins', defaultAdmin);
  }

  return db;
};


// Admin Profile
export const getAdminProfile = async (): Promise<AdminProfile | undefined> => {
  const db = await initDB();
  // Assuming only one admin profile at id 1
  return db.get('admins', 1);
};

export const updateAdminProfile = async (profile: AdminProfile): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction('admins', 'readwrite');
  const store = tx.objectStore('admins');
  await store.put({ ...profile, id: 1 }); // Always update the profile with id 1
  await tx.done;
};

// Receipts
export const getAllReceipts = async (): Promise<Receipt[]> => {
  const db = await initDB();
  return db.getAll('receipts');
};

export const addReceipt = async (receipt: Receipt): Promise<number> => {
  const db = await initDB();
  return db.add('receipts', receipt);
};

export const deleteReceipt = async (id: number): Promise<void> => {
    const db = await initDB();
    await db.delete('receipts', id);
};

// Expenses
export const getAllExpenses = async (): Promise<Expense[]> => {
  const db = await initDB();
  return db.getAll('expenses');
};

export const addExpense = async (expense: Expense): Promise<number> => {
  const db = await initDB();
  return db.add('expenses', expense);
};

export const deleteExpense = async (id: number): Promise<void> => {
    const db = await initDB();
    await db.delete('expenses', id);
};
