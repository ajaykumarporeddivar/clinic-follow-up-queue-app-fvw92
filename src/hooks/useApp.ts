'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isMounted = useRef(false)

  // SSR-safe: Read from localStorage only after component mounts
  useEffect(() => {
    isMounted.current = true
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
  }, [key])

  // Update localStorage when value changes
  const setValue = useCallback((value: T) => {
    if (!isMounted.current) return // Prevent SSR-related issues if called too early

    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }, [key])

  return [storedValue, setValue]
}

export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T)[]
): {
  filtered: T[]
  search: string
  setSearch: (s: string) => void
  status: string
  setStatus: (s: string) => void
} {
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const filtered = items.filter((item) => {
    const searchLower = search.toLowerCase().trim()
    const statusLower = status.toLowerCase().trim()

    const matchesSearch = searchLower === '' || fields.some(field =>
      String(item[field] ?? '').toLowerCase().includes(searchLower)
    )

    const matchesStatus = statusLower === '' ||
      (typeof item.status === 'string' && item.status.toLowerCase() === statusLower)

    return matchesSearch && matchesStatus
  })

  return { filtered, search, setSearch, status, setStatus }
}

export function useModal<T = unknown>(): {
  isOpen: boolean
  open: (item?: T) => void
  close: () => void
  activeItem: T | null
} {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<T | null>(null)

  const open = useCallback((item?: T) => {
    setActiveItem(item ?? null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setActiveItem(null)
  }, [])

  return { isOpen, open, close, activeItem }
}

export function useDemoToast(): {
  message: string
  type: 'success' | 'error' | 'info'
  visible: boolean
  show: (msg: string, type?: 'success' | 'error' | 'info') => void
} {
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<'success' | 'error' | 'info'>('info')
  const [visible, setVisible] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const show = useCallback((msg: string, t: 'success' | 'error' | 'info' = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setMessage(msg)
    setType(t)
    setVisible(true)
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setMessage('')
    }, 2500)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return { message, type, visible, show }
}