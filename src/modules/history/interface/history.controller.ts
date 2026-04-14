// interface/scan.controller.ts
import { Request, Response } from "express";
import { HistoryService } from "../application/history.service";
import { HTTP_STATUS } from "../../../core/constants/httpStatus";


const service = new HistoryService();

export const getHistory = async (req: Request, res: Response) => {
  try {
     const { userId } = req.query as { userId: string };
    const result = await service.getHistory(userId, req.query);
    res.json(result);
  } catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Error fetching scans" });
  }
};