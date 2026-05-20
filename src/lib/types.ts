export type ApiResponse<T> = { ok: boolean; data?: T; error?: string }
export type SortDir = 'asc' | 'desc'

export interface DemoUser {
  id: string
  name: string
  email: string
  role: string
  plan: string
  avatar: string
  joinedAt: string
}

export interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface FollowUpTask {
  id: string
  clientId: string
  taskType: 'Reminder' | 'Booking' | 'Check-in' | 'Info Request' | 'Wellness Plan'
  description: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string | null // ISO date string (YYYY-MM-DD)
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  completedAt: string | null // ISO datetime string
  createdAt: string // ISO datetime string
  updatedAt: string // ISO datetime string
}

export interface ClientReport {
  id: string
  clientId: string
  title: string
  reportPeriod: string // e.g., "Monthly", "Q1 2024"
  generatedDate: string // ISO datetime string
  summary: string
  metrics: {
    totalFollowUps: number
    completedFollowUps: number
    pendingFollowUps: number
    conversionRate: number // e.g., percentage of bookings
  }
  downloadUrl: string // Placeholder for a download link
  createdAt: string
  updatedAt: string
}

export interface RecentActivity {
  id: string
  userId: string
  activityType: 'task_created' | 'task_updated' | 'client_added' | 'report_generated'
  description: string
  timestamp: string // ISO datetime string
  targetId?: string // ID of the task/client/report affected
}

export interface Statistic {
  id: string
  label: string
  value: string
  change: string // e.g., "+5%" or "-2%"
  changeType: 'positive' | 'negative' | 'neutral'
}

export interface ChartDataPoint {
  name: string // e.g., month, category
  value: number
}

export interface SparklineDataPoint {
  x: number // timestamp or index
  y: number // value
}