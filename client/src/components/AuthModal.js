import { useEffect, useState } from "react";

function AuthModal({ isOpen, onClose, initialTab, onLogin, onRegister }) {
  const [tab, setTab] = useState(initialTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      if (tab === "login") {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong.";
      setError(msg);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="auth-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="auth-modal-title" className="auth-modal-title">
          {tab === "login" ? "Log in" : "Create account"}
        </h2>
        <div className="auth-tabs">
          <button
            type="button"
            className={tab === "login" ? "auth-tab auth-tab--active" : "auth-tab"}
            onClick={() => setTab("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={tab === "register" ? "auth-tab auth-tab--active" : "auth-tab"}
            onClick={() => setTab("register")}
          >
            Sign up
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "register" && (
            <label className="auth-field">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
          )}
          <label className="auth-field">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label className="auth-field">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              minLength={tab === "register" ? 6 : undefined}
              required
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button className="btn auth-submit" type="submit" disabled={pending}>
            {pending ? "Please wait…" : tab === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
