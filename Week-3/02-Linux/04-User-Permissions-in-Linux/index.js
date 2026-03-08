/**
 * File System:
 * > Linux file permissions control who can access files and directories.
 * > Here are the key commands to check permissions:
 *   - ls -l foo.sh Check permissions of file foo.sh
 *   - ls -ld /var/log Check permissions of directory /var/log
 * 
 *   | d | rwx | r-x | r-x | 2 | teacher | staff | 64 | Jul 19 10:19 | bar |
 *     ↑    ↑      ↑      ↑    ↑     ↑        ↑      ↑        ↑          ↑
 *     |    |      |      |    |     |        |      |        |          |
 *   File  User   Group  Other Links Owner   Group  Size   Last Modified File
 *   Type  Perm   Perm   Perm        (User)   Name  (bytes) (Date & Time) Name
 * 
 * > Scope Symbol Description:
 *   - User u The owner of the file or directory
 *   - Group g The group of users who can access the file
 *   - Other o Other users (world)
 *   - All a All users
 * 
 * > Permission Type:
 *   a. Read:
 *      - Symbol: r
 *      - If a file has this permission, you can open and view file
 *        contents (e.g., cat, head, tail)
 *      - If a directory has this permission, read directory contents
 *        (e.g., ls, du)
 * 
 *   b. Write:
 *      - Symbol: w
 *      - If a file has this permission, you can edit, delete, or 
 *        rename file (e.g., nano, vi).
 *      - If a directory has this permission, you can edit, delete, 
 *        or rename directory/files within it; create files.
 * 
 *   c. Execute:
 *      - Symbol: x
 *      - If a file has this permission, you can execute the file
 *        (e.g., ./filename.sh)
 *      - If a directory has this permission, you can enter the
 *        directory (e.g., cd directoryname) without x, r, and w are
 *        useless.
 * 
 *   d. None:
 *      - Symbol: -
 *      - If a file has this permission, you can     : do nothing
 *      - If a directory has this permission, you can: do nothing
*/

/**
 * Command Description:
 * > chmod permission app.sh Change the permissions of a file app.sh
 * > chown admin app.sh Change the owner of app.sh to admin
 * > chgrp devs app.sh Change the group of app.sh to devs
 * > umask Get a four-digit subtrahend
 * > sudo Invoke superuser privileges
 * > id Find your user ID (uid) and group ID (gid)
 * > groups Find all groups to which you belong
 * 
 * 
 * There are two methods to represent permissions on the command line:
 *   - Symbolic notation
 *   - Octal notation
 * 
 * The first argument of the `chmod` command can use both representations.
 * 
 * This notation uses a combination of `[u/g/o/a]`, `[+/-/=]`, and 
 * `[r/w/x]` to change permissions.
 * 
 * 
 * Command in symbolic notation:
 * a. chmod +x deploy.sh
 *    - change in user(u) permissions : execute
 *    - change in group(g) permissions: execute
 *    - change in world(o) permissions: execute
 * 
 * b. chmod a=x backup.sh
 *    - change in user(u) permissions: read, write, execute
 *    - change in group(g) permissions: read, write, execute
 *    - change in world(o) permissions: read, write, execute
 * 
 * c. chmod u-w config.yaml
 *    - change in user(u) permissions: write
 *    - change in group(g) permissions: no change
 *    - change in world(o) permissions: no change
 * 
 * d. chmod u+wx,g-x,o=rx install.sh
 *    - change in user(u) permissions: write, execute
 *    - change in group(g) permissions: execute
 *    - change in world(o) permissions: read, write, execute
 * 
 * > Octal notation is a three-digit number ranging from 000 to 777, 
 *   where each digit represents permissions as the sum of 4 (read), 
 *   2 (write), and 1 (execute).
 * 
 *   Octal Digit  Permission(s) granted                          Symbolic
 *      0          None                                          [u/g/o]-rwx
 *      1          Execute permission only                       [u/g/o]=x
 *      2          Write permission only                         [u/g/o]=w
 *      3          Write and execute permissions only: 2+1=3     [u/g/o]=wx
 *      4          Read permission only                          [u/g/o]=r
 *      5          Read and execute permissions only: 4+1=5      [u/g/o]=rx
 *      6          Read and write permissions only: 4+2=6        [u/g/o]=rw
 *      7          Read, write, and execute permissions: 4+2+1=7 [u/g/o]=rwx
 * 
*/

/**
 * Here are some examples of chmod usage with octal notation:
 * 1. chmod 777 deploy.sh
 *    - Change is user(u) permissions : Read, Write, Execute
 *    - Change is group(g) permissions: Read, Write, Execute
 *    - Change is world(o) permissions: Read, Write, Execute
 * 
 * 2. chmod 501 deploy.sh
 *    - Change is user(u) permissions : Read, Write, Execute
 *    - Change is group(g) permissions: Read, Write, Execute
 *    - Change is world(o) permissions: Read, Write, Execute
 * 
 * 3. chmod 365 deploy.sh
 *    - Change is user(u) permissions : Read, Write, Execute
 *    - Change is group(g) permissions: Read, Write, Execute
 *    - Change is world(o) permissions: Read, Write, Execute
 * 
 * 4. chmod 177 backup.sh
 *    - Change is user(u) permissions : Read, Write, Execute
 *    - Change is group(g) permissions: Read, Write, Execute
 *    - Change is world(o) permissions: Read, Write, Execute
*/


/**
 * The unmask command allows you to check the default permissions
 * for new files or directories.
 * 
 * Command Description:
 * > unmask Displays the default user and group permissions when
 *   creating files/directories
 * 
 * Examples of unmask output:
 * 
 * unmask output  Default directory permissions     Default file permissions
 * 0002           Octal: 775, Symbolic: rwxrwxr-x   Octal: 664, Symbolic: rw-rw-r--
 * 0022           Octal: 755, Symbolic: rwrx-xr-x   Octal: 644, Symbolic: rw-r--r--
 * 0314           Octal: 463, Symbolic: r--rw-wx    Octal: 352, Symbolic: -wxr-x-w-
*/

