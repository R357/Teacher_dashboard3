"use client";

import React, { useEffect, useState } from 'react';

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
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-5xl font-serif font-bold leading-tight mb-4">{username ? `Hello ${username}!` : 'Hello!'}</h1>
            <p className="text-lg text-gray-700">You have 3 new updates. Stay informed about your child progress and activities!</p>
          </div>

          {/* Illustration: simple inline SVG to match the provided design */}
          <div className="w-60 h-40 flex-shrink-0">
            <svg viewBox="0 0 560 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="560" height="360" rx="24" fill="transparent" />
              {/* mountains/background soft shapes */}
              <path d="M420 160c40-60 140-60 160 0v120H420V160z" fill="#EEF2FF" />
              <path d="M220 140c30-50 110-50 125 0v120H220V140z" fill="#F8FAFF" />

              {/* parent figure */}
              <g transform="translate(140,90)">
                <ellipse cx="100" cy="150" rx="70" ry="60" fill="#E6EEF9" />
                <circle cx="100" cy="80" r="30" fill="#1F2937" />
                <rect x="70" y="110" width="60" height="80" rx="18" fill="#2563EB" />
              </g>

              {/* child left */}
              <g transform="translate(60,150)">
                <circle cx="20" cy="-10" r="14" fill="#111827" />
                <rect x="4" y="2" width="32" height="48" rx="10" fill="#34D399" />
              </g>

              {/* child right */}
              <g transform="translate(260,170)">
                <circle cx="20" cy="-6" r="12" fill="#111827" />
                <rect x="6" y="6" width="28" height="44" rx="10" fill="#60A5FA" />
              </g>
            </svg>
          </div>
        </div>

        {/* optional spacing / other sections can go below */}
      </main>
    </div>
  );
}
