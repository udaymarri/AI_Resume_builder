import { motion } from "motion/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FileText, Target, DollarSign, TrendingUp, TrendingDown, Activity, Globe, Shield, Bell, Settings, ArrowUpRight } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 18400, users: 1200 },
  { month: "Feb", revenue: 22100, users: 1480 },
  { month: "Mar", revenue: 19800, users: 1350 },
  { month: "Apr", revenue: 28600, users: 1920 },
  { month: "May", revenue: 34200, users: 2380 },
  { month: "Jun", revenue: 41800, users: 2940 },
];

const planData = [
  { name: "Free", value: 62, color: "#6b6a8a" },
  { name: "Pro", value: 31, color: "#4f46e5" },
  { name: "Team", value: 7, color: "#7c3aed" },
];

const activityData = [
  { day: "Mon", resumes: 1240, ats: 890, covers: 420 },
  { day: "Tue", resumes: 1580, ats: 1120, covers: 560 },
  { day: "Wed", resumes: 1380, ats: 980, covers: 490 },
  { day: "Thu", resumes: 1890, ats: 1340, covers: 670 },
  { day: "Fri", resumes: 2100, ats: 1590, covers: 740 },
  { day: "Sat", resumes: 1620, ats: 1230, covers: 580 },
  { day: "Sun", resumes: 980, ats: 720, covers: 310 },
];

const topCountries = [
  { country: "United States", users: 48200, growth: "+12%" },
  { country: "India", users: 31400, growth: "+28%" },
  { country: "United Kingdom", users: 18900, growth: "+8%" },
  { country: "Canada", users: 12300, growth: "+15%" },
  { country: "Australia", users: 9800, growth: "+19%" },
];

const recentAlerts = [
  { type: "success", msg: "Revenue milestone: ₹40K MRR achieved", time: "2h ago" },
  { type: "warning", msg: "AI API latency spike detected (340ms avg)", time: "4h ago" },
  { type: "info", msg: "2,400 new users registered today", time: "6h ago" },
  { type: "error", msg: "PDF export service returned 3 errors", time: "8h ago" },
];

const statCards = [
  { label: "Total Users", value: "241,847", change: "+12.4%", trend: "up", icon: Users, color: "#4f46e5" },
  { label: "Resumes Generated", value: "1.84M", change: "+8.7%", trend: "up", icon: FileText, color: "#7c3aed" },
  { label: "ATS Optimizations", value: "892K", change: "+21.2%", trend: "up", icon: Target, color: "#ec4899" },
  { label: "Monthly Revenue", value: "₹41,820", change: "+22.3%", trend: "up", icon: DollarSign, color: "#06b6d4" },
];

