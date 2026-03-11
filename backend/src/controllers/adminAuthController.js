import bcrypt from "bcryptjs";
import AdminAccount from "../models/AdminAccount.js";
import { isStrongPassword } from "../utils/password.js";
import { signAdminToken } from "../utils/token.js";

export const adminLogin = async (req, res, next) => {
  try {
    const username = req.body.username?.toLowerCase();
    const { password, secretCode } = req.body;

    const admin = await AdminAccount.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const [validPassword, validSecret] = await Promise.all([
      bcrypt.compare(password, admin.passwordHash),
      bcrypt.compare(secretCode, admin.secretCodeHash)
    ]);

    if (!validPassword || !validSecret) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signAdminToken({ id: admin._id.toString(), username: admin.username });

    return res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    return next(error);
  }
};

export const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await AdminAccount.findById(req.admin.id).select("_id username createdAt updatedAt");
    if (!admin) {
      return res.status(404).json({ message: "Admin account not found" });
    }
    return res.json({ admin });
  } catch (error) {
    return next(error);
  }
};

export const updateAdminAccount = async (req, res, next) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;

    const admin = await AdminAccount.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin account not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    if (newUsername && newUsername.toLowerCase() !== admin.username) {
      const existing = await AdminAccount.findOne({ username: newUsername.toLowerCase() });
      if (existing) {
        return res.status(409).json({ message: "Username already in use" });
      }
      admin.username = newUsername.toLowerCase();
    }

    if (newPassword) {
      if (!isStrongPassword(newPassword)) {
        return res.status(400).json({
          message:
            "Password must be 8+ chars and include uppercase, lowercase, number, and special character."
        });
      }
      admin.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    await admin.save();

    return res.json({
      message: "Account updated successfully",
      admin: { id: admin._id, username: admin.username }
    });
  } catch (error) {
    return next(error);
  }
};
