import { Router } from "express";
import { body } from "express-validator";
import { getPortfolio, submitMessage } from "../controllers/publicController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { writeLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.get("/portfolio", getPortfolio);

router.post(
  "/messages",
  writeLimiter,
  [
    body("name").isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 chars").trim().escape(),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("phone")
      .matches(/^\d{10}$/)
      .withMessage("Phone must be exactly 10 digits"),
    body("subject").isLength({ min: 2, max: 120 }).withMessage("Subject must be 2-120 chars").trim().escape(),
    body("message").isLength({ min: 5, max: 2000 }).withMessage("Message must be 5-2000 chars").trim().escape()
  ],
  validateRequest,
  submitMessage
);

export default router;
