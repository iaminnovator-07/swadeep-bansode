// Portfolio data for Swadeep Bansode

export const PROFILE = {
  name: "Swadeep Bansode",
  titles: ["IoT Hardware Engineer", "Robotics Developer", "Innovator", "Lead of SYGNIX"],
  tagline: "Building a futuristic engineering ecosystem powered by AURORA.",
  links: {
    github: "https://github.com/iaminnovator-07",
    linkedin: "https://www.linkedin.com/in/swadeep-bansode-849925210?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    email: "swadeepbansode@gmail.com",
    instagram: "https://www.instagram.com/inventor_sdb_07?igsh=MW1zbXduMW9peW1hZg==",
  },
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/hardware", label: "Hardware" },
  { to: "/software", label: "Software" },
  { to: "/achievements", label: "Achievements" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/sygnix", label: "SYGNIX" },
  { to: "/contact", label: "Contact" },
] as const;

export type Project = {
  name: string;
  desc: string;
  tags: string[];
  status?: "active" | "shipped" | "research";
};

export const HARDWARE_PROJECTS: Project[] = [
  { name: "Aurora", desc: "First-gen AI companion orb prototype.", tags: ["AI", "Embedded", "ESP32"], status: "shipped" },
  { name: "Aurora 2.0", desc: "Refined orb with multimodal voice + vision.", tags: ["AI", "Voice", "Vision"], status: "shipped" },
  { name: "Aurora 3.0", desc: "Holographic interactive companion (in dev).", tags: ["Holo", "AI", "IoT"], status: "active" },
  { name: "Indian_Aurora (Hindi)", desc: "Hindi-language Aurora variant.", tags: ["NLP", "Hindi"], status: "shipped" },
  { name: "Team_Indian_Aurora Chatbot", desc: "Team-built multilingual chatbot.", tags: ["Chatbot", "Team"], status: "shipped" },
  { name: "AranyaSync", desc: "Forest sensor mesh for wildlife sync.", tags: ["IoT", "LoRa", "Sensors"], status: "active" },
  { name: "Phantom Net", desc: "Stealth mesh networking experiment.", tags: ["Mesh", "RF"], status: "research" },
  { name: "Phantom Grid", desc: "Distributed power & data grid concept.", tags: ["Power", "Mesh"], status: "research" },
  { name: "Karma", desc: "Behavioral feedback wearable.", tags: ["Wearable", "Sensors"], status: "active" },
  { name: "Saaya", desc: "Shadow-tracking ambient companion.", tags: ["AI", "IoT"], status: "active" },
  { name: "HazardEye", desc: "Industrial hazard detection unit.", tags: ["Safety", "Vision"], status: "shipped" },
  { name: "Machine Monitoring System", desc: "Realtime factory machine telemetry.", tags: ["IIoT", "Telemetry"], status: "shipped" },
  { name: "Mini AgroBot", desc: "Compact agricultural robot.", tags: ["Robotics", "Agro"], status: "shipped" },
  { name: "Remote Control Car", desc: "Bluetooth controlled RC vehicle.", tags: ["Robotics", "BT"] },
  { name: "Object Detection Car", desc: "Vision-guided autonomous car.", tags: ["CV", "Robotics"] },
  { name: "Object Follower Car", desc: "Tracks and follows objects.", tags: ["CV", "Robotics"] },
  { name: "Line Follower Car", desc: "Classic IR line follower.", tags: ["IR", "Robotics"] },
  { name: "Smart Traffic Light Brigade System", desc: "Adaptive traffic signal mesh.", tags: ["IoT", "Smart City"] },
  { name: "LPG Leakage Alert System", desc: "Gas leak alert with buzzer + SMS.", tags: ["Safety", "Sensors"] },
  { name: "Women Safety Alert (NEO-6M GPS)", desc: "GPS-tagged emergency beacon.", tags: ["GPS", "Safety"] },
  { name: "Smart RFID Attendance", desc: "Tap-to-mark attendance system.", tags: ["RFID", "School"] },
  { name: "RFID Based Gates", desc: "RFID controlled access gate.", tags: ["RFID", "Access"] },
  { name: "Smart Blind People Goggles", desc: "Ultrasonic + haptic guidance goggles.", tags: ["Accessibility", "Wearable"] },
  { name: "Smart Blind People Stick", desc: "Sensor-augmented walking stick.", tags: ["Accessibility"] },
  { name: "Smart Dustbin", desc: "Auto-open contactless dustbin.", tags: ["IoT"] },
  { name: "Soil Moisture Alert", desc: "Plant moisture monitoring node.", tags: ["Agro", "Sensors"] },
  { name: "Automatic Water Dispenser", desc: "Touchless water dispense unit.", tags: ["IoT", "IR"] },
  { name: "Smart Street Lights", desc: "Ambient-aware lighting grid.", tags: ["Smart City"] },
  { name: "Smart Lights", desc: "App-controlled lighting node.", tags: ["IoT"] },
  { name: "Energy Saving Setup", desc: "Home energy optimizer.", tags: ["Energy"] },
  { name: "Long Distance Belt in Corona", desc: "Distance-monitoring safety belt.", tags: ["Safety", "Wearable"] },
  { name: "Gesture Controlled Flex Sensor", desc: "Flex-sensor gesture control.", tags: ["HCI"] },
  { name: "HeartBeat Monitoring System", desc: "Pulse sensor + alert system.", tags: ["Health"] },
  { name: "HC-05 Bluetooth Automation", desc: "BT-driven home automation.", tags: ["BT", "Home"] },
  { name: "Servo Automation System", desc: "Multi-servo automation rig.", tags: ["Robotics"] },
  { name: "ESP32-CAM Object Detection", desc: "Edge vision on ESP32-CAM.", tags: ["CV", "Edge"] },
  { name: "Solar Tracking System", desc: "Dual-axis sun tracker.", tags: ["Solar", "Energy"] },
  { name: "Temperature Monitoring", desc: "Realtime temperature dashboard.", tags: ["Sensors"] },
  { name: "Smart Parking Prototype", desc: "Slot detection + signage.", tags: ["Smart City"] },
  { name: "Motion Detection Security Alarm", desc: "PIR-based intrusion alert.", tags: ["Safety"] },
  { name: "Ultrasonic Distance System", desc: "HC-SR04 ranging unit.", tags: ["Sensors"] },
  { name: "Obstacle Avoiding Robot", desc: "Autonomous wandering bot.", tags: ["Robotics"] },
  { name: "Fire Alarm & Detection", desc: "Flame sensor alert system.", tags: ["Safety"] },
  { name: "Rain Detection System", desc: "Rain sensor + auto response.", tags: ["IoT"] },
  { name: "Water Level Indicator", desc: "Multi-stage tank level UI.", tags: ["IoT"] },
];

export const SOFTWARE_PROJECTS: Project[] = [
  { name: "MediRoute", desc: "Smart medical routing platform.", tags: ["Web", "Healthcare"], status: "active" },
  { name: "Study Flow", desc: "Focus + study planning app.", tags: ["App", "Productivity"], status: "shipped" },
  { name: "AranyaSync", desc: "Companion dashboard for forest sensor mesh.", tags: ["Dashboard", "IoT"] },
  { name: "Comrade / COMRADE", desc: "Team coordination ops console.", tags: ["Web", "Ops"] },
  { name: "HazardEye Dashboard", desc: "Industrial safety dashboard.", tags: ["Dashboard", "Safety"] },
  { name: "Sensors Info Website", desc: "Educational sensors reference site.", tags: ["Web", "Edu"] },
  { name: "Virtual C Code Trainer", desc: "Interactive C programming trainer.", tags: ["Edu", "Web"] },
  { name: "Aurora App", desc: "Companion mobile app for Aurora.", tags: ["App", "AI"] },
  { name: "Aurora 2.0 App", desc: "Updated companion app.", tags: ["App", "AI"] },
  { name: "Aurora 2.0 Hindi App", desc: "Hindi-localised companion.", tags: ["App", "Hindi"] },
  { name: "Mini AgroBot Controller", desc: "Robot controller app.", tags: ["App", "Robotics"] },
  { name: "Remote_Controll App", desc: "BT/Wi-Fi remote control app.", tags: ["App", "Robotics"] },
  { name: "Egyce Lab App / EY_GDS", desc: "Lab tooling for EY/GDS.", tags: ["App", "Enterprise"] },
  { name: "Attendance App", desc: "RFID/QR attendance app.", tags: ["App", "School"] },
  { name: "Notifier App", desc: "Push notification app.", tags: ["App"] },
  { name: "Battery Health Shower", desc: "Battery diagnostics tool.", tags: ["App", "Diag"] },
  { name: "EY", desc: "Internal EY tool.", tags: ["Enterprise"] },
  { name: "NMMC_School_No_104", desc: "Civic school site for NMMC #104.", tags: ["Web", "Civic"] },
  { name: "Music Player (Circular Queue)", desc: "DSA-driven music player demo.", tags: ["DSA", "App"] },
  { name: "Student Task Manager (Priority Queue)", desc: "Heap-based task manager.", tags: ["DSA", "App"] },
];

export const ACHIEVEMENTS = [
  { title: "IdeaThrown 2026", detail: "Runner Up — College Techfest", year: "2026" },
  { title: "TechVision 2026", detail: "Winner — First year of college", year: "2026" },
  { title: "UnPlugged 3.0", detail: "Selected in Top 50 (Offline Round)", year: "2026" },
  { title: "HazardEye Workshop", detail: "Opportunity to conduct a workshop on HazardEye in college", year: "2026" },
  { title: "HackDuino'26", detail: "Final Demonstration — Certificate of Participation", year: "2026" },
  { title: "Stem Sparks 2023", detail: "1st Place", year: "2023" },
  { title: "Stem Sparks 2023", detail: "3rd Place", year: "2023" },
  { title: "Stem Sparks 2023", detail: "4th Place", year: "2023" },
  { title: "Siemens Innovation Fest 2023", detail: "1st Place", year: "2023" },
  { title: "Siemens Innovation Fest 2023", detail: "2nd Place", year: "2023" },
  { title: "Inter School Competition", detail: "Winner — 2023", year: "2023" },
  { title: "Stem Sparks 2022", detail: "YouTube Video Recognition", year: "2022" },
  { title: "Siemens Innovation Fest 2022", detail: "1st Place", year: "2022" },
  { title: "Siemens Innovation Fest 2022", detail: "2nd Place", year: "2022" },
  { title: "Inter School Competition", detail: "Winner — 2022", year: "2022" },
  { title: "Indian Aurora 2.0", detail: "National Specialization — Top 8 Rank", year: "2021" },
  { title: "Young Upcoming Scientist Trophy", detail: "Awarded by Dr. Anil Kakodkar", year: "—" },
  { title: "District Level Competition", detail: "Winner", year: "—" },
  { title: "IIT Bombay Innovation Fest", detail: "Participation Certificate", year: "—" },
  { title: "Plezmo App Developer", detail: "6 Certifications", year: "2020" },
];

export const SKILLS = {
  Technical: [
    "Embedded C", "Embedded C++", "Embedded Systems", "PCB Design", "System Architecture",
    "FreeRTOS", "ESP8266", "ESP32", "Raspberry Pi", "Arduino",
    "Sensors", "Robotics", "IoT", "Software Development", "Web Development",
    "Programming", "Firebase", "Cloud Firestore", "AutoCAD",
  ],
  Soft: [
    "Team Management", "Leadership", "Confidence Building", "Time Management",
    "Problem Solving", "Adaptability", "Technological Awareness", "Initiative",
    "Public Speaking", "Innovation Mindset", "Critical Thinking", "Presentation",
    "Social Responsibility", "Event Coordination", "Project Management",
    "Creativity", "Technological Innovation", "Observation", "Technical Thinking",
    "Logical Reasoning", "Teamwork", "Decision-Making", "Communication",
    "Teaching", "Analytical Skills",
  ],
  "Business & Analysis": ["Financial Analysis", "Equity Research", "Stock Market", "Operations"],
  Languages: ["Marathi", "English", "Hindi"],
};

export const EXPERIENCE = [
  { role: "Lead", org: "SYGNIX", period: "Present", detail: "Leading the SYGNIX innovation ecosystem — hardware, software, AI and robotics initiatives." },
  { role: "Teacher", org: "Diamond Student Classes", period: "—", detail: "Teaching engineering & STEM fundamentals." },
  { role: "Financial Analyst", org: "Gravitas Masters", period: "—", detail: "Equity research, financial analysis, market operations." },
  { role: "Mentor", org: "Atal Tinkering Lab", period: "—", detail: "Mentoring students in IoT, robotics & innovation." },
  { role: "Innovation & IoT Mentor", org: "Independent", period: "—", detail: "Cross-school mentorship for IoT projects." },
];

export const SYGNIX = {
  tagline: "An innovation ecosystem fusing hardware, software, AI and robotics.",
  pillars: [
    { name: "Hardware Systems", detail: "Embedded design, PCB engineering, IoT mesh, robotics platforms." },
    { name: "Software & AI", detail: "Web/app interfaces, AI agents, ML inference at the edge." },
    { name: "Research & R&D", detail: "Phantom Net, Phantom Grid, Aurora-class companions." },
    { name: "Hackathons & Events", detail: "HackDuino, Stem Sparks, Innovation Fests." },
    { name: "Team Philosophy", detail: "Build relentlessly. Ship boldly. Mentor generously." },
  ],
  roadmap: [
    { phase: "Q1", title: "Aurora 3.0", detail: "Holographic AI companion v3." },
    { phase: "Q2", title: "AranyaSync Mesh", detail: "Forest sensor mesh deployment." },
    { phase: "Q3", title: "Phantom Grid Pilot", detail: "Distributed grid concept pilot." },
    { phase: "Q4", title: "SYGNIX Lab", detail: "Public R&D lab opening." },
  ],
};

export const TIMELINE_DATA = [
  {
    year: "2020",
    title: "Foundation & Learning Phase",
    focus: "Started my journey in 6th standard — learning Arduino, sensors, automation and embedded basics.",
    hardware: [
      "Smart Lights", "Smart Street Lights", "Water Level Indicator System",
      "Rain Detection System", "Fire Alarm & Fire Detection System", "Ultrasonic Distance Measurement System",
      "Motion Detection Security Alarm", "Temperature Monitoring System", "Servo Automation System",
      "HC-05 Bluetooth Automation System", "Automatic Water Dispenser", "Soil Moisture Alert",
      "HeartBeat Monitoring System", "Gesture Controlled Flex Sensor System", "Energy Saving Setup"
    ],
    software: [],
    achievements: [],
  },
  {
    year: "2021",
    title: "Robotics, Aurora & Early Innovation",
    focus: "Robotics, automation, intelligent systems and early AI assistant ecosystem development.",
    hardware: [
      "Remote Control Car", "Obstacle Avoiding Robot", "Object Detection Car",
      "Object Follower Car", "Line Follower Car", "Smart Parking Prototype",
      "LPG Leakage Alert System", "Smart Dustbin", "Solar Tracking System",
      "Aurora", "Aurora 2.0", "Indian_Aurora (Hindi)", "Team_Indian_Aurora Chatbot"
    ],
    software: [
      "Aurora App", "Aurora 2.0 App", "Aurora 2.0 Hindi Version", "Remote_Controll App"
    ],
    achievements: [
      "Indian Aurora 2.0 — National Top 8 Rank"
    ],
  },
  {
    year: "2022",
    title: "IoT & Real-World Systems Phase",
    focus: "ESP32, IoT integration and real-world automation systems.",
    hardware: [
      "Smart RFID Attendance System", "RFID Based Gates", "Women Safety Alert using NEO-6M GPS",
      "Smart Blind People Goggles", "Smart Blind People Stick", "Smart Traffic Light Brigade System",
      "ESP32-CAM Object Detection System", "Mini AgroBot",
      "Long Distance Belt in Corona"
    ],
    software: [
      "Attendance App", "Notifier App", "Mini AgroBot Controller App"
    ],
    achievements: [
      "Siemens Innovation Fest 2022 — 1st Place", "Siemens Innovation Fest 2022 — 2nd Place", "Stem Sparks 2022 — YouTube Recognition"
    ],
  },
  {
    year: "2023",
    title: "Advanced Software & Innovation",
    focus: "Software architecture, dashboards and innovation ecosystem thinking.",
    hardware: [],
    software: [
      "Virtual C Code Trainer", 
      "EY / EY_GDS", "Battery Health Shower", "NMMC_School_No_104"
    ],
    achievements: [
      "Stem Sparks 2023 — 1st / 3rd / 4th Place",
      "Siemens Innovation Fest 2023 — 1st & 2nd Place", "Trophy by Dr. Anil Kakodkar",
      "District Level Competition Winner"
    ],
  },
  {
    year: "2024–2025",
    title: "Transition to Flagship Engineering",
    focus: "Transition toward startup-grade engineering ecosystems and futuristic AI systems.",
    hardware: [],
    software: [
      "Aurora 3.0", "Phantom Net", "Phantom Grid", "Karma", "Saaya"
    ],
    achievements: [],
    status: "Projects in Ideation / Active Development"
  },
  {
    year: "2026",
    title: "Flagship Systems & Professional Engineering",
    focus: "Pursuing B.Tech in CSE (IoT, Cybersecurity & Blockchain). Building professional, scalable and flagship ecosystems.",
    hardware: [
      "HazardEye", "AranyaSync"
    ],
    software: [
      "HazardEye Dashboard", "MediRoute", "Study Flow", "Comrade / COMRADE",
      "Machine Monitoring System", "Music Player (Circular Queue)",
      "Student Task Manager (Priority Queue)", "Sensors Info Website"
    ],
    achievements: [],
  }
];
