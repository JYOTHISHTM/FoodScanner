import express from "express";
import { getProductByBarcodeController } from "./product.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";


const router = express.Router();

router.get("/:productId",authMiddleware, getProductByBarcodeController);

export default router;