"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  BarChart3,
  CheckSquare,
  User,
  LogOut,
} from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "#" || !sectionId) return;
    
    const element = document.querySelector(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 100, // Offset for navbar height
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    // Prevent default link behavior
    e.preventDefault();
    
    // Ignore Profile and Logout
    if (title === "Profile" || title === "Logout") {
      return;
    }
    
    // Handle Home - scroll to top
    if (title === "Home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Map navbar items to section IDs
    const sectionMap: { [key: string]: string } = {
      "Subjects": "#subjects",
      "Assignment": "#assignments",
      "Exam": "#exams",
      "Report": "#results",
      "Attendance": "#attendance",
    };

    const sectionId = sectionMap[title];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  const navItems = [
    { 
      title: "Home", 
      icon: <Home className="w-5 h-5" />, 
      href: "#",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "Home")
    },
    { 
      title: "Subjects", 
      icon: <BookOpen className="w-5 h-5" />, 
      href: "#subjects",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "Subjects")
    },
    { 
      title: "Assignment", 
      icon: <FileText className="w-5 h-5" />, 
      href: "#assignments",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "Assignment")
    },
    { 
      title: "Exam", 
      icon: <ClipboardList className="w-5 h-5" />, 
      href: "#exams",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "Exam")
    },
    { 
      title: "Report", 
      icon: <BarChart3 className="w-5 h-5" />, 
      href: "#results",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "Report")
    },
    { 
      title: "Attendance", 
      icon: <CheckSquare className="w-5 h-5" />, 
      href: "#attendance",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "Attendance")
    },
    { 
      title: "Profile", 
      icon: <User className="w-5 h-5" />, 
      href: "#",
      onClick: () => {} // Ignored for now
    },
    { 
      title: "Logout", 
      icon: <LogOut className="w-5 h-5" />, 
      href: "#",
      onClick: () => {} // Ignored for now
    },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar when scrolling up or at the top
          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsVisible(true);
          } 
          // Hide navbar when scrolling down past 150px
          else if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 
        backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm
        transition-all duration-500 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-lg shadow-md">
          S
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Student Portal</h1>
      </div>

      {/* Right Section - Floating Dock */}
      <div className="flex items-center gap-6">
        <FloatingDock
          items={navItems}
          desktopClassName="flex gap-4"
          mobileClassName="grid grid-cols-4 gap-4"
        />
      </div>
    </nav>
  );
}