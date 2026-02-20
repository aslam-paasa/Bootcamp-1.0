/**
 * What is Version Control System (VCS)?
 * > Imagine you are coding and suddenly something breaks.
 * > You wish you could go back to your old working code — that’s where
 *   VCS helps!
 * 
 * VCS means:
 * > "A system that helps you track every change made to your code over
 *   time."
 * > Ex: 
 *   - You wrote a file 
 *   - edited 
 *   - deleted 
 *   - restored 
 *   - everything is recorded
 * 
 * Why we use VCS:
 * 1. Track Changes     → Know who changed what, when, and why.
 * 2. Work in Teams     → Many people can work on same project together.
 * 3. Backup & Recovery → Old versions can be restored easily.
*/ 

/**
 * What is Git?
 * > Git is a Version Control System (VCS) software.
 * > It runs on your computer (locally) and helps manage your project 
 *   versions.
 * > Think of Git like a "Time Machine for Code".
 * 
 * Features of Git:
 * 1. Branching → Work on new features without touching main code.
 * 2. Merging   → Combine changes from different branches.
 * 3. Speed     → Fast and efficient, even for large projects.
 * 4. Offline   → You don’t need internet to track your local changes.
 * 
 * Example:
 * > You create a project folder 
 * > Make changes 
 * > Git saves snapshots of your code every time you commit.
*/ 


/**
 * What is GitHub?
 * > GitHub is an online platform where you can store and share your 
 *   Git projects.
 * 
 * > Think of it like: 
 *   - Git    → local tracking tool
 *   - GitHub → online storage + collaboration hub
 * 
 * Why we use GitHub:
 * 1. Cloud Storage      → Keeps code safe online.
 * 2. Team Collaboration → Multiple people can work on the same project.
 * 3. Backup             → If your laptop crashes, code stays safe.
 * 4. Deployment         → You can host and deploy projects directly 
 *                         from GitHub.
 * 5. Open Source        → You can explore and contribute to others' 
 *                         projects.
 * 
 * Analogy:
 * > Git is your "local diary"
 * > GitHub is "Google Drive for your code"
*/


/**
 * Installation & Setup
 * 1. Install Git:
 *    > Go to: https://git-scm.com/downloads
 *    > Download for your OS (Windows / Mac / Linux)
 *    > Run and install with default options.
 * 
 * 2. Check Installation:
 *    > git --version
 *    > Output: git version 2.x.x
 * 
 * 3. Configure Your Git Identity (only once per computer):
 *    > git config --global user.name "Your Name"
 *    > git config --global user.email "your_email@example.com"
*/


/**
 * Git Workflow (The 3 Main Areas)
 * > Git works in 3 areas:
 *   a. Working Directory
 *   b. Staging Area 
 *   c. Local Repository
 * 
 * > Let's break this down:
 *   1. Working Directory:
 *      - Where you actually write or edit your files.
 *      - Files here are not yet tracked by Git.
 *      - Common Commands:
 *        > git status       → Check which files are changed or untracked
 *        > git add file.txt        → Move file to Staging Area
 *        > git rm file.txt         → Delete & stage that file
 *        > git reset HEAD file.txt → Unstage a file
 * 
 *   2. Staging Area:
 *      - A temporary holding area.
 *      - Here you decide which files you want to save permanently.
 *      - Common Commands:
 *        > git add .          → Stage all files in current folder
 *        > git reset file.txt → Remove file from staging
 * 
 *   3. Local Repository:
 *      - Final stage where your commits(versions) are stored permanently.
 *      - You can view your full project history here.
 *      - Common Commands:
 *        > git commit -m "Added new feature"
 *        > git log → See commit history
 * 
 * Summary:
 * > Working Dir  (create/change files)
 *      ↓
 * > Staging Area (prepare to commit)
 *      ↓
 * > Local Repo   (save snapshot permanently)
*/ 


/**
 * Project Setup:
 * a. git init  
 *    > Meaning: "Start tracking this project folder with Git."
 *    > Use when: Tum ek naya project start kar rahe ho.
 *    > Example: 
 *       git init
 *       (Now a hidden .git folder is created — this becomes a Git 
 *        project.)
 * 
 * b. git clone <url>  
 *    > Meaning: "Make a local copy of someone's GitHub project."
 *    > Use when: Tum kisi existing project pe kaam karna chahte ho.
 *    > Example: 
 *       git clone https://github.com/user/project.git
*/ 

