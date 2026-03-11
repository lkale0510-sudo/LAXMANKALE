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
    <header className="nav-wrap">
      <nav className="nav-bar container">
        <button className="brand" onClick={() => scrollToSection("home")}>LK</button>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.target}>
              <button onClick={() => scrollToSection(item.target)}>{item.label}</button>
            </li>
          ))}
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <FaSun /> : <FaMoon />} {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
