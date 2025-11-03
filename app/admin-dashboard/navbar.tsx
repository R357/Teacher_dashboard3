"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Users,
  GraduationCap,
  Megaphone,
  UserCircle,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock admin data - in real app, fetch from context/state
  const adminData = {
    name: "Admin User",
    email: "admin@university.edu",
    phone: "+1 (555) 111-2222",
  };

  const navItems = [
    { title: "Dashboard", icon: <Home className="w-5 h-5" />, href: "#" },
    { title: "Teachers", icon: <UserCircle className="w-5 h-5" />, href: "#teachers" },
    { title: "Students", icon: <GraduationCap className="w-5 h-5" />, href: "#students" },
    { title: "Announcements", icon: <Megaphone className="w-5 h-5" />, href: "#announcements" },
    { title: "Parents", icon: <Users className="w-5 h-5" />, href: "#parents" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar when scrolling up or at the top
          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsVisible(true);
          } 
          // Hide navbar when scrolling down past 150px
          else if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // In real app, clear auth state and redirect
    window.location.href = "/auth";
  };

  return (
    <nav
      className={`w-full py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 
        backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm
        transition-all duration-500 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-lg shadow-md">
          A
        </div>
        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Admin Portal</h1>
      </div>

      {/* Right Section - Navigation & Profile */}
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden md:flex">
          <FloatingDock
            items={navItems}
            desktopClassName="flex gap-4"
            mobileClassName="hidden"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              A
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* Profile Section */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">{adminData.name}</p>
                <p className="text-xs text-gray-600 truncate">{adminData.email}</p>
              </div>

              {/* Dropdown Items */}
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
