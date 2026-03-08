/**
 * User Management in Linux:
 * > User management in Linux involves creating, modifying, and deleting
 *   user accounts, as well as controlling their permissions and access 
 *   to system resources.
 * > A user in Linux is an entity that can create, modify, and delete 
 *   resources, and perform other actions.
 * 
 * > Each user has a unique User ID (UID)
 *   - Root User UID = 0
 *   - System Users UID = 1 to 999 (inclusive)
 *   - Local Users UID > 999
 * 
 * Question: 
 * Does this mean we can't create more than 1000 system users in Linux?
 * 
 * Answer: 
 * > No, the system allows more than 1000 system users. 
 * > The range UID 1 to 999 is reserved for system users, but if you try
 *   to add more, new system users will get a UID above 1000.
 * 
 * > You can create up to 60,000 users in a single directory.
 * 
 * > Root user is not used for everyday tasks. 
 * > Normal users can gain root access through sudo.
 * 
 * > By creating individual users, you can control who has access to the
 *   system and what they can do.
 * 
 * > Each user has their own permissions for files, directories, and 
 *   resources.
 * 
 * > Users' actions are tracked, and if something goes wrong, you can 
 *   check logs to see which user performed a certain action.
*/


/** 
 * Example:
 * 
 * a. To list out all the users in Linux
 *    awk -F':' '{ print $1}' /etc/passwd
 * 
 * b. id username
 *    id username
 * 
 * c. Add New User Low Level
 *    sudo useradd username
 * 
 * d. Add User alternative command - High Level
 *    sudo adduser username
 * 
 * e. Delete a User
 *    sudo userdel -r username
 * 
 * f. Assing Password to usernamer
 *    passwd username
 * 
 * g. Access User Configuartion
 *    cat /etc/passwd
 * 
 * h. Change Userid for the User
 *    cat /etc/passwd
 * 
 * i. Modify the Group Id of the User
 *    usermod -g new_group_id username
 * 
 * j. Change user login name
 *    sudo usermod -l new_login_name old_login_name
 * 
 * k. Change Home Directory
 *    usermod -d new_home_directory_path username
*/




/**
 * =====================================================================
 * THE KINGDOM'S CITIZENS: A STORY OF USER MANAGEMENT
 * =====================================================================
*/

/**
 * CHAPTER 1: WELCOME TO THE KINGDOM
 * > Imagine Linux is a vast kingdom, and every person who lives here is
 *   called a USER. Just like in a real kingdom, each citizen has:
 *   - 🏠 A HOME (home directory) - Their personal castle
 *   - 🪪 An ID CARD (UID)        - Their unique identification number
 *   - 👥 TEAMS (groups)          - The communities they belong to
 *   - 🔑 A SECRET KEY (password) - To prove who they are
*/

/**
 * CHAPTER 2: THE THREE TYPES OF CITIZENS
 * 1. THE KING (Root User - UID 0)
 *    - The most powerful being in the kingdom
 *    - Can do ANYTHING anywhere
 *    - Never used for everyday tasks (too dangerous!)
 *    - Like having a nuclear launch button - you don't press it daily
 *    - UID = 0 (the number of ultimate power)
 * 
 * 2. THE SYSTEM CITIZENS (System Users - UID 1 to 999)
 *    - Not real people - they're like robots or ghosts
 *    - Run background services (web servers, databases, etc.)
 *    - You never log in as them
 *    - Example: www-data (runs websites), mysql (runs databases)
 *    - They're like invisible helpers maintaining the kingdom
 * 
 * 3. THE REGULAR CITIZENS (Local Users - UID 1000+)
 *    - Real people like you and me
 *    - Have their own homes (directories)
 *    - Can create files, run programs
 *    - Need special permission (sudo) to do important things
 *    - UID starts from 1000 (like house numbers starting from 1000)
*/


/** 
 * CHAPTER 3: THE GREAT CITIZEN REGISTRY (/etc/passwd)
 * The kingdom maintains a giant book called "/etc/passwd" that lists
 * EVERY citizen. Each citizen has one line that looks like this:
 * 
 * john:x:1000:1000:John Doe:/home/john:/bin/bash
 *  │   │  │    │      │         │           │
 *  │   │  │    │      │         │           └── Shell (their favorite way to talk)
 *  │   │  │    │      │         └── Home directory (their castle)
 *  │   │  │    │      └── Full name (their real name)
 *  │   │  │    └── Group ID (their main team number)
 *  │   │  └── User ID (their unique ID number)
 *  │   └── Password placeholder (x means password is in another file)
 *  └── Username (what everyone calls them)
 * 
 * To peek at this book:
 * cat /etc/passwd              # See all citizens
 * awk -F':' '{ print $1}' /etc/passwd  # Just see their names
 * 
*/

