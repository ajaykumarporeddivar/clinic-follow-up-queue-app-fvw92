'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Download, PlusCircle } from 'lucide-react'

import {
  STATS,
  MOCK_FOLLOWUP_TASKS,
  MOCK_CLIENTS,
  RECENT_ACTIVITY,
  DEMO_USER,
  CHART_DATA,
  SPARKLINE_DATA,
} from '@/lib/data'
import { formatDate, exportToCsv } from '@/lib/utils' // Note: formatCurrency not needed for STATS values as they are strings

import {
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Table,
  Button,
  Input,
  Avatar, // Assuming Avatar component exists in ui.tsx or is a simple div
} from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { BarChart, Sparkline } from '@/components/charts'
import { FollowUpTask } from '@/lib/types' // Import type for table rows

export default function DashboardPage() {
  const router = useRouter()
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Utility to get client name from ID
  const getClientName = useCallback((clientId: string) => {
    return MOCK_CLIENTS.find(client => client.id === clientId)?.name || 'Unknown Client'
  }, [])

  // Filter and search logic for tasks table
  const filteredTasks = useMemo(() => {
    return MOCK_FOLLOWUP_TASKS.filter(task => {
      const clientName = getClientName(task.clientId).toLowerCase()
      const description = task.description.toLowerCase()
      const searchLower = searchTerm.toLowerCase()
      return clientName.includes(searchLower) || description.includes(searchLower)
    })
  }, [MOCK_FOLLOWUP_TASKS, searchTerm, getClientName])

  // Handle row click
  const handleRowClick = (taskId: string) => {
    setSelectedRowId(taskId === selectedRowId ? null : taskId)
    setToastMsg(`Task ${taskId} selected.`)
  }

  // Handle export to CSV
  const handleExportCsv = () => {
    const csvData = filteredTasks.map(task => ({
      'Client Name': getClientName(task.clientId),
      'Task Type': task.taskType,
      'Description': task.description,
      'Priority': task.priority,
      'Due Date': task.dueDate ? formatDate(task.dueDate) : 'N/A',
      'Status': task.status,
      'Created At': formatDate(task.createdAt),
    }))
    exportToCsv('followup_tasks.csv', csvData)
    setToastMsg('Tasks exported successfully!')
  }

  // Handle quick actions
  const handleQuickAction = (message: string, path?: string) => {
    setToastMsg(message)
    if (path) {
      router.push(path)
    }
  }

  // Auto-clear toast messages
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toastMsg])

  return (
    <>
      {/* Section 1: Header */}
      <AppHeader
        title="Dashboard"
        subtitle={`Good morning, ${DEMO_USER.name}`}
        actions={
          <Button size="sm" onClick={() => handleQuickAction('Navigating to intake...', '/dashboard/intake')}>
            <PlusCircle size={16} className="mr-2" /> New Follow-up Task
          </Button>
        }
      />

      {/* Section 2: KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Total Follow-ups"
          value={STATS.totalFollowUps}
          change={STATS.totalFollowUpsGrowth}
          changeType={STATS.totalFollowUpsGrowth.startsWith('+') ? 'positive' : 'negative'}
        >
          <Sparkline data={SPARKLINE_DATA.revenueSparkline} />
        </StatCard>
        <StatCard
          title="Outstanding Tasks"
          value={STATS.outstandingFollowUps}
          change={STATS.outstandingFollowUpsGrowth}
          changeType={STATS.outstandingFollowUpsGrowth.startsWith('+') ? 'positive' : 'negative'}
        >
          <Sparkline data={SPARKLINE_DATA.usersSparkline} />
        </StatCard>
        <StatCard
          title="Completed Today"
          value={STATS.completedToday}
          change={STATS.completedTodayGrowth}
          changeType={STATS.completedTodayGrowth.startsWith('+') ? 'positive' : 'negative'}
        >
          <Sparkline data={SPARKLINE_DATA.ordersSparkline} />
        </StatCard>
        <StatCard
          title="Overdue Tasks"
          value={STATS.overdueTasks}
          change={STATS.overdueTasksGrowth}
          changeType={STATS.overdueTasksGrowth.startsWith('+') ? 'negative' : 'positive'}
        >
          <Sparkline data={SPARKLINE_DATA.sentimentSparkline} />
        </StatCard>
      </div>

      {/* Section 3: Chart + Activity split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Follow-up Overview</CardTitle>
            <p className="text-zinc-600 text-sm">Last 12 weeks</p>
          </CardHeader>
          <CardContent>
            <BarChart data={CHART_DATA.weekly} labels={CHART_DATA.labels} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {RECENT_ACTIVITY.map(activity => (
              <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-zinc-50 last:border-0">
                <Avatar src={activity.user.avatar} alt={activity.user.name} />
                <div className="flex-1">
                  <p className="text-zinc-900 text-sm">{activity.user.name} {activity.action}</p>
                  <p className="text-zinc-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Section 4: Main data table */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>All Follow-up Tasks</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search tasks..."
                className="pl-9 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleExportCsv}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table<FollowUpTask & { clientName: string }>
            columns={[
              { key: 'clientName', header: 'Client' },
              { key: 'taskType', header: 'Task Type' },
              { key: 'priority', header: 'Priority' },
              { key: 'dueDate', header: 'Due Date', render: (task) => task.dueDate ? formatDate(task.dueDate) : 'N/A' },
              {
                key: 'status',
                header: 'Status',
                render: (task) => (
                  <Badge
                    variant={
                      task.status === 'pending' ? 'warning' :
                      task.status === 'in_progress' ? 'secondary' :
                      task.status === 'completed' ? 'success' : 'danger'
                    }
                  >
                    {task.status.replace(/_/g, ' ')}
                  </Badge>
                ),
              },
              { key: 'createdAt', header: 'Created At', render: (task) => formatDate(task.createdAt) },
            ]}
            data={filteredTasks.map(task => ({
              ...task,
              clientName: getClientName(task.clientId),
            }))}
            onRowClick={handleRowClick}
            selectedRowId={selectedRowId}
          />
        </CardContent>
        <CardFooter className="py-3 text-sm text-zinc-600">
          Showing {filteredTasks.length} of {MOCK_FOLLOWUP_TASKS.length} results
        </CardFooter>
      </Card>

      {/* Section 5: Quick Actions row */}
      <div className="flex gap-4 mt-6">
        <Button onClick={() => handleQuickAction('New task form opened!', '/dashboard/intake')}>
          <PlusCircle size={16} className="mr-2" /> Create New Task
        </Button>
        <Button variant="secondary" onClick={() => handleQuickAction('All pending tasks marked as in progress!')}>
          Mark All Pending In Progress
        </Button>
        <Button variant="secondary" onClick={() => handleQuickAction('Daily report generated!')}>
          Generate Daily Report
        </Button>
        <Button variant="danger" onClick={() => handleQuickAction('Old tasks archived.')}>
          Archive Old Tasks
        </Button>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-4 right-4 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50">
          {toastMsg}
        </div>
      )}
    </>
  )
}