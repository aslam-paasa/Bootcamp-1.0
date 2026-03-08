/**
 * Secure File Transfer:
 * > Securely transferring files between a local machine (client) and 
 *   a remote server or vice-versa can be done using SCP 
 *   (Secure Copy Protocol) or Rsync.
*/

/**
 * > SCP is a simple and secure way to transfer files between systems 
 *   over SSH. However, it does not support resuming interrupted 
 *   transfers and lacks efficient synchronization.
 * 
 * 1. Copy Files from Client to Server (Using Custom Port 2222 & Private Key)
 *    - scp -P 2222 -i /path/to/private-key /path/to/localfile savi@remote-ip:/path/to/destination/
 * 
 * 2. Copy Files from Server to Client
 *    - scp -P 2222 -i /path/to/private-key savi@remote-ip:/path/to/remotefile/path/to/local/destination/
 * 
 * 3. Copy an Entire Directory from Client to Server
 *    - scp -P 2222 -i /path/to/private-key -r /path/to/localdir savi@remote-ip:/path/to/destination/
 * 
 * 4. Copy an Entire Directory from Server to Client
 *    - scp -P 2222 -i /path/to/private-key -r savi@remote-ip:/path/to/remotedir /path/to/local/destination/
*/

/**
 * Rsync is more advanced than SCP because it:
 * - Supports resuming interrupted transfers
 * - Only transfers changed data (efficient synchronization)
 * - Compresses data during transfer (faster speeds)
 * - Preserves file permissions, timestamps, and symbolic links
 * 
 * 1. Copy Files from Client to Server (Using Custom Port 2222 & Private Key)
 *    - rsync -avz -e "ssh -i /path/to/private-key -p 2222" /path/to/localfile savi@remote-ip:/path/to/destination/
 * 
 * 2. Copy Files from Server to Client
 *    - rsync -avz -e "ssh -i /path/to/private-key -p 2222" savi@remote-ip:/path/to/remotefile /path/to/local/destination/
 * 
 * 3. Copy an Entire Directory from Client to Server
 *    - rsync -avz -e "ssh -i /path/to/private-key -p 2222" /path/to/localdir/savi@remote-ip:/path/to/destination/
 * 
 * 4. Copy an Entire Directory from Server to Client
 *    - rsync -avz -e "ssh -i /path/to/private-key -p 2222" savi@remote-ip:/path/to/remotedir/ /path/to/local/destination/
*/

/**
 * Advantages of Rsync over SCP:
 * a. Resumes Transfers: 
 *    - Rsync can resume interrupted transfers (`--partial`), while SCP
 *      cannot.
 * 
 * b. Efficient Data Sync: 
 *    - Rsync transfers only changed parts of files, whereas SCP always
 *      re-copies the entire file.
 * 
 * c. Compression: 
 *    - Rsync supports compression (`-z`), making transfers faster; SCP
 *      does not.
 * 
 * d. Preserves File Attributes: 
 *    - Rsync keeps timestamps, permissions, and ownership (`-a`), but SCP
 *      has limited support.
 * 
 * e. Bandwidth Efficiency: 
 *    - Rsync uses less bandwidth by copying only changes, while SCP transfers
 *      everything.
 * 
 * f. Recursive Directory Copy: 
 *    - Both support it, but Rsync (`-a`) ensures better synchronization.
 */

/**
 * When to use SCP vs Rsync?
 * > Use SCP for quick, one-time transfers (small files).
 * > Use Rsync for large file transfers and synchronization 
 *   (efficient and resumable).
*/






