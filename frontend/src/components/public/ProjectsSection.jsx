function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="section section-lite">
      <div className="container">
        <h3 className="lite-title">Projects</h3>

        {projects.length === 0 ? (
          <p className="projects-empty">No projects yet. Add one from the admin dashboard.</p>
        ) : (
          <div className="project-lite-list">
            {projects.map((project) => (
              <article key={project._id} className="project-lite-item">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