/**
 * To change the owner of a file or directory, you can use chown and
 * chgrp. Here's how:
 * 1. sudo chown admin deploy.sh
 *    - Transfer ownership of deploy.sh to admin
 * 
 * 2. sudo chown 102 deploy.sh
 *    - Transfer ownership of deploy.sh to the uid = 102
 * 
 * 3. chgrp dev deploy.sh
 *    - Transfer the group ownership of deploy.sh to dev
 * 
 * 4. sudo chown admin:dev deploy.sh
 *    - Change user and group ownership of deploy.sh to admin and dev
*/

/**
 * To perform tasks that require administrative access, use su or sudo:
 * > $ su Open superuser shell (root)
 * > $ sudo deploy.sh Run deploy.sh with superuser privileges
 * > $ sudo -i Open superuser shell if su is disabled
*/







/**
 * =====================================================================
 * THE MAGICAL KINGDOM OF LINUX: A STORY OF FILE PERMISSIONS
 * =====================================================================
 * 
 * CHAPTER 1: MEET THE KINGDOM
 * =====================================================================
 * 
 * Imagine Linux is a magical kingdom filled with castles (files) and 
 * villages (directories/folders). Every castle and village has rules
 * about who can enter and what they can do inside. These rules are
 * called PERMISSIONS.
 * 
 * Just like in a real kingdom, there are three types of people:
 * 
 * 👑 THE OWNER (u = user)
 *    - The person who built the castle or village
 *    - Usually you!
 *    - Has special rights because they created it
 * 
 * 👥 THE GROUP (g = group)
 *    - The owner's trusted friends and family
 *    - People who work together on projects
 *    - Like knights of the round table
 * 
 * 🌍 THE OTHERS (o = others)
 *    - Everyone else in the kingdom
 *    - Travelers, merchants, strangers
 *    - People who don't belong to your group
 * 
 * 👨‍👩‍👧‍👦 ALL (a = all)
 *    - Everyone combined (owner + group + others)
 * 
 * 
 * CHAPTER 2: THE THREE MAGICAL POWERS
 * =====================================================================
 * 
 * Every person in the kingdom can have up to THREE magical powers:
 * 
 * 📖 READ (r) - The Power of Sight
 *    - Can look at things
 *    - Cannot touch or change anything
 *    - Like having magical glasses
 * 
 * ✏️ WRITE (w) - The Power of Change
 *    - Can modify, delete, or create
 *    - Can reshape things
 *    - Like having a magic wand
 * 
 * 🏃 EXECUTE (x) - The Power of Action
 *    - Can run programs (for castles/files)
 *    - Can enter places (for villages/directories)
 *    - Like having magical boots
 * 
 * 
 * CHAPTER 3: CASTLES vs VILLAGES (Files vs Directories)
 * =====================================================================
 * 
 * These powers work DIFFERENTLY depending on whether you're dealing
 * with a castle (file) or a village (directory):
 * 
 * FOR CASTLES (FILES):
 * ---------------------------------------------------------------------
 * 📖 READ    = You can LOOK at the castle's treasures
 *              (view file contents with cat, less, or open in editor)
 * 
 * ✏️ WRITE   = You can REARRANGE the castle's treasures
 *              (edit, save changes, rename, or delete the file)
 * 
 * 🏃 EXECUTE = You can ACTIVATE the castle's magic spells
 *              (run the file if it's a program/script)
 * 
 * FOR VILLAGES (DIRECTORIES):
 * ---------------------------------------------------------------------
 * 📖 READ    = You can SEE a MAP of who lives in the village
 *              (list contents with ls)
 *              But you CANNOT visit their houses yet!
 * 
 * ✏️ WRITE   = You can BUILD new houses or DESTROY empty ones
 *              (create or delete files inside)
 *              But you still can't visit!
 * 
 * 🏃 EXECUTE = You can ENTER the village and walk the streets
 *              (cd into the directory)
 *              Now you can go to specific houses!
 * 
 * ⚠️ IMPORTANT SECRET: To actually DO anything in a village, you need
 *    BOTH Read AND Execute powers! Think of it as:
 *    - Execute = Being allowed to enter the village
 *    - Read    = Having a map to find specific houses
 *    - Write   = Being allowed to build/destroy houses
 * 
 * 
 * CHAPTER 4: THE GREAT PERMISSION TABLE (ls -l)
 * =====================================================================
 * 
 * When you ask the kingdom "ls -l", it shows you a magical table:
 * 
 *    d    rwx    r-x    r-x    2    teacher    staff    64    Jul 19 10:19    bar
 *    ↑     ↑      ↑      ↑      ↑       ↑         ↑       ↑          ↑           ↑
 *    |     |      |      |      |       |         |       |          |           |
 *  Type  Owner  Group  Other  Number  Owner    Group    Size    Last Modified   Name
 *               Perm    Perm   of     Name     Name            (Date & Time)
 *                        Links
 * 
 * Let's read this like a story:
 * 
 * PART 1: THE FIRST LETTER (File Type)
 * ---------------------------------------------------------------------
 * - = A regular castle (normal file)
 * d = A village (directory)
 * l = A magical portal (symbolic link - like a shortcut)
 * 
 * PART 2: THE THREE GROUPS OF THREE (Permissions)
 * ---------------------------------------------------------------------
 * rwx r-x r-x
 * │││ │││ │││
 * │││ │││ ││└─ Others: Execute? Yes (x)
 * │││ │││ └── Others: Write? No (-)
 * │││ ││└──── Others: Read? Yes (r)
 * │││ ││
 * │││ │└───── Group: Execute? Yes (x)
 * │││ └────── Group: Write? No (-)
 * ││└──────── Group: Read? Yes (r)
 * ││
 * │└───────── Owner: Execute? Yes (x)
 * └────────── Owner: Write? Yes (w)
 *  └───────── Owner: Read? Yes (r)
 * 
 * So this tells us:
 * - Owner: Can READ, WRITE, and EXECUTE (full power!)
 * - Group: Can READ and EXECUTE, but NOT WRITE
 * - Others: Can READ and EXECUTE, but NOT WRITE
 * 
 * 
 * CHAPTER 5: THE ART OF CHANGING PERMISSIONS (chmod)
 * =====================================================================
 * 
 * The kingdom has a special command called "chmod" (Change Mode) that
 * lets you change these rules. There are TWO ways to use it, like
 * speaking two different languages:
 * 
 * LANGUAGE 1: SYMBOLIC SPELLS (Using letters)
 * ---------------------------------------------------------------------
 * Formula: [who] [action] [power]
 * 
 * WHO:     u (owner), g (group), o (others), a (all)
 * ACTION:  + (add power), - (remove power), = (set exactly these powers)
 * POWER:   r (read), w (write), x (execute)
 * 
 * STORY EXAMPLES:
 * 
 * Example 1: "I want my pet dragon to be able to fly"
 *           chmod u+x dragon.sh
 *           │    │││
 *           │    ││└── Power: execute (fly)
 *           │    │└─── Action: add (+)
 *           │    └──── Who: user/owner (me)
 *           └─────── Command: change permissions
 * 
 * Meaning: Give the OWNER (me) permission to EXECUTE (run) dragon.sh
 * 
 * Example 2: "Stop my friends from touching my treasure"
 *           chmod g-w treasure.txt
 *           │    │││
 *           │    ││└── Power: write (touch/change)
 *           │    │└─── Action: remove (-)
 *           │    └──── Who: group (my friends)
 *           │
 *           └─────── Command: change permissions
 * 
 * Meaning: Remove WRITE permission from the GROUP
 * 
 * Example 3: "Everyone can look at my map, but nothing else"
 *           chmod a=r map.txt
 *           │    │││
 *           │    ││└── Power: read (look)
 *           │    │└─── Action: set exactly to (=)
 *           │    └──── Who: all (everyone)
 *           │
 *           └─────── Command: change permissions
 * 
 * Meaning: Set permissions so ALL can ONLY READ (no write/execute)
 * 
 * Example 4: "Give me flight and fire, remove friend's fire, 
 *             let others look and fly"
 *           chmod u+wx,g-x,o=rx dragon.sh
 * 
 * Breaking it down:
 * - u+wx  : Owner gets Write and Execute (add fire and flight)
 * - g-x   : Group loses Execute (remove their flight)
 * - o=rx  : Others get exactly Read and Execute (look and fly)
 * 
 * 
 * LANGUAGE 2: NUMBER MAGIC (Octal notation)
 * ---------------------------------------------------------------------
 * This is like a secret code where each power has a number:
 * 
 * READ    = 4 (like a table with 4 legs)
 * WRITE   = 2 (like a pair of wings)
 * EXECUTE = 1 (like a unicorn's single horn)
 * 
 * To give MULTIPLE powers, you ADD their numbers:
 * 
 * 4 (read) + 2 (write) = 6 (read + write)
 * 4 (read) + 1 (execute) = 5 (read + execute)
 * 2 (write) + 1 (execute) = 3 (write + execute)
 * 4 + 2 + 1 = 7 (ALL powers!)
 * 
 * THE MAGIC NUMBER TABLE:
 * ---------------------------------------------------------------------
 * Number  Powers     Story Meaning
 *   0     ---        "You can do absolutely nothing" (like being invisible)
 *   1     --x        "You can only run/enter" (like a ghost)
 *   2     -w-        "You can only change" (like a wizard who can't see)
 *   3     -wx        "You can change and run, but not see" (blind ninja)
 *   4     r--        "You can only look" (like a statue)
 *   5     r-x        "You can look and run" (like a tour guide)
 *   6     rw-        "You can look and change" (like an artist)
 *   7     rwx        "You can do EVERYTHING!" (like a king/queen)
 * 
 * Now, chmod uses THREE of these numbers:
 * FIRST number  = Owner's powers
 * SECOND number = Group's powers
 * THIRD number  = Others' powers
 * 
 * STORY EXAMPLES WITH NUMBERS:
 * 
 * Example 1: chmod 755 dragon.sh
 *                    │││
 *                    ││└── Others: 5 = read + execute (look and fly)
 *                    │└─── Group: 5 = read + execute (look and fly)
 *                    └──── Owner: 7 = read + write + execute (everything!)
 * 
 * So: The owner is a KING, group and others are TOURISTS
 * 
 * Example 2: chmod 644 treasure.txt
 *                    │││
 *                    ││└── Others: 4 = read only (just look)
 *                    │└─── Group: 4 = read only (just look)
 *                    └──── Owner: 6 = read + write (look AND change)
 * 
 * So: Owner can EDIT the treasure map, everyone can only LOOK at it
 * 
 * Example 3: chmod 700 private_room/
 *                    │││
 *                    ││└── Others: 0 = nothing (can't even see it)
 *                    │└─── Group: 0 = nothing (can't even see it)
 *                    └──── Owner: 7 = everything (full control)
 * 
 * So: This is your SECRET HIDEOUT - only YOU can enter!
 * 
 * 
 * CHAPTER 6: DEFAULT POWERS (The umask Mystery)
 * =====================================================================
 * 
 * When you create new castles or villages, the kingdom automatically
 * gives them default powers. But there's a mysterious force called
 * "umask" that subtracts powers from the defaults.
 * 
 * Think of it like this:
 * - New files start with FULL powers (666 = rw-rw-rw-)
 * - New folders start with FULL powers (777 = rwxrwxrwx)
 * - umask is like a "subtraction mask" that removes certain powers
 * 
 * THE UMASK TABLE:
 * ---------------------------------------------------------------------
 * umask    Default Folder     Default File      Story Meaning
 * 0002     775 (rwxrwxr-x)    664 (rw-rw-r--)   "Friends can help, strangers only look"
 * 0022     755 (rwxr-xr-x)    644 (rw-r--r--)   "I'm the boss, others just watch"
 * 0077     700 (rwx------)    600 (rw-------)   "Mine, all mine! (very private)"
 * 
 * HOW IT WORKS (for math lovers):
 * Default: 666 (files) or 777 (folders)
 * umask:   022
 * Result:  666 - 022 = 644 for files
 *          777 - 022 = 755 for folders
 * 
 * 
 * CHAPTER 7: CHANGING OWNERSHIP (chown and chgrp)
 * =====================================================================
 * 
 * Sometimes you need to give your castle to someone else:
 * 
 * 1. sudo chown admin dragon.sh
 *    - Give the dragon castle to a new owner named "admin"
 *    - (sudo needed because only super-users can transfer ownership)
 * 
 * 2. sudo chown 102 dragon.sh
 *    - Give ownership to whoever has ID number 102
 *    - (every user has a secret ID number)
 * 
 * 3. chgrp wizards dragon.sh
 *    - Change the group to "wizards" (your magic team)
 *    - (don't need sudo if you're in the new group)
 * 
 * 4. sudo chown admin:wizards dragon.sh
 *    - Change BOTH owner AND group at once!
 *    - Owner becomes "admin", group becomes "wizards"
 * 
 * 
 * CHAPTER 8: CHECKING WHO YOU ARE
 * =====================================================================
 * 
 * To find out your identity in the kingdom:
 * 
 * id       - Shows your name and all the groups you belong to
 * groups   - Just shows your groups (your teams)
 * whoami   - Shows your username
 * 
 * 
 * CHAPTER 9: SUPER POWERS (sudo and su)
 * =====================================================================
 * 
 * Sometimes you need to do things only the KING (root) can do:
 * 
 * sudo command    - Run ONE command as the king
 *                   (like "sudo chown admin file")
 * 
 * sudo -i         - Become the king for a while
 *                   (opens a root shell)
 * 
 * su              - Switch to another user (default: become king)
 * 
 * 
 * CHAPTER 10: COMMON SITUATIONS (Real Stories)
 * =====================================================================
 * 
 * STORY 1: "My script won't run!"
 * --------------------------------------------
 * You: "Why can't I run my magic spell?"
 * Kingdom: "Check permissions with ls -l"
 * You: "It shows -rw-r--r--"
 * Kingdom: "That means no execute permission!"
 * Solution: chmod +x myscript.sh
 * 
 * STORY 2: "My friend can't see my shared file"
 * --------------------------------------------
 * You: "I want my friend to see my map"
 * Friend: "I get 'Permission denied'"
 * Solution: chmod 640 shared_map.txt
 *           (Owner:rw, Group:r, Others:none)
 * Then add friend to your group
 * 
 * STORY 3: "Everyone can delete my files!"
 * --------------------------------------------
 * You: "Help! Everyone's messing with my stuff!"
 * Check: ls -l shows -rw-rw-rw- (666)
 * Horror! Everyone can write!
 * Solution: chmod 644 important_file.txt
 * 
 * STORY 4: "I can't enter my own folder!"
 * --------------------------------------------
 * You: "cd myfolder says Permission denied"
 * Check: ls -ld myfolder shows drw-------
 * Problem: No execute (x) on folder!
 * Solution: chmod u+x myfolder
 * 
 * 
 * CHAPTER 11: QUICK REFERENCE CARD
 * =====================================================================
 * 
 * COMMAND                    WHAT IT DOES
 * --------                    -------------
 * ls -l                       Show all permissions
 * chmod 755 file              Set owner:all, group:rx, others:rx
 * chmod 644 file              Set owner:rw, group:r, others:r
 * chmod 700 folder            Make folder private
 * chmod +x file               Make executable for everyone
 * chmod u+x file              Make executable only for owner
 * chmod go-w file              Remove write from group+others
 * 
 * PERMISSION CHEAT SHEET:
 * --------------------------------------------
 * 7 = rwx = Full control
 * 6 = rw- = Read + Write
 * 5 = r-x = Read + Execute
 * 4 = r-- = Read only
 * 3 = -wx = Write + Execute
 * 2 = -w- = Write only
 * 1 = --x = Execute only
 * 0 = --- = No access
 * 
 * 
 * THE GOLDEN RULES:
 * =====================================================================
 * 1. Give the LEAST power needed (nobody needs 777 except maybe dragons)
 * 2. Files usually need 644 or 755
 * 3. Folders usually need 755 (so people can enter)
 * 4. Private stuff = 600 for files, 700 for folders
 * 5. Shared stuff = 640 for files, 750 for folders
 * 6. When in doubt, check with ls -l
 * 7. If something doesn't work, it's probably permissions!
 * 
 * AND REMEMBER: With great power comes great responsibility!
 * =====================================================================
 */