/**
 * =====================================================================
 * THE MAGICAL COURIER SERVICE: A STORY OF SECURE FILE TRANSFER
 * =====================================================================
 * 
 * CHAPTER 1: MEET THE TWO COURIERS
 * =====================================================================
 * 
 * Imagine you have important packages (files) that need to be sent
 * between your home (local machine) and a faraway castle (remote server).
 * You have two magical couriers to choose from:
 * 
 * 📦 COURIER 1: SCP (Secure Copy Protocol) - The Simple Messenger
 *    - Fast and straightforward
 *    - Like a bike messenger who picks up and delivers packages
 *    - But if he drops a package, he starts over from the beginning!
 * 
 * 📦 COURIER 2: RSYNC - The Smart Synchronizer
 *    - More intelligent and efficient
 *    - Like a courier with a photographic memory
 *    - Remembers what he's already delivered
 *    - Only carries what's changed or missing
 * 
 * 
 * CHAPTER 2: SCP - THE SIMPLE MESSENGER
 * =====================================================================
 * 
 * SCP is like having a trusted courier who uses the secure SSH tunnel
 * (which we learned about in the previous story) to carry your files.
 * 
 * HOW SCP WORKS:
 * ---------------------------------------------------------------------
 * 1. You hand your package to SCP
 * 2. SCP hops into the SSH tunnel (our secure passage)
 * 3. Travels to the destination
 * 4. Delivers the package
 * 
 * Simple, right? But there's a catch...
 * 
 * THE PROBLEM WITH SCP:
 * ---------------------------------------------------------------------
 * Imagine you're sending a HUGE package - like 1000-page book.
 * The courier starts climbing the mountain path (internet).
 * Halfway up, he trips and drops everything!
 * 
 * SCP's reaction: "Oh no! Let me go back and start ALL OVER AGAIN!"
 * 
 * Even if you were 99% done, SCP starts from page 1 again. Frustrating!
 * 
 * 
 * SCP COMMANDS - THE BASICS:
 * ---------------------------------------------------------------------
 * 
 * 1. SENDING A FILE TO THE SERVER (Client → Server)
 * ---------------------------------------------------------------------
 * # Basic command structure:
 * scp [options] [source] [destination]
 * 
 * # Real example with our secure setup:
 * scp -P 2222 -i ~/.ssh/id_ed25519 report.pdf savi@192.168.1.100:/home/savi/documents/
 *  │    │      │                     │           │    │              │
 *  │    │      │                     │           │    │              └── Destination path
 *  │    │      │                     │           │    └── Server username
 *  │    │      │                     │           └── Server address
 *  │    │      │                     └── File to send
 *  │    │      └── Private key file
 *  │    └── Port number (capital P for SCP!)
 *  └── SCP command
 * 
 * 
 * 2. GETTING A FILE FROM THE SERVER (Server → Client)
 * ---------------------------------------------------------------------
 * scp -P 2222 -i ~/.ssh/id_ed25519 savi@192.168.1.100:/home/savi/data.csv ./downloads/
 *  │    │      │                     │    │              │             │
 *  │    │      │                     │    │              │             └── Local destination
 *  │    │      │                     │    │              └── Remote file path
 *  │    │      │                     │    └── Server username
 *  │    │      │                     └── Server address
 *  │    │      └── Private key
 *  │    └── Port
 *  └── Notice: remote path comes FIRST when downloading!
 * 
 * 
 * 3. SENDING AN ENTIRE FOLDER (Recursive copy)
 * ---------------------------------------------------------------------
 * scp -P 2222 -i ~/.ssh/id_ed25519 -r ./project/ savi@192.168.1.100:/home/savi/
 *  │    │      │                    │  │          │
 *  │    │      │                    │  │          └── Destination
 *  │    │      │                    │  └── Local folder to send
 *  │    │      │                    └── -r means "recursive" (copy folders)
 *  │    │      └── Private key
 *  │    └── Port
 *  └── SCP command
 * 
 * 
 * 4. GETTING AN ENTIRE FOLDER FROM SERVER
 * ---------------------------------------------------------------------
 * scp -P 2222 -i ~/.ssh/id_ed25519 -r savi@192.168.1.100:/home/savi/backups/ ./restore/
 * 
 * 
 * CHAPTER 3: RSYNC - THE SMART COURIER
 * =====================================================================
 * 
 * Now meet Rsync - SCP's smarter, more efficient cousin. Rsync is like
 * a courier who:
 * - Has a perfect memory of what he's already delivered
 * - Only carries things that have changed
 * - Can compress packages to make them smaller
 * - Remembers exactly where each file belongs
 * 
 * HOW RSYNC WORKS:
 * ---------------------------------------------------------------------
 * When Rsync transfers a file, it does something clever:
 * 
 * 1. First, it looks at the destination
 * 2. It asks: "What files are already there? What parts are different?"
 * 3. Then it thinks: "Aha! This file is 90% the same. I'll only send the 10% that changed!"
 * 4. It sends ONLY the differences
 * 5. At the destination, it reconstructs the complete file
 * 
 * It's like updating a book - instead of sending the whole book again,
 * you just send the pages that were revised!
 * 
 * 
 * THE MAGIC RSYNC OPTIONS:
 * ---------------------------------------------------------------------
 * 
 * -a, --archive  : Archive mode (preserves everything - permissions, timestamps, etc.)
 *                  Like telling the courier: "Keep everything exactly as it was!"
 * 
 * -v, --verbose  : Verbose (shows what's happening)
 *                  Like the courier narrating his journey
 * 
 * -z, --compress : Compress during transfer
 *                  Like vacuum-packing clothes to fit more in a suitcase
 * 
 * -e, --rsh      : Specify the remote shell (SSH with options)
 *                  Like telling the courier which secret tunnel to use
 * 
 * --progress     : Show progress
 *                  Like a tracking number for your package
 * 
 * --partial      : Keep partial transfers
 *                  If interrupted, don't delete what was already sent!
 * 
 * 
 * RSYNC COMMANDS - THE BASICS:
 * ---------------------------------------------------------------------
 * 
 * 1. SENDING A FILE TO THE SERVER
 * ---------------------------------------------------------------------
 * rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -p 2222" report.pdf savi@192.168.1.100:/home/savi/
 *  │     │    │   │                                       │           │    │              │
 *  │     │    │   │                                       │           │    │              └── Destination
 *  │     │    │   │                                       │           │    └── Username@server
 *  │     │    │   │                                       │           └── File to send
 *  │     │    │   │                                       └── SSH options (key and port)
 *  │     │    │   └── -e specifies remote shell command
 *  │     │    └── -z compress during transfer
 *  │     └── -v verbose (show details)
 *  └── -a archive mode (preserve everything)
 * 
 * 
 * 2. GETTING A FILE FROM THE SERVER
 * ---------------------------------------------------------------------
 * rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -p 2222" savi@192.168.1.100:/home/savi/data.csv ./downloads/
 * 
 * 
 * 3. SENDING AN ENTIRE FOLDER (with all the magic)
 * ---------------------------------------------------------------------
 * rsync -avz --progress -e "ssh -i ~/.ssh/id_ed25519 -p 2222" ./project/ savi@192.168.1.100:/home/savi/
 *  │     │   │    │          │                                  │          │
 *  │     │   │    │          │                                  │          └── Note the slash!
 *  │     │   │    │          │                                  └── Source folder
 *  │     │   │    │          └── SSH options
 *  │     │   │    └── Show progress
 *  │     │   └── Compress
 *  │     └── Verbose
 *  └── Archive mode
 * 
 * ⚠️ IMPORTANT SLASH TRICK:
 *    rsync -av ./project/ server:/dest/  → Copies CONTENTS of project
 *    rsync -av ./project  server:/dest/  → Copies project FOLDER itself
 * 
 * 
 * 4. RESUME AN INTERRUPTED TRANSFER
 * ---------------------------------------------------------------------
 * rsync -avz --partial --progress -e "ssh -i ~/.ssh/id_ed25519 -p 2222" bigfile.iso savi@server:/home/savi/
 *                 │          │
 *                 │          └── Show progress
 *                 └── Keep partial files if interrupted
 * 
 * This is MAGIC - if the transfer stops at 45%, next time it continues from 45%!
 * 
 * 
 * CHAPTER 4: SCP vs RSYNC - THE SHOWDOWN
 * =====================================================================
 * 
 * Let's see these two couriers in action with real scenarios:
 * 
 * SCENARIO 1: FIRST TIME BACKUP (100GB of data)
 * ---------------------------------------------------------------------
 * 
 * SCP: "Okay, I'll carry all 100GB. One trip, done." (Works fine)
 * 
 * RSYNC: "Let me check what's there... Nothing yet. I'll carry all 100GB." (Similar)
 * 
 * Result: Both similar for first backup
 * 
 * SCENARIO 2: DAILY BACKUP (Only 50MB changed)
 * ---------------------------------------------------------------------
 * 
 * SCP: "Time for backup! Let me carry all 100GB again!"
 *      (Even though only 50MB changed)
 * 
 * RSYNC: "Let me compare... Aha! Only 50MB changed. I'll just carry those."
 * 
 * Winner: RSYNC (saves 99.95% bandwidth!)
 * 
 * SCENARIO 3: INTERRUPTED TRANSFER (Power outage at 90%)
 * ---------------------------------------------------------------------
 * 
 * SCP: "Oh no! I was at 90% but lost everything. Starting over from 0%..."
 * 
 * RSYNC: "I saved what I had (--partial). Let me check... We have 90%, 
 *         need the last 10%. Continuing from 90%!"
 * 
 * Winner: RSYNC (saves hours of time!)
 * 
 * 
 * THE COMPARISON TABLE:
 * ---------------------------------------------------------------------
 * FEATURE                 SCP                    RSYNC
 * ------------------      ------------------     ------------------
 * Resume interrupted      ❌ No                   ✅ Yes (--partial)
 * transfers
 * 
 * Only send changes       ❌ No (sends all)       ✅ Yes (delta transfer)
 * 
 * Compression             ❌ No                   ✅ Yes (-z)
 * 
 * Preserve permissions    ❌ Limited              ✅ Yes (-a)
 * timestamps
 * 
 * Show progress           ❌ Basic                ✅ Detailed (--progress)
 * 
 * Delete extra files      ❌ No                   ✅ Yes (--delete)
 * at destination
 * 
 * Bandwidth usage         ❌ High                  ✅ Low
 * 
 * Speed for first         ✅ Fast                  ✅ Fast
 * transfer
 * 
 * Speed for updates       ❌ Slow                  ✅ Fast
 * 
 * 
 * CHAPTER 5: ADVANCED RSYNC MAGIC
 * =====================================================================
 * 
 * SPELL 1: SYNCHRONIZE TWO FOLDERS (Make them identical)
 * ---------------------------------------------------------------------
 * rsync -avz --delete -e "ssh -i ~/.ssh/key -p 2222" ./local/ server:/remote/
 *              │
 *              └── --delete removes files at destination that don't exist at source
 * 
 * This makes the remote folder an EXACT mirror of local folder.
 * If you deleted a file locally, it gets deleted remotely too!
 * 
 * SPELL 2: EXCLUDE CERTAIN FILES (Don't send everything)
 * ---------------------------------------------------------------------
 * rsync -avz --exclude="*.tmp" --exclude="node_modules/" -e "ssh..." ./project/ server:/project/
 *              │                 │
 *              │                 └── Exclude node_modules folder
 *              └── Exclude all .tmp files
 * 
 * SPELL 3: LIMIT BANDWIDTH (Be nice to other network users)
 * ---------------------------------------------------------------------
 * rsync -avz --bwlimit=1000 -e "ssh..." bigfile.iso server:/
 *              │
 *              └── Limit to 1000 KB/sec (1 MB/sec)
 * 
 * SPELL 4: DRY RUN (Test before actually doing it)
 * ---------------------------------------------------------------------
 * rsync -avz --dry-run -e "ssh..." ./project/ server:/
 *              │
 *              └── Show what WOULD happen, but don't actually do it
 * 
 * 
 * CHAPTER 6: REAL-LIFE STORIES
 * =====================================================================
 * 
 * STORY 1: "The Website Deployment"
 * ---------------------------------------------------------------------
 * Situation: Maria updates her website files constantly
 * 
 * Old way with SCP:
 * scp -r -P 2222 ./new-website/ server:/var/www/
 * # Uploads EVERY file every time (10 minutes each time!)
 * 
 * New way with RSYNC:
 * rsync -avz --delete -e "ssh -i ~/.ssh/key -p 2222" ./new-website/ server:/var/www/
 * # First time: 10 minutes
 * # Next times: 30 seconds (only changed files!)
 * 
 * STORY 2: "The Broken Download"
 * ---------------------------------------------------------------------
 * Situation: Tom is downloading a 50GB database backup. His internet dies at 95%.
 * 
 * With SCP:
 * # Start over. Download 50GB again. Internet dies again at 80%. Crying ensues.
 * 
 * With RSYNC:
 * rsync -avz --partial --progress -e "ssh..." server:backup.sql ./
 * # Internet dies at 95%
 * # Run same command again: "Resuming from 95%... Done in 5 minutes!"
 * 
 * STORY 3: "The Server Migration"
 * ---------------------------------------------------------------------
 * Situation: Company moving all data to new server (2TB of data)
 * 
 * SCP approach: 
 * - Take servers offline
 * - Copy for 3 days straight
 * - If interrupted, start over
 * - Company loses 3 days of work
 * 
 * RSYNC approach:
 * - Keep servers running
 * - First sync: 2 days (copies everything while old server still works)
 * - Day before migration: Quick sync (only changes - 1 hour)
 * - Migration day: Final sync (15 minutes)
 * - Minimal downtime!
 * 
 * 
 * CHAPTER 7: WHEN TO USE WHICH
 * =====================================================================
 * 
 * USE SCP WHEN:
 * ---------------------------------------------------------------------
 * ✓ Quick, one-time transfers
 * ✓ Small files (under 100MB)
 * ✓ You're in a hurry and just need it done
 * ✓ The file will never need to be transferred again
 * 
 * Examples:
 * - Send a single config file to a server
 * - Download a small log file
 * - Quick backup of a few documents
 * 
 * USE RSYNC WHEN:
 * ---------------------------------------------------------------------
 * ✓ Regular backups (daily/weekly)
 * ✓ Large files (especially if internet is unstable)
 * ✓ Synchronizing folders between computers
 * ✓ When bandwidth is limited or expensive
 * ✓ Moving lots of data (server migrations)
 * ✓ Any transfer that might get interrupted
 * 
 * Examples:
 * - Daily website backups
 * - Syncing code between development and production
 * - Migrating to a new server
 * - Keeping two folders identical across computers
 * 
 * 
 * CHAPTER 8: QUICK REFERENCE CARD
 * =====================================================================
 * 
 * SCP COMMANDS:
 * ---------------------------------------------------------------------
 * # Upload file
 * scp -P 2222 -i key file.txt user@server:/path/
 * 
 * # Download file
 * scp -P 2222 -i key user@server:/path/file.txt ./
 * 
 * # Upload folder
 * scp -P 2222 -i key -r folder/ user@server:/path/
 * 
 * # Download folder
 * scp -P 2222 -i key -r user@server:/path/folder/ ./
 * 
 * RSYNC COMMANDS:
 * ---------------------------------------------------------------------
 * # Basic upload
 * rsync -avz -e "ssh -i key -p 2222" file.txt user@server:/path/
 * 
 * # Basic download
 * rsync -avz -e "ssh -i key -p 2222" user@server:/path/file.txt ./
 * 
 * # Sync folder (with resume)
 * rsync -avz --partial --progress -e "ssh -i key -p 2222" folder/ user@server:/path/
 * 
 * # Exact mirror (delete extras)
 * rsync -avz --delete -e "ssh -i key -p 2222" folder/ user@server:/path/
 * 
 * # Dry run (test first)
 * rsync -avz --dry-run -e "ssh -i key -p 2222" folder/ user@server:/path/
 * 
 * COMMON RSYNC OPTIONS:
 * ---------------------------------------------------------------------
 * -a  : Archive (preserve everything)
 * -v  : Verbose (show details)
 * -z  : Compress (save bandwidth)
 * --progress : Show progress
 * --partial : Keep partial transfers
 * --delete : Remove extra files at destination
 * --exclude="pattern" : Skip certain files
 * --bwlimit=KBPS : Limit bandwidth
 * --dry-run : Test without actually copying
 * 
 * 
 * THE GOLDEN RULES OF FILE TRANSFER:
 * =====================================================================
 * 1. For one-time small transfers → SCP (simple and fast)
 * 2. For regular backups → RSYNC (efficient and smart)
 * 3. For unstable connections → RSYNC with --partial
 * 4. For huge transfers → RSYNC with --progress (so you don't go crazy)
 * 5. Always test with --dry-run first if you're unsure
 * 6. Remember the slash trick with rsync!
 * 7. When in doubt, use rsync -avz --progress
 * 
 * AND REMEMBER: Both SCP and Rsync are like trusted couriers using
 * the secure SSH tunnel. They'll keep your files safe, but Rsync
 * is the smarter one who learns from experience!
 * =====================================================================
 */












