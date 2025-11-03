'use client';

import { useState } from 'react';

// Types
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

  // Helper function to get random status
  const getRandomStatus = (): 'Present' | 'Absent' => {
    return Math.random() > 0.5 ? 'Present' : 'Absent';
  };

  // Generate attendance with random status
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

  // Student attendance summary data
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
    {
      id: '2',
      studentName: 'Diya Patel',
      rollNumber: 'VI-MAT-002',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 92,
      absentDays: 8,
      attendancePercentage: 92,
      avatar: 'https://ui-avatars.com/api/?name=Diya+Patel&background=EC4899&color=fff'
    },
    {
      id: '3',
      studentName: 'Arjun Reddy',
      rollNumber: 'VI-MAT-003',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 88,
      absentDays: 12,
      attendancePercentage: 88,
      avatar: 'https://ui-avatars.com/api/?name=Arjun+Reddy&background=10B981&color=fff'
    },
    {
      id: '4',
      studentName: 'Ananya Iyer',
      rollNumber: 'VI-MAT-004',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 98,
      absentDays: 2,
      attendancePercentage: 98,
      avatar: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=F59E0B&color=fff'
    },
    {
      id: '5',
      studentName: 'Rohan Kapoor',
      rollNumber: 'VI-MAT-005',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 85,
      absentDays: 15,
      attendancePercentage: 85,
      avatar: 'https://ui-avatars.com/api/?name=Rohan+Kapoor&background=8B5CF6&color=fff'
    },
    {
      id: '6',
      studentName: 'Priya Deshmukh',
      rollNumber: 'VI-MAT-006',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 90,
      absentDays: 10,
      attendancePercentage: 90,
      avatar: 'https://ui-avatars.com/api/?name=Priya+Deshmukh&background=EF4444&color=fff'
    },
    {
      id: '7',
      studentName: 'Kabir Singh',
      rollNumber: 'VI-MAT-007',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 91,
      absentDays: 9,
      attendancePercentage: 91,
      avatar: 'https://ui-avatars.com/api/?name=Kabir+Singh&background=06B6D4&color=fff'
    },
    {
      id: '8',
      studentName: 'Ishita Mehta',
      rollNumber: 'VI-MAT-008',
      className: 'Grade VI – Mathematics',
      totalDays: 100,
      presentDays: 94,
      absentDays: 6,
      attendancePercentage: 94,
      avatar: 'https://ui-avatars.com/api/?name=Ishita+Mehta&background=F97316&color=fff'
    }
  ];

  const classes = ['Grade VI – Mathematics', 'Grade VIII – Physics', 'Grade IX – Chemistry', 'Grade VII – English'];

  // Calculate statistics
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;
  const totalStudents = attendance.length;

  // Get status color
  const getStatusColor = (status: string) => {
    return status === 'Present' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700';
  };

  // Get attendance percentage color
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Handle attendance update
  const handleAttendanceChange = (id: string, status: 'Present' | 'Absent') => {
    setAttendance(attendance.map(a => 
      a.id === id ? { ...a, status } : a
    ));
  };

  // Handle save attendance
  const handleSaveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
              <p className="text-sm text-gray-600 mt-1">Mark and track student attendance</p>
            </div>
            <div className="flex gap-2">
              <button className={`px-4 py-2 rounded-xl font-medium transition-all ${viewMode === 'daily' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setViewMode('daily')}>
                Daily View
              </button>
              <button className={`px-4 py-2 rounded-xl font-medium transition-all ${viewMode === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setViewMode('summary')}>
                Summary View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Present</p>
                <p className="text-3xl font-bold text-green-600">{presentCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Absent</p>
                <p className="text-3xl font-bold text-red-600">{absentCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
          </div>
        </div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Roll Number</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendance.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{record.studentName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.rollNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.className}</td>
                        <td className="px-6 py-4">
                          <select value={record.status} onChange={(e) => handleAttendanceChange(record.id, e.target.value as 'Present' | 'Absent')} className={`px-3 py-1 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer ${getStatusColor(record.status)}`}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={handleSaveAttendance} className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 13a3 3 0 105.119-6H9m-1 0a4 4 0 00-4.535 4M15 13l-3-3m0 0l-3 3m3-3v6m3 0a6 6 0 11-12 0"/>
                </svg>
                Save Attendance
              </button>
            </div>
          </div>
        )}

        {/* Summary View */}
        {viewMode === 'summary' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Roll Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class Name</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Days</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Present</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Absent</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Attendance %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentSummary.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.studentName} className="w-8 h-8 rounded-full" />
                          <span className="text-sm font-semibold text-gray-900">{student.studentName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.className}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{student.totalDays}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">{student.presentDays}</td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">{student.absentDays}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getAttendanceColor(student.attendancePercentage)}`}>
                          {student.attendancePercentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
