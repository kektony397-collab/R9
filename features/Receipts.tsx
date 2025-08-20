
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import * as db from '../services/db';
import { exportReceiptToPdf, exportToXlsx } from '../services/export';
import { Receipt } from '../types';
import { Card, PageTitle, Button, Input, Spinner } from '../components/ui';
import { Download, FileDown, Trash2, Search } from 'lucide-react';

const ReceiptsPage: React.FC = () => {
  const { t, language, userProfile } = useContext(AppContext);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReceipt, setNewReceipt] = useState<Omit<Receipt, 'id' | 'receiptNumber'>>({ name: '', date: new Date().toISOString().split('T')[0], amount: 0, language });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReceipts = async () => {
    setLoading(true);
    const allReceipts = await db.getAllReceipts();
    setReceipts(allReceipts.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    setLoading(false);
  };
  
  useEffect(() => {
    fetchReceipts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    setNewReceipt(prev => ({...prev, language}));
  }, [language]);


  const handleCreateReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReceipt.name || newReceipt.amount <= 0 || !userProfile) return;

    const receiptNumber = `REC-${Date.now()}`;
    const receiptToSave: Receipt = { ...newReceipt, receiptNumber };
    
    await db.addReceipt(receiptToSave);
    
    // Auto-download PDF
    const createdReceipt = (await db.getAllReceipts()).find(r => r.receiptNumber === receiptNumber);
    if(createdReceipt) {
        exportReceiptToPdf(createdReceipt, userProfile);
    }

    setNewReceipt({ name: '', date: new Date().toISOString().split('T')[0], amount: 0, language });
    fetchReceipts();
  };

  const handleDeleteReceipt = async (id: number) => {
      if(window.confirm('Are you sure you want to delete this receipt?')) {
          await db.deleteReceipt(id);
          fetchReceipts();
      }
  }
  
  const filteredReceipts = useMemo(() => {
    return receipts.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.date.includes(searchTerm)
    );
  }, [receipts, searchTerm]);

  return (
    <div>
      <PageTitle>{t('receiptManagement')}</PageTitle>
      
      <Card className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{t('createReceipt')}</h3>
        <form onSubmit={handleCreateReceipt} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Input id="name" label={t('name')} value={newReceipt.name} onChange={e => setNewReceipt({...newReceipt, name: e.target.value})} required/>
          <Input id="date" type="date" label={t('date')} value={newReceipt.date} onChange={e => setNewReceipt({...newReceipt, date: e.target.value})} required/>
          <Input id="amount" type="number" label={t('amount')} value={newReceipt.amount} onChange={e => setNewReceipt({...newReceipt, amount: Number(e.target.value)})} required/>
          <Button type="submit" className="h-full">{t('generateReceipt')}</Button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h3 className="text-xl font-semibold">{t('receiptList')}</h3>
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder={t('search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <Button variant="outlined" onClick={() => exportToXlsx(receipts, language)}>
                <Download className="w-4 h-4 mr-2"/>
                {t('exportAllToExcel')}
            </Button>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? <Spinner /> : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('receiptNumber')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('name')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('date')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('amount')}</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReceipts.map(receipt => (
                  <tr key={receipt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{receipt.receiptNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{receipt.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{receipt.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{receipt.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                       <button onClick={() => userProfile && exportReceiptToPdf(receipt, userProfile)} className="text-purple-600 hover:text-purple-900 p-1"><FileDown size={18}/></button>
                       <button onClick={() => handleDeleteReceipt(receipt.id!)} className="text-red-600 hover:text-red-900 p-1"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReceiptsPage;
