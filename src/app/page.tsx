'use client'

import { useTheme } from 'next-themes'
import Hero from './components/Hero'
import { useEffect, useState } from 'react'
import Link from 'next/link' // ✅ Import Link

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
    <div className='h-screen w-screen'>
      <nav
        className={`h-[7%] ${
          theme === 'dark' ? 'bg-[#16142c]' : 'bg-white'
        } w-full px-6 py-4 flex justify-between items-center`}
      >
        <div>
          {/* ✅ Use Link instead of <a> */}
          <Link
            href="/"
            className="text-lg font-semibold hover:text-blue-600 transition"
          >
            DocuLink
          </Link>
        </div>

        <div>
          <img
            src={theme === 'light' ? './moon.svg' : './sun.svg'}
            alt="Logo"
            onClick={toggleTheme}
            className={`h-10 w-10 flex items-center justify-center cursor-pointer p-2 rounded-full ${
              theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-600'
            } 
             bg-transparent transition-colors duration-200`}
          />
        </div>
      </nav>

      <div className='h-[93%] bg-amber-500'>
        <Hero />
      </div>
    </div>
  )
}
