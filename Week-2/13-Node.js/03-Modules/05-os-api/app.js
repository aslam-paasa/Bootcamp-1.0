/**
 * NODE.JS OS MODULE — system info, memory, CPU, network
 *
 * 1. What is OS Module?
 *    ──────────────────────
 *    > Node ka built-in module (install karne ki zaroorat nahi) jo 
 *      machine ke baare mein information expose karta hai — 
 *      OS, CPU, memory, network interfaces, aur bhi bahut kuch.
 *
 *    > const os = require("os");
*/

/**
 * KEY CONCEPTS AUR KEYWORDS:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. os.platform() + os.arch() + os.release()                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ platform() → OS ka identifier string                            │
 * │   "win32"  → Windows (chahe 64-bit system ho)                   │
 * │   "linux"  → Linux                                              │
 * │   "darwin" → macOS                                              │
 * │                                                                 │
 * │ arch() → CPU instruction set (processor architecture)           │
 * │   "x64"  → 64-bit Intel/AMD (sabse common)                      │
 * │   "arm"  → ARM (Raspberry Pi, Apple Silicon Macs)               │
 * │   "ia32" → 32-bit Intel                                         │
 * │                                                                 │
 * │ release() → OS version string                                   │
 * │   Windows: "10.0.22621"   Linux: "5.15.0-91-generic"            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const platform = os.platform();                               │
 * │   if (platform === "win32") { /* Windows ke paths * / }         │
 * │   if (platform === "linux") { /* Linux ke paths  * / }          │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. os.cpus()                                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Array return karta hai — har logical CPU core ke liye  |
 * |          ek object. Aur har object mein model, speed (MHz), aur |
 * |          times hota hai.                                        │
 * │          (user / sys / idle ticks — CPU time distribution).     │
 * │                                                                 │
 * │ Sabse useful property: os.cpus().length → core count            │
 * │ Common use: har core ke liye ek worker process spin up karna    │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const cores = os.cpus().length;                               │
 * │   console.log(os.cpus()[0].model); // "Intel(R) Core(TM) i7-..."│
 * │   console.log(cores);              // 8                         │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. os.totalmem() + os.freemem()                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Dono bytes return karte hain — GB mein convert karne   │
 * │          ke liye 1024 ** 3 se divide karo.                      │
 * │          - totalmem() fixed hota hai;                           |
 * |          - freemem() runtime mein badalta hai                   │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const totalGB  = (os.totalmem()     / 1024 ** 3).toFixed(2);  │
 * │   const freeGB   = (os.freemem()      / 1024 ** 3).toFixed(2);  │
 * │   const usedPct  = ((1 - os.freemem() / os.totalmem()) * 100)   │
 * │                      .toFixed(1);                               │
 * │   console.log(`RAM: ${freeGB} GB free / ${totalGB} GB total`);  │
 * │   console.log(`Used: ${usedPct}%`);                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ 4. os.homedir() + os.hostname() + os.userInfo()                       │
 * ├───────────────────────────────────────────────────────────────────────┤
 * │ homedir()  → current user ka home directory                           │
 * │   Windows: "C:\Users\Rajesh"   Linux: "/home/rajesh"                  │
 * │   macOS:   "/Users/rajesh"                                            │
 * │                                                                       │
 * │ hostname() → machine ka naam network par                              │
 * │   Server logs / multi-instance deployments mein useful                │
 * │                                                                       │
 * │ userInfo() → { uid, gid, username, homedir, shell }                   │
 * │   Sirf homedir() se zyada detail chahiye to ye use karo               │
 * │                                                                       │
 * │ Code template:                                                        │
 * │   const configPath = path.join(os.homedir(), ".myapp", "config.json");|
 * │   console.log(`[${os.hostname()}] Server start hua`); // server logs  │
 * │   console.log(os.userInfo().username); // current user ka naam        │
 * └───────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. os.loadavg()                                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: [1min, 5min, 15min] CPU load averages return karta hai.│
 * │          Ye batata hai ki kitne processes CPU time ke liye wait │
 * │          kar rahe the.                                          │
 * │                                                                 │
 * │ Values ka matlab:                                               │
 * │   load / cores  <  1.0  → healthy (system free hai)             │
 * │   load / cores  >= 1.0  → saturated (processes queue mein hain) │
 * │                                                                 │
 * │ Note: Windows par hamesha [0, 0, 0] return hota hai.            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const [m1, m5, m15] = os.loadavg();                           │
 * │   const cores = os.cpus().length;                               │
 * │   if (m1 / cores > 0.9) console.warn("CPU almost full");        │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. os.networkInterfaces()                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek object return karta hai jisme keys interface names  │
 * │          hain. Har value array hai address objects ki:          │
 * │   { address, netmask, mac, family, internal }                   │
 * │                                                                 │
 * │ internal: true → loopback (127.0.0.1) — inko skip karo          │
 * │ family: "IPv4" → ye address hai jo most tools expect karte hain │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   function getLocalIP() {                                       │
 * │     for (const nets of Object.values(os.networkInterfaces())) { │
 * │       for (const net of nets) {                                 │
 * │         if (!net.internal && net.family === "IPv4")             │
 * │           return net.address;                                   │
 * │       }                                                         │
 * │     }                                                           │
 * │     return "127.0.0.1";                                         │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. os.uptime() + os.tmpdir() + os.endianness()                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ uptime()     → seconds since OS last boot hua tha               │
 * │ tmpdir()     → OS temp directory ka path (/tmp on Linux/macOS)  │
 * │                Windows: "C:\Users\Rajesh\AppData\Local\Temp"    │
 * │                                                                 │
 * │ endianness() → "LE" (little-endian) ya "BE" (big-endian)        │
 * │                Modern CPUs par almost always "LE".              │
 * │                Sirf binary protocols / file formats ke liye     │
 * │                chahiye hota hai.                                │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const uptimeHours = (os.uptime() / 3600).toFixed(1);          │
 * │   console.log(`System ${uptimeHours} hours se up hai`);         │
 * │   const tmpFile = path.join(os.tmpdir(), "myapp-cache.json");   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 8. os.EOL — End Of Line (cross-platform newline)                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: OS-specific line terminator. Windows par "\r\n",       │
 * │          Linux/macOS par "\n". Files write karte waqt use karo  │
 * │          taake cross-platform compatible rahe.                  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const lines = ["Line 1", "Line 2", "Line 3"];                 │
 * │   const content = lines.join(os.EOL);                           │
 * │   await fs2.writeFile("./file.txt", content);                   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 9. os.type() — OS name (different from platform)                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: platform() se thoda different format mein OS name      │
 * │                                                                 │
 * │   Windows: "Windows_NT"                                         │
 * │   Linux:   "Linux"                                              │
 * │   macOS:   "Darwin"                                             │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   console.log(os.type()); // "Windows_NT" etc.                  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 10. os.version() — detailed OS version (Windows only)           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Detailed OS version string. Windows par detailed       │
 * │          version deta hai, Linux/macOS par release() jaisa.     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   console.log(os.version()); // "Windows 10 Pro" etc.           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 11. os.machine() — CPU architecture string (Node v18+)          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: arch() jaisa hi but more detailed. Node 18+ mein aaya. │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   console.log(os.machine()); // "x86_64", "arm64", etc.         │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ 12. os.devNull — cross-platform null device                         │
 * ├─────────────────────────────────────────────────────────────────────┤
 * │ Kya hai: OS ka null device path. Windows par "nul",                 │
 * │          Unix-like par "/dev/null". Output discard karne ke liye    │
 * │                                                                     │
 * │ Code template:                                                      │
 * │   const out = fs.createWriteStream(os.devNull); // kuch nahi likhega│
 * └─────────────────────────────────────────────────────────────────────┘
*/


