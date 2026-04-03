import { OAuth2Client } from "google-auth-library";
import User from "../../user/domain/user.model";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🔹 verify google token
export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return ticket.getPayload();
};

// 🔹 find or create user
export const findOrCreateUser = async (email: string, name: string) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ name, email });
  }

  return user;
};