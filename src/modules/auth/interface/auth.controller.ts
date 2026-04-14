import { Request, Response } from "express";
import { googleLoginService } from "../application/auth.service";
import { sendOtpService, verifyOtpService } from "../application/auth.service";
import { HTTP_STATUS } from "../../../core/constants/httpStatus";
import { MESSAGES } from "../../../core/constants/messages";


export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const data = await googleLoginService(token);

    res.json(data);
  } catch (error:any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  }
};

export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const data = await sendOtpService(email);
    res.json(data);
  } catch (err: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const data = await verifyOtpService(email, otp);
    res.json(data);
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: MESSAGES.AUTH.INVALID_OTP });
  }
};