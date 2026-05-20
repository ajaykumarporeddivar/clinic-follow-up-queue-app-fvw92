'use client'
import { useParams } from 'next/navigation'
import { useState, useMemo, FormEvent } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, Badge, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Textarea } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate, formatCurrency } from '@/lib/utils'
import { MOCK_CLIENTS, MOCK_FOLLOWUP_TASKS, MOCK_CLIENT_REPORTS, STATS } from '@/lib/data'
import { Search, Plus, Download, Eye, Loader2, ClipboardPlus, ListTodo, FileBarChart, Bell, BookA, HeartHandshake, User, Mail, CalendarDays, BarChart, ChevronDown, CheckCircle, Info, AlertTriangle, XCircle, ArrowUp, ArrowDown } from 'lucide-react'
import { Client, FollowUpTask, ClientReport } from '@/lib/types'

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [taskTypeFilter, setTaskTypeFilter] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // Intake Form States (for slug === 'intake')
  const [clientName, setClientName] = useState('')
  const [taskType, setTaskType] = useState<'Reminder' | 'Booking' | 'Check-in' | 'Info Request' | 'Wellness Plan'>('Reminder')
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Helper to find client name
  const getClientName = (clientId: string): string => {
    const client = MOCK_CLIENTS.find(c => c.id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  // Handle new follow-up task submission
  const handleIntakeSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!clientName || !taskType || !description || !dueDate) {
      setFormMessage({ type: 'error', text: 'Please fill in all required fields.' })
      return
    }

    // Simulate task creation (no actual mutation of MOCK_FOLLOWUP_TASKS)
    // In a real app, this would dispatch an action or hit an API route
    console.log('New Follow-up Task Submitted:', { clientName, taskType, priority, dueDate, description })
    setFormMessage({ type: 'success', text: 'Follow-up task added successfully to the queue!' })

    // Clear form
    setClientName('')
    setDueDate('')
    setDescription('')
    setTaskType('Reminder')
    setPriority('Medium')
  }

  // ── Feature 1: Follow-up Intake (/dashboard/intake) ──────────────────────
  if (slug === 'intake') {
    return (
      <div className="space-y-6">
        <AppHeader
          title="Follow-up Intake"
          subtitle="Quickly capture new client follow-up needs."
          actions={
            <Button size="sm" onClick={() => { /* clear form */ setClientName(''); setDueDate(''); setDescription(''); setTaskType('Reminder'); setPriority('Medium'); setFormMessage(null) }}>
              <Plus size={14} className="mr-1" />Clear Form
            </Button>
          }
        />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Follow-up Task</CardTitle>
            <CardDescription className="text-zinc-600">Enter details for a new follow-up task. Client name is required.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleIntakeSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-zinc-700 mb-1">Client Name</label>
                <Input
                  id="clientName"
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Enter client name or select existing..."
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="taskType" className="block text-sm font-medium text-zinc-700 mb-1">Task Type</label>
                  <Select value={taskType} onValueChange={(value) => setTaskType(value as any)} >
                    <SelectTrigger id="taskType" className="w-full text-left">
                      <SelectValue placeholder="Select a task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reminder">Reminder</SelectItem>
                      <SelectItem value="Booking">Booking</SelectItem>
                      <SelectItem value="Check-in">Check-in</SelectItem>
                      <SelectItem value="Info Request">Info Request</SelectItem>
                      <SelectItem value="Wellness Plan">Wellness Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-zinc-700 mb-1">Priority</label>
                  <Select value={priority} onValueChange={(value) => setPriority(value as any)} >
                    <SelectTrigger id="priority" className="w-full text-left">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-zinc-700 mb-1">Due Date</label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide a detailed description of the follow-up task..."
                  rows={4}
                  required
                />
              </div>

              {formMessage && (
                <div className={
                  `flex items-center gap-2 p-3 rounded-lg text-sm ${
                    formMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`
                }>
                  {formMessage.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  <span>{formMessage.text}</span>
                </div>
              )}

              <Button type="submit" className="w-full mt-4">
                <ClipboardPlus size={16} className="mr-2" />Add to Queue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Follow-up Queue Dashboard (/dashboard/queue-dashboard) ──────────────────────
  if (slug === 'queue-dashboard') {
    const filteredTasks = useMemo(() => {
      return MOCK_FOLLOWUP_TASKS
        .filter(task =>
          (!search || getClientName(task.clientId).toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())) &&
          (!statusFilter || task.status === statusFilter) &&
          (!priorityFilter || task.priority === priorityFilter) &&
          (!taskTypeFilter || task.taskType === taskTypeFilter)
        )
        .sort((a, b) => {
          // Default sort: pending first, then high priority, then by due date
          const statusOrder = { 'pending': 1, 'in_progress': 2, 'High': 3, 'Medium': 4, 'Low': 5, 'completed': 6, 'cancelled': 7 } as { [key: string]: number }
          const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 } as { [key: string]: number }

          if (a.status !== b.status) {
            return statusOrder[a.status] - statusOrder[b.status]
          }
          if (a.priority !== b.priority) {
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          }
          if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          }
          return 0
        })
    }, [search, statusFilter, priorityFilter, taskTypeFilter])

    const totalOutstanding = filteredTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length
    const totalCompleted = filteredTasks.filter(t => t.status === 'completed').length
    const totalHighPriority = filteredTasks.filter(t => t.priority === 'High' && t.status !== 'completed' && t.status !== 'cancelled').length

    return (
      <div className="space-y-6">
        <AppHeader
          title="Follow-up Queue"
          subtitle={`${filteredTasks.length} tasks matching filters`}
          actions={<Button size="sm" href="/dashboard/intake"><Plus size={14} className="mr-1" />Add New Task</Button>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center justify-between">
              Total Follow-ups <ListTodo size={16} className="text-zinc-400" />
            </CardTitle>
            <div className="text-2xl font-bold text-zinc-900 mt-2">{STATS.totalFollowUps}</div>
            <p className="text-xs text-zinc-500 mt-1">{STATS.totalFollowUpsGrowth} from last month</p>
          </Card>
          <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center justify-between">
              Outstanding Tasks <Bell size={16} className="text-zinc-400" />
            </CardTitle>
            <div className="text-2xl font-bold text-zinc-900 mt-2">{totalOutstanding}</div>
            <p className="text-xs text-zinc-500 mt-1">{STATS.outstandingFollowUpsGrowth} from last month</p>
          </Card>
          <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center justify-between">
              Completed This Period <CheckCircle size={16} className="text-zinc-400" />
            </CardTitle>
            <div className="text-2xl font-bold text-zinc-900 mt-2">{totalCompleted}</div>
            <p className="text-xs text-zinc-500 mt-1">Good work!</p>
          </Card>
          <Card className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center justify-between">
              High Priority <AlertTriangle size={16} className="text-zinc-400" />
            </CardTitle>
            <div className="text-2xl font-bold text-zinc-900 mt-2">{totalHighPriority}</div>
            <p className="text-xs text-zinc-500 mt-1">Act now</p>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 max-w-xs min-w-[180px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search client or description..."
                  className="w-full pl-9 pr-3 py-2 text-sm"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={taskTypeFilter} onValueChange={setTaskTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Task Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Task Types</SelectItem>
                  <SelectItem value="Reminder">Reminder</SelectItem>
                  <SelectItem value="Booking">Booking</SelectItem>
                  <SelectItem value="Check-in">Check-in</SelectItem>
                  <SelectItem value="Info Request">Info Request</SelectItem>
                  <SelectItem value="Wellness Plan">Wellness Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created At</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredTasks.map(task => (
                  <tr
                    key={task.id}
                    onClick={() => setSelected(selected === task.id ? null : task.id)}
                    className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selected === task.id ? 'bg-indigo-50' : ''}`}
                  >
                    <td className="px-6 py-3 font-medium text-zinc-900">{getClientName(task.clientId)}</td>
                    <td className="px-6 py-3 text-zinc-500">{task.taskType}</td>
                    <td className="px-6 py-3 text-zinc-700 max-w-[200px] truncate">{task.description}</td>
                    <td className="px-6 py-3">
                      <Badge variant={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'info'}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-500">{task.dueDate ? formatDate(task.dueDate) : 'N/A'}</td>
                    <td className="px-6 py-3">
                      <Badge variant={
                        task.status === 'completed' ? 'success' :
                        task.status === 'pending' ? 'warning' :
                        task.status === 'in_progress' ? 'info' : 'error'
                      }>
                        {task.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(task.createdAt)}</td>
                    <td className="px-6 py-3">
                      <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {filteredTasks.length} of {MOCK_FOLLOWUP_TASKS.length} total tasks
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 3: Client Reports (/dashboard/client-reports) ──────────────────────
  if (slug === 'client-reports') {
    const filteredReports = useMemo(() => {
      return MOCK_CLIENT_REPORTS.filter(report =>
        (!search || report.title.toLowerCase().includes(search.toLowerCase()) || getClientName(report.clientId).toLowerCase().includes(search.toLowerCase()) || (report.contentSummary && report.contentSummary.toLowerCase().includes(search.toLowerCase())))
      )
    }, [search])

    return (
      <div className="space-y-6">
        <AppHeader
          title="Client Reports"
          subtitle={`${filteredReports.length} client reports`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-1" />Export CSV</Button>
              <Button size="sm"><Plus size={14} className="mr-1" />Generate New</Button>
            </div>
          }
        />
        <Card>
          <CardHeader>
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-2 text-sm" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Period</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredReports.map(report => (
                  <tr key={report.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelected(report.id)}>
                    <td className="px-6 py-3 font-medium text-zinc-900">{report.title}</td>
                    <td className="px-6 py-3 text-zinc-500">{getClientName(report.clientId)}</td>
                    <td className="px-6 py-3 text-zinc-700">{formatDate(report.reportPeriodStart)} - {formatDate(report.reportPeriodEnd)}</td>
                    <td className="px-6 py-3">
                      <Badge variant={
                        report.status === 'sent' ? 'success' :
                        report.status === 'generated' ? 'info' : 'secondary'
                      }>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(report.createdAt)}</td>
                    <td className="px-6 py-3">
                      <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {filteredReports.length} of {MOCK_CLIENT_REPORTS.length} total reports
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Default: feature hub ────────────────