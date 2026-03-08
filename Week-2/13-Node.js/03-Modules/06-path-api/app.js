/**
 * NODE.JS PATH MODULE — cross-platform file path utilities
*/

/**
 * 1. What is path Module?
 *    ────────────────────────
 *    > Node ka built-in module jo file paths ko build aur parse karne 
 *      ke liye hai, aur ye cross-platform kaam karta hai. 
 *    > Kabhi hardcode slashes mat use karo — 
 *      - Windows backslashes use karta hai, 
 *      - Linux/macOS forward slashes. 
 *    > path module dono ko handle kar leta hai.
 *
 *      const path = require("path");
*/

/**
 * KEY CONCEPTS AUR KEYWORDS
 *
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ 1. path.join() — parts se path banao                              │
 * ├───────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Parts ko join karta hai correct OS separator ke saath,   │
 * │          aur . aur .. ko automatically normalize kar deta hai.    │
 * │          Relative path return karta hai unless first segment      │
 * │          absolute ho.                                             │
 * │                                                                   │
 * │ Sabse common use: __dirname + relative segments = safe path.      │
 * │                                                                   │
 * │ Code template:                                                    │
 * │   path.join("/user", "test", "file.txt")                          │
 * │   // "/user/test/file.txt"  (Linux/macOS)                         │
 * │   // "\user\test\file.txt" (Windows)                              │
 * │                                                                   │
 * │   path.join(__dirname, "data", "users.json") // hamesha correct   │
 * │   path.join("/user", "test", "..", "file.txt") // "/user/file.txt"│
 * └───────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. path.resolve() — absolute path banao                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Segments ko right-to-left resolve karta hai jab tak    │
 * │          absolute path na ban jaye. Agar koi segment absolute   │
 * │          nahi hai to cwd() prepend kar deta hai.                │
 * │                                                                 │
 * │   join  → sirf combine karta hai (relative reh sakta hai)       │
 * │   resolve → hamesha absolute path return karta hai              │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   path.resolve("data", "file.txt")                              │
 * │   // "/current/working/dir/data/file.txt"                       │
 * │                                                                 │
 * │   path.resolve("/etc", "config.json")                           │
 * │   // "/etc/config.json"  (absolute segment resolve ruk jata hai)│
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. path.basename() + path.dirname() + path.extname()            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ basename(p[, ext]) → path ka last segment (filename)            │
 * │   Optional ext argument extension ko result se hata deta hai.   │
 * │                                                                 │
 * │ dirname(p) → last segment ke pehle ka sab kuch (folder)         │
 * │                                                                 │
 * │ extname(p) → extension including dot, ya "" agar extension nahi │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   path.basename("/user/test/file.txt")        // "file.txt"     │
 * │   path.basename("/user/test/file.txt", ".txt")// "file"         │
 * │   path.dirname("/user/test/file.txt")         // "/user/test"   │
 * │   path.extname("/user/test/file.pdf")         // ".pdf"         │
 * │   path.extname("README")                      // ""             │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. path.parse() + path.format()                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ parse(p) → path ko parts mein tod kar object banata hai:        │
 * │   { root, dir, base, name, ext }                                │
 * │                                                                 │
 * │ format(obj) → parse ka opposite — object se path rebuild karta  │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const p = path.parse("/users/text/file.txt");                 │
 * │   // { root: "/", dir: "/users/text",                           │
 * │   //   base: "file.txt", name: "file", ext: ".txt" }            │
 * │   p.dir   // "/users/text"                                      │
 * │   p.name  // "file"                                             │
 * │   p.ext   // ".txt"                                             │
 * │                                                                 │
 * │   path.format({ dir: "/users/text", name: "file", ext: ".txt" })│
 * │   // "/users/text/file.txt"                                     │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────┐
 * │ 5. path.isAbsolute() + path.normalize()                          │
 * ├──────────────────────────────────────────────────────────────────┤
 * │ isAbsolute(p) → true agar path root se start ho                  │
 * │   "/user/test"  → true                                           │
 * │   "user/test"   → false                                          │
 * │   "C:\Users\" → true (Windows)                                   │
 * │                                                                  │
 * │ normalize(p) → messy path ko clean karta hai:                    │
 * │   extra slashes hata deta hai, . aur .. resolve kar deta hai     │
 * │   path.normalize("/users//test/../file.txt")                     │
 * │   // "/users/file.txt"                                           │
 * │                                                                  │
 * │ Security note: user-supplied paths ko hamesha normalize karo     │
 * │ aur verify karo ki result expected directory ke andar hai ya nahi│
 * └──────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. path.relative()                                              │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Ek location se doosri location tak relative path       │
 * │          return karta hai. Import paths ya symlinks generate    │
 * │          karne mein useful.                                     │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   path.relative("/home/user/app", "/home/user/app/data/f.txt")  │
 * │   // "data/f.txt"                                               │
 * │                                                                 │
 * │   path.relative("/home/user/a", "/home/user/b/file.txt")        │
 * │   // "../b/file.txt"                                            │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. path.sep — platform-specific path separator                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Windows par "\", Linux/macOS par "/".                  │
 * │          Kabhi hardcode mat karo, path.join use karo ya sep use │
 * │          karo agar custom logic likhna ho.                      │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const parts = ["user", "test", "file.txt"];                   │
 * │   const pathStr = parts.join(path.sep);                         │
 * │   // Windows: "user\test\file.txt"                              │
 * │   // Linux:   "user/test/file.txt"                              │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 8. path.delimiter — PATH environment variable separator         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: Windows par ";", Linux/macOS par ":".                  │
 * │          Process environment paths manipulate karne mein useful │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   const oldPath = process.env.PATH;                             │
 * │   const newPath = "/my/bin" + path.delimiter + oldPath;         │
 * │   process.env.PATH = newPath;                                   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 9. path.win32 vs path.posix — platform-specific variants        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Kya hai: path module ke platform-specific versions.             │
 * │          Agar explicitly Windows style chahiye Linux par bhi,   │
 * │          to path.win32 use karo.                                │
 * │                                                                 │
 * │ Code template:                                                  │
 * │   path.win32.join("user", "test") // "user\test" (hamesha)      │
 * │   path.posix.join("user", "test") // "user/test" (hamesha)      │
 * └─────────────────────────────────────────────────────────────────┘
*/

