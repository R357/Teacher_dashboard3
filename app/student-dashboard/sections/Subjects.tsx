"use client";
import { useState, useRef, useEffect } from "react";
import { X, Download, FileText, BookOpen, User, FileStack, ChevronLeft, ChevronRight, CheckCircle2, Clock, PlayCircle } from "lucide-react";

// Subject icons mapping
const subjectIcons = {
  English: "📚",
  Mathematics: "🔢",
  "Social Studies": "🌍",
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🧬",
};

// Mock data for subjects
const subjectsData = [
  {
    name: "English",
    code: "ENG101",
    teacher: "Dr. Sarah Williams",
    notesCount: 8,
    syllabus: {
      topics: [
        "Grammar and Composition",
        "Poetry Analysis",
        "Prose and Drama",
        "Creative Writing",
        "Literature Review",
      ],
      objectives: "To develop comprehensive language skills and literary appreciation",
      assessments: "Mid-term (30%), Final (40%), Assignments (20%), Participation (10%)",
    },
    notes: [
      { id: 1, title: "Introduction to Grammar", size: "2.4 MB", date: "Oct 15, 2024" },
      { id: 2, title: "Poetry Techniques", size: "1.8 MB", date: "Oct 22, 2024" },
      { id: 3, title: "Shakespeare's Works", size: "3.2 MB", date: "Oct 29, 2024" },
    ],
  },
  {
    name: "Mathematics",
    code: "MAT201",
    teacher: "Prof. John Davis",
    notesCount: 12,
    syllabus: {
      topics: [
        "Calculus and Differentiation",
        "Linear Algebra",
        "Probability and Statistics",
        "Trigonometry",
        "Complex Numbers",
      ],
      objectives: "To build strong mathematical foundations and problem-solving skills",
      assessments: "Tests (40%), Final Exam (40%), Homework (15%), Projects (5%)",
    },
    notes: [
      { id: 1, title: "Differential Calculus", size: "4.1 MB", date: "Oct 10, 2024" },
      { id: 2, title: "Matrix Operations", size: "2.9 MB", date: "Oct 18, 2024" },
      { id: 3, title: "Probability Theory", size: "3.5 MB", date: "Oct 25, 2024" },
    ],
  },
  {
    name: "Social Studies",
    code: "SOC301",
    teacher: "Ms. Emily Brown",
    notesCount: 10,
    syllabus: {
      topics: [
        "World History",
        "Geography and Climate",
        "Cultural Studies",
        "Political Systems",
        "Economic Principles",
      ],
      objectives: "To understand global societies and their interconnections",
      assessments: "Research Paper (30%), Exams (50%), Presentations (15%), Quizzes (5%)",
    },
    notes: [
      { id: 1, title: "Ancient Civilizations", size: "5.2 MB", date: "Oct 12, 2024" },
      { id: 2, title: "Modern Political Systems", size: "3.8 MB", date: "Oct 20, 2024" },
      { id: 3, title: "Global Economics", size: "2.7 MB", date: "Oct 27, 2024" },
    ],
  },
  {
    name: "Physics",
    code: "PHY401",
    teacher: "Dr. Michael Chen",
    notesCount: 15,
    syllabus: {
      topics: [
        "Mechanics and Motion",
        "Thermodynamics",
        "Electromagnetism",
        "Optics and Waves",
        "Quantum Physics",
      ],
      objectives: "To explore fundamental principles governing the physical world",
      assessments: "Lab Reports (25%), Mid-term (30%), Final (35%), Assignments (10%)",
    },
    notes: [
      { id: 1, title: "Newton's Laws", size: "3.6 MB", date: "Oct 8, 2024" },
      { id: 2, title: "Electric Circuits", size: "4.3 MB", date: "Oct 16, 2024" },
      { id: 3, title: "Wave Properties", size: "2.8 MB", date: "Oct 24, 2024" },
    ],
  },
  {
    name: "Chemistry",
    code: "CHE501",
    teacher: "Dr. Lisa Anderson",
    notesCount: 11,
    syllabus: {
      topics: [
        "Atomic Structure",
        "Chemical Bonding",
        "Organic Chemistry",
        "Thermochemistry",
        "Reaction Kinetics",
      ],
      objectives: "To understand chemical processes and molecular interactions",
      assessments: "Lab Work (30%), Tests (40%), Final (25%), Projects (5%)",
    },
    notes: [
      { id: 1, title: "Periodic Table Guide", size: "2.1 MB", date: "Oct 11, 2024" },
      { id: 2, title: "Organic Reactions", size: "4.7 MB", date: "Oct 19, 2024" },
      { id: 3, title: "Chemical Equilibrium", size: "3.3 MB", date: "Oct 26, 2024" },
    ],
  },
  {
    name: "Biology",
    code: "BIO601",
    teacher: "Prof. Rachel Martinez",
    notesCount: 9,
    syllabus: {
      topics: [
        "Cell Biology",
        "Genetics and Evolution",
        "Human Anatomy",
        "Ecology and Environment",
        "Microbiology",
      ],
      objectives: "To study living organisms and their vital processes",
      assessments: "Lab Practicals (35%), Exams (45%), Assignments (15%), Participation (5%)",
    },
    notes: [
      { id: 1, title: "Cell Structure", size: "3.9 MB", date: "Oct 9, 2024" },
      { id: 2, title: "DNA and Genetics", size: "4.5 MB", date: "Oct 17, 2024" },
      { id: 3, title: "Ecosystem Dynamics", size: "2.6 MB", date: "Oct 23, 2024" },
    ],
  },
];

// Recent Tasks Data
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

// Recent Practice Data
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

