---
description: React/Vite frontend specific development guidance
applyTo: "app/**"
---

# Frontend Guidelines

Purpose: Development guidance for the React + Vite frontend application.

## Technology Stack

**Framework:** React with TypeScript
**Build Tool:** Vite
**Styling:** Tailwind CSS
**Package Manager:** npm

## Current Status

⚠️ **Important**: The frontend is currently **standalone** and **not connected** to the Python backend.

### What Works
- Independent React application
- Modern development experience with Vite
- Tailwind CSS for styling
- TypeScript for type safety

### What's Missing
- Backend API integration
- Real-time data from Python pipeline
- Image upload/analysis workflow
- Hardware status monitoring

## Development Commands

### Setup
```bash
cd app/
npm install
```

### Development Server
```bash
npm run dev
```
- Hot module replacement enabled
- Typically serves on `http://localhost:5173`
- Auto-reloads on file changes

### Production Build
```bash
npm run build
```
- Creates optimized bundle in `dist/`
- Ready for static hosting

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Useful for testing build output

## Project Structure

```
app/
├── index.html                 # Entry HTML file
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.mjs        # PostCSS configuration
├── styles.css                # Global styles
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component
│   └── components/           # React components
└── guidelines/
    └── Guidelines.md         # Component development guidelines
```

## Development Guidelines

### Component Architecture
- Follow functional component patterns
- Use TypeScript for all components
- Implement proper prop types and interfaces
- Keep components focused and reusable

### Styling Approach
- Use Tailwind CSS utility classes
- Avoid custom CSS when Tailwind classes suffice
- Follow responsive design principles
- Maintain consistent spacing and typography

### File Organization
- Group related components in subdirectories
- Use descriptive component and file names
- Export components from index files for clean imports
- Keep component files focused and manageable

## Future Integration Plans

### Backend Connection
When ready to connect to Python backend:

1. **API Endpoints**: Define REST API for Python services
2. **Real-time Updates**: Consider WebSocket for live analysis results
3. **File Upload**: Implement image upload for analysis
4. **Status Monitoring**: Show hardware and analysis status

### Recommended Architecture
```
Frontend (React) ←→ API Server ←→ Python Pipeline
                               ↓
                         Hardware (Pi + Camera)
```

## Development Best Practices

### Code Quality
- Use TypeScript strict mode
- Implement proper error boundaries
- Handle loading and error states
- Write unit tests for complex components

### Performance
- Implement code splitting for larger applications
- Optimize images and assets
- Use React.memo for expensive components
- Minimize bundle size

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

## Deployment Options

### Static Hosting
Since the app is currently standalone:
- Netlify, Vercel, GitHub Pages
- AWS S3 + CloudFront
- Any static file server

### Future Full-Stack Deployment
When backend is integrated:
- Docker containers for Python + React
- Raspberry Pi with nginx reverse proxy
- Cloud hosting with API gateway

## Configuration

### Vite Configuration (`vite.config.ts`)
- TypeScript support configured
- Development server settings
- Build optimization options

### Tailwind Configuration (`tailwind.config.js`)
- Custom theme extensions
- Purge settings for production
- Plugin configurations

### Environment Variables
For future backend integration:
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```
