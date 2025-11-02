"use client";
// @ts-ignore - react-vertical-timeline-component doesn't have TypeScript types
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useState, useRef, useEffect } from "react";
import {
  IconClipboardList,
  IconClipboardCheck,
  IconClipboardX,
} from "@tabler/icons-react";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
} from "lucide-react";

// Subject icons mapping
const subjectIcons: { [key: string]: string } = {
  "Algorithms": "🔢",
  "Web Dev": "💻",
  "Database": "🗄️",
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

// Assignment data with subject info
const assignmentsData = [
  {
    id: "A-01",
      title: "Algorithms (A-01)",
    subject: "Algorithms",
    subjectId: "CS301",
    description: "Implement sorting algorithms (Bubble, Quick, Merge) and analyze their time complexity. Submit code with test cases and complexity analysis.",
    dueDate: "Nov 5, 2024",
    status: "pending",
      icon: <IconClipboardList />,
    date: "2024-11-01",
    },
    {
    id: "Project-01",
      title: "Web Dev (Project-01)",
    subject: "Web Dev",
    subjectId: "CS401",
    description: "Build a responsive portfolio website using HTML, CSS, and JavaScript. Include at least 3 sections: About, Projects, and Contact.",
    dueDate: "Nov 8, 2024",
    status: "pending",
      icon: <IconClipboardList />,
    date: "2024-11-03",
    },
    {
    id: "Lab-03",
      title: "Database (Lab-03)",
    subject: "Database",
    subjectId: "CS201",
    description: "Design and implement a database schema for an e-commerce system. Create ER diagrams and write SQL queries for basic operations.",
    dueDate: "Nov 2, 2024",
    status: "graded",
      icon: <IconClipboardCheck />,
    date: "2024-10-28",
    grade: "A",
    },
    {
    id: "Quiz-04",
      title: "OOP (Quiz-04)",
    subject: "OOP",
    subjectId: "CS302",
    description: "Complete quiz on Object-Oriented Programming concepts including inheritance, polymorphism, and encapsulation.",
    dueDate: "Oct 30, 2024",
    status: "graded",
      icon: <IconClipboardCheck />,
    date: "2024-10-25",
    grade: "B+",
    },
    {
    id: "A-02",
      title: "Mobile (A-02)",
    subject: "Mobile",
    subjectId: "CS501",
    description: "Develop a mobile app with authentication feature. Include login, registration, and password reset functionality.",
    dueDate: "Oct 28, 2024",
    status: "overdue",
      icon: <IconClipboardX />,
    date: "2024-10-20",
    },
    {
    id: "Lab-02",
      title: "ML (Lab-02)",
    subject: "ML",
    subjectId: "CS601",
    description: "Train a machine learning model for image classification using TensorFlow. Submit code, model weights, and accuracy report.",
    dueDate: "Oct 25, 2024",
    status: "graded",
      icon: <IconClipboardCheck />,
    date: "2024-10-18",
    grade: "A+",
  },
];

// File Upload Modal Component
function FileUploadModal({
  assignment,
  isOpen,
  onClose,
  onSuccess,
}: {
  assignment: typeof assignmentsData[0];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Show success message for 2 seconds, then close
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
        setFiles([]);
        onClose();
      }, 2000);
    }, 1500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Submit Assignment</h3>
            <p className="text-sm text-gray-600 mt-1">{assignment.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Assignment Submitted Successfully!
              </h3>
              <p className="text-gray-600 text-center">
                Your assignment has been submitted. You will receive a confirmation email shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Assignment Info */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">
                    {subjectIcons[assignment.subject] || "📝"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{assignment.subject}</h4>
                    <p className="text-sm text-gray-600">Subject ID: {assignment.subjectId}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{assignment.description}</p>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Due: {assignment.dueDate}</span>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Upload Files
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, ZIP, RAR (Max 10MB per file)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.zip,.rar"
                  />
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Selected Files ({files.length})
                    </p>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="p-1 hover:bg-red-50 rounded text-red-600 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={files.length === 0 || isSubmitting}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Assignment
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Timeline Card Component with Scroll Animation
function TimelineCard({
  assignment,
  index,
  onSubmitClick,
}: {
  assignment: typeof assignmentsData[0];
  index: number;
  onSubmitClick: () => void;
}) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true);
          }, index * 200);
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

  const getStatusColor = () => {
    switch (assignment.status) {
      case "graded":
        return "text-green-600 bg-green-50 border-green-200";
      case "overdue":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getStatusIcon = () => {
    switch (assignment.status) {
      case "graded":
        return <CheckCircle2 className="w-5 h-5" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const isLeft = index % 2 === 0;
  const position = isLeft ? "left" : "right";

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        inView
          ? `opacity-100 translate-x-0`
          : `opacity-0 ${isLeft ? "-translate-x-20" : "translate-x-20"}`
      }`}
    >
      <VerticalTimelineElement
        position={position}
        contentStyle={{
          background: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
        }}
        contentArrowStyle={
          isLeft
            ? { borderRight: "7px solid white" }
            : { borderLeft: "7px solid white" }
        }
        date={assignment.dueDate}
        iconStyle={{
          background: assignment.status === "graded" ? "#10b981" : assignment.status === "overdue" ? "#ef4444" : "#f59e0b",
          color: "#fff",
        }}
        icon={assignment.icon}
      >
        <div className="p-4">
          {/* Subject Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">
              {subjectIcons[assignment.subject] || "📝"}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{assignment.subject}</h3>
              <p className="text-sm text-gray-600">ID: {assignment.subjectId}</p>
            </div>
          </div>

          {/* Assignment Title */}
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {assignment.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {assignment.description}
          </p>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span>
              {assignment.status === "graded"
                ? `Graded: ${assignment.grade}`
                : assignment.status === "overdue"
                ? "Overdue"
                : "Pending"}
            </span>
          </div>

          {/* Submit Button (only for pending/overdue) */}
          {assignment.status !== "graded" && (
            <button
              onClick={onSubmitClick}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Submit Assignment
            </button>
          )}
        </div>
      </VerticalTimelineElement>
    </div>
  );
}

// Main Assignments Component
export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignmentsData[0] | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [submittedAssignments, setSubmittedAssignments] = useState<Set<string>>(new Set());

  const handleSubmitClick = (assignment: typeof assignmentsData[0]) => {
    setSelectedAssignment(assignment);
    setIsUploadModalOpen(true);
  };

  const handleUploadSuccess = () => {
    if (selectedAssignment) {
      setSubmittedAssignments((prev) => new Set(prev).add(selectedAssignment.id));
    }
  };

  return (
    <section id="assignments" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Assignments
        </h2>
        
        {/* Vertical Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <VerticalTimeline lineColor="#e5e7eb">
            {assignmentsData.map((assignment, index) => (
              <TimelineCard
                key={assignment.id}
                assignment={assignment}
                index={index}
                onSubmitClick={() => handleSubmitClick(assignment)}
              />
            ))}
          </VerticalTimeline>
        </div>

        {/* File Upload Modal */}
        {selectedAssignment && (
          <FileUploadModal
            assignment={selectedAssignment}
            isOpen={isUploadModalOpen}
            onClose={() => {
              setIsUploadModalOpen(false);
              setSelectedAssignment(null);
            }}
            onSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </section>
  );
}
