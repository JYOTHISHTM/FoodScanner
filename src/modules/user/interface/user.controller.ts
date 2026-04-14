import { Request, Response } from "express";
import { UserService } from "../application/user.service";

import { HTTP_STATUS } from "../../../core/constants/httpStatus";
import { MESSAGES } from "../../../core/constants/messages";

const service = new UserService();

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;

    const updated = await service.updateProfile(userId, req.body);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.PROFILE_UPDATED,
      data: updated,
    });
  } catch (err: any) {
    res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || MESSAGES.USER.PROFILE_UPDATE_FAILED,
    });
  }
};