"use client";
import { cn } from "@/lib/utils";
import {
  IconCalendarEvent,
  IconClock,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Link from "next/link";

// This <Feature /> component is identical to the one in Subjects.tsx
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
        (index % 3 === 0) && "lg:border-l dark:border-neutral-800",
        // Only 3 items, so only first row rule is needed
        (index < 3) && "lg:border-b dark:border-neutral-800",
        (index % 3 === 2) && "lg:border-r-0"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {/* Icon: Changed to your dark blue and bright blue on hover */}
      <div className="mb-4 relative z-10 px-10 text-[#1F2F98] group-hover/feature:text-[#1CA7EC] transition-colors duration-200 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        {/* Bar: Changed to your bright blue on hover */}
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#1CA7EC] transition-all duration-200 origin-center" />
        {/* Title: Changed to your dark blue */}
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#1F2F98] dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </Link>
  );
};

// Main section component
export default function Exams() {
  const features = [
    {
      title: "Algorithms Midterm",
      description: "Nov 15, 2025 @ 10:00 AM. Room: 301A",
      icon: <IconCalendarEvent className="w-8 h-8" />,
      href: "#",
    },
    {
      title: "Database Final",
      description: "Nov 18, 2025 @ 1:00 PM. Room: 204B",
      icon: <IconCalendarEvent className="w-8 h-8" />,
      href: "#",
    },
    {
      title: "Web Dev Final",
      description: "Nov 21, 2025 @ 9:00 AM. Room: 101C",
      icon: <IconCalendarEvent className="w-8 h-8" />,
      href: "#",
    },
  ];

  return (
    <section id="exams" className="py-20 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Exams
        </h2>
        
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