/** 
 * CHAPTER 4: THE PASSWORD VAULT (/etc/shadow)
 * The kingdom keeps all passwords in a SECRET vault called 
 * "/etc/shadow" that only the King can read. It contains:
 * 
 * john:$6$something...:18937:0:99999:7:::
 * 
 * This is like having your passwords in a safe - nobody can see them,
 * not even you! (for security)
*/

/** 
 * CHAPTER 5: MEETING THE CITIZENS (Commands to Explore)
 * 
 * 1. "Who am I?" commands:
 * ---------------------------------------------------------------------
 * whoami     # Tells you your current username
 *            # Like looking in a mirror
 * 
 * id         # Shows your full identity card
 *            # Example output: uid=1000(john) gid=1000(john) groups=1000(john),4(adm)
 *            # This says: I'm John, ID 1000, in the adm team too
 * 
 * groups     # Shows all the teams you belong to
 *            # Like listing all your club memberships
 * 
 * 2. "Who else lives here?" commands:
 * ---------------------------------------------------------------------
 * ls /home   # See all citizens' homes
 *            # Every real person gets a folder here
 * 
 * cat /etc/passwd | cut -d: -f1  # List all usernames
 *            # Like reading the kingdom's census
*/

/** 
 * CHAPTER 6: CREATING NEW CITIZENS (The Birth of a User)
 * 
 * The kingdom has TWO ways to create new citizens, like having two
 * different baby delivery methods:
 * 
 * METHOD 1: THE SIMPLE WAY (useradd - Low Level)
 * ---------------------------------------------------------------------
 * sudo useradd alex
 * 
 * This is like saying "Here's a new person, figure out the details":
 * ✓ Creates the citizen (adds to /etc/passwd)
 * ✓ Assigns next available UID (probably 1001)
 * ✓ Creates a group with same name
 * ✗ NO home directory (they're homeless!)
 * ✗ NO password (they can't speak!)
 * ✗ NO files copied from /etc/skel (they have no furniture!)
 * 
 * You'd need to do everything manually:
 * sudo passwd alex           # Give them a voice
 * sudo mkdir /home/alex      # Build them a house
 * sudo cp -r /etc/skel/. /home/alex/  # Add furniture
 * sudo chown -R alex:alex /home/alex  # Give them the keys
 * 
 * METHOD 2: THE COMPLETE WAY (adduser - High Level)
 * ---------------------------------------------------------------------
 * sudo adduser alex
 * 
 * This is like a full citizenship ceremony:
 * ✓ Creates the citizen
 * ✓ Builds their home (/home/alex)
 * ✓ Copies furniture from /etc/skel
 * ✓ Asks for their password
 * ✓ Asks for their full name
 * ✓ Sets up everything automatically!
 * 
 * It will ask you:
 * Enter new password: ********
 * Full name: Alex Smith
 * Room number: 
 * Work phone: 
 * Home phone: 
 * Other: 
 * Is this correct? Y
 * 
 * RECOMMENDATION: Always use adduser for real people!
*/

/** 
 * CHAPTER 7: THE MAGICAL TEMPLATE (/etc/skel)
 * 
 * When new citizens are born, the kingdom gives them starter furniture
 * from a magical template folder called "/etc/skel".
 * 
 * ls -la /etc/skel/
 * .bashrc       # Their personal rules for talking
 * .profile      # Their startup routine
 * .bash_logout  # Their goodbye routine
 * 
 * Every new home gets copies of these files automatically!
*/

