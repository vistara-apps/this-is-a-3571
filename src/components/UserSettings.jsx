import React, { useState } from 'react';
import { Settings, User, Crown, Globe, Bell, Shield } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import Alert from './Alert';
import { userService } from '../services/userService';

const UserSettings = () => {
  const [user, setUser] = useState(userService.getUser());
  const [saved, setSaved] = useState(false);

  const updatePreference = (key, value) => {
    const updatedUser = userService.updatePreferences({ [key]: value });
    setUser(updatedUser);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const upgradeSubscription = () => {
    const updatedUser = userService.updateSubscription('premium');
    setUser(updatedUser);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/70">Customize your RightsCard experience</p>
      </div>

      {saved && (
        <Alert variant="success">
          Settings saved successfully!
        </Alert>
      )}

      {/* User Profile */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <User className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Profile</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">User ID</label>
            <div className="p-3 bg-white/5 rounded-lg text-white/60 text-sm font-mono">
              {user.userId}
            </div>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Member Since</label>
            <div className="p-3 bg-white/5 rounded-lg text-white/60 text-sm">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Card>

      {/* Subscription Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Subscription</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.subscriptionStatus === 'premium' 
              ? 'bg-yellow-500/20 text-yellow-300' 
              : 'bg-gray-500/20 text-gray-300'
          }`}>
            {user.subscriptionStatus.toUpperCase()}
          </span>
        </div>
        
        {user.subscriptionStatus === 'free' ? (
          <div className="space-y-4">
            <p className="text-white/70 text-sm">
              Upgrade to Premium for unlimited AI-generated scripts, interaction summaries, 
              and offline access to all features.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-white font-medium mb-2">Free Features:</h4>
                <ul className="space-y-1 text-white/60">
                  <li>• Basic rights summaries</li>
                  <li>• Pre-written scripts</li>
                  <li>• Recording functionality</li>
                  <li>• 3 AI scripts per day</li>
                  <li>• 2 AI summaries per day</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2">Premium Features:</h4>
                <ul className="space-y-1 text-white/60">
                  <li>• Unlimited AI-generated scripts</li>
                  <li>• Unlimited interaction summaries</li>
                  <li>• Offline access</li>
                  <li>• Extended recording storage</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
            
            <Button
              onClick={upgradeSubscription}
              variant="primary"
              className="w-full"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-white font-medium">Premium Member</p>
            <p className="text-white/60 text-sm">Thank you for supporting RightsCard!</p>
          </div>
        )}
      </Card>

      {/* Language Preferences */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Language</h2>
        </div>
        
        <div className="space-y-3">
          <label className="block text-white/80 text-sm mb-2">Preferred Language</label>
          <div className="flex space-x-2">
            <Button
              variant={user.preferredLanguage === 'english' ? 'primary' : 'secondary'}
              onClick={() => updatePreference('preferredLanguage', 'english')}
              className="flex-1"
            >
              English
            </Button>
            <Button
              variant={user.preferredLanguage === 'spanish' ? 'primary' : 'secondary'}
              onClick={() => updatePreference('preferredLanguage', 'spanish')}
              className="flex-1"
            >
              Español
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
        </div>
        
        <div className="space-y-4 text-sm text-white/70">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Data Storage</h4>
            <p>Your data is stored locally on your device. We do not collect or store personal information on our servers.</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Recording Privacy</h4>
            <p>All recordings remain on your device unless you explicitly choose to share them. We recommend reviewing local laws regarding recording consent.</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">AI Processing</h4>
            <p>AI features process data to generate summaries and scripts. No personal information is sent to AI services.</p>
          </div>
        </div>
      </Card>

      {/* Usage Statistics */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Usage Statistics</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">
              {user.savedRightsSummaries?.length || 0}
            </div>
            <div className="text-white/60 text-sm">Rights Summaries</div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">
              {user.recordedInteractions?.length || 0}
            </div>
            <div className="text-white/60 text-sm">Recordings</div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-white/60 text-sm">Days Active</div>
          </div>
        </div>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="p-6 border-yellow-500/30 bg-yellow-500/10">
        <p className="text-yellow-200 text-sm">
          <strong>Important:</strong> RightsCard is for educational purposes only and does not constitute legal advice. 
          Laws vary by jurisdiction and change frequently. Always consult with a qualified attorney for specific legal guidance.
        </p>
      </Card>
    </div>
  );
};

export default UserSettings;
