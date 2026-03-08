/**
 * SSH Tunneling (Port Forwarding):
 * > SSH tunneling allows secure forwarding of network traffic over an 
 *   encrypted SSH connection. 
 * > It is useful for:
 *   - Accessing remote services securely
 *   - Bypassing network restrictions
 *   - Exposing local services remotely
 * 
 * Types of Port Forwarding:
 * a. Local Forwarding:
 *    - Forward local port to remote server
 *    - Ex: Access a remote database locally
 * b. Remote Forwarding:
 *    - Forward remote port to local machine
 *    - Ex: Expose a local web server to a remote machine
 * c. Dynamic Forwarding:
 *    - Acts as a SOCKS proxy
 *    - Ex: Secure internet browsing via SSH
*/


/**
 * Local Port Forwarding (Access Remote Service Locally):
 * > Example: Forward a remote MySQL database (3306) to your local machine on
 *   - port 3307
 *   - ssh -L 3307:127.0.0.1:3306 -N -f -i /path/to/private-key -p 2222
 *   - savi@remote-ip
 * 
 * > Now, connect locally:
 *   - mysql -h 127.0.0.1 -P 3307 -u youruser -p
*/


/**
 * Remote Port Forwarding (Expose Local Service to Remote Machine):
 * > Example: Expose a local web server (8080) to a remote machine on port 9090
 *   - ssh -R 9090:127.0.0.1:8080 -N -f -i /path/to/private-key -p 2222
 *   - savi@remote-ip
 * 
 * > Now, access it from the remote machine:
 *   - curl http://127.0.0.1:9090
*/


/**
 * Advantages of SSH Tunneling:
 * - Secure : Encrypts data over SSH
 * - Bypass Restrictions : Access blocked services
 * - Remote Access : Connect to remote/local services securely
 * - No VPN Needed : Simple and lightweight alternative
 * 
 * > Use Local Forwarding to access remote services locally.
 * > Use Remote Forwarding to expose local services remotely.
*/









