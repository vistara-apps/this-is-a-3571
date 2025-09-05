# RightsCard API Documentation

## Overview

RightsCard is a mobile-first web application that provides users with location-aware rights summaries, pre-written scripts, and interaction recording tools for police encounters. This document outlines the technical implementation and API requirements.

## Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React hooks and local storage
- **Build Tool**: Vite for fast development and optimized builds

### Data Storage
- **Local Storage**: Browser localStorage for user preferences and data
- **Session Storage**: Temporary data during app usage
- **IndexedDB**: For larger data like recordings (future enhancement)

## Core APIs and Services

### 1. Geolocation API (Browser Native)

**Purpose**: Determine user's current location for state-specific rights information

**Implementation**:
```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // Process location data
  },
  (error) => {
    // Handle location errors
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 600000
  }
);
```

**Error Handling**:
- `PERMISSION_DENIED`: User denied location access
- `POSITION_UNAVAILABLE`: Location information unavailable
- `TIMEOUT`: Location request timed out

### 2. MediaRecorder API (Browser Native)

**Purpose**: Enable audio and video recording of police interactions

**Implementation**:
```javascript
// Request media permissions
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true // for video recording
});

// Create MediaRecorder instance
const mediaRecorder = new MediaRecorder(stream);

// Handle data availability
mediaRecorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    chunks.push(event.data);
  }
};

// Start/stop recording
mediaRecorder.start();
mediaRecorder.stop();
```

**Supported Formats**:
- Audio: WebM, MP4 (browser dependent)
- Video: WebM, MP4 (browser dependent)

### 3. Web Speech API (Browser Native)

**Purpose**: Text-to-speech functionality for script pronunciation

**Implementation**:
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = language === 'spanish' ? 'es-ES' : 'en-US';
speechSynthesis.speak(utterance);
```

### 4. Base Chat Agents API (Future Integration)

**Purpose**: AI-powered custom script generation

**Endpoint**: `https://api.base.org/chat-agents`

**Authentication**: API key required

**Request Format**:
```javascript
{
  "prompt": "Generate helpful phrases for traffic stop scenario",
  "language": "english",
  "context": {
    "state": "CA",
    "scenario": "traffic_stop"
  }
}
```

