import { useState } from "react";
import api from "../api/axios.js";
import authImage from "../assets/mobile-care-auth.png";
import { serviceHighlights } from "../data/showcase.js";

const initialForm = {
  customerName: "",
  mobileNumber: "",
  email: "",
  deviceBrand: "",
  modelNumber: "",
  issueType: "",
  issueDescription: "",
  pickupAddress: "",
  preferredDate: "",
  serviceType: "Pickup",
};

const issueTypes = ["Screen damage", "Battery drain", "Charging issue", "Speaker or mic", "Water damage", "Software issue"];

export default function ServiceBooking() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await api.post("/services", form);
      setMessage("Service booking created successfully");
      setForm(initialForm);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Service booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="service-hero">
        <div>
          <p className="section-kicker">Repair booking</p>
          <h1>Book a service visit with clear tracking from pickup to delivery.</h1>
          <p>
            Capture device details, customer contact, issue type, and service preference in one polished booking flow.
          </p>
          <div className="hero-stats">
            {["Pickup or walk-in", "Status tracking", "Technician review"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <img src={authImage} alt="Mobile service desk with devices and repair tools" />
      </div>

      <div className="service-layout">
        <aside className="service-panel">
          <h2>Popular service requests</h2>
          <div className="service-list">
            {serviceHighlights.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="service-form">
          <div className="md:col-span-2">
            <p className="section-kicker">Customer details</p>
            <h2>Service booking form</h2>
          </div>
          {message && <p className={message.includes("successfully") ? "success-message md:col-span-2" : "auth-error md:col-span-2"}>{message}</p>}
          <input className="input" name="customerName" placeholder="Customer name" value={form.customerName} required onChange={updateField} />
          <input className="input" name="mobileNumber" placeholder="Mobile number" value={form.mobileNumber} required onChange={updateField} />
          <input className="input" name="email" type="email" placeholder="Email address" value={form.email} required onChange={updateField} />
          <input className="input" name="deviceBrand" placeholder="Device brand" value={form.deviceBrand} required onChange={updateField} />
          <input className="input" name="modelNumber" placeholder="Model number" value={form.modelNumber} required onChange={updateField} />
          <select className="input" name="issueType" value={form.issueType} required onChange={updateField}>
            <option value="">Select issue type</option>
            {issueTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <textarea className="input md:col-span-2" name="issueDescription" placeholder="Describe the issue" value={form.issueDescription} required onChange={updateField} />
          <textarea className="input md:col-span-2" name="pickupAddress" placeholder="Pickup or walk-in address" value={form.pickupAddress} required onChange={updateField} />
          <input className="input" name="preferredDate" type="date" value={form.preferredDate} required onChange={updateField} />
          <select className="input" name="serviceType" value={form.serviceType} onChange={updateField}>
            <option>Pickup</option>
            <option>Walk-in</option>
          </select>
          <button className="btn md:col-span-2" disabled={loading}>
            {loading ? "Booking..." : "Book service"}
          </button>
        </form>
      </div>
    </section>
  );
}