/**
 * ======================================================================
 * LINUX FILE PERMISSIONS — Complete Guide (HINGLISH VERSION)
 * ======================================================================
 * 
 * Linux mein file permissions control karti hain ki kaun files aur 
 * directories ko access kar sakta hai. Ye complete guide hai.
 * 
 * ======================================================================
 * 📌 BASIC COMMANDS — Permissions dekhne ke liye
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ ls -l foo.sh              # File foo.sh ki permissions dekho     │
 * │ ls -ld /var/log           # Directory /var/log ki permissions    │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ======================================================================
 * 📊 LS -L OUTPUT — Har column ka matlab
 * ======================================================================
 * 
 *   | d | rwx | r-x | r-x | 2 | teacher | staff | 64 | Jul 19 10:19 | bar |
 *     ↑    ↑      ↑      ↑    ↑     ↑        ↑      ↑        ↑          ↑
 *     |    |      |      |    |     |        |      |        |          |
 *   File  User   Group  Other Links Owner   Group  Size   Last Modified File
 *   Type  Perm   Perm   Perm        (User)   Name  (bytes) (Date & Time) Name
 * 
 * COLUMN BY COLUMN EXPLANATION:
 * 
 * 1. FILE TYPE (First Character)
 *    - = Regular file
 *    d = Directory (folder)
 *    l = Symbolic link (shortcut)
 *    c = Character device
 *    b = Block device
 *    p = Named pipe
 *    s = Socket
 * 
 * 2-4. USER PERMISSIONS (Owner)
 *    3 characters: r, w, x, or -
 *    r = Read permission
 *    w = Write permission
 *    x = Execute permission
 *    - = No permission
 * 
 * 5-7. GROUP PERMISSIONS
 *    Same format as user permissions
 * 
 * 8-10. OTHER PERMISSIONS (World)
 *    Same format as user permissions
 * 
 * 11. LINK COUNT
 *    Number of hard links to this file
 * 
 * 12. OWNER (User)
 *    Username of the file owner
 * 
 * 13. GROUP
 *    Group name of the file
 * 
 * 14. SIZE
 *    File size in bytes
 * 
 * 15. LAST MODIFIED
 *    Date and time of last modification
 * 
 * 16. FILENAME
 *    Name of the file/directory
 * 
 * ======================================================================
 * 👥 PERMISSION SCOPES — Kiski permissions?
 * ======================================================================
 * 
 * ┌────────────┬──────────────────────────────────────────────────┐
 * │ Symbol     │ Meaning                                          │
 * ├────────────┼──────────────────────────────────────────────────┤
 * │ u (user)   │ File/directory ka owner                          │
 * │ g (group)  │ Group ke members (jo is file ke group mein hain) │
 * │ o (others) │ Baaki saare users (world)                        │
 * │ a (all)    │ Sabhi (user + group + others)                    │
 * └────────────┴──────────────────────────────────────────────────┘
 * 
 * ======================================================================
 * 🔐 PERMISSION TYPES — Kaunsi permissions?
 * ======================================================================
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * 📖 READ (r)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * FOR FILES:
 *   ✓ File ka content dekh sakte ho (cat, less, head, tail)
 *   ✗ File modify nahi kar sakte
 *   
 *   Example: cat file.txt   (kaam karega agar read permission hai)
 *            echo "hi" > file.txt (nahi chalega)
 * 
 * FOR DIRECTORIES:
 *   ✓ Directory ke contents ki list dekh sakte ho (ls)
 *   ✗ Directory mein enter nahi kar sakte (cd)
 *   
 *   Example: ls /home/john   (contents dikhenge agar read permission hai)
 *            cd /home/john    (nahi chalega)
 * 
 * ⚠️ NOTE: Directory mein agar read hai but execute nahi, to ls to chalega
 *          lekin actual file details nahi dikhengi. File names dikhenge
 *          par metadata (size, permissions etc.) nahi.
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * ✏️ WRITE (w)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * FOR FILES:
 *   ✓ File ko edit kar sakte ho
 *   ✓ File delete kar sakte ho
 *   ✓ File rename kar sakte ho
 *   
 *   Example: nano file.txt   (edit kar sakte ho)
 *            rm file.txt     (delete kar sakte ho)
 * 
 * FOR DIRECTORIES:
 *   ✓ Directory mein nayi files create kar sakte ho
 *   ✓ Directory se files delete kar sakte ho
 *   ✓ Files rename kar sakte ho
 *   
 *   Example: touch /home/john/newfile.txt  (nayi file bana sakte ho)
 *            rm /home/john/oldfile.txt     (file delete kar sakte ho)
 * 
 * ⚠️ NOTE: Directory mein write permission ka matlab hai ki tum andar ki
 *          files ko modify kar sakte ho, chahe un files ki apni koi bhi
 *          permissions kyun na hon!
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * 🏃 EXECUTE (x)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * FOR FILES:
 *   ✓ File ko program ki tarah run kar sakte ho
 *   
 *   Example: ./script.sh   (script run karega agar execute permission hai)
 *            python script.py (python script ke liye execute permission chahiye)
 * 
 * FOR DIRECTORIES:
 *   ✓ Directory mein enter kar sakte ho (cd)
 *   
 *   Example: cd /home/john   (kaam karega agar execute permission hai)
 * 
 * ⚠️ IMPORTANT SECRET: Directory ke liye READ + EXECUTE dono chahiye
 *    kuch bhi useful karne ke liye!
 *    - Execute = andar jaane ki permission
 *    - Read = map dekhne ki permission
 * 
 *    Dono nahi honge to kuch nahi kar sakte!
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * ❌ NONE (-)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * Koi permission nahi hai.
 * 
 * FOR FILES:
 *   Kuch nahi kar sakte. File exist bhi karti hai to bhi use nahi kar sakte.
 * 
 * FOR DIRECTORIES:
 *   Kuch nahi kar sakte. Directory exist karti hai par andar nahi ja sakte.
 * 
 * Example: ls -l file.txt   (filename show hoga but "Permission denied")
 *         cat file.txt      (Permission denied)
 */

