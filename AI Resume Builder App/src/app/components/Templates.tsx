import { useState } from "react";
import { motion } from "motion/react";
import { Eye, Star, Sparkles, Search, Check } from "lucide-react";
import type { Page } from "../App";

interface TemplatesProps {
  navigate: (p: Page) => void;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  rating: number;
  uses: string;
  ats: number;
  primaryColor: string;
  accentColor: string;
  tags: string[];
  description: string;
  style: "classic" | "modern" | "sidebar" | "elegant" | "bold" | "minimal" | "creative" | "government" | "compact" | "executive";
}

export const allTemplates: ResumeTemplate[] = [
  // ── Traditional / Classic ──────────────────────────────────────────────
  {
    id: "classic-india",
    name: "Classic Indian",
    category: "traditional",
    rating: 4.9,
    uses: "180K",
    ats: 99,
    primaryColor: "#1a237e",
    accentColor: "#283593",
    tags: ["Traditional", "ATS Best", "Universal"],
    description: "The most-used format across Indian companies. Clean header, clear sections, universally accepted.",
    style: "classic",
  },
  {
    id: "classic-navy",
    name: "Navy Classic",
    category: "traditional",
    rating: 4.8,
    uses: "95K",
    ats: 98,
    primaryColor: "#0d47a1",
    accentColor: "#1565c0",
    tags: ["Traditional", "Navy", "Corporate"],
    description: "Deep navy classic resume preferred by senior-level Indian professionals and MNC recruiters.",
    style: "classic",
  },
  {
    id: "classic-maroon",
    name: "Maroon Classic",
    category: "traditional",
    rating: 4.7,
    uses: "62K",
    ats: 97,
    primaryColor: "#880e4f",
    accentColor: "#ad1457",
    tags: ["Traditional", "Maroon", "Formal"],
    description: "Timeless maroon classic layout — a trusted choice for HR, administration and operations roles.",
    style: "classic",
  },
  {
    id: "classic-charcoal",
    name: "Charcoal Classic",
    category: "traditional",
    rating: 4.7,
    uses: "74K",
    ats: 98,
    primaryColor: "#263238",
    accentColor: "#37474f",
    tags: ["Traditional", "Charcoal", "Clean"],
    description: "Understated charcoal palette for a sleek, modern-classic look that reads well on both screens and print.",
    style: "classic",
  },

  // ── Tech / IT ─────────────────────────────────────────────────────────
  {
    id: "it-professional",
    name: "IT Professional",
    category: "tech",
    rating: 4.9,
    uses: "220K",
    ats: 98,
    primaryColor: "#01579b",
    accentColor: "#0288d1",
    tags: ["IT / Software", "ATS Friendly", "Tech"],
    description: "Designed for Indian IT sector — Infosys, TCS, Wipro, HCL. Skills matrix and project highlights.",
    style: "modern",
  },
  {
    id: "tcs-wipro",
    name: "Service Company",
    category: "tech",
    rating: 4.8,
    uses: "145K",
    ats: 97,
    primaryColor: "#1b5e20",
    accentColor: "#388e3c",
    tags: ["TCS / Wipro", "Service Sector", "Clean"],
    description: "Optimised for mass recruiters like TCS, Wipro, Cognizant with project & technology tables.",
    style: "compact",
  },
  {
    id: "engineering-iit",
    name: "Engineering / IIT",
    category: "tech",
    rating: 4.8,
    uses: "78K",
    ats: 96,
    primaryColor: "#212121",
    accentColor: "#424242",
    tags: ["Engineering", "IIT / NIT", "Core"],
    description: "Preferred by IIT/NIT students. Dense, achievement-focused with CGPA and core projects.",
    style: "bold",
  },
  {
    id: "fullstack-dev",
    name: "Full Stack Developer",
    category: "tech",
    rating: 4.8,
    uses: "112K",
    ats: 95,
    primaryColor: "#4527a0",
    accentColor: "#512da8",
    tags: ["Full Stack", "Dev", "MERN / Java"],
    description: "Two-column layout with tech stack sidebar. Perfect for full-stack and backend developers.",
    style: "sidebar",
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    category: "tech",
    rating: 4.8,
    uses: "68K",
    ats: 94,
    primaryColor: "#006064",
    accentColor: "#00838f",
    tags: ["Data Science", "ML / AI", "Analytics"],
    description: "Showcases Python, ML frameworks, research publications and Kaggle/GitHub contributions.",
    style: "modern",
  },
  {
    id: "devops-cloud",
    name: "DevOps / Cloud",
    category: "tech",
    rating: 4.7,
    uses: "49K",
    ats: 93,
    primaryColor: "#e65100",
    accentColor: "#ef6c00",
    tags: ["DevOps", "AWS / Azure", "Cloud"],
    description: "Highlights certifications, infra skills, CI/CD tools, and cloud platform expertise.",
    style: "compact",
  },
  {
    id: "mobile-developer",
    name: "Mobile Developer",
    category: "tech",
    rating: 4.7,
    uses: "41K",
    ats: 92,
    primaryColor: "#1a237e",
    accentColor: "#283593",
    tags: ["Mobile", "Android / iOS", "React Native"],
    description: "App store links, Play Store ratings, and native SDK skills prominently featured.",
    style: "modern",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "tech",
    rating: 4.7,
    uses: "27K",
    ats: 93,
    primaryColor: "#b71c1c",
    accentColor: "#c62828",
    tags: ["Cybersecurity", "CEH", "Ethical Hacking"],
    description: "Certifications-forward layout for ethical hackers, SOC analysts and security engineers.",
    style: "bold",
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    category: "creative",
    rating: 4.8,
    uses: "58K",
    ats: 88,
    primaryColor: "#6200ea",
    accentColor: "#7c4dff",
    tags: ["UI / UX", "Figma", "Product Design"],
    description: "Portfolio-ready sidebar with tools, Figma/Adobe skills and case study links.",
    style: "sidebar",
  },

  // ── Fresher / Graduate ────────────────────────────────────────────────
  {
    id: "fresher-graduate",
    name: "Fresher / Graduate",
    category: "fresher",
    rating: 4.9,
    uses: "310K",
    ats: 98,
    primaryColor: "#006064",
    accentColor: "#00838f",
    tags: ["Fresher", "Graduate", "Entry Level"],
    description: "Perfect for fresh graduates. Highlights academics, projects, internships and skills prominently.",
    style: "minimal",
  },
  {
    id: "btech-fresher",
    name: "B.Tech Fresher",
    category: "fresher",
    rating: 4.8,
    uses: "198K",
    ats: 97,
    primaryColor: "#01579b",
    accentColor: "#0277bd",
    tags: ["B.Tech", "Fresher", "Campus Placement"],
    description: "Optimised for campus placement drives. CGPA, technical projects and hackathon wins at the top.",
    style: "compact",
  },
  {
    id: "internship-seeker",
    name: "Internship Seeker",
    category: "fresher",
    rating: 4.8,
    uses: "142K",
    ats: 96,
    primaryColor: "#4caf50",
    accentColor: "#43a047",
    tags: ["Internship", "College", "Summer"],
    description: "Highlights coursework, mini-projects, and soft skills for students seeking internship opportunities.",
    style: "minimal",
  },
  {
    id: "mba-fresher",
    name: "MBA Fresher",
    category: "fresher",
    rating: 4.7,
    uses: "54K",
    ats: 95,
    primaryColor: "#4a148c",
    accentColor: "#6a1b9a",
    tags: ["MBA", "Management", "Fresher"],
    description: "Ideal for MBA freshers from B-schools targeting management trainee and analyst roles.",
    style: "elegant",
  },

  // ── Government / PSU ─────────────────────────────────────────────────
  {
    id: "government-india",
    name: "Government / PSU",
    category: "government",
    rating: 4.8,
    uses: "92K",
    ats: 96,
    primaryColor: "#4a148c",
    accentColor: "#6a1b9a",
    tags: ["Government", "PSU", "UPSC", "Formal"],
    description: "Biodata format for Indian government jobs, PSUs, UPSC, SSC, banking exams — formal and official.",
    style: "government",
  },
  {
    id: "bank-po",
    name: "Banking / Bank PO",
    category: "government",
    rating: 4.8,
    uses: "76K",
    ats: 96,
    primaryColor: "#1b5e20",
    accentColor: "#2e7d32",
    tags: ["Banking", "Bank PO", "SBI / IBPS"],
    description: "Formal biodata layout for SBI, IBPS, RBI and cooperative bank recruitment applications.",
    style: "government",
  },
  {
    id: "defence-armed",
    name: "Defence / Armed Forces",
    category: "government",
    rating: 4.7,
    uses: "31K",
    ats: 94,
    primaryColor: "#33691e",
    accentColor: "#558b2f",
    tags: ["Defence", "NDA", "Army / Navy"],
    description: "Structured biodata for NDA, CDS and armed forces applications with service record fields.",
    style: "government",
  },
  {
    id: "railway-psc",
    name: "Railway / PSC",
    category: "government",
    rating: 4.7,
    uses: "48K",
    ats: 95,
    primaryColor: "#0d47a1",
    accentColor: "#1565c0",
    tags: ["Railway", "PSC", "Group C / D"],
    description: "Standard format for Indian Railways, State PSC and Group C/D central government positions.",
    style: "government",
  },

  // ── Finance / Banking ────────────────────────────────────────────────
  {
    id: "mba-finance",
    name: "MBA / Finance",
    category: "finance",
    rating: 4.8,
    uses: "67K",
    ats: 95,
    primaryColor: "#bf360c",
    accentColor: "#d84315",
    tags: ["MBA", "Finance", "Consulting"],
    description: "Premium format for IIM graduates, consultants, finance professionals at Big 4 and banks.",
    style: "executive",
  },
  {
    id: "ca-accountant",
    name: "CA / Accountant",
    category: "finance",
    rating: 4.8,
    uses: "53K",
    ats: 96,
    primaryColor: "#212121",
    accentColor: "#424242",
    tags: ["CA", "CMA", "Accountant", "ICAI"],
    description: "For Chartered Accountants and CMAs — articleship, audit experience and ICAI membership details.",
    style: "classic",
  },
  {
    id: "investment-banking",
    name: "Investment Banking",
    category: "finance",
    rating: 4.7,
    uses: "18K",
    ats: 93,
    primaryColor: "#1a237e",
    accentColor: "#283593",
    tags: ["Investment Banking", "PE", "M&A"],
    description: "Metric-heavy, deal-focused layout for IB analysts targeting global finance firms.",
    style: "executive",
  },

  // ── Corporate / Senior ────────────────────────────────────────────────
  {
    id: "elegant-serif",
    name: "Elegant Professional",
    category: "corporate",
    rating: 4.7,
    uses: "44K",
    ats: 93,
    primaryColor: "#3e2723",
    accentColor: "#5d4037",
    tags: ["Elegant", "Corporate", "Senior"],
    description: "Serif-inspired elegant design for senior managers, directors and C-suite in Indian corporates.",
    style: "elegant",
  },
  {
    id: "vp-director",
    name: "VP / Director",
    category: "corporate",
    rating: 4.8,
    uses: "32K",
    ats: 94,
    primaryColor: "#1a237e",
    accentColor: "#283593",
    tags: ["VP", "Director", "Leadership"],
    description: "Executive summary at the top, P&L ownership, team size and board-level achievements.",
    style: "executive",
  },
  {
    id: "hr-manager",
    name: "HR Manager",
    category: "corporate",
    rating: 4.7,
    uses: "38K",
    ats: 95,
    primaryColor: "#880e4f",
    accentColor: "#ad1457",
    tags: ["HR", "People & Culture", "Talent"],
    description: "Structured for HR business partners, talent acquisition leads and L&D managers.",
    style: "elegant",
  },
  {
    id: "operations-manager",
    name: "Operations Manager",
    category: "corporate",
    rating: 4.7,
    uses: "41K",
    ats: 95,
    primaryColor: "#004d40",
    accentColor: "#00695c",
    tags: ["Operations", "Supply Chain", "Logistics"],
    description: "Highlights KPIs, cost savings and process improvements for ops and supply-chain leaders.",
    style: "modern",
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    category: "corporate",
    rating: 4.7,
    uses: "59K",
    ats: 94,
    primaryColor: "#e65100",
    accentColor: "#ef6c00",
    tags: ["Sales", "Marketing", "Business Dev"],
    description: "Revenue targets, lead generation metrics and campaign ROI front and centre.",
    style: "modern",
  },

  // ── Healthcare / Medical ──────────────────────────────────────────────
  {
    id: "healthcare-doctor",
    name: "Medical / Healthcare",
    category: "healthcare",
    rating: 4.8,
    uses: "38K",
    ats: 95,
    primaryColor: "#004d40",
    accentColor: "#00695c",
    tags: ["Doctor", "Healthcare", "Medical"],
    description: "For Indian doctors, nurses and healthcare professionals with specialisations and reg. no.",
    style: "classic",
  },
  {
    id: "pharmacist",
    name: "Pharmacist / Pharma",
    category: "healthcare",
    rating: 4.7,
    uses: "22K",
    ats: 94,
    primaryColor: "#1b5e20",
    accentColor: "#2e7d32",
    tags: ["Pharma", "Clinical", "Drug Safety"],
    description: "Designed for pharmacists, clinical researchers and pharma sales professionals in India.",
    style: "compact",
  },
  {
    id: "nursing",
    name: "Nursing Professional",
    category: "healthcare",
    rating: 4.7,
    uses: "19K",
    ats: 95,
    primaryColor: "#006064",
    accentColor: "#00838f",
    tags: ["Nursing", "ICU / OT", "Staff Nurse"],
    description: "Specialisations, ward experience, certifications and bedside skills clearly highlighted.",
    style: "minimal",
  },

  // ── Academic / Education ──────────────────────────────────────────────
  {
    id: "teacher-academic",
    name: "Teacher / Academic",
    category: "academic",
    rating: 4.7,
    uses: "29K",
    ats: 94,
    primaryColor: "#e65100",
    accentColor: "#ef6c00",
    tags: ["Teaching", "Academic", "University"],
    description: "For teachers, professors and researchers. Publications, subjects taught and qualifications.",
    style: "elegant",
  },
  {
    id: "phd-researcher",
    name: "PhD / Researcher",
    category: "academic",
    rating: 4.8,
    uses: "16K",
    ats: 93,
    primaryColor: "#1a237e",
    accentColor: "#283593",
    tags: ["PhD", "Research", "Publications"],
    description: "Academic CV format with publications, conferences, patents and research grants for PhDs.",
    style: "elegant",
  },
  {
    id: "school-teacher",
    name: "School Teacher",
    category: "academic",
    rating: 4.7,
    uses: "34K",
    ats: 95,
    primaryColor: "#4a148c",
    accentColor: "#6a1b9a",
    tags: ["School", "KV / Navodaya", "Primary"],
    description: "Ideal for primary, secondary and senior teachers applying to KVS, NVS and private schools.",
    style: "classic",
  },

  // ── Creative / Design ────────────────────────────────────────────────
  {
    id: "creative-agency",
    name: "Creative Agency",
    category: "creative",
    rating: 4.6,
    uses: "22K",
    ats: 85,
    primaryColor: "#311b92",
    accentColor: "#4527a0",
    tags: ["Creative", "Design", "Marketing"],
    description: "Bold two-tone layout for designers, marketers and creative professionals in agencies.",
    style: "creative",
  },
  {
    id: "graphic-designer",
    name: "Graphic Designer",
    category: "creative",
    rating: 4.7,
    uses: "31K",
    ats: 84,
    primaryColor: "#e91e63",
    accentColor: "#f06292",
    tags: ["Graphic Design", "Illustrator", "Branding"],
    description: "Vibrant two-column layout for graphic designers with portfolio link and tool proficiency bars.",
    style: "sidebar",
  },
  {
    id: "content-writer",
    name: "Content Writer",
    category: "creative",
    rating: 4.6,
    uses: "24K",
    ats: 89,
    primaryColor: "#37474f",
    accentColor: "#546e7a",
    tags: ["Content", "Copywriting", "SEO"],
    description: "Writing samples, niches covered and publication history for content creators and SEO writers.",
    style: "minimal",
  },
  {
    id: "fashion-design",
    name: "Fashion Designer",
    category: "creative",
    rating: 4.5,
    uses: "11K",
    ats: 82,
    primaryColor: "#880e4f",
    accentColor: "#c2185b",
    tags: ["Fashion", "Textile", "NIFT"],
    description: "Portfolio-driven format for NIFT graduates targeting fashion houses, brands and garment exporters.",
    style: "creative",
  },

  // ── Modern / Sidebar ─────────────────────────────────────────────────
  {
    id: "sidebar-modern",
    name: "Modern Sidebar",
    category: "modern",
    rating: 4.7,
    uses: "55K",
    ats: 90,
    primaryColor: "#880e4f",
    accentColor: "#ad1457",
    tags: ["Modern", "Two-Column", "Design"],
    description: "Two-column layout with skills and contact in sidebar. Popular in startups and product companies.",
    style: "sidebar",
  },
  {
    id: "teal-sidebar",
    name: "Teal Sidebar",
    category: "modern",
    rating: 4.7,
    uses: "46K",
    ats: 91,
    primaryColor: "#00695c",
    accentColor: "#00897b",
    tags: ["Sidebar", "Teal", "Modern"],
    description: "Fresh teal sidebar resume popular among product managers, analysts and startup professionals.",
    style: "sidebar",
  },
  {
    id: "startup-modern",
    name: "Startup / Product",
    category: "modern",
    rating: 4.7,
    uses: "39K",
    ats: 91,
    primaryColor: "#f57c00",
    accentColor: "#fb8c00",
    tags: ["Startup", "Product Manager", "Growth"],
    description: "Impact-first modern layout for PMs, growth hackers and startup generalists.",
    style: "modern",
  },
  {
    id: "minimal-white",
    name: "Minimal White",
    category: "modern",
    rating: 4.8,
    uses: "83K",
    ats: 97,
    primaryColor: "#212121",
    accentColor: "#424242",
    tags: ["Minimal", "Clean", "ATS Safe"],
    description: "Ultra-clean minimal design — maximum ATS compatibility, zero distractions.",
    style: "minimal",
  },
];

