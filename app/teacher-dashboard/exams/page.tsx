'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Exam {
  id: string;
  examName: string;
  subject: string;
  className: string;
  date: string;
  time: string;
  totalMarks: number;
  duration: string;
}

const ExamsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const exams: Exam[] = [
    {
      id: '1',
      examName: 'Mid-Term Mathematics Exam',
      subject: 'Mathematics',
      className: 'Grade VI – Mathematics',
      date: '2025-11-10',
      time: '10:00 AM',
      totalMarks: 100,
      duration: '3 hours'
    },
    {
      id: '2',
      examName: 'Physics Quiz - Chapter 5',
      subject: 'Physics',
      className: 'Grade VI – Physics',
      date: '2025-11-02',
      time: '2:00 PM',
      totalMarks: 25,
      duration: '30 minutes'
    },
    {
      id: '3',
      examName: 'Organic Chemistry Final Exam',
      subject: 'Chemistry',
      className: 'Grade IX – Chemistry',
      date: '2025-10-28',
      time: '9:00 AM',
      totalMarks: 100,
      duration: '3 hours'
    },
    {
      id: '4',
      examName: 'English Literature Assessment',
      subject: 'English',
      className: 'Grade VII – English',
      date: '2025-11-15',
      time: '11:00 AM',
      totalMarks: 80,
      duration: '2 hours'
    },
    {
      id: '5',
      examName: 'World History Mid-Term',
      subject: 'History',
      className: 'Grade VII – History',
      date: '2025-10-25',
      time: '10:00 AM',
      totalMarks: 75,
      duration: '2.5 hours'
    },
    {
      id: '6',
      examName: 'Biology Practical Exam',
      subject: 'Biology',
      className: 'Grade IX – Biology',
      date: '2025-11-05',
      time: '1:00 PM',
      totalMarks: 50,
      duration: '2 hours'
    },
    {
      id: '7',
      examName: 'Trigonometry Quick Quiz',
      subject: 'Mathematics',
      className: 'Grade VI – Mathematics',
      date: '2025-11-01',
      time: '9:00 AM',
      totalMarks: 20,
      duration: '20 minutes'
    }
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.className.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = filterClass === 'All' || exam.className === filterClass;
    
    return matchesSearch && matchesClass;
  });

  const classes = ['All', ...Array.from(new Set(exams.map(e => e.className)))];

  const totalExams = exams.length;
  
  const scheduledExams = exams.filter(e => {
    const examDate = new Date(e.date);
    const today = new Date();
    return examDate >= today;
  }).length;
  
  const completedExams = exams.filter(e => {
    const examDate = new Date(e.date);
    const today = new Date();
    return examDate < today;
  }).length;
  
  const upcomingThisWeek = exams.filter(e => {
    const examDate = new Date(e.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return examDate >= today && examDate <= weekFromNow;
  }).length;

  const getDaysUntilExam = (date: string) => {
    const today = new Date();
    const examDate = new Date(date);
    const diffTime = examDate.getTime() - today.getTime();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
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
        className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mt-20">
                Exams & Assessments
              </h1>
              <p className="text-sm text-gray-600 mt-1">Schedule and manage all examinations</p>
            </motion.div>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/40 mt-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4, scale: 1.05, boxShadow: "0 25px 35px rgba(79, 70, 229, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Schedule Exam
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 mt-10">
        {/* Stats Cards with Parallax */}
        <motion.div
          ref={statsRef}
          style={{ y }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Total Exams', value: totalExams, icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', gradient: 'from-blue-500 to-blue-600' },
            { label: 'Scheduled', value: scheduledExams, icon: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', gradient: 'from-blue-500 to-blue-500' },
            { label: 'Completed', value: completedExams, icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', gradient: 'from-blue-500 to-blue-500' },
            { label: 'This Week', value: upcomingThisWeek, icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z', gradient: 'from-blue-500 to-blue-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50 cursor-pointer overflow-hidden relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0`}
                whileHover={{ opacity: 0.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
                  <motion.p
                    className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.15), type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={stat.icon} clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search, Filter, View Toggle in Single Row */}
        {/* Search, Filter, View Toggle in Single Row */}
<motion.div
  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-4 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  whileHover={{ boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)" }}
>
  <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
    {/* Search Input - Shortened */}
    <motion.div
      className="w-full sm:max-w-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <motion.input
          type="text"
          placeholder="Search exams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
          whileFocus={{ scale: 1.01, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)" }}
        />
      </div>
    </motion.div>

    {/* Filter and Toggle Right Side */}
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {/* Class Filter */}
      <motion.select
        value={filterClass}
        onChange={(e) => setFilterClass(e.target.value)}
        className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white/50 backdrop-blur-sm w-full sm:w-auto"
        whileHover={{ borderColor: '#4f46e5' }}
      >
        {classes.map(cls => (
          <option key={cls} value={cls}>
            {cls === 'All' ? 'All Classes' : cls}
          </option>
        ))}
      </motion.select>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm p-1 rounded-xl">
        {[
          { mode: 'grid' as const, icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
          { mode: 'table' as const, icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' }
        ].map((btn) => (
          <motion.button
            key={btn.mode}
            onClick={() => setViewMode(btn.mode)}
            className={`p-2 rounded-lg transition-all ${viewMode === btn.mode ? 'bg-white shadow-md' : 'hover:bg-gray-200/80'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d={btn.icon} clipRule="evenodd" />
            </svg>
          </motion.button>
        ))}
      </div>
    </div>
  </div>
</motion.div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredExams.map((exam, index) => {
                const daysUntil = getDaysUntilExam(exam.date);

                return (
                  <motion.div
                    key={exam.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.08) }}
                    whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
                  >
                    {/* Card Header */}
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-topblue-500 to-topblue-600">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 hover:line-clamp-none transition-all">
                        {exam.examName}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      {/* Subject & Class */}
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.08) + 0.1 }}
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Subject</p>
                          <p className="text-sm font-semibold text-gray-900">{exam.subject}</p>
                          <p className="text-xs text-gray-600">{exam.className}</p>
                        </div>
                      </motion.div>

                      {/* Date & Time */}
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.08) + 0.15 }}
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Date & Time</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <div className="flex items-center gap-1">
                            <p className="text-xs text-gray-600">{exam.time}</p>
                            {daysUntil >= 0 && (
                              <motion.span
                                className={`text-xs font-bold px-2 py-0.5 rounded ${daysUntil <= 3 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                              >
                                {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      {/* Total Marks */}
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.08) + 0.2 }}
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium">Total Marks</p>
                          <p className="text-sm font-semibold text-gray-900">{exam.totalMarks} marks • {exam.duration}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Card Footer */}
                    <motion.div
                      className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.08) + 0.25 }}
                    >
                      <Link
                        href={`/exams/${exam.id}/grade`}
                        className="w-full px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        </svg>
                        Grade Now
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-200">
                  <tr>
                    {['Exam Name', 'Subject', 'Class', 'Date & Time', 'Marks', 'Grade'].map((header, i) => (
                      <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredExams.map((exam, index) => {
                    const daysUntil = getDaysUntilExam(exam.date);

                    return (
                      <motion.tr
                        key={exam.id}
                        className="hover:bg-indigo-50/30 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.45 + (index * 0.05) }}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{exam.examName}</p>
                            <p className="text-xs text-gray-500">{exam.duration}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                            {exam.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{exam.className}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900 font-semibold">
                              {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                            <p className="text-xs text-gray-600">{exam.time}</p>
                            {daysUntil >= 0 && (
                              <p className={`text-xs font-bold ${daysUntil <= 3 ? 'text-red-600' : 'text-blue-600'}`}>
                                {daysUntil === 0 ? 'Today' : `${daysUntil}d`}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{exam.totalMarks}</td>
                        <td className="px-6 py-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={`/exams/${exam.id}/grade`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-byblue-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              </svg>
                              Grade
                            </Link>
                          </motion.div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredExams.length === 0 && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </motion.svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Your First Exam
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Create Exam Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-xl font-bold text-gray-900">Schedule New Exam</h2>
                <motion.button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-center py-8 font-medium">
                  Exam scheduling form would go here...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamsPage;
