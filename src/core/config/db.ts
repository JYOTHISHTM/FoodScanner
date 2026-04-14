import mongoose from "mongoose";
import { MESSAGES } from "../constants/messages";

export const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI as string
    );

    console.log(
      `${MESSAGES.COMMON.DB_CONNECTED}: ${connect.connection.host}`
    );
  } catch (err) {
    console.error(`${MESSAGES.COMMON.DB_CONNECTION_FAILED}`, err);
    process.exit(1); 
  }
};