const categories = ["all", "traditional", "tech", "fresher", "government", "finance", "corporate", "creative", "academic", "healthcare", "modern"];

function MiniResumePreview({ template }: { template: ResumeTemplate }) {
  const pc = template.primaryColor;
  const ac = template.accentColor;

  if (template.style === "sidebar" || template.style === "creative") {
    return (
      <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden flex" style={{ fontSize: "5px" }}>
        {/* Sidebar */}
        <div className="w-14 flex-shrink-0 flex flex-col p-2 gap-1.5" style={{ background: pc }}>
          <div className="w-6 h-6 rounded-full bg-white/30 mx-auto mt-1" />
          <div className="h-1 w-full rounded bg-white/40" />
          <div className="h-0.5 w-4/5 rounded bg-white/25" />
          <div className="mt-1 h-0.5 w-3/4 rounded" style={{ background: ac + "80" }} />
          {[70, 85, 60, 90].map((w, i) => (
            <div key={i} className="space-y-0.5">
              <div className="h-0.5 rounded bg-white/20" style={{ width: `${w}%` }} />
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-white/60" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded" style={{ background: pc }} />
          <div className="h-0.5 w-1/2 rounded bg-gray-300" />
          <div className="h-px w-full" style={{ background: ac + "40" }} />
          {[90, 75, 85, 65, 80].map((w, i) => (
            <div key={i} className="h-0.5 rounded bg-gray-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (template.style === "government") {
    return (
      <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden" style={{ fontSize: "5px" }}>
        <div className="text-center py-2 border-b-2" style={{ borderColor: pc }}>
          <div className="h-1.5 w-16 rounded mx-auto mb-0.5" style={{ background: pc }} />
          <div className="h-0.5 w-10 rounded mx-auto bg-gray-400" />
        </div>
        <div className="p-2 space-y-1">
          {[["Name", "Alex Johnson"], ["Father", "Robert Johnson"], ["DoB", "15/08/1995"], ["Mobile", "+91 9876543210"], ["Email", "alex@email.com"]].map(([k, v], i) => (
            <div key={i} className="flex gap-1">
              <div className="w-8 h-0.5 rounded flex-shrink-0 mt-0.5" style={{ background: pc + "80" }} />
              <div className="h-0.5 flex-1 rounded bg-gray-200" />
            </div>
          ))}
          <div className="mt-1 h-px w-full" style={{ background: pc + "30" }} />
          {[80, 70, 90, 65].map((w, i) => (
            <div key={i} className="h-0.5 rounded bg-gray-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (template.style === "executive" || template.style === "elegant") {
    return (
      <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden" style={{ fontSize: "5px" }}>
        <div className="h-6 flex items-center px-3 border-b" style={{ borderColor: pc + "40" }}>
          <div>
            <div className="h-1.5 w-16 rounded mb-0.5" style={{ background: pc }} />
            <div className="h-0.5 w-10 rounded" style={{ background: ac + "80" }} />
          </div>
          <div className="ml-auto space-y-0.5">
            <div className="h-0.5 w-10 rounded bg-gray-300" />
            <div className="h-0.5 w-8 rounded bg-gray-300" />
          </div>
        </div>
        <div className="p-2 space-y-1.5">
          {["OBJECTIVE", "EXPERIENCE", "EDUCATION"].map((label, i) => (
            <div key={i}>
              <div className="flex items-center gap-1 mb-0.5">
                <div className="h-0.5 w-6 rounded" style={{ background: pc }} />
                <div className="h-0.5 w-4 rounded" style={{ background: ac + "60" }} />
              </div>
              <div className="h-0.5 w-full rounded bg-gray-200" />
              <div className="h-0.5 w-4/5 rounded bg-gray-100 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (template.style === "bold") {
    return (
      <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden" style={{ fontSize: "5px" }}>
        <div className="h-7 flex items-center px-3" style={{ background: pc }}>
          <div>
            <div className="h-1.5 w-14 rounded bg-white mb-0.5" />
            <div className="h-0.5 w-10 rounded bg-white/60" />
          </div>
        </div>
        <div className="p-2 space-y-1.5">
          {[["SKILLS", 3], ["PROJECTS", 2], ["EDUCATION", 2]].map(([label, lines], i) => (
            <div key={i}>
              <div className="h-1 w-10 rounded mb-0.5" style={{ background: pc }} />
              {Array.from({ length: lines as number }).map((_, j) => (
                <div key={j} className="h-0.5 rounded bg-gray-200 mb-0.5" style={{ width: `${85 - j * 10}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (template.style === "compact") {
    return (
      <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden" style={{ fontSize: "5px" }}>
        <div className="px-3 py-1.5 border-b-2" style={{ borderColor: pc }}>
          <div className="h-1.5 w-16 rounded mb-0.5" style={{ background: pc }} />
          <div className="flex gap-2">
            {[6, 8, 7].map((w, i) => <div key={i} className="h-0.5 rounded bg-gray-300" style={{ width: `${w * 3}px` }} />)}
          </div>
        </div>
        <div className="p-2 grid grid-cols-2 gap-x-2 gap-y-1">
          {[["Technical Skills", 3], ["Projects", 2], ["Experience", 2], ["Education", 1]].map(([label, lines], i) => (
            <div key={i}>
              <div className="h-0.5 w-10 rounded mb-0.5" style={{ background: ac }} />
              {Array.from({ length: lines as number }).map((_, j) => (
                <div key={j} className="h-0.5 rounded bg-gray-200 mb-0.5" style={{ width: `${80 - j * 5}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: classic / modern / minimal
  return (
    <div className="absolute inset-3 bg-white rounded-lg shadow-md overflow-hidden" style={{ fontSize: "5px" }}>
      <div className="h-8 flex items-center px-3" style={{
        background: template.style === "minimal" ? "white" : `linear-gradient(135deg, ${pc}, ${ac})`,
        borderBottom: template.style === "minimal" ? `2px solid ${pc}` : "none"
      }}>
        <div>
          <div className="h-1.5 w-14 rounded mb-0.5" style={{ background: template.style === "minimal" ? pc : "white" }} />
          <div className="h-0.5 w-9 rounded" style={{ background: template.style === "minimal" ? ac + "80" : "rgba(255,255,255,0.6)" }} />
          <div className="h-0.5 w-12 rounded mt-0.5" style={{ background: template.style === "minimal" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)" }} />
        </div>
      </div>
      <div className="p-2 space-y-1.5">
        {[["SUMMARY", 2], ["EXPERIENCE", 3], ["SKILLS", 1], ["EDUCATION", 1]].map(([label, lines], i) => (
          <div key={i}>
            <div className="h-0.5 w-12 rounded mb-0.5" style={{ background: pc }} />
            {Array.from({ length: lines as number }).map((_, j) => (
              <div key={j} className="h-0.5 rounded bg-gray-200 mb-0.5" style={{ width: `${90 - j * 8}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template, selected, onSelect }: {
  template: ResumeTemplate;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl border overflow-hidden transition-all cursor-pointer"
      style={{
        background: "var(--card)",
        borderColor: selected ? template.primaryColor : "var(--border)",
        boxShadow: selected
          ? `0 0 0 2px ${template.primaryColor}40, 0 12px 40px ${template.primaryColor}20`
          : hovered ? "0 12px 40px rgba(0,0,0,0.12)" : "none",
      }}
      onClick={onSelect}
    >
      {/* Preview area */}
      <div className="relative h-52 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${template.primaryColor}12, ${template.accentColor}06)` }}>
        <MiniResumePreview template={template} />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center gap-2"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        >
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-50 transition-all"
            onClick={(e) => { e.stopPropagation(); onSelect(); }}>
            <Eye size={12} />
            Preview
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-all"
            style={{ background: template.primaryColor }}
          >
            {selected ? <><Check size={12} /> Selected</> : "Use Template"}
          </button>
        </motion.div>

        {/* Selected checkmark */}
        {selected && (
          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ background: template.primaryColor }}>
            <Check size={12} />
          </div>
        )}

        {/* ATS badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
          style={{ background: template.primaryColor }}>
          ATS {template.ats}%
        </div>

        {/* FREE badge */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold"
          style={{ background: "rgba(16,185,129,0.9)", color: "white" }}>
          FREE
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>{template.name}</h3>
          <div className="flex items-center gap-1 text-xs text-amber-500 flex-shrink-0">
            <Star size={11} className="fill-amber-500" />
            {template.rating}
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{template.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                style={{ background: `${template.primaryColor}12`, color: template.primaryColor }}>
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{template.uses} uses</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Templates({ navigate }: TemplatesProps) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("classic-india");

  const filtered = allTemplates.filter((t) => {
    const matchCat = category === "all" || t.category === category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // Store selected template so ResumeBuilder can pick it up
    localStorage.setItem("selectedTemplate", id);
  };

  const handleUseInBuilder = () => {
    localStorage.setItem("selectedTemplate", selectedId);
    navigate("builder");
  };

  const selected = allTemplates.find((t) => t.id === selectedId);

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Resume Templates</h1>
            <p className="text-sm text-muted-foreground">{allTemplates.length}+ professional Indian-style templates — all completely free</p>
          </div>
          <div className="flex items-center gap-3">
            {selected && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium"
                style={{ borderColor: `${selected.primaryColor}40`, background: `${selected.primaryColor}08`, color: selected.primaryColor }}>
                <Check size={12} />
                {selected.name} selected
              </div>
            )}
            <button
              onClick={handleUseInBuilder}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: selected ? selected.primaryColor : "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <Sparkles size={14} />
              Use in Builder
            </button>
          </div>
        </div>

        {/* Search + filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:border-primary transition-colors w-52"
              style={{ background: "var(--input-background)", borderColor: "var(--border)" }}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                  category === cat ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border"
                }`}
                style={category === cat ? { background: "linear-gradient(135deg, #4f46e5, #7c3aed)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              selected={selectedId === template.id}
              onSelect={() => handleSelect(template.id)}
            />
          ))}
        </div>

        {/* All free banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-8 rounded-2xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.05))", border: "1px solid rgba(79,70,229,0.15)" }}
        >
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>All Templates Are 100% Free</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Every template — including the premium Indian professional formats — is completely free to use, download, and export as PDF.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
