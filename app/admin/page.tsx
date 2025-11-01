'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'

// Mock data for attendance logs
const mockAttendanceLogs = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: 'ST001',
    timestamp: '2024-01-15 09:15 AM',
    status: 'present',
    latitude: 40.7128,
    longitude: -74.0060,
    locationName: 'Main Campus'
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    studentId: 'ST002',
    timestamp: '2024-01-15 09:20 AM',
    status: 'present',
    latitude: 40.7130,
    longitude: -74.0062,
    locationName: 'Main Campus'
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    studentId: 'ST003',
    timestamp: '2024-01-15 09:25 AM',
    status: 'invalid-location',
    latitude: 40.7500,
    longitude: -73.9700,
    locationName: 'Outside Campus'
  },
  {
    id: '4',
    studentName: 'Sarah Williams',
    studentId: 'ST004',
    timestamp: '2024-01-15 09:30 AM',
    status: 'present',
    latitude: 40.7129,
    longitude: -74.0061,
    locationName: 'Main Campus'
  },
  {
    id: '5',
    studentName: 'David Brown',
    studentId: 'ST005',
    timestamp: '2024-01-15 09:35 AM',
    status: 'present',
    latitude: 40.7127,
    longitude: -74.0059,
    locationName: 'Main Campus'
  }
]

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    // In production, check if user has admin role
    setUser(parsedUser)
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="card mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  View and manage attendance records
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {mockAttendanceLogs.length}
                </div>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-success mb-2">
                {mockAttendanceLogs.filter(log => log.status === 'present').length}
              </div>
              <p className="text-gray-600">Present</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-error mb-2">
                {mockAttendanceLogs.filter(log => log.status === 'invalid-location').length}
              </div>
              <p className="text-gray-600">Invalid Location</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">40</div>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>

          {/* Attendance Logs Table */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Attendance Logs
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Student
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Timestamp
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Coordinates
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockAttendanceLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{log.studentName}</td>
                      <td className="py-4 px-4 text-gray-600">{log.studentId}</td>
                      <td className="py-4 px-4 text-gray-600">{log.timestamp}</td>
                      <td className="py-4 px-4 text-gray-600">{log.locationName}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {log.latitude.toFixed(4)}, {log.longitude.toFixed(4)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            log.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {log.status === 'present' ? '✅ Present' : '❌ Invalid'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}