/**
 * ======================================================================
 * SECURE FILE TRANSFER — SCP vs RSYNC Complete Guide (HINGLISH VERSION)
 * ======================================================================
 * 
 * Secure File Transfer matlab files ko safely bhejna local machine aur
 * remote server ke beech mein, koi beech mein nahi dekh sakta, nahi badal sakta.
 * 
 * DO MAIN TOOLS HAIN:
 *   1. SCP  (Secure Copy Protocol) — Simple messenger
 *   2. RSYNC (Remote Sync) — Smart synchronizer
 * 
 * ======================================================================
 * 📦 SCP — THE SIMPLE MESSENGER
 * ======================================================================
 * 
 * SCP ek simple aur secure tarika hai files transfer karne ka SSH ke upar.
 * 
 * 🔧 BASIC SCP COMMANDS:
 * ---------------------------------------------------------------------
 */

/**
 * 1. COPY FILE FROM CLIENT TO SERVER (Upload)
 * --------------------------------------------
 *    scp -P 2222 -i ~/.ssh/id_ed25519 file.txt savi@192.168.1.100:/home/savi/
 *     │    │      │                     │       │    │              │
 *     │    │      │                     │       │    │              └── Destination path
 *     │    │      │                     │       │    └── Server username
 *     │    │      │                     │       └── Server address
 *     │    │      │                     └── File to send
 *     │    │      └── Private key file (optional, agar key use kar rahe ho)
 *     │    └── Port number (capital P for SCP!)
 *     └── SCP command
 * 
 *    REAL EXAMPLE:
 *      scp -P 2222 -i ~/.ssh/prod-key report.pdf admin@api.myapp.com:/backups/
 */

