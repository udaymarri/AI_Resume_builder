import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Brain, Users, Code2, ChevronDown, ChevronUp, Sparkles, Loader2, Star, ThumbsUp, Copy, RefreshCw } from "lucide-react";

type QuestionType = "technical" | "behavioral" | "hr";

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  sampleAnswer?: string;
  tips?: string[];
}

const questions: Question[] = [
  {
    id: "1",
    type: "technical",
    difficulty: "hard",
    question: "Explain the virtual DOM reconciliation algorithm in React. How does React decide what needs to be re-rendered?",
    sampleAnswer: "React's reconciliation uses a diffing algorithm comparing the current virtual DOM tree with the previous one. It uses two assumptions: 1) Elements of different types produce different trees, 2) Developer-provided keys help identify stable child elements. React does a breadth-first traversal comparing element types, updating only what changed. Keys help React match nodes across renders without re-mounting them.",
    tips: ["Mention the O(n) complexity vs O(n³) of naive approach", "Discuss keys and their importance", "Talk about fiber architecture if senior role"]
  },
  {
    id: "2",
    type: "technical",
    difficulty: "medium",
    question: "How would you optimize the performance of a React application that has slow re-renders?",
    sampleAnswer: "I'd start with React DevTools Profiler to identify expensive renders. Then apply: useMemo for expensive calculations, useCallback for stable function references, React.memo to prevent unnecessary child re-renders, code splitting with React.lazy, and virtualization for long lists.",
    tips: ["Mention measurement before optimization", "Discuss React.memo vs useMemo vs useCallback tradeoffs", "Talk about bundle analysis tools"]
  },
  {
    id: "3",
    type: "technical",
    difficulty: "medium",
    question: "What is the difference between useEffect and useLayoutEffect? When would you use each?",
    sampleAnswer: "useEffect fires asynchronously after paint, useLayoutEffect fires synchronously before paint. Use useLayoutEffect when you need to read or mutate the DOM before the browser paints—preventing visual flicker. For everything else, useEffect is preferred as it doesn't block the browser.",
    tips: ["Mention the flicker prevention use case", "Discuss SSR compatibility issues with useLayoutEffect"]
  },
  {
    id: "4",
    type: "behavioral",
    difficulty: "medium",
    question: "Tell me about a time you had to make a difficult technical decision under time pressure. What was the outcome?",
    sampleAnswer: "During a critical product launch, our payment integration was failing 3 hours before go-live. I made the call to temporarily disable a non-essential feature to reduce the risk surface and focus debugging. This allowed us to isolate the issue, fix it, and launch on time. I communicated the tradeoff clearly to stakeholders throughout.",
    tips: ["Use STAR method: Situation, Task, Action, Result", "Quantify the impact where possible", "Show how you communicated with stakeholders"]
  },
  {
    id: "5",
    type: "behavioral",
    difficulty: "easy",
    question: "Describe a situation where you had to learn a new technology quickly. How did you approach it?",
    sampleAnswer: "When we migrated from Redux to Zustand, I had 2 weeks to become proficient. I started with the official docs, then built a small side project to internalize the patterns. I documented my learnings and shared them with the team, which accelerated everyone's learning curve.",
    tips: ["Show your learning strategy", "Mention how you applied and shared the knowledge", "Demonstrate growth mindset"]
  },
  {
    id: "6",
    type: "hr",
    difficulty: "easy",
    question: "Why do you want to work at this company specifically? What excites you most about this role?",
    sampleAnswer: "I've followed Stripe's engineering blog for years and admire the depth of technical thinking in your infrastructure. The challenge of building payment systems that developers love—combining reliability with great DX—is exactly the kind of problem I want to work on. I'm particularly excited about contributing to your React component library.",
    tips: ["Be specific about the company, not generic", "Connect their mission to your values", "Show you've done research"]
  },
  {
    id: "7",
    type: "hr",
    difficulty: "medium",
    question: "Where do you see yourself in 5 years? How does this role fit into your career trajectory?",
    sampleAnswer: "I see myself growing into a principal engineer or engineering manager role, with deep expertise in frontend architecture and developer experience. This role is ideal because it gives me both technical depth—working on complex UI systems—and exposure to leadership through mentoring junior engineers.",
    tips: ["Align your goals with the company's growth", "Show ambition without seeming like you'll leave quickly", "Be honest about leadership vs IC preference"]
  },
];

const difficultyColors = {
  easy: { bg: "rgba(16,185,129,0.1)", text: "#10b981" },
  medium: { bg: "rgba(245,158,11,0.1)", text: "#f59e0b" },
  hard: { bg: "rgba(239,68,68,0.1)", text: "#ef4444" },
};

