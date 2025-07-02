
# CyberShield Nigeria 🛡️

CyberShield Nigeria is an AI-powered cybersecurity platform that helps individuals and small businesses detect threats, report scams, and stay safe online. Built with modern web technologies and integrated with advanced security APIs.

## 🚀 Features

### Core Security Tools
- **URL Scanner** - Analyze websites for malicious content using VirusTotal API
- **Password Security Checker** - Check password strength and breach status
- **Scam Reporting System** - Community-driven threat reporting
- **AI Security Advisor** - Get personalized cybersecurity tips and advice

### Premium Features
- **Identity Verification** - Individual and business verification using Dojah API
- **Threat Intelligence Dashboard** - Real-time security monitoring
- **Email Security Analysis** - Advanced phishing detection
- **Password Breach Monitoring** - Monitor compromised credentials

### User Experience
- **Dynamic Security Scoring** - Personalized security assessment
- **Interactive Dashboard** - Comprehensive security overview
- **Responsive Design** - Mobile-friendly interface with green theme
- **Real-time Notifications** - Instant security alerts

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Tanstack Query** for data fetching
- **Lucide React** icons

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Session-based authentication**

### AI & Security APIs
- **Cohere AI** for intelligent responses
- **VirusTotal API** for URL scanning
- **Dojah API** for identity verification
- **HaveIBeenPwned API** for password breach checking

## 📋 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/Opara-Emmanuel/cybershield-nigeria.git
cd cybershield-nigeria
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in Replit Secrets:
- `COHERE_API_KEY` - For AI-powered features
- `VIRUSTOTAL_API_KEY` - For URL scanning
- `DOJAH_API_KEY` - For identity verification
- `DATABASE_URL` - PostgreSQL connection string

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔧 Project Structure

```
cybershield-nigeria/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database configuration
│   └── storage.ts         # Data access layer
├── shared/                 # Shared types and schemas
└── README.md
```

## 📊 Recent Updates

### June 2025 Updates
- ✅ **Initial Project Setup** - Core application structure
- ✅ **AI Integration Migration** - Switched from OpenAI to Cohere for better performance
- ✅ **VirusTotal Integration** - Enhanced URL scanner with comprehensive threat detection
- ✅ **Dynamic Security Scoring** - Personalized security assessment system
- ✅ **UI Enhancement** - Implemented green theme with gold accents
- ✅ **Database Optimization** - Fixed schema issues and improved startup performance
- ✅ **Error Handling** - Enhanced error messages and user feedback
- ✅ **URL Validation** - Accurate invalid format detection

### Premium Features (June 28, 2025)
- ✅ **Identity Verification System** - Dojah API integration for KYC
- ✅ **Threat Intelligence Dashboard** - Real-time security monitoring
- ✅ **Email Security Analysis** - Advanced phishing detection
- ✅ **Enhanced Homepage** - Showcasing new security features
- ✅ **Navigation Updates** - Added premium and security tools sections

## 🎯 Roadmap

### September 2025 Goals
- Enhanced business verification features
- Advanced individual identity verification
- Expanded threat intelligence capabilities
- Mobile application development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Security

CyberShield Nigeria takes security seriously. If you discover any security vulnerabilities, please report them responsibly by contacting our security team.

## 📞 Support

For support and inquiries, please visit our [Contact Page](https://cybershield-nigeria.replit.app/contact) or open an issue on GitHub.

---

**Built with ❤️ for Nigerian cybersecurity by the CyberShield team**
