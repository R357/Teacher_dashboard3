'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Grade Form Handlers
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
    // Link to your endpoint here
  };

  // Report Card Form Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    // Check file type
    if (selectedFile.type !== 'application/pdf') {
      setFileError('Only PDF files are allowed');
      return;
    }

    // Check file size (10MB = 10485760 bytes)
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

    // Link to your endpoint here
    // You can use FormData to send the file
    const formData = new FormData();
    formData.append('studentId', reportForm.studentId);
    formData.append('file', reportForm.file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-9xl mx-auto mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Grading & Report Card Management
        </h1>
        <p className="text-gray-600 mt-2">Submit grades and upload student report cards</p>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-7xl mx-auto mb-6 p-4 bg-green-100 border-2 border-green-300 text-green-700 rounded-xl"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Grade Now */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Grade Now</h2>
          </div>

          <form onSubmit={handleGradeSubmit} className="space-y-6">
            {/* Student Roll Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Roll Number
              </label>
              <input
                type="text"
                value={gradeForm.studentRollNumber}
                onChange={(e) => handleStudentRollNumberChange(e.target.value)}
                placeholder="Enter student roll number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>

            {/* Subjects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Subjects
                </label>
                <span className="text-xs text-gray-500">
                  {gradeForm.subjects.length} subject{gradeForm.subjects.length !== 1 ? 's' : ''}
                </span>
              </div>

              <AnimatePresence>
                {gradeForm.subjects.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-gray-200 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">
                        Subject {index + 1}
                      </span>
                      {gradeForm.subjects.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => removeSubject(subject.id)}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Remove
                        </motion.button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Subject Name */}
                      <input
                        type="text"
                        value={subject.subjectName}
                        onChange={(e) => handleSubjectChange(subject.id, 'subjectName', e.target.value)}
                        placeholder="Subject Name"
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                        required
                      />

                      {/* Test Title */}
                      <input
                        type="text"
                        value={subject.testTitle}
                        onChange={(e) => handleSubjectChange(subject.id, 'testTitle', e.target.value)}
                        placeholder="Test Title"
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                        required
                      />

                      {/* Obtained Marks */}
                      <input
                        type="number"
                        value={subject.obtainedMarks}
                        onChange={(e) => handleSubjectChange(subject.id, 'obtainedMarks', e.target.value)}
                        placeholder="Obtained Marks"
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                        required
                      />

                      {/* Total Marks */}
                      <input
                        type="number"
                        value={subject.totalMarks}
                        onChange={(e) => handleSubjectChange(subject.id, 'totalMarks', e.target.value)}
                        placeholder="Total Marks"
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                        required
                      />
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
                className="w-full py-2 px-4 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Subject
              </motion.button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 13a3 3 0 105.119-6H9m-1 0a4 4 0 00-4.535 4M15 13l-3-3m0 0l-3 3m3-3v6m3 0a6 6 0 11-12 0"/>
              </svg>
              Submit Grades
            </motion.button>
          </form>
        </motion.div>

        {/* Section 2: Upload Report Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Report Card</h2>
          </div>

          <form onSubmit={handleReportSubmit} className="space-y-6">
            {/* Student ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID
              </label>
              <input
                type="text"
                value={reportForm.studentId}
                onChange={(e) => handleReportStudentIdChange(e.target.value)}
                placeholder="Enter student ID"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label
                  htmlFor="pdf-upload"
                  className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-green-300 rounded-xl cursor-pointer hover:bg-green-50 transition-all"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-900">
                      {reportForm.file ? reportForm.file.name : 'Click to upload PDF'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* File Error Message */}
            <AnimatePresence>
              {fileError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-100 border-2 border-red-300 text-red-700 rounded-lg text-sm"
                >
                  {fileError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* File Info */}
            {reportForm.file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-green-50 border-2 border-green-200 rounded-lg"
              >
                <p className="text-sm text-green-800">
                  <span className="font-semibold">File selected:</span> {reportForm.file.name}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Size: {(reportForm.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!reportForm.file}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 13a3 3 0 105.119-6H9m-1 0a4 4 0 00-4.535 4M15 13l-3-3m0 0l-3 3m3-3v6m3 0a6 6 0 11-12 0"/>
              </svg>
              Upload Report Card
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default GradeAndReportPage;