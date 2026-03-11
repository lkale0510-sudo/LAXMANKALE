import { connectDatabase } from "../src/config/db.js";
import About from "../src/models/About.js";
import Contact from "../src/models/Contact.js";
import Project from "../src/models/Project.js";
import Skill from "../src/models/Skill.js";
import SocialLink from "../src/models/SocialLink.js";
import UserProfile from "../src/models/UserProfile.js";
import { ensureAdminAccount } from "../src/utils/bootstrapAdmin.js";

const seed = async () => {
  await connectDatabase();
  await ensureAdminAccount();

  await UserProfile.deleteMany({});
  await About.deleteMany({});
  await Skill.deleteMany({});
  await Project.deleteMany({});
  await Contact.deleteMany({});
  await SocialLink.deleteMany({});

  const hero = await UserProfile.create({
    name: "Laxman Kale",
    title: "Java Developer",
    tagline: "I design clean APIs and resilient backend systems with Java and modern web stacks.",
    profileImage: "",
    resumeUrl: "",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      twitter: "",
      instagram: ""
    }
  });

  const about = await About.create({
    bio: "Java Developer focused on building high-performance backend services, secure APIs, and modern full-stack applications.",
    experience: "Hands-on experience with enterprise Java, REST APIs, and production deployments.",
    techStack: ["Java", "Spring Boot", "Node.js", "React", "MongoDB", "Docker"]
  });

  const skills = await Skill.insertMany([
    {
      name: "Java",
      category: "Programming Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },
    {
      name: "C++",
      category: "Programming Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
    },
    {
      name: "C",
      category: "Programming Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
    },
    {
      name: "Spring Boot",
      category: "Frameworks",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    },
    {
      name: "React",
      category: "Frameworks",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      name: "Git",
      category: "Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
      name: "Docker",
      category: "Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    }
  ]);

  const projects = await Project.insertMany([
    {
      title: "Inventory Service",
      description: "A Java and Spring Boot microservice for inventory tracking with robust REST APIs.",
      image: "",
      techStack: ["Java", "Spring Boot", "MongoDB"],
      githubUrl: "https://github.com/",
      liveUrl: ""
    },
    {
      title: "Portfolio Admin Suite",
      description: "Admin dashboard for managing hero, projects, skills, and inbound messages.",
      image: "",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/",
      liveUrl: ""
    }
  ]);

  const contact = await Contact.create({
    email: "laxman@example.com",
    phone: "9876543210",
    location: "India"
  });

  const socialLinks = await SocialLink.insertMany([
    { platform: "GitHub", url: "https://github.com/", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" }
  ]);

  console.log("Seed complete");
  console.log({ hero: hero._id, about: about._id, skills: skills.length, projects: projects.length, contact: contact._id, socialLinks: socialLinks.length });

  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
