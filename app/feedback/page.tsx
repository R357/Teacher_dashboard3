'use client'
import React from 'react'
import MainNavbar from '@/components/MainNavbar'

export default function FeedbackPage() {
  return (
    <div>
      <MainNavbar />
      <div className="pt-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <p className="text-gray-600">Share your thoughts to help us improve.</p>
      </div>
    </div>
  )
}


