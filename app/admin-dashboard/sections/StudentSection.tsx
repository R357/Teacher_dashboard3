import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Mail,
  Phone,
  ArrowRight,
  School,
  X,
  ClipboardList,
} from "lucide-react";

// Hook for detecting clicks outside
function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}

const students = [
  {
    name: "Alexandra Smith",
    id: "STU001",
    grade: "Grade 12",
    department: "Computer Science",
    email: "alex.smith@student.edu",
    phone: "+1 (555) 123-4567",
    parentName: "John & Mary Smith",
  },
  {
    name: "Michael Chen",
    id: "STU002",
    grade: "Grade 11",
    department: "Mathematics",
    email: "michael.chen@student.edu",
    phone: "+1 (555) 234-5678",
    parentName: "David & Lisa Chen",
  },
  {
    name: "Emily Rodriguez",
    id: "STU003",
    grade: "Grade 12",
    department: "Biology",
    email: "emily.r@student.edu",
    phone: "+1 (555) 345-6789",
    parentName: "Carlos & Maria Rodriguez",
  },
  {
    name: "James Wilson",
    id: "STU004",
    grade: "Grade 10",
    department: "Physics",
    email: "james.w@student.edu",
    phone: "+1 (555) 456-7890",
    parentName: "Robert & Jennifer Wilson",
  },
  {
    name: "Sophia Martinez",
    id: "STU005",
    grade: "Grade 11",
    department: "Chemistry",
    email: "sophia.m@student.edu",
    phone: "+1 (555) 567-8901",
    parentName: "Miguel & Ana Martinez",
  },
  {
    name: "Daniel Kim",
    id: "STU006",
    grade: "Grade 12",
    department: "Computer Science",
    email: "daniel.kim@student.edu",
    phone: "+1 (555) 678-9012",
    parentName: "Kevin & Susan Kim",
  },
  {
    name: "Isabella Thompson",
    id: "STU007",
    grade: "Grade 10",
    department: "Arts & Design",
    email: "isabella.t@student.edu",
    phone: "+1 (555) 789-0123",
    parentName: "William & Karen Thompson",
  },
  {
    name: "Ethan Brown",
    id: "STU008",
    grade: "Grade 11",
    department: "History",
    email: "ethan.b@student.edu",
    phone: "+1 (555) 890-1234",
    parentName: "Matthew & Patricia Brown",
  },
  {
    name: "Olivia Johnson",
    id: "STU009",
    grade: "Grade 12",
    department: "Literature",
    email: "olivia.j@student.edu",
    phone: "+1 (555) 901-2345",
    parentName: "Richard & Linda Johnson",
  },
  {
    name: "Noah Anderson",
    id: "STU010",
    grade: "Grade 10",
    department: "Mathematics",
    email: "noah.a@student.edu",
    phone: "+1 (555) 012-3456",
    parentName: "Paul & Sarah Anderson",
  },
  {
    name: "Emma Davis",
    id: "STU011",
    grade: "Grade 11",
    department: "Biology",
    email: "emma.d@student.edu",
    phone: "+1 (555) 123-5678",
    parentName: "Tom & Rachel Davis",
  },
  {
    name: "Liam Garcia",
    id: "STU012",
    grade: "Grade 12",
    department: "Physics",
    email: "liam.g@student.edu",
    phone: "+1 (555) 234-6789",
    parentName: "Jose & Maria Garcia",
  },
  {
    name: "Ava Miller",
    id: "STU013",
    grade: "Grade 10",
    department: "Chemistry",
    email: "ava.m@student.edu",
    phone: "+1 (555) 345-7890",
    parentName: "Steve & Laura Miller",
  },
  {
    name: "William Taylor",
    id: "STU014",
    grade: "Grade 11",
    department: "Computer Science",
    email: "william.t@student.edu",
    phone: "+1 (555) 456-8901",
    parentName: "Mark & Jessica Taylor",
  },
  {
    name: "Mia Jackson",
    id: "STU015",
    grade: "Grade 12",
    department: "Arts & Design",
    email: "mia.j@student.edu",
    phone: "+1 (555) 567-9012",
    parentName: "Chris & Amanda Jackson",
  },
  {
    name: "Benjamin White",
    id: "STU016",
    grade: "Grade 10",
    department: "History",
    email: "ben.w@student.edu",
    phone: "+1 (555) 678-0123",
    parentName: "Peter & Nancy White",
  },
  {
    name: "Charlotte Harris",
    id: "STU017",
    grade: "Grade 11",
    department: "Literature",
    email: "charlotte.h@student.edu",
    phone: "+1 (555) 789-1234",
    parentName: "Daniel & Michelle Harris",
  },
  {
    name: "Lucas Martin",
    id: "STU018",
    grade: "Grade 12",
    department: "Mathematics",
    email: "lucas.m@student.edu",
    phone: "+1 (555) 890-2345",
    parentName: "Brian & Kimberly Martin",
  },
  {
    name: "Amelia Thomas",
    id: "STU019",
    grade: "Grade 10",
    department: "Biology",
    email: "amelia.t@student.edu",
    phone: "+1 (555) 901-3456",
    parentName: "Gary & Deborah Thomas",
  },
  {
    name: "Henry Moore",
    id: "STU020",
    grade: "Grade 11",
    department: "Physics",
    email: "henry.m@student.edu",
    phone: "+1 (555) 012-4567",
    parentName: "Frank & Carol Moore",
  },
];

