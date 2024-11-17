'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'

const navLinks = [
  { id: 1, url: '/', name: 'About' },
  { id: 2, url: '/', name: 'Features' },
  { id: 3, url: '/', name: 'Updates' },
  { id: 4, url: '/blogs', name: 'Blogs' },
  { id: 5, url: '/contact', name: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex-shrink-0">
            <div className="rounded-lg bg-indigo-950 p-1 shadow-sm">
              <Image
                priority
                quality={95}
                src="/assets/images/logo-kar.png"
                height={30}
                width={30}
                alt="logo"
                className="h-[30px] w-[30px]"
              />
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-white/30 p-2 transition-colors hover:bg-white/10 sm:hidden"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>

          <nav className="hidden items-center gap-x-6 sm:flex">
            {navLinks.map(item => (
              <Link
                href={item.url}
                key={item.id}
                className="text-sm text-white/60 transition-all hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="h-10 bg-white text-black hover:bg-gray-200">
              <Link href="/login">Get Demo</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`sm:hidden ${
            isOpen ? 'max-h-64' : 'max-h-0'
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col gap-4 pb-4">
            {navLinks.map(item => (
              <Link
                href={item.url}
                key={item.id}
                className="text-sm text-white/60 transition-all hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="h-10 bg-white text-black hover:bg-gray-200">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Get Demo
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}
