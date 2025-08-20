
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Card, PageTitle, Button, Input } from '../components/ui';
import SignaturePad from '../components/SignaturePad';
import { AdminProfile } from '../types';

const ProfilePage: React.FC = () => {
  const { t, userProfile, updateProfile } = useContext(AppContext);
  const [profile, setProfile] = useState<AdminProfile | null>(userProfile);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      await updateProfile(profile);
      showFeedback(t('saved'), 'success');
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showFeedback(t('passwordsDoNotMatch'), 'error');
      return;
    }
    if (profile && newPassword) {
      await updateProfile({ ...profile, password: newPassword });
      showFeedback(t('passwordUpdated'), 'success');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
  };
  
  if (!profile) return null;

  return (
    <div>
      <PageTitle>{t('adminProfile')}</PageTitle>
      
      {feedback.message && (
          <div className={`p-4 mb-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedback.message}
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{t('adminProfile')}</h3>
            <Input id="fullName" label={t('fullName')} value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
            <Input id="blockNumber" label={t('blockNumber')} value={profile.blockNumber} onChange={e => setProfile({...profile, blockNumber: e.target.value})} />
            
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">{t('signature')}</label>
              <SignaturePad 
                initialDataURL={profile.signature}
                onSave={signature => setProfile({...profile, signature})} 
              />
            </div>
            
            <Button type="submit">{t('save')}</Button>
          </form>
        </Card>

        <Card>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{t('changePassword')}</h3>
            <Input id="newPassword" type="password" label={t('newPassword')} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <Input id="confirmPassword" type="password" label={t('confirmPassword')} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <Button type="submit">{t('updatePassword')}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
