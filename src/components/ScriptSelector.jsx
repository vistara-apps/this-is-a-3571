import React, { useState } from 'react';
import { Volume2, Copy, ChevronDown } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { scripts } from '../data/stateLaws';

const ScriptSelector = ({ variant = 'default' }) => {
  const [selectedScript, setSelectedScript] = useState('consent');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'spanish' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const currentScript = scripts[selectedScript];
  const phrases = currentScript?.[selectedLanguage] || [];

  return (
    <div className="space-y-6">
      {/* Script Type Selector */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select Scenario</h3>
        <div className="space-y-2">
          {Object.entries(scripts).map(([key, script]) => (
            <button
              key={key}
              onClick={() => setSelectedScript(key)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedScript === key
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {script.title}
            </button>
          ))}
        </div>
      </Card>

      {/* Language Selector */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
        <div className="flex space-x-2">
          <Button
            variant={selectedLanguage === 'english' ? 'primary' : 'secondary'}
            onClick={() => setSelectedLanguage('english')}
            className="flex-1"
          >
            English
          </Button>
          <Button
            variant={selectedLanguage === 'spanish' ? 'primary' : 'secondary'}
            onClick={() => setSelectedLanguage('spanish')}
            className="flex-1"
          >
            Español
          </Button>
        </div>
      </Card>

      {/* Phrases */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {currentScript?.title} - Phrases
        </h3>
        <div className="space-y-3">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
            >
              <span className="text-white text-sm flex-1 mr-3">{phrase}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => speakText(phrase)}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  title="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => copyToClipboard(phrase, index)}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  title="Copy"
                >
                  <Copy className={`h-4 w-4 ${copiedIndex === index ? 'text-green-400' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Emergency Contacts</h3>
        <div className="space-y-2 text-white/80 text-sm">
          <p>• National Emergency: 911</p>
          <p>• ACLU Legal Hotline: 1-877-634-5084</p>
          <p>• Know Your Rights Hotline: 1-866-940-8879</p>
        </div>
      </Card>
    </div>
  );
};

export default ScriptSelector;