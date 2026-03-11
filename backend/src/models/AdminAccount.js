import mongoose from "mongoose";

const adminAccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    secretCodeHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true, collection: "admin_account" }
);

const AdminAccount = mongoose.model("AdminAccount", adminAccountSchema);

export default AdminAccount;
