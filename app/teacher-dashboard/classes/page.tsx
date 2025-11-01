"use client";

import React from 'react';

export default function ClassesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>
      
      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Class Cards - Replace with actual data */}
        {[
          { name: 'Mathematics', grade: '10th Grade', students: 30, time: '9:00 AM' },
          { name: 'Physics', grade: '12th Grade', students: 25, time: '10:30 AM' },
          { name: 'Chemistry', grade: '11th Grade', students: 28, time: '1:00 PM' },
        ].map((classItem, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{classItem.name}</h2>
            <div className="space-y-2 text-gray-600">
              <p>{classItem.grade}</p>
              <p>{classItem.students} Students</p>
              <p>Class Time: {classItem.time}</p>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}