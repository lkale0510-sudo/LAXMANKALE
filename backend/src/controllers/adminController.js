import About from "../models/About.js";
import Contact from "../models/Contact.js";
import Message from "../models/Message.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import SocialLink from "../models/SocialLink.js";
import UserProfile from "../models/UserProfile.js";
import { buildUploadUrl } from "../utils/uploadUrl.js";

const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }
  return String(value)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export const getOverview = async (_req, res, next) => {
  try {
    const [skills, projects, messages] = await Promise.all([
      Skill.countDocuments(),
      Project.countDocuments(),
      Message.countDocuments()
    ]);

    return res.json({
      cards: [
        { title: "Skills", value: skills },
        { title: "Projects", value: projects },
        { title: "Messages", value: messages }
      ]
    });
  } catch (error) {
    return next(error);
  }
};

export const getHero = async (_req, res, next) => {
  try {
    const hero = await UserProfile.findOne().sort({ updatedAt: -1 });
    return res.json({ hero });
  } catch (error) {
    return next(error);
  }
};

export const upsertHero = async (req, res, next) => {
  try {
    let hero = await UserProfile.findOne();
    if (!hero) {
      hero = new UserProfile();
    }

    hero.name = req.body.name || hero.name;
    hero.title = req.body.title || hero.title;
    hero.tagline = req.body.tagline || hero.tagline;

    hero.socialLinks = {
      github: req.body.github ?? hero.socialLinks?.github ?? "",
      linkedin: req.body.linkedin ?? hero.socialLinks?.linkedin ?? "",
      twitter: req.body.twitter ?? hero.socialLinks?.twitter ?? "",
      instagram: req.body.instagram ?? hero.socialLinks?.instagram ?? ""
    };

    if (req.files?.profileImage?.[0]) {
      hero.profileImage = buildUploadUrl(req, req.files.profileImage[0].filename);
    }

    if (req.files?.resume?.[0]) {
      hero.resumeUrl = buildUploadUrl(req, req.files.resume[0].filename);
    }

    await hero.save();

    return res.json({ message: "Hero updated", hero });
  } catch (error) {
    return next(error);
  }
};

export const getAbout = async (_req, res, next) => {
  try {
    const about = await About.findOne().sort({ updatedAt: -1 });
    return res.json({ about });
  } catch (error) {
    return next(error);
  }
};

export const upsertAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    about.bio = req.body.bio ?? about.bio;
    about.experience = req.body.experience ?? about.experience;
    about.techStack = parseList(req.body.techStack);

    await about.save();
    return res.json({ message: "About updated", about });
  } catch (error) {
    return next(error);
  }
};

export const getSkills = async (_req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, createdAt: 1 });
    return res.json({ skills });
  } catch (error) {
    return next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const iconFile = req.file ? buildUploadUrl(req, req.file.filename) : "";

    const skill = await Skill.create({
      name: req.body.name,
      category: req.body.category,
      icon: iconFile || req.body.icon || ""
    });

    return res.status(201).json({ message: "Skill created", skill });
  } catch (error) {
    return next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.name = req.body.name ?? skill.name;
    skill.category = req.body.category ?? skill.category;

    if (req.file) {
      skill.icon = buildUploadUrl(req, req.file.filename);
    } else if (req.body.icon !== undefined) {
      skill.icon = req.body.icon;
    }

    await skill.save();
    return res.json({ message: "Skill updated", skill });
  } catch (error) {
    return next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.json({ message: "Skill deleted" });
  } catch (error) {
    return next(error);
  }
};

export const getProjects = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.json({ projects });
  } catch (error) {
    return next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const imageUrl = req.file ? buildUploadUrl(req, req.file.filename) : "";

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      image: imageUrl || req.body.image || "",
      techStack: parseList(req.body.techStack),
      githubUrl: req.body.githubUrl,
      liveUrl: req.body.liveUrl || ""
    });

    return res.status(201).json({ message: "Project created", project });
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = req.body.title ?? project.title;
    project.description = req.body.description ?? project.description;
    project.techStack = req.body.techStack ? parseList(req.body.techStack) : project.techStack;
    project.githubUrl = req.body.githubUrl ?? project.githubUrl;
    project.liveUrl = req.body.liveUrl ?? project.liveUrl;

    if (req.file) {
      project.image = buildUploadUrl(req, req.file.filename);
    } else if (req.body.image !== undefined) {
      project.image = req.body.image;
    }

    await project.save();
    return res.json({ message: "Project updated", project });
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json({ message: "Project deleted" });
  } catch (error) {
    return next(error);
  }
};

export const getContact = async (_req, res, next) => {
  try {
    const contact = await Contact.findOne().sort({ updatedAt: -1 });
    return res.json({ contact });
  } catch (error) {
    return next(error);
  }
};

export const upsertContact = async (req, res, next) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact();
    }

    const phone = req.body.phone ? req.body.phone.replace(/\D/g, "").slice(0, 10) : contact.phone;

    contact.email = req.body.email ?? contact.email;
    contact.phone = phone;
    contact.location = req.body.location ?? contact.location;

    await contact.save();
    return res.json({ message: "Contact updated", contact });
  } catch (error) {
    return next(error);
  }
};

export const getMessages = async (_req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json({ messages });
  } catch (error) {
    return next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.json({ message: "Message deleted" });
  } catch (error) {
    return next(error);
  }
};

export const getSocialLinks = async (_req, res, next) => {
  try {
    const socialLinks = await SocialLink.find().sort({ createdAt: 1 });
    return res.json({ socialLinks });
  } catch (error) {
    return next(error);
  }
};

export const replaceSocialLinks = async (req, res, next) => {
  try {
    const incoming = Array.isArray(req.body.socialLinks) ? req.body.socialLinks : [];

    await SocialLink.deleteMany({});

    const sanitized = incoming
      .map((entry) => ({
        platform: String(entry.platform || "").trim(),
        url: String(entry.url || "").trim(),
        icon: String(entry.icon || "").trim()
      }))
      .filter((entry) => entry.platform && entry.url);

    const socialLinks = sanitized.length ? await SocialLink.insertMany(sanitized) : [];
    return res.json({ message: "Social links updated", socialLinks });
  } catch (error) {
    return next(error);
  }
};