/**
 * 2. COPY FILE FROM SERVER TO CLIENT (Download)
 * --------------------------------------------
 *    scp -P 2222 -i ~/.ssh/id_ed25519 savi@192.168.1.100:/home/savi/data.csv ./downloads/
 *     │    │      │                     │    │              │             │
 *     │    │      │                     │    │              │             └── Local destination
 *     │    │      │                     │    │              └── Remote file path
 *     │    │      │                     │    └── Server username
 *     │    │      │                     └── Server address
 *     │    │      └── Private key
 *     │    └── Port
 *     └── Note: Remote path pehle aata hai downloading mein!
 * 
 *    REAL EXAMPLE:
 *      scp -P 2222 -i ~/.ssh/prod-key admin@api.myapp.com:/logs/error.log ./logs/
 */

/**
 * 3. COPY ENTIRE DIRECTORY FROM CLIENT TO SERVER (Recursive Upload)
 * --------------------------------------------
 *    scp -P 2222 -i ~/.ssh/id_ed25519 -r ./project/ savi@192.168.1.100:/home/savi/
 *     │    │      │                    │  │          │
 *     │    │      │                    │  │          └── Destination
 *     │    │      │                    │  └── Local folder to send
 *     │    │      │                    └── -r means "recursive" (folders ke liye)
 *     │    │      └── Private key
 *     │    └── Port
 *     └── SCP command
 * 
 *    REAL EXAMPLE:
 *      scp -P 2222 -i ~/.ssh/prod-key -r ./build/ admin@api.myapp.com:/var/www/
 */

