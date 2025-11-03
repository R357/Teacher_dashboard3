'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
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

  // Sample data - replace with API call
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

  // Filter exams with class only
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.className.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = filterClass === 'All' || exam.className === filterClass;
    
    return matchesSearch && matchesClass;
  });

  // Get unique class values for filter
  const classes = ['All', ...Array.from(new Set(exams.map(e => e.className)))];

  // Calculate statistics
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

  // Calculate days until exam
  const getDaysUntilExam = (date: string) => {
    const today = new Date();
    const examDate = new Date(date);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Exams & Assessments</h1>
              <p className="text-sm text-gray-600 mt-1">Schedule and manage all examinations</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Schedule Exam
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Exams</p>
                <p className="text-3xl font-bold text-gray-900">{totalExams}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scheduled</p>
                <p className="text-3xl font-bold text-gray-900">{scheduledExams}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completedExams}</p>
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
                <p className="text-sm text-gray-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingThisWeek}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter, and View Toggle in Single Row */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 w-full">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Class Filter Dropdown Only */}
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm w-full sm:w-auto"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'All' ? 'All Classes' : cls}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
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

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.date);

              return (
                <div key={exam.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {exam.examName}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Subject & Class */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Subject & Class</p>
                        <p className="text-sm font-semibold text-gray-900">{exam.subject}</p>
                        <p className="text-xs text-gray-600">{exam.className}</p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Date & Time</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(exam.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-600">{exam.time} • {exam.duration}</p>
                        {daysUntil >= 0 && (
                          <p className={`text-xs font-semibold ${daysUntil <= 3 ? 'text-red-600' : 'text-blue-600'}`}>
                            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Total Marks */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Total Marks</p>
                        <p className="text-sm font-semibold text-gray-900">{exam.totalMarks} marks</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <Link 
                      href={`/exams/${exam.id}/grade`}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      Grade Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Exam Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Marks</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredExams.map((exam) => {
                    const daysUntil = getDaysUntilExam(exam.date);

                    return (
                      <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{exam.examName}</p>
                            <p className="text-xs text-gray-500">{exam.duration}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                            {exam.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{exam.className}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">
                              {new Date(exam.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-600">{exam.time}</p>
                            {daysUntil >= 0 && (
                              <p className={`text-xs font-semibold ${daysUntil <= 3 ? 'text-red-600' : 'text-blue-600'}`}>
                                {daysUntil === 0 ? 'Today' : `${daysUntil}d`}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{exam.totalMarks}</td>
                        <td className="px-6 py-4">
                          <Link 
                            href={`/exams/${exam.id}/grade`}
                            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                            </svg>
                            Grade Now
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredExams.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Schedule Your First Exam
            </button>
          </div>
        )}
      </div>

      {/* Create Exam Modal (placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Schedule New Exam</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center py-8">
                Exam scheduling form would go here...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
