'use client';
import Navbar from '../navbar';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AttendanceRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  className: string;
  date: string;
  status: 'Present' | 'Absent';
}

interface StudentAttendance {
  id: string;
  studentName: string;
  rollNumber: string;
  className: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  avatar: string;
}

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('Grade VI – Mathematics');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'daily' | 'summary'>('daily');

  const getRandomStatus = (): 'Present' | 'Absent' => {
    return Math.random() > 0.5 ? 'Present' : 'Absent';
  };

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { id: '1', studentName: 'Aarav Sharma', rollNumber: 'VI-MAT-001', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '2', studentName: 'Diya Patel', rollNumber: 'VI-MAT-002', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '3', studentName: 'Arjun Reddy', rollNumber: 'VI-MAT-003', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '4', studentName: 'Ananya Iyer', rollNumber: 'VI-MAT-004', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '5', studentName: 'Rohan Kapoor', rollNumber: 'VI-MAT-005', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '6', studentName: 'Priya Deshmukh', rollNumber: 'VI-MAT-006', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '7', studentName: 'Kabir Singh', rollNumber: 'VI-MAT-007', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
    { id: '8', studentName: 'Ishita Mehta', rollNumber: 'VI-MAT-008', className: 'Grade VI – Mathematics', date: selectedDate, status: getRandomStatus() },
  ]);

  const studentSummary: StudentAttendance[] = [
    {
      id: '1',
      studentName: 'Aarav Sharma',
      rollNumber: 'VI-MAT-001',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 95,
      absentDays: 5,
      attendancePercentage: 95,
      avatar: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=4F46E5&color=fff'
    },
    { id: '2', studentName: 'Diya Patel', rollNumber: 'VI-MAT-002', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 92, absentDays: 8, attendancePercentage: 92, avatar: 'https://ui-avatars.com/api/?name=Diya+Patel&background=EC4899&color=fff' },
    { id: '3', studentName: 'Arjun Reddy', rollNumber: 'VI-MAT-003', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 88, absentDays: 12, attendancePercentage: 88, avatar: 'https://ui-avatars.com/api/?name=Arjun+Reddy&background=10B981&color=fff' },
    { id: '4', studentName: 'Ananya Iyer', rollNumber: 'VI-MAT-004', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 98, absentDays: 2, attendancePercentage: 98, avatar: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=F59E0B&color=fff' },
    { id: '5', studentName: 'Rohan Kapoor', rollNumber: 'VI-MAT-005', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 85, absentDays: 15, attendancePercentage: 85, avatar: 'https://ui-avatars.com/api/?name=Rohan+Kapoor&background=8B5CF6&color=fff' },
    { id: '6', studentName: 'Priya Deshmukh', rollNumber: 'VI-MAT-006', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 90, absentDays: 10, attendancePercentage: 90, avatar: 'https://ui-avatars.com/api/?name=Priya+Deshmukh&background=EF4444&color=fff' },
    { id: '7', studentName: 'Kabir Singh', rollNumber: 'VI-MAT-007', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 91, absentDays: 9, attendancePercentage: 91, avatar: 'https://ui-avatars.com/api/?name=Kabir+Singh&background=06B6D4&color=fff' },
    { id: '8', studentName: 'Ishita Mehta', rollNumber: 'VI-MAT-008', className: 'Grade VI – Mathematics', totalDays: 100, presentDays: 94, absentDays: 6, attendancePercentage: 94, avatar: 'https://ui-avatars.com/api/?name=Ishita+Mehta&background=F97316&color=fff' }
  ];

  const classes = ['Grade VI – Mathematics', 'Grade VIII – Physics', 'Grade IX – Chemistry', 'Grade VII – English'];

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;
  const totalStudents = attendance.length;

  const getStatusColor = (status: string) => {
    return status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-blue-600 bg-blue-100';
    if (percentage >= 75) return 'text-blue-700 bg-blue-100';
    return 'text-red-600 bg-red-100';
  };

  const handleAttendanceChange = (id: string, status: 'Present' | 'Absent') => {
    setAttendance(attendance.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleSaveAttendance = () => {
    alert('Attendance saved successfully!');
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
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      <Navbar />

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
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm mt-[100px]"
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Attendance Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">Mark and track student attendance</p>
            </motion.div>
            <div className="flex gap-2">
              {[
                { mode: 'daily' as const, label: 'Daily View' },
                { mode: 'summary' as const, label: 'Summary View' }
              ].map((btn) => (
                <motion.button
                  key={btn.mode}
                  onClick={() => setViewMode(btn.mode)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    viewMode === btn.mode
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards with Parallax */}
        <motion.div
          ref={statsRef}
          style={{ y, opacity }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Total Students', value: totalStudents, icon: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z', gradient: 'from-blue-500 to-blue-500' },
            { label: 'Present', value: presentCount, icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', gradient: 'from-blue-500 to-blue-600' },
            { label: 'Absent', value: absentCount, icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z', gradient: 'from-blue-500 to-blue-600' },
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

        {/* Filters */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-200">
                    <tr>
                      {['Student', 'Roll Number', 'Class Name', 'Status'].map((header, i) => (
                        <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {attendance.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        className="hover:bg-indigo-50/30 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 * index }}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{record.studentName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.rollNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.className}</td>
                        <td className="px-6 py-4">
                          <motion.select
                            value={record.status}
                            onChange={(e) => handleAttendanceChange(record.id, e.target.value as 'Present' | 'Absent')}
                            className={`px-3 py-1 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer ${getStatusColor(record.status)}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </motion.select>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <motion.button
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                whileHover={{ scale: 1.05, borderColor: '#9ca3af' }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSaveAttendance}
                className="px-6 py-2.5 bg-gradient-to-r from-byblue-600 to-byblue-500 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 15px 25px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 13a3 3 0 105.119-6H9m-1 0a4 4 0 00-4.535 4M15 13l-3-3m0 0l-3 3m3-3v6m3 0a6 6 0 11-12 0"/>
                </svg>
                Save Attendance
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Summary View */}
        {viewMode === 'summary' && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-200">
                  <tr>
                    {['Student', 'Roll Number', 'Class Name', 'Total Days', 'Present', 'Absent', 'Attendance %'].map((header, i) => (
                      <th key={i} className={`px-6 py-4 ${i > 2 ? 'text-center' : 'text-left'} text-xs font-semibold text-gray-700 uppercase tracking-wider`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {studentSummary.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      className="hover:bg-indigo-50/30 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <motion.img
                            src={student.avatar}
                            alt={student.studentName}
                            className="w-8 h-8 rounded-full shadow-md"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                          />
                          <span className="text-sm font-semibold text-gray-900">{student.studentName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.className}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{student.totalDays}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">{student.presentDays}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-myblue">{student.absentDays}</td>
                      <td className="px-6 py-4 text-center">
                        <motion.span
                          className={`px-3 py-1 rounded-lg text-sm font-bold ${getAttendanceColor(student.attendancePercentage)}`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {student.attendancePercentage}%
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
