import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true }, // for filtering (e.g., "E-commerce", "Portfolio")
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
