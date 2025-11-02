"use client";

import { Calendar, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [isVisible]);

  const statsData = [
    { label: "Total Days", value: "183", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Present Days", value: "165", icon: CheckCircle2, color: "from-blue-500 to-blue-600" },
    { label: "Absent Days", value: "18", icon: XCircle, color: "from-blue-500 to-blue-600" },
    { label: "Overall Percentage", value: "90.2%", icon: BarChart3, color: "from-blue-500 to-blue-600" },
  ];

  const subjectData = [
    { subject: "English", attended: 92, total: 100 },
    { subject: "Math", attended: 88, total: 100 },
    { subject: "Social", attended: 95, total: 100 },
    { subject: "Physics", attended: 85, total: 100 },
    { subject: "Chemistry", attended: 90, total: 100 },
    { subject: "Biology", attended: 87, total: 100 },
  ];

  return (
    <section id="attendance" className="py-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-12 text-center tracking-tight">
          Attendance Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-blue-200 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6 relative">
                  <div 
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="text-white" size={24} strokeWidth={2.5} />
                      </div>
                    </div>
                    <h3 className="text-sm text-gray-600 mb-2 uppercase tracking-wide font-semibold">
                      {stat.label}
                    </h3>
                    <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bar Graph Section */}
        <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-lg" ref={chartRef}>
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Subject-wise Attendance
          </h2>
          
          <div className="relative px-12 py-8">
            {/* Y-Axis */}
            <div className="absolute left-8 top-8 bottom-20 w-0.5 bg-gray-300">
              {/* Y-axis arrow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-blue-600"></div>
              
              {/* Y-axis labels */}
              {[100, 75, 50, 25, 0].map((value) => (
                <div
                  key={value}
                  className="absolute right-3 text-xs font-medium text-gray-600"
                  style={{ bottom: `${value}%`, transform: 'translateY(50%)' }}
                >
                  {value}%
                </div>
              ))}
              
              {/* Y-axis grid lines */}
              {[100, 75, 50, 25].map((value) => (
                <div
                  key={value}
                  className="absolute left-0 w-screen border-t border-dashed border-gray-200"
                  style={{ bottom: `${value}%` }}
                ></div>
              ))}
            </div>

            {/* X-Axis */}
            <div className="absolute left-8 right-8 bottom-12 h-0.5 bg-gray-300">
              {/* X-axis arrow */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-blue-600"></div>
            </div>

            {/* Bars */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 ml-8 mb-4">
              {subjectData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Percentage Label */}
                  <div className="mb-3 h-8 flex items-center">
                    <span 
                      className="text-lg font-bold text-gray-800 transition-all duration-500"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
                        transitionDelay: `${index * 150}ms`
                      }}
                    >
                      {data.attended}%
                    </span>
                  </div>

                  {/* Bar Container */}
                  <div 
                    className="relative w-16 h-64 rounded-t-lg overflow-hidden shadow-inner"
                    style={{
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                    }}
                  >
                    {/* Attended Bar */}
                    <div
                      className="absolute bottom-0 w-full transition-all duration-1000 ease-out rounded-t-lg shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        height: isVisible ? `${data.attended}%` : '0%',
                        transitionDelay: `${index * 150}ms`,
                      }}
                    />
                  </div>

                  {/* Subject Label */}
                  <div className="mt-6 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      {data.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;

// Named export for compatibility with parent page import
export function Attendance() {
  return <Index />;
}

