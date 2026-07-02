import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Download, Copy, RefreshCw, Mail, Loader2, Check, ChevronDown } from "lucide-react";

const tones = ["Professional", "Enthusiastic", "Formal", "Conversational"];
const lengths = ["Short (200 words)", "Medium (350 words)", "Long (500 words)"];

const generatedLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Engineer position at Stripe. With over six years of experience building high-performance web applications and a proven track record of leading cross-functional teams, I am confident that I would be a valuable addition to your engineering team.

In my current role at Acme Corp, I have led the development of real-time dashboards serving 300,000+ daily active users, achieving a 45% reduction in bundle size through strategic code splitting and lazy loading. I have a deep passion for crafting exceptional user experiences that combine technical excellence with intuitive design—values that align perfectly with Stripe's mission to increase the GDP of the internet.

What excites me most about this opportunity is Stripe's commitment to building financial infrastructure for the internet. Your API-first approach and developer-centric culture resonate strongly with my own engineering philosophy. I believe my expertise in React, TypeScript, and performance optimization would directly contribute to making Stripe's products even more powerful for developers worldwide.

I would welcome the opportunity to discuss how my background and skills align with Stripe's needs. Thank you for considering my application—I look forward to the possibility of contributing to your team.

Sincerely,
Alex Johnson`;

export function CoverLetter() {
  const [jobTitle, setJobTitle] = useState("Senior Frontend Engineer");
  const [company, setCompany] = useState("Stripe");
  const [jobDesc, setJobDesc] = useState("Building world-class payment infrastructure using React, TypeScript, and Node.js.");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium (350 words)");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>AI Cover Letter Generator</h1>
          <p className="text-sm text-muted-foreground">Generate tailored cover letters that match any job description in seconds</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Config panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Mail size={14} style={{ color: "#6d61f0" }} />
                Job Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Job Title</label>
                  <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "var(--input-background)", borderColor: "var(--border)" }} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Company</label>
                  <input value={company} onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "var(--input-background)", borderColor: "var(--border)" }} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Key Job Requirements</label>
                  <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} rows={4}
                    className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:border-primary transition-colors resize-none"
                    style={{ background: "var(--input-background)", borderColor: "var(--border)" }} />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold text-sm mb-4">Writing Style</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Tone</label>
                  <div className="grid grid-cols-2 gap-2">
                    {tones.map((t) => (
                      <button key={t} onClick={() => setTone(t)}
                        className={`py-2 rounded-xl text-xs font-medium transition-all ${
                          tone === t ? "text-white" : "text-muted-foreground border hover:bg-muted/30"
                        }`}
                        style={tone === t ? { background: "linear-gradient(135deg, #4f46e5, #7c3aed)" } : { borderColor: "var(--border)" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Length</label>
                  <div className="space-y-1.5">
                    {lengths.map((l) => (
                      <button key={l} onClick={() => setLength(l)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-all ${
                          length === l ? "border" : "border border-transparent hover:bg-muted/30"
                        }`}
                        style={length === l ? { borderColor: "rgba(79,70,229,0.4)", background: "rgba(79,70,229,0.06)", color: "#6d61f0" } : {}}>
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${length === l ? "border-primary" : "border-muted-foreground/30"}`}>
                          {length === l && <div className="w-full h-full rounded-full scale-50 bg-primary" />}
                        </div>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={generate}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)", boxShadow: "0 0 25px rgba(79,70,229,0.25)" }}
            >
              {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {generating ? "Generating..." : "Generate Cover Letter"}
            </button>
          </div>

          {/* Output */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-2xl border h-full" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Mail size={14} style={{ color: "#6d61f0" }} />
                  Generated Cover Letter
                </h3>
                {generated && (
                  <div className="flex items-center gap-2">
                    <button onClick={generate} className="p-2 rounded-lg border text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
                      style={{ borderColor: "var(--border)" }}>
                      <RefreshCw size={13} />
                    </button>
                    <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:bg-muted/30"
                      style={{ borderColor: "var(--border)" }}>
                      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                      <Download size={12} />
                      Export PDF
                    </button>
                  </div>
                )}
              </div>

              {!generated && !generating && (
                <div className="h-96 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(79,70,229,0.08)" }}>
                    <Mail size={28} style={{ color: "#6d61f0" }} />
                  </div>
                  <div className="font-medium mb-2">Ready to generate</div>
                  <div className="text-sm text-muted-foreground max-w-xs">
                    Fill in the job details and click "Generate" to create your tailored cover letter
                  </div>
                </div>
              )}

              {generating && (
                <div className="h-96 flex flex-col items-center justify-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                    <Sparkles size={20} className="absolute inset-0 m-auto text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium mb-1">AI is writing your cover letter...</div>
                    <div className="text-xs text-muted-foreground">Analyzing job requirements and matching your experience</div>
                  </div>
                  {/* Typewriter effect lines */}
                  <div className="w-full max-w-sm space-y-2 px-4">
                    {[90, 75, 85, 60].map((w, i) => (
                      <motion.div key={i} initial={{ width: 0, opacity: 0 }} animate={{ width: `${w}%`, opacity: 1 }} transition={{ delay: i * 0.3, duration: 0.5 }}
                        className="h-2 rounded-full" style={{ background: "linear-gradient(90deg, rgba(79,70,229,0.3), rgba(124,58,237,0.1))" }} />
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {generated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-5 rounded-xl border mb-4" style={{ borderColor: "rgba(79,70,229,0.15)", background: "rgba(79,70,229,0.03)" }}>
                      <div className="flex items-center gap-2 text-xs font-medium mb-2" style={{ color: "#6d61f0" }}>
                        <Sparkles size={12} />
                        AI Confidence Score: 94% — Highly tailored to this role
                      </div>
                    </div>
                    <div className="rounded-xl border p-5 overflow-auto" style={{ borderColor: "var(--border)", maxHeight: "500px" }}>
                      <pre className="text-sm leading-relaxed whitespace-pre-wrap text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                        {generatedLetter}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
