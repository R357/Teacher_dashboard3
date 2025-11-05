'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  totalStudents: number;
  submittedCount: number;
  status: 'Active' | 'Upcoming';
  description: string;
  createdDate: string;
}

const AssignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Quadratic Equations Problem Set',
      subject: 'Mathematics',
      className: 'Grade X – Mathematics',
      dueDate: '2025-11-05',
      totalStudents: 25,
      submittedCount: 18,
      status: 'Active',
      description: 'Complete problems 1-15 from Chapter 4',
      createdDate: '2025-10-25'
    },
    {
      id: '2',
      title: 'Newton\'s Laws Lab Report',
      subject: 'Physics',
      className: 'Grade VIII – Physics',
      dueDate: '2025-11-03',
      totalStudents: 30,
      submittedCount: 22,
      status: 'Active',
      description: 'Submit lab observations and conclusions',
      createdDate: '2025-10-20'
    },
    {
      id: '3',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      className: 'Grade IX – Chemistry',
      dueDate: '2025-11-08',
      totalStudents: 22,
      submittedCount: 5,
      status: 'Upcoming',
      description: 'Complete reaction mechanisms worksheet',
      createdDate: '2025-10-28'
    },
    {
      id: '4',
      title: 'Shakespeare Essay',
      subject: 'English',
      className: 'Grade VII – English',
      dueDate: '2025-10-28',
      totalStudents: 28,
      submittedCount: 28,
      status: 'Active',
      description: 'Write 500 words on Macbeth themes',
      createdDate: '2025-10-10'
    },
    {
      id: '5',
      title: 'World War II Timeline',
      subject: 'History',
      className: 'Grade VII – History',
      dueDate: '2025-11-06',
      totalStudents: 26,
      submittedCount: 12,
      status: 'Active',
      description: 'Create detailed timeline with key events',
      createdDate: '2025-10-22'
    },
    {
      id: '6',
      title: 'Cell Structure Diagram',
      subject: 'Biology',
      className: 'Grade IX – Biology',
      dueDate: '2025-11-10',
      totalStudents: 24,
      submittedCount: 0,
      status: 'Upcoming',
      description: 'Draw and label plant and animal cells',
      createdDate: '2025-10-30'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.className.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || assignment.subject === filterSubject;
    const matchesStatus = filterStatus === 'All' || assignment.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const subjects = ['All', ...Array.from(new Set(assignments.map(a => a.subject)))];

  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => a.status === 'Active').length;
  const pendingSubmissions = assignments
    .filter(a => a.status === 'Active')
    .reduce((sum, a) => sum + (a.totalStudents - a.submittedCount), 0);
  const avgSubmissionRate = Math.round(
    (assignments.reduce((sum, a) => sum + (a.submittedCount / a.totalStudents) * 100, 0) / assignments.length)
  );

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active':
        return 'bg-gradient-to-r from-blue-200 to-blue-100 text-white-700 border border-blue-200';
      case 'Upcoming':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200';
    }
  };

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Parallax setup
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const statCardVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 relative overflow-hidden mt-20">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Assignments
              </h1>
              <p className="text-sm text-gray-600 mt-1">Create and manage student assignments</p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/40 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Assignment
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards with Parallax */}
        <motion.div
          ref={statsRef}
          style={{ y }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Assignments', value: totalAssignments, gradient: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-100', icon: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z' },
            { label: 'Active', value: activeAssignments, gradient: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-100', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' },
            { label: 'Pending Reviews', value: pendingSubmissions, gradient: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-100', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' },
            { label: 'Avg. Submission Rate', value: `${avgSubmissionRate}%`, gradient: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-100', icon: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={statCardVariants}
              whileHover="hover"
              className={`bg-black/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-transparent transition-all shadow-xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.15), type: 'spring', stiffness: 200 }}
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={stat.icon} clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-100/50 p-4 mb-8 shadow-xl"
          whileHover={{ boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            {/* Search - Shortened */}
            <motion.div
              className="w-full sm:max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <motion.input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50"
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)" }}
                />
              </div>
            </motion.div>

            {/* Right side: Filters and Toggle */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Subject Filter */}
              <motion.select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all bg-white/50 w-full sm:w-auto"
                whileHover={{ borderColor: '#4f46e5' }}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </motion.select>

              {/* Status Filter */}
              <motion.select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all bg-white/50 w-full sm:w-auto"
                whileHover={{ borderColor: '#4f46e5' }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
              </motion.select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 p-1 rounded-xl border-2 border-gray-200">
                {[
                  { mode: 'grid' as const, icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                  { mode: 'table' as const, icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' }
                ].map((btn) => (
                  <motion.button
                    key={btn.mode}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode(btn.mode)}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === btn.mode ? 'bg-white border-2 border-indigo-400 shadow-md' : 'hover:bg-gray-200'}`}
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={btn.icon} clipRule="evenodd" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAssignments.map((assignment, index) => {
                const daysUntil = getDaysUntilDue(assignment.dueDate);
                const submissionPercentage = Math.round((assignment.submittedCount / assignment.totalStudents) * 100);

                return (
                  <motion.div
                    key={assignment.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-100/50 overflow-hidden hover:border-indigo-300 transition-all group h-full flex flex-col shadow-xl"
                  >
                    {/* Card Header with Gradient Background */}
                    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-b-2 border-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-white/80"></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                            {assignment.title}
                          </h3>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 ${getStatusColor(assignment.status)}`}
                          >
                            {assignment.status}
                          </motion.span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="px-2 py-1 bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-700 rounded-lg font-medium">
                            {assignment.subject}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{assignment.className}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4 relative flex-grow flex flex-col">
                      {/* Due Date */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 + 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          {assignment.status === 'Active' && (
                            <motion.p
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className={`text-xs ${daysUntil <= 2 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}
                            >
                              {daysUntil > 0 ? `${daysUntil} days left` : daysUntil === 0 ? 'Due today' : 'Overdue'}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>

                      {/* Submissions */}
                      <motion.div
                        className="flex-grow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.08 + 0.15 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-gray-900">
                            {assignment.submittedCount}/{assignment.totalStudents}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${submissionPercentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                            className={`h-2.5 rounded-full ${
                              submissionPercentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                              submissionPercentage >= 50 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                              'bg-gradient-to-r from-blue-300 to-blue-400'
                            }`}
                          ></motion.div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{submissionPercentage}% submitted</p>
                      </motion.div>

                      {/* Description Preview */}
                      <motion.p
                        className="text-sm text-gray-600 line-clamp-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.08 + 0.2 }}
                      >
                        {assignment.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-100/50 overflow-hidden shadow-xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submissions</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100">
                    {filteredAssignments.map((assignment, index) => {
                      const submissionPercentage = Math.round((assignment.submittedCount / assignment.totalStudents) * 100);
                      const daysUntil = getDaysUntilDue(assignment.dueDate);

                      return (
                        <motion.tr
                          key={assignment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all"
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{assignment.title}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-medium">
                              {assignment.subject}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{assignment.className}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm text-gray-900">
                                {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                              {assignment.status === 'Active' && (
                                <p className={`text-xs ${daysUntil <= 2 ? 'text-red-400 font-semibold' : 'text-gray-500'}`}>
                                  {daysUntil > 0 ? `${daysUntil}d left` : daysUntil === 0 ? 'Today' : 'Overdue'}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 w-24 bg-gray-200 rounded-full h-2.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${submissionPercentage}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                  className={`h-2.5 rounded-full ${
                                    submissionPercentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                    submissionPercentage >= 50 ? 'bg-gradient-to-r from-blue-300 to-blue-600' :
                                    'bg-gradient-to-r from-blue-400 to-blue-500'
                                  }`}
                                ></motion.div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {assignment.submittedCount}/{assignment.totalStudents}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredAssignments.length === 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-100/50 p-12 text-center shadow-xl"
          >
            <motion.svg
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </motion.svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Create Your First Assignment
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Create Assignment Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 shadow-2xl"
            >
              <div className="p-6 border-b-2 border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Create New Assignment
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-white rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-center py-8">
                  Assignment creation form would go here...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssignmentsPage;
