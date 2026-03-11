import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAdminToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

export const verifyAdminToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};
