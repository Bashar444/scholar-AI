'use client'

import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Brain } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <Brain className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Scholar AI
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Next-generation AI tool for analyzing research papers with intelligent 
            color-coded highlighting and interactive Q&A
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="AI-Powered Analysis"
              description="Automatic categorization of key research components"
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Literature Extraction"
              description="Identify citations and related studies instantly"
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Interactive Q&A"
              description="Chat with your papers like NotebookLM"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border max-w-xs">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
