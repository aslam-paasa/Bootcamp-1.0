/**
 * What is the DOM? How does it represent the HTML Structure?
*/

/**
 * Name the types of Nodes in DOM Tree
*/

/**
 * What's the difference between element node and text node?
 * - Element node: It represents the HTML elements.
 * - Text node   : It represents the text content within an element.
 * 
 * Example:
 * a. <h1>Hello World</h1>  - Element node
 * b. Hello World           - Text node
*/

/**
 * Inspect the following HTML in the browser and identify each node:
 * 
 *   <div>
 *      Hello <span>World</span>
 *   </div>
 * 
 * - 
*/


/**
 * What is the difference between getElementById and querySelector?
 * - getElementById: It is used to get the element by its id.
 * - querySelector: It is used to get the element by its id, class, tag, etc.
 * 
 * Example:
 * a. <div id="container">Hello World</div>
 * b. <div class="container">Hello World</div>
*/


/**
 * What does getElementsByClassName return? Is it an array?
 * - No, it returns array-like object called HTMLCollection. 
 * 
 *   <h1 class='color'>Hello World</h1>
 *   <h1 class='color'>Hello World</h1>
 *   <h1 class='color'>Hello World</h1>
 *   <h1 class='color'>Hello World</h1>
 * 
 *   let h1 = document.getElementsByClassName('color');
 *   console.log(h1); HTMLCollection(4) [h1.color, h1.color, h1.color, h1.color]
*/


/**
 * Use querySelector to select all buttons with class ".buy-now":
 * 
 *   <button class="buy-now">buy now</button>
 *   <button>add to cart now</button>
 *   <button class="buy-now">buy now</button>
 * 
 *   let buynow = document.querySelectorAll('.buy-now');
 *   console.log(buynow); NodeList(2) [button.buy-now, button.buy-now]
*/

/**
 * Select the heading of a page by ID and change its text to "Hello World":
 * 
 *   <h1 id="heading">Some Important Heading</h1>
 *   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
 * 
 *   let heading = document.querySelector('#heading');
 *   heading.textContent = 'Hello World';
*/


/**
 * Select all <li> elements and print their text using a loop:
 * 
 *   <ul>
 *      <li>Item 1</li>
 *      <li>Item 2</li>
 *      <li>Item 3</li>
 *      <li>Item 4</li>
 *      <li>Item 5</li>
 *   </ul>
 * 
 *   let li = document.querySelectorAll('li');
 *   li.forEach(item => {
 *      console.log(item.textContent);
 *   });
*/

/**
 * What is the difference between innerText, textContent and innerHTML?
 * - textContent: Gets the text content of an element, including text from nested elements
 * - innerText: Gets only visible text content, respecting CSS styling
 * - innerHTML: Gets/sets HTML content including tags and markup
*/

/**
 * When should you use innerText vs textContent?
 * - Use textContent when you want to get the text content of an element, 
 *   including hidden content. (faster)
 * - Use innerText when you want to get the visible text content only(slow)
*/

/**
 * Select a paragraph and replace its content with:
 * - <b>Updated</b> by JavaScript
 * 
 *   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
 *   
 *   let p = document.querySelector('p');
 *   p.innerHTML = '<b>Updated</b> by JavaScript';
*/


/**
 * How do you get src attribute of an image?
 * 
 *   <img src="https://via.placeholder.com/150" alt="Image">
 * 
 *   let img = document.querySelector('img');
 *   console.log(img.src);
 *   console.log(img.getAttribute('src'));
*/


/**
 * What does setAttribute do?
 * - It is used to set the value of an attribute for an element.
 * 
 *   let img = document.querySelector('img');
 *   img.setAttribute('src', 'https://via.placeholder.com/200');
*/


/**
 * Select a link and update its href to point to https://www.google.com:
 * 
 *   <a href="https://www.javascript.com">JavaScript</a>
 * 
 *   let a = document.querySelector('a');
 *   a.setAttribute('href', 'https://www.mdn.com');
*/


