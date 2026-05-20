'use client'

import { AppSidebar } from '@/components/layout'
import { ClipboardPlus, ListTodo, FileBarChart } from 'lucide-react'
import { ReactNode } from 'react'

interface NavItem {
  icon: JSX.Element
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: <ClipboardPlus size={16} />, label: 'Intake', href: '/dashboard/intake' },
  { icon: <ListTodo size={16} />, label: 'Queue', href: '/dashboard/queue-dashboard' },
  { icon: <FileBarChart size={16} />, label: 'Reports', href: '/dashboard/client-reports' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Clinic Follow-up Queue" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}