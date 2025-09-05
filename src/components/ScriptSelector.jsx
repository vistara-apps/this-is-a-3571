import React, { useState } from 'react';
import { Volume2, Copy, ChevronDown, Sparkles, Loader } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import Alert from './Alert';
import { scripts } from '../data/stateLaws';
import { aiService } from '../services/aiService';
import { userService } from '../services/userService';

const ScriptSelector = ({ variant = 'default' }) => {
  const [selectedScript, setSelectedScript] = useState('consent');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [customScenario, setCustomScenario] = useState('');
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  const user = userService.getUser();
  const usageLimits = aiService.getUsageLimits(user.subscriptionStatus);

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

  const generateCustomScript = async () => {
    if (!customScenario.trim()) {
      setError('Please describe your scenario');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const script = await aiService.generateCustomScript(
        customScenario.toLowerCase(),
        selectedLanguage,
        { state: user.currentState }
      );
      
      setGeneratedScript(script);
      setSelectedScript('custom');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentScript = selectedScript === 'custom' && generatedScript 
    ? generatedScript 
    : scripts[selectedScript];
  const phrases = selectedScript === 'custom' && generatedScript
    ? generatedScript.phrases
    : currentScript?.[selectedLanguage] || [];

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* AI-Powered Custom Script Generator */}
      <Card className="p-6 border-accent/30 bg-accent/10">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold text-white">AI Custom Script Generator</h3>
          {!user.hasPremiumFeatures && (
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
              {usageLimits.customScripts} uses/day
            </span>
          )}
        </div>
        
        <div className="space-y-4">
          <Input
            placeholder="Describe your specific scenario (e.g., 'traffic stop for speeding', 'stopped while walking')"
            value={customScenario}
            onChange={(e) => setCustomScenario(e.target.value)}
            disabled={isGenerating}
          />
          
          <Button
            onClick={generateCustomScript}
            disabled={isGenerating || !customScenario.trim()}
            variant="primary"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Generating Custom Script...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Custom Script
              </>
            )}
          </Button>
        </div>
      </Card>

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
          
          {generatedScript && (
            <button
              onClick={() => setSelectedScript('custom')}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-2 ${
                selectedScript === 'custom'
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{generatedScript.title}</span>
            </button>
          )}
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
