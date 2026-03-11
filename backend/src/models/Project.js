import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    techStack: [{ type: String, trim: true }],
    githubUrl: { type: String, required: true, trim: true },
    liveUrl: { type: String, default: "", trim: true }
  },
  { timestamps: true, collection: "projects" }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
