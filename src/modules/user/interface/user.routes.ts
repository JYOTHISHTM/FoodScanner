import express from "express";
import { updateProfile } from "../interface/user.controller";

const router = express.Router();

router.put("/:id", updateProfile);

export default router;