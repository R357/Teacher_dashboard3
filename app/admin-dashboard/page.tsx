'use client';

import React from 'react';
import {
  Phone,
  Mail,
  Home,
  ChevronDown,
  MoreVertical,
  Users,
  Book,
  Bell,
  LogOut,
  BookOpen,
  FileText,
  ClipboardList,
  BarChart3,
  CheckSquare,
  User,
  GraduationCap,
  Megaphone,
  ScrollText,
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
import ScrollAnimator from './components/ScrollAnimator';
import TeacherSection from './sections/TeacherSection';
import StudentSection from './sections/StudentSection';
import AnnouncementSection from './sections/AnnouncementSection';
import ParentSection from './sections/ParentSection';

export default function AdminDashboard() {
  // Mock data for overall performance chart (e.g., by department)
  const overallPerformanceData = [
    { name: 'Computer Science', score: 82.1 },
    { name: 'Humanities', score: 88.5 },
    { name: 'Mathematics', score: 79.0 },
    { name: 'Natural Sciences', score: 85.3 },
    { name: 'Arts & Design', score: 90.2 },
    { name: 'Business', score: 81.7 },
  ];

  // Mock data for school-wide attendance (e.g., by grade level)
  const schoolAttendanceData = [
    { name: 'Grade 9', value: 95, fill: '#3B82F6' },
    { name: 'Grade 10', value: 92, fill: '#10B981' },
    { name: 'Grade 11', value: 93, fill: '#F59E0B' },
    { name: 'Grade 12', value: 89, fill: '#EF4444' },
    { name: 'Faculty', value: 98, fill: '#6366F1' },
    { name: 'Staff', value: 99, fill: '#8B5CF6' },
  ];

  // Admin/School-wide calendar events
  const calendarEvents = [
    { time: '09:00', title: 'All-Faculty Meeting', duration: '9.00-10.30', location: 'Auditorium', color: 'bg-blue-500' },
    { time: '11:00', title: 'Board of Directors Call', duration: '11.00-11.40', location: 'Admin Office', color: 'bg-gray-200' },
    { time: '14:00', title: 'Budget Review: Q4', duration: '14.00-15.45', location: 'Conf. Room 3', color: 'bg-gray-200' },
  ];

  // Admin tasks or school announcements
  const upcomingTasks = [
    {
      icon: '📅',
      title: "Approve 'Robot Fest' event budget and schedule.",
      date: 'Due: 15 December 2023',
    },
    {
      icon: '📚',
      title: 'Review new curriculum proposals for Science dept.',
      date: 'Due: 18 December 2023',
    },
  ];

  // Custom donut chart component
  const DonutChart = ({ data, percentage }: { data: any; percentage: number }) => {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={[data, { name: 'remaining', value: 100 - data.value, fill: '#E5E7EB' }]}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              <Cell key={`cell-0`} fill={data.fill} />
              <Cell key={`cell-1`} fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-gray-700">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 relative z-0">
      {/* Floating Dock Navbar */}
      <Navbar />

      <div className="pt-20 sm:pt-24">
        
        {/* === START OF 3-COLUMN ADMIN LAYOUT === */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* === Left Column (Admin POV) === */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Admin Welcome / Overview */}
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Admin Overview</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      Key metrics for the institution. You have 2 pending tasks.
                    </p>
                    <a href="#teachers" className="text-blue-600 hover:underline font-medium text-sm">
                      Review Tasks
                    </a>
                  </div>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-100 rounded-lg flex items-center justify-center ml-2 sm:ml-4">
                    <div className="text-4xl sm:text-6xl">📊</div>
                  </div>
                </div>
              </div>

              {/* Overall Performance Section */}
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Student Performance</h3>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 sm:px-3 cursor-pointer hover:bg-gray-50 transition">
                    <span className="text-gray-700 text-xs sm:text-sm">This Semester</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-3xl sm:text-4xl font-bold text-gray-800">84.3%</span>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">Avg. Score (All Departments)</p>
                    </div>
                    <button className="bg-blue-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition text-xs sm:text-sm font-medium">
                      Full Report
                    </button>
                  </div>
                </div>
                {/* Bar Chart (Department Scores) */}
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={overallPerformanceData}
                      layout="vertical"
                      barSize={20}
                      margin={{ left: 100, right: 40, top: 10, bottom: 10 }}
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100}
                        fontSize={11}
                        tick={{ fill: '#6B7280' }}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                        <LabelList
                          dataKey="score"
                          position="right"
                          style={{ fill: '#374151', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        {overallPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#3B82F6" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Faculty Overview Section */}
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Faculty Overview</h3>
                  <a href="#teachers" className="text-blue-600 hover:underline text-xs sm:text-sm font-medium">
                    Manage All
                  </a>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { initials: 'MJ', name: 'Dr. Mary Johnson', subject: 'Head of Science' },
                    { initials: 'JB', name: 'James Brown', subject: 'Head of Arts' },
                    { initials: 'LS', name: 'Dr. Li Smith', subject: 'Head of CompSci' },
                  ].map((teacher, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                          {teacher.initials}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{teacher.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{teacher.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === Middle Column (Admin POV) === */}
            <div className="space-y-4 sm:space-y-6">
              {/* Overall Attendance Section */}
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">School Attendance</h3>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 sm:px-3 cursor-pointer hover:bg-gray-50 transition">
                    <span className="text-gray-700 text-xs sm:text-sm">Today</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                {/* Donut Charts Grid (Grade Levels) */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  {schoolAttendanceData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-full h-28 sm:h-32 flex items-center justify-center">
                        <DonutChart data={item} percentage={item.value} />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 sm:mt-3 text-center leading-tight">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === Right Column (Admin POV) === */}
            <div className="space-y-4 sm:space-y-6">
              {/* School Calendar Section */}
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">School Calendar</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">3 major events today</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 sm:px-3 cursor-pointer hover:bg-gray-50 transition">
                    <span className="text-gray-700 text-xs sm:text-sm">Today</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                {/* Timeline */}
                <div className="relative mt-4 sm:mt-6 pl-16 sm:pl-20">
                  <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  <div className="space-y-4 sm:space-y-6">
                    {calendarEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 relative">
                        <div className="absolute -left-10 sm:-left-12 top-0 z-10">
                          <div className="text-xs text-gray-600 font-medium">{event.time}</div>
                        </div>
                        <div
                          className={`${event.color} ${
                            event.time === '09:00' ? 'text-white' : 'text-gray-800'
                          } rounded-lg p-2 sm:p-3 flex-1 shadow-sm`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {event.time === '09:00' ? (
                              <Users className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                            )}
                            <h4
                              className={`font-semibold text-xs sm:text-sm ${
                                event.time === '09:00' ? 'text-white' : 'text-gray-800'
                              }`}
                            >
                              {event.title}
                            </h4>
                          </div>
                          <p 
                            className={`text-xs ${
                              event.time === '09:00' ? 'text-white/90' : 'text-gray-600'
                            }`}
                          >
                            {event.duration}, {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pending Tasks Section */}
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Pending Tasks</h3>
                  <a href="#teachers" className="text-blue-600 hover:underline text-xs sm:text-sm font-medium">
                    See all
                  </a>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {upcomingTasks.map((event, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                        {event.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-1 text-xs sm:text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.date}</p>
                      </div>
                      <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* === END OF 3-COLUMN ADMIN LAYOUT === */}


        {/* === START OF SCROLLING SECTIONS WITH PARALLAX ANIMATION === */}
        
        <ScrollAnimator className="w-full">
          <TeacherSection />
        </ScrollAnimator>
        
        <ScrollAnimator className="w-full">
          <StudentSection />
        </ScrollAnimator>

        <ScrollAnimator className="w-full">
          <AnnouncementSection />
        </ScrollAnimator>

        <ScrollAnimator className="w-full">
          <ParentSection />
        </ScrollAnimator>
        
        {/* === END OF SCROLLING SECTIONS === */}

      </div>
    </div>
  );
}  
   