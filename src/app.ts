import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();
dotenv.config();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api", routes);

app.get("/home", (req, res) => {
  res.send("Api is Running");
});

export default app;

