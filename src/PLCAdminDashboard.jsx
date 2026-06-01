import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Award,
  BarChart2,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Cpu,
  Database,
  Edit2,
  Eye,
  Factory,
  FileCheck2,
  Filter,
  Gauge,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  LogOut,
  Mail,
  MoreHorizontal,
  PenSquare,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Trash2,
  TrendingUp,
  Trophy,
  Upload,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Zap,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockStudents = [
  { id: 1, name: "สมชาย ใจดี", email: "somchai@email.com", avatar: "ส", level: "LEVEL 3", progress: 68, score: 82, enrolled: "12 พ.ค. 2026", lastActive: "วันนี้", status: "active", badge: "Hardware Expert" },
  { id: 2, name: "มาลี รักเรียน", email: "malee@email.com", avatar: "ม", level: "LEVEL 5", progress: 91, score: 95, enrolled: "3 เม.ย. 2026", lastActive: "เมื่อวาน", status: "active", badge: "Ladder Coder" },
  { id: 3, name: "วิชัย ขยันดี", email: "wichai@email.com", avatar: "ว", level: "LEVEL 2", progress: 44, score: 71, enrolled: "20 พ.ค. 2026", lastActive: "3 วันที่แล้ว", status: "active", badge: "PLC Starter" },
  { id: 4, name: "นภา สวยงาม", email: "napa@email.com", avatar: "น", level: "LEVEL 7", progress: 100, score: 98, enrolled: "1 ม.ค. 2026", lastActive: "วันนี้", status: "completed", badge: "Troubleshooter" },
  { id: 5, name: "ธนา มีทรัพย์", email: "tana@email.com", avatar: "ธ", level: "LEVEL 1", progress: 22, score: 60, enrolled: "28 พ.ค. 2026", lastActive: "1 สัปดาห์", status: "inactive", badge: "PLC Starter" },
  { id: 6, name: "ปรีดา ฉลาดมาก", email: "preeda@email.com", avatar: "ป", level: "LEVEL 4", progress: 55, score: 77, enrolled: "15 เม.ย. 2026", lastActive: "วันนี้", status: "active", badge: "Hardware Expert" },
  { id: 7, name: "จิรา ยิ้มแย้ม", email: "jira@email.com", avatar: "จ", level: "LEVEL 6", progress: 78, score: 88, enrolled: "5 มี.ค. 2026", lastActive: "เมื่อวาน", status: "active", badge: "Ladder Coder" },
  { id: 8, name: "ชาตรี กล้าหาญ", email: "chatree@email.com", avatar: "ช", level: "LEVEL 0", progress: 100, score: 90, enrolled: "30 เม.ย. 2026", lastActive: "2 วันที่แล้ว", status: "active", badge: "PLC Starter" },
];

const mockCourses = [
  { level: "LEVEL 0", title: "PLC คืออะไร?", lessons: 6, students: 312, completion: 88, status: "published", updated: "15 พ.ค. 2026" },
  { level: "LEVEL 1", title: "PLC Hardware และ Software", lessons: 6, students: 287, completion: 72, status: "published", updated: "10 พ.ค. 2026" },
  { level: "LEVEL 2", title: "PLC Memory Map", lessons: 6, students: 241, completion: 61, status: "published", updated: "8 พ.ค. 2026" },
  { level: "LEVEL 3", title: "Ladder Logic พื้นฐาน", lessons: 7, students: 198, completion: 54, status: "published", updated: "5 พ.ค. 2026" },
  { level: "LEVEL 4", title: "Timer / Counter", lessons: 7, students: 156, completion: 41, status: "published", updated: "1 พ.ค. 2026" },
  { level: "LEVEL 5", title: "Industrial Case Study", lessons: 6, students: 112, completion: 35, status: "published", updated: "22 เม.ย. 2026" },
  { level: "LEVEL 6", title: "Troubleshooting Lab", lessons: 6, students: 78, completion: 28, status: "draft", updated: "18 เม.ย. 2026" },
  { level: "LEVEL 7", title: "Mini Project + Certificate", lessons: 6, students: 45, completion: 22, status: "draft", updated: "10 เม.ย. 2026" },
];