/** 
 * CHAPTER 8: CHANGING CITIZEN DETAILS (usermod - The Transformation)
 * 
 * Sometimes citizens need to change:
 * 
 * 1. Change their name (username):
 * ---------------------------------------------------------------------
 * sudo usermod -l newname oldname
 *    │          │  │       │
 *    │          │  │       └── Old username
 *    │          │  └── New username
 *    │          └── -l stands for "login" (new login name)
 *    └── Command
 * 
 * Example: sudo usermod -l alexander alex
 * Alex wants to be called Alexander now
 * 
 * 2. Give them a new ID card (change UID):
 * ---------------------------------------------------------------------
 * sudo usermod -u 2000 username
 *    │          │  │    │
 *    │          │  │    └── Their username
 *    │          │  └── New UID number
 *    │          └── -u stands for "user ID"
 *    └── Command
 * 
 * ⚠️ WARNING: If you change their ID, all their files still have the
 *    old ID! Fix with: sudo find /home/username -user oldid -exec chown newid {} \;
 * 
 * 3. Move them to a new house (change home directory):
 * ---------------------------------------------------------------------
 * sudo usermod -d /new/home/path -m username
 *    │          │  │              │  │
 *    │          │  │              │  └── Their username
 *    │          │  │              └── -m means "move contents"
 *    │          │  └── New home path
 *    │          └── -d stands for "home directory"
 *    └── Command
 * 
 * Example: sudo usermod -d /home/alexander -m alexander
 * 
 * 4. Change their main team (primary group):
 * ---------------------------------------------------------------------
 * sudo usermod -g newgroup username
 *    │          │  │        │
 *    │          │  │        └── Their username
 *    │          │  └── New group name or ID
 *    │          └── -g (lowercase) = primary group
 *    └── Command
 * 
 * 5. Add them to extra teams (secondary groups):
 * ---------------------------------------------------------------------
 * sudo usermod -G group1,group2 username
 *    │          │  │              │
 *    │          │  │              └── Their username
 *    │          │  └── Comma-separated list of groups
 *    │          └── -G (uppercase) = secondary groups
 *    └── Command
 * 
 * ⚠️ This REPLACES all secondary groups! To ADD without removing:
 * sudo usermod -aG group1,group2 username
 *    │          ││
 *    │          │└── -G for groups
 *    │          └── -a for "append" (add, don't replace)
 *    └── Command
 */

/** 
 * CHAPTER 9: SECRET PASSWORDS (passwd)
 * 
 * To give someone a password or change it:
 * 
 * passwd                # Change YOUR OWN password
 *    │
 *    └── It will ask for: Current password, New password, Confirm
 * 
 * sudo passwd username  # Change SOMEONE ELSE's password (as king)
 *    │    │      │
 *    │    │      └── The user whose password to change
 *    │    └── The password command
 *    └── As superuser
 * 
 * Password rules the kingdom follows:
 * - Minimum length (usually 8 characters)
 * - Mix of letters, numbers, symbols
 * - Not too simple (not "password123")
 */

/** 
 * CHAPTER 10: REMOVING CITIZENS (userdel - The Sad Day)
 * 
 * When someone leaves the kingdom forever:
 * 
 * sudo userdel username
 *    │      │    │
 *    │      │    └── Username to delete
 *    │      └── Delete user command
 *    └── As superuser
 * 
 * This removes them from /etc/passwd but leaves:
 * ✓ Their home directory (their castle still stands)
 * ✓ Their files (their belongings remain)
 * ✓ Their mail (their letters stay)
 * 
 * To clean up EVERYTHING:
 * sudo userdel -r username
 *    │      │ │  │
 *    │      │ │  └── Username
 *    │      │ └── -r means "remove everything"
 *    │      └── Delete user command
 *    └── As superuser
 * 
 * This removes:
 * ✓ Their entry from /etc/passwd
 * ✓ Their home directory (castle demolished)
 * ✓ Their mail spool (letters thrown away)
 * ✓ All their files (belongings gone)
 */

/** 
 * CHAPTER 11: THE UID MYSTERY (Can we run out of IDs?)
 * 
 * Question: "Can we create more than 1000 system users?"
 * 
 * Think of UIDs like apartment numbers:
 * - 0: The King's palace (only one)
 * - 1-999: Reserved for staff apartments (system services)
 * - 1000-60000: Regular citizen apartments
 * 
 * But what if we need more than 999 staff?
 * They just move into regular apartments! Like hiring more staff
 * than you have staff housing - they live in regular houses.
 * 
 * The kingdom can have up to 60,000 citizens total in one directory!
 * (That's like a small city)
 */

