import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" }
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="lite-nav-wrap">
      <nav className="container lite-nav">
        <button className="site-name" onClick={() => scrollToSection("home")}>
          Laxman Kale
        </button>
        <ul className="lite-nav-links">
          {navItems.map((item) => (
            <li key={item.target}>
              <button onClick={() => scrollToSection(item.target)}>{item.label}</button>
            </li>
          ))}
        </ul>
        <button className="icon-only" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
