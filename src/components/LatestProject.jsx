"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import DeleteProject from "./admin/DeleteProject";
import EditProject from "./admin/EditProject";
import { FaEdit } from "react-icons/fa";
import AddProjectForm from "./AddProjectForm";
import { useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";

const categoryMap = {
  All: "All",
  htmlCss: "Html & Css",
  Bootstrap: "Bootstrap",
  Javascript: "Javascript",
  React: "React",
  NextJs: "NextJs",
  FullStack: "FullStack",
  Urraan: "Urraan",
};

const LatestProjects = () => {
  const [active, setActive] = useState("FullStack");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoaded: userLoaded } = useUser();
   const reloadFlag = useSelector((state) => state.projects.reloadFlag);
  
  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/projects");
      
      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else if (response.data && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      } else if (response.data && response.data.success && Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      } else {
        setError("Invalid data format received from API");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.response?.data?.message || error.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (reloadFlag > 0) {
      fetchProjects();
    }
  }, [reloadFlag]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

//   const fetchProjects = async (category) => {
//   try {
//     setLoading(true);
//     setError(null);

//     const url = category && category !== "All" 
//       ? `/api/projects?category=${category}`
//       : "/api/projects";

//     const { data } = await axios.get(url);

//     if (data.success) {
//       setProjects(data.projects || []);
//     } else {
//       setError("Failed to fetch projects");
//     }
//   } catch (err) {
//     console.error("Error fetching projects:", err);
//     setError(err.response?.data?.error || "Failed to fetch projects");
//   } finally {
//     setLoading(false);
//   }
// };


// useEffect(() => {
//   fetchProjects(active);
// }, [active]);


  const filteredProjects = active === "All" 
    ? projects 
    : projects.filter((p) => p.category === active);

  if (loading) {
    return (
      <section className="w-[90%] mx-auto py-12 text-center" id="portfolio">
        <h2 className="text-4xl font-black mb-2">Loading Projects...</h2>
        <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8"></div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-[90%] mx-auto py-12 text-center" id="portfolio">
        <h2 className="text-4xl font-black mb-2 text-red-500">Error</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={fetchProjects}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="w-[90%] mx-auto py-6 md:py-12" id="portfolio">
      <h2 className="text-4xl font-black text-center mb-2"  data-aos="zoom-out-left">
        Latest <span className="text-transparent bg-clip-text bg-blue-500 ">Projects</span>
      </h2>

      <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8"></div>

    {isAdmin && <div className="flex justify-center"  data-aos="zoom-out-right">
      {isAdmin && <AddProjectForm onProjectAdded={fetchProjects} /> }
     </div>
}

     

      <div className="flex justify-center flex-wrap gap-3 my-8">
        {Object.keys(categoryMap).map((cat) => (
          <button   data-aos="zoom-in"  data-aos-delay={cat * 300}
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-2 md:px-5 py-2 rounded-full border transition-all duration-300   md:font-medium ${
              active === cat
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg border-transparent scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            {categoryMap[cat]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10" data-aos="zoom-in-down">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project._id || project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative"
            >
              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-2 left-2 flex gap-2 z-10">
                  <DeleteProject projectId={project._id} projects={projects} setProjects={setProjects} />
                  <Link href={`/projects/edit-project/${project._id}`} className="text-white bg-blue-500 p-2 rounded-full cursor-pointer">
                    <FaEdit  size={20}  />
                  </Link>
                </div>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl || "/placeholder-image.jpg"}
                  alt={project.title || "Project image"}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZpbGw9IiM5YzlkOWUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                  }}
                />
               
                <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {categoryMap[project.category] || project.category || "Uncategorized"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title || "Untitled Project"}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description || "No description available for this project."}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}
                  </span>
                  <Link
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6">
                No projects found in {categoryMap[active]} category.
              </p>
              {projects.length > 0 && (
                <button
                  onClick={() => setActive("All")}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  View All Projects
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProjects;