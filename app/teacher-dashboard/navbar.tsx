"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
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
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [logoAvailable, setLogoAvailable] = useState(true);
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

  // Read username from common client-side storage locations
  useEffect(() => {
    try {
      const direct = localStorage.getItem('username');
      if (direct) {
        setUsername(direct);
        const av = localStorage.getItem('avatar') || localStorage.getItem('avatarUrl');
        if (av) setAvatarUrl(av);
        return;
      }

      const userJson = localStorage.getItem('user') || localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const parsed = JSON.parse(userJson);
          if (parsed && (parsed.name || parsed.username)) {
            setUsername(parsed.name || parsed.username);
            const possibleAvatar = parsed.avatar || parsed.avatarUrl || parsed.image || parsed.photo || parsed.picture;
            if (possibleAvatar) setAvatarUrl(possibleAvatar);
            return;
          }
        } catch (e) {
          // not JSON, ignore
        }
      }

      const cookies = document.cookie.split(';').map(c => c.trim());
      for (const c of cookies) {
        if (c.startsWith('username=')) {
          setUsername(decodeURIComponent(c.split('=')[1]));
          return;
        }
        if (c.startsWith('avatar=')) {
          setAvatarUrl(decodeURIComponent(c.split('=')[1]));
        }
      }

      setUsername('Teacher');
    } catch (err) {
      setUsername('Teacher');
    }
  }, []);

  const navItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "/teacher-dashboard" },
    { title: "Classes", icon: <LayoutGrid className="w-5 h-5" />, href: "/teacher-dashboard/classes" },
    { title: "Students", icon: <Users className="w-5 h-5" />, href: "/teacher-dashboard/students" },
    { title: "Attendance", icon: <ClipboardCheck className="w-5 h-5" />, href: "/teacher-dashboard/attendence" },
    { title: "GradeNow", icon: <BookOpen className="w-5 h-5" />, href: "/teacher-dashboard/Grade" },
    { title: "Assignments", icon: <FileText className="w-5 h-5" />, href: "/teacher-dashboard/assignments" },
    { title: "Exams", icon: <GraduationCap className="w-5 h-5" />, href: "/teacher-dashboard/exams" },
    { title: "Announcements", icon: <Megaphone className="w-5 h-5" />, href: "/teacher-dashboard/announcements" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className="w-full bg-white py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-2 select-none">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white ring-1 ring-gray-200">
          {logoAvailable ? (
            <img
              src="/teacher-logo.png"
              alt="EduLearn logo"
              className="object-cover w-full h-full"
              onError={() => setLogoAvailable(false)}
            />
          ) : (
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-bold text-lg">T</div>
          )}
        </div>
        <h1 className="text-xl font-semibold text-jetblack-800">EduLearn</h1>
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
          initial={false}
          whileHover="hover"
          animate="initial"
          onClick={() => {
            setOpen(!open);
            setIsClicked(!isClicked);
          }}
          className="relative flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer group"
        >
          {/* Profile Icon */}
          <motion.div
            className="w-8 h-8 bg-white flex items-center justify-center rounded-full text-black border-2 border-transparent transition-colors group-hover:border-blue-500"
            animate={{ scale: isClicked ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username ?? 'User avatar'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={18} />
            )}
          </motion.div>

          {/* Hover Card */}
          <motion.div
            variants={{
              hover: { opacity: 1, y: 0, scale: 1 },
              initial: { opacity: 0, y: 0, scale: 0.1 }
            }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-4 min-w-[200px] max-w-xs origin-top-right z-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={username ?? 'User avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  username?.charAt(0).toUpperCase() || 'T'
                )}
              </div>
              <div>
                <h3 className="font-medium text-jetblack-900">{username ?? 'Teacher'}</h3>
                <p className="text-sm text-jetblack-500">Teacher</p>
              </div>
            </div>
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
              className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg py-3 z-50"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={username ?? 'User avatar'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {username ? username.charAt(0).toUpperCase() : 'T'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {username ?? 'Teacher'}
                  </p>
                  <p className="text-xs text-gray-500">Teacher Account</p>
                </div>
              </div>

              {/* Dropdown Options */}
              <button
                onClick={() => {
                  setOpen(false);
                  // Navigate to profile
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 w-full text-left"
              >
                <User size={16} /> Profile
              </button>
              
              <button
                onClick={() => {
                  setOpen(false);
                  // Navigate to notifications
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 w-full text-left"
              >
                <Bell size={16} /> Notifications
              </button>
              
              <div className="border-t border-gray-100 my-2"></div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-red-600 hover:text-red-700 w-full text-left"
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