**Response Format**:
```javascript
{
  "title": "Custom Traffic Stop Script",
  "phrases": [
    "Officer, I understand you've stopped me. May I ask why?",
    "I'm going to reach for my license and registration now.",
    // ... more phrases
  ],
  "generated": true,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Data Models

### User Entity
```javascript
{
  userId: string,           // Unique identifier
  createdAt: string,        // ISO timestamp
  preferredLanguage: string, // 'english' | 'spanish'
  subscriptionStatus: string, // 'free' | 'premium'
  savedRightsSummaries: Array,
  recordedInteractions: Array
}
```

### SavedRightsSummary Entity
```javascript
{
  summaryId: string,        // Unique identifier
  userId: string,           // Reference to user
  currentState: string,     // State code (e.g., 'CA')
  generatedAt: string,      // ISO timestamp
  content: Object           // Summary data
}
```

### RecordedInteraction Entity
```javascript
{
  interactionId: string,    // Unique identifier
  userId: string,           // Reference to user
  timestamp: string,        // ISO timestamp
  audioUrl: string | null,  // Blob URL for audio
  videoUrl: string | null,  // Blob URL for video
  summaryText: string,      // AI-generated summary
  sharedAt: string | null   // Share timestamp
}
```

### StateLaw Entity
```javascript
{
  lawId: string,            // Unique identifier
  state: string,            // State code
  topic: string,            // Law topic/title
  description: string,      // Law description
  url: string              // Reference URL
}
```

## Service Layer

### UserService
Handles user data persistence and management

**Methods**:
- `getUser()`: Retrieve current user data
- `updatePreferences(preferences)`: Update user preferences
- `saveRightsSummary(summary)`: Save rights summary
- `saveRecordedInteraction(recording)`: Save recorded interaction
- `deleteRecordedInteraction(id)`: Delete interaction
- `updateSubscription(status)`: Update subscription status

### AIService
Handles AI-powered features (mock implementation)

**Methods**:
- `generateCustomScript(scenario, language, context)`: Generate custom scripts
- `generateInteractionSummary(recording)`: Generate interaction summary
- `getUsageLimits(subscriptionStatus)`: Get usage limits
- `isAvailable()`: Check service availability

## Component Architecture

### Core Components

#### AppShell
Main application layout with navigation

**Props**:
- `children`: React nodes
- `currentView`: string
- `onViewChange`: function
- `variant`: 'default' | 'minimalNav'

#### Card
Reusable card component with glass morphism effect

**Props**:
- `children`: React nodes
- `variant`: 'default' | 'elevated'
- `className`: string

#### Button
Styled button component with multiple variants

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean

#### Input
Form input component with consistent styling

**Props**:
- `variant`: 'default' | 'search'
- `error`: boolean

#### Alert
Alert/notification component

**Props**:
- `variant`: 'info' | 'warning' | 'success' | 'error'

### Feature Components

#### RightsSummary
Displays location-aware rights information

**Props**:
- `location`: object
- `loading`: boolean
- `error`: string

#### ScriptSelector
Script selection and AI generation interface

**Props**:
- `variant`: 'default'

#### RecordButton
Recording interface with AI summary generation

**Props**:
- `variant`: 'audio' | 'video'

#### LawDatabase
Searchable legal database interface

**Props**: None

#### UserSettings
User preferences and subscription management

**Props**: None

## Hooks

### useLocation
Manages geolocation functionality

**Returns**:
```javascript
{
  location: object | null,
  loading: boolean,
  error: string | null,
  refetch: function
}
```

### useRecording
Manages media recording functionality

**Returns**:
```javascript
{
  isRecording: boolean,
  recordings: Array,
  error: string | null,
  startRecording: function,
  stopRecording: function,
  deleteRecording: function
}
```

## Design System

### Colors
```css
--bg: hsl(220, 15%, 95%)
--accent: hsl(160, 70%, 45%)
--primary: hsl(210, 70%, 50%)
--surface: hsl(0, 0%, 100%)
--text-primary: hsl(220, 30%, 15%)
--text-secondary: hsl(220, 20%, 40%)
```

### Typography
- **Display**: text-4xl font-bold
- **Heading**: text-2xl font-semibold
- **Body**: text-base leading-7
- **Caption**: text-sm text-secondary

### Spacing
- **Small**: 8px
- **Medium**: 12px
- **Large**: 20px

### Border Radius
- **Small**: 6px
- **Medium**: 10px
- **Large**: 16px

### Shadows
- **Card**: 0 4px 12px hsla(220, 30%, 10%, 0.1)
- **Modal**: 0 8px 24px hsla(220, 30%, 10%, 0.15)

## Security Considerations

### Data Privacy
- All user data stored locally
- No personal information sent to external services
- Recordings remain on device unless explicitly shared

### Recording Consent
- Users responsible for understanding local recording laws
- App provides general guidance but not legal advice
- Clear disclaimers throughout application

### API Security
- API keys stored in environment variables
- No sensitive data in client-side code
- Rate limiting on AI service calls

## Performance Optimizations

### Code Splitting
- Lazy loading of components
- Dynamic imports for heavy features

### Asset Optimization
- Optimized images and icons
- Minified CSS and JavaScript
- Gzip compression

### Caching Strategy
- Service worker for offline functionality (future)
- Local storage for frequently accessed data
- Browser caching for static assets

## Browser Compatibility

### Minimum Requirements
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Progressive Enhancement
- Core functionality works without JavaScript
- Graceful degradation for unsupported features
- Responsive design for all screen sizes

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
```
REACT_APP_BASE_API_KEY=your_api_key_here
REACT_APP_ENVIRONMENT=production
```

### Static Hosting
- Optimized for static hosting platforms
- Single-page application routing
- HTTPS required for media APIs

## Future Enhancements

### Planned Features
1. **Offline Support**: Service worker implementation
2. **Push Notifications**: Emergency alerts and updates
3. **Biometric Security**: Secure access to recordings
4. **Multi-language Support**: Additional language options
5. **Advanced AI Features**: Real-time transcription
6. **Legal Network Integration**: Attorney referral system

### API Integrations
1. **Real Geocoding Service**: Replace mock location detection
2. **Professional Legal Database**: Enhanced law information
3. **Emergency Services API**: Direct emergency contact
4. **Legal Aid Integration**: Connect with legal assistance

## Support and Maintenance

### Error Monitoring
- Client-side error tracking
- Performance monitoring
- User feedback collection

### Updates
- Regular security updates
- Feature enhancements based on user feedback
- Legal database updates

### Documentation
- User guides and tutorials
- Developer documentation
- API reference updates

---

*This documentation is maintained alongside the codebase and updated with each release.*
