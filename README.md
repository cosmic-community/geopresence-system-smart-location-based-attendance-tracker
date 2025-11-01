# GeoPresence System – Smart Location-Based Attendance Tracker

![App Preview](https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=300&fit=crop&auto=format)

A modern, GPS-based attendance tracking system for educational institutions. Built with Next.js 16 and powered by Cosmic CMS for content management.

## Features

- 🌍 **GPS Location Tracking** - Real-time geolocation capture using HTML5 API
- ✅ **Smart Validation** - Automatic verification of campus boundaries
- 👥 **Multi-Role Access** - Separate interfaces for students, faculty, and administrators
- 📊 **Admin Dashboard** - Comprehensive attendance logs and analytics
- 🔐 **Secure Authentication** - Login and signup for students and faculty
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🎨 **Modern UI/UX** - Clean design with soft blue theme and Poppins font
- ⚡ **Real-Time Feedback** - Instant success/error messages with visual confirmation

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69057087271316ad9f4cf50f&clone_repository=690571ce271316ad9f4cf51a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a responsive, minimal, and professional web app called "GeoPresence System – Smart Location-Based Attendance Tracker."
> 
> The app should include:
> 
> A login and signup page for students and faculty.
> 
> A dashboard after login with a button to "Mark Attendance."
> 
> When clicked, use the HTML5 Geolocation API to capture the user's latitude and longitude.
> 
> Display a message showing the captured coordinates and send them to the backend (use Flask or Node.js placeholder).
> 
> Include a location validation placeholder that checks if the user is within a defined range (e.g., college campus).
> 
> If valid → show "✅ Attendance marked successfully."
> 
> If invalid → show "❌ You are outside the allowed location."
> 
> A simple admin page to view attendance logs (mock data for now).
> 
> 
> Design requirements:
> 
> Clean UI (white background, soft blue theme, rounded buttons).
> 
> Use a modern font (e.g., Poppins or Inter).
> 
> Minimal navigation bar with "Home | Mark Attendance | Dashboard | Logout."
> 
> Responsive for mobile and desktop.
> 
> 
> Extra details:
> 
> Title header: "GeoPresence System"
> 
> Tagline: "Smart Location-Based Attendance Tracker"
> 
> Add placeholders for future modules like IP validation, analytics, and QR-based verification.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **HTML5 Geolocation API** - GPS location capture
- **Poppins Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd geopresence-system
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic CMS Integration

This application uses Cosmic CMS to manage:

- **Users** - Student and faculty profiles with authentication data
- **Attendance Records** - Complete logs with timestamps and location data
- **Campus Locations** - Geofence boundaries for validation
- **System Settings** - Configuration parameters

### Content Model Structure

**Users Object Type:**
- Email (text)
- Password Hash (text)
- Role (select-dropdown: student, faculty, admin)
- Full Name (text)
- Student/Faculty ID (text)

**Attendance Records Object Type:**
- User (object relationship)
- Timestamp (date)
- Latitude (number)
- Longitude (number)
- Status (select-dropdown: present, absent, invalid-location)
- Location Name (text)

**Campus Locations Object Type:**
- Name (text)
- Center Latitude (number)
- Center Longitude (number)
- Radius in Meters (number)
- Active (switch)

## Cosmic SDK Examples

### Fetching User Data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: users } = await cosmic.objects
  .find({ type: 'users' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Creating Attendance Record
```typescript
await cosmic.objects.insertOne({
  title: `Attendance - ${userName} - ${date}`,
  type: 'attendance-records',
  metadata: {
    user: userId,
    timestamp: new Date().toISOString(),
    latitude: lat,
    longitude: lng,
    status: 'present',
    location_name: 'Main Campus'
  }
})
```

### Validating Location
```typescript
const { objects: locations } = await cosmic.objects
  .find({ 
    type: 'campus-locations',
    'metadata.active': true 
  })
  .props(['metadata'])
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Environment Variables for Production

Make sure to set all required environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-production-bucket-slug
COSMIC_READ_KEY=your-production-read-key
COSMIC_WRITE_KEY=your-production-write-key
```

## Future Modules (Placeholders)

- **IP Validation** - Verify attendance using IP address filtering
- **Advanced Analytics** - Charts, reports, and attendance trends
- **QR Code Verification** - Scan QR codes for quick check-in
- **Biometric Integration** - Fingerprint or face recognition
- **SMS Notifications** - Automated attendance alerts
- **Export Reports** - Download attendance data as CSV/PDF

## License

MIT License - feel free to use this project for your institution.

<!-- README_END -->