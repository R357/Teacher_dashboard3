"use client";

import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const feedbackCategories = ['Teaching', 'Communication', 'Infrastructure', 'Others'];

export default function Feedback() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    classGrade: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const chartData = {
    labels: ['Teaching', 'Communication', 'Infrastructure', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#4338ca', '#06b6d4', '#3b82f6', '#6366f1'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <section id="feedback" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Feedback & Suggestions</h2>
          <p className="mt-2 text-lg text-gray-600">
            Share your thoughts to help us improve your child's learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Feedback Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">Parent's Name</label>
                <input
                  type="text"
                  name="parentName"
                  id="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student's Name</label>
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="classGrade" className="block text-sm font-medium text-gray-700">Class/Grade</label>
                <input
                  type="text"
                  name="classGrade"
                  id="classGrade"
                  value={formData.classGrade}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Feedback Category</label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  {feedbackCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Feedback
              </button>
            </form>

            {/* Thank you message */}
            {showThankYou && (
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <p className="text-green-800 text-center">Thank you for your feedback!</p>
              </div>
            )}
          </div>

          {/* Feedback Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Feedback Summary</h2>
            
            {/* Chart */}
            <div className="mb-8 max-w-[300px] mx-auto">
              <Pie data={chartData} options={{ plugins: { legend: { position: 'bottom' } } }} />
            </div>

            {/* Recent Comments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Comments</h3>
              <ul className="space-y-4">
                <li className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">The math classes are great!</p>
                </li>
                <li className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">Would love more updates about homework</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

