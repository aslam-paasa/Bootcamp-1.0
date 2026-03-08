/**
 * Bash Scripting:
 * > A Bash script is a file containing a sequence of commands for the 
 *   Bash shell (Bourne Again Shell). 
 * > Bash is the default shell on most Unix-like operating systems 
 *   (e.g., Linux, macOS). 
 * > Bash scripts automate tasks, simplify system administration, and 
 *   handle repetitive actions.
*/

/**
 * Key Concepts:
 * 1. Automation: Instead of typing commands one by one, you write them in a
 *    script to execute multiple commands at once.
 * 2. Text File: A Bash script is simply a plain text file, typically 
 *    with a `.sh` extension (optional but recommended).
 * 3. Shebang (`#!`): This line (`#!/bin/bash`) tells the system to use
 *    the Bash interpreter to execute the script.
 * 4. Permissions: To run a script, it must be executable. Use `chmod +x
 *    script.sh` to make a script executable.
 * 5. Variables: Variables store data like strings and numbers for reuse
 *    in scripts.
 * 6. Control Flow: Bash supports if-else, loops (`for`, `while`), and 
 *    case statements to manage logic.
 * 7. Execution: After writing and saving the script, execute it with 
 *    `./script.sh` (or `bash script.sh`).
*/

/**
 * Example Script:
 * 
 * #!/bin/bash
 * # A simple Bash script
 * echo "Hello, World!" # Print a message
 * 
 * # Define a variable
 * name="John"
 * echo "Hello, $name!" # Use variable
 * 
 * # If-Else statement
 * if [ "$name" == "John" ]; then
 * echo "Welcome, John!"
 * else
 * echo "You are not John!"
 * fi
*/


/**
 * Creating and Executing a Bash Script:
 * 1. Checking your Shell:
 *    - echo $SHELL # Displays which shell you're using
 * 
 * 2. Creating a Bash Script:
 *    - nano my_script.sh # Create and edit a script
 * 
 * 3. Making the Script Executable:
 *    - chmod +x my_script.sh # Give execute permissions
 * 
 * 4. Running the Script:
 *    - ./my_script.sh # Execute the script
*/


/**
 * Variables in Bash:
 * > Variables store data for use in the script. 
 * > Note: There should be no spaces around the equal sign when assigning
 *   values.
*/

/**
 * Declaring and Using Variables:
 * 
 * name="John" # Declare a variable
 * echo $name # Access the variable
 * 
 * 
 * Example:
 * my_name="Rakesh"
 * age=26
 * 
 * # Using variables
 * echo "My name is $my_name"
 * echo "My age is $age"
*/


/**
 * System Variables:
 * > Bash has predefined environment variables like $USER, which holds 
 *   the current user’s name.
 * 
 * > Ex: echo "The system user is $USER"
*/

/**
 * Difference b/w Single Double Quotes:
 * > Double quotes: Expands variables and command outputs.
 * > Single quotes: Treats everything as literal text.
 * 
 *   - echo "My name is $my_name" # Expands $my_name
 *   - echo 'My name is $my_name' # Outputs "$my_name" literally
*/


/**
 * Mathematical Operations:
 * > Use the expr command to perform calculations in Bash. 
 * > Ensure spaces around operators.
 * 
 *   - expr 10 + 5 # Addition
 *   - expr 15 - 5 # Subtraction
 *   - expr 5 \* 3 # Multiplication (escape * with backslash)
 *   - expr 20 / 4 # Division
 * 
 * > Example:
 *   num1=15
 *   num2=5
 *   echo "The sum of $num1 and $num2 is $(expr $num1 + $num2)"
*/


/**
 * Control Flow (If-Else Statements):
 * > Bash uses if, elif, and else for conditional checks.
 * 
 *   if [ $num -eq 10 ]; then
 *   echo "Number is 10"
 *   else
 *   echo "Number is not 10"
 *   fi
 * 
 * > Comparisons:
 *   - `eq`: Equal to
 *   - `ne`: Not equal to
 *   - `gt`: Greater than
 *   - `lt`: Less than
 * 
 *   # Check if a number is greater than 100
 *   if [ $num -gt 100 ]; then
 *   echo "Greater than 100"
 *   else
 *   echo "Less than or equal to 100"
 *   fi
 */



/**
 * File and Directory Checks:
 * 
 *   # Check if a file exists
 *   if [ -f filename ]; then
 *   echo "File exists"
 *   else
 *   echo "File does not exist"
 *   fi
 */


/**
 * Loops in Bash:
 * > Loops allow repetitive execution of code.
 * 
 * 1. While Loop:
 *    # Check if a file exists
 *    if [ -f filename ]; then
 *    echo "File exists"
 *    else
 *    echo "File does not exist"
 *    fi
 * 
 * 2. For Loop:
 *    for i in {1..5}; do
 *    echo "Loop number $i"
 *    done
 * 
 * 3. File Loop:
 *    for file in *.txt; do
 *    echo "Processing $file"
 *    done
 */


/**
 * Exit Codes:
 * > Exit codes (status codes) indicate whether a command was successful
 *   (0) or failed (1).
 * 
 * > Check Exit Code:
 *    if [ $? -eq 0 ]; then
 *    echo "Command was successful"
 *    else
 *    echo "Command failed"
 *    fi
*/

/**
 * Error Handling with Exit Codes:
 * > You can also store the exit status of commands to handle errors more
 *   effectively.
 * 
 * > Example:
 *   package="htop"
 *   sudo apt install -y $package
 *   if [ $? -ne 0 ]; then
 *   echo "Installation failed"
 *   else
 *   echo "Package installed successfully"
 *   fi
 */


/**
 * Redirecting Output and Errors:
 * a. >: Redirect standard output (overwrite).
 * b. >>: Append standard output.
 * c. 2>: Redirect standard error.
 * d. &>: Redirect both output and error.
 * 
 * > Example:
 *   # Redirect output to file
 *   echo "Hello, World!" > output.txt
 * 
 *   # Redirect errors to a file
 *   find /etc -type f 2> error.log
 * 
 *   # Redirect both output and error to the same file
 *   find /etc -type f &> output_and_error.log
 */


/**
 * Functions in Bash:
 * > Functions help modularize code, making it reusable and easier to 
 *   maintain.
 * 
 * > Example:
 *   # Define a function
 *   my_function() {
 *   echo "This is a function"
 *   }
 * 
 *   # Call the function
 *   my_function
 * 
 * 
 * > Example: Function with Error Handling:
 * 
 *   check_error() {
 *    if [ $? -ne 0 ]; then
 *     echo "An error occurred!"
 *    fi
 *   }
 *   
 *   # Usage in script
 *   sudo apt update
 *   check_error
*/


/**
 * Data Streams:
 * > In Bash scripting, a data stream refers to the flow of data from 
 *   one point to another. 
 * > Data streams are commonly used for communication between processes.
 * 
 *   #!/bin/bash
 *   
 *   # Explanation:
 *   # This script demonstrates stdin, stdout, stderr, and data
 *   redirection in Bash.
 *   
 *   
 *   # 1. Simulate reading from stdin (Standard Input):
 *   echo "Please enter your name:"
 *   read name # Reading user input
 *   
 *   
 *   # 2. Simulate stdout (Standard Output) - Writing the output to a
 *   file:
 *   echo "Hello, $name!" > output.txt # The greeting is written to
 *   output.txt
 *   
 *   
 *   # 3. Simulate stderr (Standard Error) - Writing an error message:
 *   echo "This is an error message." >&2 # The error message is sent
 *   to stderr
 *   
 *   
 *   # 4. Redirecting both stdout and stderr to the same file:
 *   ls /nonexistentdirectory > combined_output.log 2>&1 # This
 *   command fails and sends both stdout and stderr to
 *   combined_output.log
 *   
 *   
 *   # 5. Simulating piping output - Using pipe to send output from
 *   one command to another:
 *   echo "This is a test" | grep "test" > pipe_output.txt # The
 *   string is piped to grep, which filters it and writes the result
 *   to pipe_output.txt
 *   
 *   
 *   # 6. Showing the contents of the files created:
 *   echo "Contents of output.txt:"
 *   cat output.txt # Displaying the content of output.txt
 *   
 *   echo "Contents of combined_output.log:"
 *   cat combined_output.log # Displaying the content of
 *   combined_output.log
 *   
 *   echo "Contents of pipe_output.txt:"
 *   cat pipe_output.txt # Displaying the content of pipe_output.txt
*/