/** 
 * CHAPTER 12: REAL-LIFE STORIES
 * 
 * STORY 1: "The New Team Member"
 * ---------------------------------------------------------------------
 * Situation: Sarah joins the development team
 * 
 * Solution:
 * sudo adduser sarah
 * sudo passwd sarah
 * sudo usermod -aG developers sarah
 * 
 * Result: Sarah has her own home, can join the developers team
 * 
 * STORY 2: "The Name Change"
 * ---------------------------------------------------------------------
 * Situation: John got married and changed his name to Jane
 * 
 * Solution:
 * sudo usermod -l jane john           # Change username
 * sudo usermod -d /home/jane -m jane  # Move home directory
 * sudo groupmod -n jane john          # Rename their group too
 * 
 * STORY 3: "The Departed Employee"
 * ---------------------------------------------------------------------
 * Situation: Bob leaves the company
 * 
 * Solution:
 * sudo userdel -r bob
 * 
 * Result: Bob's account and all files are gone
 * 
 * STORY 4: "The Forgotten Password"
 * ---------------------------------------------------------------------
 * Situation: Alice forgot her password
 * 
 * Solution:
 * sudo passwd alice
 * (Set a new temporary password)
 * 
 * Then tell Alice: "Your new password is Temp123!, change it immediately"
 */

/** 
 * CHAPTER 13: QUICK REFERENCE CARD
 * 
 * COMMAND                    WHAT IT DOES
 * --------                   -------------
 * sudo adduser john          Create new user (recommended)
 * sudo useradd john          Create new user (bare bones)
 * sudo passwd john           Set/change password
 * sudo userdel john          Delete user
 * sudo userdel -r john       Delete user AND their files
 * id john                    Show user's identity
 * groups john                Show user's teams
 * whoami                     Show current user
 * 
 * USER MODIFICATION:
 * ---------------------------------------------------------------------
 * sudo usermod -l new old                # Rename user
 * sudo usermod -u 2000 john              # Change UID
 * sudo usermod -d /new/home -m john      # Move home
 * sudo usermod -g groupname john         # Change main group
 * sudo usermod -aG group1,group2 john    # Add to extra groups
 * 
 * VIEWING USERS:
 * ---------------------------------------------------------------------
 * cat /etc/passwd              # See all users
 * awk -F':' '{print $1}' /etc/passwd  # Just usernames
 * ls /home/                    # See user home folders
 */

/** 
 * CHAPTER 14: IMPORTANT FILES LOCATIONS
 * 
 * FILE                       PURPOSE
 * ----                       -------
 * /etc/passwd                The citizen registry
 * /etc/shadow                The password vault (super secret)
 * /etc/group                 The team registry
 * /etc/skel/                 The furniture template
 * /home/username/            The citizen's home
 * /var/spool/mail/username   Their mailbox
 */

/** 
 * THE GOLDEN RULES OF USER MANAGEMENT:
 * 1. Never log in as root (the King) for daily tasks
 * 2. Use sudo when you need temporary superpowers
 * 3. Always use adduser (not useradd) for real people
 * 4. Give people the least access they need
 * 5. Remove users immediately when they leave
 * 6. Make them change temporary passwords on first login
 * 7. Remember: with great power comes great responsibility!
 * 
 * AND REMEMBER: Every user is a citizen of your kingdom. Treat them
 * well, give them proper homes, and keep good records!
 * =====================================================================
 */




