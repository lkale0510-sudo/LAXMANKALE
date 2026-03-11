import About from "../models/About.js";
import Contact from "../models/Contact.js";
import Message from "../models/Message.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import SocialLink from "../models/SocialLink.js";
import UserProfile from "../models/UserProfile.js";

export const getPortfolio = async (_req, res, next) => {
  try {
    const [hero, about, skills, projects, contact, socialLinks] = await Promise.all([
      UserProfile.findOne().sort({ updatedAt: -1 }),
      About.findOne().sort({ updatedAt: -1 }),
      Skill.find().sort({ category: 1, createdAt: 1 }),
      Project.find().sort({ createdAt: -1 }),
      Contact.findOne().sort({ updatedAt: -1 }),
      SocialLink.find().sort({ createdAt: 1 })
    ]);

    return res.json({
      hero,
      about,
      skills,
      projects,
      contact,
      socialLinks
    });
  } catch (error) {
    return next(error);
  }
};

export const submitMessage = async (req, res, next) => {
  try {
    const cleanPhone = (req.body.phone || "").replace(/\D/g, "").slice(0, 10);

    const message = await Message.create({
      name: req.body.name,
      email: req.body.email,
      phone: cleanPhone,
      subject: req.body.subject,
      message: req.body.message
    });

    return res.status(201).json({ message: "Message submitted successfully", data: message });
  } catch (error) {
    return next(error);
  }
};