/**
 * 4. COPY ENTIRE DIRECTORY FROM SERVER TO CLIENT (Recursive Download)
 * --------------------------------------------
 *    scp -P 2222 -i ~/.ssh/id_ed25519 -r savi@192.168.1.100:/home/savi/backups/ ./restore/
 * 
 *    REAL EXAMPLE:
 *      scp -P 2222 -i ~/.ssh/prod-key -r admin@api.myapp.com:/backups/january/ ./jan-backup/
 */

/**
 * ⚠️ SCP KI LIMITEDATIONS:
 * --------------------------------------------
 *    ❌ Resume interrupted transfer nahi kar sakta — agar beech mein ruk gaya to FIR SE SHURU!
 *    ❌ Sirf changed files nahi bhej sakta — har baar POORA file bhejta hai
 *    ❌ Compression nahi karta — data bada rehta hai
 *    ❌ Efficient sync nahi kar sakta
 * 
 * ======================================================================
 * 🧠 RSYNC — THE SMART COURIER
 * ======================================================================
 * 
 * Rsync SCP se zyada advanced hai. Ye intelligent hai — yaad rakhta hai kya bheja,
 * sirf change cheezein bhejta hai, compress karta hai, aur resume kar sakta hai.
 * 
 * 🔧 RSYNC KE MAGIC OPTIONS:
 * ---------------------------------------------------------------------
 * 
 *    -a, --archive  : Sab preserve karo (permissions, timestamps, everything)
 *                     Jaise courier ko bolo: "Jaisa hai waisa hi rakhna!"
 * 
 *    -v, --verbose  : Jo ho raha hai dikhao
 *                     Jaise courier safar ka haal suna raha ho
 * 
 *    -z, --compress : Transfer ke time compress karo
 *                     Jaise suitcase vacuum-pack karna
 * 
 *    -e, --rsh      : Remote shell specify karo (SSH with options)
 *                     Jaise courier ko batao kaunsa secret tunnel use karna hai
 * 
 *    --progress     : Progress dikhao
 *                     Jaise tracking number
 * 
 *    --partial      : Partial transfers ko rakho
 *                     Agar beech mein ruk jaaye to jo bheja already use mat phekho!
 * 
 *    --delete       : Destination mein extra files hatao
 *                     Jaise "jo source mein nahi, destination se hata do"
 * 
 *    --exclude      : Kuch files ko exclude karo
 *                     Jaise "ye files mat bhejna"
 * 
 *    --dry-run      : Bina actually copy kiye test karo
 *                     Jaise "pehle batao kya hoga, phir karna"
 * 
 *    --bwlimit      : Bandwidth limit karo
 *                     Jaise "speed limit, jaldi nahi"
 */