const os = require("os");
const path = require("path");
const fs2 = require("fs/promises");


/* 1. Basic OS Info */
console.log("\n" + "=".repeat(60));
console.log("🖥️  BASIC OS INFO");
console.log("=".repeat(60));
console.log("Platform:        ", os.platform());
console.log("OS Type:         ", os.type());
console.log("Architecture:    ", os.arch());
console.log("Machine:         ", os.machine ? os.machine() : "N/A (Node v18+ required)");
console.log("OS Release:      ", os.release());
console.log("OS Version:      ", os.version ? os.version() : "N/A");
console.log("Hostname:        ", os.hostname());
console.log("Home Directory:  ", os.homedir());
console.log("Temp Directory:  ", os.tmpdir());
console.log("Endianness:      ", os.endianness());
console.log("Dev Null:        ", os.devNull);
console.log("EOL (visible):   ", JSON.stringify(os.EOL));


/* 2. CPU Info */
const cpus = os.cpus();
console.log("CPU Cores:       ", cpus.length);
if (cpus.length > 0) {
  console.log("CPU Model:       ", cpus[0].model);
  console.log("CPU Speed:       ", cpus[0].speed, "MHz");
  console.log("CPU Times (core0):", JSON.stringify(cpus[0].times));
}


/* 3. Memory Info */
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const usedPercent = (usedMem / totalMem * 100).toFixed(1);

