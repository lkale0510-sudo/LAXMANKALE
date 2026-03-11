import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const iconMap = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />
};

function FooterSection({ contact, socialLinks }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>Contact</h4>
          <p>{contact?.email || "N/A"}</p>
          <p>{contact?.phone || "N/A"}</p>
        </div>
        <div className="footer-social">
          {socialLinks.map((item) => {
            const key = (item.icon || item.platform || "").toLowerCase();
            return (
              <a href={item.url} key={`${item.platform}-${item.url}`} target="_blank" rel="noreferrer">
                {iconMap[key] || <FaGithub />}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