/**
 * 📋 RSYNC COMMANDS — THE BASICS:
 * ---------------------------------------------------------------------
 */

/**
 * 1. SENDING FILE TO SERVER (Upload)
 * --------------------------------------------
 *    rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -p 2222" report.pdf savi@192.168.1.100:/home/savi/
 *     │     │    │   │                                       │           │    │              │
 *     │     │    │   │                                       │           │    │              └── Destination
 *     │     │    │   │                                       │           │    └── Username@server
 *     │     │    │   │                                       │           └── File to send
 *     │     │    │   │                                       └── SSH options (key aur port)
 *     │     │    │   └── -e specifies remote shell command
 *     │     │    └── -z compress during transfer
 *     │     └── -v verbose (details dikhao)
 *     └── -a archive mode (sab preserve karo)
 * 
 *    REAL EXAMPLE:
 *      rsync -avz -e "ssh -i ~/.ssh/prod-key -p 2222" app.log admin@api.myapp.com:/logs/
 */

/**
 * 2. GETTING FILE FROM SERVER (Download)
 * --------------------------------------------
 *    rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -p 2222" savi@192.168.1.100:/home/savi/data.csv ./downloads/
 * 
 *    REAL EXAMPLE:
 *      rsync -avz -e "ssh -i ~/.ssh/prod-key -p 2222" admin@api.myapp.com:/backups/db.sql ./
 */

/**
 * 3. SENDING ENTIRE FOLDER (Recursive Upload)
 * --------------------------------------------
 *    rsync -avz --progress -e "ssh -i ~/.ssh/id_ed25519 -p 2222" ./project/ savi@192.168.1.100:/home/savi/
 *     │     │   │    │          │                                  │          │
 *     │     │   │    │          │                                  │          └── ⚠️ Note the slash!
 *     │     │   │    │          │                                  └── Source folder
 *     │     │   │    │          └── SSH options
 *     │     │   │    └── Show progress
 *     │     │   └── Compress
 *     │     └── Verbose
 *     └── Archive mode
 * 
 *    ⚠️ IMPORTANT SLASH TRICK:
 *       rsync -av ./project/ server:/dest/  → project ke ANDAR ka contents jayega
 *       rsync -av ./project  server:/dest/  → project FOLDER itself jayega
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --progress -e "ssh -i ~/.ssh/prod-key -p 2222" ./build/ admin@api.myapp.com:/var/www/html/
 */

/**
 * 4. GETTING ENTIRE FOLDER FROM SERVER (Recursive Download)
 * --------------------------------------------
 *    rsync -avz --progress -e "ssh -i ~/.ssh/id_ed25519 -p 2222" savi@192.168.1.100:/home/savi/backups/ ./restore/
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --progress -e "ssh -i ~/.ssh/prod-key -p 2222" admin@api.myapp.com:/backups/2026/ ./local-backups/
 */

