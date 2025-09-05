// AI Service - Handles AI-powered features like script generation and interaction summaries
class AIService {
  constructor() {
    this.baseUrl = 'https://api.base.org'; // Base Chat Agents API endpoint
    this.apiKey = process.env.REACT_APP_BASE_API_KEY || null;
  }

  // Generate custom scripts based on user scenario
  async generateCustomScript(scenario, language = 'english', context = {}) {
    try {
      // Mock implementation for demo - in production, integrate with Base Chat Agents
      const prompt = this.buildScriptPrompt(scenario, language, context);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock generated scripts
      return this.getMockGeneratedScript(scenario, language);
    } catch (error) {
      console.error('Error generating custom script:', error);
      throw new Error('Failed to generate custom script');
    }
  }

  // Build prompt for script generation
  buildScriptPrompt(scenario, language, context) {
    const basePrompt = `Generate helpful, legally sound phrases for a ${scenario} scenario during a police interaction.`;
    const languagePrompt = language === 'spanish' ? ' Provide responses in Spanish.' : ' Provide responses in English.';
    const contextPrompt = context.state ? ` Consider laws specific to ${context.state}.` : '';
    
    return basePrompt + languagePrompt + contextPrompt + ' Focus on de-escalation and asserting rights respectfully.';
  }

  // Mock generated script (replace with actual API call)
  getMockGeneratedScript(scenario, language) {
    const scripts = {
      english: {
        custom_traffic: [
          "Officer, I understand you've stopped me. May I ask why?",
          "I'm going to reach for my license and registration now.",
          "I do not consent to any searches of my person or vehicle.",
          "Am I free to leave, or am I being detained?"
        ],
        custom_detention: [
          "I am invoking my right to remain silent.",
          "I do not consent to any searches.",
          "I would like to speak with an attorney.",
          "I am not resisting, but I do not consent to this interaction."
        ],
        custom_general: [
          "I am exercising my constitutional rights.",
          "I do not answer questions without my attorney present.",
          "I do not consent to any searches or seizures.",
          "Please document that I am cooperating but not consenting."
        ]
      },
      spanish: {
        custom_traffic: [
          "Oficial, entiendo que me ha detenido. ¿Puedo preguntar por qué?",
          "Voy a alcanzar mi licencia y registro ahora.",
          "No consiento ninguna búsqueda de mi persona o vehículo.",
          "¿Soy libre de irme, o me están deteniendo?"
        ],
        custom_detention: [
          "Estoy invocando mi derecho a permanecer en silencio.",
          "No consiento a ninguna búsqueda.",
          "Me gustaría hablar con un abogado.",
          "No me estoy resistiendo, pero no consiento a esta interacción."
        ],
        custom_general: [
          "Estoy ejerciendo mis derechos constitucionales.",
          "No respondo preguntas sin mi abogado presente.",
          "No consiento a ninguna búsqueda o incautación.",
          "Por favor documente que estoy cooperando pero no consintiendo."
        ]
      }
    };

    const scriptKey = `custom_${scenario}`;
    return {
      title: `Custom ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Script`,
      phrases: scripts[language][scriptKey] || scripts[language]['custom_general'],
      generated: true,
      timestamp: new Date().toISOString()
    };
  }

  // Generate summary of recorded interaction
  async generateInteractionSummary(recording) {
    try {
      // Mock implementation - in production, use speech-to-text and AI summarization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        summary: this.getMockSummary(),
        keyPoints: this.getMockKeyPoints(),
        recommendations: this.getMockRecommendations(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating interaction summary:', error);
      throw new Error('Failed to generate interaction summary');
    }
  }

  // Mock summary generation
  getMockSummary() {
    return "Police interaction recorded. Duration approximately 5 minutes. Officer requested identification and asked about destination. Rights were asserted politely. No searches conducted. Interaction concluded without incident.";
  }

  getMockKeyPoints() {
    return [
      "Officer badge number: 1234",
      "Traffic stop initiated at 2:30 PM",
      "Reason given: Speeding violation",
      "Rights asserted: Right to remain silent",
      "No consent given for searches",
      "Interaction remained civil throughout"
    ];
  }

  getMockRecommendations() {
    return [
      "Consider consulting with a traffic attorney",
      "Keep copy of citation for records",
      "Document any unusual behavior or statements",
      "Review local traffic laws for this area"
    ];
  }

  // Check if AI features are available
  isAvailable() {
    return true; // Always available in mock mode
  }

  // Get usage limits based on subscription
  getUsageLimits(subscriptionStatus) {
    const limits = {
      free: {
        customScripts: 3,
        summaries: 2,
        resetPeriod: 'daily'
      },
      premium: {
        customScripts: -1, // unlimited
        summaries: -1, // unlimited
        resetPeriod: 'none'
      }
    };

    return limits[subscriptionStatus] || limits.free;
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;
