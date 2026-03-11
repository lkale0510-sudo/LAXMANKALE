import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";

function HeroSection({ hero }) {
  const profileImage = hero?.profileImage || "https://placehold.co/420x420/1f2937/ffffff?text=LK";
  const hasResume = Boolean(hero?.resumeUrl);

  const scrollProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="hero section">
      <div className="container hero-grid reveal">
        <div>
          <p className="eyebrow">Java Developer Portfolio</p>
          <h1>{hero?.name || "Laxman Kale"}</h1>
          <h2>{hero?.title || "Java Developer"}</h2>
          <p className="lead">
            {hero?.tagline ||
              "I build secure APIs, scalable backend systems, and polished full-stack experiences."}
          </p>
          <div className="hero-icons">
            {hero?.socialLinks?.github && (
              <a href={hero.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
            )}
            {hero?.socialLinks?.linkedin && (
              <a href={hero.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            )}
          </div>
          <div className="hero-actions">
            <a
              className={`btn primary ${hasResume ? "" : "disabled"}`}
              href={hasResume ? hero.resumeUrl : "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!hasResume}
              onClick={(event) => {
                if (!hasResume) {
                  event.preventDefault();
                }
              }}
            >
              <FaDownload /> Download CV
            </a>
            <button className="btn ghost" onClick={scrollProjects}>
              View Projects
            </button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img src={profileImage} alt="Profile" className="hero-image" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