// Subject Card Component
function SubjectCard({ subject }: { subject: typeof subjectsData[0] }) {
  const [showNotes, setShowNotes] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);

  const handleDownload = (noteTitle: string) => {
    alert(`Downloading: ${noteTitle}`);
  };

  return (
    <>
      <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/30 flex-shrink-0 w-full">
        {/* Subject Icon - Top Right */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
            <p className="text-sm text-white">{subject.code}</p>
          </div>
          <div className="text-4xl">{subjectIcons[subject.name as keyof typeof subjectIcons]}</div>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-white" />
          <p className="text-sm text-white">
            <span className="font-semibold">Teacher:</span> {subject.teacher}
          </p>
        </div>

        {/* Notes Count */}
        <div className="flex items-center gap-2 mb-6">
          <FileStack className="w-4 h-4 text-white" />
          <p className="text-sm text-white">
            <span className="font-semibold">Notes:</span> {subject.notesCount} files
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowSyllabus(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            View Syllabus
          </button>
          <button
            onClick={() => setShowNotes(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            View Notes
          </button>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="backdrop-blur-xl bg-white/20 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-white/30 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div>
                <h3 className="text-2xl font-bold text-white">{subject.name} - Notes</h3>
                <p className="text-sm text-white mt-1">{subject.code}</p>
              </div>
              <button
                onClick={() => setShowNotes(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {subject.notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4 backdrop-blur-md bg-white/30 rounded-lg hover:bg-white/40 transition border border-white/20"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-white" />
                      <div>
                        <p className="font-semibold text-white">{note.title}</p>
                        <p className="text-xs text-white">
                          {note.size} • {note.date}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(note.title)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Syllabus Modal */}
      {showSyllabus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="backdrop-blur-xl bg-white/20 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-white/30 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div>
                <h3 className="text-2xl font-bold text-white">{subject.name} - Syllabus</h3>
                <p className="text-sm text-white mt-1">{subject.code}</p>
              </div>
              <button
                onClick={() => setShowSyllabus(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Syllabus Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Course Objectives */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Course Objectives</h4>
                  <p className="text-white">{subject.syllabus.objectives}</p>
                </div>

                {/* Topics Covered */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">Topics Covered</h4>
                  <ul className="space-y-2">
                    {subject.syllabus.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-white font-bold mt-1">•</span>
                        <span className="text-white">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Assessment Structure */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Assessment Structure</h4>
                  <p className="text-white">{subject.syllabus.assessments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main Subjects Section
export default function Subjects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Derive task lists for display
  const completedTasks = recentTasks.filter((t) => t.status === "completed").slice(0, 3);
  const pendingTasks = recentTasks.filter((t) => t.status === "pending").slice(0, 3);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 400;
      const gap = 24; // gap-6 = 24px
      const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
      
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check scroll buttons on mount and scroll
  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
      };
    }
  }, []);

  return (
    <section id="subjects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Subjects Section - Top Left with Horizontal Scroll */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Subjects</h2>
          
          {/* Horizontal Scrollable Container */}
          <div className="relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/30 rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:bg-white/40"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Scrollable Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onScroll={checkScrollButtons}
            >
              {subjectsData.map((subject) => (
                <div key={subject.code} className="min-w-[380px] max-w-[380px]">
                  <SubjectCard subject={subject} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/30 rounded-full p-3 shadow-lg hover:shadow-xl transition-all border border-white/30 hover:bg-white/40"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {/* Hide scrollbar for webkit browsers */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Recently Completed Tasks and Pending Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recently Completed Tasks - Left Side */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-lg border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-white" />
              Recently Completed Tasks
            </h3>
            
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-4 p-4 backdrop-blur-md bg-white/10 rounded-lg hover:bg-white/40 transition border border-white/20"
                >
                  <div className={`mt-1 ${
                    task.status === "completed" ? "text-white" : 
                    task.status === "in-progress" ? "text-white" : 
                    "text-white"
                  }`}>
                    {task.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{task.title}</h4>
                    </div>
                    <p className="text-sm text-white mb-1">{task.subject}</p>
                    <p className="text-xs text-white">Due: {task.dueDate}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 ml-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full shadow-sm ${
                      task.priority === "high" ? "bg-red-500/90 text-white" :
                      task.priority === "medium" ? "bg-yellow-500/90 text-white" :
                      "bg-blue-500/90 text-white"
                    }`}>
                      {task.priority}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                      task.status === "completed" ? "bg-green-500/90 text-white" :
                      task.status === "in-progress" ? "bg-yellow-500/90 text-white" :
                      "bg-gray-500/90 text-white"
                    }`}>
                      {task.status === "completed" ? "Done" :
                       task.status === "in-progress" ? "In Progress" :
                       "Pending"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks - Right Side */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-lg border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-white" />
              Pending Tasks
            </h3>
            
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-4 p-4 backdrop-blur-md bg-white/10 rounded-lg hover:bg-white/40 transition border border-white/20"
                >
                  <div className="mt-1 text-white">
                    <Clock className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{task.title}</h4>
                    </div>
                    <p className="text-sm text-white mb-1">{task.subject}</p>
                    <p className="text-xs text-white">Due: {task.dueDate}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 ml-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full shadow-sm ${
                      task.priority === "high" ? "bg-red-500/90 text-white" :
                      task.priority === "medium" ? "bg-yellow-500/90 text-white" :
                      "bg-blue-500/90 text-white"
                    }`}>
                      {task.priority}
                    </span>
                    <div className="px-3 py-1 rounded-full text-xs font-medium shadow-sm bg-gray-500/90 text-white">
                      Pending
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
