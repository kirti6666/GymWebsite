import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { getMe, login as apiLogin, register as apiRegister } from "../services/api";
import AuthModal from "../components/AuthModal";

const AuthContext = createContext(null);

const TOKEN_KEY = "urbanfit_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user: u } = await getMe();
      setUser(u);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const openLogin = useCallback(() => {
    setModalTab("login");
    setModalOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setModalTab("register");
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const login = useCallback(async (email, password) => {
    const { token, user: u } = await apiLogin(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(u);
    setModalOpen(false);
  }, []);

  const register = useCallback(async (name, email, password) => {
    const { token, user: u } = await apiRegister(name, email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(u);
    setModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      openLogin,
      openRegister,
      logout,
      login,
      register
    }),
    [user, loading, openLogin, openRegister, logout, login, register]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialTab={modalTab}
        onLogin={login}
        onRegister={register}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
