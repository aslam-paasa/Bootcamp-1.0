/**
 * Browser Object Model (BOM):
 * The Browser Object Model (BOM) allows JavaScript to interact with the
 * browser. While the DOM (Document Object Model) deals with the page content,
 * the DOM deals with the browser itself (like window size, URL, history,
 * etc.).
 * 
 * The BOM is not standardized, meaning its features may vary across browsers.
 * However, it provides essential tools for interacting with the browser
 * environment.
*/

/**
 * 1. Window Object:
 *    The window object is the global object in the browser. Every JS code
 *    runs inside this object by default.
 * 
 * 2. Key Properties and Method of window object:
 *    a. window.alert()    : Displays an alert popup
 *    b. window.confirm()  : Displays a confirmation dialog with "OK" and
 *                           "Cancel" options.
 *    c. window.prompt()   : Displays a dialog box that asks for user input. 
 *    d. window.location   : Provides details about current page's URL and
 *                           allows navigation to a new URL.
 *    e. window.navigator  : Provides details about the user's browser and
 *                           device.
 *    f. window.document   : Represents the DOM of the web page. 
*/


/**
 * 1. Alert:
*/
window.alert("Welcome to JavaScript BOM")


/**
 * 2. Confirm:
*/
let isConfirmed = window.confirm("Are you sure you want to continue?")
console.log(isConfirmed); // true or false


/**
 * 3. Prompt:
*/
let username = window.prompt("Enter your username")
if(username) {
    console.log(`Hello ${username}`);
} else {
    console.log("No username entered");
}


/**
 * 4. Location:
*/
console.log(window.location.href); // Shows current URL


/**
 * 5. Redirect to another page:
 *    window.location.href = "https://www.google.com";
*/


/**
 * 6. Practical Use Case: Detecting Browser Dimensions
*/
console.log(`Width: ${window.innerWidth}px`, `Height: ${window.innerHeight}px`);


/**
 * 7. Screen Information: Get screen dimensions
*/
console.log(`Screen Width: ${window.screen.width}px`);
console.log(`Screen Height: ${window.screen.height}px`);
console.log(`Available Width: ${window.screen.availWidth}px`);
console.log(`Available Height: ${window.screen.availHeight}px`);
console.log(`Color Depth: ${window.screen.colorDepth} bits`);


/**
 * 8. Window Positiong and Size Management:
*/

/**
 * a. Open a new tab:
*/
const newWindow = window.open("https://www.google.com", "_blank", "width=500,height=500");

/**
 * b. Move Window:
*/
newWindow.moveTo(100, 100);

/**
 * c. Resize Window:
*/
newWindow.resizeTo(800, 600);

/**
 * d. Close Window:
*/
setTimeout(() => { newWindow.close(); }, 5000);


/**
 * 9. Advanced Navigation Techniques:
*/
function navigationThroughHistory() {
    window.history.back();     // Go back one page
    window.history.forward();  // Go forward one page
    window.history.go(-2);     // Go back two pages

    // Modern History API
    history.pushState({ page: 1}, "Title 1", "?page=1");
    history.replaceState({ page: 2}, "Title 2", "?page=2");
}
