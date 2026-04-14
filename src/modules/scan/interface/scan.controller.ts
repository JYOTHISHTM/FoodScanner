import { Request, Response } from "express";
import { ScanService } from "../application/scan.service";

import { HTTP_STATUS } from "../../../core/constants/httpStatus";
import { MESSAGES } from "../../../core/constants/messages";

const service = new ScanService();

export const scanProduct = async (req: Request, res: Response) => {
  try {
    const { barcode, userId } = req.body;

    if (!barcode) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.SCAN.BARCODE_REQUIRED,
      });
    }

    const result = await service.scan(barcode, userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.SCAN.SCAN_SUCCESS,
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || MESSAGES.SCAN.SCAN_FAILED,
    });
  }
};