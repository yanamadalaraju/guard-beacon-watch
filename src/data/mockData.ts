
import { Alert, CheckIn, CheckPoint, Guard, Incident, Location, Task } from '@/types';

// Mock Guards
export const guards: Guard[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    status: 'active',
    currentLocation: {
      lat: 34.0522,
      lng: -118.2437,
      lastUpdated: new Date().toISOString(),
    },
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria.r@example.com',
    phone: '555-987-6543',
    status: 'active',
    currentLocation: {
      lat: 34.0580,
      lng: -118.2500,
      lastUpdated: new Date().toISOString(),
    },
  },
  {
    id: '3',
    name: 'David Johnson',
    email: 'david.j@example.com',
    phone: '555-456-7890',
    status: 'on-break',
    currentLocation: {
      lat: 34.0500,
      lng: -118.2600,
      lastUpdated: new Date(Date.now() - 15 * 60000).toISOString(),
    },
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '555-321-6547',
    status: 'inactive',
  },
];

// Mock Locations
export const locations: Location[] = [
  {
    id: '1',
    name: 'Main Office Building',
    address: '123 Main St, Los Angeles, CA 90012',
    lat: 34.0522,
    lng: -118.2437,
    radius: 100,
  },
  {
    id: '2',
    name: 'Warehouse Complex',
    address: '456 Industrial Blvd, Los Angeles, CA 90023',
    lat: 34.0224,
    lng: -118.2173,
    radius: 200,
  },
  {
    id: '3',
    name: 'Corporate Campus',
    address: '789 Business Ave, Pasadena, CA 91101',
    lat: 34.1478,
    lng: -118.1445,
    radius: 300,
  },
];

// Mock Checkpoints
export const checkpoints: CheckPoint[] = [
  {
    id: '1',
    name: 'Front Entrance',
    locationId: '1',
    type: 'qr',
    code: 'QR-FRONT-001',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Back Entrance',
    locationId: '1',
    type: 'nfc',
    code: 'NFC-BACK-002',
    status: 'completed',
    completedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: '3',
    name: 'East Wing',
    locationId: '1',
    type: 'gps',
    lat: 34.0528,
    lng: -118.2430,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Loading Dock',
    locationId: '2',
    type: 'qr',
    code: 'QR-DOCK-001',
    status: 'pending',
  },
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Perimeter Check',
    description: 'Walk the entire perimeter and check for security issues',
    locationId: '1',
    guardId: '1',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 2 * 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'Access Control Verification',
    description: 'Verify all security badges and access permissions',
    locationId: '1',
    guardId: '2',
    status: 'assigned',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Alarm System Check',
    description: 'Verify the alarm system is functioning properly',
    locationId: '2',
    status: 'completed',
    priority: 'urgent',
    dueDate: new Date(Date.now() - 1 * 3600000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
];

// Mock Incidents
export const incidents: Incident[] = [
  {
    id: '1',
    title: 'Unauthorized Access Attempt',
    description: 'Individual attempted to enter through side door without proper credentials',
    locationId: '1',
    guardId: '1',
    type: 'trespassing',
    severity: 'medium',
    status: 'resolved',
    reportedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    resolvedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'Suspicious Package',
    description: 'Unattended package found near main entrance',
    locationId: '1',
    guardId: '2',
    type: 'suspicious-activity',
    severity: 'high',
    status: 'in-progress',
    reportedAt: new Date(Date.now() - 1 * 3600000).toISOString(),
  },
];

// Mock Check-ins
export const checkIns: CheckIn[] = [
  {
    id: '1',
    guardId: '1',
    locationId: '1',
    type: 'start-shift',
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    id: '2',
    guardId: '1',
    locationId: '1',
    checkpointId: '1',
    type: 'checkpoint',
    timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    id: '3',
    guardId: '2',
    locationId: '1',
    type: 'start-shift',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
];

// Mock Alerts
export const alerts: Alert[] = [
  {
    id: '1',
    guardId: '3',
    locationId: '2',
    type: 'sos',
    status: 'active',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    coordinates: {
      lat: 34.0224,
      lng: -118.2173,
    },
    notes: 'Emergency assistance required',
  },
  {
    id: '2',
    guardId: '2',
    locationId: '1',
    type: 'geofence',
    status: 'acknowledged',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
    coordinates: {
      lat: 34.0622,
      lng: -118.2537,
    },
    notes: 'Guard left assigned area',
  },
];
