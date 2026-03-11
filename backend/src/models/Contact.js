import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" }
  },
  { timestamps: true, collection: "contact" }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
