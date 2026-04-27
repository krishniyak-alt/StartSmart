import React from 'react';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { User, Settings, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { toggleTheme, theme, resetProgress } = useAppContext();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all your progress and domain selection? This cannot be undone.")) {
      resetProgress();
      navigate('/domains');
    }
  };

  return (
    <PageTransition className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-full mx-auto flex items-center justify-center shadow-xl mb-4">
          <User size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-text-muted">Manage your account and settings</p>
      </div>

      <GlassCard>
        <h2 className="text-xl font-bold mb-6 border-b border-border pb-4 flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          Settings
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme Preference</h3>
              <p className="text-sm text-text-muted">Toggle between Light and Dark mode.</p>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="border-red-500/30">
        <h2 className="text-xl font-bold mb-6 border-b border-border pb-4 flex items-center gap-2 text-red-500">
          <ShieldAlert size={20} />
          Danger Zone
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-text">Reset Progress</h3>
            <p className="text-sm text-text-muted max-w-sm">
              This will delete all your completed topics and unselect your current domain. You will start fresh.
            </p>
          </div>
          <Button variant="ghost" className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white" onClick={handleReset}>
            Reset Everything
          </Button>
        </div>
      </GlassCard>
    </PageTransition>
  );
};

export default Profile;