/**
 * =====================================================================
 * THE UNDERGROUND RAILWAY: A STORY OF SSH PORT FORWARDING
 * =====================================================================
 * 
 * CHAPTER 1: THE CITY WITH SECRET TUNNELS
 * =====================================================================
 * 
 * Imagine a massive city with three special buildings:
 * 
 * 🏠 YOUR HOUSE (Local Machine)
 *    - Where you live and work
 *    - Has its own address (localhost or 127.0.0.1)
 *    - Various doors (ports) for different services
 * 
 * 🏢 THE REMOTE CASTLE (Remote Server)
 *    - A building in another part of the city
 *    - Has valuable services inside
 *    - Protected by guards (firewalls)
 * 
 * 🚪 MAGICAL DOORS (Ports)
 *    - Each door has a number
 *    - Door 22: SSH entrance (our secret passage)
 *    - Door 80: Web server
 *    - Door 3306: MySQL database
 *    - Door 8080: Development server
 * 
 * Sometimes, you need to:
 * - Get something FROM the remote castle TO your house
 * - Send something FROM your house TO the remote castle
 * - Have a secret passage that can go ANYWHERE
 * 
 * This is where SSH TUNNELS come in!
 * 
 * 
 * CHAPTER 2: THE THREE TYPES OF MAGICAL TUNNELS
 * =====================================================================
 * 
 * TYPE 1: LOCAL TUNNEL (-L) - "Bring it here!"
 * ---------------------------------------------------------------------
 * Use this when you want to ACCESS something ON the remote server
 * FROM your local machine.
 * 
 * Think of it as: "Remote castle, please DELIVER your service to my house!"
 * 
 * TYPE 2: REMOTE TUNNEL (-R) - "Take it there!"
 * ---------------------------------------------------------------------
 * Use this when you want to EXPOSE something ON your local machine
 * TO the remote server.
 * 
 * Think of it as: "Please PICK UP this service from my house and take it to the castle!"
 * 
 * TYPE 3: DYNAMIC TUNNEL (-D) - "Go anywhere!"
 * ---------------------------------------------------------------------
 * Use this when you want to create a PROXY that can forward ANY traffic.
 * 
 * Think of it as: "Build a secret railway that can take me anywhere securely!"
 * 
 * 
 * CHAPTER 3: LOCAL PORT FORWARDING - THE DELIVERY SERVICE
 * =====================================================================
 * 
 * THE SCENARIO:
 * ---------------------------------------------------------------------
 * You're a database administrator. Your company's MySQL database is
 * running on a remote server. For security reasons:
 * - The database ONLY listens on localhost (127.0.0.1:3306)
 * - The firewall blocks ALL external database connections
 * - But you NEED to access it from your laptop for work!
 * 
 * THE PROBLEM VISUALIZED:
 * ---------------------------------------------------------------------
 *     YOUR LAPTOP                    REMOTE SERVER
 *  ┌─────────────┐                 ┌─────────────┐
 *  │  MySQL      │                 │  MySQL      │
 *  │  Client     │  🔥 FIREWALL 🔥  │  Database   │
 *  │  (port ?)   │ ──── BLOCKED ──→│  (port 3306)│
 *  └─────────────┘                 └─────────────┘
 *                                       │
 *                                 only localhost
 *                                 can connect here
 * 
 * THE SOLUTION - DIG A TUNNEL!
 * ---------------------------------------------------------------------
 * 
 *                 ╔═══════════════════════╗
 *                 ║   SSH TUNNEL          ║
 *                 ║  (Encrypted)          ║
 *    LOCAL        ║                       ║   REMOTE
 *  ┌──────┐       ║  ┌─────────────────┐  ║   ┌──────┐
 *  │3307  │◀══════╬══│    SSH Server   │══╬══▶│3306  │
 *  │Listen│       ║  │   (port 2222)   │  ║   │MySQL │
 *  └──────┘       ║  └─────────────────┘  ║   └──────┘
 *                 ╚═══════════════════════╝
 * 
 * THE COMMAND:
 * ---------------------------------------------------------------------
 * ssh -L 3307:127.0.0.1:3306 -N -f -i ~/.ssh/id_ed25519 -p 2222 savi@remote-ip
 *  │    │        │       │      │  │   │                     │    │        │
 *  │    │        │       │      │  │   │                     │    │        └── Remote user@server
 *  │    │        │       │      │  │   │                     │    └── SSH port (2222)
 *  │    │        │       │      │  │   │                     └── Private key
 *  │    │        │       │      │  │   └── -f = Run in background (like a ghost)
 *  │    │        │       │      │   └── -N = No commands (just tunnel)
 *  │    │        │       │      └── Background flag
 *  │    │        │       └── Remote port (where MySQL listens)
 *  │    │        └── Remote host (localhost from server's view)
 *  │    └── Local port (choose any free port)
 *  └── -L = Local tunnel
 * 
 * WHAT THIS MEANS IN PLAIN ENGLISH:
 * ---------------------------------------------------------------------
 * "Hey SSH! Please listen on my laptop's port 3307. 
 *  Whenever someone connects there, take that traffic through our
 *  secure tunnel, go to the remote server, and forward it to 
 *  localhost:3306 (which is the MySQL database). Do this quietly
 *  in the background (-N -f), and use my key and custom port."
 * 
 * NOW CONNECT LOCALLY:
 * ---------------------------------------------------------------------
 * mysql -h 127.0.0.1 -P 3307 -u myuser -p
 *        │           │
 *        │           └── Our tunnel port!
 *        └── Localhost (your machine)
 * 
 * MAGIC HAPPENS:
 * 1. MySQL client connects to your local port 3307
 * 2. SSH captures this connection
 * 3. It encrypts and sends it through the tunnel
 * 4. On the remote server, it connects to real MySQL on port 3306
 * 5. Response comes back through the tunnel
 * 6. You see it as if MySQL were running locally!
 * 
 * 
 * CHAPTER 4: REMOTE PORT FORWARDING - THE PICKUP SERVICE
 * =====================================================================
 * 
 * THE SCENARIO:
 * ---------------------------------------------------------------------
 * You're developing a web application on your laptop (port 8080).
 * You want to show it to a colleague who's working remotely.
 * But:
 * - Your laptop is behind a router/NAT (no public IP)
 * - Your colleague can't directly access your laptop
 * - You have a remote server that both can access
 * 
 * THE PROBLEM VISUALIZED:
 * ---------------------------------------------------------------------
 *     YOUR LAPTOP                    REMOTE SERVER              COLLEAGUE
 *  ┌─────────────┐                 ┌─────────────┐           ┌─────────────┐
 *  │  Web App    │                 │             │           │  Browser    │
 *  │  (port 8080)│ ─── CAN'T ────→ │             │ ←─── CAN ───│             │
 *  └─────────────┘    DIRECT        └─────────────┘   ACCESS   └─────────────┘
 *     (No public IP)                    (Public IP)
 * 
 * THE SOLUTION - REVERSE TUNNEL!
 * ---------------------------------------------------------------------
 * 
 *                 ╔═══════════════════════╗
 *                 ║   SSH TUNNEL          ║
 *                 ║  (Encrypted)          ║
 *    LOCAL        ║                       ║   REMOTE
 *  ┌──────┐       ║  ┌─────────────────┐  ║   ┌──────┐
 *  │8080  │══════▶╬══│    SSH Server   │══╬══▶│9090  │
 *  │Web   │       ║  │   (port 2222)   │  ║   │Listen│
 *  └──────┘       ║  └─────────────────┘  ║   └──────┘
 *                 ╚═══════════════════════╝
 * 
 * THE COMMAND:
 * ---------------------------------------------------------------------
 * ssh -R 9090:127.0.0.1:8080 -N -f -i ~/.ssh/id_ed25519 -p 2222 savi@remote-ip
 *  │    │        │       │      │  │   │                     │    │        │
 *  │    │        │       │      │  │   │                     │    │        └── Remote user@server
 *  │    │        │       │      │  │   │                     │    └── SSH port
 *  │    │        │       │      │  │   │                     └── Private key
 *  │    │        │       │      │  │   └── -f = Background
 *  │    │        │       │      │   └── -N = No commands
 *  │    │        │       │      └── Background flag
 *  │    │        │       └── Local port (your web app)
 *  │    │        └── Local host
 *  │    └── Remote port (where others will connect)
 *  └── -R = Remote tunnel
 * 
 * WHAT THIS MEANS IN PLAIN ENGLISH:
 * ---------------------------------------------------------------------
 * "Hey SSH! Please go to the remote server and listen on its port 9090.
 *  Whenever someone connects there, take that traffic backward through
 *  our secure tunnel to my laptop, and forward it to localhost:8080
 *  (my web app). Do this quietly in the background."
 * 
 * NOW YOUR COLLEAGUE CAN CONNECT:
 * ---------------------------------------------------------------------
 * On the remote server or from colleague's machine:
 * curl http://127.0.0.1:9090
 *        │           │
 *        │           └── Remote tunnel port
 *        └── Remote server's localhost
 * 
 * MAGIC HAPPENS:
 * 1. Colleague connects to remote server's port 9090
 * 2. SSH on remote server captures this
 * 3. It sends through the tunnel BACK to your laptop
 * 4. Your laptop receives it on port 8080
 * 5. Response goes back through tunnel
 * 6. Colleague sees your local web app!
 * 
 * 
 * CHAPTER 5: DYNAMIC PORT FORWARDING - THE SOCKS PROXY
 * =====================================================================
 * 
 * THE SCENARIO:
 * ---------------------------------------------------------------------
 * You're traveling and connected to a public WiFi (dangerous!).
 * You want to browse the internet securely, as if you were at home.
 * 
 * THE SOLUTION - DYNAMIC TUNNEL:
 * ---------------------------------------------------------------------
 * ssh -D 1080 -N -f -i ~/.ssh/id_ed25519 -p 2222 savi@remote-ip
 *  │    │      │  │   │                     │    │        │
 *  │    │      │  │   │                     │    │        └── Remote server
 *  │    │      │  │   │                     │    └── SSH port
 *  │    │      │  │   │                     └── Private key
 *  │    │      │  │   └── -f = Background
 *  │    │      │   └── -N = No commands
 *  │    │      └── Background flag
 *  │    └── Local SOCKS proxy port
 *  └── -D = Dynamic tunnel
 * 
 * WHAT THIS MEANS:
 * ---------------------------------------------------------------------
 * This creates a SOCKS proxy on your local port 1080.
 * Now configure your browser to use localhost:1080 as SOCKS proxy.
 * 
 * HOW IT WORKS:
 * 1. Browser wants to go to example.com
 * 2. Instead of direct connection, it asks the SOCKS proxy
 * 3. SSH captures this request
 * 4. It tunnels through to remote server
 * 5. Remote server fetches the website
 * 6. Response comes back encrypted through tunnel
 * 7. You see the website securely!
 * 
 * BENEFITS:
 * - All traffic encrypted (even HTTP websites!)
 * - Bypass country restrictions
 * - Safe on public WiFi
 * - Your real IP is hidden
 * 
 * 
 * CHAPTER 6: UNDERSTANDING THE MAGIC FLAGS
 * =====================================================================
 * 
 * THE DREAM TEAM OF OPTIONS:
 * ---------------------------------------------------------------------
 * 
 * -N : "No commands, just tunnel"
 *     Like telling the tunnel builder: "Just build the tunnel and wait,
 *     don't try to start a conversation." Perfect for pure tunnels.
 * 
 * -f : "Go to background"
 *     Like: "Build the tunnel and then become invisible. I want my
 *     terminal back for other work."
 * 
 * -L : "Local tunnel"
 *     Like: "Bring remote services TO me"
 * 
 * -R : "Remote tunnel"
 *     Like: "Send my local services TO the remote"
 * 
 * -D : "Dynamic tunnel"
 *     Like: "Create a proxy that can go anywhere"
 * 
 * 
 * CHAPTER 7: REAL-LIFE STORIES
 * =====================================================================
 * 
 * STORY 1: "The Database Developer" (Local Forwarding)
 * ---------------------------------------------------------------------
 * Maria needs to work on the production database from home.
 * 
 * Solution:
 * # Create tunnel
 * ssh -L 3307:localhost:3306 -N -f -i ~/.ssh/prod-key -p 2222 maria@prod-server
 * 
 * # Connect locally
 * mysql -h 127.0.0.1 -P 3307 -u admin -p
 * 
 * # She can now run queries safely!
 * 
 * STORY 2: "The Web Developer" (Remote Forwarding)
 * ---------------------------------------------------------------------
 * Tom wants to show his unfinished website to a client for feedback.
 * 
 * Solution on Tom's laptop:
 * ssh -R 8081:localhost:3000 -N -f -i ~/.ssh/key -p 2222 tom@public-server
 * 
 * Tell client:
 * "Visit http://public-server:8081 to see the site"
 * 
 * Client sees Tom's local development server remotely!
 * 
 * STORY 3: "The Security-Conscious Traveler" (Dynamic Forwarding)
 * ---------------------------------------------------------------------
 * Sarah is at a coffee shop with public WiFi.
 * 
 * Solution:
 * # Create dynamic tunnel
 * ssh -D 1080 -N -f -i ~/.ssh/key -p 2222 sarah@home-server
 * 
 * # Configure browser:
 * Settings → Network → Proxy → SOCKS Host: localhost:1080
 * 
 * Now all her browsing is secure, even on evil public WiFi!
 * 
 * STORY 4: "The DevOps Engineer" (Multiple Tunnels)
 * ---------------------------------------------------------------------
 * Alex needs to access both database (3306) and admin panel (8080)
 * on a restricted server.
 * 
 * Solution (one command, multiple tunnels):
 * ssh -L 3307:localhost:3306 -L 8081:localhost:8080 -N -f -i ~/.ssh/key -p 2222 alex@server
 * 
 * Now:
 * - mysql -h 127.0.0.1 -P 3307  # Database access
 * - http://localhost:8081        # Admin panel access
 * 
 * 
 * CHAPTER 8: TROUBLESHOOTING COMMON PROBLEMS
 * =====================================================================
 * 
 * PROBLEM 1: "Address already in use"
 * ---------------------------------------------------------------------
 * Means the local port is already taken.
 * Solution: Use a different port
 * ssh -L 3308:localhost:3306 ...  # Try different port
 * 
 * PROBLEM 2: "Cannot assign requested address"
 * ---------------------------------------------------------------------
 * Usually means the remote server isn't allowing forwarding.
 * Solution: On remote server, check /etc/ssh/sshd_config:
 * AllowTcpForwarding yes
 * GatewayPorts yes  # For remote forwarding
 * 
 * PROBLEM 3: Tunnel works but connection hangs
 * ---------------------------------------------------------------------
 * Firewall might be blocking the forwarded port.
 * Solution: Check both local and remote firewalls
 * 
 * PROBLEM 4: Remote forwarding not working
 * ---------------------------------------------------------------------
 * Remote server might be listening only on localhost.
 * Solution: On remote server:
 * ssh -R 0.0.0.0:9090:localhost:8080 ...  # Listen on all interfaces
 * 
 * 
 * CHAPTER 9: QUICK REFERENCE CARD
 * =====================================================================
 * 
 * LOCAL FORWARDING (Bring remote to local):
 * ---------------------------------------------------------------------
 * ssh -L [local_port]:[remote_host]:[remote_port] user@server
 * 
 * Example:
 * ssh -L 3307:localhost:3306 user@db-server
 * # Now connect to localhost:3307 to reach db-server:3306
 * 
 * REMOTE FORWARDING (Send local to remote):
 * ---------------------------------------------------------------------
 * ssh -R [remote_port]:[local_host]:[local_port] user@server
 * 
 * Example:
 * ssh -R 9090:localhost:8080 user@public-server
 * # Others connect to public-server:9090 to reach your local:8080
 * 
 * DYNAMIC FORWARDING (SOCKS Proxy):
 * ---------------------------------------------------------------------
 * ssh -D [local_port] user@server
 * 
 * Example:
 * ssh -D 1080 user@proxy-server
 * # Configure browser to use localhost:1080 as SOCKS proxy
 * 
 * COMMON OPTIONS:
 * ---------------------------------------------------------------------
 * -N : No commands (just tunnel)
 * -f : Background mode
 * -C : Compress data
 * -v : Verbose (debug)
 * -p : Remote SSH port
 * -i : Identity file (private key)
 * 
 * 
 * CHAPTER 10: WHEN TO USE WHICH
 * =====================================================================
 * 
 * USE LOCAL FORWARDING (-L) WHEN:
 * ---------------------------------------------------------------------
 * ✓ You need to access a remote service that's firewalled
 * ✓ The remote service only listens on localhost
 * ✓ You want to secure an unencrypted service
 * 
 * Examples:
 * - Remote database access
 * - Remote admin panels
 * - Internal company tools
 * 
 * USE REMOTE FORWARDING (-R) WHEN:
 * ---------------------------------------------------------------------
 * ✓ You need to expose your local service to the internet
 * ✓ You're behind NAT/no public IP
 * ✓ You want to share your development work
 * 
 * Examples:
 * - Sharing local web app with client
 * - Demo of work-in-progress
 * - Accessing your home computer remotely
 * 
 * USE DYNAMIC FORWARDING (-D) WHEN:
 * ---------------------------------------------------------------------
 * ✓ You want secure browsing on public WiFi
 * ✓ You need to bypass geo-restrictions
 * ✓ You want to hide your IP address
 * 
 * Examples:
 * - Coffee shop WiFi security
 * - Accessing region-locked content
 * - Anonymous browsing
 * 
 * 
 * THE GOLDEN RULES OF SSH TUNNELING:
 * =====================================================================
 * 1. Always use -N for pure tunnels (no shell needed)
 * 2. Use -f to run in background and free your terminal
 * 3. Test with -v first to see if tunnel works
 * 4. Remember: -L brings remote TO you, -R sends local TO remote
 * 5. Check firewalls on both ends if tunnels don't work
 * 6. Use different local ports if you get "address in use"
 * 7. Keep your SSH server configured to allow forwarding
 * 
 * AND REMEMBER: SSH tunnels are like secret passages in a city -
 * they let you go where you're not supposed to go, securely and
 * invisibly. Use them wisely!
 * =====================================================================
 */








