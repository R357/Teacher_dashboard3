import React from 'react';

const ExamCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
      View Details
    </button>
  </div>
);

export default function Exams() {
  return (
    <section id="exams" className="py-20 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Exams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExamCard title="Algorithms Structures" description="View exam schedules and results." />
          <ExamCard title="Object Oriented Programming" description="Access exam preparation materials." />
          <ExamCard title="Database Programming" description="Check exam dates and locations." />
          <ExamCard title="Web Development" description="Review exam performance." />
          <ExamCard title="Mobile Applications" description="View exam history." />
          <ExamCard title="Machine Learning" description="Check exam statistics." />
        </div>
      </div>
    </section>
  );
}

