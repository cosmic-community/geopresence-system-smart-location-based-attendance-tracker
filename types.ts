// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// User roles
export type UserRole = 'student' | 'faculty' | 'admin';

// Attendance status
export type AttendanceStatus = 'present' | 'absent' | 'invalid-location';

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email?: string;
    password_hash?: string;
    role?: UserRole;
    full_name?: string;
    student_faculty_id?: string;
  };
}

// Attendance Record interface
export interface AttendanceRecord extends CosmicObject {
  type: 'attendance-records';
  metadata: {
    user?: User;
    timestamp?: string;
    latitude?: number;
    longitude?: number;
    status?: AttendanceStatus;
    location_name?: string;
  };
}

// Campus Location interface
export interface CampusLocation extends CosmicObject {
  type: 'campus-locations';
  metadata: {
    center_latitude?: number;
    center_longitude?: number;
    radius_meters?: number;
    active?: boolean;
  };
}

// Location coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Attendance marking response
export interface AttendanceResponse {
  success: boolean;
  message: string;
  coordinates?: Coordinates;
  locationName?: string;
}