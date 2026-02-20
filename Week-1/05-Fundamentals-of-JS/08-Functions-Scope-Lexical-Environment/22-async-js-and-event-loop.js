/**
 * In this lecture, we will understand:
 * 1. Event Loop
 * 2. Callback Queue
 * 3. Microtask Queue
 * 4. How everything works inside the browser?
 **/ 

/** 
 * JavaScript is a synchronous single-threaded language. It has one
 * callstack and it can only do one thing at a time. This call stack
 * is present inside the JS Engine, and all the JS Code is executed
 * inside this Call Stack.
*/

function a() {
    console.log("a");
}
a();
console.log("End");

/**
 * Suppose if we have to execute the above piece of code. Whenever
 * any JS program run, a GEC is created and this GEC is then pushed
 * inside the callstack. 
 * 
 * Now inside the GEC, our whole code will execute line-by-line.
 * 
 * Step-1:
 * As we move onto the first line i.e. fn definition of 'a'. So, fn-a
 * will be allocated memory and this fn will be stored.
 * 
 * Step-2: 
 * Then comes the function invokation. In case of fn invocation, 
 * an execution context(LEC) is created for the fn-a to execute the
 * code inside this fn. And this LEC is again pushed inside the 
 * call stack. So, now this code of fn a() will be executed line-by-line.
 * That means it will print the code in the console and then LEC get
 * destroyed and gets out of the call stack.
 * 
 * Step-3:
 * Now the control moves on to the next line that will print the msg
 * on the console. After executing this line, there is nothing more to
 * execute, so the GEC gets destroyed and pops out of the call stack.
 * 
 * This is how our JS Engine executes our whole JS Program. So, the main
 * job of this JS is to execute whatever comes inside it. It doesn't
 * wait for anything, and whatever present inside it, it quickly executes
 * it, and this is how JS works.
*/

/**
 * Q. What if we need to wait for something? What if there is a program
 *    that needs to run after 5 seconds? Can we do that?
 * => No! We cannot do that, because whatever comes inside callstack is
 *    quickly executed, because this callstack doesn't have a timer.
 * => So suppose if we have to keep the track of time and we have to
 *    execute certain piece of code after certain delay we will need
 *    some extra super power i.e. the super power of timers.
 * 
 * Q. How we can get the super power?
 * => The callstack that we is inside the JS Engine, and this JS Engine
 *    is inside a big box called Browser. So, this browser overall has
 *    JS Engine in it and JS Engine has callstack and over here our
 *    program runs.
 * 
 * +---------------------------Browser------------------------------+
 * |                                                                |
 * |  + - - - - +                                                   |
 * |  |Callstack|                                                   |
 * |  |         |                                                   |
 * |  |  |   |  |                                                   |
 * |  |  |   |  |                                                   |
 * |  |  |   |  |                                                   |
 * |  |  +---+  |                                                   |
 * |  |         |                                                   |
 * |  + - - - - + <== JS Engine                                     |
 * |                                                                |
 * +----------------------------------------------------------------+
 * 
 * 1. Local Storage:
 * => This browser has the JS Engine inside it, and it has also something
 *    known as local storage. We can store some data inside it(browser).
 * 
 * 2. Timer:
 * => We can also have timer inside the browser.
 * 
 * 3. Data Fetching:
 * => We also have URL where we write the website name.
 * => So the browser has the super power to communicate to the outer
 *    world like Netflix Servers, and get data over browser. 
 * 
 * 4. Data Rendering to the UI:
 * => After fetching data, we can display data to the browser.
 * 
*/

/**
 * Now suppose in a JS Code which is running inside the callstack, we
 * need access of these super powers to the browser. And to access
 * these super powers, we need to have some kind of connection between
 * these super powers and our callstack. How we can do that?
 * => Web APIs
 * => To access all those super powers, we need web APIs. And some of
 *    these web APIs are:
 *    a. setTimeout()
 *    b. DOM APIs
 *    c. fetch()
 *    d. localStorage
 *    e. console
 *    f. location
 * +---------------------------Browser------------------------------+
 * |                                                                |
 * |  + - - - - +        +--------------+                           |
 * |  |Callstack|        | web APIs     |                           |
 * |  |         |        +--------------+                           |
 * |  |  |   |  |        | setTimeout() |                           |
 * |  |  |   |  |        | DOM APIs     |                           |
 * |  |  |   |  |        | fetch()      |                           |
 * |  |  +---+  |        | console      |                           |
 * |  |         |        +--------------+                           |
 * |  + - - - - + <== JS Engine                                     |
 * |                                                                |
 * +----------------------------------------------------------------+
 * 
 * Note: These are not part of JS. Browser wraps all these superpower
 *       APIs into global object called window, and give the access of
 *       this window to the callstack/JS Engine. And now we can use
 *       window.whatever to access all these super powers.
*/

console.log("Start");

setTimeout(function cb() {
    console.log("Callback");
}, 5000);

console.log("End");

