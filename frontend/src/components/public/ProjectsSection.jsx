import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="section">
      <div className="container reveal">
        <h3 className="section-title">Projects</h3>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project._id} className="project-card compact">
              <img
                src={project.image || "https://placehold.co/500x280/0f766e/ffffff?text=Project"}
                alt={project.title}
                className="project-image"
              />
              <div className="project-body">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="badge-wrap">
                  {(project.techStack || []).map((tech) => (
                    <span className="badge" key={`${project._id}-${tech}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn mini primary">
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href={project.liveUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn mini ${project.liveUrl ? "ghost" : "disabled"}`}
                    aria-disabled={!project.liveUrl}
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
