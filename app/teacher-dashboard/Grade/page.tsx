'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface Subject {
  id: string;
  subjectName: string;
  testTitle: string;
  obtainedMarks: string;
  totalMarks: string;
}

interface GradeFormData {
  studentRollNumber: string;
  subjects: Subject[];
}

interface ReportCardFormData {
  studentId: string;
  file: File | null;
}

const GradeAndReportPage = () => {
  const [gradeForm, setGradeForm] = useState<GradeFormData>({
    studentRollNumber: '',
    subjects: [
      {
        id: '1',
        subjectName: '',
        testTitle: '',
        obtainedMarks: '',
        totalMarks: ''
      }
    ]
  });

  const [reportForm, setReportForm] = useState<ReportCardFormData>({
    studentId: '',
    file: null
  });

  const [fileError, setFileError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleStudentRollNumberChange = (value: string) => {
    setGradeForm(prev => ({
      ...prev,
      studentRollNumber: value
    }));
  };

  const handleSubjectChange = (id: string, field: keyof Subject, value: string) => {
    setGradeForm(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    }));
  };

  const addSubject = () => {
    const newId = Math.max(...gradeForm.subjects.map(s => parseInt(s.id)), 0) + 1;
    setGradeForm(prev => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        {
          id: newId.toString(),
          subjectName: '',
          testTitle: '',
          obtainedMarks: '',
          totalMarks: ''
        }
      ]
    }));
  };

  const removeSubject = (id: string) => {
    if (gradeForm.subjects.length > 1) {
      setGradeForm(prev => ({
        ...prev,
        subjects: prev.subjects.filter(subject => subject.id !== id)
      }));
    }
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Grade Form Data:', gradeForm);
    setSuccessMessage('Grades submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      setFileError('Only PDF files are allowed');
      return;
    }

    if (selectedFile.size > 10485760) {
      setFileError('File size must not exceed 10MB');
      return;
    }

    setReportForm(prev => ({
      ...prev,
      file: selectedFile
    }));
  };

  const handleReportStudentIdChange = (value: string) => {
    setReportForm(prev => ({
      ...prev,
      studentId: value
    }));
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportForm.studentId) {
      setFileError('Student ID is required');
      return;
    }

    if (!reportForm.file) {
      setFileError('PDF file is required');
      return;
    }

    console.log('Report Card Form Data:', reportForm);
    setSuccessMessage('Report card uploaded successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);

    const formData = new FormData();
    formData.append('studentId', reportForm.studentId);
    formData.append('file', reportForm.file);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-9xl mx-auto mb-12 px-4 sm:px-6 lg:px-8 pt-8 relative z-10 mt-20"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-topblue-600 via-blue-600 to-blue-500 bg-clip-text text-transparent mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Grading & Report Card
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-lg "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Manage student grades and upload report cards
        </motion.p>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-2xl font-semibold flex items-center gap-2 top-10 ">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={containerRef}
        className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10"
      >
        <motion.div
          style={{ y }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Grade Section */}
          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
              </motion.div>
              <div className="relative z-10 flex items-center gap-4 mb-2">
                <motion.div 
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Grade Now</h2>
                  <p className="text-white/80 text-sm">Submit student grades</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleGradeSubmit} className="p-8 space-y-6">
              {/* Student Roll Number */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Student Roll Number
                </label>
                <motion.input
                  type="text"
                  value={gradeForm.studentRollNumber}
                  onChange={(e) => handleStudentRollNumberChange(e.target.value)}
                  placeholder="Enter roll number (e.g., X-MAT-001)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)" }}
                  required
                />
              </motion.div>

              {/* Subjects */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-bold text-gray-800">
                    Subjects
                  </label>
                  <motion.span 
                    className="px-3 py-1 bg-indigo-100 text-topblue-600 rounded-full text-xs font-semibold"
                    key={gradeForm.subjects.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {gradeForm.subjects.length}
                  </motion.span>
                </div>

                <AnimatePresence>
                  {gradeForm.subjects.map((subject, index) => (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-5 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-2xl border-2 border-indigo-100/50 space-y-4 mb-4 hover:border-indigo-200 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <motion.span 
                          className="text-sm font-bold text-blue-700 bg-white px-3 py-1 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Subject {index + 1}
                        </motion.span>
                        {gradeForm.subjects.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => removeSubject(subject.id)}
                            className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-900 rounded-lg hover:bg-myblue transition-all"
                          >
                            X Remove
                          </motion.button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { name: 'subjectName', placeholder: 'Subject Name' },
                          { name: 'testTitle', placeholder: 'Test Title' },
                          { name: 'obtainedMarks', placeholder: 'Obtained Marks', type: 'number' },
                          { name: 'totalMarks', placeholder: 'Total Marks', type: 'number' }
                        ].map((field) => (
                          <motion.input
                            key={field.name}
                            type={field.type || 'text'}
                            value={subject[field.name as keyof Subject]}
                            onChange={(e) => handleSubjectChange(subject.id, field.name as keyof Subject, e.target.value)}
                            placeholder={field.placeholder}
                            className="px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 transition-all text-sm font-medium"
                            whileFocus={{ scale: 1.01 }}
                            required
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Add Subject Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={addSubject}
                  className="w-full py-3 px-4 border-2 border-dashed border-indigo-300 text-blue-600 rounded-xl hover:bg-indigo-50 transition-all font-bold flex items-center justify-center gap-2 group"
                >
                  <motion.svg 
                    className="w-5 h-5 group-hover:rotate-90" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                  Add Subject
                </motion.button>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                </svg>
                Submit Grades
              </motion.button>
            </form>
          </motion.div>

          {/* Report Card Section */}
          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
              </motion.div>
              <div className="relative z-10 flex items-center gap-4 mb-2">
                <motion.div 
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                >
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">Upload Report Card</h2>
                  <p className="text-white/80 text-sm">Submit PDF documents</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleReportSubmit} className="p-8 space-y-6">
              {/* Student ID */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Student ID
                </label>
                <motion.input
                  type="text"
                  value={reportForm.studentId}
                  onChange={(e) => handleReportStudentIdChange(e.target.value)}
                  placeholder="Enter student ID"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)" }}
                  required
                />
              </motion.div>

              {/* PDF Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Upload Report Card (PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                    required
                  />
                  <motion.label
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center w-full p-8 border-3 border-dashed border-blue-300 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="flex flex-col items-center justify-center"
                      animate={{ y: reportForm.file ? 0 : [0, -5, 0] }}
                      transition={{ repeat: reportForm.file ? 0 : Infinity, duration: 2 }}
                    >
                      <motion.svg 
                        className="w-12 h-12 text-blue-600 mb-3 group-hover:scale-110 transition-transform"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ rotate: 10 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </motion.svg>
                      <p className="text-sm font-bold text-gray-900">
                        {reportForm.file ? reportForm.file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">PDF • Maximum 10MB</p>
                    </motion.div>
                  </motion.label>
                </div>
              </motion.div>

              {/* Error/Success Messages */}
              <AnimatePresence>
                {fileError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="p-4 bg-blue-50 border-2 border-blue-200 text-blue-700 rounded-xl text-sm font-semibold flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {fileError}
                  </motion.div>
                )}

                {reportForm.file && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-50 border-2 border-blue-200 rounded-xl"
                  >
                    <p className="text-sm text-blue-800 font-semibold mb-1">
                      ✓ File selected: {reportForm.file.name}
                    </p>
                    <p className="text-xs text-blue-600">
                      Size: {(reportForm.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!reportForm.file}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 13a3 3 0 105.119-6H9m-1 0a4 4 0 00-4.535 4M15 13l-3-3m0 0l-3 3m3-3v6m3 0a6 6 0 11-12 0"/>
                </svg>
                Upload Report Card
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GradeAndReportPage;
