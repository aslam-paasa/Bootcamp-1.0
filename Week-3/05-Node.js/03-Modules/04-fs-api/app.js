/**
 * NODE.JS FILE SYSTEM — fs module, sync, callbacks, promises (HINGLISH VERSION)
 *
 * 1. What is fs module?
 *    ──────────────────────
 *    > Node ka built-in module jo files ko read, write, aur manage karne
 *      ke liye hai.
 *    > Browser ke paas file system access nahi hota, lekin Node ko direct
 *      access hai.
 *   
 *      const fs  = require("fs");           // callback + sync style
 *      const fs2 = require("fs/promises");  // promise style (recommended - ye use karo)
*/

/**
 * When to use what?
 *  ┌──────────────┬──────────────────┬───────────────────────────────┐
 *  │ Style        │ Syntax           │ Kab use karna hai             │
 *  ├──────────────┼──────────────────┼───────────────────────────────┤
 *  │ Synchronous  │ readFileSync()   │ CLI scripts, startup config   │
 *  │              │                  │ (chhoti files, ek baar)       │
 *  ├──────────────┼──────────────────┼───────────────────────────────┤
 *  │ Callback     │ readFile(cb)     │ Purane codebases (legacy)     │
 *  │              │                  │ naya code mein mat use karo   │
 *  ├──────────────┼──────────────────┼───────────────────────────────┤
 *  │ Promise/async│ await readFile() │ Servers, modern code          │
 *  │              │                  │ YAHI USE KARO (recommended)   │
 *  └──────────────┴──────────────────┴───────────────────────────────┘
 *
 * > IMPORTANT: 
 *   Server request handler mein kabhi sync methods mat use karo!
 *   Ye event loop ko BLOCK kar dete hain aur saare concurrent requests FREEZE ho jate hain.
*/


