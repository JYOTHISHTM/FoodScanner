// routes/scanRoutes.ts
import express from "express";
import { getHistory } from "./history.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";



const router = express.Router();

router.get("/",authMiddleware, getHistory);

export default router;