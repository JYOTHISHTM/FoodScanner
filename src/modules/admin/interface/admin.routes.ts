

import express from "express";
import { adminLoginController, getAllUsersController, toggleBlockUserController } from "./admin.controller";

const router = express.Router();



router.post("/login", adminLoginController);
router.get("/users", getAllUsersController);
router.patch("/users/:userId/block", toggleBlockUserController);

export default router;