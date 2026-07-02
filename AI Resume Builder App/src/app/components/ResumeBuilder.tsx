import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Plus, Trash2, GripVertical, Sparkles, Download, ChevronDown, ChevronUp,
  User, Briefcase, GraduationCap, Code, Award, FolderOpen, Star, Loader2,
  FileText, Palette, X, Check,
} from "lucide-react";
import { allTemplates, type ResumeTemplate } from "./Templates";
import type { Page } from "../App";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
  field: string;
}

interface ProjectEntry {
  id: string;
  name: string;
  tech: string;
  link: string;
  description: string;
}

interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
}

interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  year: string;
}

type SectionType = "summary" | "experience" | "education" | "skills" | "projects" | "certifications" | "achievements";

interface Section {
  id: string;
  type: SectionType;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  visible: boolean;
  order: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const initialSections: Section[] = [
  { id: "summary",        type: "summary",        label: "Professional Summary", icon: User,          visible: true,  order: 0 },
  { id: "experience",     type: "experience",      label: "Work Experience",      icon: Briefcase,     visible: true,  order: 1 },
  { id: "education",      type: "education",       label: "Education",            icon: GraduationCap, visible: true,  order: 2 },
  { id: "skills",         type: "skills",          label: "Skills",               icon: Code,          visible: true,  order: 3 },
  { id: "projects",       type: "projects",        label: "Projects",             icon: FolderOpen,    visible: true,  order: 4 },
  { id: "certifications", type: "certifications",  label: "Certifications",       icon: Award,         visible: true,  order: 5 },
  { id: "achievements",   type: "achievements",    label: "Achievements",         icon: Star,          visible: true,  order: 6 },
];

// ─── Shared sub-components ───────────────────────────────────────────────────

function InputField({ label, value, onChange, placeholder, span = 1 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; span?: number;
}) {
  return (
    <div className={span === 2 ? "col-span-2" : ""}>
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors"
        style={{ background: "var(--input-background)", borderColor: "var(--border)" }}
      />
    </div>
  );
}

function AddItemButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all mt-3"
      style={{ borderColor: "var(--border)" }}>
      <Plus size={13} /> {label}
    </button>
  );
}

// ─── DraggableSection ────────────────────────────────────────────────────────

