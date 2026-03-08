/**
 * SSH Protocol:
 * > SSH (Secure Shell Protocol) is used to securely send commands to 
 *   a computer over an insecure network. 
 * > SSH uses cryptography for authentication, encryption, and integrity,
 *   making it a secure way to transmit data. 
 * > SSH utilizes tunneling to send data that might be blocked by network
 *   restrictions, such as firewalls. 
 * > Older protocols like Telnet and RSH (Remote Shell) were replaced by
 *   SSH because they did not encrypt connections, leaving data vulnerable
 *   to interception and modification.
 * 
 * > It can be compared to a store owner giving instructions to an 
 *   employee while traveling, where encryption ensures that no one else
 *   can overhear the conversation.
 * 
 * > Telnet was an early protocol used to access remote systems, but it 
 *   transmitted data in plaintext, making it highly insecure. 
 * > RSH (Remote Shell) was another early protocol used for executing 
 *   commands on remote machines but lacked encryption, making it 
 *   vulnerable to attacks. 
 * > SSH replaced Telnet and RSH due to its ability to provide secure 
 *   authentication and encrypted communication over an insecure network.
*/


/**
 * SSH Features:
 * 1. Encryption
 *    - SSH encrypts data so no one can read it while it travels over 
 *      the internet.
 *    - Example: When you type your password on an SSH session, it is 
 *      scrambled so hackers can’t steal it.
 * 
 * 2. Authentication
 *    - SSH checks who is logging in to make sure it's a trusted user. 
 *    - There are two main ways:
 *      a. Password Login: You enter a password to connect.
 *      b. Key Login: You use a special file (SSH key) instead of a 
 *         password.
 *    - Example: Instead of typing your password every time, you can set
 *      up an SSH key so your computer logs in automatically.
 * 
 * 3. Integrity
 *    - SSH ensures that the data you send and receive is not changed by
 *      hackers.
 *    - Example: If you send a command to a remote server, SSH checks 
 *      that the response is exactly what was sent, with no tampering.
 * 
 * 4. Port Forwarding
 *    - SSH can securely tunnel data from one computer to another, 
 *      bypassing restrictions.
 *    - Example: If a website is blocked in your country, you can use 
 *      SSH tunneling to route your internet through a different server
 *      and access it securely. Similarly, a database running on a remote
 *      server can be accessed on your local computer without adding that
 *      port and protocol in the firewall.
*/

/**
 * Use Cases of SSH:
 * 1. Remote Command Execution: 
 *    - Running commands on remote machines securely.
 * 
 * 2. Secure File Transfer: 
 *    - Using SCP (Secure Copy Protocol) or SFTP (SSH File Transfer 
 *      Protocol) to transfer files securely.
 * 
 * 3. SSH Tunneling: 
 *    - Bypassing firewalls or securely forwarding ports.
*/


/**
 * Remote Command Execution:
 * 
 * 1.1. Check if SSH is Installed (If Not, Install It)
 * 
 *      # Before using SSH, ensure it is installed on your system.
 *      # Linux - Check if SSH is installed
 *      ssh -V
 *      
 *      # If SSH is missing, install it
 *      sudo apt update && sudo apt install openssh-client -y
 *      
 *      # Install SSH server (to allow incoming SSH connections)
 *      sudo apt install openssh-server -y
 *      sudo systemctl enable --now ssh
 *      
 *      # macOS - Check SSH version
 *      ssh -V
 *      
 *      # If missing (rare case), reinstall via Homebrew
 *      brew install openssh
 *      
 *      # Windows - Check if OpenSSH is installed
 *      Get-Service -Name ssh-agent
 *      
 *      # Enable OpenSSH if not installed
 *      Add-WindowsFeature -Name OpenSSH-Client, OpenSSH-Server
 *      
 *      Start-Service ssh-agent
 *      
 *      # Or install OpenSSH using Chocolatey
 *      choco install openssh
 *      
 *      # Alternative: Install PuTTY or Git Bash (which includes SSH)
 * 
 * 
 * 1.2. Login via Password
 * 
 *      # Log in to a remote machine using SSH and a password
 *      # Basic command
 *      ssh savi@remote-ip
 *      
 *      # Replace 'remote-ip' with the actual server IP or hostname
 *      # Example:
 *      ssh savi@192.168.1.100
 *      
 *      # Enter the password when prompted to log in
 */


/**
 * How SSH Works Internally?
 * > When you connect to an SSH server, several security mechanisms are
 *   used to establish a secure connection.
 * 
 * Step 1: TCP 3-Way Handshake
 * - Before SSH starts, a basic network connection is established using
 *   a 3-way handshake between the client (your computer) and the server.
 * - At this point, a raw connection is established, but the data is not 
 *   encrypted yet.
 * 
 * Step 2: Protocol Exchange
 * - Now, the client and server exchange SSH protocol details:
 *   > What version of SSH are they using?
 *   > What encryption and authentication methods are supported?
 * 
 * - The server responds with:
 *   SSH-2.0-OpenSSH_8.9
 * 
 * - The client responds with:
 *   SSH-2.0-ClientVersion
 * 
 * Step 3: Key Exchange using Diffie-Hellman
 * - Now, the Diffie-Hellman algorithm is used to establish a shared 
 *   secret key that both client and server will use for encryption.
 *   1. The client and server each generate random secret values.
 *   2. They exchange public keys and use a mathematical formula to 
 *      generate the same shared secret without actually sending it over
 *      the network.
 *   3. This secret key is now used for encrypting the communication.
 * - Even if a hacker captures the public key exchange, they cannot 
 *   derive the private shared key.
 * 
 * Step-4: Authentication
 * - Now, SSH asks for user authentication.
 *   > If using password login, SSH encrypts the password before sending it.
 *   > If using key-based login, the client proves its identity using a 
 *     private key.
 * - If authentication is successful, the SSH session starts.
 * 
 * Step-5: Secure Communication Begins
 * - Now that authentication is complete, the client and server use AES 
 *   encryption to send and receive data securely.
 *   > Commands sent via SSH are encrypted before transmission.
 *   > Responses from the server are encrypted before being sent back to
 *     the client.
 * - Now you can safely execute remote commands.
*/


