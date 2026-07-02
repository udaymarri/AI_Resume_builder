import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { ResumeBuilder } from "./components/ResumeBuilder";
import { ATSAnalyzer } from "./components/ATSAnalyzer";
import { Templates } from "./components/Templates";
import { CoverLetter } from "./components/CoverLetter";
import { InterviewPrep } from "./components/InterviewPrep";
import { AdminPanel } from "./components/AdminPanel";
import { AuthModal } from "./components/AuthModal";
import { Navbar } from "./components/Navbar";

export type Page =
  | "landing"
  | "dashboard"
  | "builder"
  | "ats"
  | "templates"
  | "cover-letter"
  | "interview"
  | "admin";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [darkMode, setDarkMode] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", plan: "Free" });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navigate = (p: Page) => {
    if (p !== "landing" && !isLoggedIn) {
      setAuthOpen(true);
      return;
    }
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser({ name: userData.name, email: userData.email, plan: "Free" });
    setIsLoggedIn(true);
    setAuthOpen(false);
    setPage("dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300" style={{ fontFamily: "var(--font-body)" }}>
      {page !== "landing" && (
        <Navbar
          page={page}
          navigate={navigate}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          isLoggedIn={isLoggedIn}
          setAuthOpen={setAuthOpen}
        />
      )}

      {page === "landing" && (
        <LandingPage
          navigate={navigate}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setAuthOpen={setAuthOpen}
          isLoggedIn={isLoggedIn}
        />
      )}
      {page === "dashboard" && <Dashboard navigate={navigate} user={user} />}
      {page === "builder" && <ResumeBuilder navigate={navigate} />}
      {page === "ats" && <ATSAnalyzer />}
      {page === "templates" && <Templates navigate={navigate} />}
      {page === "cover-letter" && <CoverLetter />}
      {page === "interview" && <InterviewPrep />}
      {page === "admin" && <AdminPanel />}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={(userData) => handleLogin(userData)}
      />
    </div>
  );
}
