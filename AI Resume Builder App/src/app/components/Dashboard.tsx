import { motion } from "motion/react";
import { FileText, Target, Sparkles, TrendingUp, Plus, ChevronRight, Clock, CheckCircle2, AlertCircle, Eye, Download, Edit3, Zap, Brain, Mail } from "lucide-react";
import type { Page } from "../App";

interface DashboardProps {
  navigate: (p: Page) => void;
  user: { name: string; email: string; plan: string };
}

const areaData = [
  { month: "Jan", ats: 62, views: 24 },
  { month: "Feb", ats: 71, views: 38 },
  { month: "Mar", ats: 68, views: 31 },
  { month: "Apr", ats: 79, views: 52 },
  { month: "May", ats: 85, views: 67 },
  { month: "Jun", ats: 94, views: 89 },
];

const skillGapData = [
  { name: "React", current: 90, required: 95 },
  { name: "TypeScript", current: 75, required: 90 },
  { name: "Node.js", current: 70, required: 85 },
  { name: "AWS", current: 45, required: 80 },
  { name: "Docker", current: 55, required: 70 },
];

const recentResumes = [
  { title: "Senior Frontend Engineer", company: "Google", ats: 94, status: "optimized", updated: "2 hours ago" },
  { title: "Full Stack Developer", company: "Stripe", ats: 81, status: "needs-work", updated: "1 day ago" },
  { title: "React Developer", company: "Vercel", ats: 88, status: "optimized", updated: "3 days ago" },
  { title: "Software Engineer", company: "Notion", ats: 76, status: "needs-work", updated: "1 week ago" },
];

const quickActions = [
  { icon: Plus, label: "New Resume", page: "builder" as Page, gradient: "from-indigo-500 to-violet-600" },
  { icon: Target, label: "ATS Check", page: "ats" as Page, gradient: "from-violet-500 to-pink-600" },
  { icon: Mail, label: "Cover Letter", page: "cover-letter" as Page, gradient: "from-pink-500 to-rose-600" },
  { icon: Brain, label: "Interview Prep", page: "interview" as Page, gradient: "from-cyan-500 to-blue-600" },
];

const statCards = [
  { label: "Resumes Created", value: "12", change: "+3 this month", icon: FileText, color: "#4f46e5" },
  { label: "Avg ATS Score", value: "87%", change: "+12% from last month", icon: Target, color: "#7c3aed" },
  { label: "Profile Views", value: "348", change: "+67 this week", icon: Eye, color: "#ec4899" },
  { label: "AI Enhancements", value: "89", change: "47 this week", icon: Sparkles, color: "#06b6d4" },
];

