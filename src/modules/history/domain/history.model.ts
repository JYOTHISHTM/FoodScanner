// infra/scan.model.ts
import mongoose from "mongoose";

// domain/history.entity.ts
export interface History {
  userId: string;
  name: string;
  brand?: string;
  image?: string;
  score: number;
  createdAt: Date;
}

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  brand: String,
  image: String,
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

export const HistoryModel = mongoose.model("History", historySchema);