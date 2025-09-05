import React, { useState } from 'react';
import { Search, ExternalLink, Book } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { stateLaws } from '../data/stateLaws';

const LawDatabase = () => {
  const [selectedState, setSelectedState] = useState('CA');
  const [searchTerm, setSearchTerm] = useState('');

  const states = Object.entries(stateLaws).map(([code, data]) => ({
    code,
    name: data.name
  }));

  const currentState = stateLaws[selectedState];
  const filteredLaws = currentState?.laws.filter(law =>
    law.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    law.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Legal Database</h2>
        
        {/* State Selector */}
        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-2">Select State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {states.map((state) => (
              <option key={state.code} value={state.code} className="bg-gray-800">
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="text"
            placeholder="Search laws and topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </Card>

      {/* State Rights Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {currentState?.name} - Key Rights
        </h3>
        <div className="space-y-2">
          {currentState?.rights.map((right, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm">{right}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Laws and Statutes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Laws & Statutes ({filteredLaws.length})
        </h3>
        
        {filteredLaws.length === 0 ? (
          <Card className="p-6">
            <div className="text-center text-white/60">
              <Book className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No laws found matching your search.</p>
            </div>
          </Card>
        ) : (
          filteredLaws.map((law) => (
            <Card key={law.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {law.topic}
                  </h4>
                  <p className="text-white/80 text-sm mb-4">
                    {law.description}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-xs">
                  {currentState?.name} Law
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(law.url, '_blank')}
                  className="flex items-center space-x-1"
                >
                  <span>View Statute</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Disclaimer */}
      <Card className="p-6 border-yellow-500/30 bg-yellow-500/10">
        <p className="text-yellow-200 text-sm">
          <strong>Legal Disclaimer:</strong> This information is for educational purposes only 
          and does not constitute legal advice. Laws change frequently and vary by jurisdiction. 
          Consult with a qualified attorney for specific legal guidance.
        </p>
      </Card>
    </div>
  );
};

export default LawDatabase;