/**
 * 5. RESUME INTERRUPTED TRANSFER (Jo ruka tha wahi se chalu)
 * --------------------------------------------
 *    rsync -avz --partial --progress -e "ssh -i ~/.ssh/id_ed25519 -p 2222" bigfile.iso savi@server:/home/savi/
 *                 │          │
 *                 │          └── Show progress
 *                 └── Keep partial files if interrupted
 * 
 *    Ye MAGIC hai — agar transfer 45% par ruka, agli baar 45% se continue karega!
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --partial --progress -e "ssh -i ~/.ssh/prod-key -p 2222" database.sql admin@api.myapp.com:/backups/
 */

/**
 * 6. SYNCHRONIZE TWO FOLDERS (Make them identical)
 * --------------------------------------------
 *    rsync -avz --delete -e "ssh -i ~/.ssh/key -p 2222" ./local/ server:/remote/
 *              │
 *              └── --delete removes files at destination jo source mein nahi hain
 * 
 *    Ye remote folder ko EXACT mirror banata hai local folder ka.
 *    Agar local mein file delete kari to remote se bhi delete ho jayegi!
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --delete -e "ssh -i ~/.ssh/prod-key -p 2222" ./www/ admin@api.myapp.com:/var/www/html/
 */

/**
 * 7. EXCLUDE CERTAIN FILES (Kuch files mat bhejo)
 * --------------------------------------------
 *    rsync -avz --exclude="*.tmp" --exclude="node_modules/" -e "ssh..." ./project/ server:/project/
 *              │                 │
 *              │                 └── Exclude node_modules folder
 *              └── Exclude all .tmp files
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --exclude=".git" --exclude="*.log" -e "ssh..." ./app/ server:/app/
 */

/**
 * 8. LIMIT BANDWIDTH (Network par load mat dalo)
 * --------------------------------------------
 *    rsync -avz --bwlimit=1000 -e "ssh..." bigfile.iso server:/
 *              │
 *              └── Limit to 1000 KB/sec (1 MB/sec)
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --bwlimit=500 -e "ssh..." backup.tar.gz server:/backups/
 */

/**
 * 9. DRY RUN (Pehle test karo, phir karo)
 * --------------------------------------------
 *    rsync -avz --dry-run -e "ssh..." ./project/ server:/
 *              │
 *              └── Show what WOULD happen, but don't actually do it
 * 
 *    REAL EXAMPLE:
 *      rsync -avz --dry-run -e "ssh..." ./new-config/ server:/etc/
 */