function RevenueAreaChart() {
  const w = 500;
  const h = 180;
  const pad = { top: 10, right: 10, bottom: 28, left: 52 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const maxRev = 45000;
  const maxUsers = 3200;
  const n = revenueData.length;
  const xStep = innerW / (n - 1);
  const toX = (i: number) => pad.left + i * xStep;
  const toYRev = (v: number) => pad.top + innerH - (v / maxRev) * innerH;
  const toYUsers = (v: number) => pad.top + innerH - (v / maxUsers) * innerH;
  const revPts = revenueData.map((d, i) => `${toX(i)},${toYRev(d.revenue)}`).join(" ");
  const userPts = revenueData.map((d, i) => `${toX(i)},${toYUsers(d.users)}`).join(" ");
  const revArea = `${toX(0)},${pad.top + innerH} ${revPts} ${toX(n - 1)},${pad.top + innerH}`;
  const userArea = `${toX(0)},${pad.top + innerH} ${userPts} ${toX(n - 1)},${pad.top + innerH}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 220 }}>
      {[0, 10000, 20000, 30000, 40000].map((v) => (
        <g key={v}>
          <line x1={pad.left} x2={pad.left + innerW} y1={toYRev(v)} y2={toYRev(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x={pad.left - 4} y={toYRev(v) + 4} textAnchor="end" fontSize="9" fill="var(--muted-foreground)">₹{(v / 1000).toFixed(0)}K</text>
        </g>
      ))}
      {revenueData.map((d, i) => (
        <text key={d.month} x={toX(i)} y={h - 6} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{d.month}</text>
      ))}
      <polygon points={userArea} fill="#06b6d4" fillOpacity={0.1} />
      <polygon points={revArea} fill="#4f46e5" fillOpacity={0.12} />
      <polyline points={userPts} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinejoin="round" />
      <polyline points={revPts} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function WeeklyBarChart() {
  const maxVal = Math.max(...activityData.map((d) => d.resumes));
  const barW = 8;
  const gap = 3;
  const groupW = 3 * barW + 2 * gap;
  const groupGap = 18;
  const totalW = activityData.length * (groupW + groupGap);
  const h = 160;
  const padB = 24;
  const innerH = h - padB;
  return (
    <svg viewBox={`0 0 ${totalW} ${h}`} className="w-full" style={{ height: 200 }}>
      {activityData.map((d, gi) => {
        const gx = gi * (groupW + groupGap);
        const bars = [
          { val: d.resumes, color: "#4f46e5" },
          { val: d.ats, color: "#7c3aed" },
          { val: d.covers, color: "#ec4899" },
        ];
        return (
          <g key={d.day}>
            {bars.map((bar, bi) => {
              const bh = (bar.val / maxVal) * innerH;
              return (
                <rect key={bi} x={gx + bi * (barW + gap)} y={innerH - bh} width={barW} height={bh} rx="2" fill={bar.color} />
              );
            })}
            <text x={gx + groupW / 2} y={h - 6} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{d.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function AdminPanel() {
  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={18} style={{ color: "#6d61f0" }} />
              <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Admin Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground">Platform overview · Last updated just now</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all hover:bg-muted/30"
              style={{ borderColor: "var(--border)" }}>
              <Bell size={13} />
              Alerts (4)
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all hover:bg-muted/30"
              style={{ borderColor: "var(--border)" }}>
              <Settings size={13} />
              Settings
            </button>
          </div>
        </div>

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
                  <div className={`flex items-center gap-1 text-xs font-medium ${card.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                    {card.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {card.change}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Revenue & User Growth</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly trends across the past 6 months</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                <ArrowUpRight size={12} />
                ₹41.8K MRR
              </div>
            </div>
            <RevenueAreaChart />
          </motion.div>

          {/* Plan distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>Plan Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Active subscription breakdown</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={planData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {planData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {planData.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: plan.color }} />
                    <span className="text-muted-foreground">{plan.name}</span>
                  </div>
                  <span className="font-medium">{plan.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Daily activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity size={15} style={{ color: "#6d61f0" }} />
                <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Weekly Feature Usage</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#4f46e5" }} /> Resumes</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#7c3aed" }} /> ATS</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ background: "#ec4899" }} /> Covers</span>
              </div>
            </div>
            <WeeklyBarChart />
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 rounded-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell size={14} style={{ color: "#6d61f0" }} />
              <h3 className="font-semibold text-sm">System Alerts</h3>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert, i) => (
                <div key={i} className="p-3 rounded-xl border text-xs" style={{
                  borderColor: alert.type === "error" ? "rgba(239,68,68,0.2)" :
                    alert.type === "warning" ? "rgba(245,158,11,0.2)" :
                    alert.type === "success" ? "rgba(16,185,129,0.2)" : "var(--border)",
                  background: alert.type === "error" ? "rgba(239,68,68,0.05)" :
                    alert.type === "warning" ? "rgba(245,158,11,0.05)" :
                    alert.type === "success" ? "rgba(16,185,129,0.05)" : "transparent"
                }}>
                  <div className="font-medium mb-0.5">{alert.msg}</div>
                  <div className="text-muted-foreground">{alert.time}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe size={15} style={{ color: "#6d61f0" }} />
            <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Users by Country</h3>
          </div>
          <div className="space-y-3">
            {topCountries.map((country, i) => (
              <div key={country.country} className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground w-6">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{country.country}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{country.users.toLocaleString()}</span>
                      <span className="text-xs font-medium text-emerald-500">{country.growth}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(country.users / topCountries[0].users) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
