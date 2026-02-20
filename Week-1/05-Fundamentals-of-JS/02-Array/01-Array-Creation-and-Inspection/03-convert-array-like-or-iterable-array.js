/**
 * Step 3: Array.from() - Conversion Magic
 * > Array.from() array-like ya iterable objects ko real arrays mein convert
 *   karta hai.
 * > Syntax: Array.from(arrayLike, mapFunction, thisArg)
*/


/**
 * Example 1: String to Array Conversion
 * > String ko array mein convert karo
*/

const name = "Rahul";
const nameArray = Array.from(name);
console.log("Name as array:", nameArray); // ['R', 'a', 'h', 'u', 'l']

const sentence = "Hello World";
const wordsArray = Array.from(sentence.split(" "));
console.log("Words array:", wordsArray); // ['Hello', 'World']


/**
 * Example 2: Array-like Objects (Arguments)
 * > arguments object ko array mein convert karo
*/

function processNumbers() {
    /* ❌ arguments array-like hai, real array nahi */
    console.log("Arguments:", arguments);
    console.log("Is array?", Array.isArray(arguments)); // false
    
    /* ✅ Convert to real array */
    const numbersArray = Array.from(arguments);
    console.log("Converted array:", numbersArray);
    console.log("Is array now?", Array.isArray(numbersArray)); // true
    
    /* Ab array methods use kar sakte hain */
    const doubled = numbersArray.map(num => num * 2);
    console.log("Doubled:", doubled);
}

processNumbers(10, 20, 30, 40);



/**
 * Example 3: NodeList to Array (DOM Elements)
*/

{/* 
<div class="item">Item 1</div>
<div class="item">Item 2</div>
<div class="item">Item 3</div>

<script>
// ✅ NodeList ko array mein convert karo
const items = document.querySelectorAll('.item');
console.log("NodeList:", items);
console.log("Is array?", Array.isArray(items)); // false

// Convert to array
const itemsArray = Array.from(items);
console.log("As array:", itemsArray);
console.log("Is array now?", Array.isArray(itemsArray)); // true

// Ab array methods use kar sakte hain
itemsArray.forEach((item, index) => {
    item.textContent = `Item ${index + 1} - Updated`;
});
</script> 
*/}


/**
 * Example 4: With Map Function
*/

/* ✅ Direct mapping during conversion */
const numbers = [1, 2, 3, 4, 5];

/* Create new array with squared values */
const squared = Array.from(numbers, num => num * num);
console.log("Original:", numbers); // [1, 2, 3, 4, 5]
console.log("Squared:", squared);  // [1, 4, 9, 16, 25]

/* String processing */
const chars = Array.from("hello", char => char.toUpperCase());
console.log("Uppercase:", chars); // ['H', 'E', 'L', 'L', 'O']



/**
 * Real World Example: Pagination System
 * > Pagination ke liye page numbers generate karna
*/

function generatePageNumbers(totalPages, currentPage) {
    /* Array-like object banayein */
    const pageArrayLike = { length: totalPages };
    
    /* Convert to array with page numbers */
    const pageNumbers = Array.from(pageArrayLike, (_, index) => index + 1);
    
    console.log("All pages:", pageNumbers);
    
    /* Current page highlight karein */
    const pagesWithCurrent = pageNumbers.map(page => 
        page === currentPage ? `[${page}]` : page.toString()
    );
    
    console.log("Pages with current:", pagesWithCurrent.join(' '));
}

generatePageNumbers(5, 3);
/* All pages: [1, 2, 3, 4, 5] */
/* Pages with current: 1 2 [3] 4 5 */
