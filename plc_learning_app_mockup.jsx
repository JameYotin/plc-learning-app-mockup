import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Cpu,
  Database,
  Download,
  Factory,
  FileCheck2,
  Gauge,
  GraduationCap,
  Layers3,
  Lightbulb,
  Lock,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  Trophy,
  Unlock,
  Video,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courseLevels = [
  {
    level: "LEVEL 0",
    title: "PLC คืออะไร? เริ่มจากศูนย์",
    subtitle: "เหมือนพี่สอนน้องปี 1 ไม่ต้องมีพื้นฐานก็เริ่มได้",
    icon: BookOpen,
    colour: "bg-blue-100 text-blue-700",
    status: "completed",
    progress: 100,
    time: "45 นาที",
    lessons: [
      "PLC คือสมองของเครื่องจักร",
      "Input / Output คืออะไร",
      "Sensor → PLC → Actuator",
      "PLC Scan Cycle แบบเข้าใจง่าย",
      "Mini Quiz: แยก Input กับ Output",
    ],
  },
  {
    level: "LEVEL 1",
    title: "รู้จัก Siemens S7 และ TIA Portal",
    subtitle: "เข้าใจ S7-1200, S7-1500 และหน้าตาโปรแกรม TIA Portal",
    icon: Cpu,
    colour: "bg-indigo-100 text-indigo-700",
    status: "active",
    progress: 72,
    time: "1.5 ชม.",
    lessons: [
      "S7-1200 เหมาะกับงานแบบไหน",
      "S7-1500 ใช้ในโรงงานระดับไหน",
      "TIA Portal คืออะไร",
      "สร้าง Project ใหม่",
      "Add CPU และตั้งค่า Device",
      "Go Online / Download Programme",
    ],
  },
  {
    level: "LEVEL 2",
    title: "Siemens Addressing และ Tag Table",
    subtitle: "อ่าน I0.0, Q0.0, M0.0, DB ให้เป็นก่อนเขียน Ladder",
    icon: Database,
    colour: "bg-purple-100 text-purple-700",
    status: "active",
    progress: 48,
    time: "1 ชม.",
    lessons: [
      "I = Input, Q = Output, M = Memory",
      "Tag Table คือสมุดรายชื่อของสัญญาณ",
      "BOOL / INT / REAL แบบภาษาคน",
      "Data Block คือกล่องเก็บข้อมูล",
      "Workshop: ตั้งชื่อ Tag ให้มืออาชีพ",
    ],
  },
  {
    level: "LEVEL 3",
    title: "Ladder Logic พื้นฐาน",
    subtitle: "เข้าใจ NO, NC, Coil และวงจร Start/Stop",
    icon: CircuitBoard,
    colour: "bg-green-100 text-green-700",
    status: "unlocked",
    progress: 18,
    time: "2 ชม.",
    lessons: [
      "NO Contact คืออะไร",
      "NC Contact ใช้หยุดเครื่องอย่างไร",
      "Coil คือคำสั่ง Output",
      "Motor Start/Stop Circuit",
      "Seal-in / Latching Circuit",
      "Siemens S7 Ladder Lab",
    ],
  },
  {
    level: "LEVEL 4",
    title: "Timer / Counter แบบใช้งานจริง",
    subtitle: "TON, TOF, TP, CTU, CTD พร้อมตัวอย่างโรงงาน",
    icon: Gauge,
    colour: "bg-amber-100 text-amber-700",
    status: "locked",
    progress: 0,
    time: "2 ชม.",
    lessons: [
      "TON: หน่วงเวลาก่อนทำงาน",
      "TOF: หน่วงเวลาก่อนหยุด",
      "TP: สร้าง Pulse",
      "CTU: นับชิ้นงาน",
      "Workshop: นับขวดบน Conveyor",
    ],
  },
  {
    level: "LEVEL 5",
    title: "Industrial PLC Case Study",
    subtitle: "เอาความรู้ไปคุม Conveyor, Pump, Valve, Motor Interlock",
    icon: Factory,
    colour: "bg-slate-200 text-slate-800",
    status: "locked",
    progress: 0,
    time: "3 ชม.",
    lessons: [
      "Conveyor Control",
      "Tank Filling System",
      "Pump Auto/Manual",
      "Motor Interlock",
      "Alarm และ Warning Logic",
    ],
  },
  {
    level: "LEVEL 6",
    title: "Troubleshooting Lab",
    subtitle: "ฝึกคิดแบบ Automation Engineer เมื่อเครื่องจักรมีปัญหา",
    icon: Search,
    colour: "bg-red-100 text-red-700",
    status: "locked",
    progress: 0,
    time: "2.5 ชม.",
    lessons: [
      "Motor กด Start แล้วไม่ทำงาน",
      "Sensor ไม่ Detect",
      "PLC Output ON แต่ Motor ไม่หมุน",
      "Communication Fault",
      "อ่าน Logic เพื่อหา Root Cause",
    ],
  },
  {
    level: "LEVEL 7",
    title: "Mini Project + Certificate",
    subtitle: "ทำโปรเจกต์จบและรับ Certificate Mockup",
    icon: GraduationCap,
    colour: "bg-pink-100 text-pink-700",
    status: "locked",
    progress: 0,
    time: "4 ชม.",
    lessons: [
      "Mini Project: Conveyor Sorting",
      "Final Exam",
      "Download Cheat Sheet",
      "Certificate of Completion",
    ],
  },
];