/**
 * ======================================================================
 * 🛠️ CHANGING PERMISSIONS — chmod COMMAND
 * ======================================================================
 * 
 * chmod (Change Mode) command se permissions badal sakte ho.
 * Do tareeke hain: Symbolic aur Octal.
 * 
 * BASIC SYNTAX:
 *   chmod permissions filename
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * METHOD 1: SYMBOLIC NOTATION (Letters se)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * FORMULA: [who][action][permission]
 * 
 * WHO:        u (user/owner), g (group), o (others), a (all)
 * ACTION:     + (add), - (remove), = (set exactly these)
 * PERMISSION: r (read), w (write), x (execute)
 * 
 * ─────────────────────────────────────────────────────────────────────
 * EXAMPLES:
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * EXAMPLE 1: chmod +x deploy.sh
 * --------------------------------------------
 * Kya hoga:
 *   - user (owner) ko execute permission add
 *   - group ko execute permission add
 *   - others ko execute permission add
 * 
 * Matlab: Sabko execute karne ki permission mil gayi
 * 
 * Equivalent octal: chmod 755 deploy.sh
 */

/**
 * EXAMPLE 2: chmod a=x backup.sh
 * --------------------------------------------
 * Kya hoga:
 *   - user ki permissions set hongi exactly execute
 *   - group ki permissions set hongi exactly execute
 *   - others ki permissions set hongi exactly execute
 * 
 * Matlab: Sabki permissions exactly execute set ho gayi
 *         (read/write remove ho gaye)
 * 
 * Equivalent octal: chmod 111 backup.sh
 */

