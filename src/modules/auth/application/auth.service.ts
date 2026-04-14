import jwt from "jsonwebtoken";
import {
  verifyGoogleToken,
  findOrCreateUser,
  generateOtp,
  saveOtp,
  verifyOtp,
  sendEmail,
} from "../infrastructure/auth.repository";

import User from "../../user/domain/user.model";

import { MESSAGES } from "../../../core/constants/messages";
import { HTTP_STATUS } from "../../../core/constants/httpStatus";

// ---------------- GOOGLE LOGIN ----------------

export const googleLoginService = async (token: string) => {
  const payload = await verifyGoogleToken(token);

  if (!payload || !payload.email || !payload.name) {
    const error: any = new Error(MESSAGES.AUTH.INVALID_TOKEN);
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  const { email, name } = payload;

  const user = await findOrCreateUser(email, name);

  if (user.isBlocked) {
    const error: any = new Error(MESSAGES.USER.USER_BLOCKED);
    error.statusCode = HTTP_STATUS.FORBIDDEN;
    throw error;
  }

  const jwtToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    token: jwtToken,
    user,
  };
};

// ---------------- SEND OTP ----------------

export const sendOtpService = async (email: string) => {
  const user = await User.findOne({ email });

  if (user && user.isBlocked) {
    const error: any = new Error(MESSAGES.USER.USER_BLOCKED);
    error.statusCode = HTTP_STATUS.FORBIDDEN;
    throw error;
  }

  const otp = generateOtp();

  await saveOtp(email, otp);
  await sendEmail(email, otp);

  return {
    message: MESSAGES.AUTH.OTP_SENT,
  };
};

// ---------------- VERIFY OTP ----------------

export const verifyOtpService = async (email: string, otp: string) => {
  const isValid = await verifyOtp(email, otp);

  if (!isValid) {
    const error: any = new Error(MESSAGES.AUTH.INVALID_OTP);
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      name: email.split("@")[0],
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};