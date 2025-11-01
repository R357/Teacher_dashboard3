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
import Navbar from './navbar'; // ✅ Importing the new FloatingDock Navbar

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

  // Mock data for visit charts (donut charts)
  const visitData = [
    { name: 'Algorithms structures', value: 92, fill: '#3B82F6' },
    { name: 'Object program.', value: 83, fill: '#3B82F6' },
    { name: 'Database program.', value: 78, fill: '#3B82F6' },
    { name: 'Web develop.', value: 97, fill: '#3B82F6' },
    { name: 'Mobile application', value: 96, fill: '#3B82F6' },
    { name: 'Machine learning', value: 89, fill: '#3B82F6' },
  ];

  // Calendar events
  const calendarEvents = [
    { time: '10:00', title: 'Electronics lesson', duration: '9.45-10.30', lesson: '21 lesson', color: 'bg-blue-500' },
    { time: '11:00', title: 'Electronics lesson', duration: '11.00-11.40', lesson: '23 lesson', color: 'bg-gray-200' },
    { time: '12:00', title: 'Robotics lesson', duration: '12.00-12.45', lesson: '23 lesson', color: 'bg-gray-200' },
    { time: '13:00', title: 'C++ lesson', duration: '13.45-14.30', lesson: '21 lesson', color: 'bg-gray-200' },
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
    <div className="min-h-screen bg-gray-50 p-6 relative z-0">
      {/* ✅ Floating Dock Navbar */}
      <Navbar />

      {/* ✅ Dashboard Content */}
      <div className="pt-24">
        {/* Main Content - Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Hello Grace Section */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Hello Grace!</h2>
                  <p className="text-gray-600 mb-2">
                    You have 3 new tasks. It is a lot of work for today! So let's start!
                  </p>
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Review it
                  </a>
                </div>
                <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
            </div>

            {/* Performance Section */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Performance</h3>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition">
                  <span className="text-gray-700 text-sm">December</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-4xl font-bold text-gray-800">95.4</span>
                    <p className="text-gray-600 text-sm mt-1">Introduction to programming.</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                    All lessons.
                  </button>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
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
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3B82F6" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Linked Teachers Section */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Linked Teachers</h3>
                <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                  See all
                </a>
              </div>

              <div className="space-y-4">
                {[
                  { initials: 'MJ', name: 'Mary Johnson (mentor)', subject: 'Science' },
                  { initials: 'JB', name: 'James Brown', subject: 'Foreign language (Chinese)' },
                ].map((teacher, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {teacher.initials}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{teacher.name}</h4>
                        <p className="text-sm text-gray-600">{teacher.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
                      <Phone className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* My Visit Section */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">My visit</h3>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition">
                  <span className="text-gray-700 text-sm">December</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Donut Charts Grid */}
              <div className="grid grid-cols-2 gap-8">
                {visitData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full h-32 flex items-center justify-center">
                      <DonutChart data={item} percentage={item.value} />
                    </div>
                    <p className="text-xs text-gray-600 mt-3 text-center leading-tight">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar Section */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Calendar</h3>
                  <p className="text-sm text-gray-600 mt-1">6 events today</p>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition">
                  <span className="text-gray-700 text-sm">Today</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Timeline */}
              <div className="relative mt-6 pl-20">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                <div className="space-y-6">
                  {calendarEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4 relative">
                      <div className="absolute -left-12 top-0 z-10">
                        <div className="text-xs text-gray-600 font-medium">{event.time}</div>
                      </div>
                      <div
                        className={`${event.color} ${
                          event.time === '10:00' ? 'text-white' : 'text-gray-800'
                        } rounded-lg p-3 flex-1 shadow-sm`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {event.time === '10:00' ? (
                            <Home className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                          )}
                          <h4
                            className={`font-semibold ${
                              event.time === '10:00' ? 'text-white' : 'text-gray-800'
                            }`}
                          >
                            {event.title}
                          </h4>
                        </div>
                        <p
                          className={`text-xs ${
                            event.time === '10:00' ? 'text-white/90' : 'text-gray-600'
                          }`}
                        >
                          {event.duration}, {event.lesson}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Upcoming events</h3>
                <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                  See all
                </a>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">
                      {event.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">{event.title}</h4>
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
    </div>
  );
}
