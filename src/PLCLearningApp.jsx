import React, { useMemo, useState, useEffect, useRef } from "react";
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
  Trophy,
  Unlock,
  Video,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── Course Data ─────────────────────────────────────────────────────────────
const courseLevels = [
  {
    level: "LEVEL 0",
    title: "PLC คืออะไร? เริ่มจากศูนย์",
    subtitle: "ไม่ต้องมีพื้นฐาน เรียนได้ทันที สไตล์พี่สอนน้อง",
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
      "ตัวอย่างการใช้ PLC ในโรงงานจริง",
      "Mini Quiz: แยก Input กับ Output",
    ],
    overview:
      "PLC (Programmable Logic Controller) คือคอมพิวเตอร์อุตสาหกรรมที่ออกแบบมาเพื่อควบคุมเครื่องจักรโดยเฉพาะ ทนทานต่อสภาพแวดล้อมโรงงาน ไม่ว่าจะเป็นความร้อน ฝุ่น หรือการสั่นสะเทือน ใช้งานได้ 24/7",
    keyPoints: [
      "อ่านสัญญาณจาก Sensor, ปุ่มกด, Limit Switch",
      "ประมวลผลตาม Logic ที่โปรแกรมไว้",
      "สั่งงาน Motor, Valve, Lamp, Conveyor",
      "ทำงานซ้ำอย่างเที่ยงตรงตลอด 24 ชั่วโมง",
    ],
  },
  {
    level: "LEVEL 1",
    title: "PLC Hardware และ Programming Software",
    subtitle: "รู้จัก CPU, I/O Module และโปรแกรมที่ใช้เขียน Logic",
    icon: Cpu,
    colour: "bg-indigo-100 text-indigo-700",
    status: "active",
    progress: 72,
    time: "1.5 ชม.",
    lessons: [
      "โครงสร้าง PLC: CPU, Power Supply, I/O Module",
      "Compact PLC vs Modular PLC",
      "Digital I/O vs Analog I/O",
      "PLC ยี่ห้อยอดนิยม: Siemens, Allen-Bradley, Mitsubishi, Omron",
      "Programming Software ของแต่ละยี่ห้อ",
      "เชื่อมต่อ PLC กับ Computer และ Download Program",
    ],
    overview:
      "PLC ประกอบด้วย CPU สำหรับประมวลผล, Power Supply จ่ายไฟ, Input Module รับสัญญาณ, Output Module สั่งงาน และ Communication Port สำหรับ Programming และเชื่อมต่อกับระบบอื่น",
    keyPoints: [
      "CPU คือสมองของ PLC ทำการประมวลผล Logic ทั้งหมด",
      "I/O Module ขยาย Input/Output ได้ตามความต้องการ",
      "Compact PLC เหมาะเครื่องจักรขนาดเล็ก-กลาง",
      "Modular PLC เหมาะระบบใหญ่ที่ต้องการความยืดหยุ่น",
    ],
  },
  {
    level: "LEVEL 2",
    title: "PLC Memory Map และ Tag Table",
    subtitle: "เข้าใจการจัดการ Input, Output, Memory, Timer, Counter",
    icon: Database,
    colour: "bg-purple-100 text-purple-700",
    status: "active",
    progress: 48,
    time: "1 ชม.",
    lessons: [
      "Digital Input (DI) เก็บสถานะจาก Sensor / ปุ่มกด",
      "Digital Output (DO) สั่งงาน Motor / Valve / Lamp",
      "Internal Memory Bit ใช้จำสถานะภายใน Logic",
      "Timer Memory เก็บค่าเวลา TON / TOF / TP",
      "Counter Memory นับจำนวน CTU / CTD",
      "Workshop: ออกแบบ Tag Table สำหรับงานจริง",
    ],
    overview:
      "Memory Map คือแผนผังการจัดเก็บข้อมูลใน PLC แต่ละยี่ห้อตั้งชื่อต่างกัน แต่โครงสร้างพื้นฐานเหมือนกัน เข้าใจ Memory Map แล้วย้ายยี่ห้อ PLC ได้ง่าย",
    keyPoints: [
      "Input ที่ Address I หรือ X หรือ DI (ขึ้นกับยี่ห้อ)",
      "Output ที่ Address Q หรือ Y หรือ DO",
      "Memory Bit (M/B) ใช้เก็บค่าชั่วคราวใน Logic",
      "Data Register (D/N/%MW) เก็บตัวเลข เช่น ความเร็ว อุณหภูมิ",
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
      "Ladder Diagram คืออะไร เหมือน Wiring Diagram",
      "NO Contact (Normally Open) ใช้งานอย่างไร",
      "NC Contact (Normally Closed) ใช้หยุดเครื่องอย่างไร",
      "Output Coil คือคำสั่ง Output",
      "Motor Start/Stop Circuit",
      "Seal-in / Latching Circuit",
      "Series และ Parallel Contact",
    ],
    overview:
      "Ladder Logic ออกแบบมาให้วิศวกรไฟฟ้าเข้าใจได้ง่าย หน้าตาคล้าย Wiring Diagram ของ Relay Panel รองรับทุกยี่ห้อ PLC และเป็น IEC 61131-3 Standard",
    keyPoints: [
      "Rung คือ 1 บรรทัดของ Logic เหมือน 1 วงจรไฟฟ้า",
      "NO = Normally Open ปกติวงจรเปิด เมื่อ ON วงจรปิด",
      "NC = Normally Closed ปกติวงจรปิด เมื่อ ON วงจรเปิด",
      "Coil คือคำสั่งสั่ง Output ให้ ON หรือ OFF",
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
      "TON (On-Delay): หน่วงเวลาก่อน Output ON",
      "TOF (Off-Delay): หน่วงเวลาก่อน Output OFF",
      "TP (Pulse): สร้าง Pulse กำหนดเวลา",
      "CTU (Count Up): นับขึ้น",
      "CTD (Count Down): นับลง",
      "Workshop: นับขวดบน Conveyor ด้วย Counter",
      "Workshop: หน่วงเวลาเปิด Pump ด้วย TON",
    ],
    overview:
      "Timer และ Counter เป็น Function พื้นฐานที่ใช้บ่อยมากในงานอุตสาหกรรม ช่วยควบคุมเวลาและนับจำนวนชิ้นงานโดยอัตโนมัติ",
    keyPoints: [
      "TON หน่วงเวลาก่อน Output ON เช่น เปิด Motor หลังจาก 5 วิ",
      "TOF Output ยัง ON อยู่หลัง Input ดับ เช่น พัดลมระบายความร้อน",
      "CTU นับขึ้นทุกครั้งที่ Input เปลี่ยนจาก OFF→ON",
      "CTD นับลง เช่น นับสินค้าที่ต้องผลิตที่เหลืออยู่",
    ],
  },
  {
    level: "LEVEL 5",
    title: "Industrial PLC Case Study",
    subtitle: "Conveyor, Pump, Valve, Motor Interlock จากงานจริง",
    icon: Factory,
    colour: "bg-slate-200 text-slate-800",
    status: "locked",
    progress: 0,
    time: "3 ชม.",
    lessons: [
      "Conveyor Start/Stop + Emergency Stop",
      "Tank Filling System อัตโนมัติ",
      "Pump Auto/Manual: Hand-Off-Auto Switch",
      "Motor Interlock ป้องกัน 2 Motor ทำงานพร้อมกัน",
      "Alarm และ Warning Logic",
      "Sequence Control ทำงานตามลำดับขั้นตอน",
    ],
    overview:
      "Case Study จากงานโรงงานจริง ช่วยให้เข้าใจว่า PLC Logic ถูกนำไปใช้งานจริงอย่างไร และฝึกคิดแบบ Automation Engineer มืออาชีพ",
    keyPoints: [
      "Hand-Off-Auto Switch ให้เลือก Mode การทำงาน",
      "Interlock ป้องกันความผิดพลาดจากพนักงาน",
      "Alarm ส่งสัญญาณเตือนก่อนเครื่องจะเสียหาย",
      "Sequence Logic ทำงานตามขั้นตอนที่กำหนด",
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
      "Sensor ไม่ Detect ชิ้นงาน",
      "PLC Output ON แต่ Motor ไม่หมุน",
      "Communication Fault ระหว่าง PLC กับ HMI",
      "Online Monitoring วิธีดู Power Flow จริง",
      "อ่าน Logic เพื่อหา Root Cause",
    ],
    overview:
      "Troubleshooting คือทักษะที่ทำให้วิศวกร Automation มีค่า เพราะสามารถแก้ปัญหาได้เร็ว ลด Downtime และป้องกันปัญหาซ้ำ",
    keyPoints: [
      "ใช้ Online Monitoring ดูสถานะ I/O จริงใน PLC",
      "แยกให้ชัดว่าปัญหาอยู่ที่ Logic, Wiring หรือ Hardware",
      "ดู Fault Code ของ PLC ก่อนเสมอ",
      "บันทึก Root Cause ป้องกันปัญหาซ้ำในอนาคต",
    ],
  },
  {
    level: "LEVEL 7",
    title: "Mini Project + Certificate",
    subtitle: "ทำโปรเจกต์จบและรับ Certificate",
    icon: GraduationCap,
    colour: "bg-pink-100 text-pink-700",
    status: "locked",
    progress: 0,
    time: "4 ชม.",
    lessons: [
      "Mini Project: Conveyor Sorting System",
      "ออกแบบ I/O List และ Tag Table",
      "เขียน Ladder Logic ทั้งระบบ",
      "ทดสอบ Simulation ทีละ Section",
      "Final Exam",
      "รับ Certificate of Completion",
    ],
    overview:
      "Mini Project สรุปทุกสิ่งที่เรียนมาในคอร์ส ผู้เรียนจะออกแบบและเขียน PLC Program สำหรับระบบ Conveyor Sorting จากศูนย์จนใช้งานได้จริง",
    keyPoints: [
      "ออกแบบ I/O List ก่อนเขียน Program ทุกครั้ง",
      "ทดสอบทีละ Section ก่อน Run ระบบทั้งหมด",
      "Document งานไว้สำหรับ Maintenance",
      "Certificate ใช้ใส่ใน Portfolio หรือ LinkedIn ได้",
    ],
  },
];