/**
 * SSH Key Login (Public Key Authentication)
 * > Using SSH keys is more secure than password-based login because it
 *   eliminates the risk of brute-force attacks and password leaks. 
 * > It is recommended to use SSH Key login.
 * 
 * Generate SSH Key Pair for User savi
SSH key pairs consist of:
Private Key (`id_rsa`) → Stays on the client (DO NOT share).
Public Key (`id_rsa.pub`) → Placed on the remote server.
Generating an SSH Key Pair
Run the following command on your local machine (client):
ssh-keygen -t rsa -b 4096 -C "savi@your-client"
- `t rsa` → Use the RSA algorithm.
- `b 4096` → Generate a 4096-bit key (more secure).
- `C "savi@your-client"` → Adds a comment (optional).

This will prompt:
Enter file in which to save the key (/home/savi/.ssh/id_rsa):
Press Enter to save in the default location (`~/.ssh/id_rsa`) or provide the
absolute path of another location.
It will then ask for a passphrase (optional but recommended).
- Adding a passphrase provides extra security in case the private key is stolen.
- If left blank, SSH will not ask for a password when using the key.

After this, two files are created:
~/.ssh/id_rsa # Private key (KEEP SAFE)
~/.ssh/id_rsa.pub # Public key (SHARE WITH SERVER)
*/


/**
 * SSH supports multiple cryptographic algorithms for key generation:
 * a. RSA:
 *    - ssh-keygen -t rsa -b 4096
 *    - Secrity is strong (with 4096-bit keys)
 * 
 * b. ECDSA:
 *    - ssh-keygen -t ecdsa -b 521
 *    - Security is strong
 * 
 * c. Ed25519:
 *    - ssh-keygen -t ed25519
 *    - Fastest and most secure (recommended)
 * 
 * d. DSA:
 *    - ssh-keygen -t dsa
 *    - Weak (not recommended)
 * 
 * 
 * Example: 
# Store the Keys Properly
# On Client Machine (Local Machine):
# The private key stays on the local machine at:
~/.ssh/id_rsa
# Ensure correct permissions
chmod 600 ~/.ssh/id_rsa
# On Server (Remote Machine):
# Copy the public key to the remote server
ssh-copy-id -i ~/.ssh/id_rsa.pub savi@remote-ip
# Or manually add the public key to the authorized_keys file on
the server
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
# Ensure correct permissions on the server
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
# Now, log in without a password
ssh -i ~/.ssh/id_rsa savi@remote-ip


 * To enhance security, we will:
 * 1. Disable root login
 * 2. Disable password authentication
 * 3. Change the default SSH port
 * 
 * 
# Edit SSH Configuration
# Open the SSH configuration file on the server
sudo nano /etc/ssh/sshd_config
# Modify these settings:
# Disable root login
PermitRootLogin no
# Disable password authentication (force key-based login)
PasswordAuthentication no

# Change the default SSH port (e.g., from 22 to 2222)
Port 2222

# Apply Changes for SSH Socket and SSH Daemon

# Stop the SSH socket activation mechanism
sudo systemctl stop ssh.socket
# Disable SSH socket activation to prevent auto-start
sudo systemctl disable ssh.socket
# Ensure the main SSH service starts at boot
sudo systemctl enable ssh.service
# Restart the SSH service to apply changes
sudo systemctl restart ssh.service
# Restart SSH to finalize all modifications
sudo systemctl restart ssh

# Firewall Configuration for SSH (Custom TCP Port 2222)
# If using UFW (Uncomplicated Firewall)
# Allow new SSH port
sudo ufw allow 2222/tcp
# Enable firewall
sudo ufw enable

# Verify rules
sudo ufw status

# If using firewalld (CentOS/RHEL)
# Add custom TCP rule for port 2222
sudo firewall-cmd --permanent --add-port=2222/tcp
# Reload firewall rules
sudo firewall-cmd --reload

# If using cloud security groups (AWS, DigitalOcean, etc.),
manually add a Custom TCP rule allowing port 2222 in the security
group settings.
# Now, connect using SSH with a custom port and key
ssh -i ~/.ssh/id_rsa -p 2222 savi@remote-ip
*/







