import React, { useState } from 'react';
import { Mic, Video, Square, AlertCircle, FileText, Sparkles, Loader } from 'lucide-react';
import Button from './Button';
import Alert from './Alert';
import Card from './Card';
import { useRecording } from '../hooks/useRecording';
import { aiService } from '../services/aiService';
import { userService } from '../services/userService';

const RecordButton = ({ variant = 'audio' }) => {
  const { isRecording, recordings, error, startRecording, stopRecording, deleteRecording } = useRecording();
  const [generatingSummary, setGeneratingSummary] = useState(null);
  const [summaries, setSummaries] = useState({});
  
  const user = userService.getUser();

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(variant);
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleString();
  };

  const generateSummary = async (recording) => {
    setGeneratingSummary(recording.id);
    
    try {
      const summary = await aiService.generateInteractionSummary(recording);
      setSummaries(prev => ({
        ...prev,
        [recording.id]: summary
      }));
      
      // Save to user service
      userService.saveRecordedInteraction({
        ...recording,
        summary: summary.summary
      });
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setGeneratingSummary(null);
    }
  };

  const Icon = variant === 'video' ? Video : Mic;
  const label = variant === 'video' ? 'Video' : 'Audio';

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Recording Controls */}
      <div className="text-center space-y-4">
        <Button
          onClick={handleToggleRecording}
          variant={isRecording ? 'outline' : 'primary'}
          size="lg"
          className={`w-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          {isRecording ? (
            <>
              <Square className="h-5 w-5 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Icon className="h-5 w-5 mr-2" />
              Start {label} Recording
            </>
          )}
        </Button>

        {isRecording && (
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>Recording in progress...</span>
          </div>
        )}
      </div>

      {/* Recording Instructions */}
      <Alert variant="info">
        <div className="text-sm">
          <p className="font-semibold mb-2">Recording Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Keep your device steady and pointed away from yourself</li>
            <li>• Announce the date, time, and location clearly</li>
            <li>• Do not interfere with police duties while recording</li>
            <li>• Recording is your right in public spaces</li>
          </ul>
        </div>
      </Alert>

      {/* Recordings List */}
      {recordings.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Recent Recordings</h3>
          {recordings.map((recording) => (
            <div key={recording.id} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-white/70" />
                  <span className="text-white text-sm">
                    {recording.type} Recording
                  </span>
                </div>
                <button
                  onClick={() => deleteRecording(recording.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
              
              <p className="text-white/70 text-xs mb-3">
                {formatTimestamp(recording.timestamp)}
              </p>

              {recording.type === 'video' ? (
                <video
                  controls
                  className="w-full max-h-48 rounded"
                  src={recording.url}
                />
              ) : (
                <audio
                  controls
                  className="w-full"
                  src={recording.url}
                />
              )}
              
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = recording.url;
                    link.download = `recording-${recording.id}.${recording.type === 'video' ? 'webm' : 'webm'}`;
                    link.click();
                  }}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Police Interaction Recording',
                        text: `Recording from ${formatTimestamp(recording.timestamp)}`,
                        url: recording.url
                      });
                    } else {
                      // Fallback - copy URL to clipboard
                      navigator.clipboard.writeText(recording.url);
                    }
                  }}
                >
                  Share
                </Button>
                
                {!summaries[recording.id] && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateSummary(recording)}
                    disabled={generatingSummary === recording.id}
                    className="flex items-center space-x-1"
                  >
                    {generatingSummary === recording.id ? (
                      <>
                        <Loader className="h-3 w-3 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3" />
                        <span>AI Summary</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {/* AI-Generated Summary */}
              {summaries[recording.id] && (
                <Card className="mt-4 p-4 bg-accent/10 border-accent/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-4 w-4 text-accent" />
                    <h4 className="text-sm font-semibold text-white">AI Summary</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-white/80">{summaries[recording.id].summary}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">Key Points:</h5>
                      <ul className="space-y-1 text-white/70">
                        {summaries[recording.id].keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">Recommendations:</h5>
                      <ul className="space-y-1 text-white/70">
                        {summaries[recording.id].recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordButton;
