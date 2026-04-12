// modules/scan/interface/scan.routes.ts
import express from "express";
import { scanProduct } from "./scan.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";


const router = express.Router();

router.post("/",authMiddleware, scanProduct);

export default router;  