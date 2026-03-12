import { FaCode, FaLayerGroup, FaTools } from "react-icons/fa";

const categories = [
  { name: "Programming Languages", icon: <FaCode /> },
  { name: "Frameworks", icon: <FaLayerGroup /> },
  { name: "Tools", icon: <FaTools /> }
];

function SkillsSection({ skills }) {
  return (
    <section id="skills" className="section section-lite">
      <div className="container">
        <h3 className="lite-title">Skills</h3>
        <div className="skills-lite-grid">
          {categories.map((category) => {
            const entries = skills.filter((item) => item.category === category.name);

            return (
              <article key={category.name} className="skills-lite-card">
                <h4>
                  <span className="card-icon">{category.icon}</span>
                  {category.name}
                </h4>
                {entries.length > 0 ? (
                  <p>{entries.map((entry) => entry.name).join(", ")}</p>
                ) : (
                  <p>Add skills from dashboard.</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
