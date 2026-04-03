import express from "express";
import { googleLoginController } from "./auth.controller";

const router = express.Router();

router.post("/google", googleLoginController);

export default router;