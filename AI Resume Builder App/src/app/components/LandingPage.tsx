import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Sparkles, Target, FileText, Brain, Zap, Star, Check, ChevronRight, Sun, Moon, Play, Users, TrendingUp, Award } from "lucide-react";
import type { Page } from "../App";

interface LandingPageProps {
  navigate: (p: Page) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  setAuthOpen: (v: boolean) => void;
  isLoggedIn: boolean;
}

const features = [
  {
    icon: Brain,
    title: "AI Resume Generator",
    desc: "Describe your experience and let GPT-4 craft compelling, ATS-optimized bullet points that make recruiters stop scrolling.",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    icon: Target,
    title: "ATS Score Analyzer",
    desc: "Paste any job description and get an instant ATS compatibility score with keyword suggestions and resume tailoring tips.",
    gradient: "from-violet-500 to-pink-600",
  },
  {
    icon: FileText,
    title: "50+ Premium Templates",
    desc: "Choose from Google-style, minimal ATS, executive, creative, and startup templates. All recruiter-approved.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Sparkles,
    title: "AI Cover Letters",
    desc: "Generate tailored cover letters that match each job's tone and requirements in under 30 seconds.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "Interview Preparation",
    desc: "Get role-specific technical, behavioral, and HR questions generated from your resume and target job.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Resume Analytics",
    desc: "Track ATS score, readability, keyword density, and recruiter appeal with beautiful real-time charts.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const stats = [
  { value: "2.4M+", label: "Resumes Created" },
  { value: "94%", label: "Interview Rate" },
  { value: "4.9★", label: "User Rating" },
  { value: "180+", label: "Countries" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    avatar: "SC",
    text: "ResumeAI Pro helped me land my dream job at Google. The ATS analyzer boosted my match score from 61% to 94% in minutes.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "Product Manager @ Stripe",
    avatar: "MW",
    text: "The AI-generated bullet points are incredible. They transformed my bland job descriptions into compelling impact statements.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Data Scientist @ OpenAI",
    avatar: "PP",
    text: "I used ResumeAI Pro to apply to 12 companies. Got 9 interviews. The tailored cover letters made all the difference.",
    rating: 5,
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    features: ["Unlimited resumes", "12 Indian templates", "PDF export", "ATS score check", "AI cover letter", "Interview prep"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Professional",
    price: "Free",
    period: "forever",
    features: ["Everything in Starter", "Drag & drop builder", "AI content generation", "ATS optimizer", "Resume analytics", "All template styles", "No watermark", "Priority features"],
    cta: "Start Building Free",
    highlight: true,
  },
  {
    name: "Community",
    price: "Free",
    period: "forever",
    features: ["All Professional features", "Share your resume link", "Community templates", "Export as DOCX / PNG", "Dark & Light mode", "Mobile friendly", "Offline support", "Open source"],
    cta: "Join Free",
    highlight: false,
  },
];

function ResumePreviewMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}>
        {/* Header bar */}
        <div className="h-8 flex items-center gap-1.5 px-3 border-b border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <div className="flex-1 mx-3 h-4 rounded bg-white/10" />
        </div>
        {/* Resume content */}
        <div className="p-5 space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <div className="h-5 w-44 rounded" style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }} />
            <div className="h-3 w-32 rounded bg-white/20" />
            <div className="h-2.5 w-52 rounded bg-white/10" />
          </div>
          {/* Section */}
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-white/30" />
            <div className="space-y-1">
              <div className="h-2 w-full rounded bg-white/15" />
              <div className="h-2 w-5/6 rounded bg-white/10" />
              <div className="h-2 w-4/5 rounded bg-white/10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-white/30" />
            <div className="flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Node.js", "Python", "AWS"].map((s) => (
                <span key={s} className="px-2 py-0.5 rounded text-[9px] font-medium text-white/80 border border-white/20" style={{ background: "rgba(79,70,229,0.3)" }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-white/30" />
            <div className="space-y-1">
              <div className="h-2 w-full rounded bg-white/15" />
              <div className="h-2 w-4/6 rounded bg-white/10" />
            </div>
          </div>
        </div>
        {/* ATS badge */}
        <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-emerald-400/50 shadow-lg"
          style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
          <span className="text-white font-bold text-sm">94%</span>
          <span className="text-white/80 text-[8px]">ATS</span>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 top-12 px-3 py-2 rounded-xl border border-white/10 shadow-lg text-xs font-medium text-white"
        style={{ background: "rgba(79,70,229,0.8)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-1.5">
          <Brain size={12} />
          AI Enhanced ✨
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 bottom-16 px-3 py-2 rounded-xl border border-white/10 shadow-lg text-xs font-medium text-white"
        style={{ background: "rgba(16,185,129,0.8)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-1.5">
          <Target size={12} />
          Interview Ready
        </div>
      </motion.div>
    </div>
  );
}

export function LandingPage({ navigate, darkMode, setDarkMode, setAuthOpen }: LandingPageProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen" style={{ background: darkMode ? "#0a0a0f" : "#f8f7ff" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: darkMode ? "rgba(10,10,15,0.85)" : "rgba(248,247,255,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(79,70,229,0.1)"
        }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)" }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>ResumeAI Pro</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["Features", "Templates", "Pricing", "Blog"].map((item) => (
              <button key={item} className="text-muted-foreground hover:text-foreground transition-colors">{item}</button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setAuthOpen(true)} className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all">
              Sign In
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #4f46e5, transparent)" }} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            animate={{ scale: [1.1, 1, 1.1], x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          </motion.div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: darkMode
            ? "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)"
            : "linear-gradient(rgba(79,70,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
              style={{
                background: "rgba(79,70,229,0.1)",
                borderColor: "rgba(79,70,229,0.3)",
                color: "#6d61f0"
              }}
            >
              <Sparkles size={14} />
              Powered by GPT-4 · Used by 2.4M+ professionals
              <ChevronRight size={14} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: darkMode ? "#e8e6ff" : "#0f0e1a" }}
            >
              Build Professional{" "}
              <span className="relative">
                <span style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>Resumes</span>
              </span>
              {" "}in Seconds with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg leading-relaxed mb-8 text-muted-foreground max-w-xl"
            >
              Generate ATS-friendly resumes, optimize for any job, and land interviews faster using advanced AI that understands what recruiters want.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 shadow-lg"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)", boxShadow: "0 0 30px rgba(79,70,229,0.4)" }}
              >
                <Sparkles size={18} />
                Create Resume — Free
              </button>
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border transition-all hover:bg-muted/30"
                style={{ borderColor: darkMode ? "rgba(255,255,255,0.15)" : "rgba(79,70,229,0.3)", color: darkMode ? "#e8e6ff" : "#0f0e1a" }}
              >
                <Play size={16} />
                Watch Demo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["SC", "MW", "PP", "JL", "AR"].map((a, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{
                      background: ["#4f46e5", "#7c3aed", "#ec4899", "#06b6d4", "#10b981"][i],
                      borderColor: darkMode ? "#0a0a0f" : "#f8f7ff"
                    }}>
                    {a}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                  <span className="text-sm font-semibold ml-1">4.9</span>
                </div>
                <div className="text-xs text-muted-foreground">from 48,000+ reviews</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block"
          >
            <ResumePreviewMockup />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y" style={{ borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(79,70,229,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-1" style={{
                  fontFamily: "var(--font-display)",
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-4"
              style={{ background: "rgba(79,70,229,0.08)", borderColor: "rgba(79,70,229,0.2)", color: "#6d61f0" }}
            >
              <Zap size={13} />
              Everything you need
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AI Features Built for{" "}
              <span style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Career Success
              </span>
            </motion.h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Six powerful AI tools that transform how you present yourself to employers.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-6 rounded-2xl border transition-all cursor-pointer group"
                  style={{
                    background: darkMode ? "rgba(255,255,255,0.03)" : "#ffffff",
                    borderColor: darkMode ? "rgba(255,255,255,0.07)" : "rgba(79,70,229,0.1)",
                    boxShadow: darkMode ? "none" : "0 4px 20px rgba(79,70,229,0.06)"
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: "#6d61f0" }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: darkMode ? "rgba(79,70,229,0.04)" : "rgba(79,70,229,0.03)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Loved by{" "}
              <span style={{ background: "linear-gradient(135deg, #4f46e5, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Top Professionals
              </span>
            </h2>
            <p className="text-muted-foreground">Join thousands who landed their dream jobs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.04)" : "#ffffff",
                  borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(79,70,229,0.1)"
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 text-muted-foreground">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Simple, Transparent{" "}
              <span style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Pricing
              </span>
            </h2>
            <p className="text-muted-foreground">Start free, upgrade when you're ready</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl border transition-all"
                style={{
                  background: plan.highlight
                    ? "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.1))"
                    : darkMode ? "rgba(255,255,255,0.03)" : "#ffffff",
                  borderColor: plan.highlight ? "#6d61f0" : darkMode ? "rgba(255,255,255,0.07)" : "rgba(79,70,229,0.1)",
                  boxShadow: plan.highlight ? "0 0 40px rgba(79,70,229,0.2)" : "none"
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                    ✦ Recommended
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-semibold text-sm text-muted-foreground mb-2">{plan.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#10b981" }}>{plan.price}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>Always Free</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: plan.highlight ? "rgba(79,70,229,0.2)" : "rgba(16,185,129,0.15)" }}>
                        <Check size={10} style={{ color: plan.highlight ? "#6d61f0" : "#10b981" }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={plan.highlight ? {
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    color: "white",
                    boxShadow: "0 0 20px rgba(79,70,229,0.3)"
                  } : {
                    background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(79,70,229,0.06)",
                    color: darkMode ? "#e8e6ff" : "#4f46e5",
                    border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(79,70,229,0.2)"}`
                  }}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-16 rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)" }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
              backgroundSize: "25px 25px"
            }} />
            <div className="relative">
              <Award size={40} className="text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Join 2.4 million professionals who built their careers with ResumeAI Pro
              </p>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-8 py-4 bg-white rounded-xl font-bold text-indigo-600 hover:opacity-95 transition-all hover:scale-105 shadow-lg"
              >
                Start Building — It's Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12" style={{ borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(79,70,229,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)" }}>
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-bold" style={{ fontFamily: "var(--font-display)" }}>ResumeAI Pro</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2026 ResumeAI Pro. Built with AI for the next generation.</div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy</button>
              <button className="hover:text-foreground transition-colors">Terms</button>
              <button className="hover:text-foreground transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
