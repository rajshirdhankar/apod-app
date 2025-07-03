import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 mb-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">NASA APOD</Link>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/favourites" className="text-gray-700 hover:text-blue-500">Favourites</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;