console.log("Total RAM:       ", (totalMem / 1024 ** 3).toFixed(2), "GB");
console.log("Free RAM:        ", (freeMem / 1024 ** 3).toFixed(2), "GB");
console.log("Used RAM:        ", (usedMem / 1024 ** 3).toFixed(2), "GB");
console.log("RAM Used:        ", usedPercent, "%");
console.log("RAM Free:        ", (100 - parseFloat(usedPercent)).toFixed(1), "%");


/* 4. Load Average (CPU Load) */
const [load1, load5, load15] = os.loadavg();
console.log("1 min load:      ", load1.toFixed(2));
console.log("5 min load:      ", load5.toFixed(2));
console.log("15 min load:     ", load15.toFixed(2));

if (cpus.length > 0) {
  console.log("Load per core (1m):", (load1 / cpus.length).toFixed(2));
  console.log("Load per core (5m):", (load5 / cpus.length).toFixed(2));
  console.log("Load per core (15m):", (load15 / cpus.length).toFixed(2));
  
  if (load1 / cpus.length > 0.9) {
    console.log("⚠️  Warning: CPU load high!");
  } else {
    console.log("✅ CPU load normal");
  }
}


/* 5. Uptime */
const uptimeSec = os.uptime();
const uptimeMin = uptimeSec / 60;
const uptimeHour = uptimeMin / 60;
const uptimeDay = uptimeHour / 24;

console.log("Uptime (seconds):", uptimeSec.toFixed(0));
console.log("Uptime (minutes):", uptimeMin.toFixed(1));
console.log("Uptime (hours):  ", uptimeHour.toFixed(1));
console.log("Uptime (days):   ", uptimeDay.toFixed(1));


/* 6. Network Interfaces */
const nets = os.networkInterfaces();
let foundIP = false;

for (const [name, interfaces] of Object.entries(nets)) {
  console.log(`\nInterface: ${name}`);
  for (const net of interfaces) {
    const type = net.internal ? "🔁 Loopback" : "🌍 External";
    console.log(`  ${type} - ${net.family}: ${net.address}`);
    console.log(`    Netmask: ${net.netmask}, MAC: ${net.mac}`);
    
    if (!foundIP && !net.internal && net.family === "IPv4") {
      foundIP = true;
    }
  }
}

if (!foundIP) {
  console.log("\nNo external IPv4 address found");
}


/* 7. User Info */
try {
  const userInfo = os.userInfo();
  console.log("Username:        ", userInfo.username);
  console.log("UID:             ", userInfo.uid);
  console.log("GID:             ", userInfo.gid);
  console.log("Shell:           ", userInfo.shell);
  console.log("Home Dir:        ", userInfo.homedir);
} catch (err) {
  console.log("User info not available on this system");
}


