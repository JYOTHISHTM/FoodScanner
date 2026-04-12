

import { Request, Response } from "express";
import { adminLoginService } from "../application/admin.service";
import { getAllUsers, toggleBlockUser } from "../infrastructure/admin.repository";

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await adminLoginService(email, password);

    res.json(data);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const toggleBlockUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await toggleBlockUser(userId as string);
    res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`, user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};