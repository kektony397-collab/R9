
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Card, Input, Button, Spinner } from '../components/ui';
import { APP_COLORS } from '../constants';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('google');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, t } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError(t('invalidCredentials'));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-4">
        <h1 className={`text-4xl font-bold text-center mb-2 text-[${APP_COLORS.primary}]`}>{t('appName')}</h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700 dark:text-gray-300">{t('loginTitle')}</h2>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="username"
              label={t('username')}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              id="password"
              label={t('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : t('login')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
