"use client";

import Link from "next/link";

export default function Sidebar({ setActiveTab, activeTab }) {
  return (
    <div className="w-full md:w-64 bg-white shadow-md flex flex-col p-4 md:min-h-screen">
      <Link 
        href="/" 
        className="text-xl font-bold mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        Admin Dashboard
      </Link>
      <button
        onClick={() => setActiveTab("addProject")}
        className={`mb-4 px-4 py-2 rounded text-left transition-colors ${
          activeTab === "addProject" 
            ? "bg-blue-500 text-white hover:bg-blue-600" 
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Add Project
      </button>
      <button
        onClick={() => setActiveTab("projectList")}
        className={`mb-4 px-4 py-2 rounded text-left transition-colors ${
          activeTab === "projectList" 
            ? "bg-blue-500 text-white hover:bg-blue-600" 
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Project List
      </button>
    </div>
  );
}