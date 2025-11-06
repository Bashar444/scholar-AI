import { create } from 'zustand'
import { Paper } from '@/types'

interface PaperStore {
  papers: Paper[]
  currentPaper: Paper | null
  setCurrentPaper: (paper: Paper | null) => void
  addPaper: (paper: Paper) => void
  removePaper: (paperId: string) => void
}

export const usePaperStore = create<PaperStore>((set: any) => ({
  papers: [],
  currentPaper: null,
  setCurrentPaper: (paper: Paper | null) => set({ currentPaper: paper }),
  addPaper: (paper: Paper) => set((state: PaperStore) => ({ papers: [...state.papers, paper] })),
  removePaper: (paperId: string) =>
    set((state: PaperStore) => ({
      papers: state.papers.filter((p: Paper) => p.id !== paperId),
    })),
}))
