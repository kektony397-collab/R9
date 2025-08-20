
import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Select } from './ui';
import { Home, ListChecks, Calculator, User, Menu, X, LogOut } from 'lucide-react';
import { Language } from '../types';
import { APP_COLORS } from '../constants';


const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { t, language, setLanguage, logout, userProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: Home },
    { name: t('receipts'), path: '/receipts', icon: ListChecks },
    { name: t('expenses'), path: '/expenses', icon: Calculator },
    { name: t('profile'), path: '/profile', icon: User },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent: React.FC = () => (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-white">{t('appName')}</h2>
            <p className="text-sm text-gray-300">{userProfile?.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        isActive
                            ? `bg-[${APP_COLORS.primaryContainer}] text-[${APP_COLORS.onPrimaryContainer}]`
                            : 'text-gray-200 hover:bg-white/20'
                        }`
                    }
                >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                </NavLink>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
             <button onClick={handleLogout} className="flex items-center w-full p-3 text-gray-200 rounded-lg hover:bg-white/20">
                <LogOut className="w-5 h-5 mr-3" />
                <span>{t('logout')}</span>
            </button>
        </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar for large screens */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[${APP_COLORS.primary}] text-white shadow-lg z-20 transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>
      
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md md:justify-end">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 rounded-md md:hidden dark:text-gray-300">
            {isSidebarOpen ? <X/> : <Menu/>}
          </button>
          <div className="flex items-center space-x-4">
             <div className="w-40">
              <Select
                id="language-switcher"
                label={t('language')}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                <option value="en">{t('english')}</option>
                <option value="gu">{t('gujarati')}</option>
                <option value="hi">{t('hindi')}</option>
              </Select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
