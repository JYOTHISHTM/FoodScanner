import { Request, Response } from "express";
import { googleLoginService } from "../application/auth.service";

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const data = await googleLoginService(token);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Google login failed" });
  }
};