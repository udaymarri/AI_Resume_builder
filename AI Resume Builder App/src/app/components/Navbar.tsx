import { motion } from "motion/react";
import { FileText, LayoutDashboard, Target, Layers, Mail, MessageSquare, Settings, Sun, Moon, User, ChevronDown, Zap } from "lucide-react";
import type { Page } from "../App";

interface NavbarProps {
  page: Page;
  navigate: (p: Page) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  user: { name: string; email: string; plan: string };
  isLoggedIn: boolean;
  setAuthOpen: (v: boolean) => void;
}

const navItems = [
  { id: "dashboard" as Page, label: "Dashboard", icon: LayoutDashboard },
  { id: "builder" as Page, label: "Builder", icon: FileText },
  { id: "ats" as Page, label: "ATS Analyzer", icon: Target },
  { id: "templates" as Page, label: "Templates", icon: Layers },
  { id: "cover-letter" as Page, label: "Cover Letter", icon: Mail },
  { id: "interview" as Page, label: "Interview Prep", icon: MessageSquare },
  { id: "admin" as Page, label: "Admin", icon: Settings },
];

export function Navbar({ page, navigate, darkMode, setDarkMode, user }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border"
      style={{ background: darkMode ? "rgba(10,10,15,0.85)" : "rgba(248,247,255,0.85)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("landing")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)" }}>
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>ResumeAI Pro</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon size={13} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => navigate("admin")}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Settings size={13} />
            Admin
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-medium">{user.name.split(" ")[0]}</div>
              <div className="text-[10px] text-muted-foreground">{user.plan} Plan</div>
            </div>
            <ChevronDown size={12} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
