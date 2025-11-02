"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import teacherDashboardAnimation from '../../login(animations)/TeacherDashboard.json';
import SlideIn from '../student-dashboard/components/SlideIn';

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Try common keys where an app might store user info in localStorage
    try {
      const direct = localStorage.getItem('username');
      if (direct) {
        setUsername(direct);
        return;
      }

      const userJson = localStorage.getItem('user') || localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const parsed = JSON.parse(userJson);
          if (parsed && (parsed.name || parsed.username)) {
            setUsername(parsed.name || parsed.username);
            return;
          }
        } catch (e) {
          // not JSON, ignore
        }
      }

      // Fallback to cookie (if server set a cookie like 'username')
      const cookies = document.cookie.split(';').map(c => c.trim());
      for (const c of cookies) {
        if (c.startsWith('username=')) {
          setUsername(decodeURIComponent(c.split('=')[1]));
          return;
        }
      }

      // Final fallback
      setUsername('Teacher');
    } catch (err) {
      setUsername('Teacher');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* main container: leave top margin so fixed navbar (layout) doesn't overlap */}
      <main className="max-w-7x2 mx-auto pr-10 pl-2 mt-24">
        <div className="pt-3 pb-6 pr-10 pl-3">
          <SlideIn direction="left" delay={0}>
            <div className="bg-blue-100 rounded-xl p-4 shadow-sm mb-6 max-w-3xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-montserrat text-jetblack-800 mb-1">{username ? `Hello ${username}!` : 'Hello!'}</h2>
                  <p className="text-jetblack-600 mb-1 text-sm font-medium font-montserrat">
                    You have 3 new updates. Stay informed about your child progress and activities!
                  </p>
                </div>
                {/* Lottie Animation */}
                <div className="w-24 h-24 flex-shrink-0 ml-4">
                  <Lottie
                    animationData={teacherDashboardAnimation}
                    loop={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* optional spacing / other sections can go below */}
      </main>
    </div>
  );
}
