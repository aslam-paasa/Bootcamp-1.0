/**
 * DOM: Document Object Model
 * - The DOM (Document Object Model) is a way to represent a web page so
 *   that programs (like JavaScript) can interact with it.
 * - A browser take your HTML document and turns it into the DOM. And with
 *   this object model, JavaScript gets all the power it needs to create
 *   dynamic HTML: 
 *   a. JS can change all the HTML elements in the page.
 *   b. JS can change all the HTML attributes in the page.
 *   c. JS can change all the CSS styles in the page.
 *   d. JS can remove existing HTML elememts and attributes.
*/

/**
 * 1. Accessing Element:
 *    a. Accessing by ID:
 *       - Method: document.getElementById(id)
 *       - Description: Retrieves a single element with the specified id
 *         attribute.
 * 
 *    b. Accessing by Class Name:
 *       - Method: document.getElementsByClassName(className)
 *       - Description: Retrieves a collection of elements with the specified
 *         class name.
 * 
 *    c. Accessing by CSS Selectors:
 *       - Single Element:
 *         - Method: document.querySelector(selector)
 *         - Description: Returns the first elements matching the specified
 *           CSS selector.
 *       - Multiple Elements:
 *         - Method: document.querySelectorAll(selector)
 *         - Description: Returns a static NodeList for all elements matching
 *           the specified CSS Selector.
 * 
 *    d. Accessing by Tag Name:
 *       - Method: document.getElementsByTagName(tagName)
 *       - Description: Retrieves a live HTMLCollection of all elements with
 *         the specified tag name like div, p, a, etc.
 * 
 *    e. Accessing using Relationships:
 *       - Parent Node:
 *         - Method: element.parentNode or element.parentElement
 *         - Description: Access the immediate parent of an element.
 * 
 *       - Child Nodes:
 *         - Method: element.childNodes(includes text nodes) or
 *                   element.children  (only element nodes)
 *         - Description: Access all child nodes of an element.
 * 
 *       - First and Last Child:
 *         - Method: element.firstChild, element.lastChild, element.firstElementChild, element.lastElementChild
 * 
 *       - Sibling Nodes:
 *         - Method: element.nextSibling, element.previousSibling
 *         - Element Siblings: element.nextElementSibling, element.previousElementSibling
*/

const timer = document.getElementById("root");

timer.style.alignItems = "center";
timer.style.display = "flex"; 
timer.style.fontSize = "200px";
timer.style.height = "100vh";
timer.style.justifyContent = "center";

function updateTimer() {
    const now = new Date();
    const IndianTime = now.toLocaleTimeString();
    timer.innerHTML = IndianTime;
}

setInterval(updateTimer, 1000);