/**
 * a. stdin: The input stream from which the script receives data 
 *    (user input, file content).
 * b. stdout: The output stream used by the script to print results 
 *    (to the terminal or to a file).
 * c. stderr: The error stream used by the script to print error messages.
 * d. Redirection: The process of sending output to files or other destinations.
 * e. Pipe: A way to send the output of one command to the input of another.
*/



/**
 * Updating Scripts for Multiple Distributions:
 * > You can write scripts that check the Linux distribution and perform
 *   different actions based on the result.
 * 
 * > Example:
 *   #!/bin/bash
 *
 *   release_file=/etc/os-release
 *
 *   if grep -q "Arch" $release_file; then
 *   sudo pacman -Syu
 *   fi
 *     
 *   if grep -q "Ubuntu" $release_file || grep -q "Debian"
 *   $release_file; then
 *   sudo apt update && sudo apt dist-upgrade
 *   fi
*/


/**
 * Adding Scripts to PATH:
 * > To make your script accessible from anywhere:
 * 
 * > Example:
 *   # Move it to /usr/local/bin:
 *   sudo mv script.sh /usr/local/bin/
 * 
 *   # Change its permissions:
 *   sudo chmod +x /usr/local/bin/script.sh
 * 
 *   # Add /usr/local/bin to your PATH:
 *   export PATH=$PATH:/usr/local/bin
*/


/**
 * Passing Arguments in Bash:
 * > You can write scripts that check the Linux distribution and
 *   perform different actions based on the result.
 * > You can pass arguments to a Bash script when running it from the
 *   command line. These arguments can be accessed using special
 *   variables:
 * 
 *   $0: Script name.
 *   $1, $2, $3, etc.: First, second, third arguments.
 *   $# Total number of arguments.
 *   $@ All arguments as a list.
 *   $* All arguments as a single string.
 * 
 * > Example:
 * 
 *   #!/bin/bash
 * 
 *   # Accessing passed arguments
 *   echo "Script name: $0"
 *   echo "First argument: $1"
 *   echo "Second argument: $2"
 *   echo "Total arguments: $#"
 *   echo "All arguments: $@"
 * 
 *   # Conditional check
 *   if [ $# -lt 2 ]; then
 *   echo "You need at least 2 arguments!"
 *   else
 *   echo "Arguments passed correctly!"
 *   fi
 * 
 * > Save the script to a file (e.g., args_example.sh).
 * > Give execute permission: chmod +x args_example.sh
 * > Run the script with arguments: ./args_example.sh arg1 arg2
*/







