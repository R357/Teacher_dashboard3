'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Calendar, Clock, Users, FileText, CheckCircle, AlertCircle, TrendingUp, Bell, ArrowRight, User, MessageSquare, Award,Bot, BookOpen, Lightbulb, Sparkles } from "lucide-react";
import Link from 'next/link';
import Navbar from './navbar';
import teacherDashboardAnimation from '../../login(animations)/TeacherDashboard.json';
import ParticlesBackground from '../student-dashboard/components/ParticlesBackground';

export default function TeacherDashboard() {
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Wednesday'>('Today');
  const [isLoaded, setIsLoaded] = useState(true);

  const teacherData = {
    name: 'Teacher',
    pendingTasks: 3,
    scheduleByDay: {
      'Today': [
        {
          id: 1,
          subject: 'Chemistry',
          time: '8:40 - 9:15',
          students: 21,
          type: 'Notes'
        },
        {
          id: 2,
          subject: 'Physics',
          time: '11:00 - 11:35',
          students: 23,
          type: 'Assignment'
        }
      ],
      'Tomorrow': [
        {
          id: 3,
          subject: 'Biology',
          time: '9:00 - 9:30',
          students: 23,
          type: 'Notes'
        },
        {
          id: 4,
          subject: 'Mathematics',
          time: '13:45 - 14:30',
          students: 21,
          type: 'Notes'
        }
      ],
      'Wednesday': [
        {
          id: 5,
          subject: 'EVS',
          time: '10:00 - 10:30',
          students: 25,
          type: 'Assignment'
        },
        {
          id: 6,
          subject: 'Data Structures Lab',
          time: '14:00 - 15:30',
          students: 20,
          type: 'practical'
        }
      ]
    },
    allClasses: [
      {
        id: 1,
        subject: 'Algorithms & Data Structures',
        time: '8:40 - 10:30',
        students: 21,
        day: 'Monday, Wednesday, Friday'
      },
      {
        id: 2,
        subject: 'Database Management',
        time: '11:00 - 11:45',
        students: 23,
        day: 'Tuesday, Thursday'
      },
      {
        id: 3,
        subject: 'Web Development',
        time: '12:00 - 12:45',
        students: 23,
        day: 'Monday, Wednesday'
      },
      {
        id: 4,
        subject: 'Machine Learning Basics',
        time: '13:45 - 14:30',
        students: 21,
        day: 'Tuesday, Friday'
      },
      {
        id: 5,
        subject: 'Object-Oriented Programming',
        time: '10:00 - 11:30',
        students: 25,
        day: 'Wednesday, Thursday'
      },
      {
        id: 6,
        subject: 'Genral Knowledge',
        time: '14:00 - 14:30',
        students: 20,
        day: 'Friday'
      }
    ],
    classPerformance: [
      { subject: 'Physics', score: 85.3 },
      { subject: 'Chemistry', score: 64.7 },
      { subject: 'Biology', score: 84.2 },
      { subject: 'English', score: 45.6 },
      { subject: 'EVS', score: 43.5 },
      { subject: 'Mathematics', score: 74.4 }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'Assignment submission',
        title: 'Student submitted assignment',
        description: 'IN001 Kumar submitted "Quadratic Equations"',
        time: '2 hours ago',
        icon: 'FileText',
        color: 'bg-myblue'
      },
      {
        id: 2,
        type: 'Notes',
        title: 'Mathematics Notes ',
        description: 'Mathematics notes uploaded',
        time: '4 hours ago',
        icon: 'MessageSquare',
        color: 'bg-myblue'
      },
      {
        id: 3,
        type: 'Assignment submission ',
        title: ' IN002 Assignment submitted',
        description: '90% of students passed recent test',
        time: 'recently',
        icon: 'Award',
        color: 'bg-myblue'
      },
      {
        id: 4,
        type: 'Student',
        title: 'New student enrolled',
        description: 'RAMU joined Mathematics Class',
        time: '1 days ago',
        icon: 'User',
        color: 'bg-myblue'
      }
    ],
    pendingApprovals: {
      notes: 5,
      assignments: 8,
      PendingRequests: 2
    },
    announcements: [
      {
        id: 1,
        title: 'Assesment Schedule Released',
        date: '14 December 2025',
        time: '12:00 pm',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Submmission date of assignment',
        date: '18 December 2025',
        time: '09:00 am',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Grading of the assements',
        date: '21 December 2025',
        time: '11:00 am',
        priority: 'high'
      }
    ],
    courses: [
      {
        id: 'math',
        name: 'Mathematics',
        class: 'Class 10th',
        students: 28,
        assignments: 12,
        progress: 68,
        color: 'blue'
      },
      {
        id: 'physics',
        name: 'Physics',
        class: 'Class 7th',
        students: 25,
        assignments: 12,
        progress: 68,
        color: 'purple'
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        class: 'Class 11th',
        students: 30,
        assignments: 12,
        progress: 68,
        color: 'green'
      }
    ]
  };

  type DayKey = 'Today' | 'Tomorrow' | 'Wednesday';
  const currentClasses = teacherData.scheduleByDay[selectedDay as DayKey] || [];

  const getActivityIcon = (iconName: string) => {
    switch(iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'User':
        return <User className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Navbar />
      {/* Blue Gradient Background to match Student Dashboard */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900"></div>
      <ParticlesBackground />

<div className="min-h-screen pt-20 overflow-x-hidden">
  <div className="p-6">
    <div className="max-w-9xl mx-auto">
      {/* Welcome Section and Classes - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
        {/* Welcome Card */}
        <motion.div 
          className="relative lg:col-span-2 bg-white rounded-xl shadow-sm p-4 max-h-40 overflow-hidden"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floating Animated Lucide Icons */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[
              { Icon: Clock, color: "text-blue-700" },
              { Icon: TrendingUp, color: "text-blue-700" },
              { Icon: Bot, color: "text-sky-700" },
              { Icon: BookOpen, color: "text-green-700" },
              { Icon: Lightbulb, color: "text-yellow-700" },
              { Icon: Sparkles, color: "text-purple-700" },
            ].map(({ Icon, color }, index) => (
              <motion.div
                key={index}
                className={`absolute ${color} opacity-1`}
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 5 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon size={28} strokeWidth={1.5} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              {/* ANIMATED SPLIT TEXT */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2 h-14 flex items-center flex-wrap  ml-8">
                {`Hello ${teacherData.name}!`.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.04,
                      ease: "easeOut",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="text-gray-600 mb-2 text-xl ml-8 -mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                You have{" "}
                <span className="font-semibold text-gray-900 ">
                  {teacherData.pendingTasks} new classes
                </span>
                . It’s a lot of work for today! Let’s begin! <br />
                <input
                  type="button"
                  value="Get Started"
                  className="px-4 py-2 bg-topblue-600 text-white rounded-lg hover:bg-topblue-500 transition-colors duration-200 cursor-pointer mt-3"
                />
              </motion.p>
            </div>

            {/* Right Lottie Animation */}
            <div className="hidden md:block ml-4">
              <motion.div
                className="w-48 h-32 relative rounded-lg overflow-hidden flex items-center justify-center bg-blue-50"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Lottie
                  animationData={teacherDashboardAnimation}
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      
              {/* Classes Card - Takes 1 column (Right Side) */}
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-jetblack-900">Classes</h2>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value as 'Today' | 'Tomorrow' | 'Wednesday')}
                    className="text-sm text-topblue-600 bg-transparent border-none cursor-pointer font-medium focus:outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Day after tomorrow">Day after tomorrow</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {currentClasses.length > 0 ? (
                    currentClasses.map((cls, index) => (
                      <motion.div
                        key={cls.id}
                        className="bg-gradient-to-r from-topblue-600 to-topblue-600 text-white rounded-lg p-4 cursor-pointer relative overflow-hidden group border border-transparent hover:border-blue-400"
                        style={{ willChange: 'box-shadow, border-color', backfaceVisibility: 'hidden' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        whileHover={{
                          y: -2,
                          boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                          transition: { duration: 0.2, type: 'tween' }
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />

                        <div className="relative z-10">
                          <motion.h3 
                            className="font-semibold mb-2 text-base"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                          >
                            {cls.subject}
                          </motion.h3>
                          <motion.div 
                            className="flex items-center text-sm text-blue-100"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            {cls.time}, {cls.students} students
                          </motion.div>
                        </div>

                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      className="text-center py-8 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      No classes scheduled
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Performance & Progress */}
              <div className="lg:col-span-2 space-y-6 -mt-20">
                {/* Class Performance with Bar Graph */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 cursor-pointer relative overflow-hidden -mt-10"
                  style={{ willChange: 'transform, box-shadow', backfaceVisibility: 'hidden' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.2, type: 'tween' }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 pointer-events-none z-0"
                    whileHover={{
                      background: "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Class Performance</h2>
                      <p className="text-sm text-jetblack-500">Best performing class:</p>
                      <div className="flex items-baseline mt-1">
                        <span className="text-4xl font-bold text-gray-900">
                          {Math.max(...teacherData.classPerformance.map(c => c.score)).toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">in Algorithms</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                      All classes
                    </button>
                  </div>

                  {/* Bar Graph */}
                  <div className="relative mt-8 z-10">
                    <div className="flex items-end justify-between h-64 gap-4 px-2">
                      {teacherData.classPerformance.map((cls, index) => (
                        <motion.div
                          key={index}
                          className="flex-1 flex flex-col items-center group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          <div className="w-full h-48 bg-jetblack-100 rounded-t-lg flex items-end relative overflow-hidden">
                            <motion.div
                              className="w-full bg-gradient-to-t from-topblue-600 via-topblue-500 to-blue-400 rounded-t-lg cursor-pointer relative shadow-lg hover:shadow-xl group/bar"
                              style={{ willChange: 'height', backfaceVisibility: 'hidden' }}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: `${cls.score}%`,
                                opacity: 1
                              }}
                              transition={{
                                duration: 0.8,
                                delay: index * 0.1 + 0.2,
                                ease: [0.34, 1.56, 0.64, 1]
                              }}
                              whileHover={{
                                y: -3,
                                transition: { duration: 0.2, type: 'tween' }
                              }}
                              style={{ 
                                minHeight: '20px',
                                transformOrigin: 'bottom'
                              }}
                            >
                              <motion.div
                                className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700 whitespace-nowrap z-10"
                                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.1 + 0.6,
                                  ease: "easeOut"
                                }}
                              >
                                {cls.score}
                              </motion.div>
                              
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                              
                              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg" />
                            </motion.div>
                          </div>
                          
                          <motion.p
                            className="text-xs text-gray-600 mt-3 text-center leading-tight h-10 flex items-center px-1 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + 0.8
                            }}
                            whileHover={{ 
                              color: '#3b82f6',
                              transition: { duration: 0.2, type: 'tween' }
                            }}
                          >
                            {cls.subject}
                          </motion.p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="absolute left-0 right-0 bottom-12 border-t border-gray-300"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </motion.div>

                {/* Pending Approvals - React Vertical Timeline Style */}
                <div className="bg-white rounded-xl shadow-sm p-6" style={{ backfaceVisibility: 'hidden' }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-8">Pending Approvals</h2>
                  
                  <div className="relative">
                    {/* Vertical timeline line - centered */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                    
                    {/* Timeline items container */}
                    <div className="space-y-12">
                      
                      {/* Timeline Item 1 - Left */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <div className="flex items-center">
                          {/* Left side - Card */}
                          <div className="w-1/2 pr-8">
                            <motion.div 
                              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4 cursor-pointer"
                              style={{ willChange: 'transform, box-shadow', backfaceVisibility: 'hidden' }}
                              whileHover={{ 
                                y: -3,
                                boxShadow: "0 10px 25px -5px rgba(58, 133, 213, 0.2)",
                                transition: { duration: 0.2, type: 'tween' }
                              }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900 text-sm">Notes</h3>
                                  <p className="text-xs text-gray-600 mt-0.5">ID: CS301</p>
                                </div>
                                <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs font-medium rounded-full">
                                  Pending
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-3 font-medium">
                                Notes to Review
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-300 rounded-full h-2 overflow-hidden">
                                  <motion.div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(teacherData.pendingApprovals.notes / 10) * 100}%` }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{teacherData.pendingApprovals.notes}/10</span>
                              </div>
                            </motion.div>
                          </div>

                          {/* Center - Timeline dot */}
                          <div className="w-0 flex justify-center">
                            <motion.div 
                              className="w-14 h-14 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center shadow-lg relative z-10"
                              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ amount: 0.3 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.1, transition: { duration: 0.2, type: 'tween' } }}
                            >
                              <FileText className="w-7 h-7 text-blue-500" />
                            </motion.div>
                          </div>

                          {/* Right side - Empty */}
                          <div className="w-1/2"></div>
                        </div>
                      </motion.div>

                      {/* Timeline Item 2 - Right */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <div className="flex items-center">
                          {/* Left side - Empty */}
                          <div className="w-1/2"></div>

                          {/* Center - Timeline dot */}
                          <div className="w-0 flex justify-center">
                            <motion.div 
                              className="w-14 h-14 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center shadow-lg relative z-10"
                              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ amount: 0.3 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.1, transition: { duration: 0.2, type: 'tween' } }}
                            >
                              <CheckCircle className="w-7 h-7 text-blue-500" />
                            </motion.div>
                          </div>

                          {/* Right side - Card */}
                          <div className="w-1/2 pl-8">
                            <motion.div 
                              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4 cursor-pointer"
                              style={{ willChange: 'transform, box-shadow', backfaceVisibility: 'hidden' }}
                              whileHover={{ 
                                y: -3,
                                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
                                transition: { duration: 0.2, type: 'tween' }
                              }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900 text-sm">Assignments</h3>
                                  <p className="text-xs text-gray-600 mt-0.5">ID: CS401</p>
                                </div>
                                <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs font-medium rounded-full">
                                  Ongoing
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-3 font-medium">
                                Assignment Reviews
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-300 rounded-full h-2 overflow-hidden">
                                  <motion.div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(teacherData.pendingApprovals.assignments / 15) * 100}%` }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{teacherData.pendingApprovals.assignments}/15</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Timeline Item 3 - Left */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <div className="flex items-center">
                          {/* Left side - Card */}
                          <div className="w-1/2 pr-8">
                            <motion.div 
                              className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-4 cursor-pointer"
                              style={{ willChange: 'transform, box-shadow', backfaceVisibility: 'hidden' }}
                              whileHover={{ 
                                y: -3,
                                boxShadow: "0 10px 25px -5px rgba(19, 146, 157, 0.2)",
                                transition: { duration: 0.2, type: 'tween' }
                              }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900 text-sm">Grading</h3>
                                  <p className="text-xs text-gray-600 mt-0.5">ID: CS302</p>
                                </div>
                                <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs font-medium rounded-full">
                                  Ongoing
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-3 font-medium">
                                Ongoing Grades
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Progress:</span>
                                <div className="flex-1 bg-gray-300 rounded-full h-2 overflow-hidden">
                                  <motion.div 
                                    className="bg-blue-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(teacherData.pendingApprovals.PendingRequests / 5) * 100}%` }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{teacherData.pendingApprovals.PendingRequests}/5</span>
                              </div>
                            </motion.div>
                          </div>

                          {/* Center - Timeline dot */}
                          <div className="w-0 flex justify-center">
                            <motion.div 
                              className="w-14 h-14 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center shadow-lg relative z-10"
                              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ amount: 0.3 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.1, transition: { duration: 0.2, type: 'tween' } }}
                            >
                              <AlertCircle className="w-7 h-7 text-blue-500" />
                            </motion.div>
                          </div>

                          {/* Right side - Empty */}
                          <div className="w-1/2"></div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities - SLIDE IN FROM LEFT ON SCROLL */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6"
                  style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors duration-200">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {teacherData.recentActivities.map((activity, index) => (
                      <motion.div 
                        key={activity.id}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-lg border border-gray-100 cursor-pointer group transition-colors duration-200"
                        style={{ willChange: 'border-color, background-color', backfaceVisibility: 'hidden' }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.1 + (index * 0.1),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={{
                          borderColor: '#bfdbfe',
                          transition: { duration: 0.2, type: 'tween' }
                        }}
                      >
                        <motion.div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}
                          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ amount: 0.5 }}
                          transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.2, type: 'tween' } }}
                        >
                          <div className="text-gray-700">
                            {getActivityIcon(activity.icon)}
                          </div>
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <motion.h3 
                            className="text-sm font-semibold text-gray-900"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: 0.15 + (index * 0.1) }}
                          >
                            {activity.title}
                          </motion.h3>
                          <motion.p 
                            className="text-xs text-gray-600 mt-1 line-clamp-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                          >
                            {activity.description}
                          </motion.p>
                          <motion.p 
                            className="text-xs text-gray-500 mt-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: 0.25 + (index * 0.1) }}
                          >
                            {activity.time}
                          </motion.p>
                        </div>

                        <motion.div 
                          className="flex-shrink-0"
                          style={{ willChange: 'color', backfaceVisibility: 'hidden' }}
                        >
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Schedule & Announcements */}
              <div className="space-y-6">
                {/* Full Schedule with View More - SLIDE IN FROM RIGHT ON SCROLL */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6"
                  style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <h2 className="text-xl font-bold text-jetblack-900 mb-4">Full Schedule</h2>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {teacherData.allClasses.slice(0, 4).map((cls, index) => (
                      <motion.div
                        key={cls.id}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer transition-colors duration-200"
                        style={{ willChange: 'border-color', backfaceVisibility: 'hidden' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.1 + (index * 0.1),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={{
                          borderColor: '#3b82f6',
                          transition: { duration: 0.2, type: 'tween' }
                        }}
                      >
                        <h3 className="font-semibold text-jetblack-900 mb-2">{cls.subject}</h3>
                        <div className="flex items-center text-sm text-jetblack-600 mb-1">
                          <Clock className="w-4 h-4 mr-2" />
                          {cls.time}
                        </div>
                        <div className="flex items-center text-sm text-jetblack-600">
                          <Users className="w-4 h-4 mr-2" />
                          {cls.students} students • {cls.day}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 py-2 text-topblue-600 hover:text-byblue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    View More Classes
                  </button>
                </motion.div>

                {/* Announcements - SLIDE IN FROM RIGHT ON SCROLL */}
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6"
                  style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-topblue-600 mr-2" />
                      <h2 className="text-xl font-bold text-jetblack-900">Announcements</h2>
                    </div>
                    <Link href="/teacher-dashboard/announcements">
                      <button className="text-sm text-myblue hover:text-topblue font-medium transition-colors duration-200">
                        See all
                      </button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {teacherData.announcements.map((announcement, index) => (
                      <motion.div
                        key={announcement.id}
                        className="flex items-start space-x-4 pb-4 border-b border-jetblack-100 last:border-0 cursor-pointer p-2 rounded-lg transition-colors duration-200 group"
                        style={{ willChange: 'background-color', backfaceVisibility: 'hidden' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.1 + (index * 0.1),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={{
                          backgroundColor: '#f3f4f6',
                          transition: { duration: 0.2, type: 'tween' }
                        }}
                      >
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${
                            announcement.priority === 'high' 
                              ? 'bg-blue-100' 
                              : 'bg-blue-100'
                          }`}
                          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ amount: 0.5 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.1 + (index * 0.1),
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.2, type: 'tween' } }}
                        >
                          <Bell className={`w-6 h-6 ${
                            announcement.priority === 'high' 
                              ? 'text-topblue-600' 
                              : 'text-topblue-600'
                          }`} />
                        </motion.div>
                        <div className="flex-1">
                          <motion.h3 
                            className="font-semibold text-jetblack-900 mb-1 leading-tight"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: 0.15 + (index * 0.1) }}
                          >
                            {announcement.title}
                          </motion.h3>
                          <motion.div 
                            className="flex items-center text-sm text-jetblack-600"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            {announcement.date} {announcement.time}
                          </motion.div>
                          {announcement.priority === 'high' && (
                            <motion.span 
                              className="inline-block mt-2 px-2 py-1 bg-myblue-500 text-myblue text-xs font-medium rounded"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ amount: 0.5 }}
                              transition={{ duration: 0.3, delay: 0.25 + (index * 0.1) }}
                            >
                              Important
                            </motion.span>
                          )}
                        </div>
                        <motion.button 
                          className="text-gray-400 hover:text-gray-600 group-hover:text-topblue-600 transition-colors duration-200"
                          style={{ willChange: 'color', backfaceVisibility: 'hidden' }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.2, type: 'tween' } }}
                        >
                          <span className="text-xl">⋮</span>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats - SLIDE IN FROM RIGHT ON SCROLL */}
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                  style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <motion.h3 
                    className="text-sm font-bold text-jetblack-900 mb-4 uppercase tracking-wide"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    Quick Stats
                  </motion.h3>
                  <div className="space-y-3">
                    {/* Total Classes */}
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <span className="text-sm text-jetblack-700">Total Classes</span>
                      <span className="font-bold text-jetblack-900">6</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      />
                    </motion.div>

                    {/* Total  Students */}
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <span className="text-sm text-jetblack-700">Total Students</span>
                      <span className="font-bold text-jetblack-900">43</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      />
                    </motion.div>
                    {/* Total Assignments */}
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <span className="text-sm text-jetblack-700">Total Assignments</span>
                      <span className="font-bold text-jetblack-900">20</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      />
                    </motion.div>
                    
                    {/* Avg Attendance */}
                    <motion.div 
                      className="flex items-center justify-between pt-2"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      <span className="text-sm text-jetblack-700">Avg. Attendance</span>
                      <span className="font-bold text-gray-900">92%</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '92%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                      />
                    </motion.div>
                    {/* Pending reviews */}  
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <span className="text-sm text-jetblack-700">Pending Reviews</span>
                      <span className="font-bold text-jetblack-900">6</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      />
                    </motion.div>
                      {/* Avg Submission rate */}
                    <motion.div 
                      className="flex items-center justify-between pt-2"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      <span className="text-sm text-jetblack-700">Avg Submission rate</span>
                      <span className="font-bold text-gray-900">92%</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '92%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                      />
                    </motion.div>
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <span className="text-sm text-jetblack-700">Total Quizes</span>
                      <span className="font-bold text-jetblack-900">10</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      />
                    </motion.div>
                     
                    {/* Assignment Rate */}
                    <motion.div 
                      className="flex items-center justify-between pt-2"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    >
                      <span className="text-sm text-jetblack-700">Assignment Rate</span>
                      <span className="font-bold text-jetblack-900">78%</span>
                    </motion.div>
                    <motion.div 
                      className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <motion.div 
                        className="bg-myblue h-1.5 rounded-full"
                        style={{ willChange: 'width' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '78%' }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 ml-10">Your Courses</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mr-6 ml-6">
                {/* Math Course Card */}
                <Link 
                  href="/teacher-dashboard/teacher/courses/Mathematics" 
                  className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative focus:outline-none focus:ring-4 focus:ring-blue-300 group ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: '1ms' }}
                >
                  {/* Top Colored Section with Math Formulas */}
                  <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-700 p-6 overflow-hidden">
                    {/* Mathematical formulas and symbols */}
                    <div className="absolute inset-0 text-white/80 font-bold pointer-events-none">
                      <div className="absolute top-3 right-4 text-3xl">π</div>
                      <div className="absolute top-14 right-14 text-2xl">∫</div>
                      <div className="absolute top-8 right-16 text-xl">∑</div>
                      <div className="absolute left-1/4 transform -translate-x-1/2 top-6 text-2xl">√</div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-10 text-xl">α</div>
                      
                      {/* Geometric triangles */}
                      <svg className="absolute top-6 right-24 w-8 h-8 opacity-30" viewBox="0 0 50 50">
                        <polygon points="25,5 45,40 5,40" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <svg className="absolute top-2 left-20 w-6 h-6 opacity-30" viewBox="0 0 50 50">
                        <polygon points="25,5 45,40 5,40" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <p className="text-sm text-white/90 mb-1 font-bold">Course</p>
                      <h3 className="text-2xl font-bold text-white">Mathematics</h3>
                    </div>
                  </div>

                  {/* Middle White Section with Stats */}
                  <div className="bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Class</p>
                        <p className="text-sm font-semibold text-gray-900">Class 10th</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                          </svg>
                          <span className="text-sm">Students</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">28</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-sm">Assignments</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">12</span>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Course Progress</span>
                          <span className="text-xs font-semibold text-gray-900">68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-600 to-blue-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Colored Section with Button */}
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-700 p-4 overflow-hidden">
                    {/* More formulas in bottom */}
                    <div className="absolute inset-0 text-white/20 font-bold pointer-events-none">
                      <div className="absolute bottom-3 right-6 text-2xl">∞</div>
                      <div className="absolute bottom-2 left-8 text-xl">θ</div>
                      <div className="absolute bottom-4 right-20 text-2xl">Σ</div>
                      
                      {/* More triangles */}
                      <svg className="absolute bottom-3 left-20 w-7 h-7 opacity-30" viewBox="0 0 50 50">
                        <polygon points="25,5 45,40 5,40" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>

                    <button className="relative z-10 w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      Manage Course
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Link>

                {/* Physics Course Card - Now Abstract Blue */}
<Link 
  href="/teacher-dashboard/teacher/courses/physics" 
  className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative focus:outline-none focus:ring-4 focus:ring-blue-300 group ${
    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`}
  style={{ transitionDelay: '1ms' }}
>
  {/* Top Colored Section */}
  <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-600 transition-all duration-700 p-6 overflow-hidden">
    <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 400 200" preserveAspectRatio="none">
      <path d="M0,0 L400,0 L400,100 Q300,80 200,100 T0,100 Z" fill="white">
        <animate attributeName="d" dur="7s" repeatCount="indefinite"
          values="M0,0 L400,0 L400,100 Q300,80 200,100 T0,100 Z;
                  M0,0 L400,0 L400,100 Q300,120 200,100 T0,100 Z;
                  M0,0 L400,0 L400,100 Q300,80 200,100 T0,100 Z"/>
      </path>
    </svg>

    {/* Physics symbols */}
    <div className="absolute inset-0 text-white/90 font-bold pointer-events-none">
      <svg className="absolute top-4 right-6 w-12 h-12 opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="6" fill="currentColor"/>
        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="currentColor" strokeWidth="2"/>
        <ellipse cx="50" cy="50" rx="12" ry="35" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <div className="absolute top-3 right-20 text-xl">E=mc²</div>
      <div className="absolute top-10 right-20 text-lg">λ</div>
    </div>

   <div className="relative z-10">
      <p className="text-sm text-white/90 mb-1 font-bold">Course</p>
      <h3 className="text-2xl font-bold text-white">Physics</h3>
    </div>
  </div>

  {/* Middle White Section */}
  <div className="bg-white p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      </div>
      <div>
        <p className="text-xs text-gray-500">Class</p>
        <p className="text-sm font-semibold text-gray-900">Class 7th</p>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
          <span className="text-sm">Students</span>
        </div>
        <span className="text-sm font-bold text-gray-900">25</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm">Assignments</span>
        </div>
        <span className="text-sm font-bold text-gray-900">12</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Course Progress</span>
          <span className="text-xs font-semibold text-gray-900">68%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 h-2 rounded-full" style={{ width: '68%' }}></div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Colored Section */}
  <div className="relative bg-gradient-to-br from-blue-500 via-blue-700 to-cyan-700 group-hover:from-blue-600 group-hover:to-cyan-800 transition-all duration-700 p-4 overflow-hidden">
    <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
      <path d="M0,100 L400,100 L400,50 Q300,70 200,50 T0,50 Z" fill="white">
        <animate attributeName="d" dur="11s" repeatCount="indefinite"
          values="M0,100 L400,100 L400,50 Q300,70 200,50 T0,50 Z;
                  M0,100 L400,100 L400,50 Q300,30 200,50 T0,50 Z;
                  M0,100 L400,100 L400,50 Q300,70 200,50 T0,50 Z"/>
      </path>
    </svg>

    <div className="absolute inset-0 text-white/20 font-bold pointer-events-none">
      <div className="absolute bottom-3 right-8 text-2xl">ω</div>
      <div className="absolute bottom-2 left-10 text-xl">F=ma</div>
      <div className="absolute bottom-4 right-24 text-lg">ℏ</div>
    </div>

    <button className="relative z-10 w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
      Manage Course
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</Link>


                {/* Chemistry Course Card */}
<Link 
  href="/teacher-dashboard/teacher/courses/chemistry" 
  className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative focus:outline-none focus:ring-4 focus:ring-blue-300 group ${
    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`}
  style={{ transitionDelay: '1ms' }}
>
  {/* Top Colored Section */}
  <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-700 p-6 overflow-hidden">
    <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 400 200" preserveAspectRatio="none">
      <path d="M0,0 L400,0 L400,100 Q300,80 200,100 T0,100 Z" fill="white">
        <animate attributeName="d" dur="9s" repeatCount="indefinite"
          values="M0,0 L400,0 L400,100 Q300,80 200,100 T0,100 Z;
                  M0,0 L400,0 L400,100 Q300,120 200,100 T0,100 Z;
                  M0,0 L400,0 L400,100 Q300,80 200,100 T0,100 Z"/>
      </path>
    </svg>

    {/* Chemistry symbols and organic compounds */}
    <div className="absolute inset-0 text-white font-mono pointer-events-none">
      {/* Benzene ring */}
      <svg className="absolute top-4 right-8 w-14 h-14 opacity-30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
        <circle cx="50" cy="50" r="20" />
      </svg>
      {/* Chemical formulas */}
      <div className="absolute top-16 right-10 text-2xl font-bold">H₂O</div>
      <div className="absolute top-10 right-24 text-xl font-bold">CH₄</div>
      <div className="absolute top-3 left-24 text-lg font-bold">CO₂</div>
      {/* Molecular structure */}
      <svg className="absolute top-8 left-16 w-12 h-8 opacity-30" viewBox="0 0 60 30" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="15" r="3" />
        <circle cx="30" cy="15" r="3" />
        <circle cx="50" cy="15" r="3" />
        <line x1="13" y1="15" x2="27" y2="15" />
        <line x1="33" y1="15" x2="47" y2="15" />
      </svg>
    </div>
    <div className="relative z-10">
      <p className="text-sm text-white/90 mb-1 font-bold">Course</p>
      <h3 className="text-2xl font-bold text-white">Chemistry</h3>
    </div>
  </div>

  {/* Middle White Section */}
  <div className="bg-white p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      </div>
      <div>
        <p className="text-xs text-gray-500">Class</p>
        <p className="text-sm font-semibold text-gray-900">Class 11th</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
          <span className="text-sm">Students</span>
        </div>
        <span className="text-sm font-bold text-gray-900">30</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm">Assignments</span>
        </div>
        <span className="text-sm font-bold text-gray-900">12</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Course Progress</span>
          <span className="text-xs font-semibold text-gray-900">68%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-800 to-blue-400 h-2 rounded-full" style={{ width: '68%' }}></div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Colored Section */}
  <div className="relative bg-gradient-to-br from-blue-700 to-blue-800 group-hover:from-blue-800 group-hover:to-blue-900 transition-all duration-700 p-4 overflow-hidden">
    <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
      <path d="M0,100 L400,100 L400,50 Q300,70 200,50 T0,50 Z" fill="white">
        <animate attributeName="d" dur="10s" repeatCount="indefinite"
          values="M0,100 L400,100 L400,50 Q300,70 200,50 T0,50 Z;
                  M0,100 L400,100 L400,50 Q300,30 200,50 T0,50 Z;
                  M0,100 L400,100 L400,50 Q300,70 200,50 T0,50 Z"/>
      </path>
    </svg>
    <div className="absolute inset-0 text-white/20 font-mono pointer-events-none">
      <div className="absolute bottom-3 right-10 text-xl font-bold">NH₃</div>
      <div className="absolute bottom-2 left-12 text-lg font-bold">C₆H₁₂O₆</div>
      {/* Small molecular structure */}
      <svg className="absolute bottom-3 right-28 w-10 h-6 opacity-30" viewBox="0 0 50 20" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="10" r="2.5" />
        <circle cx="25" cy="10" r="2.5" />
        <circle cx="42" cy="10" r="2.5" />
        <line x1="10.5" y1="10" x2="22.5" y2="10" />
        <line x1="27.5" y1="10" x2="39.5" y2="10" />
      </svg>
    </div>
    <button className="relative z-10 w-full bg-white text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
      Manage Course
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</Link>
              </div>
            </div>
    </>
  );
}