// ─── Lesson Tabs ─────────────────────────────────────────────────────────────
const lessonTabs = {
  intro: {
    tag: "เริ่มง่ายที่สุด",
    title: "PLC คืออะไร?",
    subtitle: "PLC = คอมพิวเตอร์อุตสาหกรรมที่โปรแกรมได้",
    content:
      "PLC ย่อมาจาก Programmable Logic Controller คือคอมพิวเตอร์ที่ออกแบบมาสำหรับงานอุตสาหกรรมโดยเฉพาะ ทนทานต่อความร้อน ฝุ่น ความสั่นสะเทือน และคลื่นแม่เหล็กไฟฟ้า สามารถทำงานได้ตลอด 24 ชั่วโมง 7 วันต่อสัปดาห์",
    analogy:
      "เปรียบง่าย ๆ: PLC คือสมอง, Sensor คือดวงตา, Push Button คือคำสั่งจากคน, Motor/Valve คือมือที่ลงมือทำงาน, Scan Cycle คือจังหวะการคิดของ PLC",
    bullets: [
      "PLC อ่านสถานะจาก Input: ปุ่มกด, Sensor, Limit Switch, Thermocouple",
      "PLC ประมวลผลตาม Logic ที่โปรแกรมไว้ เช่น Ladder, FBD, ST",
      "PLC สั่ง Output: Motor, Lamp, Solenoid Valve, Buzzer, Display",
      "PLC ทำ Scan Cycle ซ้ำ ๆ ด้วยความเร็วสูง (1–10 ms ต่อรอบ)",
    ],
  },
  brands: {
    tag: "เลือกให้เหมาะกับงาน",
    title: "PLC ยี่ห้อที่นิยมในโรงงาน",
    subtitle: "แต่ละยี่ห้อมีจุดเด่นต่างกัน หลักการ Ladder เหมือนกัน",
    content:
      "PLC มีหลายยี่ห้อในตลาด แต่ละยี่ห้อมีซอฟต์แวร์สำหรับเขียนโปรแกรมของตัวเอง เรียนรู้หลักการ Ladder Logic แล้ว สามารถย้ายไปยี่ห้ออื่นได้ไม่ยาก เพราะมาตรฐาน IEC 61131-3 ครอบคลุมทุกยี่ห้อ",
    brandList: [
      { brand: "Siemens S7-1200/1500", software: "TIA Portal", note: "นิยมมากในยุโรปและโรงงานไทยขนาดใหญ่", colour: "bg-blue-50 text-blue-700 border-blue-200" },
      { brand: "Allen-Bradley / Rockwell", software: "Studio 5000", note: "มาตรฐานในอุตสาหกรรมอเมริกาและยานยนต์", colour: "bg-red-50 text-red-700 border-red-200" },
      { brand: "Mitsubishi MELSEC", software: "GX Works3", note: "นิยมมากในไทย ราคาดี Support ดี", colour: "bg-orange-50 text-orange-700 border-orange-200" },
      { brand: "Omron CP/CJ/NX", software: "CX-Programmer / Sysmac", note: "เด่นด้าน Motion Control และ Safety", colour: "bg-green-50 text-green-700 border-green-200" },
      { brand: "Delta DVP/AS Series", software: "ISPSoft / DIADesigner", note: "ราคาประหยัด เหมาะ SME และเครื่องจักรไทย", colour: "bg-teal-50 text-teal-700 border-teal-200" },
      { brand: "Schneider Modicon", software: "EcoStruxure Control", note: "แข็งแกร่งด้าน Process และ Energy", colour: "bg-purple-50 text-purple-700 border-purple-200" },
    ],
  },
  memory: {
    tag: "จำให้ได้ก่อนเขียน Ladder",
    title: "PLC Memory Map ทั่วไป",
    subtitle: "แต่ละยี่ห้อตั้งชื่อต่างกัน แต่โครงสร้างเดียวกัน",
    content:
      "Memory Map คือแผนผังการจัดเก็บข้อมูลภายใน PLC การเข้าใจ Memory Map ทำให้เขียน Logic ได้ถูกต้อง อ่าน Program ของคนอื่นได้ และย้ายยี่ห้อ PLC ได้ง่ายขึ้น",
    examples: [
      { address: "I / X / DI / %I", name: "Digital Input", meaning: "เก็บสถานะ Input จาก Sensor, ปุ่มกด (TRUE/FALSE)" },
      { address: "Q / Y / DO / %Q", name: "Digital Output", meaning: "สั่งงาน Output เช่น Motor Contactor, Solenoid Valve, Lamp" },
      { address: "M / B / IR / %M", name: "Memory Bit", meaning: "เก็บค่าชั่วคราวใน Logic ไม่ต่อกับ Hardware โดยตรง" },
      { address: "T / TIM", name: "Timer", meaning: "เก็บค่าเวลาที่กำลังนับของ TON / TOF / TP" },
      { address: "C / CNT", name: "Counter", meaning: "นับจำนวน CTU (นับขึ้น) / CTD (นับลง)" },
      { address: "D / N / %MW", name: "Data Register", meaning: "เก็บตัวเลข เช่น อุณหภูมิ ความเร็ว จำนวนชิ้นงาน Setpoint" },
    ],
  },
  ladder: {
    tag: "อ่านให้เป็นก่อนเขียน",
    title: "Ladder Logic Symbol พื้นฐาน",
    subtitle: "รู้จัก 5 Symbol นี้ก็เขียน Logic ได้ 80% แล้ว",
    content:
      "Ladder Logic ใช้ Symbol แทนการทำงานของวงจร ผู้ที่มีพื้นฐานไฟฟ้าจะเข้าใจได้รวดเร็ว เพราะออกแบบให้คล้ายกับ Wiring Diagram ของ Relay Control Panel ดั้งเดิม",
    symbolList: [
      { symbol: "| |", name: "NO Contact", desc: "Normally Open: ปกติวงจรเปิด เมื่อ Input ON วงจรจะปิดให้กระแสไหลผ่าน ใช้กับปุ่ม Start, Sensor", colour: "text-blue-400 border-blue-400" },
      { symbol: "|/|", name: "NC Contact", desc: "Normally Closed: ปกติวงจรปิด เมื่อ Input ON วงจรจะเปิด กระแสหยุด ใช้กับ Stop, E-Stop, Overload", colour: "text-orange-400 border-orange-400" },
      { symbol: "( )", name: "Output Coil", desc: "สั่ง Output ON ตราบที่มี Power Flow ถึง Coil ใช้สั่ง Motor, Valve, Lamp", colour: "text-green-400 border-green-400" },
      { symbol: "(S)", name: "Set Coil", desc: "Set Output ให้ ON ค้างไว้ แม้ Input จะดับแล้ว ต้องใช้ Reset Coil เพื่อปิด", colour: "text-purple-400 border-purple-400" },
      { symbol: "(R)", name: "Reset Coil", desc: "Reset Output ให้กลับเป็น OFF จาก Set ก่อนหน้า ใช้คู่กับ Set Coil", colour: "text-red-400 border-red-400" },
    ],
  },
};

