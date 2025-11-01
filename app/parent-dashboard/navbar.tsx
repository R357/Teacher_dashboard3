"use client";

import React from "react";
import {
  Home,
  FileText,
  ClipboardList,
  BarChart3,
  CheckSquare,
  User,
  LogOut,
  Bell,
} from "lucide-react";
import {FloatingDock} from "@/components/ui/floating-dock";

export default function ParentNavbar() {
  const navItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "#home" },
    { title: "Assignment", icon: <FileText className="w-5 h-5" />, href: "#assignment" },
    { title: "Exam", icon: <ClipboardList className="w-5 h-5" />, href: "#exam" },
    { title: "Attendance", icon: <CheckSquare className="w-5 h-5" />, href: "#attendance" },
    { title: "Feedback", icon: <Bell className="w-5 h-5" />, href: "#feedback" },
    { title: "Profile", icon: <User className="w-5 h-5" />, href: "#profile" },
    { title: "Logout", icon: <LogOut className="w-5 h-5" />, href: "/auth" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-lg">
          P
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Parent Portal</h1>
      </div>

      {/* Right Section - Floating Dock */}
      <div className="flex items-center gap-6">
        <FloatingDock
          items={navItems}
          desktopClassName="flex gap-4"
          mobileClassName="grid grid-cols-4 gap-4"
        />
      </div>
    </nav>
  );
}

