import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./core/config/db";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

// app.listen(4000, "0.0.0.0", () => {
//   console.log("Server running");
// });