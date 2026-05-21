import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import authImage from "../assets/mobile-care-auth.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(data.user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-visual">
        <img src={authImage} alt="Mobile repair and accessories service desk" />
      </div>
      <form onSubmit={handleSubmit} className="auth-card">
        <div>
          <p className="auth-kicker">Welcome back</p>
          <h1>Login</h1>
        </div>
        {message && <p className="auth-error">{message}</p>}
        <input className="input" name="email" type="email" placeholder="Email address" required value={form.email} onChange={updateField} />
        <input className="input" name="password" type="password" minLength="6" placeholder="Password" required value={form.password} onChange={updateField} />
        <button className="btn w-full" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="auth-switch">
          New to MobileCare Hub? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}