/**
 * ======================================================================
 * SSH TUNNELING (PORT FORWARDING) — Complete Guide (HINGLISH VERSION)
 * ======================================================================
 * 
 * SSH tunneling ek secure tunnel banata hai jiske through tum network traffic
 * forward kar sakte ho encrypted SSH connection par. Ye useful hai:
 *   - Remote services securely access karne ke liye
 *   - Network restrictions bypass karne ke liye
 *   - Local services remotely expose karne ke liye
 * 
 * ======================================================================
 * 🚇 TYPES OF PORT FORWARDING — Teen prakar ke tunnels
 * ======================================================================
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * a. LOCAL FORWARDING (-L) — "Yahan lao!"
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Remote server par jo service hai, use apne local machine par access karo.
 *   
 *   Jaise: "Remote castle, please DELIVER your service to my house!"
 * 
 * KAB USE KAREIN:
 *   - Remote database access karna ho (MySQL, PostgreSQL)
 *   - Remote admin panel access karna ho
 *   - Remote service jo sirf localhost par listen karti ho
 *   - Unencrypted service ko secure karna ho
 * 
 * COMMAND STRUCTURE:
 *   ssh -L [local_port]:[remote_host]:[remote_port] user@server
 * 
 * REAL EXAMPLE — Remote MySQL database access:
 * --------------------------------------------
 *   ssh -L 3307:127.0.0.1:3306 -N -f -i ~/.ssh/id_ed25519 -p 2222 savi@remote-ip
 *    │    │        │       │      │  │   │                     │    │        │
 *    │    │        │       │      │  │   │                     │    │        └── Remote user@server
 *    │    │        │       │      │  │   │                     │    └── SSH port (2222)
 *    │    │        │       │      │  │   │                     └── Private key
 *    │    │        │       │      │  │   └── -f = Background mein chalao (ghost ki tarah)
 *    │    │        │       │      │   └── -N = Koi commands nahi (sirf tunnel)
 *    │    │        │       │      └── Background flag
 *    │    │        │       └── Remote port (jahan MySQL sunta hai)
 *    │    │        └── Remote host (server ki nazar mein localhost)
 *    │    └── Local port (khaali port chuno)
 *    └── -L = Local tunnel
 * 
 * PLAIN ENGLISH MEIN:
 *   "O SSH! Mere laptop ke port 3307 par sunte rehna. 
 *    Jab koi wahan connect kare, to us traffic ko le ja apne secure tunnel se,
 *    remote server par, aur wahan localhost:3306 (MySQL) par forward kar dena.
 *    Background mein chupke se kaam karo, koi commands mat do."
 * 
 * AB CONNECT KARO LOCALLY:
 * --------------------------------------------
 *   mysql -h 127.0.0.1 -P 3307 -u myuser -p
 *          │           │
 *          │           └── Hamara tunnel port!
 *          └── Localhost (apni machine)
 * 
 * MAGIC KAISE HOTA HAI:
 *   1. MySQL client local port 3307 se connect karta hai
 *   2. SSH is connection ko pakadta hai
 *   3. Encrypt karke tunnel se bhejta hai
 *   4. Remote server par, real MySQL se connect hota hai port 3306 par
 *   5. Response wapas tunnel se aata hai
 *   6. Tumhe lagta hai jaise MySQL local chal raha ho!
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * b. REMOTE FORWARDING (-R) — "Wahan le jao!"
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Apni local machine par jo service hai, use remote server par expose karo.
 *   
 *   Jaise: "Please PICK UP this service from my house and take it to the castle!"
 * 
 * KAB USE KAREIN:
 *   - Local web app client ko dikhana ho
 *   - NAT/public IP ke peeche ho to bhi service expose karna ho
 *   - Development server remotely share karna ho
 *   - Apne ghar ke computer ko remote access dena ho
 * 
 * COMMAND STRUCTURE:
 *   ssh -R [remote_port]:[local_host]:[local_port] user@server
 * 
 * REAL EXAMPLE — Local web app expose karo (port 8080) remote server par (port 9090):
 * --------------------------------------------
 *   ssh -R 9090:127.0.0.1:8080 -N -f -i ~/.ssh/id_ed25519 -p 2222 savi@remote-ip
 *    │    │        │       │      │  │   │                     │    │        │
 *    │    │        │       │      │  │   │                     │    │        └── Remote user@server
 *    │    │        │       │      │  │   │                     │    └── SSH port
 *    │    │        │       │      │  │   │                     └── Private key
 *    │    │        │       │      │  │   └── -f = Background
 *    │    │        │       │      │   └── -N = No commands
 *    │    │        │       │      └── Background flag
 *    │    │        │       └── Local port (tumhari web app)
 *    │    │        └── Local host
 *    │    └── Remote port (jahan doosre log connect karenge)
 *    └── -R = Remote tunnel
 * 
 * PLAIN ENGLISH MEIN:
 *   "O SSH! Remote server par jaake uske port 9090 par sunna.
 *    Jab koi wahan connect kare, to us traffic ko wapas mere laptop par laana
 *    secure tunnel se, aur localhost:8080 (meri web app) par forward kar dena.
 *    Background mein chupke se kaam karo."
 * 
 * AB COLLEAGUE CONNECT KAR SAKTA HAI:
 * --------------------------------------------
 *   Remote server se ya colleague ki machine se:
 *   curl http://127.0.0.1:9090
 *          │           │
 *          │           └── Remote tunnel port
 *          └── Remote server ka localhost
 * 
 * MAGIC KAISE HOTA HAI:
 *   1. Colleague remote server ke port 9090 se connect karta hai
 *   2. Remote server par SSH is connection ko pakadta hai
 *   3. Tunnel se WAPAS tumhari machine par bhejta hai
 *   4. Tumhari machine par port 8080 (web app) receive karti hai
 *   5. Response wapas tunnel se jaata hai
 *   6. Colleague tumhari local web app dekh leta hai!
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * c. DYNAMIC FORWARDING (-D) — "SOCKS Proxy"
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Ek SOCKS proxy banata hai jo kisi bi traffic ko forward kar sakta hai.
 *   Jaise: "Secret railway banao jo mujhe safely kahi bhi le ja sake!"
 * 
 * KAB USE KAREIN:
 *   - Public WiFi par secure browsing ke liye
 *   - Geo-restrictions bypass karne ke liye
 *   - Apna IP address hide karne ke liye
 *   - Saare internet traffic ko secure karne ke liye
 * 
 * COMMAND STRUCTURE:
 *   ssh -D [local_port] user@server
 * 
 * REAL EXAMPLE — SOCKS proxy banao:
 * --------------------------------------------
 *   ssh -D 1080 -N -f -i ~/.ssh/id_ed25519 -p 2222 savi@remote-ip
 *    │    │      │  │   │                     │    │        │
 *    │    │      │  │   │                     │    │        └── Remote server
 *    │    │      │  │   │                     │    └── SSH port
 *    │    │      │  │   │                     └── Private key
 *    │    │      │  │   └── -f = Background
 *    │    │      │   └── -N = No commands
 *    │    │      └── Background flag
 *    │    └── Local SOCKS proxy port
 *    └── -D = Dynamic tunnel
 * 
 * BROWSER CONFIGURE KARO:
 * --------------------------------------------
 *   Settings → Network → Proxy → SOCKS Host: localhost:1080
 * 
 * KAISE KAAM KARTA HAI:
 *   1. Browser example.com jana chahta hai
 *   2. Direct connection ki jagah, SOCKS proxy se puchta hai
 *   3. SSH is request ko pakadta hai
 *   4. Tunnel se remote server tak bhejta hai
 *   5. Remote server website fetch karta hai
 *   6. Response encrypted tunnel se wapas aata hai
 *   7. Tum website securely dekh lete ho!
 * 
 * BENEFITS:
 *   - Saara traffic encrypted (chahe HTTP ho ya HTTPS)
 *   - Country restrictions bypass
 *   - Public WiFi par safe
 *   - Tumhara real IP hidden
 */