// ─── Quiz Questions ───────────────────────────────────────────────────────────
const quizQuestions = [
  {
    question: "PLC ย่อมาจากอะไร?",
    options: [
      "Programmable Logic Controller",
      "Programmable Limit Circuit",
      "Power Logic Control",
      "Process Line Controller",
    ],
    answer: "Programmable Logic Controller",
    explanation:
      "PLC = Programmable Logic Controller คือคอมพิวเตอร์อุตสาหกรรมที่โปรแกรมได้ ใช้ควบคุมเครื่องจักรในโรงงาน",
  },
  {
    question: "ข้อใดคือ Input ของ PLC?",
    options: ["Motor", "Limit Switch", "Solenoid Valve", "Indicator Lamp"],
    answer: "Limit Switch",
    explanation:
      "Limit Switch เป็น Sensor ที่ต่อเข้า Input ของ PLC เพื่อตรวจตำแหน่งวัตถุ ส่วน Motor, Valve, Lamp คือ Output",
  },
  {
    question: "NO Contact ใน Ladder Logic ทำงานอย่างไร?",
    options: [
      "ปกติวงจรเปิด เมื่อ Input ON วงจรจะปิดให้กระแสไหลผ่าน",
      "ปกติวงจรปิด เมื่อ Input ON วงจรจะเปิด",
      "เป็น Output สำหรับสั่ง Motor",
      "ใช้นับจำนวนชิ้นงาน",
    ],
    answer: "ปกติวงจรเปิด เมื่อ Input ON วงจรจะปิดให้กระแสไหลผ่าน",
    explanation:
      "NO = Normally Open ปกติวงจรเปิดอยู่ เมื่อ Input เป็น TRUE วงจรจะปิดทำให้ Power Flow ไหลผ่านได้",
  },
  {
    question: "PLC Scan Cycle ทำงานตามลำดับใด?",
    options: [
      "Execute Logic → อ่าน Input → เขียน Output",
      "อ่าน Input → Execute Logic → เขียน Output → วนซ้ำ",
      "เขียน Output → อ่าน Input → Execute Logic",
      "สุ่มทำงานตามที่มี Input เข้ามา",
    ],
    answer: "อ่าน Input → Execute Logic → เขียน Output → วนซ้ำ",
    explanation:
      "PLC Scan Cycle: 1) Read Input อ่าน I/O ทั้งหมด 2) Execute Program ประมวลผล Ladder 3) Write Output สั่งงาน จากนั้นวนซ้ำตลอด",
  },
  {
    question: "TON Timer ใน PLC ทำงานอย่างไร?",
    options: [
      "Output ON ทันทีที่ Input ON",
      "หน่วงเวลาก่อน Output ON เมื่อ Input ON ครบเวลาที่ตั้ง",
      "นับจำนวนชิ้นงาน",
      "Output OFF หลัง Input ดับตามเวลาที่ตั้ง (TOF)",
    ],
    answer: "หน่วงเวลาก่อน Output ON เมื่อ Input ON ครบเวลาที่ตั้ง",
    explanation:
      "TON (On-Delay Timer) เริ่มนับเมื่อ Input ON ครบ Preset Time แล้ว Output Q ถึงจะ ON เช่น ตั้ง 5s กด Start → รอ 5 วิ → Motor เริ่ม",
  },
];

