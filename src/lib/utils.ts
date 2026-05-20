import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(isoDateString: string): string {
  return new Date(isoDateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(isoDateTimeString: string): string {
  return new Date(isoDateTimeString).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function formatRelativeTime(isoDateTimeString: string): string {
  const date = new Date(isoDateTimeString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.round(diff / 1000)
  const minutes = Math.round(seconds / 60)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)
  const weeks = Math.round(days / 7)
  const months = Math.round(days / 30)
  const years = Math.round(days / 365)

  if (seconds < 60) return `${seconds} seconds ago`
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24) return `${hours} hours ago`
  if (days < 7) return `${days} days ago`
  if (weeks < 4) return `${weeks} weeks ago`
  if (months < 12) return `${months} months ago`
  return `${years} years ago`
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.substring(0, len) + '...'
}

export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateId(): string {
  // Fallback for environments where crypto.randomUUID is not available (e.g., older Node.js versions in some build systems)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Basic UUID-like string generation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(value)
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = String(item[key])
    acc[group] = acc[group] || []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const valA = a[key]
    const valB = b[key]

    if (valA === null || valA === undefined) return direction === 'asc' ? 1 : -1
    if (valB === null || valB === undefined) return direction === 'asc' ? -1 : 1

    if (typeof valA === 'string' && typeof valB === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
    }
    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA
    }
    // Fallback for other comparable types
    if (valA < valB) return direction === 'asc' ? -1 : 1
    if (valA > valB) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Function to export table data to CSV
export function exportToCsv<T>(filename: string, data: T[], headers: string[] | null = null) {
  if (!data.length) return

  const headerRow = headers ? headers.join(',') : Object.keys(data[0]!).join(',')
  const rows = data.map((row) =>
    Object.values(row as Record<string, any>)
      .map((val) => (typeof val === 'string' && val.includes(',') ? `"${val}"` : val))
      .join(',')
  )

  const csvContent = [headerRow, ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}