/**
 * =====================================================================
 * THE SECRET TUNNEL: A STORY OF SSH (SECURE SHELL)
 * =====================================================================
 * 
 * CHAPTER 1: ONCE UPON A TIME... (The Problem)
 * =====================================================================
 * 
 * Imagine you're the owner of a magical store, and you need to go on a
 * long journey. But you still need to give instructions to your employee
 * back home. How do you communicate?
 * 
 * THE OLD, DANGEROUS WAY (Telnet & RSH):
 * ---------------------------------------------------------------------
 * Picture yourself shouting instructions across a crowded marketplace:
 * 
 * You: "HEY EMPLOYEE! MOVE THE BLUE BOXES TO THE BACK!"
 * Employee: "OKAY BOSS!"
 * 
 * The problem? EVERYONE in the marketplace can hear you! Hackers,
 * competitors, random strangers - they all know:
 * - What you're doing
 * - Your passwords (if you shout them)
 * - Your business secrets
 * 
 * They can even:
 * - Change your message ("MOVE THE BLUE BOXES INTO THE RIVER!")
 * - Pretend to be you ("I'M THE BOSS, GIVE ME ALL THE MONEY!")
 * 
 * This is exactly what Telnet and RSH were like - no encryption, no
 * security, just plain text shouting across the internet!
 * 
 * THE MODERN, SECURE WAY (SSH):
 * ---------------------------------------------------------------------
 * Now imagine you have a magical SECRET TUNNEL between you and your
 * employee. When you speak through this tunnel:
 * 
 * - Your words get SCRAMBLED (encryption)
 * - Only your employee can UNSCRAMBLE them
 * - You can VERIFY it's really your employee
 * - Your employee can VERIFY it's really you
 * - Nobody can CHANGE your messages
 * 
 * This is SSH!
 * 
 * 
 * CHAPTER 2: THE FOUR MAGICAL POWERS OF SSH
 * =====================================================================
 * 
 * POWER 1: ENCRYPTION (The Scrambler)
 * ---------------------------------------------------------------------
 * Think of encryption like a secret language only you and your employee
 * understand. You say "The sky is purple", but through the tunnel it
 * sounds like "Gx7#kL9@pQ2!" to anyone listening.
 * 
 * Real example: When you type your password in SSH, it gets scrambled
 * into something like "8f4d3e2a1b9c7x5v" before traveling over the
 * internet. Even if hackers capture it, they just see gibberish!
 * 
 * POWER 2: AUTHENTICATION (The ID Check)
 * ---------------------------------------------------------------------
 * SSH has two ways to make sure you are who you say you are:
 * 
 * a) Password Login (Like showing your driver's license)
 *    - You type a password
 *    - Simple but can be guessed or stolen
 * 
 * b) Key Login (Like having a magical key that can't be copied)
 *    - You have a special file (private key) on your computer
 *    - The server has a matching lock (public key)
 *    - When you connect, your computer uses the key to prove it's you
 *    - MUCH more secure than passwords!
 * 
 * POWER 3: INTEGRITY (The Tamper-Proof Seal)
 * ---------------------------------------------------------------------
 * Imagine sending a letter with a wax seal. If someone opens it, you'll
 * know. SSH does the same with data - it checks that nothing was
 * changed during transmission.
 * 
 * If a hacker tries to change your command from "ls" (list files) to
 * "rm -rf *" (delete everything), SSH will detect the tampering and
 * reject it!
 * 
 * POWER 4: PORT FORWARDING (The Secret Passage)
 * ---------------------------------------------------------------------
 * Sometimes networks block certain types of traffic, like a castle
 * closing its gates. SSH can create a secret passage that bypasses
 * these blocks.
 * 
 * Example: If your company blocks Instagram, you can create an SSH
 * tunnel to a server in another country, and all your Instagram traffic
 * travels through that tunnel, wrapped in SSH encryption. The firewall
 * just sees encrypted SSH traffic and lets it through!
 * 
 * 
 * CHAPTER 3: WHAT CAN YOU DO WITH SSH?
 * =====================================================================
 * 
 * USE CASE 1: Remote Command Execution (Control from anywhere)
 * ---------------------------------------------------------------------
 * You're on vacation but need to restart your server at home:
 * 
 * ssh savi@192.168.1.100
 * (enter password)
 * sudo systemctl restart website
 * 
 * Done! Your server restarts, securely, from anywhere in the world!
 * 
 * USE CASE 2: Secure File Transfer (Move files safely)
 * ---------------------------------------------------------------------
 * Need to send secret plans to your partner?
 * 
 * scp secret_plans.pdf savi@192.168.1.100:/home/savi/documents/
 * 
 * This copies the file securely - nobody can intercept it!
 * 
 * USE CASE 3: SSH Tunneling (Bypass restrictions)
 * ---------------------------------------------------------------------
 * Access a database that's only available on a remote server:
 * 
 * ssh -L 3306:localhost:3306 savi@database-server.com
 * 
 * Now you can access the database on YOUR computer as if it were local!
 * 
 * 
 * CHAPTER 4: SETTING UP SSH - YOUR FIRST CONNECTION
 * =====================================================================
 * 
 * STEP 1: Check if SSH is installed (Do you have a tunnel?)
 * ---------------------------------------------------------------------
 * 
 * On Linux/Mac:
 * ssh -V
 * # If it shows something like "OpenSSH_8.9", you're good!
 * 
 * # If not installed on Linux:
 * sudo apt install openssh-client    # For connecting TO others
 * sudo apt install openssh-server    # For letting others connect TO you
 * 
 * On Windows:
 * # Check if installed:
 * Get-Service -Name ssh-agent
 * 
 * # If not, install via Settings > Apps > Optional Features > Add OpenSSH
 * # Or use Git Bash (which comes with SSH)
 * 
 * STEP 2: CONNECT TO A REMOTE SERVER
 * ---------------------------------------------------------------------
 * 
 * # The basic command:
 * ssh username@server-address
 * 
 * # Example:
 * ssh savi@192.168.1.100
 * 
 * # What happens:
 * 1. Your computer: "Hello! Can I talk to the server at 192.168.1.100?"
 * 2. Server: "Yes, who's there?"
 * 3. Your computer: "savi wants to connect"
 * 4. Server: "Okay, what's the password?"
 * 5. You type: "********"
 * 6. Server: "Correct! You're in!"
 * 
 * 
 * CHAPTER 5: THE MAGIC BEHIND THE CURTAIN (How SSH Really Works)
 * =====================================================================
 * 
 * When you type that ssh command, a beautiful dance of security happens:
 * 
 * STEP 1: THE HANDSHAKE (TCP 3-Way)
 * ---------------------------------------------------------------------
 * Your computer and the server do a little dance to establish a basic
 * connection:
 * 
 * Client: "Knock knock! (SYN)"
 * Server: "Who's there? (SYN-ACK)"
 * Client: "It's me! (ACK)"
 * 
 * Now they have a raw connection, but it's like an open phone line -
 * anyone could listen!
 * 
 * STEP 2: INTRODUCTION (Protocol Exchange)
 * ---------------------------------------------------------------------
 * They introduce themselves and see what languages they both speak:
 * 
 * Server: "I speak SSH-2.0-OpenSSH_8.9"
 * Client: "Great! I speak SSH-2.0-ClientVersion too!"
 * 
 * They also agree on encryption methods, like deciding to speak in
 * French instead of English.
 * 
 * STEP 3: THE KEY EXCHANGE (Diffie-Hellman Magic)
 * ---------------------------------------------------------------------
 * This is the really clever part. They need to agree on a secret code
 * without actually sending the code over the internet (because that
 * would be dangerous!).
 * 
 * Imagine this conversation:
 * 
 * Client: "I have a magic number: 3, and I'll send you 3×7=21"
 * Server: "I have a magic number: 5, and I'll send you 5×7=35"
 * 
 * They exchange 21 and 35, but here's the magic:
 * Client takes 35 (from server) and multiplies by their secret 3: 35×3=105
 * Server takes 21 (from client) and multiplies by their secret 5: 21×5=105
 * 
 * They BOTH end up with 105, but nobody watching could figure it out!
 * This 105 becomes their SHARED SECRET KEY.
 * 
 * In reality, it's much more complex math, but same idea!
 * 
 * STEP 4: AUTHENTICATION (Proving Who You Are)
 * ---------------------------------------------------------------------
 * Now that they have a secure, encrypted line, you need to prove you're
 * really you:
 * 
 * Server: "Who wants to connect?"
 * You: "savi"
 * Server: "Prove it!"
 * 
 * Option A - Password:
 * You send your password (now encrypted so nobody can see it)
 * Server checks if it's correct
 * 
 * Option B - SSH Key (more secure):
 * Server sends a challenge encrypted with your PUBLIC key
 * Your computer decrypts it with your PRIVATE key
 * This proves you have the private key without ever sending it!
 * 
 * STEP 5: SECURE COMMUNICATION
 * ---------------------------------------------------------------------
 * Success! Now every command you type gets:
 * 1. Encrypted using AES (like a super-strong code)
 * 2. Sent through the secure tunnel
 * 3. Decrypted by the server
 * 4. Executed
 * 5. Response encrypted and sent back
 * 
 * 
 * CHAPTER 6: SSH KEYS - THE MAGICAL KEY PAIR
 * =====================================================================
 * 
 * Instead of typing passwords, SSH can use keys - like having a magical
 * key that can't be copied!
 * 
 * THE KEY PAIR CONCEPT:
 * ---------------------------------------------------------------------
 * Imagine you have:
 * - A PUBLIC lock (you can give copies to anyone)
 * - A PRIVATE key (only YOU have it)
 * 
 * You give your public lock to the server. When you want to connect:
 * 1. Server puts a secret message in a box and locks it with YOUR lock
 * 2. Only YOUR private key can open it
 * 3. If you can open it, you must be YOU!
 * 
 * GENERATING YOUR KEY PAIR:
 * ---------------------------------------------------------------------
 * On your local computer, run:
 * 
 * ssh-keygen -t ed25519 -C "savi@my-laptop"
 * 
 * This is like asking a blacksmith to forge your magical key pair.
 * 
 * The blacksmith asks:
 * "Where should I save the keys?" (Press Enter for default)
 * "Do you want a passphrase?" (Optional password for extra security)
 * 
 * You get TWO files:
 * ~/.ssh/id_ed25519      → Your PRIVATE key (NEVER share this!)
 * ~/.ssh/id_ed25519.pub  → Your PUBLIC key (Share this with servers)
 * 
 * 
 * CHOOSING YOUR KEY TYPE:
 * ---------------------------------------------------------------------
 * Different key types are like different types of locks:
 * 
 * 🔐 RSA (Old reliable) - ssh-keygen -t rsa -b 4096
 *    - Like a heavy steel lock
 *    - Very secure with 4096 bits
 *    - Works everywhere
 * 
 * 🔑 ECDSA (Modern) - ssh-keygen -t ecdsa -b 521
 *    - Like a combination lock
 *    - Good security with smaller keys
 * 
 * ⚡ Ed25519 (Fastest & Best) - ssh-keygen -t ed25519
 *    - Like a biometric lock
 *    - Fastest, most secure, recommended!
 * 
 * 🚫 DSA (Ancient & Broken) - Don't use!
 *    - Like a lock from the 1800s - easily picked!
 * 
 * 
 * INSTALLING YOUR PUBLIC KEY ON THE SERVER:
 * ---------------------------------------------------------------------
 * Method 1: The Easy Way (ssh-copy-id)
 * ---------------------------------------------------------------------
 * ssh-copy-id -i ~/.ssh/id_ed25519.pub savi@192.168.1.100
 * 
 * This automatically:
 * - Connects to the server (you'll need password ONE LAST TIME)
 * - Creates ~/.ssh folder if needed
 * - Adds your public key to ~/.ssh/authorized_keys
 * - Sets correct permissions
 * 
 * Method 2: The Manual Way (if ssh-copy-id not available)
 * ---------------------------------------------------------------------
 * # On your local machine, view your public key:
 * cat ~/.ssh/id_ed25519.pub
 * # Copy the output (it looks like: ssh-ed25519 AAAAC3... savi@laptop)
 * 
 * # On the server:
 * mkdir -p ~/.ssh
 * echo "ssh-ed25519 AAAAC3... savi@laptop" >> ~/.ssh/authorized_keys
 * chmod 600 ~/.ssh/authorized_keys
 * chmod 700 ~/.ssh
 * 
 * 
 * NOW CONNECT WITHOUT PASSWORD:
 * ---------------------------------------------------------------------
 * ssh -i ~/.ssh/id_ed25519 savi@192.168.1.100
 * 
 * If you set a passphrase, you'll be asked for THAT (but it never
 * leaves your computer). If no passphrase, you connect instantly!
 * 
 * 
 * CHAPTER 7: SECURING YOUR SSH SERVER (Fortifying Your Castle)
 * =====================================================================
 * 
 * Now that you have key-based login working, let's make your server
 * extra secure by editing its SSH configuration:
 * 
 * sudo nano /etc/ssh/sshd_config
 * 
 * RULE 1: NO ROOT LOGIN (Never let the King log in directly)
 * ---------------------------------------------------------------------
 * Find and change:
 * PermitRootLogin no
 * 
 * Why? If hackers try to break in, they'll try "root" first. Disabling
 * root login forces them to guess a real username AND the key!
 * 
 * RULE 2: NO PASSWORDS (Keys only!)
 * ---------------------------------------------------------------------
 * Find and change:
 * PasswordAuthentication no
 * 
 * Why? Passwords can be guessed, brute-forced, or stolen. Keys are
 * virtually impossible to crack!
 * 
 * RULE 3: CHANGE THE DOOR NUMBER (Custom Port)
 * ---------------------------------------------------------------------
 * Find and change:
 * Port 2222
 * 
 * Why? Port 22 is the default SSH door. Hackers scan for it constantly.
 * Moving to a different port is like hiding your front door - they'll
 * keep knocking on the old door while you're safe!
 * 
 * 
 * APPLYING THE CHANGES:
 * ---------------------------------------------------------------------
 * # Stop the socket activation (prevents auto-start)
 * sudo systemctl stop ssh.socket
 * sudo systemctl disable ssh.socket
 * 
 * # Enable the main SSH service
 * sudo systemctl enable ssh.service
 * 
 * # Restart SSH to apply changes
 * sudo systemctl restart ssh
 * 
 * 
 * UPDATE THE FIREWALL (Tell the guards about the new door):
 * ---------------------------------------------------------------------
 * # If using UFW (Ubuntu):
 * sudo ufw allow 2222/tcp
 * sudo ufw enable
 * 
 * # If using firewalld (CentOS/RHEL):
 * sudo firewall-cmd --permanent --add-port=2222/tcp
 * sudo firewall-cmd --reload
 * 
 * # If using cloud (AWS, DigitalOcean):
 * # Go to Security Groups and add a Custom TCP rule for port 2222
 * 
 * 
 * NOW CONNECT WITH YOUR NEW SECURE SETUP:
 * ---------------------------------------------------------------------
 * ssh -i ~/.ssh/id_ed25519 -p 2222 savi@192.168.1.100
 * 
 * 
 * CHAPTER 8: REAL-LIFE STORIES
 * =====================================================================
 * 
 * STORY 1: "The Developer's Daily Work"
 * ---------------------------------------------------------------------
 * Situation: Maria needs to update code on her production server
 * 
 * Solution:
 * ssh -i ~/.ssh/production-key -p 2222 maria@api.myapp.com
 * cd /var/www/myapp
 * git pull
 * sudo systemctl restart myapp
 * 
 * All done securely in seconds!
 * 
 * STORY 2: "The Blocked Database"
 * ---------------------------------------------------------------------
 * Situation: A company blocks all external database connections, but
 * developers need to access it for debugging
 * 
 * Solution (SSH Tunneling):
 * ssh -L 3307:localhost:3306 -i ~/.ssh/db-key -p 2222 dev@dbserver.com
 * 
 * Now developers can connect to localhost:3307 on their machines, and
 * it tunnels securely to the real database on port 3306!
 * 
 * STORY 3: "The Secure File Transfer"
 * ---------------------------------------------------------------------
 * Situation: Sarah needs to send confidential client files
 * 
 * Solution (SCP - Secure Copy):
 * scp -i ~/.ssh/client-key -P 2222 confidential.pdf sarah@server:/data/
 * 
 * Files transfer with the same encryption as SSH!
 * 
 * STORY 4: "The Forgotten Key"
 * ---------------------------------------------------------------------
 * Situation: Tom lost his private key and can't connect
 * 
 * Solution (Emergency):
 * 1. Use console access from cloud provider
 * 2. Generate new key pair
 * 3. Add new public key to ~/.ssh/authorized_keys
 * 4. Remove old public key
 * 5. Revoke old key (it's now useless even if found!)
 * 
 * 
 * CHAPTER 9: QUICK REFERENCE CARD
 * =====================================================================
 * 
 * BASIC COMMANDS:
 * ---------------------------------------------------------------------
 * ssh user@host                 # Connect with default port (22)
 * ssh -p 2222 user@host         # Connect on custom port
 * ssh -i keyfile user@host      # Connect with specific key
 * 
 * KEY MANAGEMENT:
 * ---------------------------------------------------------------------
 * ssh-keygen -t ed25519         # Generate Ed25519 key (best)
 * ssh-keygen -t rsa -b 4096     # Generate RSA key
 * ssh-copy-id user@host         # Copy public key to server
 * 
 * FILE TRANSFER:
 * ---------------------------------------------------------------------
 * scp file user@host:/path/     # Copy file to server
 * scp user@host:/path/file .    # Copy file from server
 * 
 * TUNNELING:
 * ---------------------------------------------------------------------
 * ssh -L 8080:localhost:80 user@host  # Forward local port
 * 
 * SERVER CONFIGURATION (/etc/ssh/sshd_config):
 * ---------------------------------------------------------------------
 * PermitRootLogin no            # Block root login
 * PasswordAuthentication no     # Force key-based login
 * Port 2222                     # Change default port
 * 
 * 
 * THE GOLDEN RULES OF SSH:
 * =====================================================================
 * 1. NEVER share your private key (it's called PRIVATE for a reason!)
 * 2. Use keys, not passwords (so much more secure)
 * 3. Change the default port (hide from automated attacks)
 * 4. Disable root login (make them guess usernames too)
 * 5. Use passphrases on keys (extra protection if key stolen)
 * 6. Keep your system updated (ssh packages include security fixes)
 * 7. Monitor auth logs (cat /var/log/auth.log | grep "Failed")
 * 
 * AND REMEMBER: SSH is your secure tunnel through the dangerous
 * internet. Treat it with respect, secure it properly, and it will
 * keep your data safe!
 * =====================================================================
 */