const lessonTabs = {
  intro: {
    tag: "เริ่มง่ายที่สุด",
    title: "PLC คืออะไร?",
    subtitle: "PLC = คอมพิวเตอร์อุตสาหกรรมที่ใช้ควบคุมเครื่องจักร",
    content:
      "ลองนึกภาพว่าเครื่องจักรหนึ่งตัวมีปุ่ม Start, ปุ่ม Stop, Sensor, Motor และ Valve ถ้าเราอยากให้ทุกอย่างทำงานตามลำดับแบบปลอดภัย เราจะใช้ PLC เป็นสมองกลางในการรับสัญญาณ คิดตาม Logic แล้วสั่ง Output ให้เครื่องจักรทำงาน",
    analogy:
      "เปรียบเทียบง่าย ๆ: PLC คือสมอง, Sensor คือดวงตา, Push Button คือคำสั่งจากคน, Motor/Valve คือมือที่ลงมือทำงาน",
    bullets: [
      "PLC อ่านสถานะจาก Input เช่น ปุ่มกด Sensor Limit Switch",
      "PLC ประมวลผลตาม Logic ที่เราเขียนไว้",
      "PLC สั่ง Output เช่น Motor, Lamp, Valve, Relay",
      "PLC ทำซ้ำเร็วมากเป็นรอบ ๆ เรียกว่า Scan Cycle",
    ],
  },
  siemens: {
    tag: "Siemens S7 Focus",
    title: "S7-1200 / S7-1500 / TIA Portal",
    subtitle: "เส้นทางนี้เน้น Siemens S7 ที่เจอจริงในงาน Automation",
    content:
      "S7-1200 มักใช้กับเครื่องจักรขนาดเล็กถึงกลาง เหมาะกับผู้เริ่มต้นและโปรเจกต์ควบคุมทั่วไป ส่วน S7-1500 ใช้กับระบบที่ซับซ้อนกว่า เช่น line production, process automation หรือโรงงานที่ต้องการ performance สูง โปรแกรมที่ใช้เขียนและ Download ลง PLC คือ TIA Portal",
    bullets: [
      "S7-1200: เรียนง่าย เหมาะกับเครื่องจักรทั่วไป",
      "S7-1500: ใช้ในงานโรงงานที่ใหญ่และซับซ้อนกว่า",
      "TIA Portal: โปรแกรมหลักสำหรับเขียน Logic, ตั้งค่า Hardware, Online Monitoring",
      "สิ่งที่ต้องเข้าใจเร็วที่สุดคือ Address, Tag, Ladder และการ Go Online",
    ],
  },
  addressing: {
    tag: "จำให้ได้ก่อนเขียน Ladder",
    title: "Siemens Addressing แบบภาษาคน",
    subtitle: "I, Q, M, DB คืออะไร?",
    content:
      "Address คือที่อยู่ของสัญญาณใน PLC เหมือนบ้านเลขที่ของข้อมูล ถ้าเราเขียน I0.0 แปลว่าเรากำลังอ่าน Digital Input จุดหนึ่ง ถ้าเขียน Q0.0 แปลว่าเรากำลังสั่ง Digital Output จุดหนึ่ง",
    examples: [
      { address: "I0.0", name: "Start_PB", meaning: "ปุ่ม Start ที่ต่อเข้าขา Digital Input" },
      { address: "I0.1", name: "Stop_PB", meaning: "ปุ่ม Stop ที่ PLC อ่านสถานะ" },
      { address: "Q0.0", name: "Motor_Run", meaning: "Output สำหรับสั่ง Motor Contactor" },
      { address: "M0.0", name: "Motor_Hold", meaning: "Memory Bit ใช้จำสถานะภายใน Logic" },
      { address: "DB1.DBX0.0", name: "Auto_Mode", meaning: "ข้อมูลแบบเป็นระบบใน Data Block" },
    ],
  },
};