/**
 * KEY CONCEPTS AUR KEYWORDS:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. fs.readFileSync() — synchronous read (Blocking)              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File padhta hai aur execution tab tak BLOCK karta hai  │
 * │          jab tak file read na ho jaye.                          │
 * │                                                                 │
 * │ Returns: Buffer (raw binary). .toString() lagao ya "utf-8" pass │
 * │          karo direct string lene ke liye.                       │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const buffer  = fs.readFileSync("./sample.txt");              │
 * │   const content = buffer.toString();     // Buffer → string     │
 * │                                                                 │
 * │   // ya ek step mein:                                           │
 * │   const content = fs.readFileSync("./sample.txt", "utf-8");     │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. fs.readFile() — callback read (Non-blocking, old style)      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File asynchronously padhta hai. Node next line turant  │
 * │          execute kar deta hai. Callback baad mein chalta hai.   │
 * │                                                                 │
 * │ Parameters:                                                     │
 * │   path     → file ka naam                                       │
 * │   encoding → "utf-8" (Buffer ko string mein convert karega)     │
 * │   callback → (err, content) — hamesha pehle err check karo      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   fs.readFile("./sample.txt", "utf-8", (err, content) => {      │
 * │     if (err) throw err;                                         │
 * │     console.log(content);                                       │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. fs/promises + async/await — promise read (MODERN, USE THIS)  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Modern Promise-based version. await sirf current async │
 * │          function ko pause karta hai — event loop free rehta hai│
 * │          doosre requests ke liye.                               │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const fs2 = require("fs/promises");                           │
 * │                                                                 │
 * │   async function readFile() {                                   │
 * │     try {                                                       │
 * │       const content = await fs2.readFile("./sample.txt","utf-8")│
 * │       console.log(content);                                     │
 * │     } catch (err) {                                             │
 * │       console.error("Read failed:", err.message);               │
 * │     }                                                           │
 * │   }                                                             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. fs.writeFile() — file banao ya overwrite karo                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Agar file exist nahi karti to new file create karta hai│
 * │          Agar file exist karti hai to uska poora content REPLACE│
 * │          kar deta hai (purana content chala jayega).            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   fs.writeFile("./new.txt", "Hello!", (err) => {                │
 * │     if (err) throw err;                                         │
 * │     console.log("File write ho gayi");                          │
 * │   });                                                           │
 * │                                                                 │
 * │   // Promise version (recommended):                             │
 * │   await fs2.writeFile("./new.txt", "Hello!");                   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. fs.appendFile() — bina overwrite kiye content add karo       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File ke END mein content add karta hai.                │
 * │          Agar file exist nahi karti to new file create karta hai│
 * │          Existing content safe rehta hai (overwrite nahi hota). │
 * │          Log files aur audit trails ke liye perfect.            │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   fs.appendFile("./app.log", "Naya entry\n", (err) => {         │
 * │     if (err) throw err;                                         │
 * │   });                                                           │
 * │                                                                 │
 * │   // Promise version (recommended):                             │
 * │   await fs2.appendFile("./app.log", `[${new Date().toISOString()}] msg\n`);
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. fs.access() — check file exist hai ya nahi / permissions     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Check karta hai ki file/directory accessible hai ya nahi│
 * │                                                                 │
 * │ Constants:                                                      │
 * │   fs.constants.F_OK  → file exist karti hai?                    │
 * │   fs.constants.R_OK  → readable hai? (padh sakte ho?)           │
 * │   fs.constants.W_OK  → writable hai? (likh sakte ho?)           │
 * │   fs.constants.X_OK  → executable hai? (execute kar sakte ho?)  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   fs.access("./new.txt", fs.constants.F_OK, (err) => {          │
 * │     console.log(err ? "File nahi mili" : "File exist karti hai");│
 * │   });                                                           │
 * │                                                                 │
 * │   // Promise version (recommended):                             │
 * │   try {                                                         │
 * │     await fs2.access("./new.txt", fs.constants.F_OK);           │
 * │     console.log("File exist karti hai");                        │
 * │   } catch { console.log("File nahi mili"); }                    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. fs.unlink() — file delete karo                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File permanently delete ho jati hai. Recycle bin mein  │
 * │          nahi jati, undo nahi ho sakti.                         │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   fs.unlink("./new.txt", (err) => {                             │
 * │     if (err) throw err;                                         │
 * │     console.log("File delete ho gayi");                         │
 * │   });                                                           │
 * │                                                                 │
 * │   // Promise version (recommended):                             │
 * │   await fs2.unlink("./new.txt");                                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 8. fs.rename() — file rename karo ya move karo                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File ka naam badal deta hai. Agar destination alag     │
 * │          folder mein hai to file MOVE ho jati hai.              │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   await fs2.rename("./old.txt", "./archive/old.txt");           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 9. fs.mkdir() — naya folder banao                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Directory (folder) create karta hai.                   │
 * │                                                                 │
 * │ { recursive: true } → nested paths automatically create karta hai│
 * │                       agar parent folders exist na hon to.      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   await fs2.mkdir("./uploads/images", { recursive: true });     │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 10. fs.readdir() — folder ke contents list karo                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Directory mein maujood files/folders ke names ki array │
 * │          return karta hai.                                      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const files = await fs2.readdir("./uploads");                 │
 * │   console.log(files); // ["image1.png", "image2.png"]           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 11. fs.stat() — file ka metadata (size, date, type)            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File/directory ke baare mein details return karta hai: │
 * │   stat.size          → size in bytes (kitni badi file hai)      │
 * │   stat.isFile()      → true agar file hai                       │
 * │   stat.isDirectory() → true agar folder hai                     │
 * │   stat.mtime         → last modified date (kab last change hui) │
 * │   stat.birthtime     → creation date (kab banayi gayi)          │
 * │   stat.isSymbolicLink() → true agar symbolic link hai           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const stat = await fs2.stat("./sample.txt");                  │
 * │   console.log(stat.size, stat.mtime);                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 12. fs.copyFile() — file copy karo                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: src file ko dest mein copy karta hai. Default mein     │
 * │          overwrite kar deta hai agar dest exist karta hai.      │
 * │          COPYFILE_EXCL use karo to prevent overwrite.           │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   await fs2.copyFile("./src.txt", "./backup/src.txt");          │
 * │                                                                 │
 * │   // Overwrite mat karo agar exist karta hai to:                │
 * │   await fs2.copyFile("./src.txt", "./backup/src.txt",           │
 * │     fs.constants.COPYFILE_EXCL);                                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 13. fs.watch() — file changes watch karo                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Jab bhi file/folder change ho, callback trigger hota hai│
 * │          Dev tools mein use hota hai (hot reload, file watchers)│
 * │                                                                 │
 * │ Code template:                                                  │
 * │   fs.watch("./config.json", (eventType, filename) => {          │
 * │     console.log(`${filename} change hua (${eventType})`);       │
 * │   });                                                           │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 14. fs.rm() — file ya folder delete karo (RECOMMENDED)          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File ya folder delete karta hai. unlink sirf file ke   │
 * │          liye hai, rm dono ke liye kaam karta hai.              │
 * │                                                                 │
 * │ { recursive: true, force: true } → folder aur uske andar ki    │
 * │                    saari files delete kar dega.                 │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // File delete:                                               │
 * │   await fs2.rm("./file.txt");                                   │
 * │                                                                 │
 * │   // Folder delete (saari files + subfolders):                  │
 * │   await fs2.rm("./uploads", { recursive: true, force: true });  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 15. fs.rmdir() — sirf EMPTY folder delete karo (OLD)            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Sirf EMPTY folder delete kar sakta hai. Agar folder    │
 * │          empty nahi hai to error dega.                          │
 * │                                                                 │
 * │ NOTE: Naye code mein fs.rm use karo, rmdir mat use karo.        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   await fs2.rmdir("./empty-folder");                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 16. fs.symlink() — symbolic link banao                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Shortcut ki tarah hota hai. Actual file ko point karta │
 * │          hai. Windows shortcuts ya Linux symlinks jaisa.        │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   await fs2.symlink("./target.txt", "./link.txt");              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 17. fs.chmod() — file permissions change karo                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: File ke read/write/execute permissions set karta hai.  │
 * │          Octal notation use hoti hai (e.g., 0o755, 0o644).      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   // 0o644 = owner read/write, group read, others read         │
 * │   await fs2.chmod("./file.txt", 0o644);                         │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 18. fs.constants — file system constants                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: access(), copyFile() etc mein use hone wale flags.    │
 * │                                                                 │
 * │ Common constants:                                               │
 * │   F_OK → file exists?                                           │
 * │   R_OK → readable?                                              │
 * │   W_OK → writable?                                              │
 * │   X_OK → executable?                                            │
 * │   COPYFILE_EXCL → copyFile mein overwrite mat karo              │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   console.log(fs.constants); // saari constants dekh sakte ho   │
 * └─────────────────────────────────────────────────────────────────┘
*/