function DraggableSection({ section, index, moveSection, children }: {
  section: Section; index: number;
  moveSection: (from: number, to: number) => void;
  children: React.ReactNode;
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "SECTION", item: { index },
    collect: (m) => ({ isDragging: m.isDragging() }),
  });
  const [, drop] = useDrop({
    accept: "SECTION",
    hover: (item: { index: number }) => {
      if (item.index !== index) { moveSection(item.index, index); item.index = index; }
    },
  });
  return (
    <div ref={(n) => drop(n)} style={{ opacity: isDragging ? 0.4 : 1 }}>
      <div ref={(n) => dragPreview(n)}>
        <div className="flex items-start gap-2">
          <div ref={(n) => drag(n)} className="mt-4 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 transition-colors">
            <GripVertical size={16} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Section editors ─────────────────────────────────────────────────────────

function ExperienceEditor({ entries, onChange }: {
  entries: ExperienceEntry[];
  onChange: (e: ExperienceEntry[]) => void;
}) {
  const add = () => onChange([...entries, { id: uid(), title: "", company: "", location: "", period: "", bullets: [""] }]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, field: keyof ExperienceEntry, val: any) =>
    onChange(entries.map((e) => e.id === id ? { ...e, [field]: val } : e));
  const addBullet = (id: string) => onChange(entries.map((e) => e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e));
  const removeBullet = (id: string, idx: number) => onChange(entries.map((e) => e.id === id ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e));
  const updateBullet = (id: string, idx: number, val: string) =>
    onChange(entries.map((e) => e.id === id ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? val : b) } : e));

  return (
    <div className="mt-3 space-y-3">
      {entries.map((exp) => (
        <div key={exp.id} className="p-4 rounded-xl border relative group" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <button onClick={() => remove(exp.id)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
            <Trash2 size={13} />
          </button>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <InputField label="Job Title" value={exp.title} onChange={(v) => update(exp.id, "title", v)} placeholder="Software Engineer" />
            <InputField label="Company" value={exp.company} onChange={(v) => update(exp.id, "company", v)} placeholder="Google" />
            <InputField label="Location" value={exp.location} onChange={(v) => update(exp.id, "location", v)} placeholder="Bengaluru, India" />
            <InputField label="Period" value={exp.period} onChange={(v) => update(exp.id, "period", v)} placeholder="Jun 2021 – Present" />
          </div>
          <div className="text-xs text-muted-foreground mb-1.5 font-medium">Key Responsibilities / Achievements</div>
          {exp.bullets.map((bullet, j) => (
            <div key={j} className="flex items-start gap-2 mb-1.5">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#6d61f0" }} />
              <input
                type="text" value={bullet} placeholder="Describe your impact with numbers..."
                onChange={(e) => updateBullet(exp.id, j, e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-lg border text-xs outline-none focus:border-primary transition-colors"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              />
              {exp.bullets.length > 1 && (
                <button onClick={() => removeBullet(exp.id, j)} className="mt-1.5 text-muted-foreground hover:text-destructive transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          <button onClick={() => addBullet(exp.id)} className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
            <Plus size={10} /> Add bullet point
          </button>
        </div>
      ))}
      <AddItemButton label="Add Work Experience" onClick={add} />
    </div>
  );
}

function EducationEditor({ entries, onChange }: {
  entries: EducationEntry[];
  onChange: (e: EducationEntry[]) => void;
}) {
  const add = () => onChange([...entries, { id: uid(), degree: "", institution: "", year: "", grade: "", field: "" }]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, field: keyof EducationEntry, val: string) =>
    onChange(entries.map((e) => e.id === id ? { ...e, [field]: val } : e));

  return (
    <div className="mt-3 space-y-3">
      {entries.map((edu) => (
        <div key={edu.id} className="p-4 rounded-xl border relative group" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <button onClick={() => remove(edu.id)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
            <Trash2 size={13} />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Degree" value={edu.degree} onChange={(v) => update(edu.id, "degree", v)} placeholder="B.Tech / B.Sc / MBA" />
            <InputField label="Field of Study" value={edu.field} onChange={(v) => update(edu.id, "field", v)} placeholder="Computer Science" />
            <InputField label="Institution" value={edu.institution} onChange={(v) => update(edu.id, "institution", v)} placeholder="VIT University, Vellore" span={2} />
            <InputField label="Year" value={edu.year} onChange={(v) => update(edu.id, "year", v)} placeholder="2017–2021" />
            <InputField label="Grade / CGPA / %" value={edu.grade} onChange={(v) => update(edu.id, "grade", v)} placeholder="8.6 CGPA / 85%" />
          </div>
        </div>
      ))}
      <AddItemButton label="Add Education" onClick={add} />
    </div>
  );
}

function SkillsEditor({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const val = input.trim();
    if (val && !skills.includes(val)) { onChange([...skills, val]); }
    setInput("");
  };
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2 mb-3 min-h-8">
        {skills.map((skill, i) => (
          <motion.div key={skill} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
            style={{ background: "rgba(79,70,229,0.08)", borderColor: "rgba(79,70,229,0.25)", color: "#6d61f0" }}>
            {skill}
            <button onClick={() => onChange(skills.filter((_, j) => j !== i))} className="hover:text-red-500 transition-colors">
              <X size={10} />
            </button>
          </motion.div>
        ))}
        {skills.length === 0 && <div className="text-xs text-muted-foreground italic">No skills added yet</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text" value={input} placeholder="e.g. React, Python, AWS..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors"
          style={{ background: "var(--input-background)", borderColor: "var(--border)" }}
        />
        <button onClick={add} disabled={!input.trim()}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white disabled:opacity-40 transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
          Add
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">Press Enter or click Add to insert a skill</p>
    </div>
  );
}

function ProjectsEditor({ entries, onChange }: {
  entries: ProjectEntry[];
  onChange: (e: ProjectEntry[]) => void;
}) {
  const add = () => onChange([...entries, { id: uid(), name: "", tech: "", link: "", description: "" }]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, field: keyof ProjectEntry, val: string) =>
    onChange(entries.map((e) => e.id === id ? { ...e, [field]: val } : e));

  return (
    <div className="mt-3 space-y-3">
      {entries.map((proj) => (
        <div key={proj.id} className="p-4 rounded-xl border relative group" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <button onClick={() => remove(proj.id)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
            <Trash2 size={13} />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Project Name" value={proj.name} onChange={(v) => update(proj.id, "name", v)} placeholder="Resume Builder App" span={2} />
            <InputField label="Technologies Used" value={proj.tech} onChange={(v) => update(proj.id, "tech", v)} placeholder="React, Node.js, MongoDB" span={2} />
            <InputField label="GitHub / Live Link" value={proj.link} onChange={(v) => update(proj.id, "link", v)} placeholder="github.com/yourname/project" span={2} />
          </div>
          <div className="mt-2">
            <label className="block text-xs text-muted-foreground mb-1">Description</label>
            <textarea value={proj.description} rows={2}
              onChange={(e) => update(proj.id, "description", e.target.value)}
              placeholder="Built a full-stack app that does X, resulting in Y..."
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors resize-none"
              style={{ background: "var(--card)", borderColor: "var(--border)" }} />
          </div>
        </div>
      ))}
      <AddItemButton label="Add Project" onClick={add} />
    </div>
  );
}

function CertificationsEditor({ entries, onChange }: {
  entries: CertificationEntry[];
  onChange: (e: CertificationEntry[]) => void;
}) {
  const add = () => onChange([...entries, { id: uid(), name: "", issuer: "", year: "", credentialId: "" }]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, field: keyof CertificationEntry, val: string) =>
    onChange(entries.map((e) => e.id === id ? { ...e, [field]: val } : e));

  return (
    <div className="mt-3 space-y-3">
      {entries.map((cert) => (
        <div key={cert.id} className="p-4 rounded-xl border relative group" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <button onClick={() => remove(cert.id)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
            <Trash2 size={13} />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Certification Name" value={cert.name} onChange={(v) => update(cert.id, "name", v)} placeholder="AWS Certified Developer" span={2} />
            <InputField label="Issuing Organisation" value={cert.issuer} onChange={(v) => update(cert.id, "issuer", v)} placeholder="Amazon Web Services" />
            <InputField label="Year" value={cert.year} onChange={(v) => update(cert.id, "year", v)} placeholder="2023" />
            <InputField label="Credential ID (optional)" value={cert.credentialId} onChange={(v) => update(cert.id, "credentialId", v)} placeholder="ABC-12345" span={2} />
          </div>
        </div>
      ))}
      <AddItemButton label="Add Certification" onClick={add} />
    </div>
  );
}

function AchievementsEditor({ entries, onChange }: {
  entries: AchievementEntry[];
  onChange: (e: AchievementEntry[]) => void;
}) {
  const add = () => onChange([...entries, { id: uid(), title: "", description: "", year: "" }]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, field: keyof AchievementEntry, val: string) =>
    onChange(entries.map((e) => e.id === id ? { ...e, [field]: val } : e));

  return (
    <div className="mt-3 space-y-3">
      {entries.map((ach) => (
        <div key={ach.id} className="p-4 rounded-xl border relative group" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          <button onClick={() => remove(ach.id)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
            <Trash2 size={13} />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Achievement Title" value={ach.title} onChange={(v) => update(ach.id, "title", v)} placeholder="Hackathon Winner / Rank 1" span={2} />
            <InputField label="Year" value={ach.year} onChange={(v) => update(ach.id, "year", v)} placeholder="2023" />
          </div>
          <div className="mt-2">
            <label className="block text-xs text-muted-foreground mb-1">Description</label>
            <textarea value={ach.description} rows={2}
              onChange={(e) => update(ach.id, "description", e.target.value)}
              placeholder="Won 1st place among 500 teams in national coding hackathon..."
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors resize-none"
              style={{ background: "var(--card)", borderColor: "var(--border)" }} />
          </div>
        </div>
      ))}
      <AddItemButton label="Add Achievement" onClick={add} />
    </div>
  );
}

// ─── Live Preview helpers ─────────────────────────────────────────────────────

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-0.5 mt-1.5">
      <div className="font-bold tracking-wide" style={{ color, fontSize: "7.5px" }}>{label}</div>
      <div className="flex-1 h-px" style={{ background: color + "35" }} />
    </div>
  );
}

function ElegantHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className="mt-1.5 mb-0.5">
      <div className="font-bold italic" style={{ color, fontSize: "8px" }}>{label}</div>
      <div className="h-px mt-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  );
}

// ─── LivePreview ─────────────────────────────────────────────────────────────

function LivePreview({ data, template }: { data: ResumeData; template: ResumeTemplate }) {
  const pc = template.primaryColor;
  const ac = template.accentColor;

  const renderExperience = (style: "dot" | "arrow" | "diamond" = "dot") =>
    data.experiences.map((exp, i) => (
      <div key={i} className="mb-1.5">
        <div className="flex justify-between">
          <span className="font-bold" style={{ fontSize: "7.5px" }}>{exp.title}{exp.company ? ` — ${exp.company}` : ""}</span>
          <span style={{ fontSize: "6px", color: "#9ca3af" }}>{exp.period}</span>
        </div>
        {exp.location && <div style={{ fontSize: "6px", color: ac }}>{exp.location}</div>}
        {exp.bullets.filter(Boolean).map((b, j) => (
          <div key={j} className="flex gap-1" style={{ fontSize: "6.5px", color: "#4b5563" }}>
            <span style={{ color: pc }}>{style === "arrow" ? "▸" : style === "diamond" ? "◆" : "•"}</span>{b}
          </div>
        ))}
      </div>
    ));

  const renderEducation = () =>
    data.education.map((edu, i) => (
      <div key={i} className="mb-1">
        <div className="font-semibold" style={{ fontSize: "7px" }}>
          {edu.degree}{edu.field ? ` — ${edu.field}` : ""}
        </div>
        <div style={{ fontSize: "6.5px", color: "#6b7280" }}>
          {edu.institution}{edu.year ? ` | ${edu.year}` : ""}{edu.grade ? ` | ${edu.grade}` : ""}
        </div>
      </div>
    ));

  const renderSkillTags = () => (
    <div className="flex flex-wrap gap-1">
      {data.skills.map((s, i) => (
        <span key={i} className="px-1.5 py-0.5 rounded" style={{ background: pc + "15", color: pc, fontSize: "5.5px", fontWeight: 600 }}>{s}</span>
      ))}
    </div>
  );

  const renderProjects = () =>
    data.projects.map((p, i) => (
      <div key={i} className="mb-1">
        <div className="font-semibold" style={{ fontSize: "7px" }}>{p.name}{p.tech ? ` | ${p.tech}` : ""}</div>
        {p.description && <div style={{ fontSize: "6.5px", color: "#6b7280" }}>{p.description}</div>}
      </div>
    ));

  const renderCertifications = () =>
    data.certifications.map((c, i) => (
      <div key={i} className="mb-0.5 flex gap-1" style={{ fontSize: "6.5px" }}>
        <span style={{ color: pc }}>•</span>
        <span className="font-medium">{c.name}</span>
        {c.issuer && <span style={{ color: "#9ca3af" }}>— {c.issuer}</span>}
        {c.year && <span style={{ color: "#9ca3af" }}>({c.year})</span>}
      </div>
    ));

  const renderAchievements = () =>
    data.achievements.map((a, i) => (
      <div key={i} className="mb-0.5 flex gap-1" style={{ fontSize: "6.5px" }}>
        <span style={{ color: pc }}>★</span>
        <span className="font-medium">{a.title}</span>
        {a.year && <span style={{ color: "#9ca3af" }}>({a.year})</span>}
        {a.description && <span style={{ color: "#6b7280" }}>— {a.description}</span>}
      </div>
    ));

  // ── Sidebar / Creative ──
  if (template.style === "sidebar" || template.style === "creative") {
    return (
      <div className="bg-white w-full h-full flex overflow-hidden" style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", color: "#1a1a1a" }}>
        <div className="w-28 flex-shrink-0 p-3 flex flex-col gap-1.5" style={{ background: pc, color: "white" }}>
          <div className="w-12 h-12 rounded-full bg-white/25 mx-auto flex items-center justify-center font-black text-lg">{data.personal.name.charAt(0) || "A"}</div>
          <div className="text-center">
            <div className="font-bold leading-tight" style={{ fontSize: "8px" }}>{data.personal.name || "Your Name"}</div>
            <div className="text-white/70 mt-0.5" style={{ fontSize: "6px" }}>{data.personal.title}</div>
          </div>
          <div className="border-t border-white/20 pt-1.5 mt-0.5">
            <div className="font-bold text-white/80 mb-1" style={{ fontSize: "7px" }}>CONTACT</div>
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map((v, i) => (
              <div key={i} className="text-white/70 mb-0.5" style={{ fontSize: "6px" }}>{v}</div>
            ))}
          </div>
          {data.skills.length > 0 && (
            <div className="border-t border-white/20 pt-1.5">
              <div className="font-bold text-white/80 mb-1" style={{ fontSize: "7px" }}>SKILLS</div>
              {data.skills.slice(0, 7).map((s, i) => (
                <div key={i} className="mb-0.5">
                  <div className="text-white/80 mb-0.5" style={{ fontSize: "6px" }}>{s}</div>
                  <div className="h-1 rounded-full bg-white/15"><div className="h-full rounded-full bg-white/60" style={{ width: `${70 + (i % 4) * 7}%` }} /></div>
                </div>
              ))}
            </div>
          )}
          {data.certifications.length > 0 && (
            <div className="border-t border-white/20 pt-1.5">
              <div className="font-bold text-white/80 mb-1" style={{ fontSize: "7px" }}>CERTS</div>
              {data.certifications.slice(0, 3).map((c, i) => (
                <div key={i} className="text-white/70" style={{ fontSize: "5.5px" }}>• {c.name}</div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 p-3 overflow-hidden">
          {data.personal.summary && <><SectionHeader label="SUMMARY" color={pc} /><div style={{ fontSize: "6.5px", color: "#6b7280", lineHeight: 1.4 }}>{data.personal.summary}</div></>}
          {data.experiences.length > 0 && <><SectionHeader label="EXPERIENCE" color={pc} />{renderExperience("arrow")}</>}
          {data.education.length > 0 && <><SectionHeader label="EDUCATION" color={pc} />{renderEducation()}</>}
          {data.projects.length > 0 && <><SectionHeader label="PROJECTS" color={pc} />{renderProjects()}</>}
          {data.achievements.length > 0 && <><SectionHeader label="ACHIEVEMENTS" color={pc} />{renderAchievements()}</>}
        </div>
      </div>
    );
  }

  // ── Government / Biodata ──
  if (template.style === "government") {
    return (
      <div className="bg-white w-full h-full px-4 py-3 overflow-hidden" style={{ fontFamily: "Times New Roman, serif", fontSize: "7px", color: "#000" }}>
        <div className="text-center mb-2 pb-1.5 border-b-2" style={{ borderColor: pc }}>
          <div className="font-bold uppercase" style={{ fontSize: "13px", color: pc }}>{data.personal.name || "Your Name"}</div>
          <div style={{ fontSize: "8px" }}>{data.personal.title}</div>
          <div style={{ fontSize: "6.5px" }}>{[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}</div>
        </div>
        {data.personal.summary && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Career Objective</div>
            <div style={{ fontSize: "6.5px", color: "#374151" }}>{data.personal.summary}</div>
          </div>
        )}
        {data.education.length > 0 && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Educational Qualifications</div>
            <table className="w-full border-collapse" style={{ fontSize: "6.5px" }}>
              <thead><tr style={{ background: pc + "15" }}>
                {["Degree", "Institution", "Year", "Grade"].map((h) => <td key={h} className="px-1 py-0.5 font-semibold">{h}</td>)}
              </tr></thead>
              <tbody>{data.education.map((e, i) => (
                <tr key={i} className="border-t" style={{ borderColor: "#eee" }}>
                  <td className="px-1 py-0.5">{e.degree} {e.field}</td>
                  <td className="px-1 py-0.5">{e.institution}</td>
                  <td className="px-1 py-0.5">{e.year}</td>
                  <td className="px-1 py-0.5">{e.grade}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        {data.experiences.length > 0 && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Work Experience</div>
            {renderExperience()}
          </div>
        )}
        {data.skills.length > 0 && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Technical Skills</div>
            <div style={{ fontSize: "6.5px" }}>{data.skills.join(", ")}</div>
          </div>
        )}
        {data.projects.length > 0 && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Projects</div>
            {renderProjects()}
          </div>
        )}
        {data.certifications.length > 0 && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Certifications</div>
            {renderCertifications()}
          </div>
        )}
        {data.achievements.length > 0 && (
          <div className="mb-1.5">
            <div className="font-bold uppercase border-b mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>Achievements</div>
            {renderAchievements()}
          </div>
        )}
        <div className="mt-1" style={{ fontSize: "6px", color: "#6b7280", fontStyle: "italic" }}>
          I hereby declare that the above information is true to the best of my knowledge.
        </div>
      </div>
    );
  }

  // ── Bold / IIT ──
  if (template.style === "bold") {
    return (
      <div className="bg-white w-full h-full overflow-hidden" style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", color: "#1a1a1a" }}>
        <div className="px-4 py-3 text-white" style={{ background: pc }}>
          <div className="font-black tracking-tight" style={{ fontSize: "14px" }}>{data.personal.name || "Your Name"}</div>
          <div className="text-white/80 mt-0.5" style={{ fontSize: "8px" }}>{data.personal.title}</div>
          <div className="flex gap-3 text-white/60 mt-0.5" style={{ fontSize: "6px" }}>
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
          </div>
        </div>
        <div className="px-4 py-2 space-y-1.5">
          {data.skills.length > 0 && (
            <div>
              <div className="font-black border-b-2 mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}> SKILLS</div>
              <div className="flex flex-wrap gap-1">{data.skills.map((s, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded text-white font-bold" style={{ background: pc, fontSize: "5.5px" }}>{s}</span>
              ))}</div>
            </div>
          )}
          {data.experiences.length > 0 && (
            <div>
              <div className="font-black border-b-2 mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>EXPERIENCE</div>
              {renderExperience("arrow")}
            </div>
          )}
          {data.education.length > 0 && (
            <div>
              <div className="font-black border-b-2 mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>EDUCATION</div>
              {renderEducation()}
            </div>
          )}
          {data.projects.length > 0 && (
            <div>
              <div className="font-black border-b-2 mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>PROJECTS</div>
              {renderProjects()}
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <div className="font-black border-b-2 mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>CERTIFICATIONS</div>
              {renderCertifications()}
            </div>
          )}
          {data.achievements.length > 0 && (
            <div>
              <div className="font-black border-b-2 mb-0.5" style={{ fontSize: "8px", color: pc, borderColor: ac }}>ACHIEVEMENTS</div>
              {renderAchievements()}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Elegant / Executive ──
  if (template.style === "elegant" || template.style === "executive") {
    return (
      <div className="bg-white w-full h-full overflow-hidden" style={{ fontFamily: "Georgia, serif", fontSize: "7px", color: "#1a1a1a" }}>
        <div className="px-4 py-3 flex justify-between border-b" style={{ borderColor: pc + "40" }}>
          <div>
            <div className="font-bold" style={{ fontSize: "14px", color: pc }}>{data.personal.name || "Your Name"}</div>
            <div style={{ fontSize: "8px", color: ac }}>{data.personal.title}</div>
          </div>
          <div className="text-right space-y-0.5" style={{ fontSize: "6.5px", color: "#6b7280" }}>
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map((v, i) => <div key={i}>{v}</div>)}
          </div>
        </div>
        <div className="px-4 py-2">
          {data.personal.summary && <><ElegantHeader label="Professional Summary" color={pc} /><div className="italic" style={{ fontSize: "6.5px", color: "#6b7280", lineHeight: 1.5 }}>{data.personal.summary}</div></>}
          {data.experiences.length > 0 && <><ElegantHeader label="Career Experience" color={pc} />{renderExperience("diamond")}</>}
          {data.education.length > 0 && <><ElegantHeader label="Education" color={pc} />{renderEducation()}</>}
          {data.skills.length > 0 && <><ElegantHeader label="Core Competencies" color={pc} /><div style={{ fontSize: "6.5px" }}>{data.skills.map((s, i) => <span key={i} style={{ color: ac }}>{s}{i < data.skills.length - 1 ? " • " : ""}</span>)}</div></>}
          {data.projects.length > 0 && <><ElegantHeader label="Notable Projects" color={pc} />{renderProjects()}</>}
          {data.certifications.length > 0 && <><ElegantHeader label="Certifications" color={pc} />{renderCertifications()}</>}
          {data.achievements.length > 0 && <><ElegantHeader label="Achievements & Awards" color={pc} />{renderAchievements()}</>}
        </div>
      </div>
    );
  }

  // ── Compact / Service ──
  if (template.style === "compact") {
    return (
      <div className="bg-white w-full h-full overflow-hidden" style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "7px", color: "#1a1a1a" }}>
        <div className="px-4 py-2.5 border-b-2" style={{ borderColor: pc }}>
          <div className="font-bold" style={{ fontSize: "14px", color: pc }}>{data.personal.name || "Your Name"}</div>
          <div style={{ fontSize: "8px", color: "#6b7280" }}>{data.personal.title}</div>
          <div className="flex gap-2 mt-0.5" style={{ fontSize: "6px", color: "#9ca3af" }}>
            {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}
          </div>
        </div>
        <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-1">
          <div>
            {data.skills.length > 0 && <><SectionHeader label="TECHNICAL SKILLS" color={pc} />{renderSkillTags()}</>}
            {data.projects.length > 0 && <><SectionHeader label="PROJECTS" color={pc} />{renderProjects()}</>}
            {data.certifications.length > 0 && <><SectionHeader label="CERTIFICATIONS" color={pc} />{renderCertifications()}</>}
            {data.achievements.length > 0 && <><SectionHeader label="ACHIEVEMENTS" color={pc} />{renderAchievements()}</>}
          </div>
          <div>
            {data.experiences.length > 0 && <><SectionHeader label="EXPERIENCE" color={pc} />{renderExperience("arrow")}</>}
            {data.education.length > 0 && <><SectionHeader label="EDUCATION" color={pc} />{renderEducation()}</>}
          </div>
        </div>
      </div>
    );
  }

  // ── Minimal / Fresher ──
  if (template.style === "minimal") {
    return (
      <div className="bg-white w-full h-full px-4 py-3 overflow-hidden" style={{ fontFamily: "Arial, sans-serif", fontSize: "7px", color: "#1a1a1a" }}>
        <div className="mb-2 pb-1.5" style={{ borderBottom: `2px solid ${pc}` }}>
          <div className="font-bold" style={{ fontSize: "14px" }}>{data.personal.name || "Your Name"}</div>
          <div style={{ fontSize: "8px", color: "#6b7280" }}>{data.personal.title}</div>
          <div style={{ fontSize: "6.5px", color: "#9ca3af" }}>{[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(" | ")}</div>
        </div>
        {data.personal.summary && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Objective</div><div style={{ fontSize: "6.5px", color: "#6b7280" }}>{data.personal.summary}</div></div>)}
        {data.education.length > 0 && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Education</div>{renderEducation()}</div>)}
        {data.skills.length > 0 && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Technical Skills</div><div style={{ fontSize: "6.5px" }}>{data.skills.join(" · ")}</div></div>)}
        {data.experiences.length > 0 && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Internships / Experience</div>{renderExperience()}</div>)}
        {data.projects.length > 0 && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Projects</div>{renderProjects()}</div>)}
        {data.certifications.length > 0 && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Certifications</div>{renderCertifications()}</div>)}
        {data.achievements.length > 0 && (<div className="mb-1"><div className="font-bold uppercase tracking-wider" style={{ fontSize: "7.5px", color: pc }}>Achievements</div>{renderAchievements()}</div>)}
      </div>
    );
  }

  // ── Default: classic / modern / IT ──
  return (
    <div className="bg-white w-full h-full overflow-hidden" style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: "7px", color: "#1a1a1a" }}>
      <div className="px-4 py-3 text-white" style={{ background: `linear-gradient(135deg, ${pc}, ${ac})` }}>
        <div className="font-bold tracking-wide" style={{ fontSize: "14px" }}>{data.personal.name || "Your Name"}</div>
        <div className="text-white/80 mt-0.5" style={{ fontSize: "8px" }}>{data.personal.title}</div>
        <div className="flex gap-3 text-white/60 mt-0.5" style={{ fontSize: "6px" }}>
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
        </div>
      </div>
      <div className="px-4 py-2 space-y-1">
        {data.personal.summary && (<div><SectionHeader label="PROFESSIONAL SUMMARY" color={pc} /><div style={{ fontSize: "6.5px", color: "#6b7280" }}>{data.personal.summary}</div></div>)}
        {data.experiences.length > 0 && (<div><SectionHeader label="WORK EXPERIENCE" color={pc} />{renderExperience()}</div>)}
        {data.education.length > 0 && (<div><SectionHeader label="EDUCATION" color={pc} />{renderEducation()}</div>)}
        {data.skills.length > 0 && (<div><SectionHeader label="TECHNICAL SKILLS" color={pc} />{renderSkillTags()}</div>)}
        {data.projects.length > 0 && (<div><SectionHeader label="PROJECTS" color={pc} />{renderProjects()}</div>)}
        {data.certifications.length > 0 && (<div><SectionHeader label="CERTIFICATIONS" color={pc} />{renderCertifications()}</div>)}
        {data.achievements.length > 0 && (<div><SectionHeader label="ACHIEVEMENTS" color={pc} />{renderAchievements()}</div>)}
      </div>
    </div>
  );
}

// ─── Main data shape ──────────────────────────────────────────────────────────

interface ResumeData {
  personal: {
    name: string; title: string; email: string;
    phone: string; location: string; linkedin: string; summary: string;
  };
  skills: string[];
  experiences: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  achievements: AchievementEntry[];
}

const defaultData: ResumeData = {
  personal: {
    name: "Alex Johnson", title: "Senior Frontend Engineer",
    email: "alex@example.com", phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka", linkedin: "linkedin.com/in/alexjohnson",
    summary: "Results-driven Senior Frontend Engineer with 6+ years of experience building scalable web applications. Proven track record of leading teams, optimizing performance, and delivering products that delight users.",
  },
  skills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  experiences: [
    { id: "e1", title: "Senior Frontend Engineer", company: "Acme Corp", location: "Bengaluru", period: "Jan 2022 – Present",
      bullets: ["Led development of real-time dashboard serving 300K+ daily active users", "Reduced bundle size by 45% through code splitting and lazy loading"] },
    { id: "e2", title: "Frontend Developer", company: "StartupXYZ", location: "Hyderabad", period: "Jun 2019 – Dec 2021",
      bullets: ["Built React component library used across 5 product teams"] },
  ],
  education: [
    { id: "ed1", degree: "B.Tech", field: "Computer Science", institution: "VIT University, Vellore", year: "2015–2019", grade: "8.6 CGPA" },
  ],
  projects: [
    { id: "p1", name: "Resume Builder App", tech: "React, Node.js, MongoDB", link: "github.com/alex/resumeai", description: "AI-powered resume builder with ATS optimization for 10K+ users." },
  ],
  certifications: [],
  achievements: [],
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function ResumeBuilder({ navigate }: ResumeBuilderProps) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [expanded, setExpanded] = useState<string>("experience");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    () => localStorage.getItem("selectedTemplate") || "classic-india"
  );
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [data, setData] = useState<ResumeData>(defaultData);

  const selectedTemplate = allTemplates.find((t) => t.id === selectedTemplateId) || allTemplates[0];

  const updatePersonal = (field: keyof ResumeData["personal"], val: string) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: val } }));

  const moveSection = useCallback((from: number, to: number) => {
    setSections((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const toggleSection = (id: string) =>
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, visible: !s.visible } : s));

  const handleAiEnhance = () => {
    setAiLoading(true);
    setTimeout(() => { setAiLoading(false); setShowAiPanel(true); }, 1500);
  };

  const aiSuggestions = [
    "Developed and maintained React-based web applications serving 500K+ monthly users",
    "Reduced API response time by 40% through query optimization and Redis caching",
    "Led cross-functional team of 5 engineers to deliver feature 2 weeks ahead of schedule",
    "Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes",
  ];

  const activeSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  const sectionIcons: Record<SectionType, React.ComponentType<{ size?: number }>> = {
    summary: User, experience: Briefcase, education: GraduationCap,
    skills: Code, projects: FolderOpen, certifications: Award, achievements: Star,
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pt-14 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Resume Builder</h1>
              <p className="text-xs text-muted-foreground">Drag sections to reorder · All changes shown live</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleAiEnhance} disabled={aiLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:border-primary/50 hover:bg-primary/5"
                style={{ borderColor: "rgba(79,70,229,0.3)", color: "#6d61f0" }}>
                {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                AI Enhance
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                <Download size={14} /> Export PDF
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-5">
            {/* ── Left sidebar ── */}
            <div className="lg:col-span-1 space-y-4">
              {/* Template picker */}
              <div className="p-4 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Palette size={14} style={{ color: "#6d61f0" }} />
                  <span className="text-sm font-semibold">Template</span>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {allTemplates.map((t) => (
                    <button key={t.id}
                      onClick={() => { setSelectedTemplateId(t.id); localStorage.setItem("selectedTemplate", t.id); }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium transition-all text-left"
                      style={selectedTemplateId === t.id ? {
                        background: `${t.primaryColor}10`,
                        outline: `1.5px solid ${t.primaryColor}50`,
                        color: t.primaryColor,
                      } : { color: "var(--muted-foreground)" }}>
                      <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: t.primaryColor }} />
                      {t.name}
                    </button>
                  ))}
                </div>
                <button onClick={() => navigate("templates")} className="mt-2 w-full text-xs text-center py-1.5 rounded-lg border transition-all hover:bg-muted/30"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                  Browse all →
                </button>
              </div>

              {/* Section toggle */}
              <div className="p-4 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={14} style={{ color: "#6d61f0" }} />
                  <span className="text-sm font-semibold">Sections</span>
                </div>
                <div className="space-y-1">
                  {sections.map((s) => {
                    const Icon = sectionIcons[s.type];
                    return (
                      <button key={s.id} onClick={() => toggleSection(s.id)}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all"
                        style={{ background: s.visible ? "rgba(79,70,229,0.06)" : "transparent", color: s.visible ? "var(--foreground)" : "var(--muted-foreground)" }}>
                        <Icon size={12} />
                        <span className="flex-1 text-left">{s.label}</span>
                        <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all ${s.visible ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                          {s.visible && <Check size={9} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Center editor ── */}
            <div className="lg:col-span-2 space-y-3">
              {/* Personal info */}
              <div className="p-5 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <User size={15} style={{ color: "#6d61f0" }} />
                  <span className="font-semibold text-sm">Personal Information</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Full Name" value={data.personal.name} onChange={(v) => updatePersonal("name", v)} span={2} />
                  <InputField label="Job Title" value={data.personal.title} onChange={(v) => updatePersonal("title", v)} span={2} />
                  <InputField label="Email" value={data.personal.email} onChange={(v) => updatePersonal("email", v)} />
                  <InputField label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
                  <InputField label="Location" value={data.personal.location} onChange={(v) => updatePersonal("location", v)} />
                  <InputField label="LinkedIn" value={data.personal.linkedin} onChange={(v) => updatePersonal("linkedin", v)} />
                  <div className="col-span-2">
                    <label className="block text-xs text-muted-foreground mb-1">Professional Summary</label>
                    <textarea value={data.personal.summary} rows={3}
                      onChange={(e) => updatePersonal("summary", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-primary transition-colors resize-none"
                      style={{ background: "var(--input-background)", borderColor: "var(--border)" }} />
                  </div>
                </div>
              </div>

              {/* Draggable section editors */}
              {activeSections.filter((s) => s.type !== "summary").map((section, index) => {
                const Icon = sectionIcons[section.type];
                const isExpanded = expanded === section.id;
                return (
                  <DraggableSection key={section.id} section={section} index={index} moveSection={moveSection}>
                    <div className="flex-1 rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: isExpanded ? "rgba(79,70,229,0.3)" : "var(--border)" }}>
                      <button onClick={() => setExpanded(isExpanded ? "" : section.id)}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/20 transition-colors">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: isExpanded ? "rgba(79,70,229,0.15)" : "rgba(79,70,229,0.06)" }}>
                          <Icon size={14} style={{ color: "#6d61f0" }} />
                        </div>
                        <span className="font-semibold text-sm flex-1 text-left">{section.label}</span>
                        <span className="text-xs text-muted-foreground mr-2">
                          {section.type === "experience" && `${data.experiences.length} entries`}
                          {section.type === "education" && `${data.education.length} entries`}
                          {section.type === "skills" && `${data.skills.length} skills`}
                          {section.type === "projects" && `${data.projects.length} projects`}
                          {section.type === "certifications" && `${data.certifications.length} certs`}
                          {section.type === "achievements" && `${data.achievements.length} items`}
                        </span>
                        {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--border)" }}>
                              {section.type === "experience" && (
                                <ExperienceEditor entries={data.experiences} onChange={(v) => setData((d) => ({ ...d, experiences: v }))} />
                              )}
                              {section.type === "education" && (
                                <EducationEditor entries={data.education} onChange={(v) => setData((d) => ({ ...d, education: v }))} />
                              )}
                              {section.type === "skills" && (
                                <SkillsEditor skills={data.skills} onChange={(v) => setData((d) => ({ ...d, skills: v }))} />
                              )}
                              {section.type === "projects" && (
                                <ProjectsEditor entries={data.projects} onChange={(v) => setData((d) => ({ ...d, projects: v }))} />
                              )}
                              {section.type === "certifications" && (
                                <CertificationsEditor entries={data.certifications} onChange={(v) => setData((d) => ({ ...d, certifications: v }))} />
                              )}
                              {section.type === "achievements" && (
                                <AchievementsEditor entries={data.achievements} onChange={(v) => setData((d) => ({ ...d, achievements: v }))} />
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </DraggableSection>
                );
              })}
            </div>

            {/* ── Right: Live Preview ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-20">
                <div className="flex items-center gap-3 mb-3 px-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: selectedTemplate.primaryColor }} />
                  <span className="text-sm font-semibold">{selectedTemplate.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                    ATS {selectedTemplate.ats}%
                  </span>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live preview
                  </div>
                </div>

                <div className="rounded-2xl border overflow-hidden shadow-xl" style={{ borderColor: "var(--border)" }}>
                  <div className="w-full overflow-hidden" style={{ aspectRatio: "210/297", position: "relative" }}>
                    <LivePreview data={data} template={selectedTemplate} />
                  </div>
                </div>

                {/* AI panel */}
                <AnimatePresence>
                  {showAiPanel && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="mt-4 p-4 rounded-2xl border"
                      style={{ background: "rgba(79,70,229,0.06)", borderColor: "rgba(79,70,229,0.2)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={14} style={{ color: "#6d61f0" }} />
                        <span className="text-sm font-semibold" style={{ color: "#6d61f0" }}>AI Suggestions</span>
                        <button onClick={() => setShowAiPanel(false)} className="ml-auto text-muted-foreground hover:text-foreground"><X size={13} /></button>
                      </div>
                      <div className="space-y-2">
                        {aiSuggestions.map((s, i) => (
                          <div key={i} className="p-2.5 rounded-xl border text-xs cursor-pointer hover:border-primary/40 transition-all"
                            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                            <div className="text-muted-foreground leading-relaxed">{s}</div>
                            <button
                              onClick={() => {
                                setData((d) => {
                                  if (d.experiences.length === 0) return d;
                                  const exps = [...d.experiences];
                                  exps[0] = { ...exps[0], bullets: [...exps[0].bullets, s] };
                                  return { ...d, experiences: exps };
                                });
                              }}
                              className="mt-1.5 text-primary text-[10px] font-medium hover:underline">
                              + Add to first experience
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
