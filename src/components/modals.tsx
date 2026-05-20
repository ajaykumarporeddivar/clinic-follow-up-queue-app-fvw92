'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Modal, Button, Badge, Avatar, Input, Label,
  Search, X, AlertTriangle, CheckCircle, Info, Loader2,
  ChevronUp, ChevronDown, List, PlusCircle
} from '@/components/ui'
import { Client, FollowUpTask, ClientReport } from '@/lib/types'
import { cn } from '@/lib/utils' // Assuming cn is in lib/utils or redefine it if it's only in ui.tsx for this project

// Helper for formatting date strings
const formatDate = (isoDateString: string | null | undefined): string => {
  if (!isoDateString) return 'N/A'
  try {
    const date = new Date(isoDateString)
    // Check if the date is valid. Date.parse returns NaN for invalid dates.
    if (isNaN(date.getTime())) {
      return isoDateString; // Return original if it's not a parseable date but maybe a custom string
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)
  } catch (error) {
    console.error('Error formatting date:', error)
    return isoDateString // Fallback to original string if error
  }
}

// Re-using cn from ui.tsx (or if moved to lib/utils, it would be import { cn } from '@/lib/utils')
// For this project, it's defined in ui.tsx
// type ClassValue = string | number | boolean | null | undefined | ClassValue[] | { [key: string]: boolean };
// function cn(...inputs: ClassValue[]): string { /* ... */ }

interface EntityDetailModalProps {
  item: Record<string, unknown> | null
  open: boolean
  onClose: () => void
  title: string
  entityType?: 'FollowUpTask' | 'Client' | 'ClientReport'
}

export function EntityDetailModal({ item, open, onClose, title, entityType }: EntityDetailModalProps) {
  if (!item) return null

  const getStatusVariant = (status: string | unknown): 'default' | 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'generated' | 'sent' | 'archived' => {
    if (typeof status !== 'string') return 'default';
    switch (status.toLowerCase()) {
      case 'pending': return 'pending';
      case 'in_progress': return 'in_progress';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      case 'generated': return 'generated';
      case 'sent': return 'sent';
      case 'archived': return 'archived';
      case 'active': return 'completed'; // Map client status to a relevant badge color
      case 'inactive': return 'cancelled';
      default: return 'default';
    }
  }

  const getPriorityVariant = (priority: string | unknown): 'low' | 'medium' | 'high' => {
    if (typeof priority !== 'string') return 'medium';
    switch (priority.toLowerCase()) {
      case 'low': return 'low';
      case 'medium': return 'medium';
      case 'high': return 'high';
      default: return 'medium';
    }
  }

  const handleAction = (action: string) => {
    console.log(`Action "${action}" triggered for item ID: ${(item as any).id}`)
    onClose()
  }

  const displayFields = Object.entries(item)
    .filter(([key]) => key !== 'id' && key !== 'clientId' && key !== '__typename')
    .map(([key, value]) => {
      let displayValue: React.ReactNode = String(value)
      let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

      // Specific formatting
      if (key.toLowerCase().includes('date') || key.toLowerCase().includes('at')) {
        displayValue = formatDate(value as string)
      } else if (key === 'status') {
        displayValue = <Badge variant={getStatusVariant(value)}>{String(value)}</Badge>
      } else if (key === 'priority') {
        displayValue = <Badge variant={getPriorityVariant(value)}>{String(value)}</Badge>
      } else if (key === 'description' || key === 'contentSummary') {
        displayValue = (
          <p className="text-zinc-600 col-span-2 text-sm max-h-40 overflow-y-auto pr-2">
            {String(value)}
          </p>
        )
      } else if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No'
      }

      return (
        <React.Fragment key={key}>
          <p className="text-sm font-medium text-zinc-900">{label}:</p>
          <div className="text-sm text-zinc-600">{displayValue}</div>
        </React.Fragment>
      )
    })

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        {item.status && (
          <div className="flex justify-end -mt-2 -mr-2">
            <Badge variant={getStatusVariant(item.status)}>{String(item.status)}</Badge>
          </div>
        )}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          {displayFields}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200">
          {entityType === 'FollowUpTask' && (
            <>
              <Button variant="success" onClick={() => handleAction('Approve')}>Approve</Button>
              <Button variant="secondary" onClick={() => handleAction('Archive')}>Archive</Button>
            </>
          )}
          <Button variant="danger" onClick={() => handleAction('Delete')}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  onConfirm: () => void
  confirmLabel?: string
  variant?: 'danger' | 'info'
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps) {
  const confirmButtonVariant = variant === 'danger' ? 'danger' : 'primary'

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-zinc-600 text-sm mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={confirmButtonVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}

interface CommandPaletteItem {
  label: string
  href: string
  icon?: React.ReactNode
  description?: string
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  items: CommandPaletteItem[]
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (open) {
      setSearch('')
      setActiveIndex(0)
      // Focus input after the modal has had time to render and transition
      const timeoutId = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeoutId);
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(prev => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[activeIndex]) {
          router.push(filteredItems[activeIndex].href)
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, filteredItems, activeIndex, onClose, router])

  const handleItemClick = useCallback((item: CommandPaletteItem) => {
    router.push(item.href)
    onClose()
  }, [router, onClose])

  if (!open) return null

  return (
    <Modal open={open} onClose={onClose} title="Quick Search" size="sm" hideCloseButton>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <Input
          ref={inputRef}
          placeholder="Search commands or navigate..."
          className="pl-10 pr-4 py-2 text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2">
          <X size={18} />
        </Button>
      </div>

      <div className="mt-4 max-h-60 overflow-y-auto custom-scrollbar">
        {filteredItems.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-4">No results found.</p>
        ) : (
          <ul className="space-y-1">
            {filteredItems.map((item, index) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'flex items-center w-full px-3 py-2 rounded-md text-left transition-colors',
                    'text-zinc-700 hover:bg-zinc-100',
                    activeIndex === index && 'bg-zinc-100'
                  )}
                >
                  {item.icon && <span className="mr-3 text-zinc-500">{item.icon}</span>}
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    {item.description && (
                      <p className="text-sm text-zinc-500">{item.description}</p>
                    )}
                  </div>
                  <span className="text-zinc-400 text-xs ml-2 hidden sm:block">↵ Enter</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}