/**
 * ======================================================================
 * SSH PROTOCOL — Secure Shell Complete Guide (HINGLISH VERSION)
 * ======================================================================
 * 
 * SSH (Secure Shell Protocol) ek secure tarika hai remote computer par
 * commands execute karne ka, insecure network par bhi.
 * 
 * ======================================================================
 * 📌 SSH KYA HAI? — Basic Introduction
 * ======================================================================
 * 
 * SIMPLE DEFINITION:
 *   SSH ek secure tunnel hai jiske through tum remote server se baat
 *   kar sakte ho, aur koi tumhari baat sun nahi sakta.
 * 
 * REAL LIFE EXAMPLE:
 *   Dukaan ka maalik safar par hai, lekin apne employee ko instructions
 *   dena chahta hai. Purane zamane mein wo cheekh cheekh ke bolta tha
 *   aur saara bazaar sun leta tha (Telnet/RSH). Ab wo ek secret tunnel
 *   banata hai jisme sirf wo aur employee baat kar sakte hain (SSH).
 * 
 * OLD VS NEW:
 *   ┌────────────┬────────────────────────────┬──────────────────┐
 *   │ Protocol   │ Problem                     │ Solution         │
 *   ├────────────┼────────────────────────────┼──────────────────┤
 *   │ Telnet     │ Plain text - koi bhi sun le │ ❌ Insecure      │
 *   │ RSH        │ No encryption               │ ❌ Insecure      │
 *   │ SSH        │ Encrypted + secure          │ ✅ Secure       │
 *   └────────────┴────────────────────────────┴──────────────────┘
 * 
 * ======================================================================
 * 🛡️ SSH KE 4 MAGICAL FEATURES
 * ======================================================================
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * FEATURE 1: ENCRYPTION (Encryption — Scrambling)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Tumhara data scramble ho jata hai travel karte waqt. Koi beech mein
 *   pakde to use kuch samajh nahi aata.
 * 
 * EXAMPLE:
 *   Tum type karte ho: "password123"
 *   Network par travel karta hai: "8f4d3e2a1b9c7x5v"
 *   Server par decode hota hai: "password123"
 * 
 * REAL LIFE:
 *   Do bachche apni secret language mein baat kar rahe hain. Parents
 *   sunte hain lekin samajhte nahi.
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * FEATURE 2: AUTHENTICATION (Authentication — Pehchan)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Prove karo ki tum wahi ho jo bol rahe ho.
 * 
 * DO TAREEKE:
 * 
 * a) PASSWORD LOGIN (Simple lekin kam secure)
 *    - Tum password type karte ho
 *    - Server check karta hai
 *    - Example: ssh savi@192.168.1.100 (phir password maangega)
 * 
 * b) KEY LOGIN (Zyaada secure — RECOMMENDED)
 *    - Tumhare paas ek private key hai (jaise magic key)
 *    - Server ke paas public key hai (jaise lock)
 *    - Bina password type kiye login ho jate ho
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * FEATURE 3: INTEGRITY (Integrity — Badlao Detection)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Check karta hai ki beech mein kisi ne data to nahi badla.
 * 
 * EXAMPLE:
 *   Tum bheja: "ls" (list files karo)
 *   Hacker ne badla: "rm -rf *" (sab delete karo)
 *   SSH detect karega ki data badla gaya hai aur reject kar dega.
 * 
 * REAL LIFE:
 *   Wax seal wali chithi — agar koi kholta hai to seal tooti hui
 *   dikhegi.
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * FEATURE 4: PORT FORWARDING / TUNNELING (Tunnel — Secret Rasta)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * KYA HAI:
 *   Blocked websites ya services ko access karne ka secret rasta.
 * 
 * EXAMPLE:
 *   Company ne Instagram block kar diya hai. Tum SSH tunnel banao
 *   doosre server tak. Saara Instagram traffic tunnel se guzrega,
 *   firewall sirf encrypted SSH traffic dekhega aur allow kar dega.
 * 
 * USE CASES:
 *   - Blocked websites access karna
 *   - Remote database ko local machine se access karna
 *   - Secure browser tunneling
 */

