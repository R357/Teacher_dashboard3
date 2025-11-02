"use client";
import { useState, useRef, useEffect } from "react";
import {
  PlayCircle,
  BookOpen,
  Clock,
  Calendar,
  AlertCircle,
} from "lucide-react";

// Subject icons mapping
const subjectIcons: { [key: string]: string } = {
  "Algorithms": "🔢",
  "Database": "🗄️",
  "Web Dev": "💻",
  "OOP": "📦",
  "Mobile": "📱",
  "ML": "🤖",
  "Mathematics": "🔢",
  "Physics": "⚛️",
  "Chemistry": "🧪",
  "Biology": "🧬",
  "English": "📚",
  "Social Studies": "🌍",
};

// Exam data
const activeExams = [
  {
    id: "exam-1",
    subject: "Algorithms",
    title: "Algorithms Midterm Exam",
    description: "Covering topics: Sorting algorithms, Graph traversal, Dynamic programming",
    date: "Nov 15, 2024",
    time: "10:00 AM",
    room: "301A",
    duration: "90 minutes",
    status: "active",
  },
  {
    id: "exam-2",
    subject: "Database",
    title: "Database Systems Final",
    description: "SQL queries, Normalization, Transaction management, Indexing",
    date: "Nov 18, 2024",
    time: "1:00 PM",
    room: "204B",
    duration: "120 minutes",
    status: "active",
  },
];

const upcomingExams = [
  {
    id: "exam-3",
    subject: "Web Dev",
    title: "Web Development Final",
    description: "HTML, CSS, JavaScript, React, Node.js, and REST APIs",
    date: "Nov 21, 2024",
    time: "9:00 AM",
    room: "101C",
    duration: "150 minutes",
    status: "upcoming",
  },
  {
    id: "exam-4",
    subject: "OOP",
    title: "Object-Oriented Programming Quiz",
    description: "Classes, Inheritance, Polymorphism, Encapsulation, Design Patterns",
    date: "Nov 25, 2024",
    time: "2:00 PM",
    room: "202D",
    duration: "60 minutes",
    status: "upcoming",
  },
  {
    id: "exam-5",
    subject: "Mobile",
    title: "Mobile App Development Test",
    description: "React Native, Flutter basics, Mobile UI/UX principles",
    date: "Nov 28, 2024",
    time: "11:00 AM",
    room: "305E",
    duration: "90 minutes",
    status: "upcoming",
  },
  {
    id: "exam-6",
    subject: "ML",
    title: "Machine Learning Assessment",
    description: "Supervised learning, Neural networks, Feature engineering, Model evaluation",
    date: "Dec 2, 2024",
    time: "10:00 AM",
    room: "103F",
    duration: "120 minutes",
    status: "upcoming",
  },
];

// All exams combined
const allExams = [...activeExams, ...upcomingExams];

type TabType = "all" | "active" | "upcoming";

// Exam Row Component with Animation
function ExamRow({
  exam,
  isActive = false,
  index = 0,
}: {
  exam: typeof activeExams[0] | typeof upcomingExams[0];
  isActive?: boolean;
  index?: number;
}) {
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true);
          }, index * 150); // Stagger animation
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const handleTakeTest = () => {
    setIsTakingTest(true);
    // Simulate navigation or modal opening
    setTimeout(() => {
      alert(`Starting ${exam.title}...`);
      setIsTakingTest(false);
    }, 500);
  };

  const handlePrepare = () => {
    alert(`Opening preparation materials for ${exam.title}...`);
  };

  // Alternate slide direction based on index
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${isLeft ? "-translate-x-20" : "translate-x-20"}`
      }`}
    >
      <div
        className={`group relative overflow-hidden rounded-lg border transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-md"
            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
        }`}
      >
        {/* Gradient overlay on hover for upcoming exams */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:to-blue-100/50 transition-all duration-300 pointer-events-none" />
        )}

        <div className="relative p-5 flex items-center gap-4">
          {/* Subject Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
              {subjectIcons[exam.subject] || "📝"}
            </div>
          </div>

          {/* Exam Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-800">{exam.title}</h3>
              {isActive && (
                <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                  <AlertCircle className="w-3 h-3" />
                  Active
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{exam.description}</p>
            
            {/* Exam Details */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{exam.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{exam.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Duration: {exam.duration}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={handleTakeTest}
              disabled={isTakingTest}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-md ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <PlayCircle className="w-4 h-4" />
              {isTakingTest ? "Starting..." : "Take Test"}
            </button>

            {!isActive && (
              <button
                onClick={handlePrepare}
                className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300 hover:from-blue-200 hover:to-blue-300 hover:shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                Prepare
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({
  label,
  isActive,
  onClick,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 font-semibold text-sm transition-all duration-300 ${
        isActive
          ? "text-blue-700"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            isActive
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {count}
        </span>
      )}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-full" />
      )}
    </button>
  );
}

// Main Exams Component
export default function Exams() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Filter exams based on active tab
  const getFilteredExams = () => {
    switch (activeTab) {
      case "active":
        return activeExams.map((exam) => ({ ...exam, isActive: true }));
      case "upcoming":
        return upcomingExams.map((exam) => ({ ...exam, isActive: false }));
      default:
        return [
          ...activeExams.map((exam) => ({ ...exam, isActive: true })),
          ...upcomingExams.map((exam) => ({ ...exam, isActive: false })),
        ];
    }
  };

  const filteredExams = getFilteredExams();

  return (
    <section id="exams" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Exams
          </h2>
          <p className="text-center text-gray-600">
            Manage and take your scheduled examinations
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <TabButton
                label="All"
                isActive={activeTab === "all"}
                onClick={() => setActiveTab("all")}
                count={allExams.length}
              />
              <TabButton
                label="Active"
                isActive={activeTab === "active"}
                onClick={() => setActiveTab("active")}
                count={activeExams.length}
              />
              <TabButton
                label="Upcoming"
                isActive={activeTab === "upcoming"}
                onClick={() => setActiveTab("upcoming")}
                count={upcomingExams.length}
              />
            </div>

            {/* Exams List */}
            <div className="p-6">
              {filteredExams.length > 0 ? (
                <div className="space-y-4">
                  {filteredExams.map((exam, index) => (
                    <ExamRow
                      key={exam.id}
                      exam={exam}
                      isActive={exam.isActive}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No Exams Found
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === "active"
                      ? "You don't have any active exams at this time."
                      : activeTab === "upcoming"
                      ? "You don't have any upcoming exams scheduled."
                      : "You don't have any exams scheduled at this time."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