/**
 * COMMON MISTAKES:
 * 1. Hardcoding slashes — Windows par break ho jayega
 *    const p = __dirname + "/data/file.json";           // ❌ WRONG
 *    const p = path.join(__dirname, "data", "file.json"); // ✅ RIGHT
 *
 * 2. join aur resolve mein confusion
 *    path.join("data", "file.txt")    // "data/file.txt"  (relative)
 *    path.resolve("data", "file.txt") // "/cwd/data/file.txt" (absolute)
 *
 * 3. User input se path traversal — security risk
 *    const userFile = path.normalize(userInput);
 *    if (!userFile.startsWith(baseDir)) throw new Error("Invalid path");
 *
 * 4. Extension nikalte waqt dot bhoolna
 *    path.extname("file.txt") // ".txt" (dot ke saath)
*/

/**
 * PRACTICAL PATTERNS:
 *   // Config file path
 *   const configPath = path.join(__dirname, "config", "app.json");
 *
 *   // Get filename without extension
 *   const filename = path.basename(filePath, path.extname(filePath));
 *
 *   // Ensure upload path is safe
 *   const safePath = path.normalize(uploadPath);
 *   if (!safePath.startsWith(path.resolve(UPLOAD_DIR))) {
 *     throw new Error("Path traversal detected");
 *   }
 *
 *   // Change file extension
 *   const parsed = path.parse(oldPath);
 *   const newPath = path.format({
 *     ...parsed,
 *     ext: ".md",
 *     base: undefined // base override hoga
 *   });
 *
 *   // Get all files in directory with full paths
 *   const files = await fs2.readdir(dir);
 *   const fullPaths = files.map(f => path.join(dir, f));
*/


const path = require("path");
const fs2 = require("fs/promises");


/* 1. Basic path info */
console.log("__dirname:       ", __dirname);
console.log("__filename:      ", __filename);
console.log("Current working dir:", process.cwd());
console.log("Path separator:  ", JSON.stringify(path.sep));
console.log("Path delimiter:  ", JSON.stringify(path.delimiter));


/* 2. path.join() examples */
console.log("path.join('user', 'test', 'file.txt'):");
console.log("  ", path.join("user", "test", "file.txt"));

console.log("\npath.join('/user', 'test', '..', 'file.txt'):");
console.log("  ", path.join("/user", "test", "..", "file.txt"));

