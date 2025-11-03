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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <section id="feedback" className="py-1 bg-gray-50 h-full flex flex-col">
      <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2 h-full flex flex-col">
        <div className="text-center mb-2 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900">Feedback & Suggestions</h2>
          <p className="mt-0.5 text-xs text-gray-600">
            Share your thoughts to help us improve your child's learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Feedback Form</h2>
            <form onSubmit={handleSubmit} className="space-y-2 flex-1 flex flex-col">
              <div>
                <label htmlFor="parentName" className="block text-xs font-medium text-gray-700">Parent's Name</label>
                <input
                  type="text"
                  name="parentName"
                  id="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="mt-0.5 block w-full px-2 py-1 text-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="studentName" className="block text-xs font-medium text-gray-700">Student's Name</label>
                <input
                  type="text"
                  name="studentName"
                  id="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="mt-0.5 block w-full px-2 py-1 text-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="classGrade" className="block text-xs font-medium text-gray-700">Class/Grade</label>
                <input
                  type="text"
                  name="classGrade"
                  id="classGrade"
                  value={formData.classGrade}
                  onChange={handleChange}
                  className="mt-0.5 block w-full px-2 py-1 text-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-medium text-gray-700">Feedback Category</label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-0.5 block w-full px-2 py-1 text-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  {feedbackCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="block text-xs font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-0.5 block w-full px-2 py-1 text-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 flex-1 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Feedback Summary</h2>
            
            {/* Chart */}
            <div className="mb-2 max-w-[180px] h-[150px] mx-auto flex-shrink-0">
              <Pie data={chartData} options={chartOptions} />
            </div>

            {/* Recent Comments */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xs font-semibold text-gray-800 mb-1">Recent Comments</h3>
              <ul className="space-y-1 flex-1">
                <li className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-700 text-sm">The math classes are great!</p>
                </li>
                <li className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-700 text-sm">Would love more updates about homework</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

