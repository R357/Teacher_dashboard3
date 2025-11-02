"use client";
// @ts-ignore - react-vertical-timeline-component doesn't have TypeScript types
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";

const subjectEmojis: { [key: string]: string } = {
  Algorithms: "🔢",
  "Web Dev": "💻",
  Database: "🗄️",
  OOP: "📦",
  Mobile: "📱",
  ML: "🤖",
  Mathematics: "🔢",
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🧬",
  English: "📚",
  "Social Studies": "🌍",
};

interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectId: string;
  description: string;
  dueDate: string;
  year: string;
  status: "pending" | "graded" | "overdue";
  grade?: string;
}

const assignmentsData: Assignment[] = [
  {
    id: "A-01",
    title: "Sorting Algorithms Implementation",
    subject: "Algorithms",
    subjectId: "CS301",
    description:
      "Implement sorting algorithms and analyze time complexity with test cases.",
    dueDate: "Nov 5",
    year: "2024",
    status: "pending",
  },
  {
    id: "Project-01",
    title: "Responsive Portfolio Website",
    subject: "Web Dev",
    subjectId: "CS401",
    description:
      "Build a responsive portfolio with About, Projects, and Contact sections.",
    dueDate: "Nov 8",
    year: "2024",
    status: "pending",
  },
  {
    id: "Lab-03",
    title: "E-commerce Database Design",
    subject: "Database",
    subjectId: "CS201",
    description: "Design database schema with ER diagrams and SQL queries.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "A",
  },
  {
    id: "Quiz-04",
    title: "OOP Concepts Quiz",
    subject: "OOP",
    subjectId: "CS302",
    description: "Quiz on inheritance, polymorphism, and encapsulation.",
    dueDate: "Oct 30",
    year: "2024",
    status: "graded",
    grade: "B+",
  },
  {
    id: "A-02",
    title: "Mobile App Authentication",
    subject: "Mobile",
    subjectId: "CS501",
    description:
      "Develop authentication with login, registration, and password reset.",
    dueDate: "Oct 28",
    year: "2024",
    status: "overdue",
  },
  {
    id: "Lab-02",
    title: "Image Classification Model",
    subject: "ML",
    subjectId: "CS601",
    description:
      "Train ML model for image classification using TensorFlow.",
    dueDate: "Oct 25",
    year: "2024",
    status: "graded",
    grade: "A+",
  },
];

function FileUploadModal({
  assignment,
  isOpen,
  onClose,
  onSuccess,
}: {
  assignment: Assignment;
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
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
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
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div
          className="p-6 text-white"
          style={{
            background:
              "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                {subjectEmojis[assignment.subject] || "📝"}
              </div>
              <div>
                <h3 className="text-2xl font-bold">Submit Assignment</h3>
                <p className="text-blue-100 text-sm mt-1">
                  {assignment.subject} • {assignment.subjectId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg text-white text-4xl"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
                }}
              >
                ✓
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Successfully Submitted!
              </h3>
              <p className="text-gray-600 text-center">
                Your assignment has been submitted. Check your email for
                confirmation.
              </p>
            </div>
          ) : (
            <>
              <div
                className="mb-6 p-5 rounded-xl border border-blue-200"
                style={{
                  background:
                    "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
                }}
              >
                <h4 className="font-semibold text-gray-800 mb-2">
                  {assignment.title}
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  {assignment.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                  <span>🕐</span>
                  <span>
                    Due: {assignment.dueDate}, {assignment.year}
                  </span>
                </div>
              </div>

              {/* Upload section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Upload Files
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
                    }}
                  >
                    ⬆️
                  </div>
                  <p className="text-gray-700 mb-1 font-medium">
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

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Selected Files ({files.length})
                    </p>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-blue-200"
                        style={{
                          background:
                            "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
                        }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                            📄
                          </div>
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
                          className="p-1.5 hover:bg-red-100 rounded-lg text-red-600 transition text-xl leading-none"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={files.length === 0 || isSubmitting}
                  className="flex-1 px-4 py-3 text-white rounded-xl transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>⬆️</span>
                      <span>Submit Assignment</span>
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

function TimelineCard({
  assignment,
  index,
  onSubmitClick,
}: {
  assignment: Assignment;
  index: number;
  onSubmitClick: () => void;
}) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [index]);

  const dateParts = assignment.dueDate.split(" ");

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${index % 2 === 0 ? "-translate-x-20" : "translate-x-20"}`
      }`}
      style={{ marginTop: index > 0 ? "-80px" : "0" }}
    >
      <VerticalTimelineElement
        position={index % 2 === 0 ? "left" : "right"}
        contentStyle={{
          background: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
        }}
        iconStyle={{
          background:
            assignment.status === "graded"
              ? "#2563eb"
              : assignment.status === "overdue"
              ? "#1e40af"
              : "#3b82f6",
          color: "#fff",
          width: "60px",
          height: "60px",
        }}
        icon={
          <div className="flex flex-col items-center justify-center h-full w-full text-white px-1">
            <div className="text-xs font-bold leading-tight">
              {dateParts[0]}
            </div>
            <div className="text-[9px] leading-tight opacity-90">
              {dateParts[1] || ""}
            </div>
          </div>
        }
      >
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2 select-none">
            <div className="text-xl">
              {subjectEmojis[assignment.subject] || "📝"}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800">
                {assignment.subject}
              </h3>
              <p className="text-[10px] text-gray-600">
                ID: {assignment.subjectId}
              </p>
            </div>
          </div>

          <h4 className="text-base font-semibold text-gray-800 mb-1">
            {assignment.title}
          </h4>

          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {assignment.description}
          </p>

          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
              assignment.status === "graded"
                ? "text-blue-700 bg-blue-50"
                : assignment.status === "overdue"
                ? "text-red-700 bg-red-50"
                : "text-blue-700 bg-blue-50"
            }`}
          >
            {assignment.status === "graded"
              ? `Graded: ${assignment.grade}`
              : assignment.status === "overdue"
              ? "⚠ Overdue"
              : "🕐 Pending"}
          </div>

          {assignment.status !== "graded" && (
            <button
              onClick={onSubmitClick}
              className="w-full px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium flex items-center justify-center gap-1.5 text-xs"
            >
              <Upload className="w-3 h-3" />
              Submit Assignment
            </button>
          )}
        </div>
      </VerticalTimelineElement>
    </div>
  );
}

export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(
    null
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleSubmitClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsUploadModalOpen(true);
  };

  const handleUploadSuccess = () => {
    // optional success logic
  };

  return (
    <section id="assignments" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Assignments
        </h2>

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
