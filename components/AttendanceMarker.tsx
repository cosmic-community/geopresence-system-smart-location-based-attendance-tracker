'use client'

import { useState } from 'react'
import { getCurrentLocation, isWithinRange } from '@/lib/geolocation'
import { Coordinates } from '@/types'

export default function AttendanceMarker() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

  // Mock campus location (replace with actual data from Cosmic CMS)
  const campusLocation: Coordinates = {
    latitude: 40.7128,
    longitude: -74.0060
  }
  const campusRadius = 500 // meters

  const handleMarkAttendance = async () => {
    setLoading(true)
    setMessage('')
    setMessageType('')
    setCoordinates(null)

    try {
      // Get current location
      const userLocation = await getCurrentLocation()
      setCoordinates(userLocation)

      // Display captured coordinates
      console.log('Captured coordinates:', userLocation)

      // Validate location
      const isValid = isWithinRange(userLocation, campusLocation, campusRadius)

      if (isValid) {
        // Send to backend (placeholder)
        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            timestamp: new Date().toISOString(),
          }),
        })

        if (response.ok) {
          setMessage('✅ Attendance marked successfully!')
          setMessageType('success')
        } else {
          throw new Error('Failed to save attendance')
        }
      } else {
        setMessage('❌ You are outside the allowed location.')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Error marking attendance:', error)
      setMessage(
        error instanceof Error && error.message.includes('Location error')
          ? '❌ ' + error.message
          : '❌ Failed to mark attendance. Please enable location access.'
      )
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Mark Your Attendance
        </h2>
        <p className="text-gray-600">
          Click the button below to capture your location and mark attendance
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleMarkAttendance}
          disabled={loading}
          className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Capturing Location...
            </span>
          ) : (
            '📍 Mark Attendance'
          )}
        </button>
      </div>

      {coordinates && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Captured Coordinates:</h3>
          <p className="text-gray-700">
            <span className="font-medium">Latitude:</span> {coordinates.latitude.toFixed(6)}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Longitude:</span> {coordinates.longitude.toFixed(6)}
          </p>
        </div>
      )}

      {message && (
        <div
          className={`rounded-lg p-4 text-center font-medium ${
            messageType === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">How it works:</h3>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="font-medium text-primary">1.</span>
            <span>Click "Mark Attendance" button</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-primary">2.</span>
            <span>Allow location access when prompted</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-primary">3.</span>
            <span>System captures your GPS coordinates</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-primary">4.</span>
            <span>Location is validated against campus boundaries</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-primary">5.</span>
            <span>Attendance is recorded if you're on campus</span>
          </li>
        </ol>
      </div>
    </div>
  )
}