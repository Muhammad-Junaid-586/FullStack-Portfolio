"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function DataTable() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/projects");

      const projectsData = Array.isArray(data)
        ? data
        : data?.projects || data?.data || [];

      setProjects(projectsData);
      setFilteredProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects whenever categoryFilter changes
  useEffect(() => {
    if (categoryFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === categoryFilter)
      );
    }
  }, [categoryFilter, projects]);

  if (loading) return <p className="p-4">Loading projects...</p>;

  // Get unique categories
  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Projects List</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr
                  key={project._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-300 px-4 py-1">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-1">
                    <Image
                      className="rounded-full"
                      src={project.imageUrl}
                      alt={project.title}
                      width={30}
                      height={30}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-1">{project.title}</td>
                  <td className="border border-gray-300 px-4 py-1">{project.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
