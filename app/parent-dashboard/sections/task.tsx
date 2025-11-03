"use client";
import React from "react";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";

// Recent Tasks Data (identical to Student Dashboard)
const recentTasks = [
  {
    id: 1,
    title: "Complete English Essay Assignment",
    subject: "English",
    dueDate: "Dec 15, 2024",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "Solve Mathematics Problem Set 5",
    subject: "Mathematics",
    dueDate: "Dec 18, 2024",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "Dec 20, 2024",
    status: "pending",
    priority: "low",
  },
  {
    id: 4,
    title: "Chemistry Quiz Preparation",
    subject: "Chemistry",
    dueDate: "Dec 16, 2024",
    status: "completed",
    priority: "high",
  },
];

// Recent Practice Data (identical to Student Dashboard)
const recentPractice = [
  {
    subject: "Mathematics",
    covered: 20,
    total: 90,
    icon: "🔢",
  },
  {
    subject: "Physics",
    covered: 35,
    total: 120,
    icon: "⚛️",
  },
  {
    subject: "Chemistry",
    covered: 18,
    total: 85,
    icon: "🧪",
  },
  {
    subject: "Biology",
    covered: 42,
    total: 100,
    icon: "🧬",
  },
];

export default function TaskSection() {
  return (
    <div className="section-inner">
      {/* Recent Tasks and Recent Practice Section (copied exactly) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full">
        {/* Recent Tasks - Left Side */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-col min-h-0 overflow-y-auto h-full">
          <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Recent Tasks
          </h3>

          <div className="space-y-2">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
              >
                <div className={`mt-0.5 ${
                  task.status === "completed" ? "text-green-600" : 
                  task.status === "in-progress" ? "text-yellow-600" : 
                  "text-gray-400"
                }`}>
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <h4 className="font-semibold text-gray-800 text-xs">{task.title}</h4>
                    <span className={`text-[10px] px-1 py-0.5 rounded-full ${
                      task.priority === "high" ? "bg-red-100 text-red-700" :
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 mb-0.5">{task.subject}</p>
                  <p className="text-[10px] text-gray-500">Due: {task.dueDate}</p>
                  {task.status === "in-progress" && (
                    <div className="mt-1">
                      <button className="text-[10px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
                        <PlayCircle className="w-2 h-2" />
                        Continue
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                  task.status === "completed" ? "bg-green-100 text-green-700" :
                  task.status === "in-progress" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {task.status === "completed" ? "Done" :
                   task.status === "in-progress" ? "In Progress" :
                   "Pending"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Practice - Right Side */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-col min-h-0 overflow-y-auto h-full">
          <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-green-600" />
            Recent Practice
          </h3>

          <div className="space-y-2 flex-1">
            {recentPractice.map((practice, index) => {
              const percentage = Math.round((practice.covered / practice.total) * 100);
              
              return (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-xl">{practice.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-0.5 text-xs">{practice.subject}</h4>
                      <p className="text-[10px] text-gray-600">
                        <span className="font-bold text-blue-600">{practice.covered}</span> of{" "}
                        <span className="text-gray-700">{practice.total}</span> topics covered
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-[10px] text-gray-600 text-right">{percentage}% completed</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
