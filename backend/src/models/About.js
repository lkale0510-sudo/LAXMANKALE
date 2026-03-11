import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true, default: "" },
    experience: { type: String, default: "" },
    techStack: [{ type: String, trim: true }]
  },
  { timestamps: true, collection: "about" }
);

const About = mongoose.model("About", aboutSchema);

export default About;
