"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProjectForm({ onProjectAdded, clickTriger }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("NextJs");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("link", link);
      if (file) formData.append("image", file);

      const { data } = await axios.post("/api/projects", formData);

      if (data.success) {
        toast.success("Project added successfully!");
        setTitle("");
        setCategory("NextJs");
        setLink("");
        setFile(null);

        if (clickTriger) clickTriger(); // trigger parent refresh
        if (onProjectAdded) onProjectAdded(); // callback for parent
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="htmlCss">Html & Css</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="Javascript">Javascript</option>
            <option value="React">React</option>
            <option value="NextJs">NextJs</option>
            <option value="FullStack">FullStack</option>
            <option value="Urraan">Urraan</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Project Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