type Student = (typeof students)[number];

const InfoItem = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string;
}) => (
  <div className="flex items-start gap-2">
    <Icon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default function StudentSection() {
  const [active, setActive] = useState<Student | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const totalStudents = students.length;
  const byDepartment = students.reduce((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 h-full w-full"
              onClick={() => setActive(null)}
            />

            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-[101]"
              onClick={() => setActive(null)}
            >
              <X className="w-5 h-5 text-black" />
            </motion.button>

            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-lg h-auto max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-y-auto z-[100]"
            >
              <motion.div
                layoutId={`image-${active.name}-${id}`}
                className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white"
              >
                <span className="font-bold text-6xl">
                  {active.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </motion.div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-2xl text-gray-800"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`department-${active.name}-${id}`}
                      className="text-lg text-gray-600"
                    >
                      {active.department}
                    </motion.p>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {active.grade}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Student Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoItem icon={ClipboardList} label="Student ID" value={active.id} />
                    <InfoItem icon={Mail} label="Email" value={active.email} />
                    <InfoItem icon={Phone} label="Phone" value={active.phone} />
                    <InfoItem icon={Users} label="Parent(s)" value={active.parentName} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Quick Actions
                  </h4>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 text-center py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
                    >
                      View Parent Details
                    </button>
                    <button
                      className="flex-1 text-center py-2 px-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                    >
                      View Grades
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section id="students" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Student Management
              </h2>
              <p className="text-gray-600 mt-2">
                View all students and access parent information
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-600">Total Students</p>
                    <p className="text-xl font-bold text-gray-800">
                      {totalStudents}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <School className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-600">Departments</p>
                    <p className="text-xl font-bold text-gray-800">
                      {Object.keys(byDepartment).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr className="border-b border-gray-200">
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <motion.tr
                      layoutId={`card-${student.name}-${id}`}
                      key={student.id}
                      onClick={() => setActive(student)}
                      className="cursor-pointer hover:bg-gray-100 transition-colors group"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <motion.div
                            layoutId={`image-${student.name}-${id}`}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          >
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </motion.div>
                          <div>
                            <motion.h3
                              layoutId={`title-${student.name}-${id}`}
                              className="font-bold text-gray-800 text-sm"
                            >
                              {student.name}
                            </motion.h3>
                            <p className="text-xs text-gray-600">
                              ID: {student.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-sm text-gray-600">
                        <motion.span layoutId={`department-${student.name}-${id}`}>
                          {student.department}
                        </motion.span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                          {student.grade}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{student.phone}</span>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-blue-50 text-blue-700 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <span className="text-sm font-semibold">View</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
