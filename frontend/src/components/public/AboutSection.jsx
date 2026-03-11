function AboutSection({ about }) {
  return (
    <section id="about" className="section">
      <div className="container reveal">
        <h3 className="section-title">About</h3>
        <div className="about-card">
          <p>{about?.bio || "No bio added yet."}</p>
          <p className="about-experience">
            <strong>Experience:</strong> {about?.experience || "No experience summary added yet."}
          </p>
          <div className="tech-stack">
            {(about?.techStack || []).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