/**
 * EXAMPLE 3: chmod u-w config.yaml
 * --------------------------------------------
 * Kya hoga:
 *   - user se write permission remove
 *   - group aur others par koi asar nahi
 * 
 * Matlab: Owner ab edit nahi kar sakta, sirf padh sakta hai
 */

/**
 * EXAMPLE 4: chmod u+wx,g-x,o=rx install.sh
 * --------------------------------------------
 * Kya hoga:
 *   - user ko write aur execute add
 *   - group se execute remove
 *   - others ki permissions exactly read aur execute set
 * 
 * Complex ek saath multiple changes!
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * METHOD 2: OCTAL NOTATION (Numbers se)
 * ─────────────────────────────────────────────────────────────────────
 * 
 * Har permission ka ek number hai:
 *   r = 4
 *   w = 2
 *   x = 1
 *   - = 0
 * 
 * PERMISSION CALCULATION:
 *   rw- = 4 + 2 + 0 = 6
 *   r-x = 4 + 0 + 1 = 5
 *   rwx = 4 + 2 + 1 = 7
 *   --- = 0
 * 
 * OCTAL DIGIT TABLE:
 * ┌────────┬───────────────┬──────────┐
 * │ Number │ Permissions   │ Meaning  │
 * ├────────┼───────────────┼──────────┤
 * │ 0      │ ---           │ Kuch nahi│
 * │ 1      │ --x           │ Sirf execute│
 * │ 2      │ -w-           │ Sirf write│
 * │ 3      │ -wx           │ Write + execute│
 * │ 4      │ r--           │ Sirf read│
 * │ 5      │ r-x           │ Read + execute│
 * │ 6      │ rw-           │ Read + write│
 * │ 7      │ rwx           │ Sab kuch │
 * └────────┴───────────────┴──────────┘
 * 
 * chmod mein 3 digits use hote hain:
 *   Pehla digit = user (owner)
 *   Doosra digit = group
 *   Teesra digit = others
 * 
 * ─────────────────────────────────────────────────────────────────────
 * EXAMPLES:
 * ─────────────────────────────────────────────────────────────────────
 */

