import React from "react";

function InternshipCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={job.image} alt={job.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{job.title}</h3>
        <p className="text-gray-600 mt-2">{job.description}</p>
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>⏳ {job.duration}</span>
          <span>💰 {job.stipend}</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
}
export default InternshipCard;

