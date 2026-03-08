/**
 * File Operations:
 * 1. Create a file   : touch filename.txt
 * 2. Read a file     : cat filename.txt
 * 3. Write to a file : echo "Hello" > filename.txt
 * 4. Append to a file: echo "More text" >> filename.txt
 * 5. Edit a file     : nano filename.txt / vim filename.txt
 * 6. Delete a file   : rm filename.txt
 * 7. Copy a file     : cp filename.txt newfile.txt
 * 8. Move a file     : mv filename.txt /path/to/destination/
 * 9. Rename a file   : mv oldname.txt newname.txt
*/


/**
 * Folder (Directory) Operations:
 * 1. Create a folder             : mkdir foldername
 * 2. Remove a folder             : rmdir foldername (empty folder only)
 * 3. Remove a folder with content: rm -r foldername
 * 4. Copy a folder               : cp -r foldername newfoldername
 * 5. Move a folder               : mv foldername /path/to/destination/
 * 6. Rename a folder             : mv oldfoldername newfoldername
*/




/**
 * ======================================================================
 * LINUX TERMINAL COMMANDS — File aur Folder Operations (HINGLISH VERSION)
 * ======================================================================
 * 
 * Yeh commands Linux/Mac terminal mein use hote hain files aur folders
 * ke saath kaam karne ke liye. Windows mein bhi Git Bash ya WSL mein
 * ye same commands kaam karte hain.
 * 
 * ======================================================================
 * FILE OPERATIONS — Files ke saath kya kar sakte ho
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Create a file — Nayi file banana                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: touch filename.txt                                      │
 * │                                                                 │
 * │ Kya karta hai: Empty file create kar deta hai. Agar file pehle │
 * │                se exist karti hai to uski timestamp update kar  │
 * │                deta hai (content nahi badalta).                 │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   touch index.js          → index.js file create karo           │
 * │   touch data.json         → JSON file create karo               │
 * │   touch file1.txt file2.txt → Multiple files ek saath create    │
 * │   touch ./src/app.js      → Specific folder mein file create    │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Read a file — File ka content dekhna                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: cat filename.txt                                        │
 * │                                                                 │
 * │ Kya karta hai: File ka saara content terminal par print kar     │
 * │                deta hai. Chhoti files ke liye best hai.         │
 * │                                                                 │
 * │ Alternatives:                                                   │
 * │   less filename.txt  → Page by page dekhne ke liye (arrow keys) │
 * │   head filename.txt  → Sirf first 10 lines dikhata hai          │
 * │   tail filename.txt  → Sirf last 10 lines dikhata hai           │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   cat package.json        → package.json ka content dekho       │
 * │   cat index.js            → JavaScript file ka content dekho    │
 * │   cat file1.txt file2.txt → Dono files ka content ek saath      │
 * │   cat > file.txt          → Direct terminal se likhkar file     │
 * │                            (Ctrl+D se save)                     │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 3. Write to a file — File mein content likhna (overwrite)       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: echo "Hello" > filename.txt                            │
 * │                                                                 │
 * │ Kya karta hai: File mein text likhta hai. Agar file pehle se    │
 * │                exist karti hai to purana content DELETE ho kar  │
 * │                naya content aa jayega.                          │
 * │                                                                 │
 * │ >  = overwrite (purana chala jayega)                            │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   echo "console.log('hi')" > index.js    → JS file create karo  │
 * │   echo "name=John" > .env                 → .env file banao     │
 * │   echo "Hello" > file.txt                 → "Hello" likho       │
 * │   echo "New content" > file.txt           → Purana hatayega     │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Append to a file — File mein content jodna (without delete)  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: echo "More text" >> filename.txt                       │
 * │                                                                 │
 * │ Kya karta hai: File ke END mein naya text add kar deta hai.     │
 * │                Purana content safe rehta hai (overwrite nahi).  │
 * │                                                                 │
 * │ >> = append (end mein jodna)                                    │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   echo "line 2" >> file.txt        → File mein doosri line      │
 * │   echo "export PORT=3000" >> .env   → .env mein setting add     │
 * │   date >> log.txt                  → Current date log mein      │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Edit a file — File ko editor mein kholna                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: nano filename.txt  ya  vim filename.txt                │
 * │                                                                 │
 * │ Kya karta hai: File ko text editor mein open karta hai edit     │
 * │                karne ke liye.                                   │
 * │                                                                 │
 * │ nano → Simple, beginner-friendly                               │
 * │   Ctrl+O → Save, Ctrl+X → Exit, Ctrl+K → Cut line              │
 * │                                                                 │
 * │ vim → Advanced, powerful, par thoda complex                    │
 * │   i → insert mode (likhne ke liye)                             │
 * │   Esc → normal mode                                            │
 * │   :wq → save & exit                                            │
 * │   :q! → exit without save                                      │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   nano index.js           → nano editor mein file kholo         │
 * │   vim package.json        → vim mein file kholo                 │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. Delete a file — File ko hatana                                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: rm filename.txt                                         │
 * │                                                                 │
 * │ Kya karta hai: File permanently delete ho jati hai. Recycle bin │
 * │                mein nahi jati, undo nahi ho sakti.              │
 * │                                                                 │
 * │ Options:                                                        │
 * │   rm -i file.txt  → Delete karne se pehle confirm poochhega    │
 * │   rm -f file.txt  → Force delete (bina confirm ke)              │
 * │   rm file1.txt file2.txt → Multiple files ek saath delete       │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   rm old.js               → old.js delete karo                  │
 * │   rm -i temp.txt          → Confirm ke saath delete             │
 * │   rm *.log                → Saari .log files delete karo        │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 7. Copy a file — File ki copy banana                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: cp filename.txt newfile.txt                            │
 * │                                                                 │
 * │ Kya karta hai: File ki exact copy bana deta hai naye naam se.   │
 * │                Original file safe rehti hai.                    │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   cp index.js backup.js     → index.js ki backup.js copy        │
 * │   cp config.json config.json.bak → Backup file banao            │
 * │   cp file.txt ./backups/     → Doosre folder mein copy          │
 * │   cp -i file.txt new.txt    → Overwrite se pehle confirm        │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 8. Move a file — File ko doosri jagah le jana                   │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: mv filename.txt /path/to/destination/                  │
 * │                                                                 │
 * │ Kya karta hai: File ko ek location se doosri location mein move │
 * │                kar deta hai. Original wali delete ho jati hai.  │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   mv index.js ./src/        → src folder mein move karo         │
 * │   mv data.json ../backups/  → Parent folder mein move           │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 9. Rename a file — File ka naam badalna                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: mv oldname.txt newname.txt                             │
 * │                                                                 │
 * │ Kya karta hai: File ka naam change kar deta hai.                 │
 * │                Note: mv command hi use hota hai move aur rename │
 * │                dono ke liye.                                    │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   mv index.html home.html   → index.html ko home.html rename    │
 * │   mv app.js main.js         → app.js ko main.js karo            │
 * │   mv config.json config.yaml → Extension bhi badal sakte ho     │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ======================================================================
 * FOLDER (DIRECTORY) OPERATIONS — Folders ke saath kya kar sakte ho
 * ======================================================================
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Create a folder — Naya folder banana                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: mkdir foldername                                        │
 * │                                                                 │
 * │ Kya karta hai: Naya directory (folder) create kar deta hai.     │
 * │                                                                 │
 * │ Options:                                                        │
 * │   mkdir -p parent/child/grandchild → Nested folders ek saath   │
 * │                                      (agar parent exist na kare)│
 * │                                                                 │
 * │ Examples:                                                       │
 * │   mkdir src                 → src folder banao                   │
 * │   mkdir css js images       → Multiple folders ek saath         │
 * │   mkdir -p src/components    → src/components dono banao         │
 * │   mkdir -p app/api/routes    → Nested folders chain mein         │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 2. Remove a folder (empty only) — Sirf khali folder hatana      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: rmdir foldername                                        │
 * │                                                                 │
 * │ Kya karta hai: Empty folder delete kar deta hai. Agar folder    │
 * │                empty nahi hai to error dega.                    │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   rmdir empty-folder        → Empty folder delete karo          │
 * │   rmdir temp/               → temp folder delete (agar empty)   │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┤
 * │ 3. Remove a folder with content — Folder aur andar ki files     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: rm -r foldername                                        │
 * │                                                                 │
 * │ Kya karta hai: Folder aur uske ANDAR ki SAARI files/subfolders  │
 * │                recursively delete kar deta hai.                 │
 * │                                                                 │
 * │ Options:                                                        │
 * │   rm -rf foldername  → Force delete (bina confirm ke)          │
 * │   rm -ri foldername  → Har file ke liye confirm poochhega      │
 * │                                                                 │
 * │ ⚠️  WARNING: Ye command bahut powerful hai. Ek galti se saara   │
 * │    kaam delete ho sakta hai. Double check karo!                 │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   rm -r node_modules     → node_modules folder delete (careful) │
 * │   rm -rf temp/           → temp folder aur saari files force   │
 * │   rm -ri old-project/    → Har file confirm ke saath delete     │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 4. Copy a folder — Folder ki copy banana                        │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: cp -r foldername newfoldername                          │
 * │                                                                 │
 * │ Kya karta hai: Folder aur uske ANDAR ki saari files/subfolders  │
 * │                recursively copy kar deta hai.                   │
 * │                                                                 │
 * │ -r = recursive (andar ki saari files ke liye)                   │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   cp -r src backup-src   → src folder ki backup banao           │
 * │   cp -r ./project ./project-backup → Project backup             │
 * │   cp -r images/ ../backups/ → Images folder doosri jagah copy   │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 5. Move a folder — Folder ko doosri jagah le jana               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: mv foldername /path/to/destination/                     │
 * │                                                                 │
 * │ Kya karta hai: Folder (aur uski saari files) ko doosri location │
 * │                mein move kar deta hai.                          │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   mv src ./project/        → src folder project mein move       │
 * │   mv node_modules ../      → node_modules parent folder mein    │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 6. Rename a folder — Folder ka naam badalna                     │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Command: mv oldfoldername newfoldername                          │
 * │                                                                 │
 * │ Kya karta hai: Folder ka naam change kar deta hai.              │
 * │                Files/folder ke andar ki files safe rehti hain.  │
 * │                                                                 │
 * │ Examples:                                                       │
 * │   mv src source           → src folder ko source rename         │
 * │   mv js javascript        → js folder ko javascript rename      │
 * │   mv old-project new-project → Project rename                   │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * ======================================================================
 * BONUS USEFUL COMMANDS
 * ======================================================================
 * 
 * 📂 NAVIGATION:
 *   pwd      → Current folder ka path dikhao
 *   ls       → Current folder ki files/folders list karo
 *   ls -la   → Saari files (including hidden) details ke saath
 *   cd foldername → Folder mein jao
 *   cd ..    → Parent folder mein jao
 *   cd ~     → Home directory mein jao
 *   cd -     → Last folder mein wapas jao
 * 
 * 🔍 FIND/SEARCH:
 *   grep "text" file.txt      → File mein text search karo
 *   grep -r "text" ./         → Saari files mein recursively search
 *   find . -name "*.js"       → .js files dhundo
 * 
 * 📊 FILE INFO:
 *   ls -l file.txt            → File details (size, permissions)
 *   file filename.txt         → File type batata hai
 *   du -sh foldername         → Folder ka size batata hai
 *   df -h                     → Disk space batata hai
 * 
 * 🚀 PROCESSES:
 *   ps aux                    → Saare processes dikhao
 *   top                       → Live process monitor
 *   kill PID                  → Process band karo
 * 
 * 🔐 PERMISSIONS:
 *   chmod +x script.sh        → File executable banao
 *   chmod 755 file.txt        → Specific permissions set karo
 *   chown user:group file.txt → File owner badlo
 * 
 * 📦 DOWNLOAD:
 *   curl https://example.com  → URL se data fetch karo
 *   wget https://example.com/file.zip → File download karo
 * 
 * ======================================================================
 * PRACTICAL EXAMPLES
 * ======================================================================
 * 
 * Example 1: Naya project setup
 *   mkdir my-project
 *   cd my-project
 *   touch index.html style.css script.js
 *   echo "console.log('hello')" > script.js
 * 
 * Example 2: Backup banao
 *   cp -r my-project my-project-backup
 *   tar -czf backup.tar.gz my-project  (zip file banao)
 * 
 * Example 3: Cleanup
 *   rm -rf node_modules
 *   rm package-lock.json
 *   rm -rf .git
 * 
 * Example 4: Log file monitor
 *   tail -f app.log            → Live log dekhna
 *   grep "error" app.log       → Errors search karna
 *   cat app.log | grep "error" | wc -l  → Errors count karna
 * 
 * ======================================================================
 * ⚠️  SAFETY TIPS
 * ======================================================================
 * 
 * 1. rm -rf se hamesha daro! Double check karo path
 * 2. * (wildcard) use karne se pehle ls karo dekh lo kya select hoga
 * 3. > (overwrite) use karne se pehle confirm karo koi important file to nahi
 * 4. sudo se commands chalate waqt careful raho
 * 5. Backup banao pehle, phir delete karo
 * 
 * ======================================================================
 */

// Note: Yeh JavaScript code nahi hai, sirf documentation hai.
// Terminal commands ko directly terminal mein run karo.