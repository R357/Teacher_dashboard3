import React from 'react';

const ResultCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
      View Details
    </button>
  </div>
);

export default function Results() {
  return (
    <section id="results" className="py-20 bg-gray-50"> 
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ResultCard title="Algorithms Structures" description="View grades and performance metrics." />
          <ResultCard title="Object Oriented Programming" description="Access detailed score reports." />
          <ResultCard title="Database Programming" description="Check overall performance." />
          <ResultCard title="Web Development" description="Review grade history." />
          <ResultCard title="Mobile Applications" description="View score breakdowns." />
          <ResultCard title="Machine Learning" description="Check performance trends." />
        </div>
      </div>
    </section>
  );
}

