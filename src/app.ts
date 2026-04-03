import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

// 🔥 use central routes
app.use("/api", routes);

app.get("/home", (req, res) => {
  res.send("Api is Running");
});

export default app;