const typeConfig = {
  technical: { icon: Code2, label: "Technical", color: "#4f46e5" },
  behavioral: { icon: Users, label: "Behavioral", color: "#7c3aed" },
  hr: { icon: MessageSquare, label: "HR", color: "#ec4899" },
};

function QuestionCard({ q }: { q: Question }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const config = typeConfig[q.type];
  const Icon = config.icon;
  const diff = difficultyColors[q.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border overflow-hidden transition-all"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <button className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/20 transition-colors"
        onClick={() => setExpanded(!expanded)}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${config.color}15` }}>
          <Icon size={16} style={{ color: config.color }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: `${config.color}15`, color: config.color }}>
              {config.label}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
              style={{ background: diff.bg, color: diff.text }}>
              {q.difficulty}
            </span>
          </div>
          <p className="text-sm font-medium leading-relaxed">{q.question}</p>
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0 mt-1" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="p-5 space-y-4">
              {q.sampleAnswer && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={13} style={{ color: "#6d61f0" }} />
                    <span className="text-xs font-semibold" style={{ color: "#6d61f0" }}>Sample Answer</span>
                  </div>
                  <div className="p-4 rounded-xl text-sm leading-relaxed text-muted-foreground"
                    style={{ background: "rgba(79,70,229,0.04)", borderLeft: "3px solid rgba(79,70,229,0.4)" }}>
                    {q.sampleAnswer}
                  </div>
                </div>
              )}

              {q.tips && (
                <div>
                  <div className="text-xs font-semibold mb-2">Pro Tips</div>
                  <ul className="space-y-1.5">
                    {q.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#6d61f0" }} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button onClick={() => setSaved(!saved)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  saved ? "border-amber-400/50 text-amber-500" : "border-border text-muted-foreground hover:border-amber-400/30 hover:text-amber-500"
                }`} style={{ background: saved ? "rgba(245,158,11,0.08)" : "transparent" }}>
                  <Star size={11} className={saved ? "fill-amber-500" : ""} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
                  <Copy size={11} />
                  Copy
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
                  <ThumbsUp size={11} />
                  Helpful
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function InterviewPrep() {
  const [activeType, setActiveType] = useState<QuestionType | "all">("all");
  const [generating, setGenerating] = useState(false);
  const [role, setRole] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Stripe");

  const filtered = activeType === "all" ? questions : questions.filter((q) => q.type === activeType);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1800);
  };

  const counts = {
    technical: questions.filter((q) => q.type === "technical").length,
    behavioral: questions.filter((q) => q.type === "behavioral").length,
    hr: questions.filter((q) => q.type === "hr").length,
  };

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Interview Preparation</h1>
          <p className="text-sm text-muted-foreground">AI-generated questions tailored to your resume and target role</p>
        </div>

        {/* Generate section */}
        <div className="p-5 rounded-2xl border mb-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground block mb-1">Target Role</label>
              <input value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors"
                style={{ background: "var(--input-background)", borderColor: "var(--border)" }} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground block mb-1">Company</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors"
                style={{ background: "var(--input-background)", borderColor: "var(--border)" }} />
            </div>
            <div className="flex-shrink-0 pt-4">
              <button onClick={generate} disabled={generating}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                {generating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Generate Questions
              </button>
            </div>
          </div>
        </div>

        {/* Type tabs + stats */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {[
            { id: "all", label: `All (${questions.length})`, icon: Brain },
            { id: "technical", label: `Technical (${counts.technical})`, icon: Code2, color: "#4f46e5" },
            { id: "behavioral", label: `Behavioral (${counts.behavioral})`, icon: Users, color: "#7c3aed" },
            { id: "hr", label: `HR (${counts.hr})`, icon: MessageSquare, color: "#ec4899" },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active ? "text-white" : "text-muted-foreground hover:text-foreground border border-border hover:bg-muted/30"
                }`}
                style={active ? { background: tab.color ? `linear-gradient(135deg, ${tab.color}, ${tab.color}99)` : "linear-gradient(135deg, #4f46e5, #7c3aed)" } : {}}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {filtered.map((q) => (
            <QuestionCard key={q.id} q={q} />
          ))}
        </div>

        {/* Progress tracker */}
        <div className="mt-8 p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Preparation Progress</h3>
            <span className="text-xs text-muted-foreground">3/{questions.length} reviewed</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(3 / questions.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Keep reviewing! Candidates who practice 20+ questions are 3× more likely to pass technical screens.</p>
        </div>
      </div>
    </div>
  );
}
