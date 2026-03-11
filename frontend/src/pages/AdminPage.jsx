import { useEffect, useMemo, useState } from "react";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import {
  addProject,
  addSkill,
  editProject,
  editSkill,
  getAbout,
  getContact,
  getHero,
  getMessages,
  getOverview,
  getProjects,
  getSkills,
  getSocialLinks,
  loginAdmin,
  removeMessage,
  removeProject,
  removeSkill,
  saveAbout,
  saveContact,
  saveHero,
  saveSocialLinks,
  updateAccount
} from "../api/adminApi";
import AdminLogin from "../components/admin/AdminLogin";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useTheme } from "../context/ThemeContext";

const heroInitial = {
  name: "",
  title: "",
  tagline: "",
  github: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  profileImageFile: null,
  resumeFile: null
};

const aboutInitial = {
  bio: "",
  experience: "",
  techStack: ""
};

const skillInitial = {
  id: "",
  name: "",
  category: "Programming Languages",
  icon: "",
  iconFile: null
};

const projectInitial = {
  id: "",
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  image: "",
  imageFile: null
};

const contactInitial = {
  email: "",
  phone: "",
  location: ""
};

const accountInitial = {
  currentPassword: "",
  newUsername: "",
  newPassword: ""
};

function AdminPage() {
  const { theme, toggleTheme } = useTheme();
  const [token, setToken] = useState(() => sessionStorage.getItem("lk_admin_token") || "");
  const [activeSection, setActiveSection] = useState("Overview");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [overviewCards, setOverviewCards] = useState([]);
  const [heroForm, setHeroForm] = useState(heroInitial);
  const [aboutForm, setAboutForm] = useState(aboutInitial);
  const [skillForm, setSkillForm] = useState(skillInitial);
  const [skills, setSkills] = useState([]);
  const [projectForm, setProjectForm] = useState(projectInitial);
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState(contactInitial);
  const [messages, setMessages] = useState([]);
  const [socialRows, setSocialRows] = useState([{ platform: "", url: "", icon: "" }]);
  const [accountForm, setAccountForm] = useState(accountInitial);
  const [showPasswords, setShowPasswords] = useState({ current: false, next: false });

  const notify = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3500);
  };

  const handleLogin = async (credentials) => {
    const response = await loginAdmin(credentials);
    sessionStorage.setItem("lk_admin_token", response.token);
    sessionStorage.setItem("lk_admin_user", response.admin.username);
    setToken(response.token);
    setActiveSection("Overview");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("lk_admin_token");
    sessionStorage.removeItem("lk_admin_user");
    setToken("");
  };

  const loadSection = async (sectionName) => {
    if (!token) return;

    setLoading(true);

    try {
      if (sectionName === "Overview") {
        const data = await getOverview();
        setOverviewCards(data.cards || []);
      }

      if (sectionName === "Hero") {
        const data = await getHero();
        setHeroForm({
          name: data.hero?.name || "",
          title: data.hero?.title || "",
          tagline: data.hero?.tagline || "",
          github: data.hero?.socialLinks?.github || "",
          linkedin: data.hero?.socialLinks?.linkedin || "",
          twitter: data.hero?.socialLinks?.twitter || "",
          instagram: data.hero?.socialLinks?.instagram || "",
          profileImageFile: null,
          resumeFile: null
        });
      }

      if (sectionName === "About") {
        const data = await getAbout();
        setAboutForm({
          bio: data.about?.bio || "",
          experience: data.about?.experience || "",
          techStack: (data.about?.techStack || []).join(", ")
        });
      }

      if (sectionName === "Skills") {
        const data = await getSkills();
        setSkills(data.skills || []);
      }

      if (sectionName === "Projects") {
        const data = await getProjects();
        setProjects(data.projects || []);
      }

      if (sectionName === "Contact") {
        const data = await getContact();
        setContactForm({
          email: data.contact?.email || "",
          phone: data.contact?.phone || "",
          location: data.contact?.location || ""
        });
      }

      if (sectionName === "Message") {
        const data = await getMessages();
        setMessages(data.messages || []);
      }

      if (sectionName === "Social links") {
        const data = await getSocialLinks();
        setSocialRows(
          data.socialLinks && data.socialLinks.length > 0
            ? data.socialLinks.map((link) => ({
                platform: link.platform || "",
                url: link.url || "",
                icon: link.icon || ""
              }))
            : [{ platform: "", url: "", icon: "" }]
        );
      }
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to load section data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadSection(activeSection);
    }
  }, [token, activeSection]);

  const onHeroChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "profileImageFile" || name === "resumeFile") {
      setHeroForm((prev) => ({ ...prev, [name]: files?.[0] || null }));
      return;
    }
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveHeroSection = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("name", heroForm.name);
    fd.append("title", heroForm.title);
    fd.append("tagline", heroForm.tagline);
    fd.append("github", heroForm.github);
    fd.append("linkedin", heroForm.linkedin);
    fd.append("twitter", heroForm.twitter);
    fd.append("instagram", heroForm.instagram);
    if (heroForm.profileImageFile) fd.append("profileImage", heroForm.profileImageFile);
    if (heroForm.resumeFile) fd.append("resume", heroForm.resumeFile);

    try {
      await saveHero(fd);
      notify("success", "Hero section updated.");
      loadSection("Hero");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to save hero section");
    }
  };

  const saveAboutSection = async (event) => {
    event.preventDefault();

    try {
      await saveAbout(aboutForm);
      notify("success", "About section updated.");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to save about section");
    }
  };

  const onSkillChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "iconFile") {
      setSkillForm((prev) => ({ ...prev, iconFile: files?.[0] || null }));
      return;
    }
    setSkillForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitSkill = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("name", skillForm.name);
    fd.append("category", skillForm.category);
    fd.append("icon", skillForm.icon);
    if (skillForm.iconFile) fd.append("iconFile", skillForm.iconFile);

    try {
      if (skillForm.id) {
        await editSkill(skillForm.id, fd);
        notify("success", "Skill updated.");
      } else {
        await addSkill(fd);
        notify("success", "Skill added.");
      }
      setSkillForm(skillInitial);
      loadSection("Skills");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to save skill");
    }
  };

  const startEditSkill = (skill) => {
    setSkillForm({
      id: skill._id,
      name: skill.name,
      category: skill.category,
      icon: skill.icon || "",
      iconFile: null
    });
  };

  const deleteSkillItem = async (id) => {
    try {
      await removeSkill(id);
      notify("success", "Skill deleted.");
      loadSection("Skills");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to delete skill");
    }
  };

  const onProjectChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "imageFile") {
      setProjectForm((prev) => ({ ...prev, imageFile: files?.[0] || null }));
      return;
    }
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitProject = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("title", projectForm.title);
    fd.append("description", projectForm.description);
    fd.append("techStack", projectForm.techStack);
    fd.append("githubUrl", projectForm.githubUrl);
    fd.append("liveUrl", projectForm.liveUrl);
    fd.append("image", projectForm.image);
    if (projectForm.imageFile) fd.append("imageFile", projectForm.imageFile);

    try {
      if (projectForm.id) {
        await editProject(projectForm.id, fd);
        notify("success", "Project updated.");
      } else {
        await addProject(fd);
        notify("success", "Project created.");
      }
      setProjectForm(projectInitial);
      loadSection("Projects");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to save project");
    }
  };

  const startEditProject = (project) => {
    setProjectForm({
      id: project._id,
      title: project.title,
      description: project.description,
      techStack: (project.techStack || []).join(", "),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl || "",
      image: project.image || "",
      imageFile: null
    });
  };

  const deleteProjectItem = async (id) => {
    try {
      await removeProject(id);
      notify("success", "Project deleted.");
      loadSection("Projects");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to delete project");
    }
  };

  const onContactChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      setContactForm((prev) => ({ ...prev, phone: value.replace(/\D/g, "").slice(0, 10) }));
      return;
    }
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    try {
      await saveContact(contactForm);
      notify("success", "Contact details updated.");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to update contact");
    }
  };

  const deleteMessageItem = async (id) => {
    try {
      await removeMessage(id);
      notify("success", "Message deleted.");
      loadSection("Message");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to delete message");
    }
  };

  const updateSocialRow = (index, name, value) => {
    setSocialRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [name]: value } : row))
    );
  };

  const addSocialRow = () => {
    setSocialRows((prev) => [...prev, { platform: "", url: "", icon: "" }]);
  };

  const removeSocialRowAt = (index) => {
    setSocialRows((prev) => prev.filter((_, i) => i !== index));
  };

  const submitSocial = async (event) => {
    event.preventDefault();

    try {
      await saveSocialLinks({ socialLinks: socialRows });
      notify("success", "Social links saved.");
      loadSection("Social links");
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to save social links");
    }
  };

  const onAccountChange = (event) => {
    const { name, value } = event.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitAccount = async (event) => {
    event.preventDefault();

    try {
      await updateAccount(accountForm);
      notify("success", "Account updated. Use new credentials next login.");
      setAccountForm(accountInitial);
    } catch (error) {
      notify("error", error.response?.data?.message || "Failed to update account");
    }
  };

  const panel = useMemo(() => {
    if (activeSection === "Overview") {
      return (
        <div className="admin-panel">
          <h2>Overview</h2>
          <div className="overview-grid">
            {overviewCards.map((card) => (
              <article key={card.title} className="overview-card">
                <h3>{card.title}</h3>
                <p>{card.value}</p>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "Hero") {
      return (
        <form className="admin-panel form-grid" onSubmit={saveHeroSection}>
          <h2>Hero</h2>
          <input name="name" value={heroForm.name} onChange={onHeroChange} placeholder="Name" required />
          <input name="title" value={heroForm.title} onChange={onHeroChange} placeholder="Title" required />
          <textarea name="tagline" value={heroForm.tagline} onChange={onHeroChange} rows={3} placeholder="Tagline" required />
          <input name="github" value={heroForm.github} onChange={onHeroChange} placeholder="GitHub URL" />
          <input name="linkedin" value={heroForm.linkedin} onChange={onHeroChange} placeholder="LinkedIn URL" />
          <input name="twitter" value={heroForm.twitter} onChange={onHeroChange} placeholder="Twitter URL" />
          <input name="instagram" value={heroForm.instagram} onChange={onHeroChange} placeholder="Instagram URL" />
          <label>Profile image<input type="file" name="profileImageFile" accept="image/*" onChange={onHeroChange} /></label>
          <label>Resume PDF<input type="file" name="resumeFile" accept="application/pdf" onChange={onHeroChange} /></label>
          <button className="btn primary" type="submit">Save Hero</button>
        </form>
      );
    }

    if (activeSection === "About") {
      return (
        <form className="admin-panel form-grid" onSubmit={saveAboutSection}>
          <h2>About</h2>
          <textarea name="bio" value={aboutForm.bio} onChange={(e) => setAboutForm((p) => ({ ...p, bio: e.target.value }))} rows={5} placeholder="Bio" required />
          <textarea name="experience" value={aboutForm.experience} onChange={(e) => setAboutForm((p) => ({ ...p, experience: e.target.value }))} rows={4} placeholder="Experience" required />
          <input name="techStack" value={aboutForm.techStack} onChange={(e) => setAboutForm((p) => ({ ...p, techStack: e.target.value }))} placeholder="Tech stack (comma separated)" required />
          <button className="btn primary" type="submit">Save About</button>
        </form>
      );
    }

    if (activeSection === "Skills") {
      return (
        <div className="admin-panel">
          <h2>Skills</h2>
          <form className="form-grid" onSubmit={submitSkill}>
            <input name="name" value={skillForm.name} onChange={onSkillChange} placeholder="Skill name" required />
            <select name="category" value={skillForm.category} onChange={onSkillChange}>
              <option>Programming Languages</option>
              <option>Frameworks</option>
              <option>Tools</option>
            </select>
            <input name="icon" value={skillForm.icon} onChange={onSkillChange} placeholder="Icon URL (optional)" />
            <label>Icon file<input type="file" name="iconFile" accept="image/*" onChange={onSkillChange} /></label>
            <div className="inline-actions">
              <button className="btn primary" type="submit">{skillForm.id ? "Update Skill" : "Add Skill"}</button>
              {skillForm.id && (
                <button className="btn ghost" type="button" onClick={() => setSkillForm(skillInitial)}>Cancel</button>
              )}
            </div>
          </form>
          <div className="list-grid">
            {skills.map((skill) => (
              <article key={skill._id} className="list-item">
                <div>
                  <strong>{skill.name}</strong>
                  <p>{skill.category}</p>
                </div>
                <div className="inline-actions">
                  <button className="btn mini ghost" onClick={() => startEditSkill(skill)}>Edit</button>
                  <button className="btn mini danger" onClick={() => deleteSkillItem(skill._id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "Projects") {
      return (
        <div className="admin-panel">
          <h2>Projects</h2>
          <form className="form-grid" onSubmit={submitProject}>
            <input name="title" value={projectForm.title} onChange={onProjectChange} placeholder="Title" required />
            <textarea name="description" value={projectForm.description} onChange={onProjectChange} rows={4} placeholder="Description" required />
            <input name="techStack" value={projectForm.techStack} onChange={onProjectChange} placeholder="Tech stack (comma separated)" />
            <input name="githubUrl" value={projectForm.githubUrl} onChange={onProjectChange} placeholder="GitHub URL" required />
            <input name="liveUrl" value={projectForm.liveUrl} onChange={onProjectChange} placeholder="Live URL" />
            <input name="image" value={projectForm.image} onChange={onProjectChange} placeholder="Image URL (optional)" />
            <label>Image file<input type="file" name="imageFile" accept="image/*" onChange={onProjectChange} /></label>
            <div className="inline-actions">
              <button className="btn primary" type="submit">{projectForm.id ? "Update Project" : "Add Project"}</button>
              {projectForm.id && (
                <button className="btn ghost" type="button" onClick={() => setProjectForm(projectInitial)}>Cancel</button>
              )}
            </div>
          </form>
          <div className="list-grid">
            {projects.map((project) => (
              <article key={project._id} className="list-item">
                <div>
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                </div>
                <div className="inline-actions">
                  <button className="btn mini ghost" onClick={() => startEditProject(project)}>Edit</button>
                  <button className="btn mini danger" onClick={() => deleteProjectItem(project._id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "Contact") {
      return (
        <form className="admin-panel form-grid" onSubmit={submitContact}>
          <h2>Contact</h2>
          <input name="email" value={contactForm.email} onChange={onContactChange} placeholder="Email" required />
          <input name="phone" value={contactForm.phone} onChange={onContactChange} placeholder="Phone (10 digits)" maxLength={10} required />
          <input name="location" value={contactForm.location} onChange={onContactChange} placeholder="Location" required />
          <button className="btn primary" type="submit">Save Contact</button>
        </form>
      );
    }

    if (activeSection === "Message") {
      return (
        <div className="admin-panel">
          <h2>Messages</h2>
          <div className="list-grid">
            {messages.map((item) => (
              <article key={item._id} className="list-item">
                <div>
                  <strong>{item.name} ({item.email})</strong>
                  <p>{item.phone}</p>
                  <p><b>{item.subject}:</b> {item.message}</p>
                </div>
                <button className="btn mini danger" onClick={() => deleteMessageItem(item._id)}>
                  <FaTrash /> Delete
                </button>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "Social links") {
      return (
        <form className="admin-panel" onSubmit={submitSocial}>
          <h2>Social links</h2>
          <div className="form-grid">
            {socialRows.map((row, index) => (
              <div key={`social-${index}`} className="social-row">
                <input
                  value={row.platform}
                  onChange={(e) => updateSocialRow(index, "platform", e.target.value)}
                  placeholder="Platform"
                  required
                />
                <input
                  value={row.url}
                  onChange={(e) => updateSocialRow(index, "url", e.target.value)}
                  placeholder="URL"
                  required
                />
                <input
                  value={row.icon}
                  onChange={(e) => updateSocialRow(index, "icon", e.target.value)}
                  placeholder="Icon key (github/linkedin)"
                />
                <button className="btn mini danger" type="button" onClick={() => removeSocialRowAt(index)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="inline-actions">
              <button className="btn ghost" type="button" onClick={addSocialRow}>Add Row</button>
              <button className="btn primary" type="submit">Save Social Links</button>
            </div>
          </div>
        </form>
      );
    }

    if (activeSection === "Account") {
      return (
        <form className="admin-panel form-grid" onSubmit={submitAccount}>
          <h2>Account</h2>
          <div className="password-wrap">
            <input
              name="currentPassword"
              type={showPasswords.current ? "text" : "password"}
              value={accountForm.currentPassword}
              onChange={onAccountChange}
              placeholder="Current password"
              required
            />
            <button type="button" onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}>
              {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            name="newUsername"
            value={accountForm.newUsername}
            onChange={onAccountChange}
            placeholder="New username (optional)"
          />
          <div className="password-wrap">
            <input
              name="newPassword"
              type={showPasswords.next ? "text" : "password"}
              value={accountForm.newPassword}
              onChange={onAccountChange}
              placeholder="New password (optional)"
            />
            <button type="button" onClick={() => setShowPasswords((prev) => ({ ...prev, next: !prev.next }))}>
              {showPasswords.next ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="btn primary" type="submit">Update Account</button>
        </form>
      );
    }

    return <div className="admin-panel">Choose a section.</div>;
  }, [
    activeSection,
    aboutForm,
    contactForm,
    heroForm,
    overviewCards,
    projectForm,
    projects,
    skillForm,
    skills,
    messages,
    socialRows,
    accountForm,
    showPasswords
  ]);

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
        onThemeToggle={toggleTheme}
        themeMode={theme}
        onLogout={handleLogout}
      />
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeSection}</h1>
          {loading && <span>Loading...</span>}
        </header>
        {message.text && <p className={message.type === "error" ? "text-error" : "text-success"}>{message.text}</p>}
        {panel}
      </main>
    </div>
  );
}

export default AdminPage;
