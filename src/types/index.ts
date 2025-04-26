
export interface Guard {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on-break';
  currentLocation?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  radius: number; // For geofencing in meters
}

export interface CheckPoint {
  id: string;
  name: string;
  locationId: string;
  type: 'qr' | 'nfc' | 'gps';
  code?: string; // For QR/NFC codes
  lat?: number;
  lng?: number;
  status: 'pending' | 'completed';
  completedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  locationId: string;
  guardId?: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'canceled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completedAt?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  locationId: string;
  guardId: string;
  type: 'suspicious-activity' | 'trespassing' | 'damage' | 'emergency' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'in-progress' | 'resolved';
  reportedAt: string;
  resolvedAt?: string;
  images?: string[];
}

export interface CheckIn {
  id: string;
  guardId: string;
  locationId: string;
  checkpointId?: string;
  type: 'start-shift' | 'end-shift' | 'checkpoint' | 'break-start' | 'break-end';
  timestamp: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

export interface Alert {
  id: string;
  guardId: string;
  locationId?: string;
  type: 'sos' | 'geofence' | 'missed-checkpoint' | 'system';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}
