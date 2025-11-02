'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-slate-800/30 border border-slate-700 rounded-xl p-6 shadow-soft ${className}`}
    >
      {children}
    </motion.div>
  )
}
