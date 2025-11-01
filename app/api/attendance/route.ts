import { NextResponse } from 'next/server'
import { cosmic, hasStatus } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { latitude, longitude, timestamp } = body

    // Validate required fields
    if (!latitude || !longitude || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Get user from session/token
    // 2. Validate location against campus boundaries from Cosmic
    // 3. Create attendance record in Cosmic

    // Placeholder response
    const mockRecord = {
      id: 'mock-id-' + Date.now(),
      latitude,
      longitude,
      timestamp,
      status: 'present',
      message: 'Attendance marked successfully'
    }

    // Example of creating record in Cosmic (commented out - requires proper user session)
    /*
    await cosmic.objects.insertOne({
      title: `Attendance - ${timestamp}`,
      type: 'attendance-records',
      metadata: {
        user: userId,
        timestamp,
        latitude,
        longitude,
        status: 'present',
        location_name: 'Main Campus'
      }
    })
    */

    return NextResponse.json(mockRecord)
  } catch (error) {
    console.error('Error marking attendance:', error)
    return NextResponse.json(
      { error: 'Failed to mark attendance' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // In production, fetch actual attendance records from Cosmic
    // const { objects: records } = await cosmic.objects
    //   .find({ type: 'attendance-records' })
    //   .props(['id', 'title', 'metadata'])
    //   .depth(1)

    // Return mock data for now
    const mockRecords = [
      {
        id: '1',
        studentName: 'John Doe',
        timestamp: new Date().toISOString(),
        latitude: 40.7128,
        longitude: -74.0060,
        status: 'present'
      }
    ]

    return NextResponse.json({ records: mockRecords })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return NextResponse.json({ records: [] })
    }
    console.error('Error fetching attendance records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch records' },
      { status: 500 }
    )
  }
}