// app/(student-dashboard)/sections/Subjects.tsx
import React from 'react';

// A simple card component for this section
const SubjectCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
      View Details
    </button>
  </div>
);

export default function Subjects() {
  return (
    // We add 'id' for potential in-page navigation
    // We use bg-gray-50 to match your page's background
    <section id="subjects" className="py-20 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* You would map over real data here */}
          <SubjectCard title="Algorithms Structures" description="View syllabus, notes, and grades." />
          <SubjectCard title="Object Oriented Programming" description="Access lecture slides and lab work." />
          <SubjectCard title="Database Programming" description="Check your project status and resources." />
          <SubjectCard title="Web Development" description="Review course materials and assignments." />
          <SubjectCard title="Mobile Applications" description="See your lab submissions." />
          <SubjectCard title="Machine Learning" description="Explore datasets and projects." />
        </div>
      </div>
    </section>
  );
}