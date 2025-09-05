import React, { useState } from 'react';
import AppShell from './components/AppShell';
import RightsSummary from './components/RightsSummary';
import ScriptSelector from './components/ScriptSelector';
import RecordButton from './components/RecordButton';
import LawDatabase from './components/LawDatabase';
import UserSettings from './components/UserSettings';
import Card from './components/Card';
import { useLocation } from './hooks/useLocation';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { location, loading, error } = useLocation();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">RightsCard</h1>
              <p className="text-white/70">Your pocket guide to rights during police stops</p>
            </div>
            
            <RightsSummary location={location} loading={loading} error={error} />
            
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card 
                className="p-4 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setCurrentView('scripts')}
              >
                <h3 className="text-white font-semibold mb-2">Quick Scripts</h3>
                <p className="text-white/70 text-sm">Access pre-written phrases for common situations</p>
              </Card>
              
              <Card 
                className="p-4 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setCurrentView('record')}
              >
                <h3 className="text-white font-semibold mb-2">Record Interaction</h3>
                <p className="text-white/70 text-sm">Securely document your encounter</p>
              </Card>
              
              <Card 
                className="p-4 cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setCurrentView('laws')}
              >
                <h3 className="text-white font-semibold mb-2">Legal Database</h3>
                <p className="text-white/70 text-sm">Search state-specific laws and rights</p>
              </Card>
            </div>
          </div>
        );
      
      case 'scripts':
        return (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Communication Scripts</h1>
            <ScriptSelector />
          </div>
        );
      
      case 'record':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white mb-6">Record Interaction</h1>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Audio Recording</h3>
                <RecordButton variant="audio" />
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Video Recording</h3>
                <RecordButton variant="video" />
              </Card>
            </div>
          </div>
        );
      
      case 'laws':
        return (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Legal Database</h1>
            <LawDatabase />
          </div>
        );
      
      case 'settings':
        return <UserSettings />;
      
      default:
        return (
          <div className="text-center text-white">
            <h2 className="text-xl">Page not found</h2>
          </div>
        );
    }
  };

  return (
    <AppShell 
      currentView={currentView} 
      onViewChange={setCurrentView}
      variant={currentView === 'dashboard' ? 'default' : 'default'}
    >
      {renderContent()}
      
      {/* Mobile spacing for bottom nav */}
      <div className="h-20 md:hidden"></div>
    </AppShell>
  );
}

export default App;
