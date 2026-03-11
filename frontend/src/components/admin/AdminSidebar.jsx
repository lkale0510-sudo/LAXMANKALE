import {
  FaAddressBook,
  FaAdjust,
  FaGlobe,
  FaHome,
  FaInfoCircle,
  FaLink,
  FaList,
  FaProjectDiagram,
  FaSignOutAlt,
  FaStar,
  FaUserCog,
  FaEnvelope
} from "react-icons/fa";

const items = [
  { key: "Overview", icon: <FaHome /> },
  { key: "Hero", icon: <FaStar /> },
  { key: "About", icon: <FaInfoCircle /> },
  { key: "Skills", icon: <FaList /> },
  { key: "Projects", icon: <FaProjectDiagram /> },
  { key: "Contact", icon: <FaAddressBook /> },
  { key: "Message", icon: <FaEnvelope /> },
  { key: "Social links", icon: <FaLink /> },
  { key: "View website", icon: <FaGlobe /> },
  { key: "Theme", icon: <FaAdjust /> },
  { key: "Account", icon: <FaUserCog /> },
  { key: "Logout", icon: <FaSignOutAlt /> }
];

function AdminSidebar({ activeSection, onSelect, onThemeToggle, themeMode, onLogout }) {
  const handleClick = (key) => {
    if (key === "Logout") {
      onLogout();
      return;
    }

    if (key === "Theme") {
      onThemeToggle();
      return;
    }

    if (key === "View website") {
      window.open("/", "_blank");
      return;
    }

    onSelect(key);
  };

  return (
    <aside className="admin-sidebar">
      <h2>LK Dashboard</h2>
      {items.map((item) => (
        <button
          key={item.key}
          className={`sidebar-btn ${activeSection === item.key ? "active" : ""}`}
          onClick={() => handleClick(item.key)}
        >
          <span>{item.icon}</span>
          <span>
            {item.key === "Theme" ? `Theme ${themeMode === "dark" ? "Dark" : "Light"}` : item.key}
          </span>
        </button>
      ))}
    </aside>
  );
}

export default AdminSidebar;
