import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Programming Languages", "Frameworks", "Tools"]
    },
    icon: { type: String, default: "" }
  },
  { timestamps: true, collection: "skills" }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