/**
 * console.log("Start");
 * - When we do 'console.log("Start")', it basically calls the web API
 *   and 'console' internally modifies something and print the message
 *   to the browser console.
 * 
 * setTimeout();
 * - This web API will give the super power to hold time. And it takes
 *   a callback fn and some delay.
 * - So when we pass the callback function to the setTimeout function
 *   it basically registers a callback inside the web API and because
 *   we have mentioned delay, so it also starts the timer of 5000ms 
 *   inside the timer and the JS Code moves to the next line.
 * 
 * console.log("End");
 * - It will again call the web API, and then the console api will
 *   print the results to the browser console.
 * 
 * setTimeout();
 * - And mean while all this is happening, our timer is still running.
 *   And as soon as the 5sec time passed, this callback fn needs to be
 *   executed, and as we know, all of the JS Code is running inside 
 *   callstack, we somehow need this callback fn inside this callstack.
 * - After counting 5 sec are done with executing all our code. And once
 *   all our code is done executing the GEC will pops of the stack.
 * 
 * Output: Start
 *         End
 *         Callback
*/

/**
 * Now comes the picture of Event Loop and Callback Queue:
 * +---------------------------Browser------------------------------+
 * |  JS Engine                                                     |
 * |  + - - - - +        +--------------+                           |
 * |  |Callstack|        | web APIs     |                           |
 * |  |         |        +--------------+                           |
 * |  |  |   |  |        | setTimeout() |                           |
 * |  |  |   |  |        | DOM APIs     |                           |
 * |  |  |   |  |        | fetch()      |                           |
 * |  |  +---+  |        | console      |                           |
 * |  |         |        +--------------+                           |
 * |  + - - - - +                                                   |
 * |        Event Loop         Callback Queue                       |
 * |        +--------+        +--------------------------------+    |
 * |        | Event  |        |                                |    |
 * |        | Loop   |        |                                |    |
 * |        +--------+        +--------------------------------+    |
 * +----------------------------------------------------------------+
 * 
 * => We already know that this 5000ms was running, and this callback
 *    was registered. As soon as the timer expires inside the webAPI.
 *    This callback method needs to go inside the callstack to execute.
 *    But is cannot directly go into the callstack.
 * 
 * Q. How does callback fn go to the callstack?
 * => It will go the callstack though the callback queue. So, when the
 *    timer expires, the callback fn is pushed inside the callback queue.
 * => And the job of the event loop is to check the callback queue and
 *    put this fn of callback queue into the callstack. So, the event
 *    loop over here acts like gate keeper which checks whether we have
 *    something in the callback queue and if we have something then 
 *    pushes it inside the callstack, and the callstack quickly executes
 *    the callback fn. And that's how our whole thing works.
*/


/**
 * Example: How clicking a button works behind the scene?
*/
console.log("Start");

document.getElementById("btn").addEventListener("click", function cb() {
    console.log("Callback");
})

console.log("End");

/**
 * Whenever we run any JS Code, a GEC is created. Then this GEC is
 * pushed inside the callstack, and code is executed line-by-line.
 * When it reaches line-1, it reaches console.log("Start"), it calls
 * the web APIs, and inside the web APIs, console fn will display the
 * msg inside the browser console and logs "Start".
 * 
 * addEventListener() is another superpower given by the browser to the
 * JS Engine through the window object in form of a web APIs called
 * DOM APIs. So, whenever we do something like 'document.xyz', it basically
 * calls the DOM APIs which fetches something from the DOM. DOM is like
 * a HTML Source Code. So, whenever we access this DOM API, this DOM
 * APIs basically access the HTML Code and tries to find out a button
 * with some id and returns it. And if we put in this '.addEventListener()'
 * so it also registers a callback on the web APIs, and a click event is
 * attached to it, and this is known as registering a callback. So,
 * whenever we see addEventListener, it basically registers a callback
 * fn, and attaches an event to it. After attaching registering and
 * attaching event, it moves to the next line. 
 * 
 * console.log("End");
 * => JS executes the next line and print the message to the screen.
 * => Output: Start
 *            End
 * 
 * After executing all the lines, the GEC will be poped out. But this
 * event listener will stay inside the web APIs environemnt., until and
 * unless we explicitly remove that event listener or close the browser.
 * So, this registered callback fn inside the web API environemnt just
 * sits over there in the hope that some user will click that button 
 * and this callback fn will move inside callback queue and it waits
 * over here for its turn to get executed. 
*/

/**
 * Event Loop has only one job i.e. continuously monitor the callstack
 * as well as the callback queue. So, if this callstack is empty and
 * the event loop sees that there is also a function waiting to be 
 * executed inside the callback queue, then event loop takes the fn
 * and pushes it inside the callstack, and the callstack quickly executes
 * it.
*/

/**
 * Q. Why do we need Callback Queue, when event loop directly pick this
 *    callback and put it inside the callstack?
 * => Suppose that user click on the button multiple times continuously.
 *    In that case, this callback fn will be pushed inside the callback
 *    queue multiple times, waiting to be executed.
 * => And our Event Loop will continuously check if the callstack is
 *    empty or not. If it is empty, push the callback from callback queue
 *    to callstack, and this repeat process will slowly slowly it execute
 *    all the callback fn one-by-one.
 * 
*/

/**
 * Until now we have seen:
 *    a. how setTimeout() works
 *    b. how DOM APIs works
 *    c. how console works
 * Now its time to see how fetch() works.
 * 
 * fetch() doesn't work same as eventListeners or setTimeout. Let's see
 * an example to understand. Fetch basically goes and request an API
 * call, so this fetch() fn returns a promise, and we have to pass a
 * callback fn which will execute once this promise is resolved.
 * 
 * When we say promise resolved, means when we get this URL response as
 * data, then execute this callback fn.
 * 
 * 1. GEC is created, pushed inside Callstack, and the code is executed
 *    line-by-line. We do console.log() and print the message to the
 *    browser console.
 * 2. setTimeout() will register then callback fn in the web API for
 *    5sec. And then the JS Engine moves to the next line.
 * 3. Now we have this fetch() fn. fetch() is again a web API which is
 *    used to make network calls. It also registers the callback fn
 *    into the web APIs environment.
 * 4. Now we have 2 fns sitting inside web APIs environment i.e. cbT,
 *    CBf. This cbT fn is waiting for its timer to expire so that is
 *    can move to the Callback Queue, whereas CBf fn is waiting for its
 *    data to returned from this netflix server. And once we get the
 *    data, the callback fn is ready to get executed.
 * 5. Suppose this netflix server is super fast and it returns the data
 *    in 50ms. Now this callback fn is ready to be executed so this 
 *    callback fn should move to the callback queue, but this doesn't
 *    happen. And now comes the complex part i.e. microtask queue.
 *    This is similar to Callback Queue., but this is higher priority.
 *    Whatever fn comes inside this Microtask Queue will be executed
 *    first and fn inside the callback queue executed later.
 * +---------------------------Browser------------------------------+
 * |  JS Engine                                                     |
 * |  + - - - - +        +--------------+                           |
 * |  |Callstack|        | web APIs     |                           |
 * |  |         |        +--------------+                           |
 * |  |  |   |  |        | setTimeout() |                           |
 * |  |  |   |  |        | DOM APIs     |                           |
 * |  |  |   |  |        | fetch()      |                           |
 * |  |  +---+  |        | console      |                           |
 * |  |         |        +--------------+                           |
 * |  + - - - - +              Microtask Queue                      |
 * |                          +--------------------------------+    |
 * |                          |                                |    |
 * |                          +--------------------------------+    |
 * |                                                                |
 * |        Event Loop         Callback Queue                       |
 * |        +--------+        +--------------------------------+    |
 * |        | Event  |        |                                |    |
 * |        | Loop   |        |                                |    |
 * |        +--------+        +--------------------------------+    |
 * +----------------------------------------------------------------+
 * 
 * Q. What comes inside microtask queue?
 * => This fn cbF inside the web API that is a callback function. In
 *    case of promises/network call go to the microtask queue. So, this
 *    callback function cbF goes to the microtask queue. And again, the
 *    job of the event loop is to check whether the callstack is empty
 *    or not. Once the callstack is empty then its gives the first chance
 *    to function inside the microtask queue and then callback queue.
 * 
 * 6. We have yet not moved to the next line and yet we got the response
 *    back from the netflix server in 50ms. But we are still executing
 *    the next line.
 * 
 *    Suppose there are thousands of lines of code, after this fetch()
 *    fn. Before moving to the next line, we got the response but still
 *    are executing all those thousand lines.
 * 
 * Q. When will our callback fn present inside the microtask queue &
 *    callback will get its chance to execute?
 * Q. Once this 5000ms expires, this cbT callback fn wants to be executed
 *    but it is still waiting in the callback queue for its turn? When
 *    will this code execute?
 * => We got the response but still after the fetch(), thousands of lines
 *    are executing.
 * => Now the job of the event loop is to continuously check if the 
 *    callstack is empty or not. If it is empty then event loop will
 *    schedule the task.
 * => So suppose these million lines of code finished executing and we
 *    reach the line console.log("END"). So, this "END" will get
 *    printed first in the console.
 * => After this, event loop will first execute the callback fns present
 *    in microtask queue and then callback queue.
 * 
 * Output:
 * a. Start
 * b. End
 * c. CB Netflix
 * d. CB SetTimeout
 * 
 * Note: Promises, callback fns comming thorough promises, mutation
 *       observer goes inside this microtask queue but all the other
 *       callback fns which comes from setTimeout, DOM APIs like
 *       eventListener goes inside this callback queue. And microtask
 *       queue are given more priority.
*/

console.log("Start");

setTimeout(function cbT() {
    console.log('CB SetTimeout');
}, 5000);

fetch("https://api.netflix.com")
.then(function cbF() {
    console.log('CB Netflix')
})

console.log("End"); 