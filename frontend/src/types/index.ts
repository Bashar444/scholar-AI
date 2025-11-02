export interface Paper {
  id: string
  filename: string
  content: string
  uploadedAt: Date
  analysis?: PaperAnalysis
}

export interface HighlightedSegment {
  type: 'importance' | 'gap' | 'objective' | 'method' | 'findings' | 'implications'
  text: string
  color: string
  startIndex: number
  endIndex: number
}

export interface PaperAnalysis {
  paperId: string
  segments: HighlightedSegment[]
  summary: string
  literatureReview: string[]
  analyzedAt: Date
}

export interface ChatMessage {
  id: string
  paperId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