/**
 * ======================================================================
 * LINUX USER MANAGEMENT — Users, Groups, Permissions (HINGLISH VERSION)
 * ======================================================================
 * 
 * USER MANAGEMENT KYA HAI?
 * ────────────────────────
 * Linux mein user management ka matlab hai user accounts create karna,
 * modify karna, delete karna, aur unki permissions ko control karna.
 * 
 * User ek entity hai jo resources create, modify, delete kar sakta hai,
 * aur doosre actions perform kar sakta hai.
 * 
 * ======================================================================
 * USER ID (UID) — Har user ka unique number
 * ======================================================================
 * 
 * Har user ka ek unique ID number hota hai:
 * 
 * ┌──────────────┬────────────────┬─────────────────────────────┐
 * │ UID Range    │ User Type      │ Description                  │
 * ├──────────────┼────────────────┼─────────────────────────────┤
 * │ 0            │ Root User      │ King of the kingdom          │
 * │ 1 - 999      │ System Users   │ Background services ke liye  │
 * │ 1000+        │ Local Users    │ Real people (like hum)       │
 * └──────────────┴────────────────┴─────────────────────────────┘
 * 
 * QUESTION: "Kya hum 1000 se zyada system users create nahi kar sakte?"
 * 
 * ANSWER: 
 *   > System allows 1000+ system users.
 *   > UID 1-999 system users ke liye reserved hai, lekin agar aap
 *     zyada add karoge to new system users ko UID 1000+ milega.
 *   > Ek directory mein 60,000 users tak create kar sakte ho.
 * 
 * ======================================================================
 * ROOT USER (UID 0) — The King
 * ======================================================================
 * 
 * Root user sabse powerful hota hai:
 * ✓ Kuch bhi kar sakta hai, kahin bhi
 * ✗ Everyday tasks ke liye use nahi karte (bahut dangerous!)
 * ✓ Normal users sudo through root access le sakte hain
 * 
 * Like having a nuclear button - daily use nahi karte!
 * 
 * ======================================================================
 * IMPORTANT FILES — Jahan user info store hoti hai
 * ======================================================================
 * 
 * ┌───────────────┬─────────────────────────────────────────────┐
 * │ File          │ Kya hota hai                                 │
 * ├───────────────┼─────────────────────────────────────────────┤
 * │ /etc/passwd   │ Citizen registry - saare users ki list       │
 * │ /etc/shadow   │ Password vault - secret passwords           │
 * │ /etc/group    │ Team registry - groups ki list               │
 * │ /etc/skel/    │ Furniture template - new users ke liye      │
 * │ /home/username│ Har user ka personal castle                  │
 * └───────────────┴─────────────────────────────────────────────┘
 * 
 * ======================================================================
 * THE CITIZEN REGISTRY (/etc/passwd)
 * ======================================================================
 * 
 * Har user ki ek line hoti hai is file mein:
 * 
 * john:x:1000:1000:John Doe:/home/john:/bin/bash
 *  │   │  │    │      │         │           │
 *  │   │  │    │      │         │           └── Shell (unka favorite tarika baat karne ka)
 *  │   │  │    │      │         └── Home directory (unka castle)
 *  │   │  │    │      └── Full name (asli naam)
 *  │   │  │    └── Group ID (main team number)
 *  │   │  └── User ID (unique ID)
 *  │   └── Password placeholder (x means password doosri file mein)
 *  └── Username (sab unhe is naam se pukarte hain)
 * 
 * Dekhne ke liye:
 *   cat /etc/passwd                    # Saare users dekho
 *   awk -F':' '{ print $1}' /etc/passwd # Sirf naam dekho
 * 
 * ======================================================================
 * COMMANDS — Users ke saath kya kar sakte ho
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. List all users — Saare users ki list                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: awk -F':' '{ print $1}' /etc/passwd                    │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   awk -F':' '{ print $1}' /etc/passwd    → Saare usernames      │
 * │   cut -d: -f1 /etc/passwd                 → Same kaam (alt)     │
 * │   compgen -u                              → Another method      │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. id — User ki identity dekho                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: id username                                            │
 * │                                                                 │
 * │ Example:                                                        │
 * │   id john                                                       │
 * │   Output: uid=1000(john) gid=1000(john) groups=1000(john),4(adm)│
 * │   → UID, GID, aur groups dikhta hai                             │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Add New User (Low Level) — useradd                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo useradd username                                  │
 * │                                                                 │
 * │ Kya karta hai: Sirf basic entry banata hai.                    │
 * │ ✓ /etc/passwd mein entry add karega                             │
 * │ ✓ Next available UID assign karega                              │
 * │ ✓ Same name ka group create karega                              │
 * │ ✗ NO home directory (homeless!)                                 │
 * │ ✗ NO password (unable to speak!)                                │
 * │ ✗ NO files from /etc/skel (no furniture!)                       │
 * │                                                                 │
 * │ Manual extra kaam:                                              │
 * │   sudo passwd username           # Password do                   │
 * │   sudo mkdir /home/username      # Ghar banao                   │
 * │   sudo cp -r /etc/skel/. /home/username/  # Furniture do        │
 * │   sudo chown -R username:username /home/username  # Keys do     │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Add New User (High Level) — adduser                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo adduser username                                  │
 * │                                                                 │
 * │ Kya karta hai: Sab kuch automatically kar deta hai.            │
 * │ ✓ User create karega                                            │
 * │ ✓ Home directory bana dega (/home/username)                     │
 * │ ✓ /etc/skel se furniture copy karega                            │
 * │ ✓ Password set karne ko bolega                                  │
 * │ ✓ Full name aur details puchega                                 │
 * │                                                                 │
 * │ Ye puchta hai:                                                  │
 * │   Enter new password: ********                                  │
 * │   Full name: Rahul Sharma                                       │
 * │   Room number:                                                  │
 * │   Work phone:                                                   │
 * │   Home phone:                                                   │
 * │   Other:                                                        │
 * │   Is this correct? Y                                            │
 * │                                                                 │
 * │ ⭐ RECOMMENDATION: Real people ke liye adduser use karo!        │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Delete a User — userdel                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo userdel username                                  │
 * │                                                                 │
 * │ Kya karta hai: User ko /etc/passwd se hata deta hai.            │
 * │ ✗ Home directory reh jati hai (castle khadi hai)               │
 * │ ✗ Files reh jati hain                                           │
 * │ ✗ Mail reh jata hai                                             │
 * │                                                                 │
 * │ Sab kuch hatane ke liye:                                        │
 * │   sudo userdel -r username                                      │
 * │   │           │ │                                                │
 * │   │           │ └── -r = remove everything (home, mail, files) │
 * │   │           └── Delete user command                           │
 * │   └── As superuser                                              │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. Assign Password — passwd                                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: passwd username                                        │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   passwd                # Apna password change karo             │
 * │   sudo passwd username  # Doosre ka password change karo        │
 * │                                                                 │
 * │ Ye puchega:                                                     │
 * │   Current password: (agar apna change kar rahe ho)             │
 * │   New password:                                                 │
 * │   Retype new password:                                          │
 * │                                                                 │
 * │ Password rules:                                                 │
 * │   - Minimum 8 characters                                        │
 * │   - Mix of letters, numbers, symbols                            │
 * │   - Not too simple ("password123" reject karega)                │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. View User Configuration — /etc/passwd                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: cat /etc/passwd                                        │
 * │                                                                 │
 * │ Example:                                                        │
 * │   cat /etc/passwd | grep john    # Sirf john ki entry dekho     │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 8. Change User ID — usermod -u                                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo usermod -u new_uid username                       │
 * │                                                                 │
 * │ Example:                                                        │
 * │   sudo usermod -u 2000 john    # John ka UID 2000 karo         │
 * │                                                                 │
 * │ ⚠️ WARNING: Agar UID badalte ho to files ka bhi UID badalna    │
 * │    padta hai:                                                   │
 * │   sudo find /home/john -user old_uid -exec chown new_uid {} \; │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 9. Change Group ID — usermod -g                                 │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo usermod -g new_group_id username                  │
 * │                                                                 │
 * │ Example:                                                        │
 * │   sudo usermod -g 2000 john    # John ka primary group 2000 karo│
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 10. Change Username — usermod -l                                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo usermod -l new_login_name old_login_name         │
 * │                                                                 │
 * │ Example:                                                        │
 * │   sudo usermod -l johnny john    # John ab Johnny ho gaya      │
 * │                                                                 │
 * │ Note: Sirf username badalta hai, home directory nahi.          │
 * │ Home directory bhi badalni ho to:                               │
 * │   sudo usermod -d /home/johnny -m johnny                        │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 11. Change Home Directory — usermod -d                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: sudo usermod -d new_home_path -m username             │
 * │                                                                 │
 * │ Example:                                                        │
 * │   sudo usermod -d /home/johnny -m johnny   # Ghar shift karo   │
 * │   │           │  │             │   │                            │
 * │   │           │  │             │   └── -m = move contents      │
 * │   │           │  │             └── Username                     │
 * │   │           │  └── New home path                              │
 * │   │           └── -d = home directory                           │
 * │   └── Command                                                   │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 12. Add to Groups — usermod -G / -aG                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Secondary groups add karne ke liye:                             │
 * │   sudo usermod -aG group1,group2 username                       │
 * │   │           ││   │              │                             │
 * │   │           ││   │              └── Username                  │
 * │   │           ││   └── Comma-separated groups                   │
 * │   │           │└── -G = secondary groups                        │
 * │   │           └── -a = append (add, don't replace)              │
 * │   └── Command                                                   │
 * │                                                                 │
 * │ Example:                                                        │
 * │   sudo usermod -aG docker,sudo john    # John ko docker,sudo add│
 * │                                                                 │
 * │ ⚠️ WARNING: Bina -a ke use karoge to saari purani groups        │
 * │    remove ho jayengi!                                           │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ======================================================================
 * THE MAGICAL TEMPLATE (/etc/skel)
 * ======================================================================
 * 
 * Jab naye user create hote hain, unhe /etc/skel se furniture milta hai:
 * 
 * ls -la /etc/skel/
 *   .bashrc       # Unke bolne ke rules
 *   .profile      # Startup routine
 *   .bash_logout  # Goodbye routine
 * 
 * Har naye ghar mein ye files automatically copy ho jati hain!
 * 
 * ======================================================================
 * REAL-LIFE STORIES
 * ======================================================================
 * 
 * STORY 1: "Naya Team Member"
 * ---------------------------------------------------------------------
 * Situation: Rahul development team join karta hai
 * 
 * Solution:
 *   sudo adduser rahul
 *   sudo passwd rahul
 *   sudo usermod -aG developers rahul
 * 
 * Result: Rahul ka apna ghar hai, developers team mein hai
 * 
 * STORY 2: "Naam Badalna"
 * ---------------------------------------------------------------------
 * Situation: Priya shaadi ke baad apna naam badalna chahti hai
 * 
 * Solution:
 *   sudo usermod -l priya_sharma priya           # Username badlo
 *   sudo usermod -d /home/priya_sharma -m priya_sharma  # Ghar badlo
 *   sudo groupmod -n priya_sharma priya          # Group name badlo
 * 
 * STORY 3: "Employee Chala Gaya"
 * ---------------------------------------------------------------------
 * Situation: Amit company chhod kar gaya
 * 
 * Solution:
 *   sudo userdel -r amit
 * 
 * Result: Amit ka account aur saari files gayab
 * 
 * STORY 4: "Password Bhool Gaya"
 * ---------------------------------------------------------------------
 * Situation: Anjali apna password bhool gayi
 * 
 * Solution:
 *   sudo passwd anjali
 *   (Naya temporary password set karo)
 * 
 * Anjali se kaho: "Tumhara temporary password Temp123! hai, turant badlo"
 * 
 * ======================================================================
 * QUICK REFERENCE CARD
 * ======================================================================
 * 
 * COMMAND                    KYA KARTA HAI
 * --------                   -------------
 * sudo adduser john          Naya user banao (recommended)
 * sudo useradd john          Naya user banao (bare bones)
 * sudo passwd john           Password set/change karo
 * sudo userdel john          User delete karo
 * sudo userdel -r john       User aur files dono delete karo
 * id john                    User ki identity dekho
 * groups john                User ke groups dekho
 * whoami                     Current user kaun hai?
 * 
 * USER MODIFICATION:
 * ---------------------------------------------------------------------
 * sudo usermod -l new old                # User rename karo
 * sudo usermod -u 2000 john              # UID change karo
 * sudo usermod -d /new/home -m john      # Ghar shift karo
 * sudo usermod -g groupname john         # Main group change karo
 * sudo usermod -aG group1,group2 john    # Extra groups mein add karo
 * 
 * VIEWING USERS:
 * ---------------------------------------------------------------------
 * cat /etc/passwd              # Saare users dekho
 * awk -F':' '{print $1}' /etc/passwd  # Sirf usernames
 * ls /home/                    # User homes dekho
 * 
 * ======================================================================
 * GOLDEN RULES OF USER MANAGEMENT
 * ======================================================================
 * 
 * 1. ❌ Kabhi root user ban ke daily tasks mat karo
 * 2. ✅ sudo use karo jab temporary superpowers chahiye
 * 3. ✅ Real people ke liye adduser use karo (useradd nahi)
 * 4. ✅ Logon ko utni hi access do jitni zaroorat hai (least privilege)
 * 5. ✅ Jab user chale jaye to turant delete karo
 * 6. ✅ Temporary passwords par first login par change karne ko bolo
 * 7. ✅ Remember: with great power comes great responsibility!
 * 
 * YAAD RAKHO: Har user tumhare kingdom ka citizen hai. Unka dhyan rakho,
 * unhe proper homes do, aur achhe records rakho!
 * 
 * ======================================================================
 */