/**
 * ======================================================================
 * 🎯 SSH KE USE CASES — Kahan Use Karte Hain?
 * ======================================================================
 * 
 * USE CASE 1: REMOTE COMMAND EXECUTION
 * --------------------------------------------
 *   Duniya mein kahin se bhi apne server par command chalao.
 *   
 *   Example:
 *     ssh savi@192.168.1.100
 *     sudo systemctl restart nginx
 * 
 * USE CASE 2: SECURE FILE TRANSFER
 * --------------------------------------------
 *   Files safely bhejo ya lao.
 *   
 *   Example (SCP):
 *     scp file.txt savi@192.168.1.100:/home/savi/
 *   
 *   Example (SFTP):
 *     sftp savi@192.168.1.100
 *     put file.txt
 *     get file.txt
 * 
 * USE CASE 3: SSH TUNNELING
 * --------------------------------------------
 *   Remote database ko local access do.
 *   
 *   Example:
 *     ssh -L 3306:localhost:3306 savi@database-server.com
 *     # Ab apne computer par localhost:3306 se database access kar sakte ho
 */

/**
 * ======================================================================
 * 🔧 SSH INSTALLATION — Kaise Install Karein?
 * ======================================================================
 * 
 * LINUX:
 * --------------------------------------------
 *   # Check if installed
 *   ssh -V
 *   
 *   # Install client (connection banane ke liye)
 *   sudo apt update && sudo apt install openssh-client -y
 *   
 *   # Install server (connections accept karne ke liye)
 *   sudo apt install openssh-server -y
 *   sudo systemctl enable --now ssh
 * 
 * macOS:
 * --------------------------------------------
 *   # Usually pre-installed, check karo
 *   ssh -V
 *   
 *   # Agar nahi hai to (rare case)
 *   brew install openssh
 * 
 * WINDOWS:
 * --------------------------------------------
 *   # Check if OpenSSH is installed
 *   Get-Service -Name ssh-agent
 *   
 *   # Enable OpenSSH
 *   Add-WindowsFeature -Name OpenSSH-Client, OpenSSH-Server
 *   Start-Service ssh-agent
 *   
 *   # Alternative: Git Bash install karo (SSH included)
 */

