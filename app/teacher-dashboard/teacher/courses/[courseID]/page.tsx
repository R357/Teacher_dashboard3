'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Types
interface Student {
  id: string;
  name: string;
  attendance: number;
  assignments: number;
}

interface Note {
  id: string;
  title: string;
  topic: string;
  chapter: string;
  uploadedDate: string;
  status: 'Pending' | 'Approved';
}

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  submittedDate: string;
  attendance: 'Marked' | 'Pending';
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  link: string;
  isActive: boolean;
}

const CourseDetailPage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'quizzes' | 'notes' | 'meetings' | 'submissions'>('overview');
  const [isLoaded, setIsLoaded] = useState(true);
  const [jitsiApi, setJitsiApi] = useState<any>(null);
  const [meetingActive, setMeetingActive] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Meeting Form State
  const [meetingForm, setMeetingForm] = useState({
    roomName: '',
    teacherName: '',
    password: ''
  });

  const [meetingLink, setMeetingLink] = useState('');
  
  // Assignment Form State
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    file: null as File | null
  });

  // Quiz Form State
  const [quizForm, setQuizForm] = useState({
    title: '',
    startDateTime: "",
    link: ''
  });

  // Notes Form State
  const [notesForm, setNotesForm] = useState({
    title: '',
    topic: '',
    chapter: '',
    file: null as File | null
  });

  const [fileError, setFileError] = useState('');
  const [notesFileError, setNotesFileError] = useState('');
  const [uploadedNotes, setUploadedNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Quadratic Equations',
      topic: 'Algebra',
      chapter: 'Chapter 4',
      uploadedDate: '2025-10-20',
      status: 'Approved'
    },
    {
      id: '2',
      title: 'Trigonometry Basics',
      topic: 'Trigonometry',
      chapter: 'Chapter 8',
      uploadedDate: '2025-10-28',
      status: 'Pending'
    }
  ]);

  // Dummy Data
  const courseData = {
    name: 'Mathematics',
    class: 'Class 10th',
    students: 42,
    academicYear: '2025-26',
    id: 'math-101'
  };

  const stats = {
    totalStudents: 42,
    avgAttendance: 87,
    assignments: 12
  };

  const students: Student[] = [
    { id: '1', name: 'Aarav Sharma', attendance: 92, assignments: 10 },
    { id: '2', name: 'Diya Patel', attendance: 88, assignments: 11 },
    { id: '3', name: 'Arjun Reddy', attendance: 85, assignments: 9 },
    { id: '4', name: 'Ananya Iyer', attendance: 95, assignments: 12 },
    { id: '5', name: 'Rohan Kapoor', attendance: 78, assignments: 8 },
    { id: '6', name: 'Priya Deshmukh', attendance: 91, assignments: 11 }
  ];

  const submissions: Submission[] = [
    { id: '1', studentId: 'STU001', studentName: 'Aarav Sharma', submittedDate: '2025-11-01', attendance: 'Marked' },
    { id: '2', studentId: 'STU002', studentName: 'Diya Patel', submittedDate: '2025-11-02', attendance: 'Marked' },
    { id: '3', studentId: 'STU003', studentName: 'Arjun Reddy', submittedDate: '2025-11-03', attendance: 'Pending' },
    { id: '4', studentId: 'STU004', studentName: 'Ananya Iyer', submittedDate: '2025-11-02', attendance: 'Marked' }
  ];

  // Load Jitsi API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (jitsiApi) {
        try {
          jitsiApi.dispose();
        } catch (error) {
          console.log('Error disposing Jitsi API:', error);
        }
      }
    };
  }, []);

  // PDF Validation Function
  const validatePDF = (file: File | null, errorSetter: Function): boolean => {
    if (!file) return false;

    // Check file type
    if (file.type !== 'application/pdf') {
      errorSetter('Warning: Only PDF files are allowed. You selected a ' + file.type.split('/')[1] + ' file.');
      return false;
    }

    // Check file size (10MB = 10485760 bytes)
    if (file.size > 10485760) {
      errorSetter('Warning: File size must not exceed 10MB. Your file is ' + (file.size / 1048576).toFixed(2) + 'MB.');
      return false;
    }

    errorSetter('');
    return true;
  };

  // Start Jitsi Meeting
  const startMeeting = () => {
    if (!meetingForm.roomName || !meetingForm.teacherName || !meetingForm.password) {
      alert('Please fill all fields');
      return;
    }

    const fullRoomName = `${courseData.id}_${meetingForm.roomName.toLowerCase().replace(/\s+/g, '-')}`;
    const link = `https://meet.jit.si/${fullRoomName}`;
    setMeetingLink(link);
    setMeetingActive(true);

    const domain = 'meet.jit.si';
    const options = {
      roomName: fullRoomName,
      width: '100%',
      height: 600,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: meetingForm.teacherName
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
        disableInviteFunctions: true
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'desktop', 'hangup', 'chat',
          'tileview', 'fullscreen', 'mute-everyone', 'security'
        ]
      }
    };

    try {
      const api = new (window as any).JitsiMeetExternalAPI(domain, options);

      api.addEventListener('videoConferenceJoined', () => {
        api.executeCommand('password', meetingForm.password);
      });

      api.addEventListener('readyToClose', () => {
        setMeetingActive(false);
        api.dispose();
        setJitsiApi(null);
      });

      setJitsiApi(api);
    } catch (error) {
      console.error('Error starting meeting:', error);
      alert('Error starting meeting. Please try again.');
    }
  };

  const stopMeeting = () => {
    if (jitsiApi) {
      try {
        jitsiApi.dispose();
      } catch (error) {
        console.log('Error disposing:', error);
      }
      setJitsiApi(null);
    }
    setMeetingActive(false);
    setMeetingLink('');
    setMeetingForm({ roomName: '', teacherName: '', password: '' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Meeting Link: ${meetingLink}\nPassword: ${meetingForm.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // File Upload Handlers with PDF Validation
  const handleAssignmentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setFileError('');
      setAssignmentForm({ ...assignmentForm, file: null });
      return;
    }

    if (validatePDF(file, setFileError)) {
      setAssignmentForm({ ...assignmentForm, file });
    } else {
      setAssignmentForm({ ...assignmentForm, file: null });
    }
  };

  const handleNotesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setNotesFileError('');
      setNotesForm({ ...notesForm, file: null });
      return;
    }

    if (validatePDF(file, setNotesFileError)) {
      setNotesForm({ ...notesForm, file });
    } else {
      setNotesForm({ ...notesForm, file: null });
    }
  };

  // Submit Handlers
  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignmentForm.file) {
      setFileError('Please upload a PDF file');
      return;
    }

    console.log('Assignment:', assignmentForm);
    setAssignmentForm({ title: '', description: '', dueDate: '', file: null });
    setFileError('');
    alert('Assignment posted successfully!');
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quiz:', quizForm);
    setQuizForm({ title: '', startDateTime: '', link: '' });
    alert('Quiz uploaded successfully!');
  };

  const handleNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notesForm.file) {
      setNotesFileError('Please upload a PDF file');
      return;
    }

    const newNote: Note = {
      id: (uploadedNotes.length + 1).toString(),
      title: notesForm.title,
      topic: notesForm.topic,
      chapter: notesForm.chapter,
      uploadedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setUploadedNotes([...uploadedNotes, newNote]);
    setNotesForm({ title: '', topic: '', chapter: '', file: null });
    setNotesFileError('');
    alert('Notes uploaded successfully!');
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'assignments', name: 'Assignments' },
    { id: 'quizzes', name: 'Quizzes' },
    { id: 'notes', name: 'Notes' },
    { id: 'meetings', name: 'Meetings' },
    { id: 'submissions', name: 'Submissions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-6">
      {/* Elongated Course Card at Top */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-9xl mx-auto mb-8 mt-20"
      >
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 overflow-hidden shadow-2xl">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
              animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            ></motion.div>
          </div>

          <div className="relative z-10">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-4"
            >
              {courseData.name}
            </motion.h1>
            
            <div className="flex flex-wrap gap-8 text-white/90">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-semibold">{courseData.class}</span>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-semibold">{courseData.students} Students</span>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-semibold">Academic Year: {courseData.academicYear}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="max-w-9xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black/10 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-black-600">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-black/10 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Attendance</p>
              <p className="text-3xl font-bold text-black-600">{stats.avgAttendance}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/10 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Assignments</p>
              <p className="text-3xl font-bold text-black-600">{stats.assignments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="max-w-9xl mx-auto mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-2 "
        >
<div className="flex flex-wrap gap-4 justify-center">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-9xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Students Overview</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Student Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Attendance</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Assignments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student, idx) => (
                      <motion.tr 
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${student.attendance}%` }}
                                transition={{ duration: 1, delay: idx * 0.05 }}
                                className={`h-2 rounded-full ${
                                  student.attendance >= 90
                                    ? 'bg-blue-500'
                                    : student.attendance >= 75
                                    ? 'bg-blue-400'
                                    : 'bg-blue-300'
                                }`}
                              ></motion.div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 w-10">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.assignments}/12</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Assignment</h2>
              <form onSubmit={handleAssignmentSubmit} className="space-y-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={assignmentForm.title}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={assignmentForm.description}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={assignmentForm.dueDate}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload PDF File (Max 10MB)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleAssignmentFileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">Only PDF files are allowed • Maximum file size: 10MB</p>
                  </div>
                  {fileError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg"
                    >
                      <p className="text-sm text-red-700 font-semibold">⚠️ {fileError}</p>
                    </motion.div>
                  )}
                  {assignmentForm.file && !fileError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg"
                    >
                      <p className="text-sm text-green-700 font-semibold">✓ File selected: {assignmentForm.file.name}</p>
                    </motion.div>
                  )}
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700"
                >
                  Post Assignment
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
            <motion.div
              key="quizzes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Quiz</h2>
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title</label>
                  <input
                    type="text"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date & Time</label>
  <input
    type="datetime-local"
    value={quizForm.startDateTime}
    onChange={(e) => setQuizForm({ ...quizForm, startDateTime: e.target.value })}
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
    required
  />
</div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Link</label>
                  <input
                    type="url"
                    value={quizForm.link}
                    onChange={(e) => setQuizForm({ ...quizForm, link: e.target.value })}
                    placeholder="Paste quiz link here"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700"
                >
                  Upload Quiz
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Notes</h2>
                <form onSubmit={handleNotesSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Notes Title</label>
                    <input
                      type="text"
                      value={notesForm.title}
                      onChange={(e) => setNotesForm({ ...notesForm, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                     <input
                      type="text"
                      value={notesForm.topic}
                      onChange={(e) => setNotesForm({ ...notesForm, topic: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload PDF Notes (Max 10MB)</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleNotesFileChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2">Only PDF files are allowed • Maximum file size: 10MB</p>
                    </div>
                    {notesFileError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg"
                      >
                        <p className="text-sm text-red-700 font-semibold">⚠️ {notesFileError}</p>
                      </motion.div>
                    )}
                    {notesForm.file && !notesFileError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg"
                      >
                        <p className="text-sm text-green-700 font-semibold">✓ File selected: {notesForm.file.name}</p>
                      </motion.div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800"
                  >
                    Upload Notes
                  </motion.button>
                </form>
              </div>

              {/* Uploaded Notes Table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Uploaded Notes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Topic</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Chapter</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Upload Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {uploadedNotes.map((note, idx) => (
                        <motion.tr 
                          key={note.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{note.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{note.topic}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{note.chapter}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{note.uploadedDate}</td>
                          <td className="px-6 py-4">
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                note.status === 'Approved'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-blue-100 text-blue-500'
                              }`}
                            >
                              {note.status}
                            </motion.span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Meetings Tab */}
          {activeTab === 'meetings' && (
            <motion.div
              key="meetings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Schedule Meeting Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Live Meeting</h2>
                <p className="text-sm text-gray-600 mb-6">Meeting for entire {courseData.class} class ({courseData.students} students)</p>

                {!meetingActive && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Meeting Name (Room ID)
                      </label>
                      <input
                        type="text"
                        value={meetingForm.roomName}
                        onChange={(e) => setMeetingForm({ ...meetingForm, roomName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        placeholder="e.g., Math_Class_101"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={meetingForm.teacherName}
                        onChange={(e) => setMeetingForm({ ...meetingForm, teacherName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        placeholder="Teacher Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Set Meeting Password
                      </label>
                      <input
                        type="text"
                        value={meetingForm.password}
                        onChange={(e) => setMeetingForm({ ...meetingForm, password: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        placeholder="e.g., class123"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startMeeting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Start Meeting
                    </motion.button>
                  </div>
                )}

                {meetingLink && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-4"
                  >
                    <p className="text-sm font-semibold text-green-800 mb-2">
                      Share this link with all {courseData.students} students:
                    </p>
                    <div className="bg-white p-3 rounded-lg mb-3 break-all text-sm">
                      <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {meetingLink}
                      </a>
                      <p className="text-gray-600 mt-2">
                        <strong>Password:</strong> {meetingForm.password}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={copyToClipboard}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                      >
                        {copied ? '✓ Copied!' : 'Copy Details'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={stopMeeting}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
                      >
                        End Meeting
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Jitsi Container */}
              {meetingActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 overflow-hidden shadow-2xl"
                >
                  <div id="jitsi-container" className="w-full"></div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <motion.div
              key="submissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Submissions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Student ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Student Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Submitted Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submissions.map((submission, idx) => (
                      <motion.tr 
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{submission.studentId}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{submission.studentName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{submission.submittedDate}</td>
                        <td className="px-6 py-4">
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              submission.attendance === 'Marked'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-blue-100 text-blue-500'
                            }`}
                          >
                            {submission.attendance}
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseDetailPage;
