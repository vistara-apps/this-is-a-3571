import React from 'react';
import { Mic, Video, Square, AlertCircle } from 'lucide-react';
import Button from './Button';
import Alert from './Alert';
import { useRecording } from '../hooks/useRecording';

const RecordButton = ({ variant = 'audio' }) => {
  const { isRecording, recordings, error, startRecording, stopRecording, deleteRecording } = useRecording();

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
              
              <div className="mt-3 flex space-x-2">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordButton;