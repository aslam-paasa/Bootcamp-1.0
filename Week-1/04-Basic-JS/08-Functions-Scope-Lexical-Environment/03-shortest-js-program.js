/**
 * Q. What is the shortest JS Program?
 * => Empty File. 
 * => Even though this file is empty & there is nothing to execute, still
 *    JS Engine doing a lot of things behind the scenes.
 * 
 * Q. What happens behind the scenes when we run the shortest JS Program?
 * => A Global Execution Context will be created and also sets up the
 *    Memory Space. JS Engine also creates something known as window.
 * => This window is like a big object with a lot of functions in it.
 *    These functions and variables are created by JS Engine into the
 *    Global Space, and we can access all these variables & functions
 *    anywhere in our JS Program. And this functionality is given us
 *    by JS Engine.
 * => And just like this 'window', JS also creates 'this' keyword. 
 *    And if we do 'this', we also get something and at the global level
 *    'this' points to the window object.
 * 
 * Q. What is window?
 * => window is actually a global object which is created along with the
 *    Global Execution Context. So whenever any JS Program runs:
 *    a. global object is created
 *    b. GEC is created
 *    c. this-variable is created
 * => JS not only runs on browser but also on server, and alot of other
 *    devices and places, and whereever JS is running, there must be a
 *    JS Engine. Just like in Chrome, it is V8 Engine. So, all these
 *    JS Engine has the responsibility to create this global object.
 *    In case of browser, it is known as window, and even though our
 *    file is empty, JS Engine will create this global object. And at
 *    the base level in the global execution context, this === window obj.
 * => If we do 'this === window' in our browser, it will show 'true'.
 * 
 * 
 * => If we try to put any variable or function in the global space
 *    (any code in JS which is not inside any fn), these variables and
 *    functions get attached to the global object i.e. window. And if
 *    we check our variables & functions inside that window object, we
 *    can find them inside.
 * => And by simply writing console.log(window.var_name) to access that
 *    variable. And to make things easier, we can do console.log(var_name).
 * => Basically if we don't put anything in front of var_name, it 
 *    automatically assumes that we are referring to global space.
 * 
 * Example:
 * var a = 10;
 * function b() {
 *    var x = 10;
 * }
 * console.log(window.a); => 10
 * console.log(this.a); => 10
 * console.log(a); => 10
 * console.log(x); => x is not defined
 * */ 