# RightsCard 🛡️

**Your pocket guide to rights during police stops.**

RightsCard is a mobile-first web application that empowers users with crucial knowledge during police encounters. It provides location-aware rights summaries, pre-written communication scripts, and secure interaction recording tools.

![RightsCard Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=RightsCard+Dashboard)

## 🌟 Features

### 📍 **Location-Aware Rights Summary**
- Automatically detects your location
- Provides state-specific rights information
- Concise, mobile-friendly summaries
- Critical "dos and don'ts" for police encounters

### 💬 **Pre-Written Scripts & AI Generation**
- Ready-to-use phrases in English and Spanish
- Common scenarios: traffic stops, detentions, searches
- AI-powered custom script generation
- Text-to-speech pronunciation support

### 🎥 **Secure Interaction Recording**
- Discreet audio and video recording
- AI-powered interaction summaries
- Secure local storage
- Easy sharing with trusted contacts

### 📚 **State-Specific Legal Database**
- Searchable repository of relevant laws
- Links to official statutes
- Regular updates with legal changes
- Covers all 50 states (expanding)

### ⚙️ **User Preferences & Premium Features**
- Customizable language settings
- Free tier with essential features
- Premium tier with unlimited AI features
- Local data storage for privacy

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern web browser with media API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-3571.git
   cd this-is-a-3571
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: React Hooks, Local Storage
- **APIs**: Browser Geolocation, MediaRecorder, Web Speech
- **AI Integration**: Base Chat Agents (planned)
- **Styling**: Custom design system with glass morphism

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── AppShell.jsx    # Main layout
│   ├── Card.jsx        # Glass morphism cards
│   ├── Button.jsx      # Styled buttons
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useLocation.js  # Geolocation management
│   └── useRecording.js # Media recording
├── services/           # Business logic services
│   ├── userService.js  # User data management
│   └── aiService.js    # AI features (mock)
├── data/               # Static data and constants
│   └── stateLaws.js    # Legal information
└── App.jsx            # Main application component
```

## 🎨 Design System

### Colors
- **Primary**: `hsl(210, 70%, 50%)` - Trust and authority
- **Accent**: `hsl(160, 70%, 45%)` - Action and safety
- **Background**: Gradient from `#667eea` to `#764ba2`

### Typography
- **Display**: Large, bold headings
- **Body**: Readable, accessible text
- **Monospace**: Technical information

### Components
- **Glass Morphism**: Translucent cards with backdrop blur
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant

## 📱 Usage Guide

### Getting Started
1. **Allow Location Access**: Enable location services for state-specific information
2. **Review Your Rights**: Read the personalized rights summary
3. **Explore Scripts**: Browse pre-written phrases for different scenarios
4. **Practice Recording**: Test the recording feature in a safe environment

### During a Police Encounter
1. **Stay Calm**: Keep the app easily accessible
2. **Know Your Rights**: Reference the rights summary if needed
3. **Use Scripts**: Access pre-written phrases for clear communication
4. **Record if Legal**: Use the recording feature where legally permitted
5. **Document Everything**: Save important details for later review

### After an Encounter
1. **Generate Summary**: Use AI to analyze your recording
2. **Save Information**: Store important details securely
3. **Seek Legal Advice**: Consult with an attorney if needed
4. **Share if Necessary**: Provide recordings to legal counsel

## 🔒 Privacy & Security

### Data Protection
- **Local Storage Only**: All data stays on your device
- **No Cloud Sync**: We don't store your personal information
- **Secure Recording**: Media files remain private unless shared
- **Anonymous Usage**: No tracking or analytics

### Legal Considerations
- **Recording Laws**: Users responsible for understanding local laws
- **Educational Purpose**: App provides guidance, not legal advice
- **Disclaimer**: Always consult qualified attorneys for legal matters

## 🌍 Supported Locations

Currently supporting:
- **California** - Comprehensive coverage
- **New York** - Full legal database
- **Texas** - Complete rights information
- **Florida** - Detailed law references
- **Illinois** - Recording rights included
- **Washington** - Privacy protections

*Expanding to all 50 states - contribute your state's information!*

## 🤝 Contributing

We welcome contributions from developers, legal experts, and community advocates!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Areas
- **Legal Information**: Add/update state-specific laws
- **Translations**: Help with Spanish and other languages
- **UI/UX**: Improve accessibility and user experience
- **Testing**: Add test coverage and bug reports
- **Documentation**: Enhance guides and API docs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Disclaimer

**IMPORTANT**: RightsCard is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and change frequently. The information provided should not be relied upon as a substitute for consultation with qualified legal professionals.

- Always consult with an attorney for specific legal guidance
- Understand local laws regarding recording consent
- Rights and procedures may vary by location
- This app does not guarantee any legal outcomes

## 🆘 Emergency Contacts

- **National Emergency**: 911
- **ACLU Legal Hotline**: 1-877-634-5084
- **Know Your Rights Hotline**: 1-866-940-8879

## 📞 Support

### Getting Help
- **Documentation**: Check our [API Documentation](docs/API_DOCUMENTATION.md)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/vistara-apps/this-is-a-3571/issues)
- **Discussions**: Join community discussions
- **Email**: Contact us at support@rightscard.app

### Roadmap
- [ ] Offline functionality with service workers
- [ ] Real-time transcription during recording
- [ ] Integration with legal aid organizations
- [ ] Multi-language support (French, Mandarin, etc.)
- [ ] Biometric security for sensitive recordings
- [ ] Emergency contact integration
- [ ] Legal network referral system

## 🙏 Acknowledgments

- **Legal Experts**: For reviewing and validating legal information
- **Community Contributors**: For translations and local law updates
- **Civil Rights Organizations**: For guidance and support
- **Open Source Community**: For tools and libraries used

---

**Made with ❤️ for civil rights and community safety**

*RightsCard - Know Your Rights, Protect Your Future*
