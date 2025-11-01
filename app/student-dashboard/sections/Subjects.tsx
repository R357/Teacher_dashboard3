"use client";
import { cn } from "@/lib/utils";
import {
  IconBook, // Using a more specific icon
  IconCode,
  IconDatabase,
  IconDeviceMobile,
  IconBrain,
  IconBrowser,
} from "@tabler/icons-react"; // Aceternity UI uses @tabler/icons-react
import Link from "next/link"; // We'll make the cards links

// This is the <Feature /> component from Aceternity UI
const Feature = ({
  title,
  description,
  icon,
  index,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 transition-all duration-300",
        
        // --- THIS IS THE CORRECTED BORDER LOGIC for a 3-column grid ---
        // Add left border to items in the first column (0, 3)
        (index % 3 === 0) && "lg:border-l dark:border-neutral-800",
        // Add bottom border to items in the first row (0, 1, 2)
        (index < 3) && "lg:border-b dark:border-neutral-800",
        // Remove right border from last column (2, 5)
        (index % 3 === 2) && "lg:border-r-0"
      )}
    >
      {/* Top row hover effect */}
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {/* Bottom row hover effect */}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      
      {/* Icon */}
      <div className="mb-4 relative z-10 px-10 text-[#1F2F98] group-hover/feature:text-[#1CA7EC] transition-colors duration-200 dark:text-neutral-400">
        {icon}
      </div>
      
      {/* Title */}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#1CA7EC] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#1F2F98] dark:text-neutral-100">
          {title}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </Link>
  );
};

// This is the main section component
export default function Subjects() {
  // Your subject data, now with icons
  const features = [
    {
      title: "Algorithms Structures",
      description: "View syllabus, notes, and grades.",
      icon: <IconBook />,
      href: "#",
    },
    {
      title: "Object Oriented Programming",
      description: "Access lecture slides and lab work.",
      icon: <IconCode />,
      href: "#",
    },
    {
      title: "Database Programming",
      description: "Check your project status and resources.",
      icon: <IconDatabase />,
      href: "#",
    },
    {
      title: "Web Development",
      description: "Review course materials and assignments.",
      icon: <IconBrowser />,
      href: "#",
    },
    {
      title: "Mobile Applications",
      description: "See your lab submissions.",
      icon: <IconDeviceMobile />,
      href: "#",
    },
    {
      title: "Machine Learning",
      description: "Explore datasets and projects.",
      icon: <IconBrain />,
      href: "#",
    },
  ];

  return (
    <section id="subjects" className="py-20 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Subjects
        </h2>
        
        {/* We wrap the grid in a rounded container for a clean look */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