// ─── Badges ───────────────────────────────────────────────────────────────────
const badges = [
  { title: "PLC Starter", desc: "จบ Level 0 พื้นฐาน PLC", icon: Sparkles, earned: true },
  { title: "Hardware Expert", desc: "เข้าใจ PLC Hardware และยี่ห้อ", icon: Cpu, earned: true },
  { title: "Ladder Coder", desc: "เขียน Ladder Logic ได้", icon: CircuitBoard, earned: false },
  { title: "Troubleshooter", desc: "แก้ปัญหาเครื่องจักรได้", icon: Search, earned: false },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PLCLearningApp() {
  // Ladder Simulation
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [estop, setEstop] = useState(false);
  const [overload, setOverload] = useState(false);

  // TON Timer Simulation
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const TIMER_PRESET = 5;
  const timerRef = useRef(null);

  // Quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Lesson tabs & level
  const [activeTab, setActiveTab] = useState("intro");
  const [selectedLevel, setSelectedLevel] = useState(courseLevels[0]);

  // Computed
  const motorRunning = start && !stop && !estop && !overload;
  const timerDone = timerValue >= TIMER_PRESET * 10;
  const timerSec = (timerValue / 10).toFixed(1);
  const timerPct = Math.min((timerValue / (TIMER_PRESET * 10)) * 100, 100);

  const wireFlows = [
    true,
    start,
    start && !stop,
    start && !stop && !estop,
    motorRunning,
    motorRunning,
  ];

  const explanation = useMemo(() => {
    if (estop) return "E-Stop ถูกกดอยู่ → Safety Circuit เปิดออก เครื่องต้องหยุดทันทีเพื่อความปลอดภัย";
    if (overload) return "Overload Trip → PLC ตรวจพบกระแสเกิน หยุด Motor เพื่อป้องกันความเสียหาย";
    if (stop) return "Stop ถูกกด → NC Contact เปิดออก Power Flow ขาด Output Coil ดับ";
    if (motorRunning) return "✓ เงื่อนไขครบ: Start ON + Safety ปกติทุกข้อ → Output Coil ON → Motor RUN";
    return "Motor ยังหยุดอยู่ ลองกด Start โดยที่ Stop / E-Stop / Overload ไม่ Active";
  }, [estop, overload, stop, motorRunning]);

  const activeContent = lessonTabs[activeTab];

  // Timer interval
  useEffect(() => {
    if (!timerRunning) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimerValue((v) => v + 1);
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  useEffect(() => {
    if (timerDone && timerRunning) setTimerRunning(false);
  }, [timerDone, timerRunning]);

  const resetTimer = () => { setTimerRunning(false); setTimerValue(0); };
  const resetLadder = () => { setStart(false); setStop(false); setEstop(false); setOverload(false); };

  // Quiz handlers
  const currentQ = quizQuestions[quizIndex];
  const handleAnswer = (opt) => {
    if (answered) return;
    setQuizAnswer(opt);
    setAnswered(true);
    if (opt === currentQ.answer) setQuizScore((s) => s + 1);
  };
  const nextQuestion = () => {
    if (quizIndex + 1 >= quizQuestions.length) { setQuizDone(true); }
    else { setQuizIndex((i) => i + 1); setQuizAnswer(""); setAnswered(false); }
  };
  const resetQuiz = () => { setQuizIndex(0); setQuizAnswer(""); setQuizScore(0); setQuizDone(false); setAnswered(false); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ── */}
        <header className="rounded-[2rem] bg-slate-900 text-white p-7 overflow-hidden relative">
          <div className="absolute right-8 top-6 opacity-10"><Cpu className="w-48 h-48" /></div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-blue-300">PLC Mini Lab TH • Industrial Automation Academy</p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">เรียน PLC จากศูนย์ สู่มืออาชีพ</h1>
              <p className="text-slate-300 mt-3 max-w-3xl leading-7">
                คอร์สออนไลน์ครอบคลุมทุกยี่ห้อ PLC เริ่มจากพื้นฐาน Hardware, Memory Map, Ladder Logic, Timer/Counter, Case Study จริง และ Mini Project
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">เข้าเรียนต่อ</Button>
              <Button variant="outline" className="rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10">ดาวน์โหลด Roadmap</Button>
            </div>
          </div>
        </header>

        {/* ── Stats Bar ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Brain, bg: "bg-blue-100", fg: "text-blue-700", label: "รูปแบบการสอน", value: "ง่าย → ยาก" },
            { icon: Cpu, bg: "bg-green-100", fg: "text-green-700", label: "ขอบเขต", value: "PLC ทุกยี่ห้อ" },
            { icon: Video, bg: "bg-amber-100", fg: "text-amber-700", label: "เรียนแบบ WFH", value: "Video + Lab" },
            { icon: Trophy, bg: "bg-purple-100", fg: "text-purple-700", label: "เป้าหมาย", value: "ทำงานจริงได้" },
          ].map(({ icon: Icon, bg, fg, label, value }) => (
            <Card key={label} className="rounded-3xl shadow-sm border-slate-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}><Icon className={`w-6 h-6 ${fg}`} /></div>
                <div><p className="text-sm text-slate-500">{label}</p><h3 className="font-bold">{value}</h3></div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ── Main Layout ── */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">เส้นทางการเรียน</h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">8 Levels</span>
            </div>
            <div className="space-y-3">
              {courseLevels.map((item) => (
                <Card
                  key={item.level}
                  onClick={() => setSelectedLevel(item)}
                  className={`rounded-3xl shadow-sm border-slate-200 hover:shadow-md transition cursor-pointer ${selectedLevel.level === item.level ? "ring-2 ring-blue-500" : ""}`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.colour}`}><item.icon className="w-5 h-5" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-slate-500">{item.level}</p>
                          {item.status === "locked" ? <Lock className="w-3 h-3 text-slate-400" /> : <Unlock className="w-3 h-3 text-green-600" />}
                        </div>
                        <h3 className="font-semibold leading-tight text-sm">{item.title}</h3>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200">
                      <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{ width: `${item.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500"><span>{item.progress}%</span><span>{item.time}</span></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </aside>

          {/* ── Content Area ── */}
          <section className="lg:col-span-3 space-y-6">

            {/* ── Level Detail ── */}
            <Card className="rounded-3xl shadow-sm border-slate-200">
              <CardContent className="p-6 space-y-5">
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-blue-600">{selectedLevel.level}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        selectedLevel.status === "completed" ? "bg-green-100 text-green-700"
                        : selectedLevel.status === "active" ? "bg-blue-100 text-blue-700"
                        : selectedLevel.status === "unlocked" ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-500"
                      }`}>
                        {selectedLevel.status === "completed" ? "✓ เสร็จแล้ว" : selectedLevel.status === "active" ? "กำลังเรียน" : selectedLevel.status === "unlocked" ? "พร้อมเรียน" : "🔒 ล็อคอยู่"}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">{selectedLevel.title}</h2>
                    <p className="text-slate-600 mt-1">{selectedLevel.subtitle}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700"><Play className="w-4 h-4 mr-2" />เริ่มเรียน</Button>
                    <Button variant="outline" className="rounded-2xl"><Download className="w-4 h-4 mr-2" />Notes</Button>
                  </div>
                </div>

                {selectedLevel.overview && (
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                    <p className="text-sm leading-7 text-slate-700">{selectedLevel.overview}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-3 text-slate-700">บทเรียนใน Level นี้</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {selectedLevel.lessons.map((lesson, idx) => {
                      const doneCount = Math.ceil(selectedLevel.lessons.length * selectedLevel.progress / 100);
                      const isDone = selectedLevel.progress === 100 || idx < doneCount;
                      return (
                        <div key={lesson} className="rounded-2xl border border-slate-200 bg-white p-4 flex gap-3 items-start hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${isDone ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                            {isDone ? "✓" : idx + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">{lesson}</h4>
                            <p className="text-xs text-slate-500 mt-1">Video • Note • Lab</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedLevel.keyPoints && (
                  <div>
                    <h3 className="font-semibold mb-3 text-slate-700">สิ่งสำคัญที่ต้องจำ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedLevel.keyPoints.map((pt) => (
                        <div key={pt} className="flex gap-2 items-start rounded-2xl bg-slate-50 p-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── Theory Tabs ── */}
            <Card className="rounded-3xl shadow-sm border-slate-200">
              <CardContent className="p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600">ตัวอย่างบทเรียน</p>
                    <h2 className="text-2xl font-bold">เนื้อหาพื้นฐาน PLC</h2>
                    <p className="text-slate-600 text-sm mt-1">กดเปลี่ยนหัวข้อเพื่อดูเนื้อหา</p>
                  </div>
                  <div className="flex flex-wrap gap-1 bg-slate-100 rounded-2xl p-1">
                    {[["intro","PLC พื้นฐาน"],["brands","ยี่ห้อ PLC"],["memory","Memory Map"],["ladder","Ladder Symbol"]].map(([key, label]) => (
                      <button key={key} onClick={() => setActiveTab(key)} className={`px-3 py-2 rounded-xl text-sm font-medium transition ${activeTab === key ? "bg-white shadow-sm text-blue-700" : "text-slate-500 hover:text-slate-700"}`}>{label}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-blue-50 p-5 space-y-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">{activeContent.tag}</span>
                    <h3 className="text-xl font-bold">{activeContent.title}</h3>
                    <p className="text-sm font-medium text-slate-600">{activeContent.subtitle}</p>
                    <p className="text-sm leading-7 text-slate-700">{activeContent.content}</p>
                    {activeContent.analogy && (
                      <div className="rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700"><strong>จำง่าย:</strong> {activeContent.analogy}</div>
                    )}
                  </div>

                  <div className="rounded-3xl bg-white border border-slate-200 p-5 space-y-3">
                    {activeContent.bullets && (
                      <>
                        <h3 className="font-bold">สรุปสิ่งที่ต้องเข้าใจ</h3>
                        {activeContent.bullets.map((pt) => (
                          <div key={pt} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                            <p className="text-sm text-slate-700">{pt}</p>
                          </div>
                        ))}
                      </>
                    )}
                    {activeContent.brandList && (
                      <>
                        <h3 className="font-bold">PLC ยี่ห้อยอดนิยม</h3>
                        <div className="space-y-2">
                          {activeContent.brandList.map((b) => (
                            <div key={b.brand} className={`rounded-2xl border p-3 ${b.colour}`}>
                              <div className="flex justify-between items-center flex-wrap gap-1">
                                <span className="font-semibold text-sm">{b.brand}</span>
                                <span className="text-xs font-mono opacity-80">{b.software}</span>
                              </div>
                              <p className="text-xs mt-1 opacity-75">{b.note}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {activeContent.examples && (
                      <>
                        <h3 className="font-bold">Memory Address ตามยี่ห้อ</h3>
                        <div className="space-y-2">
                          {activeContent.examples.map((item) => (
                            <div key={item.address} className="rounded-2xl bg-slate-50 p-3 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-bold text-blue-700 text-sm">{item.address}</span>
                                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{item.name}</span>
                              </div>
                              <p className="text-xs text-slate-600">{item.meaning}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {activeContent.symbolList && (
                      <>
                        <h3 className="font-bold">Ladder Symbol (IEC 61131-3)</h3>
                        <div className="space-y-2">
                          {activeContent.symbolList.map((s) => (
                            <div key={s.name} className="rounded-2xl bg-slate-900 p-3 flex gap-3 items-start">
                              <span className={`font-mono text-xl font-bold shrink-0 border-2 px-2 py-1 rounded-lg ${s.colour}`}>{s.symbol}</span>
                              <div>
                                <p className={`text-sm font-bold ${s.colour.split(" ")[0]}`}>{s.name}</p>
                                <p className="text-xs text-slate-400 mt-0.5 leading-5">{s.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Scan Cycle */}
                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">PLC Scan Cycle</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { step: "1", label: "Read Input", sub: "อ่านสัญญาณ" },
                      { step: "2", label: "Execute Logic", sub: "ประมวลผล" },
                      { step: "3", label: "Write Output", sub: "สั่งงาน" },
                      { step: "4", label: "Self Diagnostics", sub: "ตรวจสอบ" },
                      { step: "↺", label: "Repeat", sub: "1–10 ms" },
                    ].map((s, idx) => (
                      <div key={s.step} className="flex md:block items-center gap-3">
                        <div className="rounded-2xl bg-white p-3 text-center min-h-[68px] flex flex-col items-center justify-center shadow-sm w-full">
                          <span className="text-xs font-bold text-blue-600">{s.step}</span>
                          <span className="text-sm font-semibold mt-1">{s.label}</span>
                          <span className="text-xs text-slate-500">{s.sub}</span>
                        </div>
                        {idx < 4 && <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 mx-auto mt-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Ladder Simulation ── */}
            <Card className="rounded-3xl shadow-sm border-slate-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-slate-950 text-white p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-300">Ladder Logic Lab • Interactive Simulation</p>
                      <h2 className="text-2xl font-bold">Motor Start / Stop + Safety Interlock</h2>
                      <p className="text-slate-300 mt-1 text-sm">จำลอง Ladder Logic แบบ Online Monitoring — กด Input แล้วดู Power Flow เปลี่ยนแบบ Real-time</p>
                    </div>
                    <Button variant="outline" className="rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 shrink-0" onClick={resetLadder}>
                      <RotateCcw className="w-4 h-4 mr-2" />Reset
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Start PB", addr: "DI 0.0", state: start, set: () => setStart((v) => !v), icon: Play, on: "bg-green-600 hover:bg-green-700", type: "NO" },
                      { label: "Stop PB", addr: "DI 0.1", state: stop, set: () => setStop((v) => !v), icon: Square, on: "bg-red-600 hover:bg-red-700", type: "NC" },
                      { label: "E-Stop", addr: "DI 0.2", state: estop, set: () => setEstop((v) => !v), icon: AlertTriangle, on: "bg-orange-600 hover:bg-orange-700", type: "NC" },
                      { label: "Overload", addr: "DI 0.3", state: overload, set: () => setOverload((v) => !v), icon: ShieldCheck, on: "bg-amber-600 hover:bg-amber-700", type: "NC" },
                    ].map(({ label, addr, state, set, icon: Icon, on, type }) => (
                      <Button key={addr} onClick={set} className={`rounded-2xl h-16 flex-col gap-0.5 ${state ? on : "bg-slate-800 hover:bg-slate-700"}`}>
                        <div className="flex items-center gap-1.5"><Icon className="w-4 h-4" /><span className="font-semibold">{label}</span></div>
                        <span className="text-[11px] opacity-60">{addr} • {type}</span>
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 2xl:grid-cols-5 gap-4">
                    <div className="2xl:col-span-2 rounded-3xl bg-slate-900 p-5 space-y-3 border border-slate-800">
                      <h3 className="font-semibold text-sm">I/O Status Monitor</h3>
                      {[
                        { addr: "DI 0.0", tag: "Start_PB", val: start, type: "NO", note: "กดเพื่อเริ่ม" },
                        { addr: "DI 0.1", tag: "Stop_PB", val: !stop, type: "NC", note: "ปกติ ON" },
                        { addr: "DI 0.2", tag: "EStop_OK", val: !estop, type: "NC", note: "Safety" },
                        { addr: "DI 0.3", tag: "OL_OK", val: !overload, type: "NC", note: "Overload" },
                        { addr: "DO 0.0", tag: "Motor_Run", val: motorRunning, type: "COIL", note: "Output" },
                      ].map(({ addr, tag, val, type, note }) => (
                        <div key={addr} className="grid grid-cols-12 gap-1 items-center rounded-2xl bg-black/30 px-3 py-2.5 text-sm">
                          <span className="col-span-3 font-mono text-blue-300 text-xs">{addr}</span>
                          <span className="col-span-3 font-semibold text-xs">{tag}</span>
                          <span className={`col-span-2 text-center rounded-full px-1 py-0.5 text-xs font-bold ${val ? "bg-green-500/20 text-green-300" : "bg-slate-700 text-slate-400"}`}>{val ? "ON" : "OFF"}</span>
                          <span className="col-span-2 text-slate-400 text-xs">{type}</span>
                          <span className="col-span-2 text-slate-500 text-xs">{note}</span>
                        </div>
                      ))}
                      <div className="rounded-2xl bg-black/40 border border-slate-700 p-4 text-sm text-slate-300 leading-7">{explanation}</div>
                    </div>

                    <div className="2xl:col-span-3 rounded-3xl bg-[#101827] p-5 border border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">Main Program • Rung 1</h3>
                          <p className="text-xs text-slate-400">Motor Start/Stop with Safety Interlock</p>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-300">● Power Flow</span>
                          <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-400">● No Power</span>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0b1220] border border-slate-700 p-4 overflow-x-auto">
                        <div className="min-w-[600px]">
                          <div className="grid grid-cols-[12px_1fr_12px] items-center">
                            <div className="h-28 border-l-4 border-slate-400 rounded" />
                            <div className="space-y-3 px-1">
                              <div className="flex items-center">
                                {[
                                  { label: "Start_PB", addr: "DI 0.0", type: "NO", ok: start, sym: "| |" },
                                  { label: "Stop_PB", addr: "DI 0.1", type: "NC", ok: !stop, sym: "|/|" },
                                  { label: "EStop_OK", addr: "DI 0.2", type: "NC", ok: !estop, sym: "|/|" },
                                  { label: "OL_OK", addr: "DI 0.3", type: "NC", ok: !overload, sym: "|/|" },
                                  { label: "Motor_Run", addr: "DO 0.0", type: "COIL", ok: motorRunning, sym: "( )" },
                                ].map((b, idx) => (
                                  <div key={b.addr} className="flex items-center flex-1">
                                    <div className={`h-0.5 flex-1 ${wireFlows[idx] ? "bg-green-400" : "bg-slate-600"}`} />
                                    <div className={`rounded-xl border px-1 py-2 text-center min-w-[88px] transition-all ${b.ok ? "border-green-400 bg-green-400/10" : "border-slate-600 bg-slate-800"}`}>
                                      <div className={`font-mono text-base font-bold ${b.ok ? "text-green-300" : "text-slate-400"}`}>{b.sym}</div>
                                      <div className="text-[10px] text-slate-300 mt-0.5 truncate">{b.label}</div>
                                      <div className="text-[10px] text-blue-400 font-mono">{b.addr}</div>
                                      <div className="text-[9px] text-slate-500">{b.type}</div>
                                    </div>
                                    <div className={`h-0.5 flex-1 ${wireFlows[idx + 1] ? "bg-green-400" : "bg-slate-600"}`} />
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-5 gap-1 text-[10px] text-center text-slate-500 px-1">
                                <span>Start ต้อง ON</span><span>Stop ห้ามกด</span><span>E-Stop ปกติ</span><span>OL ไม่ Trip</span><span>→ Motor ON</span>
                              </div>
                            </div>
                            <div className="h-28 border-l-4 border-slate-400 rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { step: "Step 1", title: "ดู Power Flow", desc: "เส้นสีเขียวไหลถึง Coil = Logic ผ่านครบ" },
                          { step: "Step 2", title: "หา Contact ที่ดับ", desc: "Contact สีเทาคือเงื่อนไขที่ขาดอยู่" },
                          { step: "Step 3", title: "เทียบ Field", desc: "Output ON แต่ไม่ทำงาน = ปัญหาที่ Hardware" },
                        ].map(({ step, title, desc }) => (
                          <div key={step} className="rounded-2xl bg-black/30 p-3">
                            <p className="text-xs text-slate-500">{step}</p>
                            <h4 className="font-semibold text-sm mt-0.5">{title}</h4>
                            <p className="text-xs text-slate-400 mt-1 leading-5">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── TON Timer Simulation ── */}
            <Card className="rounded-3xl shadow-sm border-slate-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-slate-900 text-white p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-amber-300">Timer Lab • TON On-Delay Simulation</p>
                      <h2 className="text-2xl font-bold">TON Timer Simulation</h2>
                      <p className="text-slate-300 mt-1 text-sm">กด "เริ่ม IN" → Timer เริ่มนับ → ครบ {TIMER_PRESET} วินาที → Output Q = ON</p>
                    </div>
                    <Button variant="outline" className="rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 shrink-0" onClick={resetTimer}>
                      <RotateCcw className="w-4 h-4 mr-2" />Reset
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Button
                        onClick={() => { if (!timerDone) setTimerRunning((v) => !v); }}
                        className={`w-full h-14 rounded-2xl ${timerRunning ? "bg-amber-600 hover:bg-amber-700" : timerDone ? "bg-slate-700 opacity-50 cursor-default" : "bg-blue-600 hover:bg-blue-700"}`}
                      >
                        {timerRunning ? <><Square className="w-4 h-4 mr-2" />หยุด IN</> : <><Play className="w-4 h-4 mr-2" />กด IN — เริ่ม Timer</>}
                      </Button>

                      <div className="rounded-3xl bg-slate-800 p-5 space-y-4 border border-slate-700">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <p className="text-xs text-slate-400">IN</p>
                            <p className={`text-lg font-bold mt-1 ${timerRunning || timerDone ? "text-green-400" : "text-slate-400"}`}>{timerRunning || timerDone ? "TRUE" : "FALSE"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">ET (Elapsed)</p>
                            <p className="text-2xl font-bold text-amber-400 mt-1">{timerSec}s</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">PT (Preset)</p>
                            <p className="text-2xl font-bold text-blue-400 mt-1">{TIMER_PRESET}.0s</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-400"><span>0s</span><span>Progress</span><span>{TIMER_PRESET}s</span></div>
                          <div className="h-4 rounded-full bg-slate-700 overflow-hidden">
                            <div className={`h-4 rounded-full transition-all duration-100 ${timerDone ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${timerPct}%` }} />
                          </div>
                        </div>

                        <div className={`flex items-center justify-between rounded-2xl p-4 border transition-all ${timerDone ? "bg-green-500/10 border-green-500/40" : "bg-black/40 border-slate-700"}`}>
                          <div>
                            <p className="text-xs text-slate-400">Q (Output)</p>
                            <p className={`text-3xl font-bold mt-0.5 ${timerDone ? "text-green-400" : "text-slate-500"}`}>{timerDone ? "ON ✓" : "OFF"}</p>
                          </div>
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold border-2 transition-all ${timerDone ? "bg-green-500/20 border-green-400 text-green-300" : "bg-slate-800 border-slate-600 text-slate-500"}`}>
                            ( )
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-slate-800 p-5 border border-slate-700 space-y-4">
                      <h3 className="font-semibold">หลักการทำงาน TON Timer</h3>
                      {[
                        { title: "IN = FALSE", desc: "Timer ไม่ทำงาน ET = 0, Q = OFF", color: "text-slate-300" },
                        { title: "IN = TRUE → นับเวลา", desc: "ET เพิ่มขึ้นทุก Scan Cycle จนครบ PT", color: "text-amber-300" },
                        { title: "ET ≥ PT → Timer Done!", desc: "Q เปลี่ยนเป็น ON — Output ถูกสั่งงาน", color: "text-green-300" },
                        { title: "IN กลับ FALSE", desc: "Q ดับ ET Reset กลับเป็น 0 ทันที", color: "text-red-300" },
                      ].map(({ title, desc, color }) => (
                        <div key={title} className="rounded-2xl bg-black/30 p-3 flex gap-3">
                          <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${color}`} />
                          <div>
                            <p className={`text-sm font-semibold ${color}`}>{title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                          </div>
                        </div>
                      ))}
                      <div className="rounded-2xl bg-blue-900/30 border border-blue-800 p-4 text-xs text-blue-300 leading-6">
                        <strong>ใช้งานจริง:</strong> หน่วงเวลาก่อนเปิด Motor, รอ Conveyor เคลื่อนที่ก่อน Spray, หน่วง Alarm ป้องกัน False Trigger
                      </div>
                      <div className="rounded-2xl bg-slate-700/50 p-4 text-xs text-slate-300 leading-6">
                        <strong>ชื่อใน PLC ต่างยี่ห้อ:</strong> TON (IEC/Siemens) = TIM (Omron) = TMR (Mitsubishi) = หลักการเดียวกันทุกยี่ห้อ
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Troubleshooting + Quiz ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <Card className="lg:col-span-3 rounded-3xl shadow-sm border-slate-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-yellow-700" /></div>
                    <div><h2 className="text-xl font-bold">Troubleshooting Lab</h2><p className="text-slate-600 text-sm">ฝึกคิดแบบวิศวกรเมื่อเครื่องจักรมีปัญหา</p></div>
                  </div>

                  <div className="rounded-3xl bg-red-50 border border-red-100 p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                      <h3 className="font-bold text-red-800">Scenario: กด Start แล้ว Motor ไม่ทำงาน</h3>
                    </div>
                    <p className="text-sm leading-7 text-slate-700">ไล่เช็คทีละจุดตาม Ladder Logic: ปุ่ม Start เข้า PLC จริงหรือไม่? NC Contact ทั้งหมดปกติหรือเปล่า? Output Coil ON หรือยัง? ถ้า Output ON แล้วแต่ Motor ไม่หมุน = ปัญหาอยู่ที่ Field</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        { step: "①", text: "ดู Online Monitoring ว่า DI Start เข้ามาหรือไม่" },
                        { step: "②", text: "ตรวจ NC Contact: Stop, E-Stop, Overload ทั้งหมด" },
                        { step: "③", text: "ดูว่า Output Coil ใน Ladder ON หรือไม่" },
                        { step: "④", text: "วัดแรงดันที่ขา Output ของ PLC Module" },
                        { step: "⑤", text: "ตรวจว่า Contactor ดึงหรือไม่ ฟังเสียง" },
                        { step: "⑥", text: "ตรวจ MCC, Motor, Wiring ตลอดเส้นทาง" },
                      ].map(({ step, text }) => (
                        <div key={step} className="rounded-2xl bg-white border border-red-100 p-3 text-sm flex gap-2">
                          <span className="font-bold text-red-600 shrink-0">{step}</span>
                          <span className="text-slate-700">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Logic Map: แยกปัญหา</p>
                    {[
                      { dot: "bg-green-500", text: "Coil ON + Output Voltage OK + Motor ไม่หมุน → ปัญหาที่ Motor / Contactor" },
                      { dot: "bg-amber-500", text: "Coil ON + Output Voltage ไม่มี → ปัญหาที่ Output Module ของ PLC" },
                      { dot: "bg-red-500", text: "Coil ไม่ ON → ปัญหาที่ Input หรือ Logic — ดู Power Flow ใน Ladder" },
                    ].map(({ dot, text }) => (
                      <div key={text} className="flex items-start gap-2 rounded-xl bg-white border border-slate-200 p-3 text-sm">
                        <span className={`w-2 h-2 rounded-full ${dot} shrink-0 mt-1.5`} />
                        <span className="text-slate-700">{text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quiz */}
              <Card className="lg:col-span-2 rounded-3xl shadow-sm border-slate-200">
                <CardContent className="p-6 space-y-4">
                  {!quizDone ? (
                    <>
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Mini Quiz</h2>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">{quizIndex + 1} / {quizQuestions.length}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200">
                        <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${(quizIndex / quizQuestions.length) * 100}%` }} />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 leading-6">{currentQ.question}</p>
                      <div className="space-y-2">
                        {currentQ.options.map((opt) => {
                          let cls = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
                          if (answered) {
                            if (opt === currentQ.answer) cls = "border-green-500 bg-green-50 text-green-800";
                            else if (opt === quizAnswer) cls = "border-red-400 bg-red-50 text-red-800";
                            else cls = "border-slate-200 bg-white text-slate-400 opacity-50";
                          }
                          return (
                            <button key={opt} onClick={() => handleAnswer(opt)} className={`w-full text-left rounded-2xl border p-3 text-sm transition ${cls}`}>{opt}</button>
                          );
                        })}
                      </div>
                      {answered && (
                        <>
                          <div className={`rounded-2xl p-3 text-sm leading-6 ${quizAnswer === currentQ.answer ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                            {quizAnswer === currentQ.answer ? "✓ ถูกต้อง! " : "✗ ยังไม่ใช่ — "}{currentQ.explanation}
                          </div>
                          <Button onClick={nextQuestion} className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700">
                            {quizIndex + 1 < quizQuestions.length ? "ข้อถัดไป →" : "ดูผลคะแนน"}
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="space-y-4 text-center py-2">
                      <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl ${quizScore === quizQuestions.length ? "bg-green-100" : quizScore >= 4 ? "bg-blue-100" : quizScore >= 3 ? "bg-amber-100" : "bg-red-100"}`}>
                        {quizScore === quizQuestions.length ? "🏆" : quizScore >= 4 ? "🌟" : quizScore >= 3 ? "👍" : "📚"}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">{quizScore} / {quizQuestions.length}</h3>
                        <p className="text-slate-600 text-sm mt-1">
                          {quizScore === quizQuestions.length ? "เยี่ยมมาก! ตอบถูกทุกข้อ 🎉" : quizScore >= 4 ? "ดีมาก! ทำได้เกือบหมดเลย" : quizScore >= 3 ? "ดีนะ ลองทบทวนแล้วมาใหม่" : "ทบทวนเนื้อหาก่อนแล้วลองใหม่นะ"}
                        </p>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {quizQuestions.map((_, i) => (
                          <div key={i} className={`h-2 rounded-full ${i < quizScore ? "bg-green-500" : "bg-red-300"}`} />
                        ))}
                      </div>
                      <Button onClick={resetQuiz} className="rounded-2xl bg-blue-600 hover:bg-blue-700 w-full">
                        <RotateCcw className="w-4 h-4 mr-2" />ทำใหม่อีกครั้ง
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ── Badges ── */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <Card key={badge.title} className={`rounded-3xl shadow-sm border-slate-200 ${badge.earned ? "bg-white" : "bg-slate-50 opacity-70"}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${badge.earned ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-400"}`}>
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{badge.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{badge.desc}</p>
                      {!badge.earned && <p className="text-xs text-slate-400 mt-1">🔒 ยังล็อคอยู่</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* ── Resources ── */}
            <Card className="rounded-3xl shadow-sm border-slate-200 bg-white">
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-3xl bg-blue-50 p-5 space-y-3">
                  <Download className="w-7 h-7 text-blue-700" />
                  <h3 className="font-bold">Cheat Sheet PDF</h3>
                  <p className="text-sm text-slate-600 leading-6">สรุป PLC Symbol, Memory Map, Timer/Counter และ Ladder พื้นฐาน ทุกยี่ห้อในหน้าเดียว</p>
                  <Button variant="outline" className="rounded-2xl w-full text-sm">ดาวน์โหลด</Button>
                </div>
                <div className="rounded-3xl bg-green-50 p-5 space-y-3">
                  <Layers3 className="w-7 h-7 text-green-700" />
                  <h3 className="font-bold">Mini Project</h3>
                  <p className="text-sm text-slate-600 leading-6">Conveyor Sorting System: ออกแบบ I/O List, เขียน Ladder, ทดสอบ Simulation จนครบกระบวนการ</p>
                  <Button variant="outline" className="rounded-2xl w-full text-sm">เริ่มโปรเจกต์</Button>
                </div>
                <div className="rounded-3xl bg-amber-50 p-5 space-y-3">
                  <FileCheck2 className="w-7 h-7 text-amber-700" />
                  <h3 className="font-bold">Certificate</h3>
                  <p className="text-sm text-slate-600 leading-6">จบ Final Exam แล้วรับ Certificate ดิจิทัล ใส่ LinkedIn หรือ Portfolio แสดงทักษะ PLC</p>
                  <Button variant="outline" className="rounded-2xl w-full text-sm">ดูตัวอย่าง</Button>
                </div>
              </CardContent>
            </Card>

            {/* ── CTA ── */}
            <Card className="rounded-3xl shadow-sm border-slate-200 bg-slate-900 text-white">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <Award className="w-7 h-7 text-green-300" />
                  <h2 className="text-xl font-bold">พร้อมเรียน PLC แบบจริงจังแล้วหรือยัง?</h2>
                  <p className="text-sm text-slate-300 max-w-2xl leading-7">คอร์สนี้เรียนได้ทุกยี่ห้อ ครอบคลุมตั้งแต่พื้นฐานจนถึง Case Study จริง เรียนในเวลาของตัวเอง มีทั้ง Video, Interactive Lab, Quiz และ Certificate</p>
                </div>
                <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 shrink-0">
                  <Clock3 className="w-4 h-4 mr-2" />เริ่มเรียนเลย
                </Button>
              </CardContent>
            </Card>

          </section>
        </main>
      </div>
    </div>
  );
}
