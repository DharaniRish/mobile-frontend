import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import authImage from "../assets/mobile-care-auth.png";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
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
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Registration failed");
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
          <p className="auth-kicker">MobileCare Hub</p>
          <h1>Create account</h1>
        </div>
        {message && <p className="auth-error">{message}</p>}
        <input className="input" name="name" placeholder="Full name" required value={form.name} onChange={updateField} />
        <input className="input" name="email" type="email" placeholder="Email address" required value={form.email} onChange={updateField} />
        <input className="input" name="password" type="password" minLength="6" placeholder="Password" required value={form.password} onChange={updateField} />
        <input className="input" name="phone" placeholder="Phone number" value={form.phone} onChange={updateField} />
        <input className="input" name="address" placeholder="Address" value={form.address} onChange={updateField} />
        <button className="btn w-full" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
