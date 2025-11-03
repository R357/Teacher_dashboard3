'use client'
import React from 'react'
import MainNavbar from '@/components/MainNavbar'

export default function TaskPage() {
  return (
    <div>
      <MainNavbar />
      <div className="pt-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Task</h2>
        <p className="text-gray-600">View your latest tasks and assignments.</p>
      </div>
    </div>
  )
}