/**
 * ======================================================================
 * 🔌 BASIC SSH CONNECTION — Pehla Connection
 * ======================================================================
 * 
 * COMMAND:
 *   ssh username@remote-ip
 * 
 * EXAMPLE:
 *   ssh savi@192.168.1.100
 * 
 * STEP-BY-STEP KYA HOTA HAI:
 * --------------------------------------------
 *   1. Tum: "Hello 192.168.1.100, baat karni hai?"
 *   2. Server: "Kaun ho tum?"
 *   3. Tum: "savi hun"
 *   4. Server: "Password batao"
 *   5. Tum: "********" (type karo)
 *   6. Server: "Sahi hai, andar aao!"
 *   7. Tum ab server mein ho!
 */

/**
 * ======================================================================
 * 🧠 SSH INTERNAL WORKING — Andar Kya Hota Hai?
 * ======================================================================
 * 
 * STEP 1: TCP 3-WAY HANDSHAKE (Basic Connection)
 * --------------------------------------------
 *   Client: "Knock knock! (SYN)"
 *   Server: "Kaun? (SYN-ACK)"
 *   Client: "Main hun! (ACK)"
 *   
 *   Ab raw connection ban gaya, lekin abhi encryption nahi hai.
 * 
 * STEP 2: PROTOCOL EXCHANGE (Introductions)
 * --------------------------------------------
 *   Server: "Main SSH-2.0-OpenSSH_8.9 bolta hun"
 *   Client: "Main bhi SSH-2.0-ClientVersion bolta hun"
 *   
 *   Dono decide karte hain kaunsa encryption use karna hai.
 * 
 * STEP 3: KEY EXCHANGE (Diffie-Hellman Magic)
 * --------------------------------------------
 *   Dono ek shared secret key banate hain bina actually key bheje!
 *   
 *   SIMPLIFIED EXAMPLE:
 *     Client: "Mera secret number 3 hai, bhej raha hun 3×7=21"
 *     Server: "Mera secret number 5 hai, bhej raha hun 5×7=35"
 *     
 *     Client: 35 (server se) × 3 (apna secret) = 105
 *     Server: 21 (client se) × 5 (apna secret) = 105
 *     
 *     Dono ke paas 105 hai, lekin kisiko pata nahi!
 * 
 *   REALITY: Complex math, but same principle.
 * 
 * STEP 4: AUTHENTICATION (Pehchan)
 * --------------------------------------------
 *   Server: "Kaun login karna chahta hai?"
 *   Client: "savi"
 *   Server: "Prove karo!"
 *   
 *   Option A - Password:
 *     Client sends encrypted password
 *     Server checks
 *   
 *   Option B - Key:
 *     Server sends challenge encrypted with client's PUBLIC key
 *     Client decrypts with PRIVATE key
 *     Proves identity without sending private key!
 * 
 * STEP 5: SECURE COMMUNICATION
 * --------------------------------------------
 *   Ab har command:
 *     1. Encrypt hoti hai (AES algorithm se)
 *     2. Secure tunnel se jaati hai
 *     3. Server decrypt karta hai
 *     4. Execute hoti hai
 *     5. Response encrypt hota hai
 *     6. Wapas aata hai
 */

