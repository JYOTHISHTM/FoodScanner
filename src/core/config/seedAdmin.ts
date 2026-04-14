import Admin from "../../modules/admin/domain/admin.model";
import bcrypt from "bcrypt";
import { MESSAGES } from "../constants/messages";

export const seedAdmin = async (): Promise<void> => {
  try {
    const existing = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existing) {
      console.log(`✅ ${MESSAGES.ADMIN.ADMIN_EXISTS}`);
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

    console.log(`✅ ${MESSAGES.ADMIN.ADMIN_CREATED}`);
  } catch (err) {
    console.error(`❌ ${MESSAGES.ADMIN.ADMIN_SEED_FAILED}`, err);
  }
};