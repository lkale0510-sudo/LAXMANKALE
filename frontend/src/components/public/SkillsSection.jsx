import { useMemo, useState } from "react";
import { FaCode, FaToolbox } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";

const categories = ["Programming Languages", "Frameworks", "Tools"];

function SkillIcon({ icon, category, name }) {
  const [failed, setFailed] = useState(false);

  const fallback = useMemo(() => {
    if (category === "Frameworks") return <TbBrandReactNative />;
    if (category === "Tools") return <FaToolbox />;
    return <FaCode />;
  }, [category]);

  if (!icon || failed) {
    return <span className="skill-fallback">{fallback}</span>;
  }

  return <img src={icon} alt={name} onError={() => setFailed(true)} loading="lazy" />;
}

function SkillsSection({ skills }) {
  return (
    <section id="skills" className="section">
      <div className="container reveal">
        <h3 className="section-title">Skills</h3>
        <div className="skill-groups">
          {categories.map((category) => (
            <div className="skill-group" key={category}>
              <h4>{category}</h4>
              <div className="skill-grid">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <article className="skill-card" key={skill._id}>
                      <SkillIcon icon={skill.icon} category={skill.category} name={skill.name} />
                      <span>{skill.name}</span>
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
