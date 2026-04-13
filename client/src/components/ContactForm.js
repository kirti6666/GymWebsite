import { useState } from "react";
import { submitContactForm } from "../services/api";

const initialFormState = {
  name: "",
  email: "",
  message: ""
};

function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitContactForm(formData);
      setStatus({ type: "success", text: "Message sent successfully." });
      setFormData(initialFormState);
    } catch (_error) {
      setStatus({ type: "error", text: "Could not send message." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="5"
        required
      />

      <button className="btn" type="submit">
        Send Message
      </button>

      {status.text && <p className={status.type}>{status.text}</p>}
    </form>
  );
}

export default ContactForm;
