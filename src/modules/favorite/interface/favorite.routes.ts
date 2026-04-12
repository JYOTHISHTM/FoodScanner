import express from "express";
import { toggleFavorite, getFavorites, checkFavorite } from "./favorite.controller";
import { authMiddleware } from "../../../core/middlewares/auth.middleware";


const router = express.Router();

router.post("/",authMiddleware, toggleFavorite);
router.get("/",authMiddleware, getFavorites);
router.get("/check",authMiddleware, checkFavorite);

export default router;