'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, ArrowLeft, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../navbar';  // Correct path: goes from announcements/ up to teacher-dashboard/

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Assesment Schedule Released',
      date: '14 December 2025',
      time: '12:00 pm',
      priority: 'high',
      description: 'The assessment schedule for the upcoming semester has been released. Please check your respective class schedules and prepare accordingly.'
    },
    {
      id: 2,
      title: 'Submmission date of assignment',
      date: '18 December 2025',
      time: '09:00 am',
      priority: 'medium',
      description: 'All pending assignments must be submitted by the deadline. Late submissions will incur grade penalties.'
    },
    {
      id: 3,
      title: 'Grading of the assements',
      date: '21 December 2025',
      time: '11:00 am',
      priority: 'high',
      description: 'Assessment grading will be completed and results will be published on the student portal by the end of this week.'
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      date: '25 December 2025',
      time: '02:00 pm',
      priority: 'medium',
      description: 'Quarterly parent-teacher meetings are scheduled. Please ensure you attend to discuss student progress.'
    },
    {
      id: 5,
      title: 'Winter Break Schedule',
      date: '28 December 2025',
      time: '10:00 am',
      priority: 'low',
      description: 'Classes will be suspended for winter break from December 28th to January 5th. Regular classes resume on January 6th.'
    },
    {
      id: 6,
      title: 'New Course Materials Available',
      date: '30 December 2025',
      time: '03:00 pm',
      priority: 'medium',
      description: 'Updated course materials and study guides are now available on the learning portal.'
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    if (activeFilter === 'all') return true;
    return announcement.priority === activeFilter;
  });

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-5xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                  <p className="text-gray-600 text-sm">Stay updated with all announcements</p>
                </div>
              </div>
              
              <span className="text-sm text-gray-600 font-medium">
                {filteredAnnouncements.length} announcements
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('high')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'high'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Important
              </button>
              <button
                onClick={() => setActiveFilter('medium')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'medium'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setActiveFilter('low')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'low'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Low
              </button>
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center ${
                        announcement.priority === 'high' 
                          ? 'bg-red-100' 
                          : announcement.priority === 'medium'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}>
                        <Bell className={`w-7 h-7 ${
                          announcement.priority === 'high' 
                            ? 'text-red-600' 
                            : announcement.priority === 'medium'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Clock className="w-4 h-4 mr-1" />
                          {announcement.date} {announcement.time}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {announcement.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col items-end gap-3 ml-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {announcement.priority === 'high' && (
                        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                          Important
                        </span>
                      )}
                      {announcement.priority === 'medium' && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                          Medium
                        </span>
                      )}
                      {announcement.priority === 'low' && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          Low
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAnnouncements.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600 text-sm">
                There are no announcements matching your filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}