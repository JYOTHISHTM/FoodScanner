import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../../modules/user/domain/user.model";

import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.AUTH.UNAUTHORIZED,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: MESSAGES.USER.USER_NOT_FOUND,
      });
    }

    if (user.isBlocked) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: MESSAGES.USER.USER_BLOCKED,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: MESSAGES.AUTH.INVALID_TOKEN,
    });
  }
};