import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";
// import { auth, useUser } from "@clerk/nextjs";
import { requireAdmin } from "@/findUser/admin";

// GET: fetch all projects (filter by category if query provided)
// export async function GET(req) {
//   await connectDB();

//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get("category");

//   const query = category ? { category } : {};
//   const projects = await Project.find(query);

//   return NextResponse.json(projects);
// }


export async function GET(request) {
  await connectDB();

  // Get the search params from the request
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');

  const query = category ? { category } : {};
  
  try {
    const projects = await Project.find(query);
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: add new project
export async function POST(req) {
try {

  // Check admin access first
    const adminCheck = await requireAdmin(req);
    if (adminCheck) return adminCheck;

    await connectDB();

  

  const formData = await req.formData();
  const title = formData.get("title");
  const link = formData.get("link");
  const category = formData.get("category");
  const imageFile = formData.get("image"); // frontend will send file

  if (!imageFile) {
  return NextResponse.json({ success: false, message: "No image uploaded" }, { status: 400 });
}

  // upload to Cloudinary
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadRes = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "portfolio" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

  const project = await Project.create({
    title,
    link,
    category,
    imageUrl: uploadRes.secure_url,
  });

  return NextResponse.json(
  { success: true, message: "Project added successfully!", project },
  { status: 201 }
)
}catch (error) {
  return NextResponse.json({ success: false, message: error.message }, { status: 500 });
}

}