/* 8. Practical Example 1: Health Check Object */
const healthCheck = {
  status: "healthy",
  timestamp: new Date().toISOString(),
  server: os.hostname(),
  platform: os.platform(),
  release: os.release(),
  arch: os.arch(),
  cpu: {
    cores: cpus.length,
    model: cpus.length > 0 ? cpus[0].model : "Unknown",
    loadAvg: os.loadavg().map(l => parseFloat(l.toFixed(2))),
  },
  memory: {
    totalGB: parseFloat((totalMem / 1024 ** 3).toFixed(2)),
    freeGB: parseFloat((freeMem / 1024 ** 3).toFixed(2)),
    usedPercent: parseFloat(usedPercent),
  },
  uptime: {
    seconds: uptimeSec,
    hours: parseFloat(uptimeHour.toFixed(1)),
    days: parseFloat(uptimeDay.toFixed(1)),
  },
};

console.log(JSON.stringify(healthCheck, null, 2));


/* 9. Practical Example 2: Cross-platform Config Path */
const appName = "myapp";
let configDir;

if (os.platform() === "win32") {
  /* Windows: C:\Users\username\AppData\Local\myapp */
  configDir = path.join(os.homedir(), "AppData", "Local", appName);
} else if (os.platform() === "darwin") {
  /* macOS: /Users/username/Library/Application Support/myapp */
  configDir = path.join(os.homedir(), "Library", "Application Support", appName);
} else {
  /* Linux: /home/username/.config/myapp */
  configDir = path.join(os.homedir(), ".config", appName);
}

console.log("Config directory:", configDir);


/* 10. Practical Example 3: Get Local IP Function */
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
}

console.log("Local IP:", getLocalIP());


/* 11. Practical Example 4: Write lines with proper EOL (End of Line) */
async function writeLinesExample() {
  const lines = [
    "First line",
    "Second line",
    "Third line"
  ];
  
  const content = lines.join(os.EOL) + os.EOL;
  const filePath = path.join(os.tmpdir(), `example-${Date.now()}.txt`);
  
  try {
    await fs2.writeFile(filePath, content, "utf-8");
    console.log(`File written to: ${filePath}`);
    console.log(`Content: ${JSON.stringify(content)}`);
  } catch (err) {
    console.error("Error writing file:", err.message);
  }
}

// writeLinesExample();



/* 12. Practical Example 5: Check if running in container */
console.log("\n" + "=".repeat(60));
console.log("🐳 CONTAINER DETECTION");
console.log("=".repeat(60));

/* Simple heuristic: check if /proc/1/cgroup contains 'docker' or 'kubepods' */
async function isRunningInContainer() {
  try {
    if (os.platform() === "linux") {
      const content = await fs2.readFile("/proc/1/cgroup", "utf-8");
      const inContainer = content.includes("docker") || 
                          content.includes("kubepods") || 
                          content.includes("lxc");
      return inContainer;
    }
  } catch {
    /* File not found - probably not in container */
  }
  return false;
}

// isRunningInContainer().then(inContainer => {
//   console.log("Running in container:", inContainer);
// });




/** 
 * EXAMPLE WITH REAL DATA: Server health check endpoint
 * 
 * const os = require("os");
 * const express = require("express");
 * const app = express();
 * 
 * app.get("/health", (req, res) => {
 *   const totalMem = os.totalmem();
 *   const freeMem = os.freemem();
 *   const usedMemPercent = ((1 - freeMem / totalMem) * 100).toFixed(1);
 *   
 *   const health = {
 *     status: "healthy",
 *     timestamp: new Date().toISOString(),
 *     server: os.hostname(),
 *     platform: `${os.platform()} ${os.release()}`,
 *     cpu: {
 *       model: os.cpus()[0].model,
 *       cores: os.cpus().length,
 *       loadAvg: os.loadavg().map(l => l.toFixed(2)),
 *     },
 *     memory: {
 *       total: `${(totalMem / 1024 ** 3).toFixed(2)} GB`,
 *       free: `${(freeMem / 1024 ** 3).toFixed(2)} GB`,
 *       usedPercent: `${usedMemPercent}%`,
 *     },
 *     uptime: `${(os.uptime() / 3600).toFixed(1)} hours`,
 *   };
 *   
 *   res.json(health);
 * });
 * 
 * app.listen(3000, () => {
 *   console.log(`Server ${os.hostname()} par 3000 port pe start hua`);
 *   console.log(`Local IP: ${getLocalIP()}`);
 * });
 */