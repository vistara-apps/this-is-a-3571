import React from 'react';
import { Shield, Menu, Home, BookOpen, Mic, Search, Settings } from 'lucide-react';

const AppShell = ({ children, currentView, onViewChange, variant = 'default' }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'scripts', icon: BookOpen, label: 'Scripts' },
    { id: 'record', icon: Mic, label: 'Record' },
    { id: 'laws', icon: Search, label: 'Laws' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  if (variant === 'minimalNav') {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass-effect border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">RightsCard</span>
            </div>
            <button className="md:hidden p-2 text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-4xl mx-auto">
        {/* Sidebar Navigation */}
        <nav className="hidden md:flex flex-col w-64 glass-effect border-r border-white/20 min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    currentView === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded transition-colors ${
                currentView === item.id
                  ? 'text-white'
                  : 'text-white/70'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;
