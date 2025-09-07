"use client";

import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-gray-800 bg-white shadow-inner py-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Muhammad Junaid. All rights
          reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="bg-blue-500 p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-white" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
