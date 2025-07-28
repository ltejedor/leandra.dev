'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui'

interface DevelopmentOnlyProps {
  children: React.ReactNode
}

export default function DevelopmentOnly({ children }: DevelopmentOnlyProps) {
  const [isDevelopment, setIsDevelopment] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we're in development
    setIsDevelopment(process.env.NODE_ENV === 'development')
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isDevelopment) {
    return (
      <div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-4">Admin panel is only available in development mode</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 