/**
 * ======================================================================
 * 🥊 SCP vs RSYNC — MUQABALA (Comparison)
 * ======================================================================
 * 
 * ┌──────────────────────┬──────────────────┬──────────────────────┐
 * │ FEATURE              │ SCP              │ RSYNC                 │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Resume interrupted   │ ❌ Nahi          │ ✅ Haan (--partial)   │
 * │ transfers            │                  │                       │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Sirf changes bhejna  │ ❌ Nahi (sab     │ ✅ Haan (delta sync)  │
 * │                      │ bhejta hai)      │                       │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Compression          │ ❌ Nahi          │ ✅ Haan (-z)          │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Preserve permissions │ ❌ Limited       │ ✅ Haan (-a)          │
 * │ timestamps           │                  │                       │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Show progress        │ ❌ Basic         │ ✅ Detailed (--progress)│
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Delete extra files   │ ❌ Nahi          │ ✅ Haan (--delete)    │
 * │ at destination       │                  │                       │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Bandwidth usage      │ ❌ High          │ ✅ Low (only changes) │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Speed for first      │ ✅ Fast          │ ✅ Fast               │
 * │ transfer             │                  │                       │
 * ├──────────────────────┼──────────────────┼──────────────────────┤
 * │ Speed for updates    │ ❌ Slow          │ ✅ Fast               │
 * └──────────────────────┴──────────────────┴──────────────────────┘
 * 
 * ======================================================================
 * 🎯 KAB KAUNSA USE KAREIN?
 * ======================================================================
 * 
 * SCP USE KARO JAB:
 * --------------------------------------------
 *   ✓ Ek baar ki chhoti transfer ho
 *   ✓ Files chhoti hoon (100MB se kam)
 *   ✓ Jaldi mein ho bas kaam khatam karna hai
 *   ✓ File dobara transfer nahi honi
 * 
 *   EXAMPLES:
 *     - Ek config file server par bhejni hai
 *     - Chhota log file download karna hai
 *     - Kuch documents ka quick backup
 * 
 * RSYNC USE KARO JAB:
 * --------------------------------------------
 *   ✓ Regular backups ho (daily/weekly)
 *   ✓ Badi files ho (especially agar internet unstable ho)
 *   ✓ Folders ko sync karna ho computers ke beech
 *   ✓ Bandwidth limited ya expensive ho
 *   ✓ Bahut saara data move karna ho
 *   ✓ Transfer beech mein ruk sakta ho
 * 
 *   EXAMPLES:
 *     - Daily website backups
 *     - Development se production par code sync
 *     - Naye server par migration
 *     - Do folders ko identical rakhna
 * 
 * ======================================================================
 * 📚 REAL-LIFE STORIES
 * ======================================================================
 * 
 * STORY 1: "The Website Deployment"
 * --------------------------------------------
 *   Maria apni website files continuously update karti hai.
 * 
 *   Purana tarika (SCP):
 *     scp -r -P 2222 ./new-website/ server:/var/www/
 *     # Har baar saari files upload hoti hain (10 minutes lagte hain!)
 * 
 *   Naya tarika (RSYNC):
 *     rsync -avz --delete -e "ssh -i ~/.ssh/key -p 2222" ./new-website/ server:/var/www/
 *     # Pehli baar: 10 minutes
 *     # Agli baar: 30 seconds (sirf changed files!)
 * 
 * STORY 2: "The Broken Download"
 * --------------------------------------------
 *   Tom 50GB ka database backup download kar raha hai. Internet 95% par gir gaya.
 * 
 *   SCP se:
 *     # Dobara shuru karo. 50GB phir download. Internet 80% par gir gaya. Rona aa gaya.
 * 
 *   RSYNC se:
 *     rsync -avz --partial --progress -e "ssh..." server:backup.sql ./
 *     # Internet 95% par gaya
 *     # Wahi command phir chalao: "Resuming from 95%... Done in 5 minutes!"
 * 
 * STORY 3: "The Server Migration"
 * --------------------------------------------
 *   Company 2TB data naye server par move kar rahi hai.
 * 
 *   SCP approach:
 *     - Servers offline karo
 *     - 3 days continuous copy
 *     - Agar beech mein ruka to phir shuru
 *     - Company 3 days kaam nahi kar sakti
 * 
 *   RSYNC approach:
 *     - Servers chalte raho
 *     - Pehli sync: 2 days (purana server still working)
 *     - Migration se ek din pehle: Quick sync (sirf changes - 1 hour)
 *     - Migration day: Final sync (15 minutes)
 *     - Minimum downtime!
 * 
 * ======================================================================
 * 📋 QUICK REFERENCE CARD
 * ======================================================================
 * 
 * SCP COMMANDS:
 * --------------------------------------------
 *   # Upload file
 *   scp -P 2222 -i key file.txt user@server:/path/
 *   
 *   # Download file
 *   scp -P 2222 -i key user@server:/path/file.txt ./
 *   
 *   # Upload folder
 *   scp -P 2222 -i key -r folder/ user@server:/path/
 *   
 *   # Download folder
 *   scp -P 2222 -i key -r user@server:/path/folder/ ./
 * 
 * RSYNC COMMANDS:
 * --------------------------------------------
 *   # Basic upload
 *   rsync -avz -e "ssh -i key -p 2222" file.txt user@server:/path/
 *   
 *   # Basic download
 *   rsync -avz -e "ssh -i key -p 2222" user@server:/path/file.txt ./
 *   
 *   # Sync folder (with resume)
 *   rsync -avz --partial --progress -e "ssh -i key -p 2222" folder/ user@server:/path/
 *   
 *   # Exact mirror (delete extras)
 *   rsync -avz --delete -e "ssh -i key -p 2222" folder/ user@server:/path/
 *   
 *   # Dry run (test first)
 *   rsync -avz --dry-run -e "ssh -i key -p 2222" folder/ user@server:/path/
 *   
 *   # With excludes
 *   rsync -avz --exclude="*.tmp" --exclude="node_modules/" -e "ssh..." folder/ server:/path/
 *   
 *   # Limit bandwidth
 *   rsync -avz --bwlimit=1000 -e "ssh..." bigfile.iso server:/
 * 
 * COMMON RSYNC OPTIONS:
 * --------------------------------------------
 *   -a            Archive (sab preserve karo)
 *   -v            Verbose (details dikhao)
 *   -z            Compress (bandwidth bachao)
 *   --progress    Progress dikhao
 *   --partial     Partial transfers rakho (resume ke liye)
 *   --delete      Extra files hatao destination se
 *   --exclude="pattern"  Kuch files skip karo
 *   --bwlimit=KBPS       Bandwidth limit
 *   --dry-run     Test karo bina copy kiye
 * 
 * ======================================================================
 * ⚠️ GOLDEN RULES OF FILE TRANSFER
 * ======================================================================
 * 
 *   1. Ek baar ki chhoti transfer → SCP (simple aur fast)
 *   2. Regular backups ke liye → RSYNC (efficient aur smart)
 *   3. Unstable connections ke liye → RSYNC with --partial
 *   4. Badi transfers ke liye → RSYNC with --progress (taaki pagal na ho)
 *   5. Agar unsure ho to pehle --dry-run karo
 *   6. Rsync mein slash ka trick yaad rakho!
 *   7. Doubt mein rsync -avz --progress use karo
 * 
 * YAAD RAKHO: Dono SCP aur Rsync trusted couriers hain jo secure SSH tunnel
 * use karte hain. Tumhari files safe rahengi, lekin Rsync smarter hai jo
 * experience se seekhta hai!
 * 
 * ======================================================================
 */