function MiniAreaChart() {
  const w = 400;
  const h = 160;
  const pad = { top: 10, right: 10, bottom: 30, left: 36 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;

  const maxVal = 100;
  const xStep = innerW / (areaData.length - 1);

  const toX = (i: number) => pad.left + i * xStep;
  const toY = (v: number) => pad.top + innerH - (v / maxVal) * innerH;

  const atsPoints = areaData.map((d, i) => `${toX(i)},${toY(d.ats)}`).join(" ");
  const viewPoints = areaData.map((d, i) => `${toX(i)},${toY(d.views)}`).join(" ");

  const atsArea = `${toX(0)},${pad.top + innerH} ${atsPoints} ${toX(areaData.length - 1)},${pad.top + innerH}`;
  const viewArea = `${toX(0)},${pad.top + innerH} ${viewPoints} ${toX(areaData.length - 1)},${pad.top + innerH}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 200 }}>
      {/* grid lines */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={pad.left} x2={pad.left + innerW} y1={toY(v)} y2={toY(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={pad.left - 4} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="var(--muted-foreground)">{v}</text>
        </g>
      ))}
      {/* x labels */}
      {areaData.map((d, i) => (
        <text key={d.month} x={toX(i)} y={h - 8} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{d.month}</text>
      ))}
      {/* areas */}
      <polygon points={viewArea} fill="#7c3aed" fillOpacity={0.1} />
      <polygon points={atsArea} fill="#4f46e5" fillOpacity={0.12} />
      {/* lines */}
      <polyline points={viewPoints} fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round" />
      <polyline points={atsPoints} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Dashboard({ navigate, user }: DashboardProps) {
  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Welcome back, {user.name ? user.name.split(" ")[0] : "there"} 👋
              </h1>
              <p className="text-muted-foreground text-sm">Your resume is performing 23% better than last week</p>
            </div>
            <button
              onClick={() => navigate("builder")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <Plus size={16} />
              New Resume
            </button>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-5 rounded-2xl border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}18` }}>
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  <TrendingUp size={14} style={{ color: card.color }} />
                </div>
                <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
                <div className="text-xs mt-1.5 font-medium" style={{ color: card.color }}>{card.change}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* ATS Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>ATS Score Trend</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Your resume performance over time</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  ATS Score
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                  Profile Views
                </div>
              </div>
            </div>
            <MiniAreaChart />
          </motion.div>

          {/* Resume Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>Resume Health</h3>
            <p className="text-xs text-muted-foreground mb-4">Overall performance scores</p>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(79,70,229,0.1)" strokeWidth="12" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#4f46e5" strokeWidth="12"
                    strokeDasharray={`${94 * 3.14} 314`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>94</span>
                  <span className="text-xs text-muted-foreground">ATS Score</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Completeness", value: 87, color: "#7c3aed" },
                { label: "Readability", value: 91, color: "#ec4899" },
                { label: "Keyword Match", value: 94, color: "#06b6d4" },
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Resumes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Recent Resumes</h3>
              <button onClick={() => navigate("builder")} className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {recentResumes.map((resume, i) => (
                <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border transition-all hover:border-primary/30 hover:bg-primary/5 cursor-pointer group"
                  style={{ borderColor: "var(--border)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.1))" }}>
                    <FileText size={16} style={{ color: "#6d61f0" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{resume.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <Clock size={10} />
                      {resume.company} · {resume.updated}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-sm" style={{ color: resume.ats >= 85 ? "#10b981" : "#f59e0b" }}>{resume.ats}%</div>
                      <div className="text-[10px] text-muted-foreground">ATS</div>
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium ${
                      resume.status === "optimized"
                        ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30"
                        : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30"
                    }`}>
                      {resume.status === "optimized" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {resume.status === "optimized" ? "Optimized" : "Needs Work"}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                        <Edit3 size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all">
                        <Download size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <h3 className="font-semibold mb-5" style={{ fontFamily: "var(--font-display)" }}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(action.page)}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-xl bg-gradient-to-br ${action.gradient} text-white transition-all hover:opacity-90 hover:shadow-lg`}
                  >
                    <Icon size={20} />
                    <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-5 p-4 rounded-xl border" style={{ background: "rgba(79,70,229,0.06)", borderColor: "rgba(79,70,229,0.15)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} style={{ color: "#6d61f0" }} />
                <span className="text-xs font-semibold" style={{ color: "#6d61f0" }}>AI Career Tip</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Add quantifiable achievements to your last role. Resumes with metrics get 42% more recruiter attention.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skill gap chart — replaced with HTML bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Skill Gap Analysis</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Your skills vs. market requirements for Senior Frontend roles</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary border transition-all hover:bg-primary/5"
              style={{ borderColor: "rgba(79,70,229,0.3)" }}>
              View Full Report
            </button>
          </div>
          <div className="space-y-4">
            {skillGapData.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span style={{ color: "#4f46e5" }}>{skill.current}%</span>
                    <span>/ {skill.required}% required</span>
                  </div>
                </div>
                <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(79,70,229,0.12)" }}>
                  <div className="absolute inset-0 rounded-full" style={{ width: `${skill.required}%`, background: "rgba(79,70,229,0.2)" }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.current}%` }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed)" }} /> Your Level</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "rgba(79,70,229,0.2)" }} /> Required</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
