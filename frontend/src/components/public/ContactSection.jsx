import { useMemo, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { submitContactMessage } from "../../api/publicApi";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

function ContactSection({ contact, socialLinks }) {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });

  const links = useMemo(() => socialLinks || [], [socialLinks]);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      setFormState((prev) => ({ ...prev, phone: value.replace(/\D/g, "").slice(0, 10) }));
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
      await submitContactMessage({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        subject: "Portfolio Contact",
        message: formState.message
      });

      setStatus({ type: "success", message: "Message sent successfully." });
      setFormState(initialState);
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to send message." });
    }
  };

  return (
    <section id="contact" className="section section-lite">
      <div className="container contact-lite-wrap">
        <div className="contact-head">
          <span className="contact-head-icon">
            <FaPaperPlane />
          </span>
          <h3>Let&apos;s build something together</h3>
          <p>Have an idea or project? Send a message and I will reply.</p>
        </div>

        <div className="contact-lite-grid">
          <div className="contact-lite-left">
            <h4>Social Media</h4>
            <p>{contact?.email || "laxman@example.com"}</p>
            <div className="contact-links">
              {links.map((item) => (
                <a href={item.url} key={`${item.platform}-${item.url}`} target="_blank" rel="noreferrer">
                  {item.platform}
                </a>
              ))}
            </div>
          </div>

          <form className="contact-lite-form" onSubmit={onSubmit}>
            <input name="name" value={formState.name} onChange={onChange} placeholder="Name" required />
            <input name="email" value={formState.email} onChange={onChange} placeholder="Email" required />
            <input
              name="phone"
              value={formState.phone}
              onChange={onChange}
              placeholder="Contact"
              maxLength={10}
              inputMode="numeric"
              required
            />
            <textarea
              name="message"
              value={formState.message}
              onChange={onChange}
              placeholder="Message"
              rows={4}
              required
            />
            <button type="submit" className="send-btn">
              SEND MESSAGE
            </button>
            {status.message && (
              <p className={status.type === "error" ? "text-error" : "text-success"}>{status.message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
