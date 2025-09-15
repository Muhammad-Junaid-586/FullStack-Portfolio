// components/ManageAccount.tsx
"use client"

import { UserProfile } from "@clerk/nextjs"

export default function ManageAccount() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <UserProfile routing="hash" />
    </div>
  )
}
