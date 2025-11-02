"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import teacherDashboardAnimation from '../../login(animations)/TeacherDashboard.json';

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
      <main className="max-w-7xl mx-auto px-6 mt-24">
        {/* Hero Card spans from red mark (left edge) to yellow mark (right edge) */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center justify-between gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-5xl font-serif font-bold leading-tight mb-4">{username ? `Hello ${username}!` : 'Hello!'}</h1>
            <p className="text-lg text-jetblack-700">You have 3 new updates. Stay informed about your child progress and activities!</p>
          </div>

          {/* Lottie Animation */}
          <div className="w-80 h-80 flex-shrink-0">
            <Lottie
              animationData={teacherDashboardAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* optional spacing / other sections can go below */}
      </main>
    </div>
  );
}
