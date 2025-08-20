
import React, { useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, AppContext } from './contexts/AppContext';
import Layout from './components/Layout';
import LoginPage from './features/Auth';
import DashboardPage from './features/Dashboard';
import ReceiptsPage from './features/Receipts';
import ExpensesPage from './features/Expenses';
import ProfilePage from './features/Profile';
import { Spinner } from './components/ui';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

const Main: React.FC = () => {
  const { isLoading, isLoggedIn } = useContext(AppContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route 
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/receipts" element={<ReceiptsPage />} />
                  <Route path="/expenses" element={<ExpensesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};


export default App;