/**
 * COMMON MISTAKES:
 * 1. WRONG: Server ke andar sync use karna
 *    app.get("/", (req, res) => {
 *      const data = fs.readFileSync("big.txt"); // Server BLOCK ho jayega!
 *    });
 *
 *    WRONG: Promises ke saath try/catch miss karna
 *    const data = await fs2.readFile("missing.txt"); // Crash ho jayega!
 *   
 *    RIGHT: try/catch use karo
 *     try { 
 *       const data = await fs2.readFile("missing.txt"); 
 *     } catch (err) { 
 *       console.error(err.message); 
 *     }
 *
 * 2. WRONG: Directory exist nahi hai aur wahan write kar rahe ho
 *    await fs2.writeFile("./uploads/new/file.txt", data); // Error!
 *   
 *    RIGHT: Pehle directory banao
 *    await fs2.mkdir("./uploads/new", { recursive: true }); 
 *    await fs2.writeFile("./uploads/new/file.txt", data);
 *
 * 3. WRONG: Non-empty folder delete karne ke liye rmdir use karna
 *    await fs2.rmdir("./uploads"); // Error! (folder empty nahi hai)
 *   
 *    RIGHT: rm use karo with recursive flag
 *    await fs2.rm("./uploads", { recursive: true, force: true });
*/


