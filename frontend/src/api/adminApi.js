import { adminApi } from "./client";

export const loginAdmin = async (credentials) => {
  const { data } = await adminApi.post("/admin/auth/login", credentials);
  return data;
};

export const getOverview = async () => (await adminApi.get("/admin/overview")).data;
export const getHero = async () => (await adminApi.get("/admin/hero")).data;
export const saveHero = async (formData) => (await adminApi.put("/admin/hero", formData)).data;

export const getAbout = async () => (await adminApi.get("/admin/about")).data;
export const saveAbout = async (payload) => (await adminApi.put("/admin/about", payload)).data;

export const getSkills = async () => (await adminApi.get("/admin/skills")).data;
export const addSkill = async (formData) => (await adminApi.post("/admin/skills", formData)).data;
export const editSkill = async (id, formData) => (await adminApi.put(`/admin/skills/${id}`, formData)).data;
export const removeSkill = async (id) => (await adminApi.delete(`/admin/skills/${id}`)).data;

export const getProjects = async () => (await adminApi.get("/admin/projects")).data;
export const addProject = async (formData) => (await adminApi.post("/admin/projects", formData)).data;
export const editProject = async (id, formData) =>
  (await adminApi.put(`/admin/projects/${id}`, formData)).data;
export const removeProject = async (id) => (await adminApi.delete(`/admin/projects/${id}`)).data;

export const getContact = async () => (await adminApi.get("/admin/contact")).data;
export const saveContact = async (payload) => (await adminApi.put("/admin/contact", payload)).data;

export const getMessages = async () => (await adminApi.get("/admin/messages")).data;
export const removeMessage = async (id) => (await adminApi.delete(`/admin/messages/${id}`)).data;

export const getSocialLinks = async () => (await adminApi.get("/admin/social-links")).data;
export const saveSocialLinks = async (payload) =>
  (await adminApi.put("/admin/social-links", payload)).data;

export const updateAccount = async (payload) => (await adminApi.put("/admin/auth/account", payload)).data;