/**
 * Add a title attribute to div dynamically:
 * 
 *   <div>Hello World</div>
 * 
 *   let div = document.querySelector('div');
 *   div.setAttribute('title', 'cursorOverText');
*/


/**
 * Remove a disabled attribute from a button:
 * 
 *   <button disabled>Click me</button>
 * 
 *   let button = document.querySelector('button');
 *   button.removeAttribute('disabled');
*/


/**
 * What does createElement do? What it returns?
 * - It is used to create a new element.
 * - It returns the new element.
 * 
 *   let h1 = document.createElement('h1');
 *   console.log(h1); h1
*/


/**
 * What's the difference between appendChild and prepend?
 * - appendChild: Adds a new child node to the end of the parent node.
 * - prepend: Adds a new child node to the beginning of the parent node.
 * 
 *   let h1 = document.createElement('h1');
 *   let body = document.querySelector('body');
 *   body.appendChild(h1);
 *   body.prepend(h1);
*/


/**
 * Can you remove an element using removeChild?
 * - document.querySelector('div').removeChild(elementNode);
*/


/**
 * Create a new list item <li>New Task</li> and add it to the end of <ul>
 * 
 *   <ul>
 *      <li>Task 1</li>
 *      <li>Task 2</li>
 *      <li>Task 3</li>
 *   </ul>
 * 
 *   let ul = document.querySelector('ul');
 *   let li = document.createElement('li');
 *   li.textContent = 'New Task';
 *   ul.appendChild(li);
*/


/**
 * Create a new image element with a placeholder source and add it at the
 * top of a div.
 * 
 *   <div>
 *      <h1>Hello World</h1>
 *      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
 *   </div>
 * 
 *   let img = document.createElement('img');
 *   img.setAttribute('src', 'https://via.placeholder.com/150');
 *   
 *   let div = document.querySelector('div');
 *   div.prepend(img);
*/


/**
 * Select the first item in a list and delete it from the DOM:
 * 
 *   <ul>
 *      <li>Item 1</li>
 *      <li>Item 2</li>
 *      <li>Item 3</li>
 *   </ul>
 * 
 *   let ul = document.querySelector('ul');
 *   let li = document.querySelector('li');
 *   ul.removeChild(li);
*/


/**
 * How do you change the background color of an element?
 * - element.style.backgroundColor = 'red';
*/


/**
 * What is the difference between classList.add() and classList.toggle()?
 * - classList.add()   : Adds a class to an element. 
 * - classList.toggle(): If the class already exists, it will be removed. 
 *                       If the class does not exist, it will be added.
*/


/**
 * Add a highlight class to every even item in a list:
 * 
 *   <style>
 *      .highlight {
 *          background-color: yellow;
 *      }
 *   </style>
 * 
 *   <ul>
 *      <li>Item 1</li>
 *      <li>Item 2</li>
 *      <li>Item 3</li>
 *      <li>Item 4</li>
 *      <li>Item 5</li>
 *   </ul>
 * 
 *   let li = document.querySelectorAll('ul li:nth-child(2n)');
 *   li.forEach(item => {
 *      item.classList.add('highlight');
 *   });
*/


/**
 * Toggle a class active on a button when clicked.
 * Hint: Use classList.toggle()
 * 
 *   <style>
 *      .active {
 *          background-color: red;
 *      }
 *   </style>
 * 
 *   <button>Click me</button>
 * 
 *   let button = document.querySelector('button');
 *   button.addEventListener('click', () => {
 *      button.classList.toggle('active');
 *   });
*/


/**
 * Set the font size of all <p> elements to 18px using style.
 * 
 *   <p>Hello World</p>
 *   <h4>Heading</h4>
 *   <p>Hello World</p>
 *   <h4>Heading</h4>
 *   <p>Hello World</p>
 * 
 *   let p = document.querySelectorAll('p');
 *   p.forEach(item => {
 *      item.style.fontSize = '18px';
 *   });
*/