/**
 * Check Status:
 * a. git status  
 *    > Meaning: "Tell me what’s changed."
 *    > Use when: Tum dekhna chahte ho kaunsi files new, changed, ya 
 *      staged hai.
 *    > Example:
 *       git status
 *       (It shows which files are red (untracked) or green (staged).)
 * 
 * b. git diff  
 *    > Meaning: "Show the actual changes (line by line)."
 *    > Use when: Tum dekhna chahte ho exactly kya edit hua file me.
 *    > Example:
 *       git diff
*/

/**
 * Add & Save (Commit) Changes:
 * a. git add <file>  
 *    > Meaning: "Mark this file for saving."
 *    > Use when: Tum specific file ko staging area me bhejna chahte ho.
 *    > Example:
 *       git add index.html
 * 
 * b. git add .  
 *    > Meaning: "Add ALL changed files."
 *    > Use when: Tum sabhi files ek saath stage karna chahte ho.
 *    > Example:
 *       git add .
 * 
 * c. git commit -m "message"  
 *    > Meaning: "Save the staged files permanently in history."
 *    > Use when: Tum ek version save karna chahte ho.
 *    > Example:
 *       git commit -m "Added homepage design"
 *       (Always write short, meaningful message.)
*/

/**
 * Working with Branches:
 * a. git branch  
 *    > Meaning: "List all branches in the project."
 *    > Use when: Tum dekhna chahte ho currently kitni branches hai.
 *    > Example:
 *       git branch
 * 
 * b. git branch <name>  
 *    > Meaning: "Create a new branch (copy of current branch)."
 *    > Use when: Tum ek naya feature develop kar rahe ho.
 *    > Example:
 *       git branch login-feature
 * 
 * c. git checkout <branch>  
 *    > Meaning: "Switch to another branch."
 *    > Use when: Tum kisi aur branch pe kaam karna chahte ho.
 *    > Example:
 *       git checkout login-feature
 * 
 * d. git merge <branch>  
 *    > Meaning: "Combine another branch into current one."
 *    > Use when: Tum feature complete kar chuke ho aur main branch me
 *                lana chahte ho.
 *    > Example:
 *       git merge login-feature
 *    
*/

/**
 * Work with GitHub (Remote Repository)
 * a. git remote add origin <url>  
 *    > Meaning: "Connect your local repo to GitHub repo."
 *    > Use when: Tum pehli baar GitHub se apna project link kar rahe ho.
 *    > Example:
 *       git remote add origin https://github.com/username/myrepo.git
 *    
 * b. git push origin main  
 *    > Meaning: "Upload your commits from local → GitHub."
 *    > Use when: Tum apne code ko GitHub pe bhejna chahte ho.
 *    > Example:
 *       git push origin main
 *    
 * c. git pull origin main  
 *    > Meaning: "Download latest updates from GitHub."
 *    > Use when: Tum chahte ho ki tumhare local repo me GitHub ke 
 *      latest changes aa jaye.
 *    > Example:
 *       git pull origin main
*/

/**
 * Extra Useful Commands
 * a. git log  
 *    > Meaning: "Show all commits with details."
 *    > Use when: Tum past changes dekhna chahte ho.
 *    > Example:
 *       git log
 * 
 * b. git reset <file>  
 *    > Meaning: "Remove a file from staging area."
 *    > Use when: Tum accidentally file add kar li staging me.
 *    > Example:
 *       git reset index.html
 *    
 * c. git stash  
 *    > Meaning: "Save your work temporarily without committing."
 *    > Use when: Tum branch switch karna chahte ho but changes commit
 *      nahi karna chahte.
 *    > Example:
 *       git stash
 *       (Later restore: git stash pop)
 *    
 * d. git fetch  
 *    > Meaning: "Get updates from remote but don’t merge yet."
 *    > Use when: Tum dekhna chahte ho GitHub pe kya naya hai.
 *    > Example:
 *       git fetch
 *    
 * e. git rebase <branch>  
 *    > Meaning: "Reapply your commits on top of another branch."
 *    > Use when: Tum clean commit history banana chahte ho.
 *    > Example:
 *       git rebase main
*/

/**
 * What is the .git Folder?
 * > When you type git init, Git creates a hidden folder called .git 
 *   inside your project.
 * > This folder stores everything about your Git repo.
 * > It's the "brain" of your Git project.
 * 
 * Inside .git/ Folder:
 * 1. config  → Stores Git settings (like your username, email, etc.)
 * 2. HEAD    → Points to your current branch (e.g., main)
 * 3. hooks   → Scripts that run automatically before/after Git commands
 * 4. objects → Actual data of your files, commits, and versions
 * 5. refs    → Stores references (branches, tags, etc.)
 * 
 * Note: Don’t delete or modify `.git/` manually — it can break your repo.
*/ 
