import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../infrastructure/auth.repository";
import { findOrCreateUser } from "../infrastructure/auth.repository";

export const googleLoginService = async (token: string) => {
  const payload = await verifyGoogleToken(token);


  if (!payload || !payload.email || !payload.name) {
    throw new Error("Invalid token: Missing profile information");
  }


  const { email, name } = payload;

  const user = await findOrCreateUser(email, name);

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