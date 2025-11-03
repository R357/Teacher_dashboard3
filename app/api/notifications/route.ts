import { NextResponse } from 'next/server'

export async function GET() {
  const notifications = [
    { id: '1', title: 'New Assignment', message: 'Math assignment due tomorrow.', createdAt: new Date().toISOString() },
    { id: '2', title: 'Attendance Update', message: 'Attendance marked for today.', createdAt: new Date(Date.now() - 3600_000).toISOString() },
    { id: '3', title: 'Result Published', message: 'Your mid-term results are available.', createdAt: new Date(Date.now() - 86400_000).toISOString() },
  ]

  return NextResponse.json({ notifications })
}


