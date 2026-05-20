'use client'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Loader2, ArrowUp, ArrowDown, Minus, ClipboardPlus, ListTodo, FileBarChart, X, Search,
  AlertTriangle, Info, CheckCircle, CircleDot, Bell, BookA, HeartHandshake, FileText,
  User, Mail, Phone, CalendarDays, BarChart, TrendingUp, TrendingDown,
  ChevronDown, PlusCircle
} from 'lucide-react'
import { FollowUpTask } from '@/lib/types' // Needed for Table types.

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  href?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variantClasses = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-200',
    outline: 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-200',
    ghost: 'text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-base',
    lg: 'h-12 px-6 text-lg',
  }

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  )

  const buttonContent = (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className, disabled || loading ? 'opacity-50 pointer-events-none' : '')}
        {...props}
      >
        {content}
      </Link>
    )
  }

  return buttonContent
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-white border border-zinc-200 rounded-xl shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn('font-semibold leading-none tracking-tight text-zinc-900', className)}>{children}</h3>
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variantClasses = {
    default: 'bg-zinc-100 text-zinc-700',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border border-amber-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    purple: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  className?: string
}

export function Input({ label, placeholder, value, onChange, error, type = 'text', icon, disabled, className, ...props }: InputProps) {
  const inputId = React.useId()
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-10' : '',
            error ? 'border-red-500 focus-visible:ring-red-500' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2 className={cn('h-5 w-5 animate-spin text-zinc-900', className)} />
  )
}

interface AvatarProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  // Deterministic color based on the first character of the name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-red-200 text-red-800', 'bg-blue-200 text-blue-800', 'bg-green-200 text-green-800',
      'bg-yellow-200 text-yellow-800', 'bg-purple-200 text-purple-800', 'bg-indigo-200 text-indigo-800',
    ]
    const charCode = name.charCodeAt(0) || 0
    return colors[charCode % colors.length]
  }

  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center font-semibold',
        sizeClasses[size],
        getBackgroundColor(name),
        className
      )}
    >
      {initials}
    </div>
  )
}

interface SparklineProps {
  data: number[]
  color?: string
  width?: number
  height?: number
}

export function Sparkline({ data, color = '#6366f1', width = 40, height = 20 }: SparklineProps) {
  if (!data || data.length < 2) {
    return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} />
  }

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = range === 0
      ? height / 2 // All values are the same, draw a flat line in the middle
      : height - ((value - minValue) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  sparkline?: number[]
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, sparkline }: StatCardProps) {
  const changeColorClasses = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-zinc-500',
  }
  const ChangeIcon = changeType === 'up' ? ArrowUp : changeType === 'down' ? ArrowDown : Minus

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-600">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-900">{value}</div>
        {change && (
          <p className={cn('text-xs flex items-center mt-1', changeColorClasses[changeType])}>
            <ChangeIcon className="h-3 w-3 mr-1" />
            {change}
            {sparkline && <Sparkline data={sparkline} className="ml-2" />}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, handleEscape])

  if (!open) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadein"
      onClick={onClose}
    >
      <div
        ref={ref}
        className={cn(
          'relative w-full rounded-2xl bg-white p-6 shadow-xl animate-slideup',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="h-5 w-5 text-zinc-500" />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  icon: React.ElementType
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-2 text-xl font-bold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

interface TableProps<T> {
  columns: Array<{
    key: keyof T | string
    label: string
    render?: (row: T) => React.ReactNode
    className?: string
  }>
  data: T[]
  onRowClick?: (row: T) => void
  className?: string
}

export function Table<T extends { id: string | number }>({ columns, data, onRowClick, className }: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm', className)}>
      <table className="w-full text-sm text-zinc-700">
        <thead>
          <tr className="border-b bg-zinc-50 text-zinc-600">
            {columns.map((column) => (
              <th key={String(column.key)} className={cn('px-6 py-3 text-left font-semibold', column.className)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-zinc-500">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn(
                  'border-b last:border-b-0',
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-50',
                  onRowClick ? 'cursor-pointer hover:bg-zinc-100' : ''
                )}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={`${row.id}-${String(column.key)}`} className={cn('px-6 py-4', column.className)}>
                    {column.render ? column.render(row) : (row as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}