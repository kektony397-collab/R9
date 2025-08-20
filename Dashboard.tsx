
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import * as db from '../services/db';
import { Receipt } from '../types';
import { Card, PageTitle, Button, Spinner } from '../components/ui';
import { ListChecks, DollarSign, PlusCircle } from 'lucide-react';
import { APP_COLORS } from '../constants';

const DashboardPage: React.FC = () => {
  const { t, userProfile } = useContext(AppContext);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allReceipts = await db.getAllReceipts();
      setReceipts(allReceipts);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalReceiptsCount = receipts.length;
  const totalAmountCollected = receipts.reduce((sum, r) => sum + r.amount, 0);

  const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; color: string }> = ({ icon, title, value, color }) => (
    <Card className="flex items-center p-6">
      <div className={`p-4 rounded-full`} style={{ backgroundColor: color + '20', color: color }}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
    </Card>
  );

  return (
    <div>
      <PageTitle>{t('dashboard')}</PageTitle>
      <p className="mb-8 -mt-4 text-lg text-gray-600 dark:text-gray-300">{t('welcome')}, {userProfile?.name}!</p>

      {loading ? (
        <div className="flex justify-center mt-8">
            <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            <StatCard 
              icon={<ListChecks size={28} />} 
              title={t('totalReceipts')} 
              value={totalReceiptsCount} 
              color={APP_COLORS.primary}
            />
            <StatCard 
              icon={<DollarSign size={28} />} 
              title={t('totalAmount')} 
              value={totalAmountCollected.toLocaleString(undefined, {style: 'currency', currency: 'INR' })}
              color={APP_COLORS.tertiary}
            />
          </div>

          <Card>
            <h3 className="mb-4 text-xl font-semibold">{t('quickActions')}</h3>
            <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('/receipts')}>
                    <PlusCircle className="w-5 h-5 mr-2"/>
                    {t('newReceipt')}
                </Button>
                 <Button variant="outlined" onClick={() => navigate('/expenses')}>
                    <PlusCircle className="w-5 h-5 mr-2"/>
                    {t('newExpense')}
                </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
