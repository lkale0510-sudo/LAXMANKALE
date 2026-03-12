const fallbackStack = ["React", "Node.js", "Express", "MongoDB"];

function AboutSection({ about }) {
  const stack = about?.techStack?.length ? about.techStack : fallbackStack;

  return (
    <section id="about" className="section section-lite">
      <div className="container">
        <h3 className="lite-title">About</h3>
        <div className="about-lite">
          <p>{about?.bio || "Passionate about engineering reliable digital products."}</p>
          <p>{about?.experience || "Ideating and shipping full stack systems from idea to deployment."}</p>
          <div className="stack-pills">
            {stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
