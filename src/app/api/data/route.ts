import {
  MOCK_CLIENTS,
  MOCK_FOLLOWUP_TASKS,
  MOCK_CLIENT_REPORTS,
  STATS,
} from '@/lib/data'
import type { NextRequest } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      data: {
        clients: MOCK_CLIENTS,
        followUpTasks: MOCK_FOLLOWUP_TASKS,
        clientReports: MOCK_CLIENT_REPORTS,
        stats: STATS,
      },
      total: {
        clients: MOCK_CLIENTS.length,
        followUpTasks: MOCK_FOLLOWUP_TASKS.length,
        clientReports: MOCK_CLIENT_REPORTS.length,
      },
    },
    {
      headers: CORS_HEADERS,
    },
  )
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()
    return Response.json(
      {
        ok: true,
        message: 'Demo mode — data not persisted',
        received: body,
      },
      {
        headers: CORS_HEADERS,
      },
    )
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: 'Invalid JSON body',
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      },
    )
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  })
}