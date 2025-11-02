'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileUp, X, Upload, Loader2 } from 'lucide-react'
import axios from 'axios'

interface UploadZoneProps {
  onUploadComplete?: (paperId: string, filename: string) => void
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; paperId: string } | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const uploadFile = async (file: File) => {
    setError(null)
    setIsLoading(true)

    try {
      // Validate file
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!validTypes.includes(file.type)) {
        throw new Error('Only PDF and DOCX files are allowed')
      }

      if (file.size > 50 * 1024 * 1024) {
        throw new Error('File size must be less than 50MB')
      }

      // Upload to backend
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      setUploadedFile({
        name: response.data.filename,
        paperId: response.data.paper_id,
      })

      onUploadComplete?.(response.data.paper_id, response.data.filename)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      uploadFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      uploadFile(files[0])
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {uploadedFile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-900/20 to-green-900/10 border-2 border-green-500/50 rounded-2xl p-8 text-center"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Upload Successful! ✓</h3>
              <p className="text-slate-300 text-sm">{uploadedFile.name}</p>
              <p className="text-slate-400 text-xs mt-2">Paper ID: {uploadedFile.paperId.slice(0, 8)}...</p>
            </div>
            <button
              onClick={() => setUploadedFile(null)}
              className="text-slate-400 hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setUploadedFile(null)
              setError(null)
            }}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2 mx-auto"
          >
            <Upload className="w-4 h-4" />
            Upload Another
          </button>
        </motion.div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: isDragging ? 1.02 : 1 }}
          className={`border-2 border-dashed rounded-2xl p-12 cursor-pointer transition ${
            isDragging
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-slate-600 bg-slate-800/30 hover:border-blue-400/50'
          }`}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            disabled={isLoading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
            {isLoading ? (
              <>
                <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
                <p className="text-lg font-semibold">Uploading...</p>
              </>
            ) : (
              <>
                <FileUp className="w-16 h-16 text-blue-400" />
                <div>
                  <p className="text-lg font-semibold text-white">Drop your paper here</p>
                  <p className="text-slate-400">or click to browse (PDF or DOCX)</p>
                  <p className="text-xs text-slate-500 mt-2">Max size: 50MB</p>
                </div>
              </>
            )}
          </label>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}
