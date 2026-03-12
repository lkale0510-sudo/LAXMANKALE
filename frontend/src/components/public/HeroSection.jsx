import { useState } from "react";

function HeroSection({ hero }) {
  const [imageError, setImageError] = useState(false);

  const scrollProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const hasImage = Boolean(hero?.profileImage) && !imageError;
  const initials = (hero?.name || "Laxman Kale")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 1)
    .join("")
    .toUpperCase();

  return (
    <section id="home" className="section hero-lite">
      <div className="container hero-lite-grid">
        <div className="hero-copy-block">
          <p className="hero-kicker">PORTFOLIO</p>
          <h1 className="hero-main-title">{hero?.name || "Laxman Kale"}</h1>
          <h2 className="hero-subtitle">{hero?.title || "Java Developer"}</h2>
          <p className="hero-line">
            {hero?.tagline || "Building modern web experiences with performance and polish."}
          </p>
          <button className="outline-btn" onClick={scrollProjects}>
            View Projects
          </button>
        </div>

        <div className="avatar-card">
          {hasImage ? (
            <img
              src={hero.profileImage}
              alt={hero?.name || "Laxman Kale"}
              onError={() => setImageError(true)}
              className="avatar-image"
            />
          ) : (
            <span className="avatar-letter">{initials || "L"}</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
