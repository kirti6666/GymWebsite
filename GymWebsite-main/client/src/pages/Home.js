import { useState } from "react";
import Hero from "../components/Hero";
import { bookTrial, submitContactForm } from "../services/api";

function Home() {
  const [trialForm, setTrialForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: ""
  });
  const [trialFeedback, setTrialFeedback] = useState({ type: "", text: "" });
  const [trialSubmitting, setTrialSubmitting] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [contactFeedback, setContactFeedback] = useState({ type: "", text: "" });
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const handleTrialChange = (e) => {
    const { name, value } = e.target;
    setTrialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setTrialFeedback({ type: "", text: "" });
    setTrialSubmitting(true);
    try {
      const res = await bookTrial(trialForm);
      setTrialFeedback({ type: "success", text: res.message || "Request sent." });
      setTrialForm({ name: "", phone: "", email: "", preferredTime: "" });
    } catch (err) {
      setTrialFeedback({
        type: "error",
        text:
          err.response?.data?.message ||
          "Could not submit. Start the API server and MongoDB, then try again."
      });
    } finally {
      setTrialSubmitting(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactFeedback({ type: "", text: "" });
    setContactSubmitting(true);
    try {
      const res = await submitContactForm(contactForm);
      setContactFeedback({ type: "success", text: res.message || "Message sent." });
      setContactForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setContactFeedback({
        type: "error",
        text:
          err.response?.data?.message ||
          "Could not send. Start the API server and MongoDB, then try again."
      });
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <>
      <Hero />
      <section className="video-section reveal">
        <video
            className="promo-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="/vedio.mp4" type="video/mp4" />
          </video>  
        <div className="video-overlay" />
        <div className="video-content container">
          <h3>Train Like Never Before</h3>
          <p>Experience the ultimate fitness environment</p>
          <div className="hero-actions">
            <a className="btn" href="#membership">
              Join Now
            </a>
            <a className="btn btn-secondary" href="#trial-form">
              Book a Trial
            </a>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="trial-form">
        <div className="container">
          <p className="section-kicker">Conversion Focus</p>
          <h3>Book a Trial</h3>
          <div className="card form-card">
            <form className="trial-form" onSubmit={handleTrialSubmit}>
              <label htmlFor="trial-name">Name</label>
              <input
                id="trial-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={trialForm.name}
                onChange={handleTrialChange}
                required
              />
              <label htmlFor="trial-phone">Phone</label>
              <input
                id="trial-phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={trialForm.phone}
                onChange={handleTrialChange}
                required
              />
              <label htmlFor="trial-email">Email</label>
              <input
                id="trial-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={trialForm.email}
                onChange={handleTrialChange}
                required
              />
              <label htmlFor="trial-time">Preferred Time</label>
              <input
                id="trial-time"
                name="preferredTime"
                type="text"
                placeholder="e.g. 7:00 AM - 8:00 AM"
                value={trialForm.preferredTime}
                onChange={handleTrialChange}
                required
              />
              <button className="btn" type="submit" disabled={trialSubmitting}>
                {trialSubmitting ? "Sending…" : "Submit Trial Request"}
              </button>
              {trialFeedback.text && (
                <p className={`form-feedback ${trialFeedback.type}`}>{trialFeedback.text}</p>
              )}
            </form>
          </div>
        </div>
      </section>
      <section className="section divider reveal" id="about">
        <div className="container">
          <p className="section-kicker">Who We Are</p>
          <h3>About UrbanFit</h3>
          <p>
            UrbanFit was born with one vision — to bring a world-class fitness
            experience to Pune&apos;s professionals and fitness enthusiasts.
            Located in the heart of Baner, we combine premium equipment, expert
            trainers, and a motivating environment to help you reach your goals
            faster.
          </p>
          <p>
            We are not your average gym. At UrbanFit, we believe fitness should
            be exclusive, effective, and enjoyable. No overcrowding, no
            compromises — just results.
          </p>
        </div>
      </section>

      <section className="section divider reveal" id="facilities">
        <div className="container">
          <p className="section-kicker">Premium Infrastructure</p>
          <h3>Gym Amenities / Facilities</h3>
          <div className="grid">
            <article className="card">
              <div className="media">
                <img src="/equipment.jpg" alt="Equipment" />
              </div>
              <h4>Premium Equipment Zone</h4>
              <p>High-performance strength and cardio machines.</p>
            </article>
            <article className="card">
              <div className="media">
                <img src="/locker.jpg" alt="Locker Room" />
              </div>
              <h4>Locker Room & Showers</h4>
              <p>Clean and secure changing spaces with private lockers.</p>
            </article>
            <article className="card">
              <div className="media">
                <img src="/parking.jpg" alt="Parking Area" />
              </div>
              <h4>Wi-Fi & Parking</h4>
              <p>Business-class convenience for every training session.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="services">
        <div className="container">
          <p className="section-kicker">What We Offer</p>
          <h3>Services</h3>
          <div className="grid">
            <article className="card">
              <h4>Personal Training</h4>
              <p>
                One-on-one sessions with certified trainers tailored to your
                specific goals.
              </p>
            </article>
            <article className="card">
              <h4>Group Fitness Classes</h4>
              <p>
                High-energy group sessions including HIIT, Zumba, Spinning, and
                Power Yoga.
              </p>
            </article>
            <article className="card">
              <h4>Nutrition Consultation</h4>
              <p>
                Personalized diet plans crafted by certified nutritionists to
                complement your training.
              </p>
            </article>
            <article className="card">
              <h4>Body Composition Analysis</h4>
              <p>
                Advanced body scanning to track your progress with precision.
              </p>
            </article>
            <article className="card">
              <h4>Corporate Wellness Programs</h4>
              <p>
                Customized fitness packages for companies and their employees in
                Pune.
              </p>
            </article>
            <article className="card">
              <h4>Online Coaching</h4>
              <p>
                Train from anywhere with UrbanFit&apos;s certified trainers via
                our digital coaching platform.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="membership">
        <div className="container">
          <p className="section-kicker">Choose Your Plan</p>
          <h3>Membership Plans</h3>
          <div className="grid">
            <article className="card">
              <h4>Basic</h4>
              <p className="price">Rs 1,500/month</p>
              <ul>
                <li>Gym access</li>
                <li>Locker room</li>
                <li>Free Wi-Fi</li>
                <li>Parking</li>
              </ul>
            </article>
            <article className="card popular">
              <p className="popular-badge">Most Popular</p>
              <h4>Premium</h4>
              <p className="price">Rs 2,500/month</p>
              <ul>
                <li>Everything in Basic</li>
                <li>Group classes</li>
                <li>Nutrition consultation</li>
                <li>Body analysis</li>
              </ul>
            </article>
            <article className="card">
              <h4>Elite</h4>
              <p className="price">Rs 4,000/month</p>
              <ul>
                <li>Everything in Premium</li>
                <li>Personal training sessions (8/month)</li>
                <li>Online coaching access</li>
                <li>Priority booking</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="trainers">
        <div className="container">
          <p className="section-kicker">Expert Coaches</p>
          <h3>Our Trainers</h3>
          <div className="grid">
            <article className="card">
              <div className="media">
                <img src="/trainer.jpg" alt="Arjun Mehta" />
                </div>
                <h4>Arjun Mehta</h4>
                <p>Specialization: Strength & Conditioning</p>
                <p>Experience: 5 years</p>
                <p>Certification: ISSA Certified</p>
              </article>
            <article className="card">
              <div className="media">
                <img src="/trainer2.jpg" alt="Rahul Verma" />
              </div>
              <h4>Rahul Verma</h4>
              <p>Specialization: HIIT &amp; Weight Loss</p>
              {/* TODO: Fill in this detail */}
              <p>Experience: [YEARS] years</p>
              {/* TODO: Fill in this detail */}
              <p>Certification: [CERTIFICATION]</p>
            </article>
            <article className="card">
              <div className="media">
                <img src="/trainer3.jpg" alt="Trainer" />
              </div>
              <h4>Sakshi Singh</h4>
              <p>Specialization: Yoga &amp; Flexibility</p>
              {/* TODO: Fill in this detail */}
              <p>Experience: [YEARS] years</p>
              {/* TODO: Fill in this detail */}
              <p>Certification: [CERTIFICATION]</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="schedule">
        <div className="container">
          <p className="section-kicker">Weekly Sessions</p>
          <h3>Class Schedule</h3>
          <div className="schedule-list">
            <div className="card schedule-item"><strong>Monday</strong><span>HIIT with Rahul Verma | 6:30 AM | 45 mins | 20 spots</span></div>
            <div className="card schedule-item"><strong>Monday</strong><span>Power Yoga with Karan Singh | 8:00 AM | 60 mins | 15 spots</span></div>
            <div className="card schedule-item"><strong>Tuesday</strong><span>Strength Training with Arjun Mehta | 7:00 AM | 60 mins | 10 spots</span></div>
            <div className="card schedule-item"><strong>Wednesday</strong><span>Zumba with Rahul Verma | 6:30 AM | 45 mins | 25 spots</span></div>
            <div className="card schedule-item"><strong>Thursday</strong><span>HIIT with Rahul Verma | 6:30 AM | 45 mins | 20 spots</span></div>
            <div className="card schedule-item"><strong>Friday</strong><span>Power Yoga with Karan Singh | 8:00 AM | 60 mins | 15 spots</span></div>
            <div className="card schedule-item"><strong>Saturday</strong><span>Strength Training with Arjun Mehta | 7:00 AM | 60 mins | 10 spots</span></div>
            <div className="card schedule-item"><strong>Sunday</strong><span>Open Gym + Stretching with Karan Singh | 9:00 AM | 90 mins | 30 spots</span></div>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="gallery">
        <div className="container">
          <p className="section-kicker">UrbanFit Spaces</p>
          <h3>Transformation / Gallery</h3>
          <div className="grid">
            <article className="card"><div className="media">
              <img src="/weights.jpg" alt="Strength Floor" />
            </div>
            <h4>Strength Floor</h4><p>Modern free-weight and resistance setup.</p></article>
            <article className="card"><div className="media">
              <img src="/yoga.jpg" alt="Group Studio" />
            </div><h4>Group Studio</h4><p>HIIT, Zumba, and Yoga sessions in action.</p></article>
            <article className="card"><div className="media">
              <img src="/streching.jpg" alt="Recovery Zone" />
            </div><h4>Recovery Zone</h4><p>Designed for flexibility, cooldown, and mobility work.</p></article>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="testimonials">
        <div className="container">
          <p className="section-kicker">Member Stories</p>
          <h3>Testimonials</h3>
          <div className="grid">
            <article className="card">
              <img src="/test1.jpg" alt="User" className="testimonial-photo" />
              <p>
                &quot;UrbanFit completely transformed my lifestyle. The trainers
                are incredibly professional and the facility is world-class.&quot;
              </p>
              <p>— Rohit Sharma, Member since 2023, Goal: Lost 14kg</p>
            </article>
            <article className="card">
              <img src="/test3.jpg" alt="User" className="testimonial-photo" />
              <p>
                &quot;Best gym in Baner, no question. Premium equipment, no
                overcrowding, and the nutrition guidance is top notch.&quot;
              </p>
              <p>— Priya Desai, Member since 2022, Goal: Built lean muscle</p>
            </article>
            <article className="card">
              <img src="/test2.jpg" alt="User" className="testimonial-photo" />
              <p>
                &quot;The corporate wellness program at UrbanFit is exactly what
                our team needed. Highly recommended for Pune businesses.&quot;
              </p>
              <p>
                — Amit Kulkarni, Member since 2023, Goal: Improved team fitness
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section divider reveal" id="contact">
        <div className="container">
          <p className="section-kicker">Get In Touch</p>
          <h3>Contact UrbanFit</h3>
          <div className="contact-layout">
            <div className="card">
              <p><strong>Address:</strong> 4th Floor, Elite Square, Pancard Club Road, Opp. High Street Plaza, Baner, Pune - 411045, Maharashtra, India</p>
              <p><strong>Phone:</strong> 9356372353</p>
              <p><strong>Email:</strong> urbanFit@gmail.com</p>
              <p><strong>Hours:</strong> 6:00 AM - 11:00 PM, Monday to Sunday</p>
              <p><strong>WhatsApp:</strong> 8825235465</p>
              <a
                className="btn"
                href="https://wa.me/918825235465"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="card">
              <h4>Send a Message</h4>
              <form className="trial-form" onSubmit={handleContactSubmit}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                />
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={contactForm.phone}
                  onChange={handleContactChange}
                />
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                />
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder="How can we help?"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                />
                <button className="btn" type="submit" disabled={contactSubmitting}>
                  {contactSubmitting ? "Sending…" : "Submit"}
                </button>
                {contactFeedback.text && (
                  <p className={`form-feedback ${contactFeedback.type}`}>{contactFeedback.text}</p>
                )}
              </form>
            </div>
            <iframe
              className="map-frame"
              title="UrbanFit Location"
              src="https://www.google.com/maps?q=Elite+Square,+Pancard+Club+Road,+Baner,+Pune&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
