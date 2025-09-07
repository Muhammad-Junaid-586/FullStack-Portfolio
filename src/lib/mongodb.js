import mongoose from "mongoose";

let isConnected = false; // track connection

export async function connectDB() {
  if (isConnected) return;

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("⚠️ Please define MONGODB_URI in .env.local");
    }

    const db = await mongoose.connect(process.env.MONGODB_URI );

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
  }
}
