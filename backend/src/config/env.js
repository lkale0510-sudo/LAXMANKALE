import dotenv from "dotenv";

dotenv.config();

const requiredVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "ADMIN_SECRET_CODE",
  "FRONTEND_URL"
];

const missingVars = requiredVars.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "production",
  port: Number(process.env.PORT || 5000),
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  frontendAllowlist: process.env.FRONTEND_URL.split(",").map((url) => url.trim()),
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  adminSecretCode: process.env.ADMIN_SECRET_CODE,
  maxFileSize: Number(process.env.MAX_FILE_SIZE_MB || 5) * 1024 * 1024
};
