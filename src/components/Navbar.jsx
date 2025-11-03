import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MicroIntern 🚀
        </Link>
        <div className="space-x-6 font-medium">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
          <Link to="/signup" className="hover:text-yellow-300">Signup</Link>
          <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

