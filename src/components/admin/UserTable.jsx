"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const UserTable = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users")
        const data = await res.json()

        const formatted = data.map((u) => ({
          id: u.id,
          image: u.image_url,
          role: u.public_metadata.role,
          name: `${u.first_name || ""} ${u.last_name || ""}`.trim(),
          email: u.email_addresses?.[0]?.email_address || "N/A",
          createdAt: new Date(u.created_at).toLocaleDateString(),
        }))

        setUsers(formatted)
      } catch (err) {
        console.error("Error fetching users:", err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="border px-4 py-2 text-left">ID</th> */}
              <th className="border px-4 py-2 text-left">IMAGE</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* <td className="border px-4 py-2">{user.id}</td> */}
                  <td className="border px-4 py-2"><Image className="rounded-full" src={user.image} alt={user.name} width={50} height={50} /></td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role === "admin" ? "Admin" : "User"}</td>
                  <td className="border px-4 py-2">{user.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border px-4 py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable
