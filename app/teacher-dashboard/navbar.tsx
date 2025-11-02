"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  BookOpen,
  FileText,
  Megaphone,
  Users,
  GraduationCap,
  LayoutGrid,
  ClipboardCheck,
  ChevronDown,
  Bell,
  LogOut,
  User,
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setIsClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "/teacher/home" },
    { title: "Classes", icon: <LayoutGrid className="w-5 h-5" />, href: "/teacher-dashboard/teacher/classes" },
    { title: "Students", icon: <Users className="w-5 h-5" />, href: "/teacher/students" },
    { title: "Notes", icon: <BookOpen className="w-5 h-5" />, href: "/teacher/notes" },
    { title: "Assignments", icon: <FileText className="w-5 h-5" />, href: "/teacher/assignments" },
    { title: "Exams", icon: <GraduationCap className="w-5 h-5" />, href: "/teacher/exams" },
    { title: "Announcements", icon: <Megaphone className="w-5 h-5" />, href: "/teacher/announcements" },
    { title: "Attendance", icon: <ClipboardCheck className="w-5 h-5" />, href: "/teacher/attendance" }, // ✅ Added
  ];

  return (
    <nav className="w-full bg-white py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-2 select-none">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-bold text-lg rounded-lg">
          T
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Teacher Dashboard</h1>
      </div>

      {/* Center - Floating Dock */}
      <div className="flex items-center">
        <FloatingDock
          items={navItems}
          desktopClassName="flex gap-4"
          mobileClassName="grid grid-cols-4 gap-4"
        />
      </div>

      {/* Right Section - Profile */}
      <div className="relative" ref={dropdownRef}>
        <motion.div
          whileHover={{ y: -7 }}
          onClick={() => {
            setOpen(!open);
            setIsClicked(!isClicked);
          }}
          className="relative flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition-all cursor-pointer"
        >
          {/* Profile Icon */}
          <motion.div
            className="w-8 h-8 bg-white flex items-center justify-center rounded-full text-black shadow-md"
            animate={{ scale: isClicked ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <User size={18} />
          </motion.div>

          {/* Dropdown Arrow */}
          <ChevronDown
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </motion.div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg py-3 shadow-lg z-50"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  T
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Raghav MJ</p>
                  <p className="text-xs text-gray-500">Teacher</p>
                </div>
              </div>

              {/* Dropdown Options */}
              <Link
                href="/teacher/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                <User size={16} /> Profile
              </Link>
              <Link
                href="/teacher/notifications"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                <Bell size={16} /> Notifications
              </Link>
              <button
                onClick={() => alert("Logged out!")}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 w-full text-left"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
