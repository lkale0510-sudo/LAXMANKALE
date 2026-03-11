import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String, default: "" }
  },
  { timestamps: true, collection: "social_links" }
);

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

export default SocialLink;
