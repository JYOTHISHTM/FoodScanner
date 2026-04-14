import {
  findAdminByEmail,
  comparePassword,
  generateAdminToken,
} from "../infrastructure/admin.repository";

import { MESSAGES } from "../../../core/constants/messages";
import { HTTP_STATUS } from "../../../core/constants/httpStatus";

export const adminLoginService = async (
  email: string,
  password: string
) => {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    const error: any = new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  const isMatch = await comparePassword(password, admin.password);

  if (!isMatch) {
    const error: any = new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  const token = generateAdminToken(admin._id.toString());

  return {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};