/**
 * =====================================================================
 * THE AUTOMATION CHEF: A STORY OF BASH SCRIPTING
 * =====================================================================
 * 
 * CHAPTER 1: MEET THE AUTOMATION CHEF
 * =====================================================================
 * 
 * Imagine you're a chef in a busy kitchen. Every day, you do the same
 * tasks over and over:
 * 
 * - Chop vegetables
 * - Boil water
 * - Preheat oven
 * - Mix ingredients
 * - Wash dishes
 * 
 * Wouldn't it be amazing if you could write down ALL these steps in a
 * RECIPE, and then just say "MAKE DINNER" and everything happens
 * automatically?
 * 
 * That's exactly what BASH SCRIPTING is!
 * 
 * A Bash script is like a RECIPE for your computer:
 * 📝 You write down all the commands in a file
 * 🏃 Then you run that file, and the computer follows your recipe
 * 🤖 Automatically, step by step
 * 
 * 
 * CHAPTER 2: THE KITCHEN TOOLS (What You Need)
 * =====================================================================
 * 
 * TOOL 1: THE SHELL (Your Kitchen)
 * ---------------------------------------------------------------------
 * The shell is where you cook up commands. Check which one you have:
 * 
 * echo $SHELL
 * # Output: /bin/bash  (You're in the Bash kitchen!)
 * 
 * TOOL 2: A RECIPE FILE (Your Script)
 * ---------------------------------------------------------------------
 * Create a new recipe (script file):
 * nano my_first_recipe.sh
 * 
 * TOOL 3: EXECUTE PERMISSION (The "Cook Now" Button)
 * ---------------------------------------------------------------------
 * Before you can cook, you need to make the recipe executable:
 * chmod +x my_first_recipe.sh
 * 
 * TOOL 4: RUNNING THE RECIPE
 * ---------------------------------------------------------------------
 * Now cook!
 * ./my_first_recipe.sh
 * 
 * 
 * CHAPTER 3: YOUR FIRST RECIPE (Hello World!)
 * =====================================================================
 * 
 * Let's write our first Bash recipe:
 * 
 * #!/bin/bash
 * # My first Bash script - The Hello World Recipe
 * 
 * echo "Hello, World!"
 * echo "I am learning Bash scripting!"
 * echo "Today is: $(date)"
 * 
 * LINE BY LINE EXPLANATION:
 * ---------------------------------------------------------------------
 * 
 * LINE 1: #!/bin/bash
 *    This is called the SHEBANG (like a magic spell)
 *    It tells the computer: "Hey! Use the Bash interpreter to cook this recipe!"
 *    Think of it as: "This recipe is written in the Bash language"
 * 
 * LINE 2: # My first Bash script...
 *    Anything after # is a COMMENT (like chef's notes)
 *    The computer ignores comments - they're just for humans
 * 
 * LINE 3: echo "Hello, World!"
 *    echo is like the computer's voice
 *    It prints whatever you say to the screen
 * 
 * LINE 4: echo "Today is: $(date)"
 *    $(date) runs the date command and puts its output here
 *    Like asking the computer: "What time is it?"
 * 
 * 
 * CHAPTER 4: VARIABLES - THE INGREDIENT BOWLS
 * =====================================================================
 * 
 * Just like a chef has bowls to hold ingredients, Bash has VARIABLES
 * to hold information.
 * 
 * THE GOLDEN RULE OF VARIABLES:
 * ---------------------------------------------------------------------
 * When PUTTING something IN a bowl:    name="value"  (NO spaces around =)
 * When TAKING something OUT:            $name         (Use $ sign)
 * 
 * BASIC VARIABLE RECIPE:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # Declaring variables (putting ingredients in bowls)
 * chef_name="Rakesh"
 * age=26
 * favorite_dish="Biryani"
 * 
 * # Using variables (taking ingredients out)
 * echo "My name is $chef_name"
 * echo "I am $age years old"
 * echo "I love $favorite_dish"
 * 
 * OUTPUT:
 * My name is Rakesh
 * I am 26 years old
 * I love Biryani
 * 
 * 
 * CHAPTER 5: SYSTEM VARIABLES - THE KITCHEN'S BUILT-IN INGREDIENTS
 * =====================================================================
 * 
 * The kitchen already has some pre-filled bowls:
 * 
 * echo "I am logged in as: $USER"        # Your username
 * echo "My home is: $HOME"                # Your home directory
 * echo "My current location: $PWD"         # Where you are now
 * echo "My computer's name: $HOSTNAME"     # Your machine's name
 * echo "My shell is: $SHELL"               # Which shell you're using
 * 
 * 
 * CHAPTER 6: QUOTES - THE MAGIC QUOTATION MARKS
 * =====================================================================
 * 
 * DOUBLE QUOTES " " : The Expander
 * ---------------------------------------------------------------------
 * They look inside and expand variables:
 * 
 * name="Rakesh"
 * echo "Hello, $name"    # Output: Hello, Rakesh
 * 
 * SINGLE QUOTES ' ' : The Literalist
 * ---------------------------------------------------------------------
 * They treat everything as plain text:
 * 
 * name="Rakesh"
 * echo 'Hello, $name'    # Output: Hello, $name
 * 
 * 
 * CHAPTER 7: MATH IN BASH - THE KITCHEN CALCULATOR
 * =====================================================================
 * 
 * METHOD 1: expr (The Old Way)
 * ---------------------------------------------------------------------
 * expr 10 + 5     # Addition (15)
 * expr 15 - 5     # Subtraction (10)
 * expr 5 \* 3     # Multiplication (15) - Note the backslash!
 * expr 20 / 4     # Division (5)
 * 
 * ⚠️ IMPORTANT: Spaces are REQUIRED around operators!
 *    expr 10+5    # WRONG! Won't work
 *    expr 10 + 5  # RIGHT!
 * 
 * METHOD 2: $(( )) (The Modern Way - Easier!)
 * ---------------------------------------------------------------------
 * echo $((10 + 5))     # Addition
 * echo $((15 - 5))     # Subtraction
 * echo $((5 * 3))      # Multiplication (no backslash needed!)
 * echo $((20 / 4))     # Division
 * 
 * REAL RECIPE EXAMPLE:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # Ingredients
 * eggs=12
 * flour_cups=4
 * sugar_cups=2
 * 
 * # Calculations
 * total_ingredients=$((eggs + flour_cups + sugar_cups))
 * double_flour=$((flour_cups * 2))
 * 
 * echo "Total items: $total_ingredients"
 * echo "Double flour needed: $double_flour cups"
 * 
 * 
 * CHAPTER 8: CONDITIONALS - THE DECISION MAKER
 * =====================================================================
 * 
 * Sometimes your recipe needs to make decisions:
 * IF the water is boiling, THEN add pasta
 * ELSE wait longer
 * 
 * THE IF-THEN-ELSE STRUCTURE:
 * ---------------------------------------------------------------------
 * if [ CONDITION ]; then
 *     # Do this if condition is true
 * else
 *     # Do this if condition is false
 * fi
 * 
 * COMPARISON OPERATORS (For numbers):
 * ---------------------------------------------------------------------
 * -eq : Equal to           (if [ $age -eq 18 ])
 * -ne : Not equal to       (if [ $age -ne 18 ])
 * -gt : Greater than       (if [ $age -gt 18 ])
 * -lt : Less than          (if [ $age -lt 18 ])
 * -ge : Greater or equal   (if [ $age -ge 18 ])
 * -le : Less or equal      (if [ $age -le 18 ])
 * 
 * STRING COMPARISONS:
 * ---------------------------------------------------------------------
 * =   : Equal to           (if [ "$name" = "John" ])
 * !=  : Not equal to       (if [ "$name" != "John" ])
 * -z  : Empty string       (if [ -z "$name" ])
 * -n  : Not empty          (if [ -n "$name" ])
 * 
 * FILE CHECKS:
 * ---------------------------------------------------------------------
 * -f file : Is it a file?          (if [ -f "/etc/passwd" ])
 * -d dir  : Is it a directory?     (if [ -d "/home" ])
 * -e file : Does it exist?         (if [ -e "myfile.txt" ])
 * -r file : Is it readable?        (if [ -r "secret.txt" ])
 * -w file : Is it writable?        (if [ -w "config.cfg" ])
 * -x file : Is it executable?      (if [ -x "script.sh" ])
 * 
 * REAL RECIPE EXAMPLES:
 * ---------------------------------------------------------------------
 * 
 * EXAMPLE 1: Age Checker
 * #!/bin/bash
 * 
 * age=25
 * 
 * if [ $age -ge 18 ]; then
 *     echo "You are an adult"
 * else
 *     echo "You are a minor"
 * fi
 * 
 * EXAMPLE 2: File Checker
 * #!/bin/bash
 * 
 * filename="notes.txt"
 * 
 * if [ -f "$filename" ]; then
 *     echo "$filename exists!"
 *     echo "Here's what's inside:"
 *     cat "$filename"
 * else
 *     echo "$filename does not exist"
 *     echo "Creating it now..."
 *     touch "$filename"
 * fi
 * 
 * EXAMPLE 3: Multiple Conditions
 * #!/bin/bash
 * 
 * num=15
 * 
 * if [ $num -gt 10 ] && [ $num -lt 20 ]; then
 *     echo "$num is between 10 and 20"
 * elif [ $num -eq 10 ]; then
 *     echo "$num is exactly 10"
 * else
 *     echo "$num is not in range"
 * fi
 * 
 * 
 * CHAPTER 9: LOOPS - THE REPETITION MASTER
 * =====================================================================
 * 
 * Sometimes you need to do the same thing multiple times.
 * Like chopping 10 onions - you do the same action 10 times.
 * 
 * TYPE 1: WHILE LOOP (Keep going WHILE condition is true)
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * count=1
 * 
 * while [ $count -le 5 ]; do
 *     echo "Chopping onion number $count"
 *     count=$((count + 1))
 * done
 * 
 * echo "All onions chopped!"
 * 
 * OUTPUT:
 * Chopping onion number 1
 * Chopping onion number 2
 * Chopping onion number 3
 * Chopping onion number 4
 * Chopping onion number 5
 * All onions chopped!
 * 
 * TYPE 2: FOR LOOP (For each item in a list)
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # Loop through numbers
 * for i in 1 2 3 4 5; do
 *     echo "Number: $i"
 * done
 * 
 * # Loop with range
 * for i in {1..5}; do
 *     echo "Range number: $i"
 * done
 * 
 * # Loop through files
 * for file in *.txt; do
 *     echo "Processing text file: $file"
 * done
 * 
 * # Loop through array
 * chefs=("Rakesh" "Priya" "Ahmed" "Maria")
 * for chef in "${chefs[@]}"; do
 *     echo "Welcome, Chef $chef!"
 * done
 * 
 * 
 * CHAPTER 10: FUNCTIONS - THE MINI-RECIPES
 * =====================================================================
 * 
 * Functions are like mini-recipes inside your main recipe.
 * Write once, use many times!
 * 
 * BASIC FUNCTION STRUCTURE:
 * ---------------------------------------------------------------------
 * function_name() {
 *     # Commands go here
 *     echo "I'm a function!"
 * }
 * 
 * # Call the function
 * function_name
 * 
 * REAL EXAMPLE WITH ERROR HANDLING:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # Define a function to check for errors
 * check_error() {
 *     if [ $? -ne 0 ]; then
 *         echo "❌ ERROR: Something went wrong!"
 *         exit 1
 *     else
 *         echo "✅ Success!"
 *     fi
 * }
 * 
 * # Define a function to install a package
 * install_package() {
 *     package=$1
 *     echo "Installing $package..."
 *     sudo apt install -y "$package"
 *     check_error
 * }
 * 
 * # Define a function to backup a file
 * backup_file() {
 *     file=$1
 *     backup_dir="backups"
 *     
 *     # Create backup directory if it doesn't exist
 *     if [ ! -d "$backup_dir" ]; then
 *         mkdir "$backup_dir"
 *     fi
 *     
 *     cp "$file" "$backup_dir/$file.backup-$(date +%Y%m%d)"
 *     echo "✅ Backed up $file"
 * }
 * 
 * # MAIN SCRIPT - Using our functions
 * echo "=== System Setup Script ==="
 * 
 * # Use the functions
 * install_package "htop"
 * install_package "git"
 * 
 * backup_file "important.txt"
 * 
 * echo "=== Script Complete ==="
 * 
 * 
 * CHAPTER 11: EXIT CODES - THE SUCCESS SIGNAL
 * =====================================================================
 * 
 * Every command in Linux returns an EXIT CODE:
 * 0 = Success (like a thumbs up)
 * 1-255 = Failure (like a thumbs down)
 * 
 * CHECKING EXIT CODES:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # Try to install a package
 * sudo apt install -y some-package
 * 
 * # Check if it worked
 * if [ $? -eq 0 ]; then
 *     echo "✅ Package installed successfully!"
 * else
 *     echo "❌ Installation failed!"
 * fi
 * 
 * $? is a special variable that holds the exit code of the LAST command
 * 
 * 
 * CHAPTER 12: DATA STREAMS - THE THREE PIPES
 * =====================================================================
 * 
 * Every command has THREE pipes for data:
 * 
 * PIPE 0: stdin (Standard Input) - What goes IN
 *    Keyboard input, data from another command
 * 
 * PIPE 1: stdout (Standard Output) - Normal output
 *    Success messages, results
 * 
 * PIPE 2: stderr (Standard Error) - Error output
 *    Error messages, warnings
 * 
 * REDIRECTING THE PIPES:
 * ---------------------------------------------------------------------
 * # Save normal output to a file
 * echo "Hello" > output.txt          # Overwrite
 * echo "World" >> output.txt          # Append
 * 
 * # Save errors to a file
 * ls /fakefolder 2> errors.txt
 * 
 * # Save both normal and error to same file
 * ls /fakefolder &> everything.txt
 * 
 * # Throw away errors (send to /dev/null - the black hole)
 * ls /fakefolder 2> /dev/null
 * 
 * # Send output of one command to another (PIPE)
 * echo "Hello World" | grep "Hello"   # | sends stdout to next command
 * 
 * REAL EXAMPLE:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # This script demonstrates all three streams
 * 
 * echo "=== Streams Demo ==="
 * 
 * # 1. stdin - Read user input
 * echo "Enter your name:"
 * read name
 * 
 * # 2. stdout - Save to file
 * echo "Hello, $name!" > greeting.txt
 * echo "✅ Saved greeting to greeting.txt"
 * 
 * # 3. stderr - Show error
 * echo "This is a warning" >&2
 * 
 * # 4. Redirect both to same file
 * find /fakefolder &> output.log 2>&1
 * echo "✅ Combined output saved to output.log"
 * 
 * # 5. Piping - chain commands
 * echo "apple banana cherry" | tr ' ' '\n' | sort > fruits.txt
 * echo "✅ Sorted fruits saved to fruits.txt"
 * 
 * 
 * CHAPTER 13: SMART SCRIPTS - ADAPTING TO DIFFERENT SYSTEMS
 * =====================================================================
 * 
 * A smart chef adapts to different kitchens. Similarly, smart scripts
 * adapt to different Linux distributions.
 * 
 * DETECT THE DISTRIBUTION:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * 
 * # Check which Linux distribution we're on
 * if [ -f /etc/os-release ]; then
 *     source /etc/os-release
 *     echo "Detected OS: $NAME"
 *     
 *     if [[ "$NAME" == *"Ubuntu"* ]] || [[ "$NAME" == *"Debian"* ]]; then
 *         echo "Using apt package manager"
 *         sudo apt update
 *         sudo apt upgrade -y
 *         
 *     elif [[ "$NAME" == *"Arch"* ]]; then
 *         echo "Using pacman package manager"
 *         sudo pacman -Syu
 *         
 *     elif [[ "$NAME" == *"Fedora"* ]]; then
 *         echo "Using dnf package manager"
 *         sudo dnf upgrade
 *         
 *     else
 *         echo "Unknown distribution. Please update manually."
 *     fi
 * else
 *     echo "Cannot detect OS"
 * fi
 * 
 * 
 * CHAPTER 14: PASSING ARGUMENTS - THE RECIPE INPUTS
 * =====================================================================
 * 
 * Just like a recipe can take different ingredients, scripts can take
 * different ARGUMENTS.
 * 
 * SPECIAL ARGUMENT VARIABLES:
 * ---------------------------------------------------------------------
 * $0 : Script name
 * $1 : First argument
 * $2 : Second argument
 * $3 : Third argument
 * $# : Total number of arguments
 * $@ : All arguments as separate words
 * $* : All arguments as one string
 * 
 * EXAMPLE:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * # File: greet.sh
 * 
 * echo "Script name: $0"
 * echo "First argument: $1"
 * echo "Second argument: $2"
 * echo "Total arguments: $#"
 * echo "All arguments: $@"
 * 
 * if [ $# -lt 2 ]; then
 *     echo "❌ Error: Need at least 2 arguments!"
 *     echo "Usage: $0 <name> <greeting>"
 *     exit 1
 * else
 *     echo "✅ $2, $1!"
 * fi
 * 
 * RUN IT:
 * chmod +x greet.sh
 * ./greet.sh Rakesh Hello
 * 
 * OUTPUT:
 * Script name: ./greet.sh
 * First argument: Rakesh
 * Second argument: Hello
 * Total arguments: 2
 * All arguments: Rakesh Hello
 * ✅ Hello, Rakesh!
 * 
 * 
 * CHAPTER 15: REAL-WORLD SCRIPT EXAMPLE
 * =====================================================================
 * 
 * Let's put it all together - A System Maintenance Script:
 * ---------------------------------------------------------------------
 * #!/bin/bash
 * # System Maintenance Script
 * # Author: Chef Rakesh
 * # Date: 2024
 * 
 * # Colors for pretty output
 * RED='\033[0;31m'
 * GREEN='\033[0;32m'
 * YELLOW='\033[1;33m'
 * NC='\033[0m' # No Color
 * 
 * # Function to print colored messages
 * print_status() {
 *     if [ $1 -eq 0 ]; then
 *         echo -e "${GREEN}✅ $2${NC}"
 *     else
 *         echo -e "${RED}❌ $2${NC}"
 *     fi
 * }
 * 
 * # Function to check if command exists
 * command_exists() {
 *     command -v "$1" >/dev/null 2>&1
 * }
 * 
 * # Function to create backup
 * create_backup() {
 *     backup_dir="/tmp/backup_$(date +%Y%m%d_%H%M%S)"
 *     mkdir -p "$backup_dir"
 *     
 *     echo -e "${YELLOW}📦 Creating backup in $backup_dir...${NC}"
 *     
 *     # Backup important configs
 *     cp /etc/passwd "$backup_dir/" 2>/dev/null
 *     cp /etc/group "$backup_dir/" 2>/dev/null
 *     
 *     if [ $? -eq 0 ]; then
 *         echo -e "${GREEN}✅ Backup created${NC}"
 *     else
 *         echo -e "${RED}❌ Backup failed${NC}"
 *     fi
 * }
 * 
 * # Function to update system
 * update_system() {
 *     echo -e "${YELLOW}🔄 Updating system...${NC}"
 *     
 *     if command_exists apt; then
 *         sudo apt update && sudo apt upgrade -y
 *         print_status $? "System updated"
 *     elif command_exists pacman; then
 *         sudo pacman -Syu
 *         print_status $? "System updated"
 *     else
 *         echo -e "${RED}❌ Unknown package manager${NC}"
 *     fi
 * }
 * 
 * # Function to check disk usage
 * check_disk() {
 *     echo -e "${YELLOW}💾 Checking disk usage...${NC}"
 *     df -h | grep -E '^/dev/' | while read line; do
 *         usage=$(echo $line | awk '{print $5}' | sed 's/%//')
 *         mount=$(echo $line | awk '{print $6}')
 *         
 *         if [ $usage -gt 90 ]; then
 *             echo -e "${RED}⚠️  Critical: $mount is ${usage}% full${NC}"
 *         elif [ $usage -gt 75 ]; then
 *             echo -e "${YELLOW}⚠️  Warning: $mount is ${usage}% full${NC}"
 *         else
 *             echo -e "${GREEN}✅ $mount: ${usage}% used${NC}"
 *         fi
 *     done
 * }
 * 
 * # Function to cleanup old logs
 * cleanup_logs() {
 *     echo -e "${YELLOW}🧹 Cleaning old logs...${NC}"
 *     
 *     # Find and delete logs older than 30 days
 *     find /var/log -name "*.log" -type f -mtime +30 -delete 2>/dev/null
 *     
 *     print_status $? "Logs cleaned"
 * }
 * 
 * # Main script
 * main() {
 *     echo "=================================="
 *     echo "   SYSTEM MAINTENANCE SCRIPT"
 *     echo "=================================="
 *     echo "Started at: $(date)"
 *     echo ""
 *     
 *     # Check if running as root
 *     if [ $EUID -ne 0 ]; then
 *         echo -e "${RED}❌ Please run as root${NC}"
 *         exit 1
 *     fi
 *     
 *     # Run maintenance tasks
 *     create_backup
 *     echo ""
 *     
 *     update_system
 *     echo ""
 *     
 *     check_disk
 *     echo ""
 *     
 *     cleanup_logs
 *     echo ""
 *     
 *     echo "=================================="
 *     echo "Maintenance complete at: $(date)"
 *     echo "=================================="
 * }
 * 
 * # Run the main function
 * main
 * 
 * 
 * CHAPTER 16: QUICK REFERENCE CARD
 * =====================================================================
 * 
 * SCRIPT BASICS:
 * ---------------------------------------------------------------------
 * #!/bin/bash           # Shebang - tells which shell to use
 * chmod +x script.sh    # Make executable
 * ./script.sh           # Run script
 * bash script.sh        # Run with bash explicitly
 * 
 * VARIABLES:
 * ---------------------------------------------------------------------
 * name="value"          # Assign (NO spaces!)
 * $name                 # Use variable
 * ${name}               # Use variable (safer in strings)
 * 
 * SPECIAL VARIABLES:
 * ---------------------------------------------------------------------
 * $0 - Script name
 * $1-$9 - Arguments
 * $# - Number of arguments
 * $@ - All arguments
 * $? - Last exit code
 * $$ - Current script PID
 * 
 * COMPARISONS:
 * ---------------------------------------------------------------------
 * Numbers: -eq, -ne, -gt, -lt, -ge, -le
 * Strings: =, !=, -z, -n
 * Files: -f, -d, -e, -r, -w, -x
 * 
 * CONTROL FLOW:
 * ---------------------------------------------------------------------
 * if [ condition ]; then ... fi
 * for i in list; do ... done
 * while [ condition ]; do ... done
 * 
 * REDIRECTION:
 * ---------------------------------------------------------------------
 * >  file    # stdout to file (overwrite)
 * >> file    # stdout to file (append)
 * 2> file    # stderr to file
 * &> file    # both to file
 * cmd1 | cmd2  # pipe stdout to next command
 * 
 * 
 * THE GOLDEN RULES OF BASH SCRIPTING:
 * =====================================================================
 * 1. Always start with #!/bin/bash
 * 2. Make scripts executable with chmod +x
 * 3. Use comments (#) to explain your code
 * 4. No spaces around = when assigning variables
 * 5. Quote variables ("$var") to prevent word splitting
 * 6. Check exit codes ($?) for error handling
 * 7. Test with small examples before running on real systems
 * 8. Use functions to organize code
 * 9. Add usage messages for scripts that take arguments
 * 10. Always consider what happens if something fails
 * 
 * AND REMEMBER: A good Bash script is like a good recipe -
 * clear instructions, proper ingredients, and delicious results!
 * =====================================================================
 */


















