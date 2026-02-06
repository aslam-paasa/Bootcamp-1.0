/**
 * Everything in JavaScript happens inside an Execution Context. 
 *                  |
 *                  V
 * Q. What happens when you run JavaScript code?
 * => An Execution Context is created.
 * => Let's see how this execution context is created with the help
 *    of JS Code:
 * */ 

var n = 2;
function square(num) {
    var ans = num * num;
    return ans;
}
var square2 = square(n);
var square4 = square(4);

/**
 * When we run this while code, a Global Execution Context is created
 * which contains two components:
 * 1. Memory Component
 * 2. Code Component
 * 
 * This Execution Context is created in two phases:
 *   Phase-1: Memory Creation Phase
 *   Phase-2: Code Execution Phase
 * 
 * Phase-1: Memory Creation Phase
 * - If we have the above code in the 1st phase of memory creation,
 *   JS will allocate memory to all the variable and functions.
 * - As soon as JS encounter the line-1 i.e. [var n = 2], it allocates
 *   memory to 'n'.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n:                    |                      |
 *   +----------------------------------------------+
 * 
 * - Similarly, JS goes to the line-2 i.e. function square(num){...}.
 *   And in this it sees that there is also a function, which is named
 *   as square, so it will allocate memory to square.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n:                    |                      |
 *   | square:               |                      |
 *   +----------------------------------------------+
 * 
 * Q. What does it stores?
 * => When it allocates memory to 'n', it stores a special value which
 *    is known as 'undefined'. 
 * => But in case of function, it stores the whole code the function
 *    inside this memory space.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n: undefined          |                      |
 *   | square: {.......}     |                      |
 *   +----------------------------------------------+
 * 
 * => And now it will also allocate memory to square2 and square4. And
 *    as they are variable, so they will allocate 'undefined'. 
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n: undefined          |                      |
 *   | square: {.......}     |                      |
 *   | square2: undefined    |                      |
 *   | square4: undefined    |                      |
 *   +----------------------------------------------+
 * 
 * Summary: In the 1st phase, JS skims through the whole program
 * line by line, and it allocates memory to all the variables and
 * functions. As soon as it encounter 'n', it reserves memory and 
 * allocates a special value 'undefined' to it. 
 * [undefined is like a placeholder in JS]
 * 
 * And in case of function, whole fn code copied into the memory space.
 * 
 * 
 * Phase-2: Code Execution Phase
 * => JS once again will run through this whole JS program, line-by-line
 *    and it executes the code now. And this is point when all these
 *    fns and calculation in the program is done.
 * => When it reaches line-1, it places the 'n = 2'.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n: 2                  |                      |
 *   | square: {.......}     |                      |
 *   | square2: undefined    |                      |
 *   | square4: undefined    |                      |
 *   +----------------------------------------------+
 * 
 * => After finishing line-1, it goes to line-2 and sees that we have
 *    nothing to do here. So, it will skip the function square() and
 *    moves to line-6.
 * => Line-6 is the most amazing part. Here, we invoke a function:
 *    var square2 = square(n);
 *                     |
 *                     V
 *    Function Invocation means, whenever we see a function name with
 *    these parentheses (x), it means that the fn is now being executed.
 * 
 *    Function is the heart of JS. It is like a mini-program, and 
 *    whenever a new function is invoked i.e. square(n), a altogether
 *    new Execution Context is created(LEC - Local Execution Context).
 *    
 *    This LEC again has these two components: Memory & Code Component
 * 
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n: undefined          |  +----------------+  |
 *   | square: {.......}     |  |Memory | Code   |  |
 *   | square2: undefined    |  |       |        |  |
 *   | square4: undefined    |  +----------------+  |
 *   +----------------------------------------------+
 * 
 *   In this LEC memory creation phase, now we will talk about this
 *   function invocation. We will concern about this function:
 * 
 *    function square(num) {
 *       var ans = num * num;
 *       return ans;
 *    }
 * 
 *    In the phase-1, the memory will be allocated to variables and fns
 *    inside this square(n) fn. And when we say variables and fns, it
 *    involves:
 *    a. parameters - nums
 *    b. other variables like ans.
 * 
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | num: undefined        |                      |
 *   | ans: undefined        |                      |
 *   +----------------------------------------------+
 * 
 *   Now comes the part of Phase-2 : Code Execution Phase
 *   => square(n) : Here, 'n' is the argument and 'num' is the parameter.
 *   => When this square(n) function is invoked, first of all, this
 *      value of 'n' which is 2, is passed to 'num'. And then the code
 *      will move to the next line.
 *   => In line-3, it will do the calculation and put the value of
 *      num*num inside ans. So, this operation will be executed inside
 *      the Code Execution Phase, and whatever will the outcome will
 *      be stored in the ans.
 *   => And once the operation is done, num*num will be vanished from the
 *      Code Execution Phase.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | num: 2                |                      |
 *   | ans: undefined        | num*num              |
 *   +-----------------------|----------------------+
 *                           V
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | num: 2                |                      |
 *   | ans: 4                |                      |
 *   +----------------------------------------------+
 * 
 * => After this it will move to line-4. Here, we encounter a special
 *    keyword called 'return ans'. 
 * => So, whenever we see return, this will tell this square() fn that
 *    you work is done, just return the whole control back to the 
 *    Execution Context where the fn was invoked.
 * => Fn was invoked at square(n), so return the value of 'ans' to the
 *    place where it was invoked i.e. line-6. And as soon as the control
 *    goes to the Global Execution Context, it finds the value of ans
 *    inside the local memory will now replace the GEC of square2.
 *    And as the control goes to the Global Execution Context, the instance
 *    of Local Execution Context will be deleted.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n: 2                  |                      |
 *   | square: {.......}     |                      |
 *   | square2: 4            |                      |
 *   | square4: undefined    |                      |
 *   +----------------------------------------------+
 * 
 * => So, now we will go to line-7 of GEC. In line-7, we are again
 *    invoking a fn, but the only diff is, here we are passing '4' 
 *    directly as an argument.
 * => Similarly, as soon as fn invocation will happen, brand new
 *    Execution Context will be created. 
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | num: undefined        |                      |
 *   | ans: undefined        |                      |
 *   +-----------------------|----------------------+
 *                           V
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | num: 4                |                      |
 *   | ans: undefined        | num*num              |
 *   +-----------------------|----------------------+
 *                           V
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | num: 4                |                      |
 *   | ans: 16               |                      |
 *   +----------------------------------------------+
 * 
 * => And the control moves to Global Execution Context, and the 
 *    Local Execution Context will be destroyed.
 *   +----------------------------------------------+
 *   | Memory Creation Phase | Code Execution Phase |
 *   +----------------------------------------------+
 *   | n: 2                  |                      |
 *   | square: {.......}     |                      |
 *   | square2: 4            |                      |
 *   | square4: 16           |                      |
 *   +----------------------------------------------+
 * 
 * => Once JS will done with its work, then the whole Global Execution
 *    Context get destroyed. 
 * 
 * - These Execution Context is created inside a CallStack.
 * - Callstack maintains the order of execution contexts.
 * 
 * - Call Stack is also known as:
 *   a. Execution Context Stack
 *   b. Program Stack
 *   c. Control Stack
 *   d. Runtime Stack
 *   e. Machine Stack
 * */