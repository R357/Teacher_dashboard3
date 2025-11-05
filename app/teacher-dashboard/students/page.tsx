'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  email: string;
  phone: string;
  attendancePercentage: number;
  averageGrade: number;
  avatar: string;
  joinDate: string;
  parentContact: string;
}

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const students: Student[] = [
    {
      id: '1',
      name: 'Aarav Sharma',
      rollNumber: 'X-MAT-001',
      className: 'Grade X – Mathematics',
      email: 'aarav.sharma@school.edu',
      phone: '+91 98765 43210',
      attendancePercentage: 95,
      averageGrade: 88,
      avatar: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=4F46E5&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43211'
    },
    {
      id: '2',
      name: 'Diya Patel',
      rollNumber: 'X-MAT-002',
      className: 'Grade X – Mathematics',
      email: 'diya.patel@school.edu',
      phone: '+91 98765 43212',
      attendancePercentage: 92,
      averageGrade: 91,
      avatar: 'https://ui-avatars.com/api/?name=Diya+Patel&background=EC4899&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43213'
    },
    {
      id: '3',
      name: 'Arjun Reddy',
      rollNumber: 'VIII-PHY-015',
      className: 'Grade VIII – Physics',
      email: 'arjun.reddy@school.edu',
      phone: '+91 98765 43214',
      attendancePercentage: 87,
      averageGrade: 84,
      avatar: 'https://ui-avatars.com/api/?name=Arjun+Reddy&background=10B981&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43215'
    },
    {
      id: '4',
      name: 'Ananya Iyer',
      rollNumber: 'IX-CHEM-008',
      className: 'Grade IX – Chemistry',
      email: 'ananya.iyer@school.edu',
      phone: '+91 98765 43216',
      attendancePercentage: 98,
      averageGrade: 94,
      avatar: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=F59E0B&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43217'
    },
    {
      id: '5',
      name: 'Rohan Kapoor',
      rollNumber: 'VII-ENG-022',
      className: 'Grade VII – English',
      email: 'rohan.kapoor@school.edu',
      phone: '+91 98765 43218',
      attendancePercentage: 78,
      averageGrade: 76,
      avatar: 'https://ui-avatars.com/api/?name=Rohan+Kapoor&background=8B5CF6&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43219'
    },
    {
      id: '6',
      name: 'Priya Deshmukh',
      rollNumber: 'VII-HIS-018',
      className: 'Grade VII – History',
      email: 'priya.deshmukh@school.edu',
      phone: '+91 98765 43220',
      attendancePercentage: 90,
      averageGrade: 87,
      avatar: 'https://ui-avatars.com/api/?name=Priya+Deshmukh&background=EF4444&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43221'
    },
    {
      id: '7',
      name: 'Kabir Singh',
      rollNumber: 'IX-BIO-012',
      className: 'Grade IX – Biology',
      email: 'kabir.singh@school.edu',
      phone: '+91 98765 43222',
      attendancePercentage: 85,
      averageGrade: 82,
      avatar: 'https://ui-avatars.com/api/?name=Kabir+Singh&background=06B6D4&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43223'
    },
    {
      id: '8',
      name: 'Ishita Mehta',
      rollNumber: 'X-MAT-003',
      className: 'Grade X – Mathematics',
      email: 'ishita.mehta@school.edu',
      phone: '+91 98765 43224',
      attendancePercentage: 94,
      averageGrade: 89,
      avatar: 'https://ui-avatars.com/api/?name=Ishita+Mehta&background=F97316&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43225'
    },
    {
      id: '9',
      name: 'Vivaan Joshi',
      rollNumber: 'VIII-PHY-016',
      className: 'Grade VIII – Physics',
      email: 'vivaan.joshi@school.edu',
      phone: '+91 98765 43226',
      attendancePercentage: 88,
      averageGrade: 85,
      avatar: 'https://ui-avatars.com/api/?name=Vivaan+Joshi&background=14B8A6&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43227'
    },
    {
      id: '10',
      name: 'Saanvi Kumar',
      rollNumber: 'VII-ENG-023',
      className: 'Grade VII – English',
      email: 'saanvi.kumar@school.edu',
      phone: '+91 98765 43228',
      attendancePercentage: 92,
      averageGrade: 90,
      avatar: 'https://ui-avatars.com/api/?name=Saanvi+Kumar&background=A855F7&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43229'
    },
    {
      id: '11',
      name: 'Aditya Nair',
      rollNumber: 'IX-CHEM-009',
      className: 'Grade IX – Chemistry',
      email: 'aditya.nair@school.edu',
      phone: '+91 98765 43230',
      attendancePercentage: 82,
      averageGrade: 79,
      avatar: 'https://ui-avatars.com/api/?name=Aditya+Nair&background=3B82F6&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43231'
    },
    {
      id: '12',
      name: 'Myra Rao',
      rollNumber: 'VII-HIS-019',
      className: 'Grade VII – History',
      email: 'myra.rao@school.edu',
      phone: '+91 98765 43232',
      attendancePercentage: 96,
      averageGrade: 93,
      avatar: 'https://ui-avatars.com/api/?name=Myra+Rao&background=EC4899&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43233'
    },
    {
      id: '13',
      name: 'Reyansh Gupta',
      rollNumber: 'X-MAT-004',
      className: 'Grade X – Mathematics',
      email: 'reyansh.gupta@school.edu',
      phone: '+91 98765 43234',
      attendancePercentage: 65,
      averageGrade: 68,
      avatar: 'https://ui-avatars.com/api/?name=Reyansh+Gupta&background=6366F1&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43235'
    },
    {
      id: '14',
      name: 'Kiara Verma',
      rollNumber: 'VIII-PHY-017',
      className: 'Grade VIII – Physics',
      email: 'kiara.verma@school.edu',
      phone: '+91 98765 43236',
      attendancePercentage: 91,
      averageGrade: 88,
      avatar: 'https://ui-avatars.com/api/?name=Kiara+Verma&background=10B981&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43237'
    },
    {
      id: '15',
      name: 'Ayaan Khan',
      rollNumber: 'IX-BIO-013',
      className: 'Grade IX – Biology',
      email: 'ayaan.khan@school.edu',
      phone: '+91 98765 43238',
      attendancePercentage: 89,
      averageGrade: 86,
      avatar: 'https://ui-avatars.com/api/?name=Ayaan+Khan&background=F59E0B&color=fff',
      joinDate: '2024-04-01',
      parentContact: '+91 98765 43239'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'All' || student.className === filterClass;
    return matchesSearch && matchesClass;
  });

  const classes = ['All', ...Array.from(new Set(students.map(s => s.className)))];
  const totalStudents = students.length;
  const avgAttendance = Math.round(students.reduce((sum, s) => sum + s.attendancePercentage, 0) / students.length);
  const avgGrade = Math.round(students.reduce((sum, s) => sum + s.averageGrade, 0) / students.length);

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-blue-600 bg-white-700';
    if (grade >= 75) return 'text-blue-600 bg-white-700';
    if (grade >= 60) return 'text-blue-600 bg-white-700';
    return 'text-blue-600 bg-blue-700';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (attendance >= 75) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    return 'bg-gradient-to-r from-blue-500 to-blue-600';
  };

  // Parallax
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
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
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Students
              </h1>
              <p className="text-sm text-gray-600 mt-1">Manage and monitor student performance</p>
            </motion.div>
            <motion.button
              className="px-5 py-2.5 bg-gradient-to-r from-topblue-500 to-topblue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/40"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -4,
                scale: 1.05,
                boxShadow: "0 25px 35px rgba(79, 70, 229, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Student
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards with Parallax */}
        <motion.div
          ref={statsRef}
          style={{ y, opacity }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Total Students', value: totalStudents, icon: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z', gradient: 'from-blue-500 to-blue-600' },
            { label: 'Avg. Attendance', value: `${avgAttendance}%`, icon: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', gradient: 'from-blue-500 to-blue-600' },
            { label: 'Avg. Grade', value: `${avgGrade}%`, icon: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z', gradient: 'from-blue-500 to-blue-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50 cursor-pointer overflow-hidden relative"
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
                  <svg className="w-7 h-7 text-white" fill="currentColor " viewBox="0 0 20 20">
                    <path d={stat.icon} />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters in Single Line */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-10 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{
            boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
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
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer bg-white/50 backdrop-blur-sm"
                whileHover={{ borderColor: '#4f46e5' }}
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
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
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.08) }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-start gap-4">
                    <motion.img
                      src={student.avatar}
                      alt={student.name}
                      className="w-16 h-16 rounded-full border-2 border-indigo-500 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-600">{student.rollNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {[
                    { icon: 'M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z', text: student.className },
                    { icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z', text: student.email },
                    { icon: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z', text: student.phone },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d={item.icon} />
                      </svg>
                      <span className="text-sm text-gray-600 truncate">{item.text}</span>
                    </motion.div>
                  ))}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Attendance
                      </span>
                      <span className="text-sm font-bold text-gray-900">{student.attendancePercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className={`h-2.5 rounded-full ${getAttendanceColor(student.attendancePercentage)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${student.attendancePercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.08) }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">Average Grade</span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getGradeColor(student.averageGrade)}`}>
                      {student.averageGrade}%
                    </span>
                  </div>
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
                    {['Student', 'Roll Number', 'Class', 'Contact', 'Attendance', 'Avg. Grade'].map((header, i) => (
                      <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      className="hover:bg-blue-50/30 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.45 + (index * 0.05) }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full shadow-md"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.className}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-2 rounded-full ${getAttendanceColor(student.attendancePercentage)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${student.attendancePercentage}%` }}
                              transition={{ duration: 0.8, delay: 0.45 + (index * 0.05) }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{student.attendancePercentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getGradeColor(student.averageGrade)}`}>
                          {student.averageGrade}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredStudents.length === 0 && (
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </motion.svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
