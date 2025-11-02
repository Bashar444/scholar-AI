'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
  })

  const handleUpload = async () => {
    if (!file) return
    
    setIsUploading(true)
    // TODO: Implement upload to backend
    console.log('Uploading:', file.name)
    
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
  }

  return (
    <section className="container mx-auto max-w-4xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-3xl p-12 
            transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-border bg-card hover:border-primary/50 hover:bg-accent/30'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 p-4 rounded-full bg-primary/10">
              {file ? (
                <FileText className="w-12 h-12 text-primary" />
              ) : (
                <Upload className="w-12 h-12 text-primary" />
              )}
            </div>
            
            {file ? (
              <>
                <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUpload()
                    }}
                    disabled={isUploading}
                    className="rounded-full"
                  >
                    {isUploading ? 'Analyzing...' : 'Analyze Paper'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                    }}
                    className="rounded-full"
                  >
                    Remove
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-2">
                  {isDragActive ? 'Drop your paper here' : 'Upload Research Paper'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag & drop or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF and DOCX files
                </p>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
          <h4 className="font-semibold mb-4">Analysis Categories:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <LegendItem color="bg-yellow-500" label="Importance" />
            <LegendItem color="bg-pink-500" label="Research Gap" />
            <LegendItem color="bg-green-500" label="Objective" />
            <LegendItem color="bg-blue-500" label="Method" />
            <LegendItem color="bg-purple-500" label="Key Findings" />
            <LegendItem color="bg-orange-500" label="Implications" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded ${color}`} />
      <span className="text-sm">{label}</span>
    </div>
  )
}