console.log("\npath.join(__dirname, 'data', 'users.json'):");
console.log("  ", path.join(__dirname, "data", "users.json"));


/* 3. path.resolve() examples */
console.log("path.resolve('data', 'file.txt'):");
console.log("  ", path.resolve("data", "file.txt"));

console.log("\npath.resolve('/etc', 'config.json'):");
console.log("  ", path.resolve("/etc", "config.json"));

console.log("\npath.resolve('user', 'test', '..', 'file.txt'):");
console.log("  ", path.resolve("user", "test", "..", "file.txt"));


/* 4. join vs resolve comparison */
console.log("path.join('data', 'file.txt'):     ", path.join("data", "file.txt"));
console.log("path.resolve('data', 'file.txt'):  ", path.resolve("data", "file.txt"));
console.log("\npath.join('/data', 'file.txt'):   ", path.join("/data", "file.txt"));
console.log("path.resolve('/data', 'file.txt'): ", path.resolve("/data", "file.txt"));


/* 5. basename, dirname, extname examples */
const testPath = "/users/text/file.txt";
console.log("Test path:", testPath);
console.log("path.basename():               ", path.basename(testPath));
console.log("path.basename(, '.txt'):       ", path.basename(testPath, ".txt"));
console.log("path.dirname():                 ", path.dirname(testPath));
console.log("path.extname():                 ", path.extname(testPath));
console.log("path.extname('README'):         ", path.extname("README"));
console.log("path.extname('archive.tar.gz'): ", path.extname("archive.tar.gz"));


/* 6. path.parse() and path.format() examples */
const parsed = path.parse("/users/text/file.txt");
console.log("path.parse('/users/text/file.txt'):");
console.log("  root:", parsed.root);
console.log("  dir: ", parsed.dir);
console.log("  base:", parsed.base);
console.log("  name:", parsed.name);
console.log("  ext: ", parsed.ext);

const formatted = path.format({
  dir: "/users/text",
  name: "file",
  ext: ".txt"
});
console.log("\npath.format({ dir, name, ext }):");
console.log("  ", formatted);


/* 7. isAbsolute and normalize examples */
console.log("path.isAbsolute('/user/test'):  ", path.isAbsolute("/user/test"));
console.log("path.isAbsolute('user/test'):   ", path.isAbsolute("user/test"));
console.log("path.isAbsolute('C:\\Users'):   ", path.isAbsolute("C:\\Users"));
console.log("path.isAbsolute('\\\\server\\share'):", path.isAbsolute("\\\\server\\share"));

const messyPath = "/users//test/../file.txt";
console.log("\nMessy path:         ", messyPath);
console.log("path.normalize():   ", path.normalize(messyPath));


/* 8. path.relative() examples */
const from1 = "/home/user/app";
const to1 = "/home/user/app/data/f.txt";
console.log(`path.relative('${from1}', '${to1}'):`);
console.log("  ", path.relative(from1, to1));

const from2 = "/home/user/a";
const to2 = "/home/user/b/file.txt";
console.log(`\npath.relative('${from2}', '${to2}'):`);
console.log("  ", path.relative(from2, to2));


/* 9. path.sep and path.delimiter examples */
console.log("path.sep:       ", JSON.stringify(path.sep));
console.log("path.delimiter: ", JSON.stringify(path.delimiter));

const parts = ["user", "test", "file.txt"];
const joinedWithSep = parts.join(path.sep);
console.log("\nparts.join(path.sep):", joinedWithSep);


/* 10. win32 vs posix examples */
console.log("path.win32.join('user', 'test'):", path.win32.join("user", "test"));
console.log("path.posix.join('user', 'test'):", path.posix.join("user", "test"));


/* 11. Practical Example 1: Safe filename extraction */
const unsafeFilenames = [
  "../../../etc/passwd",
  "..\\..\\Windows\\System32\\config",
  "valid-file.txt",
  "images/../../secret.txt"
];

console.log("Unsafe inputs -> safe basename:");
unsafeFilenames.forEach(f => {
  const safe = path.basename(f);
  console.log(`  "${f}" → "${safe}"`);
});


/* 12. Practical Example 2: Change file extension */
function changeExtension(filePath, newExt) {
  const parsed = path.parse(filePath);
  // Ensure newExt starts with dot
  const ext = newExt.startsWith(".") ? newExt : "." + newExt;
  return path.format({
    ...parsed,
    ext: ext,
    base: undefined // Will be regenerated from name + ext
  });
}

