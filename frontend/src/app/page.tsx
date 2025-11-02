'use client'

import { motion } from 'framer-motion'
import { FileUp, MessageSquare, BookOpen, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Scholar AI
          </h1>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm hover:text-blue-400 transition">
              Analyze
            </a>
            <a href="#" className="text-sm hover:text-blue-400 transition">
              Features
            </a>
            <a href="#" className="text-sm hover:text-blue-400 transition">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-poppins mb-6 leading-tight">
            AI-Powered Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Paper Analysis</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Upload any research paper and instantly get AI-driven analysis with color-coded components,
            Q&A chat, and literature review extraction.
          </p>

          {/* Upload Box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-2xl p-12 mb-12 cursor-pointer hover:border-blue-400 transition"
          >
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
              <FileUp className="w-16 h-16 text-blue-400" />
              <div>
                <p className="text-lg font-semibold">Drop your paper here</p>
                <p className="text-slate-400">or click to browse (PDF or DOCX)</p>
              </div>
            </label>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-left"
            >
              <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold mb-2">Ask Questions</h3>
              <p className="text-sm text-slate-400">
                Chat with your paper using AI to get instant answers about methodology, findings, and more.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-left"
            >
              <BookOpen className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="font-semibold mb-2">Color-Coded Analysis</h3>
              <p className="text-sm text-slate-400">
                Importance, research gaps, objectives, methods, findings, and implications automatically highlighted.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 text-left"
            >
              <Download className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="font-semibold mb-2">Export & Share</h3>
              <p className="text-sm text-slate-400">
                Download your analysis as PDF, Markdown, or text for easy sharing and archival.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 text-center text-slate-400">
        <p>Scholar AI © 2025 | AI-Powered Research Paper Analysis</p>
      </footer>
    </div>
  )
}
