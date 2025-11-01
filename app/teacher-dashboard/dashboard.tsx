'use client';

import Navbar from './navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome to the Teacher Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-medium text-blue-800">Total Classes</h2>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-medium text-green-800">Assignments</h2>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-medium text-yellow-800">Students</h2>
            <p className="text-3xl font-bold mt-2">120</p>
          </div>

          <div className="bg-purple-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-medium text-purple-800">Notifications</h2>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
