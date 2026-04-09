

// src/core/config/seedAdmin.ts

import Admin from "../../modules/admin/domain/admin.model";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existing) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD as string,
      10
    );

    await Admin.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created from .env");
  } catch (err) {
    console.log("❌ Admin seeding failed", err);
  }
};