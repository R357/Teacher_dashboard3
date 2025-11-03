'use client';

import React from 'react';
import {
  Phone,
  Mail,
  Home,
  ChevronDown,
  MoreVertical,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';

import Navbar from './navbar'; 
import '../parent-dashboard/dashboard.css';
import SlideIn from './components/SlideIn';
import ParticlesBackground from './components/ParticlesBackground';

import ScrollAnimator from './components/ScrollAnimator';   
import Subjects from './sections/Subjects';      
import Assignments from './sections/Assignments';
import Results from './sections/Results';
import Attendance from './sections/Attendance';
import Exams from './sections/Exams';

export default function StudentDashboard() {
  // Mock data for performance chart
  const performanceData = [
    { name: 'Algorithms structures', score: 85.3 },
    { name: 'Object program.', score: 64.7 },
    { name: 'Database program.', score: 84.2 },
    { name: 'Web develop.', score: 45.6 },
    { name: 'Mobile application', score: 43.5 },
    { name: 'Machine learning', score: 74.4 },
  ];

  // Calendar events - Today, Tomorrow, Day after tomorrow
  const calendarEvents = [
    { 
      day: 'Today', 
      title: 'Electronics lesson', 
      duration: '9.45-10.30', 
      lesson: '21 lesson', 
      color: 'bg-blue-500',
      isActive: true 
    },
    { 
      day: 'Tomorrow', 
      title: 'Robotics lesson', 
      duration: '12.00-12.45', 
      lesson: '23 lesson', 
      color: 'bg-gray-200',
      isActive: false 
    },
    { 
      day: 'Day after tomorrow', 
      title: 'C++ lesson', 
      duration: '13.45-14.30', 
      lesson: '21 lesson', 
      color: 'bg-gray-200',
      isActive: false 
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      icon: '🤖',
      title: "The main event in your life 'Robot Fest' will coming soon in...",
      date: '14 December 2023 12.00 pm',
    },
    {
      icon: '🎮',
      title: 'Webinar of new tools in Minecraft',
      date: '21 December 2023 11.00 pm',
    },
  ];

  return (
    <div className="relative min-h-screen font-sans" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
<<<<<<< HEAD
      {/* Blue Background */}
      <div className="fixed inset-0 -z-10 w-full h-full" style={{ backgroundColor: '#1e3a8a' }}></div>
=======
      {/* Blue Gradient Background */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900"></div>
>>>>>>> 79a663ffb9bef9e24f4c11aca6ae091ea88a9595
      
      {/* Interactive Particles Background */}
      <ParticlesBackground />
      
      {/* Floating Dock Navbar */}
      <Navbar />

      {/* Dashboard Content Wrapper */}
      <div className="pt-24 relative z-0">
        
        {/* === START OF EXISTING LAYOUT === */}
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Spans 2 columns */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              
              {/* Hello Grace Section - SLIDES FROM LEFT */}
              <SlideIn direction="left" delay={0}>
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 shadow-lg border border-white/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1">Hello Grace!</h2>
                      <p className="text-white mb-1 text-sm">
                        You have 3 new tasks. It is a lot of work for today! So let's start!
                      </p>
                      <a href="#" className="text-white hover:underline font-medium text-sm">
                        Review it
                      </a>
                    </div>
                    <div className="w-24 h-24 backdrop-blur-md bg-blue-500/20 rounded-lg flex items-center justify-center ml-4 border border-blue-400/30">
                      <div className="text-5xl">👨‍💻</div>
                    </div>
                  </div>
                </div>
              </SlideIn>

              {/* Performance Section - SLIDES FROM LEFT */}
              <SlideIn direction="left" delay={100}>
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 shadow-lg border border-white/30 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Performance</h3>
                    <div className="flex items-center gap-2 backdrop-blur-md bg-white/0 rounded-lg px-3 py-1 cursor-pointer hover:bg-white/10 transition border border-white/20">
                      <span className="text-white text-sm">October</span>
                      <ChevronDown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-3xl font-bold text-white">95.4</span>
                        <p className="text-white text-xs mt-1">Introduction to programming</p>
                      </div>
                      <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition text-xs font-medium">
                        All lessons
                      </button>
                    </div>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData.map(item => ({
                          ...item,
                          remaining: 100 - item.score
                        }))}
                        barSize={70}
                        margin={{ top: 30, right: 30, left: 20, bottom: 65 }}
                      >
                        <XAxis
                          dataKey="name"
                          height={0.5}
                          fontSize={10}
                          tick={{ fill: '#FFFFFF' }}
                          tickLine={false}
                          interval={0}
                        />
                        <YAxis
                          domain={[0, 100]}
                          fontSize={11}
                          tick={{ fill: '#FFFFFF' }}
                          tickLine={false}
                        />
                        <Bar dataKey="score" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="remaining" stackId="a" fill="#93C5FD" radius={[4, 4, 0, 0]}>
                          <LabelList
                            dataKey="score"
                            position="top"
                            style={{ fill: '#FFFFFF', fontSize: '12px', fontWeight: 'bold' }}
                            formatter={(value) => `${value}%`}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </SlideIn>

              {/* Linked Teachers Section - SLIDES FROM LEFT */}
              <SlideIn direction="left" delay={200}>
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 shadow-lg border border-white/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Linked Teachers</h3>
                    <a href="#" className="text-white hover:underline text-xs font-medium">
                      See all
                    </a>
                  </div>
                  <div className="space-y-3">
                    {[
                      { initials: 'MJ', name: 'Mary Johnson (mentor)', subject: 'Science' },
                      { initials: 'JB', name: 'James Brown', subject: 'Foreign language (Chinese)' },
                    ].map((teacher, i) => (
                      <div key={i} className="flex items-center justify-between backdrop-blur-md bg-white/10 rounded-lg p-3 border border-white/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/80 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-sm border border-blue-400/30">
                            {teacher.initials}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm">{teacher.name}</h4>
                            <p className="text-xs text-white">{teacher.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white cursor-pointer hover:text-blue-300 transition" />
                          <Phone className="w-4 h-4 text-white cursor-pointer hover:text-blue-300 transition" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>

            </div>

            {/* Right Column - Single column */}
            <div className="space-y-6">
              
              {/* Calendar Section - SLIDES FROM RIGHT */}
              <SlideIn direction="right" delay={0}>
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-lg border border-white/30">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">Calendar</h3>
                  </div>
                  {/* Timeline */}
                  <div className="relative mt-6 pl-20">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                    <div className="space-y-6">
                      {calendarEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-4 relative">
                          <div className="absolute -left-12 top-0 z-10">
                            <div className="text-xs text-white font-medium">{event.day}</div>
                          </div>
                          <div
                            className={`${event.color} backdrop-blur-md ${
                              event.isActive ? 'bg-blue-500/60 text-white border border-blue-400/40' : 'bg-gray-200/10 text-white border border-gray-300/40'
                            } rounded-lg p-3 flex-1 shadow-md`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {event.isActive ? (
                                <Home className="w-4 h-4" />
                              ) : (
                                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                              )}
                              <h4
                                className={`font-semibold text-white`}
                              >
                                {event.title}
                              </h4>
                            </div>
                            <p
                              className={`text-xs text-white`}
                            >
                              {event.duration}, {event.lesson}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideIn>

              {/* Upcoming Events Section - SLIDES FROM RIGHT */}
              <SlideIn direction="right" delay={100}>
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-lg border border-white/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Upcoming events</h3>
                    <a href="#" className="text-white hover:underline text-sm font-medium">
                      See all
                    </a>
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="backdrop-blur-md bg-white/10 rounded-lg p-4 flex items-start gap-4 border border-white/20">
                        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0 border border-blue-400/30">
                          {event.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1 text-sm">{event.title}</h4>
                          <p className="text-xs text-white">{event.date}</p>
                        </div>
                        <MoreVertical className="w-5 h-5 text-white cursor-pointer hover:text-blue-300 transition flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </SlideIn>

            </div>
          </div>
        </div> 
          <Subjects />
          <Assignments />
          <Exams />
          <Attendance />
          <Results />
      </div>
    </div>
  );
}