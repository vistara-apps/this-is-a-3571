// User Service - Handles user data and preferences
class UserService {
  constructor() {
    this.storageKey = 'rightscard_user';
    this.user = this.loadUser();
  }

  // Load user from localStorage
  loadUser() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    
    // Return default user
    return {
      userId: this.generateUserId(),
      createdAt: new Date().toISOString(),
      preferredLanguage: 'english',
      subscriptionStatus: 'free',
      savedRightsSummaries: [],
      recordedInteractions: []
    };
  }

  // Save user to localStorage
  saveUser() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  // Generate unique user ID
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get current user
  getUser() {
    return { ...this.user };
  }

  // Update user preferences
  updatePreferences(preferences) {
    this.user = { ...this.user, ...preferences };
    this.saveUser();
    return this.user;
  }

  // Save rights summary
  saveRightsSummary(summary) {
    const savedSummary = {
      summaryId: 'summary_' + Date.now(),
      userId: this.user.userId,
      currentState: summary.state,
      generatedAt: new Date().toISOString(),
      content: summary
    };

    this.user.savedRightsSummaries.push(savedSummary);
    this.saveUser();
    return savedSummary;
  }

  // Save recorded interaction
  saveRecordedInteraction(recording) {
    const interaction = {
      interactionId: 'interaction_' + Date.now(),
      userId: this.user.userId,
      timestamp: new Date().toISOString(),
      audioUrl: recording.type === 'audio' ? recording.url : null,
      videoUrl: recording.type === 'video' ? recording.url : null,
      summaryText: recording.summary || '',
      sharedAt: null
    };

    this.user.recordedInteractions.push(interaction);
    this.saveUser();
    return interaction;
  }

  // Get saved summaries
  getSavedSummaries() {
    return this.user.savedRightsSummaries || [];
  }

  // Get recorded interactions
  getRecordedInteractions() {
    return this.user.recordedInteractions || [];
  }

  // Delete recorded interaction
  deleteRecordedInteraction(interactionId) {
    this.user.recordedInteractions = this.user.recordedInteractions.filter(
      interaction => interaction.interactionId !== interactionId
    );
    this.saveUser();
  }

  // Update subscription status
  updateSubscription(status) {
    this.user.subscriptionStatus = status;
    this.saveUser();
    return this.user;
  }

  // Check if user has premium features
  hasPremiumFeatures() {
    return this.user.subscriptionStatus === 'premium';
  }
}

// Export singleton instance
export const userService = new UserService();
export default userService;
