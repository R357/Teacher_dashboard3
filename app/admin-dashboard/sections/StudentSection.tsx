import {
  UserCheck,
  FileText,
  Clock,
  Check, // This is the "tick mark" icon
  X,
  Bell,
  Eye,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function TeacherSection() {
  const [activeTab, setActiveTab] = useState<"requests" | "teachers">(
    "requests",
  );
  const [requests, setRequests] = useState([
    {
      id: "1",
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      title: "Calculus Chapter 3 Notes",
      date: "Dec 15, 2023",
      status: "pending" as const,
    },
    {
      id: "2",
      teacher: "Prof. Michael Brown",
      subject: "Computer Science",
      title: "Data Structures Lab Materials",
      date: "Dec 14, 2023",
      status: "pending" as const,
    },
    {
      id: "3",
      teacher: "Dr. Emily Davis",
      subject: "Physics",
      title: "Quantum Mechanics Lecture Notes",
      date: "Dec 13, 2023",
      status: "approved" as const,
    },
    {
      id: "4",
      teacher: "Mr. James Wilson",
      subject: "Chemistry",
      title: "Organic Chemistry Slides",
      date: "Dec 12, 2023",
      status: "rejected" as const,
    },
    {
      id: "5",
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      title: "Linear Algebra Problem Set",
      date: "Dec 16, 2023",
      status: "pending" as const,
    },
    {
      id: "6",
      teacher: "Prof. Michael Brown",
      subject: "Computer Science",
      title: "Algorithm Design Patterns",
      date: "Dec 11, 2023",
      status: "approved" as const,
    },
    {
      id: "7",
      teacher: "Dr. Emily Davis",
      subject: "Physics",
      title: "Thermodynamics Study Guide",
      date: "Dec 10, 2023",
      status: "pending" as const,
    },
    {
      id: "8",
      teacher: "Mr. James Wilson",
      subject: "Chemistry",
      title: "Chemical Reactions Worksheet",
      date: "Dec 17, 2023",
      status: "pending" as const,
    },
    {
      id: "9",
      teacher: "Dr. Lisa Anderson",
      subject: "Biology",
      title: "Cell Biology Lab Manual",
      date: "Dec 9, 2023",
      status: "approved" as const,
    },
    {
      id: "10",
      teacher: "Prof. David Martinez",
      subject: "History",
      title: "World War II Timeline",
      date: "Dec 18, 2023",
      status: "rejected" as const,
    },
    {
      id: "11",
      teacher: "Dr. Sarah Johnson",
      subject: "Mathematics",
      title: "Trigonometry Practice Problems",
      date: "Dec 8, 2023",
      status: "approved" as const,
    },
    {
      id: "12",
      teacher: "Prof. Michael Brown",
      subject: "Computer Science",
      title: "Machine Learning Basics",
      date: "Dec 19, 2023",
      status: "pending" as const,
    },
    {
      id: "13",
      teacher: "Dr. Emily Davis",
      subject: "Physics",
      title: "Electromagnetism Notes",
      date: "Dec 7, 2023",
      status: "approved" as const,
    },
    {
      id: "14",
      teacher: "Mr. James Wilson",
      subject: "Chemistry",
      title: "Periodic Table Quiz",
      date: "Dec 20, 2023",
      status: "rejected" as const,
    },
    {
      id: "15",
      teacher: "Dr. Lisa Anderson",
      subject: "Biology",
      title: "Genetics Study Materials",
      date: "Dec 6, 2023",
      status: "pending" as const,
    },
  ]);

  // This list now represents PENDING teacher approvals
  const [teachers, setTeachers] = useState([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      email: "sarah.j@university.edu",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "Prof. Michael Brown",
      subject: "Computer Science",
      email: "michael.b@university.edu",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      name: "Dr. Emily Davis",
      subject: "Physics",
      email: "emily.d@university.edu",
      phone: "+1 (555) 345-6789",
    },
    {
      id: "4",
      name: "Mr. James Wilson",
      subject: "Chemistry",
      email: "james.w@university.edu",
      phone: "+1 (555) 456-7890",
    },
    {
      id: "5",
      name: "Dr. Lisa Anderson",
      subject: "Biology",
      email: "lisa.a@university.edu",
      phone: "+1 (555) 567-8901",
    },
    {
      id: "6",
      name: "Prof. David Martinez",
      subject: "History",
      email: "david.m@university.edu",
      phone: "+1 (555) 678-9012",
    },
    {
      id: "7",
      name: "Dr. Robert Taylor",
      subject: "English Literature",
      email: "robert.t@university.edu",
      phone: "+1 (555) 789-0123",
    },
    {
      id: "8",
      name: "Prof. Jennifer Lee",
      subject: "Art & Design",
      email: "jennifer.l@university.edu",
      phone: "+1 (555) 890-1234",
    },
    {
      id: "9",
      name: "Dr. Christopher Garcia",
      subject: "Economics",
      email: "chris.g@university.edu",
      phone: "+1 (555) 901-2345",
    },
    {
      id: "10",
      name: "Ms. Amanda Clark",
      subject: "Music",
      email: "amanda.c@university.edu",
      phone: "+1 (555) 012-3456",
    },
    {
      id: "11",
      name: "Dr. Daniel Rodriguez",
      subject: "Psychology",
      email: "daniel.r@university.edu",
      phone: "+1 (555) 123-5678",
    },
    {
      id: "12",
      name: "Prof. Laura Wright",
      subject: "Philosophy",
      email: "laura.w@university.edu",
      phone: "+1 (555) 234-6789",
    },
    {
      id: "13",
      name: "Dr. Kevin Thompson",
      subject: "Geography",
      email: "kevin.t@university.edu",
      phone: "+1 (555) 345-7890",
    },
    {
      id: "14",
      name: "Ms. Nicole White",
      subject: "Physical Education",
      email: "nicole.w@university.edu",
      phone: "+1 (555) 456-8901",
    },
    {
      id: "15",
      name: "Dr. Steven Harris",
      subject: "Political Science",
      email: "steven.h@university.edu",
      phone: "+1 (555) 567-9012",
    },
  ]);

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "approved" as const } : r,
      ),
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: "rejected" as const } : r,
      ),
    );
  };

  // FIXED: This function now simulates approval by removing the teacher from the pending list
  const handleApproveTeacher = (id: string) => {
    if (confirm("Are you sure you want to approve this teacher?")) {
      // In a real app, this would send an API request to set the teacher's status to 'approved'.
      // For this UI demo, we'll just remove them from the pending list.
      console.log("Approve teacher:", id);
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  // FIXED: Renamed this function for clarity
  const handleRejectTeacher = (id: string) => {
    if (
      confirm(
        "Are you sure you want to reject this teacher? This will delete their request.",
      )
    ) {
      console.log("Reject teacher:", id);
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedRequests = requests.filter((r) => r.status === "approved");
  const rejectedRequests = requests.filter((r) => r.status === "rejected");

  return (
    <section id="teachers" className="py-10 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Teacher Management
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Manage teachers and review note upload requests
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-2 shadow-sm border border-gray-100 flex-1 sm:flex-none">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Pending Requests
                  </p>
                  <p className="text-sm sm:text-xl font-bold text-gray-800">
                    {pendingRequests.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("requests")}
              className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 font-semibold text-xs sm:text-sm transition-colors ${
                activeTab === "requests"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Upload Requests</span>
                <span className="sm:hidden">Requests</span>
                {pendingRequests.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 rounded-full">
                    {pendingRequests.length}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab("teachers")}
              className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 font-semibold text-xs sm:text-sm transition-colors ${
                activeTab === "teachers"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Teacher Approvals</span>
                <span className="sm:hidden">Approvals</span>
                {/* Show pending teacher count if any */}
                {teachers.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 rounded-full">
                    {teachers.length}
                  </span>
                )}
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === "requests" && (
              <div className="space-y-8">
                {pendingRequests.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        Pending Requests
                      </h3>
                      <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {pendingRequests.length}
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
                        <table className="w-full">
                          <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Note Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Teacher
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {pendingRequests.map((request) => (
                              <tr
                                key={request.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="font-medium text-gray-800">
                                      {request.title}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {request.teacher}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                  {request.subject}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {request.date}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() =>
                                        alert("View note details")
                                      }
                                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                      title="View"
                                    >
                                      <Eye className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button
                                      onClick={() => handleApprove(request.id)}
                                      className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                                      title="Approve"
                                    >
                                      <Check className="w-4 h-4 text-green-600" />
                                    </button>
                                    <button
                                      onClick={() => handleReject(request.id)}
                                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Reject"
                                    >
                                      <X className="w-4 h-4 text-red-600" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {approvedRequests.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        Approved Requests
                      </h3>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {approvedRequests.length}
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
                        <table className="w-full">
                          <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Note Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Teacher
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {approvedRequests.map((request) => (
                              <tr
                                key={request.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="font-medium text-gray-800">
                                      {request.title}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {request.teacher}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                  {request.subject}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {request.date}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex justify-center">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                      <Check className="w-3 h-3" />
                                      Approved
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {rejectedRequests.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <X className="w-5 h-5 text-red-500" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        Rejected Requests
                      </h3>
                      <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {rejectedRequests.length}
                      </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
                        <table className="w-full">
                          <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Note Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Teacher
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {rejectedRequests.map((request) => (
                              <tr
                                key={request.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="font-medium text-gray-800">
                                      {request.title}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {request.teacher}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                  {request.subject}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {request.date}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex justify-center">
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                      <X className="w-3 h-3" />
                                      Rejected
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "teachers" && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Pending Teacher Approvals ({teachers.length})
                  </h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {teachers.map((teacher) => (
                          <tr
                            key={teacher.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                  {teacher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span className="font-medium text-gray-800">
                                  {teacher.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {teacher.subject}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {teacher.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {teacher.phone}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                {/* FIXED: This is now an Approve button */}
                                <button
                                  onClick={() =>
                                    handleApproveTeacher(teacher.id)
                                  }
                                  className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4 text-green-600" />
                                </button>
                                {/* FIXED: This is now a Reject button */}
                                <button
                                  onClick={() =>
                                    handleRejectTeacher(teacher.id)
                                  }
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}