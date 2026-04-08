

import Admin from "../domain/admin.model";
import User from "../../user/domain/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const findAdminByEmail = async (email: string) => {
  return Admin.findOne({ email });
};

export const comparePassword = async (enteredPass: string, savedPass: string) => {
  return bcrypt.compare(enteredPass, savedPass);
};

export const generateAdminToken = (adminId: string) => {
  return jwt.sign(
    { id: adminId, role: "admin" },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};

// User Management
export const getAllUsers = async () => {
  return User.find().select("-__v").sort({ createdAt: -1 });
};

export const toggleBlockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.isBlocked = !user.isBlocked;
  user.blockedAt = user.isBlocked ? new Date() : null;
  await user.save();
  return user;
};