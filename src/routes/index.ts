import { Router } from "express";

import authRoutes from "../modules/auth/interface/auth.routes";
import productRoutes from "../modules/product/interface/product.routes";
import userProfile from "../modules/user/interface/user.routes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/profile",userProfile)

export default router;