import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAdmin } from "@/findUser/admin";
import cloudinary from "@/lib/cloudinary";


// GET: fetch project by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } =await params;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/projects/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: update project
// export async function PUT(req, { params }) {
//   try {
//     // Check admin access first
//     const adminCheck = await requireAdmin(req);
//     if (adminCheck) return adminCheck;
    
//     await connectDB();
//     const { id } =await params;

//     // Check if the request contains form data
//     const contentType = req.headers.get('content-type');
//     let updateData = {};
//     let newImageUrl = null;

//     if (contentType && contentType.includes('multipart/form-data')) {
//       // Handle form data with file upload
//       const formData = await req.formData();
      
//       updateData = {
//         title: formData.get('title'),
//         category: formData.get('category'),
//         link: formData.get('link'),
//       };

//       const imageFile = formData.get('image');
      
//       // Upload new image if provided
//       if (imageFile && imageFile.name !== 'undefined') {
//         const bytes = await imageFile.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const uploadRes = await new Promise((resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream({ folder: "portfolio" }, (err, result) => {
//               if (err) reject(err);
//               else resolve(result);
//             })
//             .end(buffer);
//         });

//         newImageUrl = uploadRes.secure_url;
//         updateData.imageUrl = newImageUrl;
//       }
//     } else {
//       // Handle JSON data
//       updateData = await req.json();
//     }

//     const updatedProject = await Project.findByIdAndUpdate(
//       id, 
//       updateData, 
//       { new: true, runValidators: true }
//     );
    
//     if (!updatedProject) {
//       return NextResponse.json(
//         { success: false, message: "Project not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: "Updated successfully", 
//       project: updatedProject 
//     });
//   } catch (error) {
//     console.error("Error in PUT /api/projects:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// PUT : update project with simple formData();
export async function PUT(req, { params }) {
  try {
    // Check admin access first
    const adminCheck = await requireAdmin(req);
    if (adminCheck) return adminCheck;
    
    await connectDB();
    const { id } = await params;

    // SIMPLIFIED: Get form data directly
    const formData = await req.formData();
    const title = formData.get("title");
    const link = formData.get("link");
    const category = formData.get("category");
    const imageFile = formData.get("image"); // This will be the file

    let updateData = {
      title,
      category,
      link
    };

    // Handle image upload if a new file was provided
    if (imageFile && imageFile.name !== 'undefined') {
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

      updateData.imageUrl = uploadRes.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Updated successfully", 
      project: updatedProject 
    });
  } catch (error) {
    console.error("Error in PUT /api/projects:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE project
export async function DELETE(req, { params }) {
  try {
    // Check admin access first
    const adminCheck = await requireAdmin(req);
    if (adminCheck) return adminCheck;

    await connectDB();
    
    const { id } =await params;
    console.log(id, "delete");
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const result = await Project.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/projects:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}