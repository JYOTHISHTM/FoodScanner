import { Request, Response } from "express";
import { getProductByBarcodeService } from "../application/product.service";

import { HTTP_STATUS } from "../../../core/constants/httpStatus";
import { MESSAGES } from "../../../core/constants/messages";

export const getProductByBarcodeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } = req.params as { productId: string };
    const { userId } = req.query as { userId: string };

    const result = await getProductByBarcodeService(productId, userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.PRODUCT.PRODUCT_FETCHED,
      data: result,
    });
  } catch (error: any) {
    console.error("ERROR 👉", error.message);

    // ✅ use statusCode instead of string compare
    if (error.statusCode === HTTP_STATUS.NOT_FOUND) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.PRODUCT.PRODUCT_NOT_FOUND,
      });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.PRODUCT.PRODUCT_FETCH_FAILED,
    });
  }
};