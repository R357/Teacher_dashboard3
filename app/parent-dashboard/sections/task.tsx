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
    <div className="max-w-7xl mx-auto px-6">
      {/* Recent Tasks and Recent Practice Section (copied exactly) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks - Left Side */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Recent Tasks
          </h3>

          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
              >
                <div className={`mt-1 ${
                  task.status === "completed" ? "text-green-600" : 
                  task.status === "in-progress" ? "text-yellow-600" : 
                  "text-gray-400"
                }`}>
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{task.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === "high" ? "bg-red-100 text-red-700" :
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{task.subject}</p>
                  <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  {task.status === "in-progress" && (
                    <div className="mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        Continue
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
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
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-green-600" />
            Recent Practice
          </h3>

          <div className="space-y-6">
            {recentPractice.map((practice, index) => {
              const percentage = Math.round((practice.covered / practice.total) * 100);
              
              return (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl">{practice.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{practice.subject}</h4>
                      <p className="text-sm text-gray-600">
                        <span className="font-bold text-blue-600">{practice.covered}</span> of{" "}
                        <span className="text-gray-700">{practice.total}</span> topics covered
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-gray-600 text-right">{percentage}% completed</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
