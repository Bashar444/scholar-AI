# Scholar AI - Frontend

Next.js 15 frontend for Scholar AI research paper analysis tool.

## Features

- 🎨 **Modern UI** with Framer Motion animations
- 🌙 **Dark/Light Mode** with next-themes
- 📤 **Drag & Drop Upload** for PDF and DOCX files
- 🎯 **Color-Coded Analysis** with shadcn/ui components
- 💬 **Real-time Chat** interface
- 📊 **Analysis Visualization** with highlights and tags
- 📥 **Export Options** (PDF, Markdown, Text)
- ⚡ **Optimized Performance** with Next.js 15

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Database**: Supabase
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Environment Setup

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── Providers.tsx        # Theme provider
│   │   └── [other components]
│   ├── utils/
│   │   └── cn.ts                # TailwindCSS utilities
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   └── stores/
│       └── paperStore.ts        # Zustand store
├── public/                      # Static files
├── tailwind.config.ts           # TailwindCSS config
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js config
└── package.json
```

## Key Components

### Upload Component
Handles drag-and-drop and file selection for PDF/DOCX files.

### Analysis Viewer
Displays color-coded segments with toggles between raw and annotated views.

### Chat Interface
Allows users to ask questions about their papers with conversation history.

### Export Panel
Options to download analysis as PDF, Markdown, or plain text.

## Color Coding System

The frontend uses these colors for academic components:

| Component | Color | Hex |
|-----------|-------|-----|
| Importance | Yellow | #FCD34D |
| Research Gap | Pink | #EC4899 |
| Objective | Green | #10B981 |
| Method | Blue | #3B82F6 |
| Key Findings | Purple | #A855F7 |
| Implications | Orange | #F97316 |

## Styling

### TailwindCSS
All components use TailwindCSS for responsive, utility-first styling.

### shadcn/ui
Pre-built, accessible components like buttons, cards, dialogs, etc.

### Dark Mode
Automatic dark/light mode detection with manual toggle support.

## API Integration

The frontend communicates with the backend via:

```typescript
// Example: Upload a paper
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
)

// Example: Analyze paper
const analysis = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/analyze`,
  { paper_id, text }
)

// Example: Chat with paper
const chat = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
  { paper_id, message }
)
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Environment Variables

Create `.env.example` with all required variables:

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ CSS extraction and minification
- ✅ Font optimization with next/font
- ✅ Static generation where possible

## Development Guidelines

### Component Structure

```tsx
'use client'

import { motion } from 'framer-motion'

export default function Component() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  )
}
```

### Type Safety

Always define TypeScript types:

```tsx
interface Props {
  paperId: string
  onAnalyze: (data: Analysis) => void
}

export function AnalyzeButton({ paperId, onAnalyze }: Props) {
  // Implementation
}
```

### State Management

Use Zustand for global state:

```typescript
const store = usePaperStore()
store.setCurrentPaper(paper)
```

## License

MIT

## Support

For issues and questions, please open an issue in the GitHub repository.