/**
 * ======================================================================
 * 🔑 SSH KEY LOGIN — Password-Free Login (RECOMMENDED)
 * ======================================================================
 * 
 * KEY PAIR CONCEPT:
 * --------------------------------------------
 *   Private Key (id_ed25519)      → Apne paas rakho (kabhi share mat karo!)
 *   Public Key (id_ed25519.pub)   → Server par rakho
 * 
 * ANALOGY:
 *   Private key = tumhari magic key (sirf tumhare paas)
 *   Public key = lock (kisi ko bhi de sakte ho)
 *   
 *   Server ke paas lock hai. Jab tum connect karte ho:
 *   1. Server lock lagata hai
 *   2. Tum apni key se kholte ho
 *   3. Server ko pata chal jata hai ki tum hi ho!
 * 
 * KEY TYPES (Choose Your Weapon):
 * --------------------------------------------
 *   ┌──────────┬─────────────────┬──────────────────────────────┐
 *   │ Type     │ Command         │ Use When                      │
 *   ├──────────┼─────────────────┼──────────────────────────────┤
 *   │ Ed25519  │ ssh-keygen -t ed25519 │ FASTEST & BEST (recommended)│
 *   │ RSA      │ ssh-keygen -t rsa -b 4096 │ Old reliable, works everywhere│
 *   │ ECDSA    │ ssh-keygen -t ecdsa -b 521 │ Modern, good security     │
 *   │ DSA      │ ssh-keygen -t dsa │ ❌ DO NOT USE (insecure)    │
 *   └──────────┴─────────────────┴──────────────────────────────┘
 * 
 * GENERATE SSH KEY:
 * --------------------------------------------
 *   ssh-keygen -t ed25519 -C "savi@my-laptop"
 *   
 *   Ye puchega:
 *     "Where to save?" (Enter daba do default location)
 *     "Passphrase?" (Optional password for extra security)
 * 
 *   Do files banegi:
 *     ~/.ssh/id_ed25519      → PRIVATE KEY (MAT DO KISI KO!)
 *     ~/.ssh/id_ed25519.pub  → PUBLIC KEY (server par dalo)
 * 
 * COPY PUBLIC KEY TO SERVER:
 * --------------------------------------------
 *   Method 1 (Easy):
 *     ssh-copy-id -i ~/.ssh/id_ed25519.pub savi@192.168.1.100
 *   
 *   Method 2 (Manual):
 *     # Local machine se public key dekho
 *     cat ~/.ssh/id_ed25519.pub
 *     # Copy output (ssh-ed25519 AAAAC3... savi@laptop)
 *     
 *     # Server par:
 *     mkdir -p ~/.ssh
 *     echo "ssh-ed25519 AAAAC3... savi@laptop" >> ~/.ssh/authorized_keys
 *     chmod 600 ~/.ssh/authorized_keys
 *     chmod 700 ~/.ssh
 * 
 * CONNECT WITHOUT PASSWORD:
 * --------------------------------------------
 *   ssh -i ~/.ssh/id_ed25519 savi@192.168.1.100
 *   
 *   Agar passphrase diya tha to wo maangega, nahi to direct login!
 */

/**
 * ======================================================================
 * 🏰 SECURING SSH SERVER — Apne Server Ko Fortify Karna
 * ======================================================================
 * 
 * CONFIGURATION FILE:
 *   /etc/ssh/sshd_config
 *   
 *   Edit karo:
 *   sudo nano /etc/ssh/sshd_config
 * 
 * SECURITY RULES:
 * --------------------------------------------
 * 
 * RULE 1: DISABLE ROOT LOGIN
 *   PermitRootLogin no
 *   
 *   Kyun? Hackers pehle "root" try karte hain. Disable karoge to unhe
 *   username bhi guess karna padega.
 * 
 * RULE 2: DISABLE PASSWORD AUTHENTICATION
 *   PasswordAuthentication no
 *   
 *   Kyun? Keys zyaada secure hain. Passwords guess ho sakte hain.
 * 
 * RULE 3: CHANGE DEFAULT PORT
 *   Port 2222
 *   
 *   Kyun? Port 22 default hai, hackers continuously scan karte hain.
 *   Port badaloge to woh purani jagah kootte rahenge, tum safe!
 * 
 * APPLY CHANGES:
 * --------------------------------------------
 *   # Stop socket activation
 *   sudo systemctl stop ssh.socket
 *   sudo systemctl disable ssh.socket
 *   
 *   # Enable main service
 *   sudo systemctl enable ssh.service
 *   
 *   # Restart SSH
 *   sudo systemctl restart ssh
 * 
 * UPDATE FIREWALL:
 * --------------------------------------------
 *   # UFW (Ubuntu)
 *   sudo ufw allow 2222/tcp
 *   sudo ufw enable
 *   
 *   # firewalld (CentOS/RHEL)
 *   sudo firewall-cmd --permanent --add-port=2222/tcp
 *   sudo firewall-cmd --reload
 *   
 *   # Cloud (AWS, DigitalOcean)
 *   Security Group mein Custom TCP rule add karo for port 2222
 * 
 * CONNECT WITH NEW SETUP:
 * --------------------------------------------
 *   ssh -i ~/.ssh/id_ed25519 -p 2222 savi@192.168.1.100
 */

/**
 * ======================================================================
 * 📋 SSH COMMANDS CHEAT SHEET
 * ======================================================================
 * 
 * BASIC CONNECTION:
 * --------------------------------------------
 *   ssh user@host                    # Default port 22
 *   ssh -p 2222 user@host            # Custom port
 *   ssh -i keyfile user@host         # Specific key
 *   ssh -v user@host                  # Verbose (debug ke liye)
 * 
 * KEY MANAGEMENT:
 * --------------------------------------------
 *   ssh-keygen -t ed25519             # Ed25519 key (best)
 *   ssh-keygen -t rsa -b 4096         # RSA key
 *   ssh-copy-id user@host             # Copy public key to server
 *   ssh-add ~/.ssh/id_ed25519         # Add key to agent
 * 
 * FILE TRANSFER:
 * --------------------------------------------
 *   scp file.txt user@host:/path/     # Copy file TO server
 *   scp user@host:/path/file.txt .    # Copy file FROM server
 *   scp -P 2222 file.txt user@host:/path/  # Custom port (-P, note capital!)
 *   sftp user@host                    # Interactive file transfer
 * 
 * TUNNELING:
 * --------------------------------------------
 *   ssh -L 8080:localhost:80 user@host     # Local port forward
 *   ssh -R 8080:localhost:80 user@host     # Remote port forward
 *   ssh -D 1080 user@host                   # SOCKS proxy
 * 
 * SERVER CONFIG (/etc/ssh/sshd_config):
 * --------------------------------------------
 *   PermitRootLogin no                 # Block root login
 *   PasswordAuthentication no           # Force keys only
 *   Port 2222                          # Change default port
 *   AllowUsers savi john                # Sirf specific users allow
 *   DenyUsers hackerman                 # Specific users block
 * 
 * TROUBLESHOOTING:
 * --------------------------------------------
 *   ssh -vvv user@host                  # Maximum debug
 *   tail -f /var/log/auth.log           # Live auth logs
 *   journalctl -u ssh -f                 # SSH service logs
 *   ssh-keygen -R hostname               # Remove host from known_hosts
 */