const fs = require("fs");
const fs2 = require("fs/promises");
const path = require("path");


/* 1. Synchronous read (Blocking) */
try {
  const dataBuffer = fs.readFileSync("./sample.txt");
  const content = dataBuffer.toString();
  console.log("Sync read:", content);
  
  /* Ya ek step mein */
  const content2 = fs.readFileSync("./sample.txt", "utf-8");
  console.log("Sync read with encoding:", content2);
} catch (err) {
  console.error("Sync read failed:", err.message);
}


/* 2. Callback read (Old style) */
fs.readFile("./sample.txt", "utf-8", (err, content) => {
  if (err) {
    console.error("Callback read failed:", err.message);
    return;
  }
  console.log("Callback read:", content);
});


/* 3. Promise read (MODERN - USE THIS) */
async function readFilePromise() {
  try {
    const content = await fs2.readFile("./sample.txt", "utf-8");
    console.log("Promise read:", content);
  } catch (err) {
    console.error("Promise read failed:", err.message);
  }
}
readFilePromise();


/* 4. Write file (create ya overwrite) */
async function writeFileExample() {
  try {
    await fs2.writeFile("./new.txt", "Yeh naya content hai");
    console.log("File write ho gayi");
  } catch (err) {
    console.error("Write failed:", err.message);
  }
}
writeFileExample();


/* 5. Append to file (bina overwrite kiye) */
async function appendFileExample() {
  try {
    await fs2.appendFile("./app.log", `${new Date().toISOString()} - User action\n`);
    console.log("Append ho gaya");
  } catch (err) {
    console.error("Append failed:", err.message);
  }
}
appendFileExample();


/* 6. Check file existence */
async function checkFileExists() {
  try {
    await fs2.access("./new.txt", fs.constants.F_OK);
    console.log("File exist karti hai");
    
    /* Check if readable */
    await fs2.access("./new.txt", fs.constants.R_OK);
    console.log("File readable hai");
    
    /* Check if writable */
    await fs2.access("./new.txt", fs.constants.W_OK);
    console.log("File writable hai");
    
  } catch (err) {
    console.log("File nahi mili ya access nahi hai");
  }
}
checkFileExists();


/* 7. Delete file */
async function deleteFileExample() {
  try {
    await fs2.unlink("./new.txt");
    console.log("File delete ho gayi");
  } catch (err) {
    console.error("Delete failed:", err.message);
  }
}
// deleteFileExample(); // Uncomment to test


/* 8. Rename / Move file */
async function renameFileExample() {
  try {
    await fs2.rename("./old.txt", "./archive/old.txt");
    console.log("File rename/move ho gayi");
  } catch (err) {
    console.error("Rename failed:", err.message);
  }
}
// renameFileExample(); // Uncomment to test


/* 9. Create directory */
async function createDirectoryExample() {
  try {
    await fs2.mkdir("./uploads/images", { recursive: true });
    console.log("Directory create ho gayi");
  } catch (err) {
    console.error("Directory creation failed:", err.message);
  }
}
createDirectoryExample();


/* 10. Read directory contents */
async function readDirectoryExample() {
  try {
    const files = await fs2.readdir("./uploads");
    console.log("Files in uploads:", files);
  } catch (err) {
    console.error("Read directory failed:", err.message);
  }
}
readDirectoryExample();


/* 11. File stats (metadata) */
async function fileStatsExample() {
  try {
    const stat = await fs2.stat("./sample.txt");
    console.log("File stats:");
    console.log("> Size:", stat.size, "bytes");
    console.log("> Is file?", stat.isFile());
    console.log("> Is directory?", stat.isDirectory());
    console.log("> Last modified:", stat.mtime);
    console.log("> Created:", stat.birthtime);
  } catch (err) {
    console.error("Stats failed:", err.message);
  }
}
fileStatsExample();


