import bcrypt from "bcryptjs";
import AdminAccount from "../models/AdminAccount.js";
import { env } from "../config/env.js";
import { isStrongPassword } from "./password.js";

export const ensureAdminAccount = async () => {
  const existing = await AdminAccount.findOne({ username: env.adminUsername.toLowerCase() });
  if (existing) {
    return;
  }

  if (!isStrongPassword(env.adminPassword)) {
    throw new Error("ADMIN_PASSWORD does not meet strong password rules.");
  }

  if (!/^\d{6}$/.test(env.adminSecretCode)) {
    throw new Error("ADMIN_SECRET_CODE must be exactly 6 digits.");
  }

  const [passwordHash, secretCodeHash] = await Promise.all([
    bcrypt.hash(env.adminPassword, 12),
    bcrypt.hash(env.adminSecretCode, 12)
  ]);

  await AdminAccount.create({
    username: env.adminUsername.toLowerCase(),
    passwordHash,
    secretCodeHash
  });
};
