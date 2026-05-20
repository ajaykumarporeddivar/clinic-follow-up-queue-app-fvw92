import {
  MOCK_CLIENTS,
  MOCK_FOLLOWUP_TASKS,
  MOCK_CLIENT_REPORTS,
} from '@/lib/data'
import type { NextRequest } from 'next/server'
import { Client, FollowUpTask, ClientReport } from '@/lib/types'

type SearchableEntity =
  | (Client & { entityType: 'client' })
  | (FollowUpTask & { entityType: 'followUpTask' })
  | (ClientReport & { entityType: 'clientReport' })

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const type = searchParams.get('type')?.toLowerCase()

  const searchResults: SearchableEntity[] = []

  // If query is empty, return the first 5 items from a combined list
  if (!q) {
    const allItems: SearchableEntity[] = [
      ...MOCK_CLIENTS.slice(0, 5).map((item) => ({ ...item, entityType: 'client' })),
      ...MOCK_FOLLOWUP_TASKS.slice(0, 5).map((item) => ({ ...item, entityType: 'followUpTask' })),
      ...MOCK_CLIENT_REPORTS.slice(0, 5).map((item) => ({ ...item, entityType: 'clientReport' })),
    ]
    const initialResults = allItems.slice(0, 5) // Ensure maximum of 5 initial items
    return Response.json(
      { ok: true, data: { results: initialResults, total: initialResults.length, query: q } },
      { headers: CORS_HEADERS },
    )
  }

  // Search Clients
  if (!type || type === 'client' || type === 'clients') {
    MOCK_CLIENTS.forEach((client) => {
      if (
        client.name.toLowerCase().includes(q) ||
        (client.email && client.email.toLowerCase().includes(q)) ||
        (client.phone && client.phone.toLowerCase().includes(q))
      ) {
        searchResults.push({ ...client, entityType: 'client' })
      }
    })
  }

  // Search FollowUpTasks
  if (!type || type === 'followup-task' || type === 'followuptasks') {
    MOCK_FOLLOWUP_TASKS.forEach((task) => {
      if (
        task.description.toLowerCase().includes(q) ||
        task.taskType.toLowerCase().includes(q)
      ) {
        searchResults.push({ ...task, entityType: 'followUpTask' })
      }
    })
  }

  // Search ClientReports
  if (!type || type === 'client-report' || type === 'clientreports') {
    MOCK_CLIENT_REPORTS.forEach((report) => {
      if (
        report.title.toLowerCase().includes(q) ||
        (report.contentSummary && report.contentSummary.toLowerCase().includes(q))
      ) {
        searchResults.push({ ...report, entityType: 'clientReport' })
      }
    })
  }

  const limitedResults = searchResults.slice(0, 20)

  return Response.json(
    { ok: true, data: { results: limitedResults, total: limitedResults.length, query: q } },
    { headers: CORS_HEADERS },
  )
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  })
}