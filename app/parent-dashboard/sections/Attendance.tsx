"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Download, 
  ChevronRight,
  User
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AttendanceStatus {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

interface StudentDetails {
  name: string;
  id: string;
  grade: string;
  imageUrl: string;
  parentEmail: string;
}

const StatusCard = ({ title, count, color }: { title: string; count: number; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}
  >
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{count}</p>
    <p className="text-sm text-gray-500 mt-1">Days</p>
  </motion.div>
);

const AttendanceRate = ({ rate, prevRate }: { rate: number; prevRate: number }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
    <h3 className="text-xl font-semibold mb-4">Overall Attendance Rate</h3>
    <div className="text-5xl font-bold text-blue-600 mb-4">{rate}%</div>
    <div className="flex items-center justify-center space-x-4">
      <div className="text-gray-500">{prevRate}%</div>
      <ChevronRight className="text-gray-400" />
      <div className="text-blue-600 font-semibold">{rate}%</div>
      <ChevronRight className="text-gray-400" />
      <div className="text-green-500">95%</div>
    </div>
    <p className="text-sm text-gray-500 mt-4">Target: 95%</p>
  </div>
);

const StudentProfile = ({ student }: { student: StudentDetails }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <img
          src={student.imageUrl || '/default-avatar.png'}
          alt={student.name}
          className="rounded-full"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{student.name}</h3>
        <p className="text-gray-500">ID: {student.id}</p>
        <p className="text-gray-500">Grade: {student.grade}</p>
      </div>
    </div>
  </div>
);

const AttendanceLog = ({ data }: { data: any[] }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
    <h3 className="text-lg font-semibold mb-4">Attendance Log</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  entry.status === 'Present' ? 'bg-green-100 text-green-800' :
                  entry.status === 'Absent' ? 'bg-red-100 text-red-800' :
                  entry.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {entry.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.checkIn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export function Attendance() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  // Sample data - replace with actual data from your backend
  const studentDetails: StudentDetails = {
    name: "Caleb White",
    id: "STU2023001",
    grade: "Grade 11",
    imageUrl: "/student-profile.jpg",
    parentEmail: "parent@example.com"
  };

  const attendanceStatus: AttendanceStatus = {
    total: 23,
    present: 13,
    absent: 5,
    late: 3,
    excused: 2
  };

  const currentRate = Math.round((attendanceStatus.present / (attendanceStatus.total - attendanceStatus.excused)) * 100);
  const previousRate = 85; // Sample previous rate

  const handleExport = (format: 'pdf' | 'excel') => {
    // Implement export logic here
    console.log(`Exporting in ${format} format`);
  };

  // Sample attendance log data
  const attendanceLog = [
    { date: '2023-10-01', status: 'Present', checkIn: '8:30 AM', remarks: '-' },
    { date: '2023-10-02', status: 'Late', checkIn: '9:15 AM', remarks: 'Traffic delay' },
    { date: '2023-10-03', status: 'Absent', checkIn: '-', remarks: 'Sick leave' },
    // Add more entries as needed
  ];

  return (
    <section id="attendance" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Student Attendance Report
          </h2>
          <div className="flex space-x-4">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
              className="px-4 py-2 border rounded-lg"
              placeholderText="Select date range"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download size={20} />
                <span>PDF</span>
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download size={20} />
                <span>Excel</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <StudentProfile student={studentDetails} />
          <StatusCard title="Total Days" count={attendanceStatus.total} color="border-gray-400" />
          <StatusCard title="Present" count={attendanceStatus.present} color="border-green-500" />
          <StatusCard title="Absent" count={attendanceStatus.absent} color="border-red-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <StatusCard title="Late" count={attendanceStatus.late} color="border-yellow-500" />
          <AttendanceRate rate={currentRate} prevRate={previousRate} />
          <StatusCard title="Excused" count={attendanceStatus.excused} color="border-blue-500" />
        </div>

        <AttendanceLog data={attendanceLog} />
      </div>
    </section>
  );
}

