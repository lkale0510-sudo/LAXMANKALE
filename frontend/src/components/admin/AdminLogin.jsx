import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "", secretCode: "" });
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "secretCode") {
      setForm((prev) => ({ ...prev, secretCode: value.replace(/\D/g, "").slice(0, 6) }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    try {
      await onLogin(form);
    } catch (error) {
      setStatus(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-auth-screen">
      <form className="admin-auth-card" onSubmit={handleSubmit}>
        <h1><FaLock /> Admin Login</h1>
        <label>
          Username
          <input name="username" value={form.username} onChange={onChange} required />
        </label>
        <label>
          Password
          <div className="password-wrap">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={onChange}
              required
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>
        <label>
          Secret 6-digit code
          <div className="password-wrap">
            <input
              name="secretCode"
              type={showCode ? "text" : "password"}
              value={form.secretCode}
              onChange={onChange}
              maxLength={6}
              inputMode="numeric"
              required
            />
            <button type="button" onClick={() => setShowCode((prev) => !prev)}>
              {showCode ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>
        <button className="btn primary" type="submit">
          Login
        </button>
        {status && <p className="text-error">{status}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