/**
 * ======================================================================
 * 🎭 REAL-LIFE STORIES
 * ======================================================================
 * 
 * STORY 1: "The Developer's Daily Grind"
 * --------------------------------------------
 *   Maria ko production server par code update karna hai.
 *   
 *   Solution:
 *     ssh -i ~/.ssh/prod-key -p 2222 maria@api.myapp.com
 *     cd /var/www/app
 *     git pull
 *     sudo systemctl restart app
 *   
 *   Seconds mein ho gaya, securely!
 * 
 * STORY 2: "The Blocked Database"
 * --------------------------------------------
 *   Company ne external database connections block kar diye, but devs ko
 *   debugging ke liye access chahiye.
 *   
 *   Solution (SSH Tunneling):
 *     ssh -L 3307:localhost:3306 -i ~/.ssh/db-key -p 2222 dev@dbserver.com
 *     
 *     Ab localhost:3307 connect karo to securely tunnel hokar real
 *     database par pahunchega!
 * 
 * STORY 3: "The Secure File Transfer"
 * --------------------------------------------
 *   Sarah ko confidential client files bhejni hain.
 *   
 *   Solution (SCP):
 *     scp -i ~/.ssh/client-key -P 2222 confidential.pdf sarah@server:/data/
 *     
 *     Files SSH encryption ke saath transfer hoti hain!
 * 
 * STORY 4: "The Forgotten Key"
 * --------------------------------------------
 *   Tom ne apni private key kho di aur connect nahi kar pa raha.
 *   
 *   Solution (Emergency):
 *     1. Cloud provider ka console access use karo
 *     2. Naya key pair generate karo
 *     3. Naya public key ~/.ssh/authorized_keys mein add karo
 *     4. Purana public key hatao
 *     5. Purani key ab bekar ho gayi (bhale hi kisi ko mil jaye)
 */

/**
 * ======================================================================
 * ⚠️ COMMON MISTAKES & SOLUTIONS
 * ======================================================================
 * 
 * MISTAKE 1: Permission denied (publickey)
 * --------------------------------------------
 *   ERROR: Permission denied (publickey)
 *   
 *   REASONS:
 *     - Private key permissions too open
 *     - Wrong key used
 *     - Public key not in authorized_keys
 *   
 *   SOLUTION:
 *     chmod 600 ~/.ssh/id_ed25519
 *     ssh -i correct-key user@host
 *     Check server's ~/.ssh/authorized_keys
 * 
 * MISTAKE 2: Connection refused
 * --------------------------------------------
 *   ERROR: Connection refused
 *   
 *   REASONS:
 *     - SSH server not running
 *     - Wrong port
 *     - Firewall blocking
 *   
 *   SOLUTION:
 *     sudo systemctl status ssh
 *     Check port in ssh command
 *     Check firewall rules
 * 
 * MISTAKE 3: Host key verification failed
 * --------------------------------------------
 *   ERROR: WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED
 *   
 *   REASON:
 *     Server changed (reinstall, new IP)
 *   
 *   SOLUTION:
 *     ssh-keygen -R hostname
 *     Then connect again
 * 
 * MISTAKE 4: Private key permissions too open
 * --------------------------------------------
 *   ERROR: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *          Permissions 0777 for 'id_rsa' are too open.
 *   
 *   SOLUTION:
 *     chmod 600 ~/.ssh/id_ed25519
 */

/**
 * ======================================================================
 * 📚 SSH FILES & THEIR MEANING
 * ======================================================================
 * 
 * CLIENT SIDE (~/.ssh/):
 * --------------------------------------------
 *   id_ed25519              # Private key (secret, 600 permissions)
 *   id_ed25519.pub          # Public key (can share)
 *   known_hosts             # Known servers ki fingerprints
 *   config                  # Host-specific configurations
 * 
 * SERVER SIDE (~/.ssh/):
 * --------------------------------------------
 *   authorized_keys         # Authorized public keys
 *   
 * SERVER CONFIGURATION:
 * --------------------------------------------
 *   /etc/ssh/sshd_config    # Server configuration
 *   /etc/ssh/ssh_config     # Client configuration (global)
 *   /var/log/auth.log       # Authentication logs
 * 
 * ======================================================================
 * 🎓 SSH GOLDEN RULES
 * ======================================================================
 * 
 * 1. ❌ NEVER share your private key (PRIVATE hai isliye private key!)
 * 2. ✅ Use keys, not passwords (bahut zyaada secure)
 * 3. ✅ Change default port (automated attacks se bacho)
 * 4. ✅ Disable root login (usernames bhi guess karne padein)
 * 5. ✅ Use passphrases on keys (extra protection)
 * 6. ✅ Keep system updated (security fixes)
 * 7. ✅ Monitor auth logs regularly
 * 8. ✅ Use ssh-agent to avoid typing passphrases repeatedly
 * 
 * MONITORING COMMANDS:
 * --------------------------------------------
 *   tail -f /var/log/auth.log           # Live auth log
 *   grep "Failed" /var/log/auth.log      # Failed attempts
 *   last                                 # Last logins
 *   lastb                                # Failed logins
 * 
 * ======================================================================
 * 🚀 ADVANCED SSH TIPS
 * ======================================================================
 * 
 * SSH CONFIG FILE (~/.ssh/config):
 * --------------------------------------------
 *   Host myserver
 *       HostName 192.168.1.100
 *       User savi
 *       Port 2222
 *       IdentityFile ~/.ssh/id_ed25519
 *   
 *   Ab bas: ssh myserver
 * 
 * SSH AGENT (Passphrase save karo):
 * --------------------------------------------
 *   eval $(ssh-agent -s)
 *   ssh-add ~/.ssh/id_ed25519
 *   # Ab ek baar passphrase, baar baar nahi
 * 
 * SSH COPY (with progress):
 * --------------------------------------------
 *   rsync -avz -e ssh file.txt user@host:/path/
 * 
 * SSH JUMP HOST (Through another server):
 * --------------------------------------------
 *   ssh -J jump-user@jump-host target-user@target-host
 * 
 * ======================================================================
 * ✅ SUMMARY
 * ======================================================================
 * 
 * SSH ek secure tunnel hai jo:
 *   - Data encrypt karta hai (koi sun nahi sakta)
 *   - Identity verify karta hai (tum hi ho)
 *   - Integrity check karta hai (data badla nahi)
 *   - Port forward kar sakta hai (blocked access)
 * 
 * YAAD RAKHNE WALI BAATEIN:
 *   - Keys use karo, passwords nahi
 *   - Private key kabhi share mat karo
 *   - Default port change karo
 *   - Root login disable karo
 *   - Regular logs check karo
 * 
 * JAB DOUBT HO:
 *   ssh -vvv user@host  # Verbose mode debug ke liye
 * 
 * ======================================================================
 */