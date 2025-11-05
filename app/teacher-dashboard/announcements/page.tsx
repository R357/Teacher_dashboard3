'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Bell, Clock, MoreVertical, X } from 'lucide-react';
import Navbar from '../navbar';

interface Announcement {
  id: number;
  title: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

interface FormData {
  className: string;
  subject: string;
  title: string;
  description: string;
}

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [forWhom, setForWhom] = useState('student');
  const [formData, setFormData] = useState<FormData>({
    className: '',
    subject: '',
    title: '',
    description: ''
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Assesment Schedule Released',
      date: '14 December 2025',
      time: '12:00 pm',
      priority: 'high',
      description: 'The assessment schedule for the upcoming semester has been released. Please check your respective class schedules and prepare accordingly.'
    },
    {
      id: 2,
      title: 'Submmission date of assignment',
      date: '18 December 2025',
      time: '09:00 am',
      priority: 'medium',
      description: 'All pending assignments must be submitted by the deadline. Late submissions will incur grade penalties.'
    },
    {
      id: 3,
      title: 'Grading of the assements',
      date: '21 December 2025',
      time: '11:00 am',
      priority: 'high',
      description: 'Assessment grading will be completed and results will be published on the student portal by the end of this week.'
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      date: '25 December 2025',
      time: '02:00 pm',
      priority: 'medium',
      description: 'Quarterly parent-teacher meetings are scheduled. Please ensure you attend to discuss student progress.'
    },
    {
      id: 5,
      title: 'Winter Break Schedule',
      date: '28 December 2025',
      time: '10:00 am',
      priority: 'low',
      description: 'Classes will be suspended for winter break from December 28th to January 5th. Regular classes resume on January 6th.'
    },
    {
      id: 6,
      title: 'New Course Materials Available',
      date: '30 December 2025',
      time: '03:00 pm',
      priority: 'medium',
      description: 'Updated course materials and study guides are now available on the learning portal.'
    }
  ]);

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (activeFilter === 'all') return true;
    return announcement.priority === activeFilter;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const description =
      forWhom === 'student'
        ? `Class: ${formData.className}, Subject: ${formData.subject} - ${formData.description}`
        : formData.description;

    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      title: formData.title,
      date: dateStr,
      time: timeStr,
      priority: 'medium',
      description: description
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setShowAddForm(false);
    setForWhom('student');
    setFormData({ className: '', subject: '', title: '', description: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.05, duration: 0.3, type: 'spring' as const }
    })
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 pt-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-40 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-9xl mx-auto p-6 relative z-10 top-10">
          {/* Header with Add Announcement Button */}
          <motion.div
            ref={headerRef}
            style={{ y: headerY }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Bell className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Announcements
                </h1>
                <p className="text-gray-600 text-sm mt-1">Stay updated with all announcements</p>
              </motion.div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <motion.span
                className="text-sm text-gray-600 font-bold px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' as const }}
              >
                {filteredAnnouncements.length} announcements
              </motion.span>
              <motion.button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-5 py-2.5 bg-gradient-to-r from-topblue-500 to-topblue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg shadow-blue500/40 flex items-center gap-2 whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div animate={showAddForm ? { rotate: 45 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                  {showAddForm ? <X className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </motion.div>
                {showAddForm ? 'Cancel' : 'Add Announcement'}
              </motion.button>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-gray-700 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Filter by:
              </span>
              {(['all', 'high', 'medium', 'low'] as const).map((filter, index) => (
                <motion.button
                  key={filter}
                  custom={index}
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeFilter === filter
                      ? filter === 'high'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-red-500/40'
                        : filter === 'medium'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40'
                        : filter === 'low'
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/40'
                        : 'bg-gradient-to-r from-topblue-500 to-topblue-600 text-white shadow-lg shadow-indigo-500/40'
                      : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter === 'all' ? 'All' : filter === 'high' ? 'Important' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Add Announcement Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/50 p-8 mb-8"
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.3, type: 'spring' as const, stiffness: 300 }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Create New Announcement
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.label
                    className="block font-bold text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    For Whom:
                    <motion.select
                      name="forWhom"
                      value={forWhom}
                      onChange={(e) => setForWhom(e.target.value)}
                      className="mt-2 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <option value="student">Student</option>
                      <option value="event">Event</option>
                    </motion.select>
                  </motion.label>

                  {forWhom === 'student' && (
                    <>
                      <motion.label
                        className="block font-bold text-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        Class:
                        <motion.input
                          type="text"
                          name="className"
                          value={formData.className}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Grade X – Mathematics"
                          className="mt-2 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </motion.label>

                      <motion.label
                        className="block font-bold text-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Subject:
                        <motion.input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Mathematics"
                          className="mt-2 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </motion.label>
                    </>
                  )}

                  <motion.label
                    className="block font-bold text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    Title:
                    <motion.input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter announcement title"
                      className="mt-2 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.label>

                  <motion.label
                    className="block font-bold text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Description:
                    <motion.textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Enter announcement description"
                      className="mt-2 block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.label>

                  <motion.div
                    className="flex gap-3 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <motion.button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg shadow-blue-500/40"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Announcements List */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    variants={itemVariants}
                    whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden cursor-pointer hover:border-indigo-200 transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <motion.div
                            className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                              announcement.priority === 'high'
                                ? 'bg-gradient-to-br from-blue-500 to-blue-700'
                                : announcement.priority === 'medium'
                                ? 'bg-gradient-to-br from-blue-400 to-indigo-600'
                                : 'bg-gradient-to-br from-gray-400 to-gray-600'
                            } shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring' as const, stiffness: 300 }}
                          >
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Bell className="w-8 h-8 text-white" />
                            </motion.div>
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <motion.h3
                              className="text-lg font-bold text-gray-900 mb-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              {announcement.title}
                            </motion.h3>
                            <motion.div
                              className="flex items-center text-sm text-gray-600 mb-3 gap-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.15 }}
                            >
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium">{announcement.date} • {announcement.time}</span>
                            </motion.div>
                            <motion.p
                              className="text-gray-600 text-sm leading-relaxed line-clamp-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {announcement.description}
                            </motion.p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 ml-4 flex-shrink-0">
                          <motion.button
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </motion.button>

                          {announcement.priority === 'high' && (
                            <motion.span
                              className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: 'spring' as const }}
                            >
                              Important
                            </motion.span>
                          )}
                          {announcement.priority === 'medium' && (
                            <motion.span
                              className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: 'spring' as const }}
                            >
                              Medium
                            </motion.span>
                          )}
                          {announcement.priority === 'low' && (
                            <motion.span
                              className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-bold rounded-full border border-gray-200"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: 'spring' as const }}
                            >
                              Low
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4 shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bell className="w-12 h-12 text-gray-500" />
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    No announcements found
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    There are no announcements matching your filter criteria.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