const quizStats = [
  { question: "PLC ย่อมาจากอะไร?", attempts: 298, correct: 271, pct: 91, difficulty: "ง่าย" },
  { question: "ข้อใดคือ Input ของ PLC?", attempts: 289, correct: 243, pct: 84, difficulty: "ง่าย" },
  { question: "NO Contact ทำงานอย่างไร?", attempts: 275, correct: 207, pct: 75, difficulty: "ปานกลาง" },
  { question: "PLC Scan Cycle ลำดับใด?", attempts: 261, correct: 177, pct: 68, difficulty: "ปานกลาง" },
  { question: "TON Timer ทำงานอย่างไร?", attempts: 248, correct: 134, pct: 54, difficulty: "ยาก" },
];

const activityLog = [
  { time: "10:42", user: "มาลี รักเรียน", action: "จบ Level 5 บทที่ 6", type: "complete" },
  { time: "10:31", user: "สมชาย ใจดี", action: "ทำ Quiz ได้ 4/5 คะแนน", type: "quiz" },
  { time: "10:18", user: "จิรา ยิ้มแย้ม", action: "ดู Video Level 6 บทที่ 3", type: "video" },
  { time: "09:55", user: "ปรีดา ฉลาดมาก", action: "ดาวน์โหลด Cheat Sheet PDF", type: "download" },
  { time: "09:30", user: "ธนา มีทรัพย์", action: "สมัครสมาชิกใหม่", type: "enroll" },
  { time: "09:12", user: "นภา สวยงาม", action: "รับ Certificate of Completion", type: "cert" },
  { time: "08:47", user: "วิชัย ขยันดี", action: "เริ่มเรียน Level 2 บทที่ 1", type: "start" },
  { time: "08:30", user: "ชาตรี กล้าหาญ", action: "ทำ Timer Lab Simulation", type: "lab" },
];