/**
 * EXAMPLE 1: chmod 777 deploy.sh
 * --------------------------------------------
 * Breakdown:
 *   7 (user)  = rwx = read + write + execute
 *   7 (group) = rwx = read + write + execute
 *   7 (others)= rwx = read + write + execute
 * 
 * Matlab: Sabka full control! Dangerous!
 * 
 * Use when: Kabhi nahi. Seriously, almost never.
 */

/**
 * EXAMPLE 2: chmod 755 deploy.sh
 * --------------------------------------------
 * Breakdown:
 *   7 (user)  = rwx = full control
 *   5 (group) = r-x = read + execute
 *   5 (others)= r-x = read + execute
 * 
 * Matlab: Owner sab kar sakta hai, group aur others sirf read/execute
 * 
 * Use when: Scripts, programs, directories
 */

/**
 * EXAMPLE 3: chmod 644 README.md
 * --------------------------------------------
 * Breakdown:
 *   6 (user)  = rw- = read + write
 *   4 (group) = r-- = sirf read
 *   4 (others)= r-- = sirf read
 * 
 * Matlab: Owner edit kar sakta hai, baaki sirf padh sakte hain
 * 
 * Use when: Text files, documents, source code
 */

/**
 * EXAMPLE 4: chmod 600 private.key
 * --------------------------------------------
 * Breakdown:
 *   6 (user)  = rw- = read + write
 *   0 (group) = --- = kuch nahi
 *   0 (others)= --- = kuch nahi
 * 
 * Matlab: Sirf owner padh aur likh sakta hai
 * 
 * Use when: Private files (SSH keys, passwords)
 */

/**
 * EXAMPLE 5: chmod 700 secret_folder
 * --------------------------------------------
 * Breakdown:
 *   7 (user)  = rwx = full control
 *   0 (group) = --- = kuch nahi
 *   0 (others)= --- = kuch nahi
 * 
 * Matlab: Sirf owner andar ja sakta hai
 * 
 * Use when: Private directories
 */

/**
 * EXAMPLE 6: chmod 500 script.sh
 * --------------------------------------------
 * Breakdown:
 *   5 (user)  = r-x = read + execute
 *   0 (group) = --- = kuch nahi
 *   0 (others)= --- = kuch nahi
 * 
 * Matlab: Owner run to kar sakta hai but edit nahi
 * 
 * Use when: Production scripts jo change nahi hone chahiye
 */

