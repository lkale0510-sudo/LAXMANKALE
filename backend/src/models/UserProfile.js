import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    profileImage: { type: String, default: "" },
    name: { type: String, required: true, default: "Laxman Kale" },
    title: { type: String, required: true, default: "Java Developer" },
    tagline: { type: String, default: "Building robust backend systems and scalable web apps." },
    resumeUrl: { type: String, default: "" },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" }
    }
  },
  { timestamps: true, collection: "user_profile" }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
