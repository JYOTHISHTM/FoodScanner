
import express from "express";
import {getProductByBarcode } from "../controllers/authController";

const router = express.Router();

router.get("/:barcode", getProductByBarcode);


export default router;