/**
 * ======================================================================
 * 🎭 UMASK — Default Permissions
 * ======================================================================
 * 
 * Jab nayi file/directory create karte ho, to default permissions kya
 * hongi? Yeh umask decide karta hai.
 * 
 * COMMAND:
 *   umask        # Current umask value dekho
 *   umask 022    # Umask set karo
 * 
 * HOW IT WORKS:
 *   Files start with: 666 (rw-rw-rw-)
 *   Dirs start with:  777 (rwxrwxrwx)
 *   Umask SUBTRACT karta hai inme se.
 * 
 * FORMULA:
 *   Final = Default - Umask
 * 
 * ─────────────────────────────────────────────────────────────────────
 * COMMON UMASK VALUES:
 * ─────────────────────────────────────────────────────────────────────
 * 
 * umask 0022 (most common):
 *   Files: 666 - 022 = 644 (rw-r--r--)
 *   Dirs:  777 - 022 = 755 (rwxr-xr-x)
 *   
 *   Matlab: Owner sab kar sakta hai, baaki sirf read/execute
 * 
 * umask 0002:
 *   Files: 666 - 002 = 664 (rw-rw-r--)
 *   Dirs:  777 - 002 = 775 (rwxrwxr-x)
 *   
 *   Matlab: Group ko bhi write permission (collaboration)
 * 
 * umask 0077:
 *   Files: 666 - 077 = 600 (rw-------)
 *   Dirs:  777 - 077 = 700 (rwx------)
 *   
 *   Matlab: Sirf owner, baaki kuch nahi (private)
 * 
 * ─────────────────────────────────────────────────────────────────────
 * UMASK TABLE:
 * ─────────────────────────────────────────────────────────────────────
 * 
 * ┌──────────┬─────────────────┬─────────────────┬──────────────────┐
 * │ umask    │ File Permissions│ Dir Permissions │ Use Case         │
 * ├──────────┼─────────────────┼─────────────────┼──────────────────┤
 * │ 0002     │ 664 (rw-rw-r--) │ 775 (rwxrwxr-x) │ Team projects    │
 * │ 0022     │ 644 (rw-r--r--) │ 755 (rwxr-xr-x) │ Default (safe)   │
 * │ 0033     │ 644 (rw-r--r--) │ 744 (rwxr--r--) │ Weird            │
 * │ 0077     │ 600 (rw-------) │ 700 (rwx------) │ Private          │
 * └──────────┴─────────────────┴─────────────────┴──────────────────┘
 */

/**
 * ======================================================================
 * 👑 CHOWN — Change Owner
 * ======================================================================
 * 
 * File ya directory ka owner badalne ke liye.
 * 
 * SYNTAX:
 *   chown newowner filename
 * 
 * EXAMPLES:
 * 
 * 1. sudo chown admin deploy.sh
 *    --------------------------------------------
 *    deploy.sh ka naya owner admin ho jayega
 *    (sudo chahiye kyunki owner change kar rahe ho)
 * 
 * 2. sudo chown 102 deploy.sh
 *    --------------------------------------------
 *    deploy.sh ka naya owner UID 102 wala user
 *    (UID se bhi de sakte ho)
 * 
 * 3. sudo chown admin:dev deploy.sh
 *    --------------------------------------------
 *    Owner admin, group dev ho jayega
 *    (dono ek saath)
 * 
 * 4. sudo chown :dev deploy.sh
 *    --------------------------------------------
 *    Sirf group change karo, owner wahi rahega
 */

/**
 * ======================================================================
 * 👥 CHGRP — Change Group
 * ======================================================================
 * 
 * Sirf group change karne ke liye.
 * 
 * SYNTAX:
 *   chgrp newgroup filename
 * 
 * EXAMPLES:
 * 
 * 1. chgrp dev deploy.sh
 *    --------------------------------------------
 *    deploy.sh ka group dev ho jayega
 *    (agar tum dev group mein ho to sudo nahi chahiye)
 * 
 * 2. sudo chgrp 1001 deploy.sh
 *    --------------------------------------------
 *    GID 1001 wala group set karo
 */

/**
 * ======================================================================
 * 🆔 IDENTITY COMMANDS — Kaun hain tum?
 * ======================================================================
 * 
 * id
 *   --------------------------------------------
 *   Tumhari identity dikhao:
 *   uid=1000(john) gid=1000(john) groups=1000(john),27(sudo),999(docker)
 * 
 * groups
 *   --------------------------------------------
 *   Tum kis kis group mein ho:
 *   john sudo docker
 * 
 * whoami
 *   --------------------------------------------
 *   Tumhara username kya hai:
 *   john
 */

/**
 * ======================================================================
 * 👑 SUPERUSER ACCESS — sudo aur su
 * ======================================================================
 * 
 * sudo
 *   --------------------------------------------
 *   Ek command ko root privileges se chalao
 *   Example: sudo apt update
 * 
 * sudo -i
 *   --------------------------------------------
 *   Root shell mein jao (agar su disable ho)
 * 
 * su
 *   --------------------------------------------
 *   Switch user - default root mein jao
 *   Example: su - john (john ban jao)
 */

/**
 * ======================================================================
 * 📚 COMPLETE REFERENCE TABLE — All chmod Commands
 * ======================================================================
 * 
 * ┌─────────────────────┬──────────────────────────────────────────┐
 * │ Command             │ Effect                                    │
 * ├─────────────────────┼──────────────────────────────────────────┤
 * │ chmod 755 file      │ rwxr-xr-x - Owner sab, group rx, others rx│
 * │ chmod 750 file      │ rwxr-x--- - Owner sab, group rx, others 0│
 * │ chmod 700 file      │ rwx------ - Sirf owner                   │
 * │ chmod 644 file      │ rw-r--r-- - Owner rw, group r, others r  │
 * │ chmod 640 file      │ rw-r----- - Owner rw, group r, others 0  │
 * │ chmod 600 file      │ rw------- - Sirf owner read/write        │
 * │ chmod 444 file      │ r--r--r-- - Sab sirf read                │
 * │ chmod 555 file      │ r-xr-xr-x - Sab read/execute             │
 * │ chmod 111 file      │ --x--x--x - Sab sirf execute             │
 * │ chmod 000 file      │ --------- - Kisi ko kuch nahi            │
 * ├─────────────────────┼──────────────────────────────────────────┤
 * │ chmod u+x file      │ Owner ko execute do                       │
 * │ chmod g-w file      │ Group se write hatao                     │
 * │ chmod o=r file      │ Others ko sirf read do                   │
 * │ chmod a+rx file     │ Sabko read/execute do                    │
 * │ chmod go-w file     │ Group aur others se write hatao          │
 * │ chmod u=rw,g=r,o=   │ Owner rw, group r, others nothing        │
 * └─────────────────────┴──────────────────────────────────────────┘
 * 
 * ======================================================================
 * 🎯 REAL-WORLD SCENARIOS
 * ======================================================================
 */