/* 12. Copy file */
async function copyFileExample() {
  try {
    await fs2.copyFile("./sample.txt", "./backup/sample.txt");
    console.log("File copy ho gayi");
  } catch (err) {
    console.error("Copy failed:", err.message);
  }
}
// copyFileExample(); // Uncomment to test


/* 13. Watch file for changes */
fs.watch("./sample.txt", (eventType, filename) => {
  console.log(`${filename} change hua (${eventType})`);
});


/* 14. Delete folder with all contents (MODERN) */
async function deleteFolderExample() {
  try {
    await fs2.rm("./uploads", { recursive: true, force: true });
    console.log("Folder aur saari files delete ho gayin");
  } catch (err) {
    console.error("Delete failed:", err.message);
  }
}
// deleteFolderExample(); // Uncomment to test


/* 15. Complete practical example: Logging system */
async function setupLogging() {
  const logDir = path.join(__dirname, "logs");
  const logFile = path.join(logDir, "app.log");
  
  try {
    /* Ensure log directory exists */
    try {
      await fs2.access(logDir);
    } catch {
      await fs2.mkdir(logDir, { recursive: true });
      console.log("Log directory create kiya");
    }
    
    /* Write log */
    const logEntry = `[${new Date().toISOString()}] App started\n`;
    await fs2.appendFile(logFile, logEntry);
    console.log("Log entry added");
    
    /* Read last 5 lines */
    const content = await fs2.readFile(logFile, "utf-8");
    const lines = content.split("\n").filter(l => l);
    const lastFive = lines.slice(-5);
    console.log("Last 5 log entries:", lastFive);
    
  } catch (err) {
    console.error("Logging system failed:", err.message);
  }
}
setupLogging();


/* 16. Path joining example (always use path.join) */
const wrongPath = __dirname + "/uploads/file.txt";               // Windows mein problem kar sakta hai
const correctPath = path.join(__dirname, "uploads", "file.txt"); // Works everywhere
console.log("Correct path:", correctPath);


/* 17. Check all fs constants */
console.log("\n fs.constants sample:");
console.log("  F_OK:", fs.constants.F_OK);
console.log("  R_OK:", fs.constants.R_OK);
console.log("  W_OK:", fs.constants.W_OK);
console.log("  COPYFILE_EXCL:", fs.constants.COPYFILE_EXCL);



/**
 * Example with REAL DATA: Log file banate hain jo har user action record kare
 * 
 * const fs2 = require("fs/promises");
 * const path = require("path");
 * 
 * async function logUserAction(userId, action) {
 *   const logDir = path.join(__dirname, "logs");
 *   const logFile = path.join(logDir, "user-actions.log");
 *   
 *   try {
 *     // Check if logs directory exists, create if not
 *     try {
 *       await fs2.access(logDir);
 *     } catch {
 *       await fs2.mkdir(logDir, { recursive: true });
 *     }
 *     
 *     // Append log entry
 *     const timestamp = new Date().toISOString();
 *     const logEntry = `[${timestamp}] User ${userId}: ${action}\n`;
 *     await fs2.appendFile(logFile, logEntry);
 *     
 *     console.log("Log entry saved");
 *   } catch (err) {
 *     console.error("Logging failed:", err.message);
 *   }
 * }
 * 
 * // Use karo
 * await logUserAction(123, "Logged in");
 * await logUserAction(123, "Viewed dashboard");
*/


/**
 * BEST PRACTICES (Recommended)
 * 1. Always use fs/promises with async/await (callback/sync mat use karo)
 * 2. Always wrap file operations in try/catch
 * 3. Use path.join() instead of manual string concatenation
 * 4. Check if directory exists before writing files
 * 5. Use { recursive: true } with mkdir to avoid errors
 * 6. For deleting folders, use rm() not rmdir()
 * 7. Never use sync methods in web servers
 * 8. Use constants like F_OK, R_OK for readability
 */