
export type Language = 'en' | 'gu' | 'hi';

export interface AdminProfile {
  id?: number;
  username: string;
  password?: string; // Should be handled securely
  name: string;
  blockNumber: string;
  signature: string | null; // base64 data URL
  preferredLanguage: Language;
}

export interface Receipt {
  id?: number;
  receiptNumber: string;
  name: string;
  date: string; // YYYY-MM-DD
  amount: number;
  language: Language;
}

export interface Expense {
  id?: number;
  name: string;
  amount: number;
  operation: 'plus' | 'minus';
  date: string; // YYYY-MM-DD
}
