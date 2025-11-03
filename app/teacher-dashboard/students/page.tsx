'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
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

  // Dummy student data
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

  // Filter students (removed status filter)
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'All' || student.className === filterClass;
    return matchesSearch && matchesClass;
  });

  // Get unique values for filters
  const classes = ['All', ...Array.from(new Set(students.map(s => s.className)))];

  // Calculate statistics (removed active students count)
  const totalStudents = students.length;
  const avgAttendance = Math.round(students.reduce((sum, s) => sum + s.attendancePercentage, 0) / students.length);
  const avgGrade = Math.round(students.reduce((sum, s) => sum + s.averageGrade, 0) / students.length);

  // Get grade color
  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-100';
    if (grade >= 75) return 'text-blue-600 bg-blue-100';
    if (grade >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Get attendance color
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'bg-green-500';
    if (attendance >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Students</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and monitor student performance</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Student
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards - Removed Active Students card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                <p className="text-sm text-gray-600 mb-1">Avg. Attendance</p>
                <p className="text-3xl font-bold text-gray-900">{avgAttendance}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Grade</p>
                <p className="text-3xl font-bold text-gray-900">{avgGrade}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Toggle - Removed Status Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Grid View"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Table View"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View - Removed Status Badge and Action Buttons */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-16 h-16 rounded-full border-2 border-indigo-500"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-600">{student.rollNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Class */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                    </svg>
                    <span className="text-sm text-gray-600">{student.className}</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span className="text-sm text-gray-600 truncate">{student.email}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span className="text-sm text-gray-600">{student.phone}</span>
                  </div>

                  {/* Attendance */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Attendance
                      </span>
                      <span className="text-sm font-bold text-gray-900">{student.attendancePercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getAttendanceColor(student.attendancePercentage)}`}
                        style={{ width: `${student.attendancePercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Average Grade */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Average Grade</span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getGradeColor(student.averageGrade)}`}>
                      {student.averageGrade}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View - Removed Status and Actions columns */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Roll Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Avg. Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full"
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
                          <div className="flex-1 w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getAttendanceColor(student.attendancePercentage)}`}
                              style={{ width: `${student.attendancePercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{student.attendancePercentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getGradeColor(student.averageGrade)}`}>
                          {student.averageGrade}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