const originalFile = "/docs/report.txt";
console.log("Original:", originalFile);
console.log("To .pdf: ", changeExtension(originalFile, ".pdf"));
console.log("To .md:  ", changeExtension(originalFile, "md"));


/* 13. Practical Example 3: Path traversal detection */
const BASE_DIR = path.resolve(__dirname, "uploads");

function isPathSafe(userPath) {
  const resolvedPath = path.resolve(BASE_DIR, userPath);
  return resolvedPath.startsWith(BASE_DIR);
}

const testPaths = [
  "file.txt",
  "../file.txt",
  "../../../etc/passwd",
  "subdir/../../file.txt",
  "valid/file.txt"
];

console.log(`Base directory: ${BASE_DIR}\n`);
testPaths.forEach(p => {
  const safe = isPathSafe(p);
  console.log(`  "${p}" → ${safe ? "✅ SAFE" : "❌ UNSAFE"}`);
});


/* 14. Practical Example 4: Get file info object */
function getFileInfo(filePath) {
  const parsed = path.parse(filePath);
  return {
    fullPath: filePath,
    directory: parsed.dir,
    filename: parsed.base,
    name: parsed.name,
    extension: parsed.ext,
    isAbsolute: path.isAbsolute(filePath),
    parentDir: path.dirname(filePath),
  };
}

const samplePath = "/home/user/projects/app/src/index.js";
console.log("Sample path:", samplePath);
console.log("File info:", JSON.stringify(getFileInfo(samplePath), null, 2));


/* 15. Practical Example 5: Build multiple file paths */
const baseDir = path.join(__dirname, "project");
const folders = ["src", "test", "docs"];
const files = {
  src: ["index.js", "app.js", "utils.js"],
  test: ["test.js", "setup.js"],
  docs: ["README.md", "API.md"]
};

folders.forEach(folder => {
  console.log(`\n${folder}/:`);
  if (files[folder]) {
    files[folder].forEach(file => {
      const fullPath = path.join(baseDir, folder, file);
      console.log(`  ${fullPath}`);
    });
  }
});


/* 16. Practical Example 6: Find common directory */
function findCommonDir(paths) {
  if (paths.length === 0) return "";
  
  const dirs = paths.map(p => path.dirname(p));
  let commonDir = dirs[0];
  
  for (let i = 1; i < dirs.length; i++) {
    while (!dirs[i].startsWith(commonDir)) {
      commonDir = path.dirname(commonDir);
      if (commonDir === "." || commonDir === "/") break;
    }
  }
  return commonDir;
}

const testPaths2 = [
  "/home/user/projects/app/src/index.js",
  "/home/user/projects/app/src/utils.js",
  "/home/user/projects/app/test/test.js",
  "/home/user/projects/app/README.md"
];

console.log("Paths:");
testPaths2.forEach(p => console.log(`  ${p}`));
console.log("\nCommon directory:", findCommonDir(testPaths2));



/**
 * EXAMPLE WITH REAL DATA: File upload system with security checks
 * 
 * const path = require("path");
 * const fs2 = require("fs/promises");
 * 
 * const UPLOAD_DIR = path.join(__dirname, "uploads");
 * 
 * async function saveUploadedFile(filename, data) {
 *   // 1. Normalize and validate filename
 *   const safeFilename = path.basename(filename); // Remove any path traversal
 *   const filePath = path.join(UPLOAD_DIR, safeFilename);
 *   
 *   // 2. Ensure file is inside upload directory
 *   const resolvedPath = path.resolve(filePath);
 *   if (!resolvedPath.startsWith(path.resolve(UPLOAD_DIR))) {
 *     throw new Error("Invalid file path");
 *   }
 *   
 *   // 3. Create directory if needed
 *   await fs2.mkdir(UPLOAD_DIR, { recursive: true });
 *   
 *   // 4. Write file
 *   await fs2.writeFile(resolvedPath, data);
 *   
 *   // 5. Return file info
 *   const parsed = path.parse(resolvedPath);
 *   return {
 *     path: resolvedPath,
 *     filename: parsed.base,
 *     extension: parsed.ext,
 *     size: data.length,
 *   };
 * }
*/