const enrollmentData = [
  { month: "ม.ค.", students: 28 },
  { month: "ก.พ.", students: 41 },
  { month: "มี.ค.", students: 55 },
  { month: "เม.ย.", students: 87 },
  { month: "พ.ค.", students: 112 },
  { month: "มิ.ย.", students: 135 },
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "students", label: "นักเรียน", icon: Users },
  { key: "courses", label: "คอร์ส / เนื้อหา", icon: BookOpen },
  { key: "quiz", label: "Quiz Analytics", icon: BarChart2 },
  { key: "settings", label: "ตั้งค่า", icon: Settings },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ children, color = "slate" }) {
  const map = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-600",
    purple: "bg-purple-100 text-purple-700",
  };
  return <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${map[color]}`}>{children}</span>;
}

function MiniBar({ value, max = 100, color = "bg-blue-500" }) {
  return (
    <div className="h-1.5 w-24 rounded-full bg-slate-200">
      <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

function activityIcon(type) {
  const m = { complete: { icon: CheckCircle2, c: "text-green-500" }, quiz: { icon: Trophy, c: "text-amber-500" }, video: { icon: Video, c: "text-blue-500" }, download: { icon: FileCheck2, c: "text-purple-500" }, enroll: { icon: UserPlus, c: "text-teal-500" }, cert: { icon: Award, c: "text-pink-500" }, start: { icon: BookOpen, c: "text-indigo-500" }, lab: { icon: Zap, c: "text-orange-500" } };
  const { icon: Icon, c } = m[type] || { icon: Bell, c: "text-slate-400" };
  return <Icon className={`w-4 h-4 ${c} shrink-0`} />;
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function DashboardOverview() {
  const maxE = Math.max(...enrollmentData.map((d) => d.students));
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: Users, bg: "bg-blue-100", fg: "text-blue-700", label: "นักเรียนทั้งหมด", value: "847", delta: "+23 เดือนนี้", up: true },
          { icon: TrendingUp, bg: "bg-green-100", fg: "text-green-700", label: "Active วันนี้", value: "134", delta: "+8% vs เมื่อวาน", up: true },
          { icon: Trophy, bg: "bg-amber-100", fg: "text-amber-700", label: "จบคอร์สแล้ว", value: "92", delta: "+5 สัปดาห์นี้", up: true },
          { icon: Star, bg: "bg-purple-100", fg: "text-purple-700", label: "คะแนนเฉลี่ย Quiz", value: "78%", delta: "-2% vs เดือนก่อน", up: false },
        ].map(({ icon: Icon, bg, fg, label, value, delta, up }) => (
          <Card key={label} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <h3 className="text-3xl font-bold mt-1">{value}</h3>
                <p className={`text-xs mt-1.5 font-medium ${up ? "text-green-600" : "text-red-500"}`}>{delta}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shrink-0`}><Icon className={`w-6 h-6 ${fg}`} /></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Enrollment Chart */}
        <Card className="xl:col-span-2 rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">นักเรียนสมัครใหม่</h3>
                <p className="text-sm text-slate-500">6 เดือนย้อนหลัง</p>
              </div>
              <Badge color="green">↑ 20% MoM</Badge>
            </div>
            <div className="flex items-end gap-3 h-44 pt-4">
              {enrollmentData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">{d.students}</span>
                  <div
                    className="w-full rounded-xl bg-blue-500 transition-all hover:bg-blue-600"
                    style={{ height: `${(d.students / maxE) * 148}px` }}
                  />
                  <span className="text-xs text-slate-500">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Level Completion Funnel */}
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-lg">Completion Funnel</h3>
              <p className="text-sm text-slate-500">% นักเรียนที่ผ่านแต่ละ Level</p>
            </div>
            <div className="space-y-2.5">
              {mockCourses.map((c, idx) => (
                <div key={c.level} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{c.level}</span>
                    <span className="text-slate-500">{c.completion}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${c.completion}%`,
                        background: `hsl(${220 - idx * 22}, 70%, 55%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="xl:col-span-2 rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">กิจกรรมล่าสุด</h3>
              <Button variant="outline" className="rounded-2xl text-xs h-8">ดูทั้งหมด</Button>
            </div>
            <div className="space-y-2">
              {activityLog.map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-400 w-10 shrink-0">{a.time}</span>
                  {activityIcon(a.type)}
                  <span className="text-sm font-semibold shrink-0">{a.user}</span>
                  <span className="text-sm text-slate-600 truncate">{a.action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg">Top 5 นักเรียน</h3>
            <div className="space-y-3">
              {[...mockStudents].sort((a, b) => b.score - a.score).slice(0, 5).map((s, idx) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${idx === 0 ? "bg-amber-400 text-white" : idx === 1 ? "bg-slate-400 text-white" : idx === 2 ? "bg-orange-400 text-white" : "bg-slate-100 text-slate-500"}`}>{idx + 1}</span>
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 bg-blue-100 text-blue-700`}>{s.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.level}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-700">{s.score}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StudentsSection() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => mockStudents.filter((s) => {
    const matchSearch = s.name.includes(search) || s.email.includes(search);
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  }), [search, filterStatus]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">จัดการนักเรียน</h2>
          <p className="text-slate-500 text-sm">ทั้งหมด {mockStudents.length} คน</p>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-sm"><UserPlus className="w-4 h-4 mr-2" />เพิ่มนักเรียน</Button>
          <Button variant="outline" className="rounded-2xl text-sm"><Upload className="w-4 h-4 mr-2" />นำเข้า CSV</Button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ หรือ Email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {[["all","ทั้งหมด"],["active","Active"],["inactive","Inactive"],["completed","จบแล้ว"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilterStatus(v)} className={`px-4 py-2 rounded-2xl text-sm font-medium transition ${filterStatus === v ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{l}</button>
          ))}
        </div>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["นักเรียน","Level ปัจจุบัน","ความคืบหน้า","คะแนน Quiz","วันสมัคร","Active ล่าสุด","สถานะ",""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-5 py-3.5 first:rounded-tl-3xl last:rounded-tr-3xl">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => (
                <tr key={s.id} className={`border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${idx === filtered.length - 1 ? "border-0" : ""}`} onClick={() => setSelected(s)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">{s.avatar}</div>
                      <div>
                        <p className="font-semibold text-sm">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-sm font-medium text-blue-700">{s.level}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="space-y-1">
                      <MiniBar value={s.progress} color={s.progress >= 80 ? "bg-green-500" : s.progress >= 50 ? "bg-blue-500" : "bg-amber-500"} />
                      <span className="text-xs text-slate-500">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className={`text-sm font-bold ${s.score >= 90 ? "text-green-600" : s.score >= 70 ? "text-blue-600" : "text-amber-600"}`}>{s.score}%</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs text-slate-500">{s.enrolled}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs text-slate-500">{s.lastActive}</span></td>
                  <td className="px-5 py-3.5">
                    <Badge color={s.status === "active" ? "green" : s.status === "completed" ? "blue" : "slate"}>
                      {s.status === "active" ? "Active" : s.status === "completed" ? "จบแล้ว" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-700 flex items-center justify-center transition"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">ไม่พบนักเรียนที่ค้นหา</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">{selected.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold">{selected.name}</h3>
                  <p className="text-slate-500 text-sm">{selected.email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Level ปัจจุบัน", value: selected.level },
                { label: "ความคืบหน้า", value: `${selected.progress}%` },
                { label: "คะแนน Quiz", value: `${selected.score}%` },
                { label: "Badge", value: selected.badge },
                { label: "วันสมัคร", value: selected.enrolled },
                { label: "Active ล่าสุด", value: selected.lastActive },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="font-semibold text-sm mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">ความคืบหน้าแต่ละ Level</p>
              <div className="space-y-2">
                {mockCourses.slice(0, 5).map((c, i) => {
                  const done = i < parseInt(selected.level.replace("LEVEL ", ""));
                  const current = parseInt(selected.level.replace("LEVEL ", "")) === i;
                  return (
                    <div key={c.level} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${done ? "bg-green-100 text-green-700" : current ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
                        {done ? "✓" : i}
                      </div>
                      <p className="text-xs text-slate-600 flex-1">{c.title}</p>
                      <Badge color={done ? "green" : current ? "blue" : "slate"}>{done ? "จบแล้ว" : current ? "กำลังเรียน" : "ยังไม่ถึง"}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-700 text-sm"><Mail className="w-4 h-4 mr-2" />ส่ง Email</Button>
              <Button variant="outline" className="flex-1 rounded-2xl text-sm"><Edit2 className="w-4 h-4 mr-2" />แก้ไข</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CoursesSection() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">จัดการคอร์ส / เนื้อหา</h2>
          <p className="text-slate-500 text-sm">8 Levels • {mockCourses.filter((c) => c.status === "published").length} Published • {mockCourses.filter((c) => c.status === "draft").length} Draft</p>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-sm"><Plus className="w-4 h-4 mr-2" />เพิ่ม Level ใหม่</Button>
          <Button variant="outline" className="rounded-2xl text-sm"><Filter className="w-4 h-4 mr-2" />กรอง</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockCourses.map((c) => (
          <Card key={c.level} className="rounded-3xl border-slate-200 shadow-sm hover:shadow-md transition">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-600">{c.level}</span>
                    <Badge color={c.status === "published" ? "green" : "amber"}>{c.status === "published" ? "Published" : "Draft"}</Badge>
                  </div>
                  <h3 className="font-bold">{c.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{c.lessons} บทเรียน • อัพเดต {c.updated}</p>
                </div>
                <button className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0 transition"><MoreHorizontal className="w-4 h-4" /></button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-blue-50 p-3 text-center">
                  <p className="text-xl font-bold text-blue-700">{c.students}</p>
                  <p className="text-xs text-slate-500">นักเรียน</p>
                </div>
                <div className="rounded-2xl bg-green-50 p-3 text-center">
                  <p className="text-xl font-bold text-green-700">{c.completion}%</p>
                  <p className="text-xs text-slate-500">Completion</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-3 text-center">
                  <p className="text-xl font-bold text-amber-700">{c.lessons}</p>
                  <p className="text-xs text-slate-500">บทเรียน</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Completion Rate</span>
                  <span>{c.completion}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className={`h-2 rounded-full ${c.completion >= 80 ? "bg-green-500" : c.completion >= 50 ? "bg-blue-500" : "bg-amber-500"}`} style={{ width: `${c.completion}%` }} />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-2xl text-xs h-8"><Eye className="w-3.5 h-3.5 mr-1.5" />ดูตัวอย่าง</Button>
                <Button variant="outline" className="flex-1 rounded-2xl text-xs h-8"><PenSquare className="w-3.5 h-3.5 mr-1.5" />แก้ไขเนื้อหา</Button>
                <Button variant="outline" className="flex-1 rounded-2xl text-xs h-8"><Video className="w-3.5 h-3.5 mr-1.5" />จัดการ Video</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QuizSection() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Quiz Analytics</h2>
          <p className="text-slate-500 text-sm">วิเคราะห์ประสิทธิภาพข้อสอบและผู้เรียน</p>
        </div>
        <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-sm"><Plus className="w-4 h-4 mr-2" />เพิ่มข้อสอบ</Button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "ข้อสอบทั้งหมด", value: "5", icon: FileCheck2, bg: "bg-blue-100", fg: "text-blue-700" },
          { label: "ทำ Quiz ทั้งหมด", value: "1,371", icon: Users, bg: "bg-green-100", fg: "text-green-700" },
          { label: "คะแนนเฉลี่ย", value: "74%", icon: Star, bg: "bg-amber-100", fg: "text-amber-700" },
          { label: "ข้อที่ยากที่สุด", value: "ข้อ 5", icon: AlertTriangle, bg: "bg-red-100", fg: "text-red-700" },
        ].map(({ label, value, icon: Icon, bg, fg }) => (
          <Card key={label} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shrink-0`}><Icon className={`w-6 h-6 ${fg}`} /></div>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Question Performance */}
      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">ประสิทธิภาพแต่ละข้อ</h3>
          <div className="space-y-3">
            {quizStats.map((q, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-50 p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">Q{idx + 1}</span>
                    <p className="text-sm font-semibold">{q.question}</p>
                  </div>
                  <Badge color={q.difficulty === "ง่าย" ? "green" : q.difficulty === "ปานกลาง" ? "amber" : "red"}>{q.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>ตอบถูก {q.correct} / {q.attempts} คน</span>
                      <span className={`font-bold ${q.pct >= 80 ? "text-green-600" : q.pct >= 60 ? "text-amber-600" : "text-red-600"}`}>{q.pct}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200">
                      <div className={`h-3 rounded-full ${q.pct >= 80 ? "bg-green-500" : q.pct >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${q.pct}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1.5"><Edit2 className="w-3 h-3" />แก้ไข</button>
                    <button className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition flex items-center gap-1.5"><Trash2 className="w-3 h-3" />ลบ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">การกระจายคะแนน</h3>
          <div className="flex items-end gap-3 h-32">
            {[
              { range: "0-20%", count: 12, pct: 4 },
              { range: "21-40%", count: 38, pct: 13 },
              { range: "41-60%", count: 87, pct: 29 },
              { range: "61-80%", count: 124, pct: 41 },
              { range: "81-100%", count: 37, pct: 12 },
            ].map((d) => (
              <div key={d.range} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">{d.count}</span>
                <div
                  className={`w-full rounded-xl transition-all ${d.pct >= 40 ? "bg-green-500" : d.pct >= 25 ? "bg-blue-500" : "bg-slate-300"}`}
                  style={{ height: `${(d.pct / 41) * 80}px` }}
                />
                <span className="text-xs text-slate-500 text-center leading-3">{d.range}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">ตั้งค่าระบบ</h2>
        <p className="text-slate-500 text-sm">จัดการ Admin Users, การแจ้งเตือน และการตั้งค่าทั่วไป</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Admin Users */}
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Admin Users</h3>
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-xs h-8"><UserPlus className="w-3.5 h-3.5 mr-1.5" />เพิ่ม Admin</Button>
            </div>
            {[
              { name: "สมศักดิ์ วันดี", email: "admin@plclab.th", role: "Super Admin", avatar: "ส" },
              { name: "พิมพ์ใจ แสนดี", email: "content@plclab.th", role: "Content Editor", avatar: "พ" },
              { name: "นรินทร์ เก่งมาก", email: "support@plclab.th", role: "Support", avatar: "น" },
            ].map((u) => (
              <div key={u.email} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">{u.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <Badge color={u.role === "Super Admin" ? "purple" : u.role === "Content Editor" ? "blue" : "slate"}>{u.role}</Badge>
                <button className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"><MoreHorizontal className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold">การแจ้งเตือน</h3>
            <div className="space-y-3">
              {[
                { label: "แจ้งเตือนเมื่อมีนักเรียนสมัครใหม่", enabled: true },
                { label: "สรุปรายวันทาง Email", enabled: true },
                { label: "แจ้งเตือนเมื่อนักเรียนไม่ Active 7 วัน", enabled: false },
                { label: "รายงานรายสัปดาห์", enabled: true },
                { label: "แจ้งเตือนเมื่อมีนักเรียนจบคอร์ส", enabled: false },
              ].map(({ label, enabled }) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <p className="text-sm">{label}</p>
                  <div className={`w-10 h-5.5 rounded-full flex items-center transition-all cursor-pointer ${enabled ? "bg-blue-600" : "bg-slate-300"} p-0.5`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-all ${enabled ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold">ตั้งค่าเว็บไซต์</h3>
            <div className="space-y-3">
              {[
                { label: "ชื่อเว็บไซต์", value: "PLC Mini Lab TH" },
                { label: "คำอธิบาย", value: "Industrial Automation Academy" },
                { label: "Email ติดต่อ", value: "hello@plclab.th" },
                { label: "URL", value: "plclab.th" },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">{label}</label>
                  <input defaultValue={value} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                </div>
              ))}
            </div>
            <Button className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-sm">บันทึกการตั้งค่า</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-3xl border-red-200 shadow-sm bg-red-50">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-red-800">Danger Zone</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "รีเซ็ตข้อมูล Quiz ทั้งหมด", desc: "ล้างคะแนน Quiz ของนักเรียนทุกคน ย้อนกลับไม่ได้" },
                { label: "Export ข้อมูลนักเรียนทั้งหมด", desc: "ดาวน์โหลดเป็น CSV ไฟล์" },
                { label: "ลบคอร์สที่ Draft ทั้งหมด", desc: "ลบ Level ที่ยังไม่ได้ Publish ออกจากระบบ" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-white border border-red-200 p-3 gap-3">
                  <div>
                    <p className="text-sm font-semibold text-red-700">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Button variant="outline" className="rounded-2xl text-xs h-8 shrink-0 border-red-300 text-red-600 hover:bg-red-50">{label.startsWith("Export") ? "Export" : "ดำเนินการ"}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────
export default function PLCAdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const section = { dashboard: <DashboardOverview />, students: <StudentsSection />, courses: <CoursesSection />, quiz: <QuizSection />, settings: <SettingsSection /> };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} shrink-0 bg-slate-900 text-white flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-700 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0"><Cpu className="w-5 h-5" /></div>
          {sidebarOpen && <div><p className="font-bold text-sm">PLC Mini Lab</p><p className="text-xs text-slate-400">Admin Dashboard</p></div>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition text-sm font-medium ${activeNav === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-700 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-300 hover:bg-slate-800 hover:text-white transition text-sm font-medium">
            <Shield className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Security</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-300 hover:bg-red-900/40 hover:text-red-400 transition text-sm font-medium">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>ออกจากระบบ</span>}
          </button>
          <button onClick={() => setSidebarOpen((v) => !v)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition text-xs font-medium mt-2">
            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            {sidebarOpen && <span>ย่อ Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-xl font-bold">
              {navItems.find((n) => n.key === activeNav)?.label}
              {activeNav === "dashboard" && " Overview"}
            </h1>
            <p className="text-xs text-slate-400">วันที่ 1 มิถุนายน 2569</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input placeholder="ค้นหา..." className="pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-52 bg-slate-50" />
            </div>
            <button className="relative w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">ส</div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">สมศักดิ์ วันดี</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {section[activeNav]}
        </main>
      </div>
    </div>
  );
}
