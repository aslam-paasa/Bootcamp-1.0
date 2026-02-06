/**
 * Function invocation and Variable Environment:
 * Q. If we have same variable names all over there. How JS handle this
 *    scenario?
 * */ 

var x = 1;

a();
b();

console.log(x);


function a() {
    var x = 10;
    console.log(x);
}

function b() {
    var x = 100;
    console.log(x);
}

/**
 * - Whenever JS runs any programme, GEC is created. It will have two
 *   components:
 *   a. Memory Component
 *   b. Code Component
 * 
 * - Phase-1: Memory Component (GEC)
 *   We will be allocating memory to:
 *   1. x = undefined
 *   2. a = {...}
 *   3. b = {...}
 * - This GEC will be pushed into the Callstack.
 * 
 * - Phase-2: Code Component (GEC)
 *   1. x = 1;
 *   2. a = {...}
 *            |
 *            V
 *          Phase-1: LEC - Memory Phase
 *          1. x = undefined;
 * 
 *          Phase-2: LEC - Code Component
 *          1. x = 10
 *          2. print(10) (1)
 *  
 *    3. b = {...}
 *             |
 *             V
 *           Phase-1: LEC - Memory Phase
 *           1. x = undefined;
 *           
 *           Phase-2: LEC - Code Component
 *           1. x = 100
 *           2. print(100) (2)
 * 
 *    4. print(1) (3)
 * 
 * Output:
 * - 10
 * - 100
 * - 1
 * 
*/