/**
 * ======================================================================
 * 🧙 THE MAGIC FLAGS — Samjho inko
 * ======================================================================
 * 
 * ┌──────────┬──────────────────────────────────────────────────────┐
 * │ Flag     │ Matlab                                              │
 * ├──────────┼──────────────────────────────────────────────────────┤
 * │ -N       │ No commands — sirf tunnel chahiye, shell nahi       │
 * │          │ Jaise: "Sirf tunnel banao, baat mat karo"            │
 * ├──────────┼──────────────────────────────────────────────────────┤
 * │ -f       │ Background — terminal wapas mil jaye                 │
 * │          │ Jaise: "Tunnel banao aur invisible ho jao"           │
 * ├──────────┼──────────────────────────────────────────────────────┤
 * │ -C       │ Compress — data compress karo                        │
 * │          │ Slow connection ke liye useful                       │
 * ├──────────┼──────────────────────────────────────────────────────┤
 * │ -v       │ Verbose — debug mode, kya ho raha hai dikhao        │
 * │          │ Tunnel kaam nahi kar raha to ye use karo             │
 * ├──────────┼──────────────────────────────────────────────────────┤
 * │ -p       │ Port — remote SSH port specify karo                  │
 * │          │ Default 22 hai, agar change kiya to ye do            │
 * ├──────────┼──────────────────────────────────────────────────────┤
 * │ -i       │ Identity file — private key                          │
 * │          │ Password ki jagah key use kar rahe ho to ye do       │
 * └──────────┴──────────────────────────────────────────────────────┘
 * 
 * ======================================================================
 * 🎯 KAB KAUNSA USE KAREIN?
 * ======================================================================
 * 
 * LOCAL FORWARDING (-L) USE KARO JAB:
 * --------------------------------------------
 *   ✓ Remote service access karni ho jo firewalled ho
 *   ✓ Remote service sirf localhost par sunti ho
 *   ✓ Unencrypted service ko secure karna ho
 * 
 *   EXAMPLES:
 *     - Remote database access (MySQL, PostgreSQL)
 *     - Remote admin panels
 *     - Internal company tools
 * 
 * REMOTE FORWARDING (-R) USE KARO JAB:
 * --------------------------------------------
 *   ✓ Apni local service ko internet par expose karna ho
 *   ✓ NAT/public IP ke peeche ho
 *   ✓ Development work share karna ho
 * 
 *   EXAMPLES:
 *     - Local web app client ko dikhana
 *     - Work-in-progress demo
 *     - Apne ghar ke computer ko remote access
 * 
 * DYNAMIC FORWARDING (-D) USE KARO JAB:
 * --------------------------------------------
 *   ✓ Public WiFi par secure browsing chahiye
 *   ✓ Geo-restrictions bypass karne hain
 *   ✓ Apna IP address hide karna hai
 * 
 *   EXAMPLES:
 *     - Coffee shop WiFi security
 *     - Region-locked content access
 *     - Anonymous browsing
 * 
 * ======================================================================
 * 📚 REAL-LIFE STORIES
 * ======================================================================
 * 
 * STORY 1: "The Database Developer" (Local Forwarding)
 * --------------------------------------------
 *   Maria ko production database par ghar se kaam karna hai.
 * 
 *   Solution:
 *     # Tunnel banao
 *     ssh -L 3307:localhost:3306 -N -f -i ~/.ssh/prod-key -p 2222 maria@prod-server
 *     
 *     # Local connect karo
 *     mysql -h 127.0.0.1 -P 3307 -u admin -p
 *     
 *     # Ab safely queries chala sakti hai!
 * 
 * STORY 2: "The Web Developer" (Remote Forwarding)
 * --------------------------------------------
 *   Tom apna unfinished website client ko dikhana chahta hai feedback ke liye.
 * 
 *   Solution (Tom ke laptop par):
 *     ssh -R 8081:localhost:3000 -N -f -i ~/.ssh/key -p 2222 tom@public-server
 *     
 *   Client ko batao:
 *     "http://public-server:8081 par jao, site dekh lo"
 *     
 *   Client Tom ki local development server remotely dekh leta hai!
 * 
 * STORY 3: "The Security-Conscious Traveler" (Dynamic Forwarding)
 * --------------------------------------------
 *   Sarah coffee shop mein public WiFi par hai.
 * 
 *   Solution:
 *     # Dynamic tunnel banao
 *     ssh -D 1080 -N -f -i ~/.ssh/key -p 2222 sarah@home-server
 *     
 *     # Browser mein proxy set karo:
 *     Settings → Network → Proxy → SOCKS Host: localhost:1080
 *     
 *     # Ab saara browsing secure hai, chahe evil public WiFi ho!
 * 
 * STORY 4: "The DevOps Engineer" (Multiple Tunnels)
 * --------------------------------------------
 *   Alex ko ek restricted server par database (3306) aur admin panel (8080)
 *   dono access karne hain.
 * 
 *   Solution (ek command, multiple tunnels):
 *     ssh -L 3307:localhost:3306 -L 8081:localhost:8080 -N -f -i ~/.ssh/key -p 2222 alex@server
 *     
 *   Ab:
 *     - mysql -h 127.0.0.1 -P 3307  # Database access
 *     - http://localhost:8081        # Admin panel access
 * 
 * ======================================================================
 * 🔧 TROUBLESHOOTING — Common Problems aur Solutions
 * ======================================================================
 * 
 * PROBLEM 1: "Address already in use"
 * --------------------------------------------
 *   Matlab local port already koi aur use kar raha hai.
 *   
 *   SOLUTION: Doosra port use karo
 *     ssh -L 3308:localhost:3306 ...  # Different port try karo
 * 
 * PROBLEM 2: "Cannot assign requested address"
 * --------------------------------------------
 *   Remote server forwarding allow nahi kar raha.
 *   
 *   SOLUTION: Remote server par /etc/ssh/sshd_config check karo:
 *     AllowTcpForwarding yes
 *     GatewayPorts yes  # Remote forwarding ke liye
 *     
 *     Phir SSH restart karo:
 *     sudo systemctl restart ssh
 * 
 * PROBLEM 3: "Tunnel works but connection hangs"
 * --------------------------------------------
 *   Firewall forwarded port ko block kar raha hai.
 *   
 *   SOLUTION: Local aur remote dono ki firewall check karo
 *     sudo ufw status
 *     sudo firewall-cmd --list-all
 * 
 * PROBLEM 4: "Remote forwarding not working"
 * --------------------------------------------
 *   Remote server sirf localhost par sun raha hai.
 *   
 *   SOLUTION: Sab interfaces par sunne ko bolo
 *     ssh -R 0.0.0.0:9090:localhost:8080 ...
 * 
 * PROBLEM 5: "Permission denied (publickey)"
 * --------------------------------------------
 *   Private key sahi nahi hai ya permissions galat hain.
 *   
 *   SOLUTION: Permissions check karo
 *     chmod 600 ~/.ssh/id_ed25519
 *     ssh -i sahi-key user@host
 * 
 * ======================================================================
 * 📋 QUICK REFERENCE CARD
 * ======================================================================
 * 
 * LOCAL FORWARDING (Remote ko local lao):
 * --------------------------------------------
 *   ssh -L [local_port]:[remote_host]:[remote_port] user@server
 *   
 *   Example:
 *     ssh -L 3307:localhost:3306 user@db-server
 *     # Ab localhost:3307 connect karo to db-server:3306 milega
 * 
 * REMOTE FORWARDING (Local ko remote bhejo):
 * --------------------------------------------
 *   ssh -R [remote_port]:[local_host]:[local_port] user@server
 *   
 *   Example:
 *     ssh -R 9090:localhost:8080 user@public-server
 *     # Doosre log public-server:9090 connect karein to tumhara local:8080 milega
 * 
 * DYNAMIC FORWARDING (SOCKS Proxy):
 * --------------------------------------------
 *   ssh -D [local_port] user@server
 *   
 *   Example:
 *     ssh -D 1080 user@proxy-server
 *     # Browser mein localhost:1080 SOCKS proxy set karo
 * 
 * COMMON OPTIONS:
 * --------------------------------------------
 *   -N : No commands (sirf tunnel)
 *   -f : Background mode
 *   -C : Compress data
 *   -v : Verbose (debug)
 *   -p : Remote SSH port
 *   -i : Identity file (private key)
 * 
 * CHECK KARO TUNNEL CHAL RAHA HAI:
 * --------------------------------------------
 *   ps aux | grep ssh
 *   netstat -tlnp | grep PORT
 *   lsof -i :PORT
 * 
 * TUNNEL BAND KARO:
 * --------------------------------------------
 *   pkill -f "ssh -L 3307"
 *   # Ya process ID find karo
 *   ps aux | grep ssh
 *   kill -9 PID
 * 
 * ======================================================================
 * ⚠️ GOLDEN RULES OF SSH TUNNELING
 * ======================================================================
 * 
 *   1. -N hamesha use karo pure tunnels ke liye (shell nahi chahiye)
 *   2. -f use karo background mein daalne ke liye, terminal free rahega
 *   3. Pehle -v se test karo ki tunnel kaam kar raha hai
 *   4. Yaad rakho: -L remote KO local LAATA hai, -R local KO remote BHEJTA hai
 *   5. Dono ends ki firewall check karo agar tunnel kaam na kare
 *   6. "Address in use" aye to different local port try karo
 *   7. SSH server ki configuration mein forwarding allow hona chahiye
 *   8. Private key ki permissions 600 honi chahiye, nahi to SSH mana karega
 * 
 * YAAD RAKHO: SSH tunnels secret passages ki tarah hain — ye tumhe wahan le jaate hain
 * jahan tum normally nahi ja sakte, securely aur invisibly. Samajhdari se use karo!
 * 
 * ======================================================================
 */