/**
 * SCENARIO 1: "Mera script run nahi ho raha"
 * --------------------------------------------
 * PROBLEM:
 *   ./deploy.sh - bash: permission denied
 * 
 * CHECK:
 *   ls -l deploy.sh
 *   Output: -rw-r--r--
 * 
 * ISSUE:
 *   Execute permission nahi hai
 * 
 * SOLUTION:
 *   chmod +x deploy.sh
 *   Ab -rwxr-xr-x ho jayega
 */

/**
 * SCENARIO 2: "Sab mere files delete kar rahe hain"
 * --------------------------------------------
 * PROBLEM:
 *   Log files randomly delete ho rahi hain
 * 
 * CHECK:
 *   ls -l *.log
 *   Output: -rw-rw-rw- (666)
 * 
 * ISSUE:
 *   Sabko write permission hai
 * 
 * SOLUTION:
 *   chmod 644 *.log
 *   Ab -rw-r--r-- ho jayega
 */

/**
 * SCENARIO 3: "Mere folder mein enter nahi kar pa raha"
 * --------------------------------------------
 * PROBLEM:
 *   cd project - permission denied
 * 
 * CHECK:
 *   ls -ld project
 *   Output: drw-------
 * 
 * ISSUE:
 *   Directory par execute permission nahi
 * 
 * SOLUTION:
 *   chmod u+x project
 *   chmod 755 project (better)
 */

/**
 * SCENARIO 4: "Team collaboration setup"
 * --------------------------------------------
 * GOAL:
 *   Developers team project par kaam kare
 * 
 * SETUP:
 *   mkdir /var/www/project
 *   sudo chown -R john:developers /var/www/project
 *   sudo chmod -R 775 /var/www/project
 *   
 * RESULT:
 *   John (owner) sab kar sakta hai
 *   Developers group read/write/execute
 *   Others sirf read/execute
 */

/**
 * SCENARIO 5: "Production security"
 * --------------------------------------------
 * GOAL:
 *   Config files secure rahein
 * 
 * SETUP:
 *   chmod 600 /etc/nginx/nginx.conf
 *   chmod 700 /etc/nginx/ssl/
 *   chmod 644 /var/www/html/index.html
 *   
 * RESULT:
 *   Config sirf root edit kar sakta hai
 *   SSL folder sirf root enter kar sakta hai
 *   Website sab dekh sakte hain
 */

/**
 * ======================================================================
 * ⚠️ WARNINGS AND BEST PRACTICES
 * ======================================================================
 * 
 * DANGER ZONE (Kabhi mat karo bina soch samajh ke):
 * ❌ chmod 777 - Sabka full control
 * ❌ chmod 666 on directories
 * ❌ chmod 000 on system files
 * ❌ chown without sudo
 * 
 * BEST PRACTICES:
 * ✅ Principle of least privilege - Jitni zaroorat utni do
 * ✅ Files: usually 644 ya 755
 * ✅ Dirs: usually 755 (taaki log enter kar sakein)
 * ✅ Private files: 600
 * ✅ Private dirs: 700
 * ✅ Shared project: 664/775
 * ✅ Production scripts: 500/550
 * 
 * CHECKLIST:
 * □ Kya sabko write chahiye? (Usually nahi)
 * □ Kya file executable honi chahiye? (Scripts/programs)
 * □ Kya directory mein log enter kar sakte hain? (Execute)
 * □ Kya confidential data hai? (600/700)
 * 
 * ======================================================================
 * 📝 QUICK REFERENCE CARD
 * ======================================================================
 * 
 * SEE PERMISSIONS:
 *   ls -l              # Files
 *   ls -ld dir/        # Directories
 * 
 * CHANGE PERMISSIONS:
 *   chmod 755 file     # Octal method
 *   chmod u+x file     # Symbolic method
 * 
 * CHANGE OWNER/GROUP:
 *   chown user file    # Change owner
 *   chgrp group file   # Change group
 *   chown user:group file # Change both
 * 
 * CHECK DEFAULTS:
 *   umask              # Current umask
 *   umask 022          # Set umask
 * 
 * IDENTITY:
 *   id                 # User/group info
 *   groups             # Your groups
 *   whoami             # Current user
 * 
 * SUPERUSER:
 *   sudo cmd           # Run as root
 *   sudo -i            # Root shell
 * 
 * PERMISSION NUMBERS:
 *   7 = rwx (full)
 *   6 = rw- (read/write)
 *   5 = r-x (read/execute)
 *   4 = r-- (read only)
 *   3 = -wx (write/execute)
 *   2 = -w- (write only)
 *   1 = --x (execute only)
 *   0 = --- (nothing)
 * 
 * ======================================================================
 * 🎓 SUMMARY
 * ======================================================================
 * 
 * Linux permissions 3 cheezein control karti hain:
 *   1. Kaun? (user, group, others)
 *   2. Kya? (read, write, execute)
 *   3. Kahan? (files, directories)
 * 
 * YAAD RAKHNE WALI BAATEIN:
 *   - Files ke liye execute = run kar sakte ho
 *   - Dirs ke liye execute = andar ja sakte ho
 *   - Dirs ke liye read + execute dono chahiye useful kaam ke liye
 *   - 755 is safe for most things
 *   - 644 is safe for files
 *   - 777 is almost never needed
 *   - Jab doubt ho, ls -l karo
 * 
 * ======================================================================
 */