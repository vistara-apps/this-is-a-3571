import React from 'react';
import { MapPin, Shield, AlertCircle } from 'lucide-react';
import Card from './Card';
import Alert from './Alert';
import { stateLaws } from '../data/stateLaws';

const RightsSummary = ({ location, loading, error }) => {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="text-white">Getting your location...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="warning">
        <div>
          <p className="font-semibold">Location Error</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">Showing general rights information.</p>
        </div>
      </Alert>
    );
  }

  const stateData = location ? stateLaws[location.state] : stateLaws['CA'];
  const stateName = stateData?.name || 'Unknown State';

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="h-6 w-6 text-white" />
          <div>
            <h2 className="text-xl font-semibold text-white">Your Location</h2>
            <p className="text-white/70">{stateName}</p>
          </div>
        </div>
        {location && (
          <p className="text-white/60 text-sm">
            Rights information tailored for {stateName}
          </p>
        )}
      </Card>

      {/* Critical Rights */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-accent" />
          <h3 className="text-lg font-semibold text-white">Your Rights</h3>
        </div>
        <div className="space-y-3">
          {stateData?.rights.map((right, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white text-sm">{right}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-4">DO</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>• Stay calm and polite</li>
            <li>• Keep your hands visible</li>
            <li>• Ask "Am I free to leave?"</li>
            <li>• Record if legal in your area</li>
            <li>• Remember badge numbers</li>
          </ul>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4">DON'T</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>• Resist physically</li>
            <li>• Consent to searches</li>
            <li>• Answer questions beyond ID</li>
            <li>• Make sudden movements</li>
            <li>• Argue or become hostile</li>
          </ul>
        </Card>
      </div>

      {/* Emergency Alert */}
      <Alert variant="error">
        <div>
          <p className="font-semibold">Emergency Situation?</p>
          <p className="text-sm mt-1">
            If you feel unsafe or are being mistreated, try to remain calm, 
            comply with orders, and document everything for later.
          </p>
        </div>
      </Alert>
    </div>
  );
};

export default RightsSummary;