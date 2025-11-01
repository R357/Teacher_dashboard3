import React from 'react';

const AttendanceCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
      View Details
    </button>
  </div>
);

export default function Attendance() {
  return (
    <section id="attendance" className="py-20 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Attendance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AttendanceCard title="Algorithms Structures" description="View attendance records and statistics." />
          <AttendanceCard title="Object Oriented Programming" description="Check attendance history and reports." />
          <AttendanceCard title="Database Programming" description="Monitor attendance patterns." />
          <AttendanceCard title="Web Development" description="Review attendance summaries." />
          <AttendanceCard title="Mobile Applications" description="View attendance details." />
          <AttendanceCard title="Machine Learning" description="Check attendance analytics." />
        </div>
      </div>
    </section>
  );
}

