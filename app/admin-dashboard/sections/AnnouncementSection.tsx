"use client";
import {
  Megaphone,
  Send,
  Users,
  User,
  UserCheck, // Replaced Plus
  Loader2, // For loading spinner
  CheckCircle, // For success
  AlertTriangle, // Replaced AlertCircle
  Info,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the audience types
type Audience = "All" | "Students" | "Teachers" | "Parents";
type Priority = "low" | "medium" | "high";

// Helper object for tab icons
const tabDetails = {
  All: { icon: Users, color: "text-blue-600", border: "border-blue-600" },
  Students: {
    icon: User,
    color: "text-green-600",
    border: "border-green-600",
  },
  Teachers: {
    icon: UserCheck,
    color: "text-purple-600",
    border: "border-purple-600",
  },
  Parents: {
    icon: Users,
    color: "text-orange-600",
    border: "border-orange-600",
  },
};

export default function AnnouncementSection() {
  const [activeTab, setActiveTab] = useState<Audience>("All");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please fill in both title and message.");
      return;
    }

    setStatus("sending");

    const newAnnouncement = {
      id: crypto.randomUUID(),
      title,
      message,
      priority,
      targetAudience: activeTab,
      date: new Date().toISOString(),
    };

    // --- In a real app, you would send this to your database ---
    console.log("Sending announcement:", newAnnouncement);
    // -----------------------------------------------------------

    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      setTitle("");
      setMessage("");
      setPriority("medium");

      // Reset status after a couple of seconds
      setTimeout(() => setStatus("idle"), 2000);
    }, 1500);
  };

  const tabs: Audience[] = ["All", "Students", "Teachers", "Parents"];

  return (
    <section id="announcements" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Broadcast Announcement
            </h2>
          </div>
          <p className="text-gray-600 mt-2">
            Select an audience and send an important message.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const { icon: Icon, color, border } = tabDetails[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 py-3 px-5 font-semibold transition-all duration-300 -mb-px ${
                  isActive
                    ? `${color} border-b-2 ${border}`
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? color : "text-gray-400"
                  }`}
                />
                <span>Send to {tab}</span>
              </button>
            );
          })}
        </div>

        {/* Announcement Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Title Input */}
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Announcement Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., End of Semester Exams"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Priority Select */}
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write your announcement for ${activeTab}...`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button & Status */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Sending to:{" "}
                <span
                  className={`font-bold ${tabDetails[activeTab].color}`}
                >
                  {activeTab}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                  {status === "sent" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-green-600"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Sent!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold transition-all ${
                    status === "sending"
                      ? "bg-gray-400 cursor-not-allowed"
                      : `bg-blue-600 hover:bg-blue-700`
                  }`}
                >
                  {status === "sending" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span>
                    {status === "sending"
                      ? "Sending..."
                      : `Send to ${activeTab}`}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
