import { Request, Response } from "express";
import { adminLoginService } from "../application/admin.service";
import {
  getAllUsers,
  toggleBlockUser,
} from "../infrastructure/admin.repository";

import { HTTP_STATUS } from "../../../core/constants/httpStatus";
import { MESSAGES } from "../../../core/constants/messages";

export const adminLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await adminLoginService(email, password);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data,
    });
  } catch (err: any) {
    res.status(err.statusCode || HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: err.message || MESSAGES.AUTH.INVALID_CREDENTIALS,
    });
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsers();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.USER.USERS_FETCHED || "Users fetched successfully",
      data: users,
    });
  } catch (err: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.COMMON.SERVER_ERROR,
    });
  }
};

export const toggleBlockUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const user = await toggleBlockUser(userId as string);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: user.isBlocked
        ? MESSAGES.USER.USER_BLOCKED_SUCCESS
        : MESSAGES.USER.USER_UNBLOCKED_SUCCESS,
      data: user,
    });
  } catch (err: any) {
    res.status(err.statusCode || HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: err.message || MESSAGES.COMMON.SERVER_ERROR,
    });
  }
};