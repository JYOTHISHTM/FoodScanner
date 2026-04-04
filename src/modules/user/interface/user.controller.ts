import { Request, Response } from "express";
import { UserService } from "../application/user.service";

const service = new UserService();

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;

        const updated = await service.updateProfile(userId, req.body);

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating profile" });
    }
};