import { useEffect, useState } from "react";
import { fetchPortfolio } from "../api/publicApi";
import AboutSection from "../components/public/AboutSection";
import ContactSection from "../components/public/ContactSection";
import FooterSection from "../components/public/FooterSection";
import HeroSection from "../components/public/HeroSection";
import Navbar from "../components/public/Navbar";
import ProjectsSection from "../components/public/ProjectsSection";
import SkillsSection from "../components/public/SkillsSection";

function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [portfolio, setPortfolio] = useState({
    hero: null,
    about: null,
    skills: [],
    projects: [],
    contact: null,
    socialLinks: []
  });

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await fetchPortfolio();
        setPortfolio({
          hero: data.hero,
          about: data.about,
          skills: data.skills || [],
          projects: data.projects || [],
          contact: data.contact,
          socialLinks: data.socialLinks || []
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  useEffect(() => {
    const preventCopy = (event) => {
      const tagName = event.target?.tagName?.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        return;
      }
      event.preventDefault();
    };

    const preventSelection = (event) => {
      const tagName = event.target?.tagName?.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        return;
      }
      event.preventDefault();
    };

    document.addEventListener("copy", preventCopy);
    document.addEventListener("selectstart", preventSelection);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("selectstart", preventSelection);
    };
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading portfolio...</div>;
  }

  if (error) {
    return <div className="loading-screen text-error">{error}</div>;
  }

  return (
    <main className="portfolio-root">
      <Navbar />
      <HeroSection hero={portfolio.hero} />
      <AboutSection about={portfolio.about} />
      <SkillsSection skills={portfolio.skills} />
      <ProjectsSection projects={portfolio.projects} />
      <ContactSection contact={portfolio.contact} socialLinks={portfolio.socialLinks} />
      <FooterSection contact={portfolio.contact} socialLinks={portfolio.socialLinks} />
    </main>
  );
}

export default PortfolioPage;
