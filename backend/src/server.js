import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { ensureAdminAccount } from "./utils/bootstrapAdmin.js";

const startServer = async () => {
  await connectDatabase();
  await ensureAdminAccount();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
