"use client";

import React from "react";
import {
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  BarChart3,
  CheckSquare,
  User,
  LogOut,
} from "lucide-react";
import {FloatingDock} from "@/components/ui/floating-dock";

export default function Navbar() {
  const navItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "#" },
    { title: "Subjects", icon: <BookOpen className="w-5 h-5" />, href: "#" },
    { title: "Assignment", icon: <FileText className="w-5 h-5" />, href: "#" },
    { title: "Exam", icon: <ClipboardList className="w-5 h-5" />, href: "#" },
    { title: "Report", icon: <BarChart3 className="w-5 h-5" />, href: "#" },
    { title: "Attendance", icon: <CheckSquare className="w-5 h-5" />, href: "#" },
    { title: "Profile", icon: <User className="w-5 h-5" />, href: "#" },
    { title: "Logout", icon: <LogOut className="w-5 h-5" />, href: "#" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-lg">
          S
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Student Portal</h1>
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
