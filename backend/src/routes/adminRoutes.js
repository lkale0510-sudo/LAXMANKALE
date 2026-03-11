import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProject,
  createSkill,
  deleteMessage,
  deleteProject,
  deleteSkill,
  getAbout,
  getContact,
  getHero,
  getMessages,
  getOverview,
  getProjects,
  getSkills,
  getSocialLinks,
  replaceSocialLinks,
  updateProject,
  updateSkill,
  upsertAbout,
  upsertContact,
  upsertHero
} from "../controllers/adminController.js";
import { requireAdminAuth } from "../middleware/auth.js";
import { writeLimiter } from "../middleware/rateLimit.js";
import { upload } from "../middleware/upload.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.use(requireAdminAuth);

router.get("/overview", getOverview);

router.get("/hero", getHero);
router.put(
  "/hero",
  writeLimiter,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  [
    body("name").optional().isLength({ min: 2, max: 80 }).trim().escape(),
    body("title").optional().isLength({ min: 2, max: 80 }).trim().escape(),
    body("tagline").optional().isLength({ min: 5, max: 200 }).trim().escape(),
    body("github").optional({ values: "falsy" }).isURL(),
    body("linkedin").optional({ values: "falsy" }).isURL(),
    body("twitter").optional({ values: "falsy" }).isURL(),
    body("instagram").optional({ values: "falsy" }).isURL()
  ],
  validateRequest,
  upsertHero
);

router.get("/about", getAbout);
router.put(
  "/about",
  writeLimiter,
  [
    body("bio").optional().isLength({ min: 10, max: 3000 }).trim().escape(),
    body("experience").optional().isLength({ min: 5, max: 1000 }).trim().escape(),
    body("techStack").optional().isString()
  ],
  validateRequest,
  upsertAbout
);

router.get("/skills", getSkills);
router.post(
  "/skills",
  writeLimiter,
  upload.single("iconFile"),
  [
    body("name").isLength({ min: 1, max: 80 }).trim().escape(),
    body("category").isIn(["Programming Languages", "Frameworks", "Tools"]),
    body("icon").optional({ values: "falsy" }).isURL()
  ],
  validateRequest,
  createSkill
);
router.put(
  "/skills/:id",
  writeLimiter,
  upload.single("iconFile"),
  [
    param("id").isMongoId(),
    body("name").optional().isLength({ min: 1, max: 80 }).trim().escape(),
    body("category").optional().isIn(["Programming Languages", "Frameworks", "Tools"]),
    body("icon").optional({ values: "falsy" }).isURL()
  ],
  validateRequest,
  updateSkill
);
router.delete("/skills/:id", writeLimiter, [param("id").isMongoId()], validateRequest, deleteSkill);

router.get("/projects", getProjects);
router.post(
  "/projects",
  writeLimiter,
  upload.single("imageFile"),
  [
    body("title").isLength({ min: 2, max: 120 }).trim().escape(),
    body("description").isLength({ min: 10, max: 1000 }).trim().escape(),
    body("techStack").optional().isString(),
    body("githubUrl").isURL(),
    body("liveUrl").optional({ values: "falsy" }).isURL(),
    body("image").optional({ values: "falsy" }).isURL()
  ],
  validateRequest,
  createProject
);
router.put(
  "/projects/:id",
  writeLimiter,
  upload.single("imageFile"),
  [
    param("id").isMongoId(),
    body("title").optional().isLength({ min: 2, max: 120 }).trim().escape(),
    body("description").optional().isLength({ min: 10, max: 1000 }).trim().escape(),
    body("techStack").optional().isString(),
    body("githubUrl").optional().isURL(),
    body("liveUrl").optional({ values: "falsy" }).isURL(),
    body("image").optional({ values: "falsy" }).isURL()
  ],
  validateRequest,
  updateProject
);
router.delete(
  "/projects/:id",
  writeLimiter,
  [param("id").isMongoId()],
  validateRequest,
  deleteProject
);

router.get("/contact", getContact);
router.put(
  "/contact",
  writeLimiter,
  [
    body("email").optional().isEmail(),
    body("phone").optional().matches(/^\d{10}$/),
    body("location").optional().isLength({ min: 2, max: 200 }).trim().escape()
  ],
  validateRequest,
  upsertContact
);

router.get("/messages", getMessages);
router.delete(
  "/messages/:id",
  writeLimiter,
  [param("id").isMongoId()],
  validateRequest,
  deleteMessage
);

router.get("/social-links", getSocialLinks);
router.put(
  "/social-links",
  writeLimiter,
  [
    body("socialLinks").isArray(),
    body("socialLinks.*.platform").isLength({ min: 1, max: 50 }).trim().escape(),
    body("socialLinks.*.url").isURL(),
    body("socialLinks.*.icon").optional({ values: "falsy" }).isString()
  ],
  validateRequest,
  replaceSocialLinks
);

export default router;