/**
 * ======================================================================
 * BASH SCRIPTING — Complete Guide (HINGLISH VERSION)
 * ======================================================================
 * 
 * BASH SCRIPT KYA HAI?
 * ────────────────────────
 * Bash script ek file hoti hai jismein commands ka sequence likha hota hai
 * Bash shell ke liye. Bash (Bourne Again Shell) default shell hai zyada
 * Unix-like systems par (Linux, macOS).
 * 
 * Bash scripts automate tasks karte hain, system administration simplify
 * karte hain, aur repetitive actions handle karte hain.
 * 
 * ======================================================================
 * 📌 KEY CONCEPTS — Basic Baatein
 * ======================================================================
 */

/**
 * ─────────────────────────────────────────────────────────────────────
 * 1. Automation (Automatic Kaam)
 * ─────────────────────────────────────────────────────────────────────
 *    Ek ek karke commands type karne ki jagah, tum ek script mein saare
 *    commands likh do aur ek baar mein execute karo.
 * 
 *    Jaise: 10 onions kaatne ke liye 10 baar knife chalane ki jagah,
 *           ek machine bana lo jo 10 onions ek saath kaat de.
 * 
 * ─────────────────────────────────────────────────────────────────────
 * 2. Text File (Script File)
 * ─────────────────────────────────────────────────────────────────────
 *    Bash script ek plain text file hoti hai, usually `.sh` extension ke
 *    saath (optional hai but recommended).
 * 
 *    Example: myscript.sh, backup.sh, deploy.sh
 * 
 * ─────────────────────────────────────────────────────────────────────
 * 3. Shebang (#!) — The Magic Spell
 * ─────────────────────────────────────────────────────────────────────
 *    Yeh first line hoti hai jo batati hai ki kaunsa interpreter use karna hai.
 *    
 *    #!/bin/bash
 *    
 *    Matlab: "Is recipe ko Bash language mein cook karo!"
 * 
 * ─────────────────────────────────────────────────────────────────────
 * 4. Permissions (Execute Permission)
 * ─────────────────────────────────────────────────────────────────────
 *    Script chalane ke liye use executable banana padta hai:
 *    
 *    chmod +x script.sh
 * 
 * ─────────────────────────────────────────────────────────────────────
 * 5. Execution (Script Chalana)
 * ─────────────────────────────────────────────────────────────────────
 *    Script chalane ke do tarike:
 *    
 *    ./script.sh     # Direct execute (permission chahiye)
 *    bash script.sh  # Bash interpreter se execute
 * 
 * ======================================================================
 * 🍳 YOUR FIRST RECIPE — Hello World Script
 * ======================================================================
 * 
 * #!/bin/bash
 * # Mera pehla Bash script
 * 
 * echo "Hello, World!"
 * echo "Main Bash seekh raha hoon!"
 * echo "Aaj ki date: $(date)"
 * 
 * LINE BY LINE EXPLANATION:
 * ─────────────────────────────────────────────────────────────────────
 * LINE 1: #!/bin/bash
 *    Shebang — batata hai ki Bash use karo.
 * 
 * LINE 2: # Mera pehla...
 *    Comment — sirf humans ke liye, computer ignore karega.
 * 
 * LINE 3: echo "Hello, World!"
 *    echo command screen par print karta hai.
 * 
 * LINE 4: echo "Aaj ki date: $(date)"
 *    $(date) means "date command chalao aur uska output yahan do".
 * 
 * ======================================================================
 * 🥣 VARIABLES — Ingredients Ke Bowls
 * ======================================================================
 * 
 * Variables data store karne ke liye hote hain — jaise chef ke paas bowls.
 * 
 * GOLDEN RULE OF VARIABLES:
 * ─────────────────────────────────────────────────────────────────────
 * VALUE DALO:     name="Rakesh"     (NO spaces around =)
 * VALUE NIKALO:   $name              ($ sign use karo)
 * 
 * BASIC VARIABLE EXAMPLE:
 * ─────────────────────────────────────────────────────────────────────
 * #!/bin/bash
 * 
 * # Variables declare karo
 * chef_name="Rakesh"
 * age=26
 * favorite_dish="Biryani"
 * 
 * # Variables use karo
 * echo "Mera naam $chef_name hai"
 * echo "Main $age saal ka hoon"
 * echo "Mujhe $favorite_dish pasand hai"
 * 
 * OUTPUT:
 *   Mera naam Rakesh hai
 *   Main 26 saal ka hoon
 *   Mujhe Biryani pasand hai
 * 
 * ======================================================================
 * 🏠 SYSTEM VARIABLES — Kitchen Ke Built-in Bowls
 * ======================================================================
 * 
 * System already kuch variables provide karta hai:
 * 
 * echo "Main logged in hoon as: $USER"        # Tumhara username
 * echo "Mera ghar: $HOME"                      # Home directory
 * echo "Abhi kahan hoon: $PWD"                  # Current location
 * echo "Computer ka naam: $HOSTNAME"            # Machine name
 * echo "Mera shell: $SHELL"                     # Kaunsa shell use kar rahe
 * 
 * ======================================================================
 * 🎯 QUOTES — Single vs Double Quotes
 * ======================================================================
 * 
 * DOUBLE QUOTES " " — The Expander
 * ─────────────────────────────────────────────────────────────────────
 *   Andar dekhte hain aur variables expand karte hain:
 *   
 *   name="Rakesh"
 *   echo "Hello, $name"    # Output: Hello, Rakesh
 * 
 * SINGLE QUOTES ' ' — The Literalist
 * ─────────────────────────────────────────────────────────────────────
 *   Sab kuch plain text treat karte hain:
 *   
 *   name="Rakesh"
 *   echo 'Hello, $name'    # Output: Hello, $name
 * 
 * ======================================================================
 * 🧮 MATHEMATICAL OPERATIONS — Kitchen Calculator
 * ======================================================================
 * 
 * METHOD 1: expr (Old School)
 * ─────────────────────────────────────────────────────────────────────
 *   expr 10 + 5     # Addition (15)
 *   expr 15 - 5     # Subtraction (10)
 *   expr 5 \* 3     # Multiplication (15) — backslash note karo!
 *   expr 20 / 4     # Division (5)
 * 
 *   ⚠️ IMPORTANT: Operators ke beech SPACE hona chahiye!
 *      expr 10+5    # ❌ WRONG! Kaam nahi karega
 *      expr 10 + 5  # ✅ RIGHT!
 * 
 * METHOD 2: $(( )) (Modern Way — Easier!)
 * ─────────────────────────────────────────────────────────────────────
 *   echo $((10 + 5))     # Addition
 *   echo $((15 - 5))     # Subtraction
 *   echo $((5 * 3))      # Multiplication (no backslash needed!)
 *   echo $((20 / 4))     # Division
 * 
 * REAL EXAMPLE:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   eggs=12
 *   flour=4
 *   sugar=2
 *   
 *   total=$((eggs + flour + sugar))
 *   double_flour=$((flour * 2))
 *   
 *   echo "Total ingredients: $total"
 *   echo "Double flour needed: $double_flour cups"
 * 
 * ======================================================================
 * 🔀 CONDITIONALS — Decision Maker (If-Else)
 * ======================================================================
 * 
 * Kabhi kabhi recipe ko decisions lene padte hain:
 * AGAR water boiling hai, TO pasta daalo
 * NAHI to wait karo
 * 
 * IF-THEN-ELSE STRUCTURE:
 * ─────────────────────────────────────────────────────────────────────
 *   if [ CONDITION ]; then
 *       # Condition true hai to ye karo
 *   else
 *       # Condition false hai to ye karo
 *   fi
 * 
 * COMPARISON OPERATORS (Numbers ke liye):
 * ─────────────────────────────────────────────────────────────────────
 *   -eq : Equal to           (if [ $age -eq 18 ])
 *   -ne : Not equal to       (if [ $age -ne 18 ])
 *   -gt : Greater than       (if [ $age -gt 18 ])
 *   -lt : Less than          (if [ $age -lt 18 ])
 *   -ge : Greater or equal   (if [ $age -ge 18 ])
 *   -le : Less or equal      (if [ $age -le 18 ])
 * 
 * STRING COMPARISONS:
 * ─────────────────────────────────────────────────────────────────────
 *   =   : Equal to           (if [ "$name" = "John" ])
 *   !=  : Not equal to       (if [ "$name" != "John" ])
 *   -z  : Empty string       (if [ -z "$name" ])
 *   -n  : Not empty          (if [ -n "$name" ])
 * 
 * FILE CHECKS:
 * ─────────────────────────────────────────────────────────────────────
 *   -f file : File hai?          (if [ -f "/etc/passwd" ])
 *   -d dir  : Directory hai?     (if [ -d "/home" ])
 *   -e file : Exist karta hai?   (if [ -e "myfile.txt" ])
 *   -r file : Readable hai?      (if [ -r "secret.txt" ])
 *   -w file : Writable hai?      (if [ -w "config.cfg" ])
 *   -x file : Executable hai?    (if [ -x "script.sh" ])
 * 
 * REAL EXAMPLES:
 * ─────────────────────────────────────────────────────────────────────
 * 
 * EXAMPLE 1: Age Checker
 *   #!/bin/bash
 *   
 *   age=25
 *   
 *   if [ $age -ge 18 ]; then
 *       echo "Tum adult ho"
 *   else
 *       echo "Tum minor ho"
 *   fi
 * 
 * EXAMPLE 2: File Checker
 *   #!/bin/bash
 *   
 *   filename="notes.txt"
 *   
 *   if [ -f "$filename" ]; then
 *       echo "$filename exist karta hai!"
 *       echo "Andar kya hai:"
 *       cat "$filename"
 *   else
 *       echo "$filename exist nahi karta"
 *       echo "Abhi bana rahe hain..."
 *       touch "$filename"
 *   fi
 * 
 * EXAMPLE 3: Multiple Conditions
 *   #!/bin/bash
 *   
 *   num=15
 *   
 *   if [ $num -gt 10 ] && [ $num -lt 20 ]; then
 *       echo "$num 10 aur 20 ke beech mein hai"
 *   elif [ $num -eq 10 ]; then
 *       echo "$num bilkul 10 hai"
 *   else
 *       echo "$num range mein nahi hai"
 *   fi
 * 
 * ======================================================================
 * 🔁 LOOPS — Repetition Master
 * ======================================================================
 * 
 * Kabhi ek hi kaam baar baar karna hota hai.
 * Jaise 10 onions kaatne — ek hi action 10 baar.
 * 
 * TYPE 1: WHILE LOOP (Jab tak condition true hai, chalta raho)
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   count=1
 *   
 *   while [ $count -le 5 ]; do
 *       echo "Onion number $count kat raha hoon"
 *       count=$((count + 1))
 *   done
 *   
 *   echo "Saare onions kat gaye!"
 * 
 *   OUTPUT:
 *     Onion number 1 kat raha hoon
 *     Onion number 2 kat raha hoon
 *     Onion number 3 kat raha hoon
 *     Onion number 4 kat raha hoon
 *     Onion number 5 kat raha hoon
 *     Saare onions kat gaye!
 * 
 * TYPE 2: FOR LOOP (Har item ke liye ek baar)
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   # Numbers par loop
 *   for i in 1 2 3 4 5; do
 *       echo "Number: $i"
 *   done
 *   
 *   # Range ke saath
 *   for i in {1..5}; do
 *       echo "Range number: $i"
 *   done
 *   
 *   # Files par loop
 *   for file in *.txt; do
 *       echo "Processing text file: $file"
 *   done
 *   
 *   # Array par loop
 *   chefs=("Rakesh" "Priya" "Ahmed")
 *   for chef in "${chefs[@]}"; do
 *       echo "Welcome, Chef $chef!"
 *   done
 * 
 * ======================================================================
 * 🧩 FUNCTIONS — Mini-Recipes
 * ======================================================================
 * 
 * Functions mini-recipes hote hain — ek baar likho, baar baar use karo.
 * 
 * BASIC FUNCTION STRUCTURE:
 * ─────────────────────────────────────────────────────────────────────
 *   function_name() {
 *       # Commands yahan likho
 *       echo "Main ek function hoon!"
 *   }
 *   
 *   # Function call karo
 *   function_name
 * 
 * REAL EXAMPLE WITH ERROR HANDLING:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   # Error check karne ka function
 *   check_error() {
 *       if [ $? -ne 0 ]; then
 *           echo "❌ ERROR: Kuch gadbad ho gayi!"
 *           exit 1
 *       else
 *           echo "✅ Success!"
 *       fi
 *   }
 *   
 *   # Package install karne ka function
 *   install_package() {
 *       package=$1
 *       echo "Installing $package..."
 *       sudo apt install -y "$package"
 *       check_error
 *   }
 *   
 *   # Backup banane ka function
 *   backup_file() {
 *       file=$1
 *       backup_dir="backups"
 *       
 *       # Backup directory exist karta hai?
 *       if [ ! -d "$backup_dir" ]; then
 *           mkdir "$backup_dir"
 *       fi
 *       
 *       cp "$file" "$backup_dir/$file.backup-$(date +%Y%m%d)"
 *       echo "✅ $file ka backup ho gaya"
 *   }
 *   
 *   # MAIN SCRIPT — Functions use karo
 *   echo "=== System Setup Script ==="
 *   
 *   install_package "htop"
 *   install_package "git"
 *   
 *   backup_file "important.txt"
 *   
 *   echo "=== Script Complete ==="
 * 
 * ======================================================================
 * 🚦 EXIT CODES — Success Signals
 * ======================================================================
 * 
 * Har command ek EXIT CODE return karti hai:
 *   0 = Success (thumbs up)
 *   1-255 = Failure (thumbs down)
 * 
 * CHECKING EXIT CODES:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   # Package install karne ki koshish
 *   sudo apt install -y some-package
 *   
 *   # Check karo kaam hua ya nahi
 *   if [ $? -eq 0 ]; then
 *       echo "✅ Package successfully install ho gaya!"
 *   else
 *       echo "❌ Installation fail ho gaya!"
 *   fi
 * 
 *   $? ek special variable hai jo LAST command ka exit code hold karta hai.
 * 
 * ======================================================================
 * 📡 DATA STREAMS — Teen Pipes
 * ======================================================================
 * 
 * Har command ke paas TEEN pipes hote hain data ke liye:
 * 
 * PIPE 0: stdin (Standard Input) — Andar kya ja raha hai
 *    Keyboard input, doosri command se data
 * 
 * PIPE 1: stdout (Standard Output) — Normal output
 *    Success messages, results
 * 
 * PIPE 2: stderr (Standard Error) — Error output
 *    Error messages, warnings
 * 
 * REDIRECTING THE PIPES:
 * ─────────────────────────────────────────────────────────────────────
 *   # Normal output file mein save karo
 *   echo "Hello" > output.txt          # Overwrite
 *   echo "World" >> output.txt          # Append
 *   
 *   # Errors file mein save karo
 *   ls /fakefolder 2> errors.txt
 *   
 *   # Dono (normal + error) ek file mein
 *   ls /fakefolder &> everything.txt
 *   
 *   # Errors ko discard karo (bhejo /dev/null — black hole)
 *   ls /fakefolder 2> /dev/null
 *   
 *   # Ek command ka output doosre ko bhejo (PIPE)
 *   echo "Hello World" | grep "Hello"   # | sends stdout to next command
 * 
 * REAL EXAMPLE:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   echo "=== Streams Demo ==="
 *   
 *   # 1. stdin — User input lo
 *   echo "Apna naam likho:"
 *   read name
 *   
 *   # 2. stdout — File mein save karo
 *   echo "Hello, $name!" > greeting.txt
 *   echo "✅ Greeting greeting.txt mein save ho gayi"
 *   
 *   # 3. stderr — Error message dikhao
 *   echo "Yeh ek warning hai" >&2
 *   
 *   # 4. Dono ek saath file mein
 *   find /fakefolder &> output.log
 *   echo "✅ Combined output output.log mein save hua"
 *   
 *   # 5. Piping — commands ko chain karo
 *   echo "apple banana cherry" | tr ' ' '\n' | sort > fruits.txt
 *   echo "✅ Sorted fruits fruits.txt mein save hue"
 * 
 * ======================================================================
 * 🧠 SMART SCRIPTS — Different Systems ke liye
 * ======================================================================
 * 
 * Ek smart chef different kitchens mein adapt kar leta hai. Waise hi smart
 * scripts different Linux distributions mein adapt karte hain.
 * 
 * DETECT THE DISTRIBUTION:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   
 *   # Check karo kaunsa Linux distribution hai
 *   if [ -f /etc/os-release ]; then
 *       source /etc/os-release
 *       echo "Detected OS: $NAME"
 *       
 *       if [[ "$NAME" == *"Ubuntu"* ]] || [[ "$NAME" == *"Debian"* ]]; then
 *           echo "apt package manager use kar rahe hain"
 *           sudo apt update
 *           sudo apt upgrade -y
 *           
 *       elif [[ "$NAME" == *"Arch"* ]]; then
 *           echo "pacman package manager use kar rahe hain"
 *           sudo pacman -Syu
 *           
 *       elif [[ "$NAME" == *"Fedora"* ]]; then
 *           echo "dnf package manager use kar rahe hain"
 *           sudo dnf upgrade
 *           
 *       else
 *           echo "Unknown distribution. Please update manually."
 *       fi
 *   else
 *       echo "OS detect nahi ho paaya"
 *   fi
 * 
 * ======================================================================
 * 📥 PASSING ARGUMENTS — Script ko Input Dena
 * ======================================================================
 * 
 * Jaise recipe different ingredients le sakti hai, waise scripts different
 * ARGUMENTS le sakti hain.
 * 
 * SPECIAL ARGUMENT VARIABLES:
 * ─────────────────────────────────────────────────────────────────────
 *   $0 : Script ka naam
 *   $1 : Pehla argument
 *   $2 : Doosra argument
 *   $3 : Teesra argument
 *   $# : Total arguments ka count
 *   $@ : Saare arguments alag words ke roop mein
 *   $* : Saare arguments ek string ke roop mein
 * 
 * EXAMPLE:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash
 *   # File: greet.sh
 *   
 *   echo "Script name: $0"
 *   echo "First argument: $1"
 *   echo "Second argument: $2"
 *   echo "Total arguments: $#"
 *   echo "All arguments: $@"
 *   
 *   if [ $# -lt 2 ]; then
 *       echo "❌ Error: Kam se kam 2 arguments chahiye!"
 *       echo "Usage: $0 <naam> <greeting>"
 *       exit 1
 *   else
 *       echo "✅ $2, $1!"
 *   fi
 * 
 *   RUN KARO:
 *     chmod +x greet.sh
 *     ./greet.sh Rakesh Namaste
 *   
 *   OUTPUT:
 *     Script name: ./greet.sh
 *     First argument: Rakesh
 *     Second argument: Namaste
 *     Total arguments: 2
 *     All arguments: Rakesh Namaste
 *     ✅ Namaste, Rakesh!
 * 
 * ======================================================================
 * 🎯 REAL-WORLD SCRIPT EXAMPLE — System Maintenance
 * ======================================================================
 * 
 * Ab saare concepts ko ek saath daalte hain — ek System Maintenance Script:
 * ─────────────────────────────────────────────────────────────────────
 * #!/bin/bash
 * # System Maintenance Script
 * # Author: Chef Rakesh
 * # Date: 2024
 * 
 * # Colors for pretty output
 * RED='\033[0;31m'
 * GREEN='\033[0;32m'
 * YELLOW='\033[1;33m'
 * NC='\033[0m' # No Color
 * 
 * # Function to print colored messages
 * print_status() {
 *     if [ $1 -eq 0 ]; then
 *         echo -e "${GREEN}✅ $2${NC}"
 *     else
 *         echo -e "${RED}❌ $2${NC}"
 *     fi
 * }
 * 
 * # Function to check if command exists
 * command_exists() {
 *     command -v "$1" >/dev/null 2>&1
 * }
 * 
 * # Function to create backup
 * create_backup() {
 *     backup_dir="/tmp/backup_$(date +%Y%m%d_%H%M%S)"
 *     mkdir -p "$backup_dir"
 *     
 *     echo -e "${YELLOW}📦 Creating backup in $backup_dir...${NC}"
 *     
 *     # Backup important configs
 *     cp /etc/passwd "$backup_dir/" 2>/dev/null
 *     cp /etc/group "$backup_dir/" 2>/dev/null
 *     
 *     if [ $? -eq 0 ]; then
 *         echo -e "${GREEN}✅ Backup create ho gaya${NC}"
 *     else
 *         echo -e "${RED}❌ Backup fail ho gaya${NC}"
 *     fi
 * }
 * 
 * # Function to update system
 * update_system() {
 *     echo -e "${YELLOW}🔄 System update ho raha hai...${NC}"
 *     
 *     if command_exists apt; then
 *         sudo apt update && sudo apt upgrade -y
 *         print_status $? "System updated"
 *     elif command_exists pacman; then
 *         sudo pacman -Syu
 *         print_status $? "System updated"
 *     else
 *         echo -e "${RED}❌ Unknown package manager${NC}"
 *     fi
 * }
 * 
 * # Function to check disk usage
 * check_disk() {
 *     echo -e "${YELLOW}💾 Disk usage check ho raha hai...${NC}"
 *     df -h | grep -E '^/dev/' | while read line; do
 *         usage=$(echo $line | awk '{print $5}' | sed 's/%//')
 *         mount=$(echo $line | awk '{print $6}')
 *         
 *         if [ $usage -gt 90 ]; then
 *             echo -e "${RED}⚠️  Critical: $mount ${usage}% full hai${NC}"
 *         elif [ $usage -gt 75 ]; then
 *             echo -e "${YELLOW}⚠️  Warning: $mount ${usage}% full hai${NC}"
 *         else
 *             echo -e "${GREEN}✅ $mount: ${usage}% used${NC}"
 *         fi
 *     done
 * }
 * 
 * # Function to cleanup old logs
 * cleanup_logs() {
 *     echo -e "${YELLOW}🧹 Old logs clean ho rahe hain...${NC}"
 *     
 *     # Find and delete logs older than 30 days
 *     find /var/log -name "*.log" -type f -mtime +30 -delete 2>/dev/null
 *     
 *     print_status $? "Logs cleaned"
 * }
 * 
 * # Main script
 * main() {
 *     echo "=================================="
 *     echo "   SYSTEM MAINTENANCE SCRIPT"
 *     echo "=================================="
 *     echo "Started at: $(date)"
 *     echo ""
 *     
 *     # Check if running as root
 *     if [ $EUID -ne 0 ]; then
 *         echo -e "${RED}❌ Please root ban ke chalao${NC}"
 *         exit 1
 *     fi
 *     
 *     # Run maintenance tasks
 *     create_backup
 *     echo ""
 *     
 *     update_system
 *     echo ""
 *     
 *     check_disk
 *     echo ""
 *     
 *     cleanup_logs
 *     echo ""
 *     
 *     echo "=================================="
 *     echo "Maintenance complete at: $(date)"
 *     echo "=================================="
 * }
 * 
 * # Run the main function
 * main
 * 
 * ======================================================================
 * 📋 QUICK REFERENCE CARD
 * ======================================================================
 * 
 * SCRIPT BASICS:
 * ─────────────────────────────────────────────────────────────────────
 *   #!/bin/bash           # Shebang — kaunsa shell use karna hai
 *   chmod +x script.sh    # Executable banao
 *   ./script.sh           # Script chalao
 *   bash script.sh        # Explicitly bash se chalao
 * 
 * VARIABLES:
 * ─────────────────────────────────────────────────────────────────────
 *   name="value"          # Assign (NO spaces around =)
 *   $name                 # Variable use karo
 *   ${name}               # Variable use karo (strings mein safe)
 * 
 * SPECIAL VARIABLES:
 * ─────────────────────────────────────────────────────────────────────
 *   $0 - Script name
 *   $1-$9 - Arguments
 *   $# - Number of arguments
 *   $@ - All arguments
 *   $? - Last exit code
 *   $$ - Current script PID
 * 
 * COMPARISONS:
 * ─────────────────────────────────────────────────────────────────────
 *   Numbers: -eq, -ne, -gt, -lt, -ge, -le
 *   Strings: =, !=, -z, -n
 *   Files: -f, -d, -e, -r, -w, -x
 * 
 * CONTROL FLOW:
 * ─────────────────────────────────────────────────────────────────────
 *   if [ condition ]; then ... fi
 *   for i in list; do ... done
 *   while [ condition ]; do ... done
 * 
 * REDIRECTION:
 * ─────────────────────────────────────────────────────────────────────
 *   >  file    # stdout to file (overwrite)
 *   >> file    # stdout to file (append)
 *   2> file    # stderr to file
 *   &> file    # both to file
 *   cmd1 | cmd2  # pipe stdout to next command
 * 
 * ======================================================================
 * ⚠️ GOLDEN RULES OF BASH SCRIPTING
 * ======================================================================
 * 
 *   1. Hamesha #!/bin/bash se start karo
 *   2. Scripts ko chmod +x se executable banao
 *   3. Comments (#) use karo apna code explain karne ke liye
 *   4. Variables assign karte waqt spaces nahi chahiye (name="value")
 *   5. Variables ko quote karo ("$var") word splitting se bachne ke liye
 *   6. Exit codes check karo ($?) error handling ke liye
 *   7. Pehle chhote examples par test karo, phir real systems par
 *   8. Code organize karne ke liye functions use karo
 *   9. Jo scripts arguments leti hain, unmein usage message add karo
 *   10. Hamesha socho ki agar kuch fail ho jaye to kya hoga
 * 
 * YAAD RAKHO: Ek achha Bash script ek achhi recipe ki tarah hota hai —
 * clear instructions, proper ingredients, aur delicious results!
 * 
 * ======================================================================
 */