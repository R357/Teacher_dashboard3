'use client';

import React from 'react';
// === EDITED: Removed useScroll and useTransform ===
import { motion, Variants } from 'framer-motion';
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
  // Mock data (no changes)
 
  const overallPerformanceData = [
    { name: 'Computer Science', score: 82.1 },
    { name: 'Humanities', score: 88.5 },
    { name: 'Mathematics', score: 79.0 },
    { name: 'Natural Sciences', score: 85.3 },
    { name: 'Arts & Design', score: 90.2 },
    { name: 'Business', score: 81.7 },
  ];
  const schoolAttendanceData = [
    { name: 'Grade 9', value: 95, fill: '#3B82F6' },
    { name: 'Grade 10', value: 92, fill: '#10B981' },
    { name: 'Grade 11', value: 93, fill: '#F59E0B' },
    { name: 'Grade 12', value: 89, fill: '#EF4444' },
    { name: 'Faculty', value: 98, fill: '#6366F1' },
    { name: 'Staff', value: 99, fill: '#8B5CF6' },
  ];
  const calendarEvents = [
    { title: 'All-Faculty Meeting', duration: '9.00-10.30', location: 'Auditorium', color: 'bg-blue-500' },
    { title: 'Board of Directors Call', duration: '11.00-11.40', location: 'Admin Office', color: 'bg-gray-200' },
    { title: 'Budget Review: Q4', duration: '14.00-15.45', location: 'Conf. Room 3', color: 'bg-gray-200' },
  ];
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

  // Donut chart component (no changes)
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
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              <Cell key={`cell-0`} fill={data.fill} />
              <Cell key={`cell-1`} fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl font-bold text-gray-700"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    );
  };

  // Variants for the main 3-column grid container (Idea 1)
  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each column animates 0.2s after the previous
        delayChildren: 0.5,  // Wait 0.5s after navbar
      },
    },
  };

  // Variants for columns (Idea 1)
  const columnLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
  const columnRightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
  const columnMiddleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Staggered list container variants (for lists inside cards)
  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5, 
      },
    },
  };

  // Staggered list item variants (slide from left)
  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  // Staggered list item variants (slide from right)
  const taskItemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };
  
  // === REMOVED hooks for Idea 5 (Scroll Transition) ===


  return (
    <div className="bg-gray-50 relative z-0">
      {/* Navbar animation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <Navbar />
      </motion.div>

      <div className="pt-24">
        
        {/* === REMOVED motion.div wrapper for Idea 5 === */}
        {/* === START OF 3-COLUMN ADMIN LAYOUT === */}
        <div className="p-6">
          {/* === EDITED: Added motion.div wrapper for Idea 1 (Grand Entrance) === */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* === Left Column === */}
            {/* === EDITED: Added column variants and perspective for 3D tilt (Idea 2) === */}
            <motion.div 
              className="space-y-6 flex flex-col" 
              variants={columnLeftVariants}
              style={{ perspective: 1000 }} // For 3D tilt
            >
              
              {/* Admin Welcome / Overview */}
              {/* === EDITED: Added Idea 2 (3D Tilt) === */}
              <motion.div
                className="bg-gray-100 rounded-xl p-6 shadow-sm"
                whileHover={{ scale: 1.03, rotateY: 10 }} // Tilt
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Overview</h2>
                    <p className="text-gray-600 mb-2">
                      Key metrics for the institution. You have 2 pending tasks.
                    </p>
                    <motion.a
                      href="#teachers"
                      className="text-blue-600 hover:underline font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Review Tasks
                    </motion.a>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center ml-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }} // "Breathe"
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-6xl"
                    >
                      📊
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Student Performance Section */}
              {/* === EDITED: Added Idea 2 (3D Tilt) === */}
              <motion.div
                className="bg-gray-100 rounded-xl p-6 shadow-sm flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateY: 10 }} // Tilt
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Student Performance</h3>
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="text-gray-700 text-sm">Classes 1-10</span>
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </motion.div>
                    </motion.div>
                    <motion.button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Full Report
                    </motion.button>
                  </div>
                </div>

                {/* Bar Chart (Department Scores) */}
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={overallPerformanceData}
                      layout="vertical"
                      barSize={20}
                      margin={{ left: 10, right: 40, top: 0, bottom: 0 }}
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100} 
                        fontSize={11}
                        tick={{ fill: '#6B7280' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="score" 
                        fill="#3B82F6" 
                        radius={[0, 4, 4, 0]}
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
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
              </motion.div>
            </motion.div>

            {/* === Middle Column === */}
            {/* === EDITED: Added column variants and perspective for 3D tilt (Idea 2) === */}
            <motion.div 
              className="space-y-6 flex flex-col" 
              variants={columnMiddleVariants}
              style={{ perspective: 1000 }} // For 3D tilt
            >
              {/* Overall Attendance Section */}
              {/* === EDITED: Added Idea 2 (3D Tilt) === */}
              <motion.div
                className="bg-gray-100 rounded-xl p-6 shadow-sm flex-1"
                whileHover={{ scale: 1.03, rotateX: 5 }} // Tilt
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">School Attendance</h3>
                  <motion.div
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-gray-700 text-sm">Today</span>
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </motion.div>
                </div>
                {/* Donut Charts Grid (Grade Levels) */}
                <div className="grid grid-cols-2 gap-8">
                  {schoolAttendanceData.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 1.0, type: "spring", stiffness: 100 }} // Increased delay
                    >
                      <div className="w-full h-32 flex items-center justify-center">
                        <DonutChart data={item} percentage={item.value} />
                      </div>
                      <motion.p 
                        className="text-xs text-gray-600 mt-3 text-center leading-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 1.2 }} // Increased delay
                      >
                        {item.name}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* === Right Column === */}
            {/* === EDITED: Added column variants and perspective for 3D tilt (Idea 2) === */}
            <motion.div 
              className="space-y-6 flex flex-col" 
              variants={columnRightVariants}
              style={{ perspective: 1000 }} // For 3D tilt
            >
              
              {/* School Calendar Section */}
              {/* === EDITED: Added Idea 2 (3D Tilt) === */}
              <motion.div
                className="bg-gray-100 rounded-xl p-6 shadow-sm flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateY: -10 }} // Tilt
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">School Calendar</h3>
                    <p className="text-sm text-gray-600 mt-1">3 major events today</p>
                  </div>
                  <motion.div
                    className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-gray-700 text-sm">Today</span>
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </motion.div>
                </div>
                {/* Timeline */}
                <div className="relative mt-6 pl-8 flex-1">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  <motion.div 
                    className="space-y-6"
                    variants={listContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {calendarEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 relative"
                        variants={listItemVariants}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div
                          className={`${event.color} ${
                            event.title === 'All-Faculty Meeting' ? 'text-white' : 'text-gray-800'
                          } rounded-lg p-3 flex-1 shadow-sm`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {event.title === 'All-Faculty Meeting' ? (
                              <Users className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                            )}
                            <h4
                              className={`font-semibold ${
                                event.title === 'All-Faculty Meeting' ? 'text-white' : 'text-gray-800'
                              }`}
                            >
                              {event.title}
                            </h4>
                          </div>
                          <p 
                            className={`text-xs ${
                              event.title === 'All-Faculty Meeting' ? 'text-white/90' : 'text-gray-600'
                            }`}
                          >
                            {event.duration}, {event.location}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Pending Tasks Section */}
              {/* === EDITED: Added Idea 2 (3D Tilt) === */}
              <motion.div
                className="bg-gray-100 rounded-xl p-6 shadow-sm flex-1 flex flex-col"
                whileHover={{ scale: 1.03, rotateY: -10 }} // Tilt
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Pending Tasks</h3>
                  <motion.a
                    href="#teachers"
                    className="text-blue-600 hover:underline text-sm font-medium"
                    whileHover={{ scale: 1.05, x: [0, 2, -2, 2, 0] }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 500 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    See all
                  </motion.a>
                </div>
                <motion.div 
                  className="space-y-4 flex-1"
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {upcomingTasks.map((event, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-lg p-4 flex items-start gap-4"
                      variants={taskItemVariants}
                      whileHover={{ scale: 1.03 }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                      >
                        {event.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.date}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        className="flex-shrink-0"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        
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