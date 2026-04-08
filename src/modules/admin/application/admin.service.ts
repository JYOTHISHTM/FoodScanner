


import { findAdminByEmail, comparePassword, generateAdminToken } from "../infrastructure/admin.repository";

export const adminLoginService = async (email: string, password: string) => {
  const admin = await findAdminByEmail(email);
  
  if (!admin) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, admin.password);
  
  if (!isMatch) throw new Error("Invalid credentials");

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