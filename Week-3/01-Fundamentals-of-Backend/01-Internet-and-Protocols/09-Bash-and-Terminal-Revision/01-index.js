// Bash & Terminals : (Common Commands)
// 1. pwd : print working directory
//    This is the base directory in our machine. Every thing like document, desktop
//    exists here. 

//    "/Users/kirat" => What is this?

// Terminal is nothing but another interface to do things on your machine like -
// (a) Open folder
// (b) Open files
// (c) Play Videos
// (d) Rename files etc...
// These are the common things we do using the GUI (Graphical User Interface). And
// this is how we usually use machines. But as a hacker/developer, we spend most
// of our time here in "terminal" and this will let us do everything that GUI let's
// you do.

// The terminal will always be in a certain folder. Similar to how our file explorer
// is currently in a certain folder. We can see what folder we are in by typing
// the "pwd" command and we can also navigate inside & outside folders.
// For example, from our file explorer let's go to desktop folder.

// How can we go to desktop folder from file explorer?
// "cd" command => change directory
// "cd Desktop/" => This means our file explorer & terminal are in the same directory.

// How do I go back?
// "cd .." => Means move one folder before the current folder

// How to go 2 folders behind?
// "cd../.."

// What did I do by going to a folder and coming back from the main folder?
// We can use the 3rd command : "ls" => listing all the files in the current folder
// "cd Desktop"
// "ls"
// => Screen Recording 2023-12-13 at 2.41.48 AM.mov(file), screenshots (folder)

// Now this terminal is actually letting us see files

// How do we make/create files & folders ourselves?
// "mkdir" => make directory
// "mkdir test" => A test directory was introduced

// How to check files/folders are created or not?
// "ls"

// Now move to test folder?
// "cd test/"

// Now let's create a file inside test?
// touch => let's us create an empty file
// "touch index.js"
// "touch index.txt" => Hi there!

// If you want to see what exists inside "index.txt". How do we see the content?
// "cat" => prints the content of a file.
// "cat index.txt" => Hi there!

// How can do give relative paths?
// cat test/index.txt => Hi there!
// Means we don't have to be in the same path.

// "vi" or "vim" command : Edit File (very complicated).
// Note : Do not use vim command inside VS Code

// "vi a.txt" will open the txt file and now we can start writing things.
// Notice : We are trying to type but it doesn't let us type anything. And the
// reason for this is vim is very much opinionated and we need to go into something
// called insert mode to insert file. Press "i" to enable the insert mode and
// start writing. (not recommended for beginners)

// How to exit?
// "ESC" => come out of insert mode
// ":q!" => Exit out of vim (without saving content)
// ":wq! => Exit out of vim (with saving content)

// Note : If you are not able to move out then Close the terminal and reopen it.

// "mv" => Move files from one folder to another (Like dragging in GUI)

// How to move "a1.txt" inside "new-folder"?
// "mv a2.txt new-folder"

// How to move folder inside another folder?
// "mv new-folder test2"

// "mv test test2/new-folder"
// This will take "test" to "new-folder" present inside "test2".

// "cp" => Copy Files
// touch a3.js
// cp a3.js test2 => It will copy a3.js to test2

// How to copy a folder inside another folder?
// To copy a folder "cp" expect us to pass a flag "-r"
// cp -r test3 test2

// Note : These 9 commands are unrelated to Node or GIT.

// 2. cd
// 3. ls => dir
// 4. mkdir
// 5. touch
// 6. cat
// 7. vi
// 8. mv
// 9. cp


// Node related Commands :
// 10. nvm
// 11. npm
// 12. node

// We already have node installed in our machine.

// "nvm" : Node Version Manager => Let's us install Node in our machine.
// But there are other ways also (downloade node & install)

// "node" : Type this in CMD, if you found error that means you don't have node
// installed in your machine. If it is installed we can start to write JS Code 
// there

// let a = 2;
// => undefined
// console.log(a);
// 2

// This is another way to test NodeJS Code locally and run it line by line.
// We can exit out of it by pressing "Ctrl + C", if we press again "Ctrl + C" we 
// move out of the Node Shell back to our Normal Bash Shell.

// "clear" to clear the terminal

// "node a.js" : Hi there!


// "npm" : node package manager
// Download and use /libraries/packages/pre-written code or APIs to our machine 
// through "npm".
// Example : Express.js


// 13. git
