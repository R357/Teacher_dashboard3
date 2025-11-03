'use client'
import React, { useEffect, useState } from 'react'
import MainNavbar from '@/components/MainNavbar'

type NotificationItem = {
  id: string
  title: string
  message: string
  createdAt: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/notifications', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch notifications')
        const data = await res.json()
        setNotifications(data.notifications ?? [])
      } catch (e: any) {
        setError(e.message ?? 'Error fetching notifications')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <MainNavbar />
      <div className="pt-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <ul className="space-y-3">
            {notifications.length === 0 && (
              <li className="text-gray-600">No notifications yet.</li>
            )}
            {notifications.map((n) => (
              <li key={n.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                  <span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{n.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


