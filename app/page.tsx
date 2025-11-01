import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">GeoPresence System</h1>
              <p className="text-sm text-gray-600">Smart Location-Based Attendance Tracker</p>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Modern Attendance Tracking
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            GPS-based verification ensures students and faculty are physically present on campus. 
            Mark attendance with precision and eliminate proxy attendance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Get Started
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4">
              Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">GPS Verification</h3>
            <p className="text-gray-600">
              Real-time location tracking ensures accurate attendance marking
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Smart Validation</h3>
            <p className="text-gray-600">
              Automatic verification of campus boundaries and geofencing
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">
              Comprehensive logs and analytics for attendance management
            </p>
          </div>
        </div>

        {/* Future Modules */}
        <div className="mt-20 card max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Coming Soon</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🌐</span>
              <div>
                <h4 className="font-semibold">IP Validation</h4>
                <p className="text-sm text-gray-600">Network-based verification</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📈</span>
              <div>
                <h4 className="font-semibold">Advanced Analytics</h4>
                <p className="text-sm text-gray-600">Charts and trend reports</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-semibold">QR Code Verification</h4>
                <p className="text-sm text-gray-600">Quick scan check-in</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">🔐</span>
              <div>
                <h4 className="font-semibold">Biometric Integration</h4>
                <p className="text-sm text-gray-600">Fingerprint/face recognition</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}