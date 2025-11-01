'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import AttendanceMarker from '@/components/AttendanceMarker'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Header */}
          <div className="card mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.email}!
            </h1>
            <p className="text-gray-600">
              Role: <span className="font-medium capitalize">{user.role}</span>
            </p>
          </div>

          {/* Attendance Marker Component */}
          <AttendanceMarker />

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-gray-600">Attendance Rate</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">34</div>
              <p className="text-gray-600">Days Present</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <p className="text-gray-600">Days Absent</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}