const badges = [
  { title: "PLC Starter", desc: "จบ Level 0", icon: Sparkles, earned: true },
  { title: "S7 Explorer", desc: "เข้าใจ S7/TIA", icon: Cpu, earned: true },
  { title: "Ladder Beginner", desc: "เริ่มเขียน Ladder", icon: CircuitBoard, earned: false },
  { title: "Troubleshooter", desc: "แก้ปัญหาเครื่องจักร", icon: Search, earned: false },
];

export default function PLCLearningAppMockup() {
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [estop, setEstop] = useState(false);
  const [overload, setOverload] = useState(false);
  const [answer, setAnswer] = useState("");
  const [activeTab, setActiveTab] = useState("intro");
  const [selectedLevel, setSelectedLevel] = useState(courseLevels[0]);

  const motorRunning = start && !stop && !estop && !overload;
  const trip = estop || overload;

  const explanation = useMemo(() => {
    if (estop) return "E-Stop ถูกกดอยู่ → วงจร Safety เปิดออก เครื่องต้องหยุดทันทีเพื่อความปลอดภัย";
    if (overload) return "Overload Trip → PLC ควรหยุด Motor เพื่อป้องกันอุปกรณ์เสียหาย";
    if (stop) return "Stop ถูกกด → หน้าสัมผัส NC เปิดออก ทำให้ Motor หยุด";
    if (motorRunning) return "เงื่อนไขครบ: Start ON และ Safety ปกติ → PLC สั่ง Q0.0 ให้ Motor RUN";
    return "Motor ยังหยุดอยู่ ลองกด Start โดยที่ Stop, E-Stop และ Overload ไม่ Active";
  }, [estop, overload, stop, motorRunning]);

  const activeContent = lessonTabs[activeTab];

  const reset = () => {
    setStart(false);
    setStop(false);
    setEstop(false);
    setOverload(false);
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="rounded-[2rem] bg-slate-900 text-white p-7 overflow-hidden relative">
          <div className="absolute right-8 top-6 opacity-10">
            <Cpu className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-blue-300">PLC Mini Lab TH • Siemens S7 Academy</p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">เรียน PLC Siemens S7 จากศูนย์</h1>
              <p className="text-slate-300 mt-3 max-w-3xl leading-7">
                คอร์สออนไลน์สำหรับเรียนเองแบบ WFH สไตล์พี่สอนน้องปี 1 เริ่มจาก PLC คืออะไร ไปจนถึง S7-1200, S7-1500, TIA Portal, Ladder Logic, Troubleshooting และ Mini Project
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">เข้าเรียนต่อ</Button>
              <Button variant="outline" className="rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10">
                ดาวน์โหลด Roadmap
              </Button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center"><Brain className="w-6 h-6 text-blue-700" /></div>
              <div><p className="text-sm text-slate-500">รูปแบบการสอน</p><h3 className="font-bold">ง่าย → ยาก</h3></div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center"><Cpu className="w-6 h-6 text-green-700" /></div>
              <div><p className="text-sm text-slate-500">ขอบเขต</p><h3 className="font-bold">S7-1200 / S7-1500</h3></div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center"><Video className="w-6 h-6 text-amber-700" /></div>
              <div><p className="text-sm text-slate-500">เรียนแบบ WFH</p><h3 className="font-bold">Video + Lab</h3></div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center"><Trophy className="w-6 h-6 text-purple-700" /></div>
              <div><p className="text-sm text-slate-500">เป้าหมาย</p><h3 className="font-bold">ทำงานจริงได้</h3></div>
            </CardContent>
          </Card>
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">เส้นทางการเรียน</h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">8 Levels</span>
            </div>
            <div className="space-y-3">
              {courseLevels.map((item) => (
                <Card
                  key={item.title}
                  onClick={() => setSelectedLevel(item)}
                  className={`rounded-3xl shadow-sm border-slate-200 hover:shadow-md transition cursor-pointer ${selectedLevel.title === item.title ? "ring-2 ring-blue-500" : ""}`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.colour}`}><item.icon className="w-5 h-5" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-slate-500">{item.level}</p>
                          {item.status === "locked" ? <Lock className="w-3 h-3 text-slate-400" /> : <Unlock className="w-3 h-3 text-green-600" />}
                        </div>
                        <h3 className="font-semibold leading-tight">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 mt-2" />
                    </div>
                    <div className="h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${item.progress}%` }} /></div>
                    <div className="flex justify-between text-xs text-slate-500"><span>{item.progress}%</span><span>{item.time}</span></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </aside>

          <section className="lg:col-span-3 space-y-6">
            <Card className="rounded-3xl shadow-sm border-slate-200">
              <CardContent className="p-6 space-y-5">
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600">{selectedLevel.level} • เข้าเรียนใน Level นี้</p>
                    <h2 className="text-2xl md:text-3xl font-bold">{selectedLevel.title}</h2>
                    <p className="text-slate-600 mt-2 max-w-3xl leading-7">{selectedLevel.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700"><Play className="w-4 h-4 mr-2" />เริ่มเรียน</Button>
                    <Button variant="outline" className="rounded-2xl"><Download className="w-4 h-4 mr-2" />Cheat Sheet</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {selectedLevel.lessons.map((lesson, idx) => (
                    <div key={lesson} className="rounded-2xl border border-slate-200 bg-white p-4 flex gap-3 items-start">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${idx < 2 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{idx + 1}</div>
                      <div>
                        <h4 className="text-sm font-semibold">{lesson}</h4>
                        <p className="text-xs text-slate-500 mt-1">Video • Note • Quiz • Lab</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm border-slate-200">
              <CardContent className="p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600">ตัวอย่างบทเรียน • สอนง่ายมาก</p>
                    <h2 className="text-2xl md:text-3xl font-bold">เรียนจากพื้นฐานก่อนเข้าห้อง Lab</h2>
                    <p className="text-slate-600 mt-2 max-w-2xl">กดเปลี่ยนหัวข้อเพื่อดูเนื้อหาที่ผู้เรียนจะเห็นในคอร์ส</p>
                  </div>
                  <div className="flex flex-wrap gap-2 bg-slate-100 rounded-2xl p-1">
                    {[
                      ["intro", "PLC พื้นฐาน"],
                      ["siemens", "Siemens S7"],
                      ["addressing", "Addressing"],
                    ].map(([key, label]) => (
                      <button key={key} onClick={() => setActiveTab(key)} className={`px-4 py-2 rounded-xl text-sm font-medium ${activeTab === key ? "bg-white shadow-sm text-blue-700" : "text-slate-500"}`}>{label}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-blue-50 p-5 space-y-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">{activeContent.tag}</span>
                    <h3 className="text-xl font-bold">{activeContent.title}</h3>
                    <p className="text-sm font-medium text-slate-600">{activeContent.subtitle}</p>
                    <p className="text-sm leading-7 text-slate-700">{activeContent.content}</p>
                    {activeContent.analogy && <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700"><strong>จำง่าย:</strong> {activeContent.analogy}</div>}
                  </div>
                  <div className="rounded-3xl bg-white border border-slate-200 p-5 space-y-3">
                    {activeContent.examples ? (
                      <>
                        <h3 className="font-bold">ตัวอย่าง Address ใน Siemens S7</h3>
                        {activeContent.examples.map((item) => (
                          <div key={item.address} className="rounded-2xl bg-slate-50 p-4 space-y-1">
                            <div className="flex justify-between gap-4"><span className="font-mono font-bold text-blue-700">{item.address}</span><span className="text-sm font-semibold text-slate-800">{item.name}</span></div>
                            <p className="text-sm text-slate-600">{item.meaning}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <h3 className="font-bold">สรุปสิ่งที่ต้องเข้าใจ</h3>
                        {activeContent.bullets.map((point) => (
                          <div key={point} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                            <p className="text-sm text-slate-700">{point}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-100 p-5 grid grid-cols-1 md:grid-cols-5 gap-3">
                  {["Input", "PLC อ่านค่า", "PLC คิด Logic", "PLC สั่ง Output", "เครื่องจักรทำงาน"].map((step, idx) => (
                    <div key={step} className="flex md:block items-center gap-3">
                      <div className="rounded-2xl bg-white p-4 text-center text-sm font-semibold min-h-[74px] flex items-center justify-center">{step}</div>
                      {idx < 4 && <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 mx-auto mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm border-slate-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-slate-950 text-white p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-300">Siemens S7 Ladder Lab • เหมือน Online Monitoring</p>
                      <h2 className="text-2xl font-bold">Motor Start / Stop Ladder Simulation</h2>
                      <p className="text-slate-300 mt-1">จำลองหน้าตา Ladder ให้ใกล้กับงานจริง: มี Network, Power Rail, Contact, Coil, Tag และ Power Flow สีเขียว</p>
                    </div>
                    <Button variant="outline" className="rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" /> Reset</Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button onClick={() => setStart(!start)} className={`rounded-2xl h-16 ${start ? "bg-green-600 hover:bg-green-700" : "bg-slate-800 hover:bg-slate-700"}`}><Play className="w-4 h-4 mr-2" /> I0.0 Start PB</Button>
                    <Button onClick={() => setStop(!stop)} className={`rounded-2xl h-16 ${stop ? "bg-red-600 hover:bg-red-700" : "bg-slate-800 hover:bg-slate-700"}`}><Square className="w-4 h-4 mr-2" /> I0.1 Stop PB</Button>
                    <Button onClick={() => setEstop(!estop)} className={`rounded-2xl h-16 ${estop ? "bg-orange-600 hover:bg-orange-700" : "bg-slate-800 hover:bg-slate-700"}`}><AlertTriangle className="w-4 h-4 mr-2" /> I0.2 E-Stop</Button>
                    <Button onClick={() => setOverload(!overload)} className={`rounded-2xl h-16 ${overload ? "bg-amber-600 hover:bg-amber-700" : "bg-slate-800 hover:bg-slate-700"}`}><ShieldCheck className="w-4 h-4 mr-2" /> I0.3 Overload</Button>
                  </div>

                  <div className="grid grid-cols-1 2xl:grid-cols-5 gap-4">
                    <div className="2xl:col-span-2 rounded-3xl bg-slate-900 p-5 space-y-4 border border-slate-800">
                      <h3 className="font-semibold">I/O Status Table</h3>
                      {[
                        ["I0.0", "Start_PB", start, "NO", "กดเพื่อเริ่ม Motor"],
                        ["I0.1", "Stop_PB", !stop, "NC", "ปกติปิด / กดแล้วเปิด"],
                        ["I0.2", "EStop_OK", !estop, "NC", "Safety ต้องปกติ"],
                        ["I0.3", "OL_OK", !overload, "NC", "Overload ต้องไม่ Trip"],
                        ["Q0.0", "Motor_Run", motorRunning, "COIL", "Output ไป Motor Contactor"],
                      ].map(([addr, tag, active, type, note]) => (
                        <div key={addr} className="grid grid-cols-12 gap-2 items-center rounded-2xl bg-black/30 p-3 text-sm">
                          <span className="col-span-2 font-mono text-blue-300">{addr}</span>
                          <span className="col-span-3 font-semibold">{tag}</span>
                          <span className={`col-span-2 text-center rounded-full px-2 py-1 text-xs font-bold ${active ? "bg-green-500/20 text-green-300" : "bg-slate-700 text-slate-300"}`}>{active ? "TRUE" : "FALSE"}</span>
                          <span className="col-span-2 text-slate-400 text-xs">{type}</span>
                          <span className="col-span-3 text-slate-400 text-xs">{note}</span>
                        </div>
                      ))}
                      <div className="rounded-2xl bg-black/30 p-4 text-sm text-slate-300 leading-7">{explanation}</div>
                    </div>

                    <div className="2xl:col-span-3 rounded-3xl bg-[#101827] p-5 border border-slate-800 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">Main [OB1] • Network 1</h3>
                          <p className="text-xs text-slate-400 mt-1">Title: Motor Start/Stop with Safety Interlock</p>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300">Green = Power Flow</span>
                          <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300">Grey = No Power</span>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0b1220] border border-slate-700 p-5 overflow-x-auto">
                        <div className="min-w-[760px]">
                          <div className="grid grid-cols-[18px_1fr_18px] gap-0 items-center">
                            <div className="h-40 border-l-4 border-slate-400" />
                            <div className="space-y-4">
                              <div className="grid grid-cols-5 items-center gap-2">
                                {[
                                  { label: 'Start_PB', addr: 'I0.0', type: 'NO', ok: start, symbol: '| |' },
                                  { label: 'Stop_PB', addr: 'I0.1', type: 'NC', ok: !stop, symbol: '|/|' },
                                  { label: 'EStop_OK', addr: 'I0.2', type: 'NC', ok: !estop, symbol: '|/|' },
                                  { label: 'OL_OK', addr: 'I0.3', type: 'NC', ok: !overload, symbol: '|/|' },
                                  { label: 'Motor_Run', addr: 'Q0.0', type: 'COIL', ok: motorRunning, symbol: '( )' },
                                ].map((block, idx) => (
                                  <div key={block.addr} className="flex items-center">
                                    <div className={`h-1 flex-1 ${idx === 0 ? (block.ok ? "bg-green-400" : "bg-slate-600") : "bg-slate-600"}`} />
                                    <div className={`w-28 rounded-xl border px-2 py-3 text-center ${block.ok ? "border-green-400 bg-green-400/10 shadow-lg shadow-green-400/10" : "border-slate-600 bg-slate-800"}`}>
                                      <div className={`font-mono text-lg font-bold ${block.ok ? "text-green-300" : "text-slate-400"}`}>{block.symbol}</div>
                                      <div className="text-[11px] text-slate-300 mt-1">{block.label}</div>
                                      <div className="text-[11px] text-blue-300 font-mono">{block.addr}</div>
                                      <div className="text-[10px] text-slate-500">{block.type}</div>
                                    </div>
                                    <div className={`h-1 flex-1 ${(idx < 4 ? [start, start && !stop, start && !stop && !estop, start && !stop && !estop && !overload][idx] : motorRunning) ? "bg-green-400" : "bg-slate-600"}`} />
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-5 gap-2 text-xs text-center text-slate-400">
                                <div>เริ่มจาก Start ต้อง TRUE</div>
                                <div>Stop ต้องไม่ถูกกด</div>
                                <div>E-Stop ต้องปกติ</div>
                                <div>Overload ต้องไม่ Trip</div>
                                <div>ครบทุกเงื่อนไข → Q0.0 ON</div>
                              </div>
                            </div>
                            <div className="h-40 border-l-4 border-slate-400" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="rounded-2xl bg-black/30 p-4">
                          <p className="text-xs text-slate-400">Step 1</p>
                          <h4 className="font-semibold">ดู Power Flow</h4>
                          <p className="text-sm text-slate-300 mt-1 leading-6">ถ้าเส้นเขียวไหลถึง Coil แปลว่า Logic ผ่าน</p>
                        </div>
                        <div className="rounded-2xl bg-black/30 p-4">
                          <p className="text-xs text-slate-400">Step 2</p>
                          <h4 className="font-semibold">ดู Contact ที่ไม่เขียว</h4>
                          <p className="text-sm text-slate-300 mt-1 leading-6">จุดที่ไม่เขียวคือเงื่อนไขที่ทำให้ Motor ไม่ Run</p>
                        </div>
                        <div className="rounded-2xl bg-black/30 p-4">
                          <p className="text-xs text-slate-400">Step 3</p>
                          <h4 className="font-semibold">เทียบกับ Field</h4>
                          <p className="text-sm text-slate-300 mt-1 leading-6">ถ้า Q0.0 ON แต่ Motor ไม่หมุน ให้ไปเช็ค Contactor/MCC/Motor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 rounded-3xl shadow-sm border-slate-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-yellow-700" /></div><div><h2 className="text-xl font-bold">ห้องแก้ปัญหา: Troubleshooting Scenario</h2><p className="text-slate-600 text-sm">ฝึกคิดแบบวิศวกรเมื่อเครื่องจักรไม่ทำงาน</p></div></div>
                  <div className="rounded-3xl bg-red-50 p-5 space-y-3">
                    <h3 className="font-bold text-red-800">Scenario: กด Start แล้ว Motor ไม่หมุน</h3>
                    <p className="text-sm leading-7 text-slate-700">ให้ผู้เรียนไล่เช็คทีละจุด: ปุ่ม Start เข้า PLC หรือไม่? Stop/E-Stop/Overload เปิดวงจรหรือไม่? Q0.0 ON หรือยัง? ถ้า Q0.0 ON แล้ว Motor ยังไม่หมุน อาจเป็นปัญหาที่ Contactor, MCC, Motor หรือ Field Wiring</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {["ตรวจ I0.0 Start", "ตรวจ I0.1 Stop NC", "ตรวจ I0.2 E-Stop", "ตรวจ Q0.0 Output", "ตรวจ Contactor", "ตรวจ Motor/MCC"].map((item) => <div key={item} className="rounded-2xl bg-white p-3 text-sm flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{item}</div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm border-slate-200">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Mini Quiz</h2>
                  <p className="text-sm text-slate-600">ใน Siemens S7 Address ใดคือ Digital Output?</p>
                  <div className="space-y-2">
                    {["I0.0", "Q0.0", "M0.0"].map((option) => <button key={option} onClick={() => setAnswer(option)} className={`w-full text-left rounded-2xl border p-3 text-sm transition ${answer === option ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>{option}</button>)}
                  </div>
                  {answer && <div className={`rounded-2xl p-3 text-sm ${answer === "Q0.0" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{answer === "Q0.0" ? "ถูกต้องค่ะ Q = Output เช่น Motor, Lamp, Valve" : "ยังไม่ใช่ค่ะ I = Input, Q = Output, M = Memory"}</div>}
                </CardContent>
              </Card>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <Card key={badge.title} className={`rounded-3xl shadow-sm border-slate-200 ${badge.earned ? "bg-white" : "bg-slate-100 opacity-80"}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${badge.earned ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-500"}`}><badge.icon className="w-6 h-6" /></div>
                    <div><h3 className="font-bold">{badge.title}</h3><p className="text-sm text-slate-500">{badge.desc}</p></div>
                  </CardContent>
                </Card>
              ))}
            </section>

            <Card className="rounded-3xl shadow-sm border-slate-200 bg-white">
              <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                <div className="rounded-3xl bg-blue-50 p-5 space-y-3"><Download className="w-7 h-7 text-blue-700" /><h3 className="font-bold">Download Cheat Sheet</h3><p className="text-sm text-slate-600 leading-6">สรุป Address, NO/NC, Timer, Counter และ Ladder Symbol ไว้ทบทวนก่อนสอบหรือก่อนทำงานจริง</p></div>
                <div className="rounded-3xl bg-green-50 p-5 space-y-3"><Layers3 className="w-7 h-7 text-green-700" /><h3 className="font-bold">Mini Project</h3><p className="text-sm text-slate-600 leading-6">โปรเจกต์จบ: Conveyor Sorting System มี Sensor, Motor, Counter, Alarm และ Auto/Manual Mode</p></div>
                <div className="rounded-3xl bg-amber-50 p-5 space-y-3"><FileCheck2 className="w-7 h-7 text-amber-700" /><h3 className="font-bold">Certificate Mockup</h3><p className="text-sm text-slate-600 leading-6">เมื่อจบ Final Exam ผู้เรียนจะได้ใบ Certificate สำหรับใส่ Portfolio หรือ LinkedIn</p></div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm border-slate-200 bg-slate-900 text-white">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <Award className="w-7 h-7 text-green-300" />
                  <h2 className="text-xl font-bold">เป้าหมาย MVP แรก</h2>
                  <p className="text-sm text-slate-300 max-w-2xl leading-7">สร้างให้ครบ 3 Level แรกก่อน: PLC พื้นฐาน, Siemens S7/TIA Portal, Addressing + Motor Start/Stop Lab แล้วค่อยขยายไป Timer, Counter, Troubleshooting และ Mini Project</p>
                </div>
                <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100"><Clock3 className="w-4 h-4 mr-2" />เริ่มบทถัดไป</Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
