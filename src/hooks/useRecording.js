import { useState, useRef, useCallback } from 'react';

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = useCallback(async (type = 'audio') => {
    try {
      setError(null);
      
      const constraints = type === 'video' 
        ? { video: true, audio: true }
        : { audio: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { 
          type: type === 'video' ? 'video/webm' : 'audio/webm' 
        });
        
        const url = URL.createObjectURL(blob);
        const newRecording = {
          id: Date.now(),
          type,
          url,
          blob,
          timestamp: new Date(),
          duration: 0 // Would need additional logic to calculate
        };

        setRecordings(prev => [...prev, newRecording]);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

    } catch (err) {
      setError(getRecordingErrorMessage(err));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const deleteRecording = useCallback((id) => {
    setRecordings(prev => {
      const recording = prev.find(r => r.id === id);
      if (recording?.url) {
        URL.revokeObjectURL(recording.url);
      }
      return prev.filter(r => r.id !== id);
    });
  }, []);

  const getRecordingErrorMessage = (error) => {
    if (error.name === 'NotAllowedError') {
      return 'Permission denied. Please allow microphone/camera access.';
    }
    if (error.name === 'NotFoundError') {
      return 'No microphone or camera found.';
    }
    return `Recording error: ${error.message}`;
  };

  return {
    isRecording,
    recordings,
    error,
    startRecording,
    stopRecording,
    deleteRecording
  };
};