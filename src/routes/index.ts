import { Router } from "express";

import authRoutes from "../modules/auth/interface/auth.routes";
import productRoutes from "../modules/product/interface/product.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;