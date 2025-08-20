
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import * as db from '../services/db';
import { Expense } from '../types';
import { Card, PageTitle, Button, Input } from '../components/ui';
import { Trash2 } from 'lucide-react';

const ExpensesPage: React.FC = () => {
  const { t } = useContext(AppContext);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id' | 'date'>>({ name: '', amount: 0, operation: 'plus' });

  const fetchExpenses = async () => {
    const allExpenses = await db.getAllExpenses();
    setExpenses(allExpenses.sort((a,b) => (b.id ?? 0) - (a.id ?? 0)));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.name || newExpense.amount <= 0) return;

    const expenseToSave: Expense = { ...newExpense, date: new Date().toISOString().split('T')[0] };
    await db.addExpense(expenseToSave);

    setNewExpense({ name: '', amount: 0, operation: 'plus' });
    fetchExpenses();
  };
  
  const handleDeleteExpense = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this expense?')) {
        await db.deleteExpense(id);
        fetchExpenses();
    }
  }

  const total = expenses.reduce((acc, expense) => {
    return expense.operation === 'plus' ? acc + expense.amount : acc - expense.amount;
  }, 0);

  return (
    <div>
      <PageTitle>{t('expenseCalculator')}</PageTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-xl font-semibold mb-4">{t('addExpense')}</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <Input id="expenseName" label={t('name')} value={newExpense.name} onChange={e => setNewExpense({...newExpense, name: e.target.value})} required/>
              <Input id="expenseAmount" type="number" label={t('amount')} value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: Number(e.target.value)})} required/>
              <div className="flex gap-2">
                <button type="button" onClick={() => setNewExpense({...newExpense, operation: 'plus'})} className={`flex-1 p-2 rounded-lg text-center font-semibold ${newExpense.operation === 'plus' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>{t('plus')}</button>
                <button type="button" onClick={() => setNewExpense({...newExpense, operation: 'minus'})} className={`flex-1 p-2 rounded-lg text-center font-semibold ${newExpense.operation === 'minus' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>{t('minus')}</button>
              </div>
              <Button type="submit" className="w-full">{t('addExpense')}</Button>
            </form>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{t('expenseList')}</h3>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('runningTotal')}</p>
                <p className="text-2xl font-bold">{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="overflow-auto max-h-96">
                <ul className="space-y-2">
                    {expenses.map(exp => (
                        <li key={exp.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                                <p className="font-semibold">{exp.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{exp.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className={`font-bold ${exp.operation === 'plus' ? 'text-green-500' : 'text-red-500'}`}>
                                    {exp.operation === 'plus' ? '+' : '-'} {exp.amount.toFixed(2)}
                                </p>
                                <button onClick={() => handleDeleteExpense(exp.id!)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
