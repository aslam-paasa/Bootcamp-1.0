/**
 * Understanding DOM:
 * 
 * 
*/

/**
 * In simple words:
 * DOM is a collection of objects inside other objects, forming a tree-like
 * structure that represents our HTML page.
 * 
 * 1. Node: Object in the DOM Tree
 *    - When our HTML loads, the browser converts it into a big JavaScript
 *      object tree - and each element, text, comment, etc. becomes a node
 *      i.e., an object. 
 * 
 * 2. DOM: Tree of JavaScript Objects
 *    - The top object is the document
 *    - Inside that, there's html > head, body
 *    - Inside body > nested objects like div, h1, p, etc.
 *    - So, each tag becomes an object, and they're nested inside each other
 *      forming a tree structure.
 * 
 * 3. DOM Tree: Node Objects connected together
 *    - <body> is an object (Node)
 *    - Inside it, <div> is another object (Node)
 *    - Inside <div>, text "Hello" is also a Node (Text Node)
 *    - So, yes - all these objects, and the DOM is like a giant object graph
 *      (aka a tree)
 * 
 * Note: JavaScript se hum nodes(objects) ko access & manipulate karte hai.
*/


/**
 * How can we manipulate DOM?
 * 1. Select Elements            [done]
 * 2. Text/Content Manipulation
 * 3. Attribute Manipulation
 * 4. Dynamic DOM Manipulation
 * 5. Style Manipulation
 * 6. Event Handling (DOM Events) 
*/


/**
 * How to access/select DOM elements:
 * 1. getElementById()
 * 2. getElementsByClassName()
 * 3. getElementsByTagName()
 * 4. querySelector()
 * 5. querySelectorAll()
*/


/**
 * getElementById():
 * - Ye humein 'abcd' id wale container se uske andar ke pehle <h1> node
 *   (object) ko nikaal k dega. Aur browser console m jab hum is node ko
 *   print karenge, to humein uski sari properties dikhega like:
 *   a. innerText, tagName, classList, childNodes, etc
 *   b. And har property ki value bhi dikhegi.
 */

// let idOne = document.getElementById('idOne');
// console.log(idOne); // HTML element (node)


/**
 * getElementsByClassName():
 * - getElementByClassName returns HTMLCollection of all the elements with
 *   the same class name.
 * - HTMLCollection ek array-like object hota hai jisme multiple DOM elements
 *   hote hain - lekin only those that match a specific criteria (jaise
 *   class name, tag name, etc.)
 *   a. Browser pura page check karta hai
 *   b. Jitne bhi elements mai class='classOne' hoti hai, unko collect karta hai
 *   c. Un sab ka ek special box mai daal deta hai - uss box ka naam hai:
 *      HTMLCollection.
*/
// let classOne = document.getElementsByClassName('classOne');
// console.log(classOne); // HTMLCollection (array-like object)


/**
 * querySelector():
 * - Ye method body ke andar se sabse pehla matching 'h1' element dhundta hai.
 * - Agar page pe multiple <h1> ho toh sirf pehla hi milega (first match only)
 * - Ye bhi ek HTML element (node/object) return karta hai jisko JS se access
 *   aur manipulate kar sakte hain
 *
 * Example: 
 * <h1>Main Heading</h1>
 * <h1>Another Heading</h1>
 * querySelector('h1') > sirf "Main Heading" wala <h1> dega
 */

// let h1 = document.querySelector('h1');
// console.log(h1); // <h1>Main Heading</h1>



/**
 * querySelectorAll():
 * - Ye method poore document m jitne bhi 'h1' elements hai unn sab ko
 *   dhoond leta hai.
 * - Ye CSS Selector ki tarah kaam karta hai, aur jo bhi result milta hai 
 *   wo ek NodeList(array-like object) mai daal k return karta hai.
 * - NodeList ek special object hota hai jisme multiple DOM nodes (objects)
 *   hote hai. 
 * - Ye array jaisa dikhta hai, lekin array nahi hota
*/

let h1 = document.querySelectorAll('h1');
console.log(h1); // NodeList(5) [h1, h1, h1, h1, h1]











/**
 * HTMLCollection vs static NodeList:
 * - Jab JavaScript DOM access karta hai, usko 2 tarike se nodes(objects)
 *   milte hai:
 *   a. HTMLCollection
 *   b. NodeList
 * - Ye dono 'collections of nodes' hote hai (yaani ek list of DOM elements),
 *   but behavior alag hai!
*/

/**
 * HTMLCollection:
 * Think of a HTMLCollection as a live stream of HTML elements.
 * a. It's live and auto-updates: DOM me kuch bhi change hua? Boom!
 *    HTMLCollection turant update ho jaata hai.
 * b. Only contains HTML elements (<div>, <p>, <h1>, etc.)
 * c. No support for .forEach() (old-school style)
 * d. Access via:
 *    - getElementsByClassName()
 *    - getElementsByTagName(), etc
*/

/**
 * NodeList:
 * Think of a NodeList as a photo of the DOM elements you select at that
 * moment.
 * a. It's like: "Bro, ye elements uss waqt DOM mai jo the unska static
 *    screenshot le liye gya hai". 
 * b. Changes in DOM won't reflected automatically (mostly).
 * c. It can includes: HTML Element, Text, Comments, etc.
 * d. Supports .forEach()
 * e. Access via:
 *    - querySelectorAll()
 *    - childNodes (only live NodeList)
*/


/**
 * Difference between HTMLCollection and NodeList:
 * 1. Type of Content:
 *    - HTMLCollection: Only HTML elements (<div>, <p>, <h1>, etc.)
 *    - NodeList      : HTML elements, text nodes, comments, etc.
 * 
 * 2. Live or Static:
 *    - HTMLCollection: Live (updates automatically)
 *    - NodeList      : Static (doesn't update automatically)
 * 
 * 3. forEach() support:
 *    - HTMLCollection: No support for .forEach()
 *    - NodeList      : Supports .forEach()
 * 
 * 4. Use Cases:
 *    - HTMLCollection: When you need to access elements dynamically
 *    - NodeList      : When you need to access elements statically
*/


/**
 * 1. Maanlo tumhaare paas HTML mai ye structure hai:
 * 
 *    <div class="container">
 *       <p class="para">Para 1</p>
 *       <p class="para">Para 2</p>
 *    </div>
 * 
 * 2. Ab hum JavaScript mai kuch fetch kar rhe hai:
 * 
 *    const htmlCollection = document.getElementsByClassName('para');
 *    const nodeList = document.querySelectorAll('.para');
 * 
 *    a. Add a new <p> element dynamically:
 *       const newPara = document.createElement('p');
 *       newPara.className = 'para';
 *       newPara.textContent = 'Para 3';
 *       document.querySelector('.container').appendChild(newPara);
 * 
 *    b. Print both collections:
 *       console.log(htmlCollection); // auto-updated
 *       console.log(nodeList);       // old data (static)
*/
