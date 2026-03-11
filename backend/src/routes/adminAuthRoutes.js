import { Router } from "express";
import { body } from "express-validator";
import {
  adminLogin,
  getCurrentAdmin,
  updateAdminAccount
} from "../controllers/adminAuthController.js";
import { requireAdminAuth } from "../middleware/auth.js";
import { loginLimiter, writeLimiter } from "../middleware/rateLimit.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/login",
  loginLimiter,
  [
    body("username").isLength({ min: 3, max: 60 }).trim().escape(),
    body("password").isLength({ min: 8, max: 128 }),
    body("secretCode").matches(/^\d{6}$/).withMessage("Secret code must be exactly 6 digits")
  ],
  validateRequest,
  adminLogin
);

router.get("/me", requireAdminAuth, getCurrentAdmin);

router.put(
  "/account",
  requireAdminAuth,
  writeLimiter,
  [
    body("currentPassword").isLength({ min: 8, max: 128 }),
    body("newUsername").optional().isLength({ min: 3, max: 60 }).trim().escape(),
    body("newPassword")
      .optional()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
      .withMessage("Password must be strong")
  ],
  validateRequest,
  updateAdminAccount
);

export default router;
