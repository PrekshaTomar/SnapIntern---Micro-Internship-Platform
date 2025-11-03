import React, { useState, useEffect } from "react";

function Dashboard() {
  const internshipsData = [
    {
      id: 1,
      title: "Frontend Developer Internship",
      company: "TechNova",
      logo: "https://img.icons8.com/color/96/react-native.png",
      duration: "2 Months",
      stipend: 5000,
      location: "Remote",
      description: "Work on React-based projects, build UI components, and collaborate with the team.",
    },
    {
      id: 2,
      title: "Data Science Micro-Internship",
      company: "DataWorks",
      logo: "https://img.icons8.com/color/96/python.png",
      duration: "1 Month",
      stipend: 3000,
      location: "Hybrid",
      description: "Analyze datasets, create ML models, and generate reports.",
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "Designify",
      logo: "https://img.icons8.com/color/96/figma--v1.png",
      duration: "3 Months",
      stipend: 7000,
      location: "Remote",
      description: "Design modern UI screens and conduct user testing.",
    },
    {
      id: 4,
      title: "Backend Developer Internship",
      company: "CodeBase",
      logo: "https://img.icons8.com/color/96/nodejs.png",
      duration: "2 Months",
      stipend: 6000,
      location: "On-site",
      description: "Build scalable APIs using Node.js and MongoDB.",
    },
    {
      id: 5,
      title: "AI Research Intern",
      company: "AI Labs",
      logo: "https://img.icons8.com/color/96/artificial-intelligence.png",
      duration: "6 Months",
      stipend: 10000,
      location: "Remote",
      description: "Work on AI research papers and innovative prototypes.",
    },
    {
      id: 6,
      title: "Fullstack Developer Internship",
      company: "WebWorks",
      logo: "https://img.icons8.com/color/96/javascript.png",
      duration: "3 Months",
      stipend: 8000,
      location: "Hybrid",
      description: "Work on both frontend and backend using MERN stack.",
    },
  ];

  // Infinite scroll states
  const [visibleCount, setVisibleCount] = useState(3);

  // Modal state
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Bookmark state
  const [bookmarks, setBookmarks] = useState([]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setVisibleCount((prev) => Math.min(prev + 2, internshipsData.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [internshipsData.length]);

  // Bookmark handler
  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((b) => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">Available Internships</h1>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {internshipsData.slice(0, visibleCount).map((intern) => (
          <div
            key={intern.id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 relative"
          >
            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(intern.id)}
              className="absolute top-3 right-3 text-xl"
            >
              {bookmarks.includes(intern.id) ? "🔖" : "📑"}
            </button>

            <div
              onClick={() => setSelectedInternship(intern)}
              className="cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={intern.logo}
                  alt={intern.company}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-blue-700">{intern.title}</h3>
                  <p className="text-gray-500">{intern.company}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                Duration: {intern.duration} | Stipend: ₹{intern.stipend}
              </p>
              <p className="text-gray-500">Location: {intern.location}</p>
            </div>

            <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Internship Detail Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg relative">
            <button
              onClick={() => setSelectedInternship(null)}
              className="absolute top-3 right-3 text-xl"
            >
              ❌
            </button>
            <div className="flex items-center space-x-4">
              <img
                src={selectedInternship.logo}
                alt={selectedInternship.company}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {selectedInternship.title}
                </h2>
                <p className="text-gray-500">{selectedInternship.company}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{selectedInternship.description}</p>
            <p className="mt-2 text-gray-600">
              Duration: {selectedInternship.duration} | Stipend: ₹
              {selectedInternship.stipend}
            </p>
            <p className="text-gray-500">Location: {selectedInternship.location}</p>
            <button className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Apply for Internship
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
