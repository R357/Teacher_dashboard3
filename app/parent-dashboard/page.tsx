'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimator } from './components/ScrollAnimator';
import { Attendance } from './sections/Attendance';
import TaskSection from './sections/task';
import { 
  ChevronDown, 
  ChevronUp,
  Phone, 
  MoreVertical,
  Mail,
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  BarChart3,
  CheckSquare,
  User,
  LogOut,
  Bell,
  Download,
} from 'lucide-react';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  Tooltip,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';
import './dashboard.css';

export default function ParentDashboard() {
  const [monthOpen, setMonthOpen] = useState(false);
  const [todayOpen, setTodayOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // Navbar items for FloatingDock
  const navItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "#home" },
    { title: "Assignment", icon: <FileText className="w-5 h-5" />, href: "#home" },
    { title: "Report", icon: <BarChart3 className="w-5 h-5" />, href: "#performance" },
    { title: "Attendance", icon: <CheckSquare className="w-5 h-5" />, href: "#attendance" },
  ];

  // Handle navbar clicks with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const section = sectionsRef.current[sectionId];
    if (section) {
      const scrollContainer = scrollContainerRef.current || document.querySelector('.scroll-container') as HTMLElement;
      if (scrollContainer && section) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const offsetTop = sectionRect.top - containerRect.top + scrollContainer.scrollTop - 70;
        scrollContainer.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      }
    }
  };

  // Prevent automatic scrolling on page load
  useEffect(() => {
    // Prevent hash-based auto-scroll immediately
    if (window.location.hash) {
      // Clear hash without scrolling
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Small delay to ensure DOM is ready, then scroll to top
    const timer = setTimeout(() => {
      const scrollContainer = scrollContainerRef.current || document.querySelector('.scroll-container') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.profile-dropdown')) {
        setMonthOpen(false);
        setTodayOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Performance bar chart data - matching second image
  const performanceData = [
    { name: 'Algorithms structures', score: 85.3 },
    { name: 'Object program.', score: 64.7 },
    { name: 'Database program.', score: 84.2 },
    { name: 'Web develop.', score: 45.6 },
    { name: 'Mobile application', score: 43.5 },
    { name: 'Machine learning', score: 74.4 },
  ];

  // Calendar events - matching exact times from image
  const calendarEvents = [
    { time: '10:00', displayTime: '9.45-10.30', endTime: '10:30', title: 'Electronics lesson', lesson: '21 lesson', active: true },
    { time: '11:00', displayTime: '11.00-11.40', endTime: '11:40', title: 'Electronics lesson', lesson: '23 lesson', active: false },
    { time: '12:00', displayTime: '12.00-12.45', endTime: '12:45', title: 'Robotics lesson', lesson: '23 lesson', active: false },
    { time: '13:30', displayTime: '13.45-14.30', endTime: '14:30', title: 'C++ lesson', lesson: '21 lesson', active: false },
  ];

  return (
    <div className="parent-dashboard">
      {/* Fixed Navbar with FloatingDock */}
      <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-gray-100">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-lg rounded-lg">
            P
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Parent Portal</h1>
        </div>

        {/* Right Section - Navigation and Profile */}
        <div className="flex items-center gap-6">
          <FloatingDock
            items={navItems.map(item => ({
              ...item,
              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleNavClick(e, item.href);
              }
            }))}
            desktopClassName="flex gap-4"
            mobileClassName="grid grid-cols-4 gap-4"
          />
          
          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-semibold text-sm">
                P
              </div>
              <span className="text-sm font-medium text-gray-700">Parent</span>
              {profileOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                {/* User Info Section */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-semibold">
                    P
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A] text-sm">Parent</div>
                    <div className="text-xs text-[#6B7280]">Parent</div>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#1A1A1A] hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#1A1A1A] hover:bg-gray-50 transition-colors">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#1A1A1A] hover:bg-gray-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Scrollable Sections Container */}
      <main className="scroll-container" ref={(el) => { scrollContainerRef.current = el; }}>
        
        {/* SECTION 1: HOME – Current Dashboard (100% unchanged) */}
        <section 
          id="home" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['home'] = el; }}
        >
          <div className="w-full px-4 py-3 h-full">
            <div className="grid grid-cols-3 gap-3 h-full dashboard-grid">
              {/* Left Column */}
              <div className="col-span-2 flex flex-col gap-3 overflow-y-auto">
                {/* Greeting Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h1 className="text-[36px] font-bold text-[#1A1A1A] mb-2 leading-tight">Hello Grace!</h1>
                      <p className="text-base text-[#1A1A1A] mb-3 leading-relaxed">
                        You have 3 new tasks. It is a lot of work for today! So let&apos;s start!
                      </p>
                      <a 
                        href="#" 
                        className="text-[#5D5FEF] underline hover:text-[#4C4ED8] transition-colors text-base font-medium"
                      >
                        review it
                      </a>
                    </div>
                    {/* 3D Character Illustration */}
                    <div className="w-28 h-28 flex-shrink-0 greeting-illustration">
                      <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#5D5FEF" />
                            <stop offset="100%" stopColor="#4C4ED8" />
                          </linearGradient>
                          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FEE3CC" />
                            <stop offset="100%" stopColor="#FBD5B8" />
                          </linearGradient>
                          <filter id="shadow">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offsetblur" />
                            <feComponentTransfer>
                              <feFuncA type="linear" slope="0.3" />
                            </feComponentTransfer>
                            <feMerge>
                              <feMergeNode />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <rect x="50" y="280" width="300" height="20" fill="url(#deskGrad)" rx="4" filter="url(#shadow)" />
                        <rect x="80" y="250" width="60" height="80" fill="#5D5FEF" rx="8" filter="url(#shadow)" />
                        <rect x="75" y="320" width="70" height="8" fill="#4C4ED8" rx="4" />
                        <rect x="80" y="240" width="60" height="15" fill="#5D5FEF" rx="4" />
                        <circle cx="200" cy="140" r="35" fill="url(#skinGrad)" filter="url(#shadow)" />
                        <rect x="175" y="175" width="50" height="80" fill="#FFFFFF" rx="4" filter="url(#shadow)" />
                        <rect x="165" y="250" width="70" height="60" fill="#5D5FEF" rx="6" filter="url(#shadow)" />
                        <ellipse cx="200" cy="110" rx="40" ry="25" fill="#8B4513" filter="url(#shadow)" />
                        <rect x="170" y="120" width="60" height="15" fill="#654321" rx="2" />
                        <ellipse cx="200" cy="125" rx="35" ry="8" fill="#A0522D" />
                        <rect x="160" y="240" width="80" height="8" fill="#D1D5DB" rx="2" filter="url(#shadow)" />
                        <rect x="162" y="220" width="76" height="22" fill="#E5E7EB" rx="2" filter="url(#shadow)" />
                        <rect x="165" y="223" width="70" height="16" fill="#1A1A1A" rx="1" />
                        <rect x="168" y="226" width="64" height="10" fill="#3B82F6" opacity="0.3" />
                        <ellipse cx="195" cy="248" rx="8" ry="10" fill="url(#skinGrad)" />
                        <ellipse cx="240" cy="200" rx="8" ry="18" fill="url(#skinGrad)" />
                        <line x1="245" y1="185" x2="245" y2="205" stroke="#FBD5B8" strokeWidth="3" strokeLinecap="round" />
                        <line x1="250" y1="190" x2="250" y2="200" stroke="#FBD5B8" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="245" cy="183" r="2" fill="#FBD5B8" />
                        <circle cx="250" cy="188" r="2" fill="#FBD5B8" />
                        <rect x="313" y="275" width="14" height="20" fill="#8B4513" rx="2" />
                        <ellipse cx="320" cy="260" rx="18" ry="25" fill="#22C55E" filter="url(#shadow)" />
                        <ellipse cx="315" cy="265" rx="12" ry="18" fill="#16A34A" />
                        <ellipse cx="325" cy="265" rx="12" ry="18" fill="#16A34A" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card flex-shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Upcoming events</h2>
                    <a href="#" className="text-[#5D5FEF] text-sm font-medium hover:underline">
                      See all
                    </a>
                  </div>

                  <div className="space-y-3">
                    {/* Event Card 1 */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1 text-sm leading-snug">
                          The main event in your life &quot;Robot Fest&quot; will coming soon in...
                        </div>
                        <div className="text-xs text-[#6B7280]">14 December 2023 12.00 pm</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Event Card 2 */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1 text-sm">
                          Webinar of new tools in Minecraft
                        </div>
                        <div className="text-xs text-[#6B7280]">21 December 2023 11.00 pm</div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Linked Teachers Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Linked Teachers</h2>
                    <a href="#" className="text-[#5D5FEF] text-sm font-medium hover:underline">
                      See all
                    </a>
                  </div>

                  <div className="space-y-3">
                    {/* Teacher Card 1 */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors teacher-card interactive-element">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
                        MJ
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1 text-base">Mary Johnson (mentor)</div>
                        <div className="text-sm text-[#6B7280]">Science</div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button className="text-gray-600 hover:text-[#5D5FEF] transition-colors" title="Message">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-[#5D5FEF] transition-colors" title="Contact">
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Teacher Card 2 */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors teacher-card interactive-element">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
                        JB
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#1A1A1A] mb-1 text-base">James Brown</div>
                        <div className="text-sm text-[#6B7280]">Foreign language (Chinese)</div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button className="text-gray-600 hover:text-[#5D5FEF] transition-colors" title="Message">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-[#5D5FEF] transition-colors" title="Contact">
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Calendar & Events */}
              <div className="flex flex-col gap-3 h-full">
                {/* Calendar Section */}
                <div className="bg-white rounded-2xl p-5 shadow-sm dashboard-card h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-3 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Calendar</h2>
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setTodayOpen(!todayOpen)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#5D5FEF] transition-colors"
                      >
                        Today
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {todayOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[100px] z-50 dropdown-menu">
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setTodayOpen(false)}>Today</button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setTodayOpen(false)}>Tomorrow</button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setTodayOpen(false)}>This Week</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3 flex-shrink-0">6 events today</p>

                  {/* Timeline */}
                  <div className="relative pl-4">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    {/* Time markers and events */}
                    <div className="space-y-3">
                      {['10:00', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'].map((time, idx) => {
                        const event = calendarEvents.find(e => e.time === time);
                        if (event) {
                          return (
                            <div key={time} className="relative">
                              {/* Time marker */}
                              <div className="absolute -left-4 top-4">
                                <div className={`w-8 h-8 rounded-full ${event.active ? 'bg-white border-2 border-[#5D5FEF]' : 'bg-white border-2 border-gray-300'} flex items-center justify-center`}>
                                  <div className={`w-2 h-2 rounded-full ${event.active ? 'bg-[#5D5FEF]' : 'bg-gray-400'}`}></div>
                                </div>
                              </div>
                              {/* Event card */}
                              <div className={`${event.active ? 'bg-[#5D5FEF] text-white active' : 'bg-gray-50 text-[#1A1A1A] calendar-event'} rounded-xl p-4 shadow-sm ml-4 relative interactive-element`}>
                                <div className="flex items-start gap-3">
                                  <div className={`${event.active ? 'bg-white/20' : 'bg-gray-200'} rounded-full p-2 flex-shrink-0`}>
                                    <Home className={`w-4 h-4 ${event.active ? 'text-white' : 'text-gray-600'}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className={`font-semibold mb-1 text-sm ${event.active ? 'text-white' : 'text-[#1A1A1A]'}`}>
                                      {event.title}
                                    </div>
                                    <div className={`text-xs ${event.active ? 'text-white/80' : 'text-[#6B7280]'}`}>
                                      {event.displayTime}, {event.lesson}
                                    </div>
                                  </div>
                                </div>
                                {/* Vertical line extending from card (for active event) */}
                                {event.active && (
                                  <div className="absolute left-0 bottom-0 w-0.5 bg-[#5D5FEF] translate-y-full" style={{ height: '48px' }}></div>
                                )}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={time} className="relative">
                            <div className="absolute -left-4 top-1">
                              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                            <div className="text-xs text-gray-400 ml-6 mb-2">{time}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: RECENT TASKS & PRACTICE (copied from Student Dashboard) */}
        <section 
          id="tasks" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['tasks'] = el; }}
        >
          <div className="w-full px-4 py-4 h-full">
            {/* TaskSection already contains its own white cards and max-width container */}
            <TaskSection />
          </div>
        </section>

        {/* SECTION 2: PERFORMANCE */}
        <section 
          id="performance" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['performance'] = el; }}
        >
          <div className="w-full px-3 py-2 h-full">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Left Half - Subject Performance (unchanged) */}
              <div className="bg-white rounded-2xl p-4 shadow-sm dashboard-card overflow-y-auto">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
                  📊 Subject Performance
                </h2>
                
                {/* Bar Chart - Horizontal */}
                <div className="h-[220px] mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Python', score: 92, color: '#6C5CE7' },
                        { name: 'Java', score: 88, color: '#0984E3' },
                        { name: 'JavaScript', score: 85, color: '#00B894' },
                        { name: 'React', score: 88, color: '#FDCB6E' },
                        { name: 'HTML/CSS', score: 95, color: '#E17055' },
                        { name: 'C++', score: 82, color: '#A0AEC0' },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis 
                        type="number"
                        domain={[0, 100]}
                        tick={{ fill: '#636E72', fontSize: 10, fontWeight: 500 }}
                        axisLine={{ stroke: '#DFE6E9' }}
                        tickLine={{ stroke: '#DFE6E9' }}
                      />
                      <YAxis 
                        type="category"
                        dataKey="name"
                        tick={{ fill: '#1A1A1A', fontSize: 11, fontWeight: 500 }}
                        axisLine={false}
                        tickLine={false}
                        width={90}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #DFE6E9', 
                          borderRadius: '8px',
                          fontSize: '12px',
                          padding: '6px 10px'
                        }}
                        formatter={(value: number) => `${value}%`}
                      />
                      <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                        {[
                          { name: 'Python', score: 92, color: '#6C5CE7' },
                          { name: 'Java', score: 88, color: '#0984E3' },
                          { name: 'JavaScript', score: 85, color: '#00B894' },
                          { name: 'React', score: 88, color: '#FDCB6E' },
                          { name: 'HTML/CSS', score: 95, color: '#E17055' },
                          { name: 'C++', score: 82, color: '#A0AEC0' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList 
                          dataKey="score" 
                          position="right" 
                          style={{ fill: '#2D3436', fontSize: '11px', fontWeight: '600' }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Remarks Section */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex flex-col items-center p-2 bg-[#6C5CE7]/5 rounded-lg border border-[#6C5CE7]/20">
                    <span className="text-xs font-semibold text-[#2D3436] mb-0.5">Python</span>
                    <span className="text-[10px] text-[#00B894] font-medium">Excellent</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Strong in Data Structures</p>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#0984E3]/5 rounded-lg border border-[#0984E3]/20">
                    <span className="text-xs font-semibold text-[#2D3436] mb-0.5">Java</span>
                    <span className="text-[10px] text-[#00B894] font-medium">Very Good</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">OOP concepts mastered</p>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#00B894]/5 rounded-lg border border-[#00B894]/20">
                    <span className="text-xs font-semibold text-[#2D3436] mb-0.5">JavaScript</span>
                    <span className="text-[10px] text-[#00B894] font-medium">Good</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Strong DOM manipulation</p>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#FDCB6E]/5 rounded-lg border border-[#FDCB6E]/20">
                    <span className="text-xs font-semibold text-[#2D3436] mb-0.5">React</span>
                    <span className="text-[10px] text-[#00B894] font-medium">Very Good</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Component patterns</p>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#E17055]/5 rounded-lg border border-[#E17055]/20">
                    <span className="text-xs font-semibold text-[#2D3436] mb-0.5">HTML/CSS</span>
                    <span className="text-[10px] text-[#00B894] font-medium">Excellent</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Responsive design expert</p>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#A0AEC0]/5 rounded-lg border border-[#A0AEC0]/20">
                    <span className="text-xs font-semibold text-[#2D3436] mb-0.5">C++</span>
                    <span className="text-[10px] text-[#00B894] font-medium">Good</span>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">Algorithm implementation</p>
                  </div>
                </div>
              </div>

              {/* Right Half - Report Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm dashboard-card overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Report Card</h2>
                  <button 
                    onClick={() => {
                      // PDF download functionality would go here
                      window.print();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5D5FEF] text-white rounded-lg hover:bg-[#4C4ED8] transition-colors text-xs font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>

                {/* Congratulatory Message */}
                <div className="text-center mb-3">
                  <p className="text-xs text-[#1A1A1A] leading-tight">
                    Congratulations, Sarah! Your hard work and dedication have paid off. Here&apos;s a detailed overview of your academic performance this semester.
                  </p>
                </div>

                {/* Academic Performance Section */}
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">Academic Performance</h3>
                  <p className="text-xs text-gray-600 mb-2">Semester 1, 2024</p>
                  <div className="text-2xl font-bold text-[#5D5FEF]">Overall Grade: A</div>
                </div>

                {/* Subject-wise Performance Table */}
                <div className="mb-3">
                  <h3 className="text-sm font-bold text-[#1A1A1A] mb-2">Subject-wise Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left py-1.5 px-2 font-bold text-[#1A1A1A] text-xs">SUBJECT</th>
                          <th className="text-left py-1.5 px-2 font-bold text-[#1A1A1A] text-xs">GRADE</th>
                          <th className="text-left py-1.5 px-2 font-bold text-[#1A1A1A] text-xs">MARKS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-[#1A1A1A] font-medium text-xs">Python</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A</td>
                          <td className="py-1.5 px-2 text-[#1A1A1A] text-xs">92/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-[#1A1A1A] font-medium text-xs">Java</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A-</td>
                          <td className="py-1.5 px-2 text-[#1A1A1A] text-xs">88/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-[#1A1A1A] font-medium text-xs">JavaScript</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">B+</td>
                          <td className="py-1.5 px-2 text-[#1A1A1A] text-xs">85/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-[#1A1A1A] font-medium text-xs">React</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A-</td>
                          <td className="py-1.5 px-2 text-[#1A1A1A] text-xs">88/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-[#1A1A1A] font-medium text-xs">HTML/CSS</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">A</td>
                          <td className="py-1.5 px-2 text-[#1A1A1A] text-xs">95/100</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-1.5 px-2 text-[#1A1A1A] font-medium text-xs">C++</td>
                          <td className="py-1.5 px-2 font-bold text-blue-600 text-xs">B</td>
                          <td className="py-1.5 px-2 text-[#1A1A1A] text-xs">82/100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Overall Remarks Section */}
                <div className="mb-0">
                  <h3 className="text-sm font-bold text-[#1A1A1A] mb-1.5">Overall Remarks</h3>
                  <p className="text-xs text-[#1A1A1A] leading-tight">
                    Sarah has shown significant improvement throughout the semester. Her dedication to learning and consistent effort are commendable. Keep up the great work!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ATTENDANCE */}
        <section 
          id="attendance" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['attendance'] = el; }}
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm dashboard-card">
              {/* Import and use Attendance component */}
              <Attendance />
            </div>
          </div>
        </section>

        {/* SECTION 4: FEEDBACK */}
        <section 
          id="feedback" 
          className="dashboard-section"
          ref={(el) => { sectionsRef.current['feedback'] = el; }}
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="bg-white rounded-2xl shadow-sm dashboard-card">
              {/* Import and use the Feedback component */}
              <div className="feedback-section">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  {/* Left side - Feedback Form */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Feedback & Suggestions</h2>
                    <p className="text-gray-600 mb-8">
                      Share your thoughts to help us improve your child's learning experience
                    </p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student's Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Student's name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Class/Grade"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Category</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                          <option value="">Select a category</option>
                          <option value="teaching">Teaching</option>
                          <option value="communication">Communication</option>
                          <option value="infrastructure">Infrastructure</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Your feedback message"
                        ></textarea>
                      </div>
                      <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors">
                        Submit Feedback
                      </button>
                    </div>
                  </div>

                  {/* Right side - Feedback Summary */}
                  <div>
                    <div className="bg-gray-50 rounded-xl p-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Feedback Summary</h3>
                      {/* Chart will be added here */}
                      <div className="aspect-square max-w-md mx-auto mb-8 bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                            <span>Teaching (40%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                            <span>Communication (30%)</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span>Infrastructure (20%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                            <span>Others (10%)</span>
                          </div>
                        </div>
                      </div>

                      {/* Recent Comments */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Comments</h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-700">The math classes are great!</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-700">Would love more updates about homework</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
