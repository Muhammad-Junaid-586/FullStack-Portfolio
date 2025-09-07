"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function EditProject() {
  const { id } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("NextJs")
  const [link, setLink] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/projects/${id}`)
        if (data.success) {
          setTitle(data.project.title || "")
          setCategory(data.project.category || "NextJs")
          setLink(data.project.link || "")
          if (data.project.imageUrl) {
            setPreview(data.project.imageUrl)
          }
        } else {
          toast.error("Project not found")
        }
      } catch (error) {
        toast.error("Error fetching project")
      }
    }
    if (id) fetchProject()
  }, [id])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("category", category)
      formData.append("link", link)
      if (file) formData.append("image", file)

      const { data } = await axios.put(`/api/projects/${id}`, formData)

      if (data.success) {
        toast.success("Project updated successfully!")
        router.push("/")
      } else {
        toast.error(data.message || "Update failed")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Project</h2>

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
            <label className="block mb-1 font-medium">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="w-full"
            />
            {preview && (
              <div className="mt-3">
                <p className="font-medium mb-1">Image Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
    </div>
  )
}