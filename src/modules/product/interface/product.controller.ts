import { Request, Response } from "express";
import { getProductByBarcodeService } from "../application/product.service";

export const getProductByBarcodeController = async (
    req: Request,
    res: Response
) => {
    try {
        const { productId } = req.params as { productId: string };
        const { userId } = req.query as { userId: string };

        const result = await getProductByBarcodeService(productId, userId);

        res.json(result);
    } catch (error: any) {
        console.error("ERROR 👉", error.message);

        if (error.message === "Product not found") {
            return res.status(404).json({ message: "Product not found in OpenFoodFacts" });
        }

        res.status(500).json({ message: "Error fetching product" });
    }
};