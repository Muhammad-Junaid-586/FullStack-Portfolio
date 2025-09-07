import { auth, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function requireAdmin(req) {
  const { userId } = getAuth(req); // Use getAuth() instead of auth();
  
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // Make API call to Clerk to check user role
  const clerkApiUrl = `https://api.clerk.com/v1/users/${userId}`;
  const clerkResponse = await fetch(clerkApiUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!clerkResponse.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to verify user" },
      { status: 403 }
    );
  }
  
  const userData = await clerkResponse.json();
  const userRole = userData.public_metadata?.role;
  
  if (userRole !== "admin") {
    return NextResponse.json(
      { success: false, message: "Admin access required" },
      { status: 403 }
    );
  }
  
  return null; // No error, user is admin
}