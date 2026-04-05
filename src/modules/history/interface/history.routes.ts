// routes/scanRoutes.ts
import express from "express";
import { getHistory } from "./history.controller";

const router = express.Router();

router.get("/", getHistory);

export default router;