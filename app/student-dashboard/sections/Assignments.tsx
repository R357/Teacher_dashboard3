import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useState, useRef, useEffect } from "react";
import { Upload, Calendar as CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const subjectEmojis: { [key: string]: string } = {
  "Mathematics": "🔢",
  "English": "📚",
  "Social Studies": "🌍",
  "Physics": "⚛️",
  "Chemistry": "🧪",
  "Biology": "🧬",
};

const assignmentsData = [
  // November 3, 2024 (Today)
  {
    id: "A-Nov3-01",
    title: "Quadratic Equations Problem Set",
    subject: "Mathematics",
    subjectId: "MATH301",
    description: "Solve quadratic equations using various methods and graphing techniques.",
    dueDate: "Nov 3",
    year: "2024",
    status: "pending",
  },
  {
    id: "A-Nov3-02",
    title: "Shakespeare Essay Analysis",
    subject: "English",
    subjectId: "ENG401",
    description: "Write an analytical essay on themes in Hamlet and character development.",
    dueDate: "Nov 3",
    year: "2024",
    status: "pending",
  },
  {
    id: "A-Nov3-03",
    title: "World War II Historical Analysis",
    subject: "Social Studies",
    subjectId: "SOC201",
    description: "Research and present key events and impacts of World War II.",
    dueDate: "Nov 3",
    year: "2024",
    status: "pending",
  },
  {
    id: "A-Nov3-04",
    title: "Newton's Laws Lab Report",
    subject: "Physics",
    subjectId: "PHY302",
    description: "Conduct experiments demonstrating Newton's three laws of motion.",
    dueDate: "Nov 3",
    year: "2024",
    status: "pending",
  },
  {
    id: "A-Nov3-05",
    title: "Chemical Bonding Quiz",
    subject: "Chemistry",
    subjectId: "CHEM302",
    description: "Quiz covering ionic, covalent, and metallic bonding concepts.",
    dueDate: "Nov 3",
    year: "2024",
    status: "pending",
  },
  {
    id: "A-Nov3-06",
    title: "Cell Structure Diagram",
    subject: "Biology",
    subjectId: "BIO201",
    description: "Create detailed diagrams of plant and animal cell structures with labels.",
    dueDate: "Nov 3",
    year: "2024",
    status: "pending",
  },
  // November 2, 2024
  {
    id: "A-Nov2-01",
    title: "Algebraic Expressions",
    subject: "Mathematics",
    subjectId: "MATH301",
    description: "Simplify complex algebraic expressions and solve equations.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "A",
  },
  {
    id: "A-Nov2-02",
    title: "Poetry Analysis",
    subject: "English",
    subjectId: "ENG401",
    description: "Analyze literary devices in modern poetry.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "B+",
  },
  {
    id: "A-Nov2-03",
    title: "Ancient Civilizations",
    subject: "Social Studies",
    subjectId: "SOC201",
    description: "Compare and contrast ancient civilizations.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "A-",
  },
  {
    id: "A-Nov2-04",
    title: "Electromagnetism Lab",
    subject: "Physics",
    subjectId: "PHY302",
    description: "Explore electromagnetic induction principles.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "A+",
  },
  {
    id: "A-Nov2-05",
    title: "Periodic Table Quiz",
    subject: "Chemistry",
    subjectId: "CHEM302",
    description: "Quiz on periodic table trends and element properties.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "B",
  },
  {
    id: "A-Nov2-06",
    title: "Photosynthesis Lab",
    subject: "Biology",
    subjectId: "BIO201",
    description: "Investigate factors affecting the rate of photosynthesis in plants.",
    dueDate: "Nov 2",
    year: "2024",
    status: "graded",
    grade: "A+",
  },
  // November 1, 2024
  {
    id: "A-Nov1-01",
    title: "Geometry Proofs",
    subject: "Mathematics",
    subjectId: "MATH301",
    description: "Complete geometric proofs using theorems and postulates.",
    dueDate: "Nov 1",
    year: "2024",
    status: "graded",
    grade: "A-",
  },
  {
    id: "A-Nov1-02",
    title: "Novel Chapter Summary",
    subject: "English",
    subjectId: "ENG401",
    description: "Write detailed summaries of assigned novel chapters.",
    dueDate: "Nov 1",
    year: "2024",
    status: "graded",
    grade: "A",
  },
  {
    id: "A-Nov1-03",
    title: "Government Systems",
    subject: "Social Studies",
    subjectId: "SOC201",
    description: "Compare different forms of government worldwide.",
    dueDate: "Nov 1",
    year: "2024",
    status: "graded",
    grade: "B+",
  },
  {
    id: "A-Nov1-04",
    title: "Kinematics Problems",
    subject: "Physics",
    subjectId: "PHY302",
    description: "Solve motion problems involving velocity and acceleration.",
    dueDate: "Nov 1",
    year: "2024",
    status: "graded",
    grade: "A",
  },
  {
    id: "A-Nov1-05",
    title: "Organic Chemistry Basics",
    subject: "Chemistry",
    subjectId: "CHEM302",
    description: "Introduction to organic compounds and nomenclature.",
    dueDate: "Nov 1",
    year: "2024",
    status: "graded",
    grade: "B+",
  },
  {
    id: "A-Nov1-06",
    title: "DNA Structure",
    subject: "Biology",
    subjectId: "BIO201",
    description: "Study the structure and function of DNA molecules.",
    dueDate: "Nov 1",
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
      }
      setFiles([file]);
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

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      style={{ backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="backdrop-blur-xl bg-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-6 text-white"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl backdrop-blur-md bg-white/20 border border-white/30">
                {subjectEmojis[assignment.subject] || "📝"}
              </div>
              <div>
                <h3 className="text-2xl font-bold">Submit Assignment</h3>
                <p className="text-white text-sm mt-1">
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
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)" }}
              >
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Successfully Submitted!</h3>
              <p className="text-white text-center">
                Your assignment has been submitted. Check your email for confirmation.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-5 rounded-xl backdrop-blur-md bg-blue-500/20 border border-blue-400/30">
                <h4 className="font-semibold text-white mb-2">{assignment.title}</h4>
                <p className="text-sm text-white mb-3">{assignment.description}</p>
                <div className="flex items-center gap-2 text-sm text-white font-medium">
                  <span>🕐</span>
                  <span>
                    Due: {assignment.dueDate}, {assignment.year}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-3">Upload Files</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-400/50 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/70 hover:bg-blue-500/20 backdrop-blur-sm transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)" }}
                  >
                    ⬆️
                  </div>
                  <p className="text-white mb-1 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-white">PDF</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf"
                  />
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-white mb-2">
                      Selected Files ({files.length})
                    </p>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg backdrop-blur-md bg-blue-500/20 border border-blue-400/30"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 backdrop-blur-md bg-blue-500/20 rounded-lg flex items-center justify-center text-xl border border-blue-400/30">
                            📄
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{file.name}</p>
                            <p className="text-xs text-white">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="p-1.5 hover:bg-red-100 rounded-lg text-white transition text-xl leading-none"
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
                  onClick={handleSubmit}
                  disabled={files.length === 0 || isSubmitting}
                  className="flex-1 px-4 py-3 text-white rounded-xl transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
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
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-100 text-white rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  Cancel
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

  const getStatusInfo = () => {
    switch (assignment.status) {
      case "graded":
        return {
          gradient: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          icon: "✓",
          text: assignment.grade,
        };
      case "overdue":
        return {
          gradient: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
          icon: "⚠",
          text: "Overdue",
        };
      default:
        return {
          gradient: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
          icon: "🕐",
          text: "Pending",
        };
    }
  };

  const statusInfo = getStatusInfo();
  const isLeft = index % 2 === 0;
  const position = isLeft ? "left" : "right";

  const customIcon = (
    <div className="flex items-center justify-center h-full w-full text-4xl">
      {subjectEmojis[assignment.subject] || "📝"}
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        inView ? `opacity-100 translate-x-0` : `opacity-0 ${isLeft ? "-translate-x-20" : "translate-x-20"}`
      }`}
    >
      <VerticalTimelineElement
        position={position}
        contentStyle={{
          background: "transparent",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          border: "none",
          borderRadius: "0.75rem",
          position: "relative",
        }}
        contentArrowStyle={
          index % 2 === 0
            ? {
                borderRight: "12px solid transparent",
              }
            : {
                borderLeft: "12px solid transparent",
              }
        }
        date=""
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
        icon={customIcon}
      >
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-base backdrop-blur-md bg-white/20 border border-white/30">
              {subjectEmojis[assignment.subject] || "📝"}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">{assignment.subject}</h3>
              <p className="text-[10px] text-white">ID: {assignment.subjectId}</p>
            </div>
          </div>

          <div className="flex items-start justify-between mb-1">
            <h4 className="text-base font-semibold text-white">{assignment.title}</h4>
            {/* Status badge - right aligned for visibility */}
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${
                assignment.status === "graded"
                  ? "bg-emerald-500/90 text-white"
                  : assignment.status === "overdue"
                  ? "bg-rose-500/90 text-white"
                  : "bg-yellow-500/90 text-white"
              }`}
            >
              <span>{statusInfo.icon}</span>
              <span>
                {assignment.status === "graded"
                  ? `Graded: ${assignment.grade}`
                  : assignment.status === "overdue"
                  ? "Overdue"
                  : "Pending"}
              </span>
            </div>
          </div>

          <p className="text-xs text-white mb-2 line-clamp-2">{assignment.description}</p>

          <div className="flex items-center gap-2 text-xs text-white mb-2">
            <CalendarIcon className="w-3 h-3" />
            <span>
              Due: {assignment.dueDate}, {assignment.year}
            </span>
          </div>


          {assignment.status !== "graded" && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmitClick();
              }}
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
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignmentsData[0] | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Define "today" matching the assignment dataset and build last 7 days (including today)
  const today = new Date(2024, 10, 3); // Nov 3, 2024
  const [selectedDate, setSelectedDate] = useState<string>(format(today, 'MMM d yyyy'));

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    return {
      date: d,
      label: format(d, 'PPP'),
      value: format(d, 'MMM d yyyy'),
    };
  });

  // Actions
  const handleSubmitClick = (assignment: typeof assignmentsData[0]) => {
    setSelectedAssignment(assignment);
    setIsUploadModalOpen(true);
  };

  const handleUploadSuccess = () => {
    console.log("Assignment submitted successfully!");
  };

  // Filter assignments based on selected date
  const filteredAssignments = assignmentsData.filter((a) => `${a.dueDate} ${a.year}` === selectedDate);

  return (
    <section id="assignments" className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Assignments Timeline</h2>

        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-lg border border-white/30">
          {/* Date Filter */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-white" />
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-[240px] bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/30">
                  <SelectValue placeholder="Pick a date" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-white/20 border border-white/30 text-white shadow-xl">
                  {last7Days.map((d) => (
                    <SelectItem
                      key={d.value}
                      value={d.value}
                      className="text-white focus:bg-white/30 focus:text-white"
                    >
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredAssignments.length > 0 ? (
            <VerticalTimeline lineColor="#e5e7eb">
              {filteredAssignments.map((assignment, index) => (
                <TimelineCard
                  key={assignment.id}
                  assignment={assignment}
                  index={index}
                  onSubmitClick={() => handleSubmitClick(assignment)}
                />
              ))}
            </VerticalTimeline>
          ) : (
            <div className="text-center py-12">
              <p className="text-white text-lg">No assignments found for the selected date.</p>
            </div>
          )}
        </div>

        <style>{`
          .vertical-timeline-element {
            margin-bottom: 0 !important;
          }
          .vertical-timeline-element-content {
            min-height: auto !important;
          }
        `}</style>

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
