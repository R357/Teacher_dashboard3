"use client"
import React from "react"
import Link from "next/link"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Home, Clock, BarChart3, CheckSquare, Bell, MessageSquare } from "lucide-react"

export default function MainNavbar() {
  const items = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "/home" },
    { title: "Recent Task", icon: <Clock className="w-5 h-5" />, href: "/task" },
    { title: "Report Card", icon: <BarChart3 className="w-5 h-5" />, href: "/report-card" },
    { title: "Attendance", icon: <CheckSquare className="w-5 h-5" />, href: "/attendance" },
    { title: "Feedback", icon: <MessageSquare className="w-5 h-5" />, href: "/feedback" },
  ]

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-lg rounded-lg">
          E
        </div>
        <h1 className="text-xl font-semibold text-gray-800">EduLearn</h1>
      </div>

      <div className="flex items-center gap-6">
        <FloatingDock items={items} desktopClassName="flex gap-4" mobileClassName="grid grid-cols-4 gap-4" />
        <Link href="/notifications" className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
        </Link>
      </div>
    </nav>
  )
}


