import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600"
];

const SLIDE_INTERVAL_MS = 4000;

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="hero hero-carousel" id="home" aria-roledescription="carousel">
      <div className="hero-slides" aria-hidden="true">
        {HERO_IMAGES.map((url, index) => (
          <div
            key={url}
            className={`hero-slide ${index === activeIndex ? "hero-slide--active" : ""}`}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </div>
      <div className="hero-dark-overlay" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-text-panel">
          <p className="eyebrow hero-eyebrow">UrbanFit Premium Studio</p>
          <h2 className="hero-headline">Elevate Your Fitness Experience</h2>
          <p className="hero-subheading">
            Pune&apos;s most premium business-class gym in the heart of Baner
          </p>
          <div className="stat-bar hero-stat-bar">
            <span className="hero-stat-badge">500+ Members</span>
            <span className="hero-stat-badge">3 Expert Trainers</span>
            <span className="hero-stat-badge">7 Days a Week</span>
            <span className="hero-stat-badge">5 Star Rated</span>
          </div>
        </div>
      </div>
      <div className="hero-dots" role="tablist" aria-label="Hero image carousel">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            className={`hero-dot ${index === activeIndex ? "hero-dot--active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
