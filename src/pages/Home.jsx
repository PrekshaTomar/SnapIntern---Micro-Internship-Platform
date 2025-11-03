import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bookmark } from "lucide-react";

const allInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "Delhi",
    stipend: 8000,
    duration: "3 Months",
    image: "https://source.unsplash.com/400x300/?coding,web",
    description:
      "Work with React and Tailwind to build amazing UI components and improve the user experience.",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "AI Labs",
    location: "Bangalore",
    stipend: 12000,
    duration: "6 Months",
    image: "https://source.unsplash.com/400x300/?data,science",
    description:
      "Work on real datasets, build ML models, and collaborate with senior data scientists.",
  },
  {
    id: 3,
    title: "Digital Marketing Intern",
    company: "Growthify",
    location: "Remote",
    stipend: 5000,
    duration: "2 Months",
    image: "https://source.unsplash.com/400x300/?marketing,digital",
    description:
      "Assist in social media campaigns, SEO, and analytics to boost company presence.",
  },
  // add more sample internships here...
];

const Home = () => {
  const [internships, setInternships] = useState(allInternships.slice(0, 2));
  const [hasMore, setHasMore] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    minStipend: "",
    duration: "",
  });

  const fetchMoreData = () => {
    if (internships.length >= allInternships.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setInternships((prev) => [
        ...prev,
        ...allInternships.slice(prev.length, prev.length + 2),
      ]);
    }, 1000);
  };

  const handleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredInternships = internships.filter((intern) => {
    return (
      (filters.location === "" ||
        intern.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())) &&
      (filters.minStipend === "" || intern.stipend >= filters.minStipend) &&
      (filters.duration === "" ||
        intern.duration.toLowerCase().includes(filters.duration.toLowerCase()))
    );
  });

  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center text-white p-16 rounded-2xl shadow-md mb-8"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x500/?college,students')",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Internship 🚀</h1>
        <p className="text-lg">
          Explore internships tailored for students with real-world projects and
          stipends.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Location"
          className="p-2 border rounded"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Min Stipend"
          className="p-2 border rounded"
          value={filters.minStipend}
          onChange={(e) =>
            setFilters({ ...filters, minStipend: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Duration (e.g. 3 Months)"
          className="p-2 border rounded"
          value={filters.duration}
          onChange={(e) =>
            setFilters({ ...filters, duration: e.target.value })
          }
        />
      </div>

      {/* Internship List with Infinite Scroll */}
      <InfiniteScroll
        dataLength={internships.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading more internships...</h4>}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((intern) => (
            <motion.div
              key={intern.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer relative"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedInternship(intern)}
            >
              <img
                src={intern.image}
                alt={intern.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{intern.title}</h2>
                <p className="text-gray-600">{intern.company}</p>
                <p className="text-gray-500 text-sm">{intern.location}</p>
                <p className="text-green-600 font-bold mt-2">
                  ₹{intern.stipend}/month
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmark(intern.id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarked.includes(intern.id)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-500"
                  }`}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>

      {/* Internship Detail Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              {selectedInternship.title}
            </h2>
            <p className="text-gray-600 mb-1">{selectedInternship.company}</p>
            <p className="text-gray-500 mb-3">{selectedInternship.location}</p>
            <img
              src={selectedInternship.image}
              alt={selectedInternship.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <p className="text-gray-700">{selectedInternship.description}</p>
            <p className="mt-3 font-bold text-green-600">
              Stipend: ₹{selectedInternship.stipend}/month
            </p>
            <p className="text-gray-600">Duration: {selectedInternship.duration}</p>

            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setSelectedInternship(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
