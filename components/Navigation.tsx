'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const navLinks = [
    { href: '/dashboard', label: 'Home' },
    { href: '/dashboard', label: 'Mark Attendance' },
    { href: '/admin', label: 'Dashboard' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold text-primary">GeoPresence</h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-primary font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}