'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevents hydration mismatch

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        <div>
          <a href="/" className="text-lg font-semibold hover:text-blue-600 transition">
            Home
          </a>
        </div>
        
        <div>
          <img
            src="/logo.svg"
            alt="Logo"
            onClick={toggleTheme}
            className="h-8 w-auto cursor-pointer"
          />
        </div>
      </nav>

      <div>
        {/* Your main content here */}
      </div>
    </>
  )
}
