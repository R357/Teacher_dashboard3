'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ClassSchedule {
  id: string;
  className: string;
  subject: string;
  totalStudents: number;
  attendanceRate: number;
  semester: string;
  totalAssignments: number;
  totalNotes: number;
  totalQuiz: number;
}

const ClassesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [formData, setFormData] = useState({
    teacherEmail: '',
    className: '1',
    subject: '',
    description: ''
  });

  const classes: ClassSchedule[] = [
    {
      id: '1',
      className: 'Grade X – Mathematics',
      subject: 'Mathematics',
      totalStudents: 25,
      attendanceRate: 88,
      semester: '2025',
      totalAssignments: 10,
      totalNotes: 15,
      totalQuiz: 6
    },
    {
      id: '2',
      className: 'Grade VIII – Physics',
      subject: 'Physics',
      totalStudents: 30,
      attendanceRate: 95,
      semester: '2025',
      totalAssignments: 7,
      totalNotes: 14,
      totalQuiz: 4
    },
    {
      id: '3',
      className: 'Grade IX – Chemistry',
      subject: 'Chemistry',
      totalStudents: 22,
      attendanceRate: 90,
      semester: '2025',
      totalAssignments: 9,
      totalNotes: 11,
      totalQuiz: 5
    }
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || cls.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['All', ...Array.from(new Set(classes.map(c => c.subject)))];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAddClassForm(false);
    setFormData({
      teacherEmail: '',
      className: '1',
      subject: '',
      description: ''
    });
  };

  // Parallax scroll hooks
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.85,
      rotateX: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 90,
        damping: 15,
      },
    },
    hover: {
      y: -12,
      scale: 1.03,
      rotateY: 2,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50/20 to-blue-50/20 relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-topblue-600 rounded-full blur-3xl"
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
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-byblue-500 to-byblue-600 bg-clip-text text-transparent">
                My Classes
              </h1>
              <p className="text-sm text-gray-600 mt-1">Manage and view all your ongoing classes</p>
            </motion.div>
            <motion.button
              onClick={() => setShowAddClassForm(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-byblue-500 to-byblue-600 text-white rounded-xl hover:from-myblue hover:to-topblue-600 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/40"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -4,
                scale: 1.05,
                boxShadow: "0 25px 35px rgba(79, 70, 229, 0.5)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Class
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards with Parallax */}
        <motion.div
          ref={statsRef}
          style={{ y, opacity }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Total Classes', value: classes.length, icon: 'M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z', color: 'blue', gradient: 'from-topblue-500 to-topblue-600' },
            { label: 'Total Students', value: classes.reduce((sum, cls) => sum + cls.totalStudents, 0), icon: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z', color: 'blue', gradient: 'from-topblue-500 to-topblue-600' },
            { label: 'Total Assignments', value: classes.reduce((sum, cls) => sum + cls.totalAssignments, 0), icon: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z', color: 'blue', gradient: 'from-topblue-500 to-topblue-600' },
            { label: 'Avg. Attendance', value: `${Math.round(classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) / classes.length)}%`, icon: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', color: 'blue', gradient: 'from-topblue-500 to-topblue-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`bg-black/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50 cursor-pointer overflow-hidden relative top-5`}
              style={{ perspective: '1000px' }}
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
                  <svg className={`w-7 h-7 text-white`} fill="currentColor" viewBox="0 0 20 20">
                    <path d={stat.icon} />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-black/500  0 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{
            boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.2 }
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <motion.div
              className="flex-1 w-full lg:max-w-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black-400" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search classes or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer bg-white/50 backdrop-blur-sm"
                whileHover={{ borderColor: '#4f46e5' }}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </motion.select>

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
                      <path d={btn.icon} fillRule="evenodd" clipRule="evenodd" />
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
            {filteredClasses.map((cls, index) => (
              <motion.div
                key={cls.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="bg-gradient-to-r from-topblue-500 to-topblue-600 p-6 text-white relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{cls.className}</h3>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {cls.subject}
                      </span>
                    </div>
                    <p className="text-sm text-white/90">{cls.semester}</p>
                  </div>
                </motion.div>

                <div className="p-6 space-y-4 bg-black/15">
                  {[
                    { title: 'Total Students', value: `${cls.totalStudents} students`, icon: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z', gradient: 'from-blue-500 to-topblue-500' },
                    { title: 'Total Assignments', value: `${cls.totalAssignments} assignments`, icon: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z', gradient: 'from-blue-500 to-cyan-500' },
                    { title: 'Total Notes', value: `${cls.totalNotes} notes`, icon: 'M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z', gradient: 'from-blue-500 to-topblue-500' },
                    { title: 'Total Quiz', value: `${cls.totalQuiz} quiz`, icon: 'M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z', gradient: 'from-blue-500 to-topblue-500' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                        <svg className={`w-5 h-5 text-white`} fill="currentColor" viewBox="0 0 20 20">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">{item.title}</p>
                        <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500 font-medium">Attendance Rate</p>
                      <p className="text-sm font-semibold text-gray-900">{cls.attendanceRate}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className={`h-2.5 rounded-full ${
                          cls.attendanceRate >= 90 ? 'bg-gradient-to-r from-byblue-500 to-topblue-500' :
                          cls.attendanceRate >= 75 ? 'bg-gradient-to-r from-byblue-500 to-topblue-500' : 
                          'bg-gradient-to-r from-myblue to-byblue-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${cls.attendanceRate}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-byblue-600 backdrop-blur-sm border-t border-gray-100/50 flex gap-2">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/classes/${cls.id}/students`}
                      className="block px-4 py-2.5 text-sm font-medium text-blue-600 bg-indigo-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
                    >
                      View Students
                    </Link>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/classes/${cls.id}/assignments`}
                      className="block px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
                    >
                      Assignments
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
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
                    {['Class Name', 'Subject', 'Students', 'Notes', 'Assignments', 'Quiz', 'Attendance'].map((header, i) => (
                      <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredClasses.map((cls, index) => (
                    <motion.tr
                      key={cls.id}
                      className="hover:bg-blue-50/30 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.45 + (index * 0.08) }}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cls.className}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {cls.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cls.totalStudents}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cls.totalNotes}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cls.totalAssignments}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cls.totalQuiz}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-2 rounded-full ${
                                cls.attendanceRate >= 90 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                cls.attendanceRate >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                'bg-gradient-to-r from-blue-500 to-blue-600'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${cls.attendanceRate}%` }}
                              transition={{ duration: 0.8, delay: 0.45 + (index * 0.08) }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{cls.attendanceRate}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredClasses.length === 0 && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </motion.svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Add Class Form Modal */}
      {showAddClassForm && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl max-w-md w-full shadow-2xl border-2 border-gray-100"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Add New Class
              </h2>
              <motion.button
                onClick={() => setShowAddClassForm(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {[
                { label: 'Teacher Email', name: 'teacherEmail', type: 'email', placeholder: 'teacher@example.com' },
                { label: 'Subject', name: 'subject', type: 'select', options: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'] },
              ].map((field, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                >
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all cursor-pointer bg-white/50 backdrop-blur-sm"
                    >
                      <option value="" disabled>Choose a subject</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleFormChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 backdrop-blur-sm"
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Add class description..."
                  rows={3}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 backdrop-blur-sm"
                />
              </motion.div>

              <motion.div
                className="flex gap-3 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setShowAddClassForm(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 15px 25px rgba(79, 70, 229, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ClassesPage;
