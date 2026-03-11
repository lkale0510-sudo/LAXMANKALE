import { useMemo, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { submitContactMessage } from "../../api/publicApi";

const icons = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />
};

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

function ContactSection({ contact, socialLinks }) {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });

  const mergedSocialLinks = useMemo(() => {
    if (socialLinks.length > 0) {
      return socialLinks;
    }

    const fallback = [];
    if (contact?.github) fallback.push({ platform: "GitHub", url: contact.github, icon: "github" });
    if (contact?.linkedin) fallback.push({ platform: "LinkedIn", url: contact.linkedin, icon: "linkedin" });
    return fallback;
  }, [contact, socialLinks]);

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
      setFormState((prev) => ({ ...prev, phone: onlyDigits }));
      return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (formState.phone.length !== 10) {
      setStatus({ type: "error", message: "Phone number must be exactly 10 digits." });
      return;
    }

    try {
      await submitContactMessage(formState);
      setStatus({ type: "success", message: "Message sent successfully." });
      setFormState(initialState);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to send message. Try again."
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container reveal">
        <h3 className="section-title">Contact</h3>
        <div className="contact-grid">
          <div className="contact-meta">
            <p>Email: {contact?.email || "N/A"}</p>
            <p>Phone: {contact?.phone || "N/A"}</p>
            <p>Location: {contact?.location || "N/A"}</p>
            <div className="hero-icons">
              {mergedSocialLinks.map((item) => {
                const key = (item.icon || item.platform || "").toLowerCase();
                return (
                  <a href={item.url} key={`${item.platform}-${item.url}`} target="_blank" rel="noreferrer">
                    {icons[key] || <FaGithub />}
                  </a>
                );
              })}
            </div>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <input name="name" value={formState.name} onChange={onChange} placeholder="Name" required />
            <input name="email" value={formState.email} onChange={onChange} placeholder="Email" required />
            <input
              name="phone"
              value={formState.phone}
              onChange={onChange}
              placeholder="Phone (10 digits)"
              maxLength={10}
              inputMode="numeric"
              required
            />
            <input name="subject" value={formState.subject} onChange={onChange} placeholder="Subject" required />
            <textarea
              name="message"
              value={formState.message}
              onChange={onChange}
              placeholder="Message"
              rows={5}
              required
            />
            <button className="btn primary" type="submit">
              Send Message
            </button>
            {status.message && <p className={status.type === "error" ? "text-error" : "text-success"}>{status.message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
