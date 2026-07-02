import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Sparkles, AlertCircle, CheckCircle2, TrendingUp, Copy, Loader2, ChevronRight, Zap, FileText } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const sampleJob = `Senior Frontend Engineer - React/TypeScript

We are looking for a Senior Frontend Engineer to join our team at a fast-growing SaaS company.

Requirements:
• 5+ years of experience with React and TypeScript
• Strong knowledge of Next.js, performance optimization, and accessibility
• Experience with RESTful APIs and GraphQL
• Familiarity with CI/CD pipelines and Docker
• Experience with testing frameworks (Jest, Cypress)
• Strong communication and leadership skills

Nice to have:
• Experience with AWS or GCP
• Knowledge of design systems
• Open source contributions`;

const sampleResume = `Alex Johnson - Senior Frontend Engineer

Skills: React, TypeScript, JavaScript, Node.js, GraphQL, PostgreSQL, AWS, Figma

Experience:
- 6 years building scalable React applications
- Led team delivering product 2 weeks ahead of schedule
- Reduced bundle size by 45% through optimization
- Built component library used across 5 product teams`;

const missingKeywords = ["Next.js", "Cypress", "Jest", "CI/CD", "Docker", "accessibility"];
const presentKeywords = ["React", "TypeScript", "GraphQL", "AWS", "Node.js", "leadership", "optimization"];

const radarData = [
  { subject: "Skills Match", A: 88 },
  { subject: "Experience", A: 92 },
  { subject: "Keywords", A: 74 },
  { subject: "Education", A: 85 },
  { subject: "Formatting", A: 96 },
  { subject: "Length", A: 90 },
];

const improvements = [
  { type: "critical", text: "Add 'Next.js' to your skills — it's required and not mentioned", fix: "Add to skills section" },
  { type: "critical", text: "Include testing experience with Jest or Cypress", fix: "Add testing bullet point" },
  { type: "warning", text: "Mention CI/CD and Docker experience", fix: "Add DevOps skills" },
  { type: "warning", text: "Highlight accessibility work if applicable", fix: "Add to experience bullets" },
  { type: "tip", text: "Quantify your team leadership impact with numbers", fix: "Update bullet point" },
  { type: "tip", text: "Add your open source contributions if any", fix: "Add projects section" },
];

export function ATSAnalyzer() {
  const [jobDesc, setJobDesc] = useState(sampleJob);
  const [resumeText, setResumeText] = useState(sampleResume);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | true>(null);
  const [score] = useState(82);

  const analyze = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2200);
  };

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>ATS Score Analyzer</h1>
          <p className="text-muted-foreground text-sm">Paste a job description to see how well your resume matches</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Job description */}
          <div className="p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Target size={15} style={{ color: "#6d61f0" }} />
              <span className="font-semibold text-sm">Job Description</span>
              <button onClick={() => { setJobDesc(""); }} className="ml-auto text-xs text-muted-foreground hover:text-foreground">Clear</button>
            </div>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows={14}
              placeholder="Paste the job description here..."
              className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:border-primary transition-colors resize-none"
              style={{ background: "var(--input-background)", borderColor: "var(--border)" }}
            />
          </div>

          {/* Resume */}
          <div className="p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} style={{ color: "#6d61f0" }} />
              <span className="font-semibold text-sm">Your Resume</span>
              <button className="ml-auto text-xs px-2.5 py-1 rounded-lg border transition-all hover:bg-muted/50" style={{ borderColor: "var(--border)" }}>
                Import from Builder
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={14}
              placeholder="Paste your resume content here..."
              className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:border-primary transition-colors resize-none"
              style={{ background: "var(--input-background)", borderColor: "var(--border)" }}
            />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={analyze}
            disabled={analyzing}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)", boxShadow: "0 0 30px rgba(79,70,229,0.3)" }}
          >
            {analyzing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze ATS Match
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score + radar */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Big score circle */}
                <div className="p-6 rounded-2xl border text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="text-sm font-semibold mb-4 text-muted-foreground">ATS Match Score</div>
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg width="130" height="130" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(79,70,229,0.1)" strokeWidth="10" />
                      <motion.circle
                        cx="60" cy="60" r="52" fill="none"
                        strokeWidth="10" strokeLinecap="round"
                        stroke="url(#atsScoreGrad)"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        transform="rotate(-90 60 60)"
                      />
                      <defs>
                        <linearGradient id="atsScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute text-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-3xl font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "#6d61f0" }}
                      >
                        {score}%
                      </motion.div>
                      <div className="text-[10px] text-muted-foreground">Match</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444" }}>
                    {score >= 80 ? "Strong Match ✓" : score >= 60 ? "Moderate Match" : "Weak Match"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Add missing keywords to reach 90%+</p>
                </div>

                {/* Radar */}
                <div className="p-6 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="text-sm font-semibold mb-2">Match Breakdown</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} />
                      <Radar dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} strokeWidth={2} />
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "11px" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Keywords */}
                <div className="p-6 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="text-sm font-semibold mb-4">Keyword Analysis</div>
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 mb-2">
                      <CheckCircle2 size={12} />
                      Present ({presentKeywords.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {presentKeywords.map((k) => (
                        <span key={k} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-emerald-700 dark:text-emerald-400"
                          style={{ background: "rgba(16,185,129,0.1)" }}>{k}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-red-400 mb-2">
                      <AlertCircle size={12} />
                      Missing ({missingKeywords.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {missingKeywords.map((k) => (
                        <span key={k} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-red-700 dark:text-red-400"
                          style={{ background: "rgba(239,68,68,0.1)" }}>{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Improvement suggestions */}
              <div className="p-6 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Zap size={16} style={{ color: "#6d61f0" }} />
                  <span className="font-semibold">AI Improvement Suggestions</span>
                  <span className="ml-auto text-xs text-muted-foreground">Fix these to reach 90%+</span>
                </div>
                <div className="space-y-3">
                  {improvements.map((imp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:border-primary/30 group"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        imp.type === "critical" ? "bg-red-100 dark:bg-red-950/40" :
                        imp.type === "warning" ? "bg-amber-100 dark:bg-amber-950/40" :
                        "bg-blue-100 dark:bg-blue-950/40"
                      }`}>
                        {imp.type === "critical" ? <AlertCircle size={11} className="text-red-500" /> :
                         imp.type === "warning" ? <TrendingUp size={11} className="text-amber-500" /> :
                         <Sparkles size={11} className="text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{imp.text}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                          <ChevronRight size={10} />
                          {imp.fix}
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-3 py-1.5 rounded-lg font-medium text-white"
                        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                        Apply
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                    <Sparkles size={15} />
                    Generate Optimized Resume
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm border transition-all hover:bg-muted/30"
                    style={{ borderColor: "var(--border)" }}>
                    <Copy size={14} />
                    Copy Report
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
