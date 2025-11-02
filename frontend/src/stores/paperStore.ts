import { create } from 'zustand'
import { Paper } from '@/types'

interface PaperStore {
  papers: Paper[]
  currentPaper: Paper | null
  setCurrentPaper: (paper: Paper | null) => void
  addPaper: (paper: Paper) => void
  removePaper: (paperId: string) => void
}

export const usePaperStore = create<PaperStore>((set) => ({
  papers: [],
  currentPaper: null,
  setCurrentPaper: (paper) => set({ currentPaper: paper }),
  addPaper: (paper) => set((state) => ({ papers: [...state.papers, paper] })),
  removePaper: (paperId) =>
    set((state) => ({
      papers: state.papers.filter((p) => p.id !== paperId),
    })),
}))
