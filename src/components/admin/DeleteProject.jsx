"use client";
import React from "react";
import axios from "axios";
import {  FaTrash } from "react-icons/fa";

const DeleteProject = ({ projectId, projects, setProjects }) => {
  const handleDeleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await axios.delete(`/api/projects/${projectId}`);
      if (response.data.success) {
        // Remove from local state
        setProjects(projects.filter((p) => p._id !== projectId));
        alert("Project deleted successfully!");
      } else {
        alert("Failed to delete project: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <button
      onClick={handleDeleteProject}
      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      title="Delete Project"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteProject;
