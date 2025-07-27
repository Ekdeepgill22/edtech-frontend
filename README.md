# ScribbleSense - AI-Powered Learning Platform

ScribbleSense is an EdTech web application that transforms handwriting and speech into powerful learning experiences with AI-driven grammar correction, OCR, and educational resources.

## Features

- **Handwriting Recognition**: Upload handwritten notes and convert them to digital text
- **Speech-to-Text**: Record voice and convert to text with AI processing
- **Grammar Correction**: AI-powered grammar checking and writing improvement
- **Educational Resources**: Get relevant YouTube links based on your content
- **Analytics Dashboard**: Track your learning progress and improvements
- **DOCX Export**: Convert processed content to Word documents

## Tech Stack

- **Frontend**: Next.js 13+ (App Router), TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **AI/ML**: Google Gemini API for grammar checking
- **OCR**: OCR.space API or similar
- **Charts**: Recharts for analytics visualization

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run the development server: `npm run dev`

## Project Structure

```
scribblesense-frontend/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── lib/                    # Utility functions and API clients
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Environment Variables

Copy `.env.local` and fill in your API keys:
- Clerk authentication keys
- Gemini API key for grammar checking
- OCR service API key
- YouTube API key for educational resources

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking