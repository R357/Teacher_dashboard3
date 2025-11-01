'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimator } from './ScrollAnimator';

export function FeedbackSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm dashboard-card">
      <ScrollAnimator animation="fadeUp">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left side - Feedback Form */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900">Feedback & Suggestions</h2>
              <p className="text-gray-600 mt-2">
                Share your thoughts to help us improve your child's learning experience
              </p>
            </motion.div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              // Here you would typically send the data to your API
              console.log(Object.fromEntries(formData));
              form.reset();
              
              // Show success message
              const successMsg = document.getElementById('feedbackSuccess');
              if (successMsg) {
                successMsg.classList.remove('opacity-0');
                setTimeout(() => {
                  successMsg.classList.add('opacity-0');
                }, 3000);
              }
            }}>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Parent's Name</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Student's Name</label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Class/Grade</label>
                  <input
                    type="text"
                    name="classGrade"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Feedback Category</label>
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    <option value="teaching">Teaching</option>
                    <option value="communication">Communication</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="others">Others</option>
                  </select>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Submit Feedback
                </motion.button>
              </div>
            </form>
          </div>

          {/* Right side - Feedback Summary */}
          <ScrollAnimator animation="fadeUp" className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Feedback Summary</h3>
              
              <motion.div 
                className="bg-white rounded-lg p-6 mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm text-gray-600">Teaching (40%)</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm text-gray-600">Communication (30%)</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Infrastructure (20%)</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                    <span className="text-sm text-gray-600">Others (10%)</span>
                  </motion.div>
                </div>
              </motion.div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Comments</h4>
                <motion.div className="space-y-4">
                  <motion.div 
                    className="bg-white p-4 rounded-lg"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-gray-700">The Python programming classes are great!</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-lg"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-gray-700">Excellent progress in React and JavaScript</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </ScrollAnimator>

      {/* Success Message */}
      <div 
        id="feedbackSuccess" 
        className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 transition-opacity duration-300"
      >
        Thank you for your feedback!
      </div>
    </div>
  );
}