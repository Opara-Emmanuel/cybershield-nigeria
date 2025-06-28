# CyberShield Nigeria - Cybersecurity Platform

## Overview

CyberShield Nigeria is a full-stack web application designed to protect Nigerian internet users from digital threats. The platform provides comprehensive cybersecurity tools including password strength checking, URL scanning, AI-powered security advice, and scam reporting capabilities. Built with modern web technologies, it features a React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database storage.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with JSON responses
- **Security**: Password hashing using Node.js crypto module (scrypt)

### Database Architecture
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Three main entities - users, scam reports, and security checks
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Authentication System
- Session-based authentication using Passport.js
- Local strategy with username/password login
- Secure password hashing with salt using scrypt algorithm
- Protected routes requiring authentication
- PostgreSQL session store for persistence

### Security Tools
- **Password Checker**: Client-side password strength analysis with breach checking
- **URL Scanner**: URL validation and safety assessment with VirusTotal integration
- **AI Advisor**: Cohere AI integration for security tips and chat functionality
- **Scam Reporter**: User reporting system for suspicious activities
- **Identity Verification**: Premium KYC service for individual and business verification (Dojah API ready)
- **Threat Intelligence**: Real-time cybersecurity threat monitoring and alerts
- **Email Security**: Email and domain analysis for phishing and malware detection

### Data Models
```typescript
// Users table
users: {
  id: serial (primary key)
  username: text (unique)
  password: text (hashed)
}

// Scam reports table
scam_reports: {
  id: serial (primary key)
  userId: integer (foreign key)
  report: text
  type: text
  createdAt: timestamp
}

// Security checks table
security_checks: {
  id: serial (primary key)
  userId: integer (foreign key)
  url: text (nullable)
  verdict: text
  type: text
  createdAt: timestamp
}
```

## Data Flow

### Authentication Flow
1. User submits credentials via login form
2. Passport.js validates credentials against database
3. Session created and stored in PostgreSQL
4. Subsequent requests authenticated via session cookies
5. Protected routes check authentication status

### Security Check Flow
1. User inputs data (password/URL) in frontend
2. Client-side analysis performed immediately
3. Results sent to backend API for logging
4. Data stored in security_checks table with user association
5. Historical data retrievable via dashboard

### AI Integration Flow
1. User requests security advice or asks questions
2. Frontend sends request to backend AI endpoints
3. Backend calls OpenAI API with sanitized input
4. AI response processed and returned to client
5. Conversation history maintained in component state

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework
- **passport**: Authentication middleware
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

### External Services
- **Cohere AI API**: AI-powered security advice and chat functionality
- **VirusTotal API**: URL and file threat scanning service
- **Dojah API**: Identity verification and KYC services (ready for integration)
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit**: Development and hosting platform

## Deployment Strategy

### Development Setup
- Runs on Node.js 20 with Vite dev server
- Hot module replacement for fast development
- TypeScript checking and compilation
- Automatic database migrations via Drizzle

### Production Build
- Vite builds optimized React bundle to `dist/public`
- esbuild bundles Express server to `dist/index.js`
- Static assets served by Express in production
- Environment variables for database and API keys

### Hosting Configuration
- **Platform**: Replit with Cloud Run deployment
- **Port**: 5000 (internal) mapped to 80 (external)
- **Database**: Neon PostgreSQL with connection pooling
- **Session Storage**: PostgreSQL-backed sessions
- **SSL**: Handled by deployment platform

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `COHERE_API_KEY`: Cohere AI API access key
- `VIRUSTOTAL_API_KEY`: VirusTotal API access key (optional)
- `DOJAH_API_KEY`: Dojah identity verification API key (for premium features)
- `NODE_ENV`: Environment indicator (production/development)

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
- June 23, 2025. Migrated from OpenAI to Cohere AI for improved performance
- June 23, 2025. Enhanced URL scanner with VirusTotal API integration
- June 23, 2025. Implemented dynamic security scoring system
- June 23, 2025. Updated UI with green title color and gold accents
- June 23, 2025. Fixed database schema issues and application startup
- June 23, 2025. Improved URL scanner error messages and AI response quality
- June 23, 2025. Fixed error handling for proper backend message display
- June 23, 2025. Completed URL scanner with accurate invalid format detection
- June 28, 2025. Changed welcome banner from gold to green background
- June 28, 2025. Added premium Identity Verification system with Dojah API integration
- June 28, 2025. Created Threat Intelligence monitoring dashboard
- June 28, 2025. Implemented Email Security analysis for phishing detection
- June 28, 2025. Enhanced homepage with new security features showcase
- June 28, 2025. Updated navigation with new premium and security tools
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
UI preferences: Green color scheme for banners and primary elements.
Future plans: Adding business and individual identity verification features by September 2025.
```