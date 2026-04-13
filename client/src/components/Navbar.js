import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, openLogin, openRegister, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand-wrap">
          <span className="logo-slot" aria-hidden="true">
            LOGO
          </span>
          <h1 className="brand">UrbanFit</h1>
        </a>
        <nav>
          
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user" title={user.email}>
                Hi, {user.name}
              </span>
              <button type="button" className="btn btn-secondary nav-cta" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button type="button" className="nav-link-btn" onClick={openLogin}>
                Log in
              </button>
              
            </>
          )}
          <a className="btn btn-secondary nav-cta" href="#trial-form">
            Book a Trial
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
