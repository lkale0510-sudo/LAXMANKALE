import multer from "multer";
import path from "path";
import fs from "fs";
import { env } from "../config/env.js";

const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  }
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf"
];

const fileFilter = (_req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(new Error("Unsupported file type"));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxFileSize
  }
});
