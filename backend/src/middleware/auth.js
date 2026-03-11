import { verifyAdminToken } from "../utils/token.js";

export const requireAdminAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.substring(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  try {
    const decoded = verifyAdminToken(token);
    req.admin = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};
