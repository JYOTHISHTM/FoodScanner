

import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "Admin" },
  role: { type: String, default: "admin" },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);