import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import "./styles/main.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Home />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
